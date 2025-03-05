from flask import Flask, request, jsonify,abort,Response
import time
#from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token,jwt_required, get_jwt_identity, get_jwt
# from dotenv import load_dotenv
from flask_cors import CORS
from datetime import datetime, timedelta,timezone
import os
from sqlalchemy.orm import joinedload
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from db import *
import json
import threading
import paho.mqtt.client as mqtt
from functools import wraps

# load_dotenv()


# Initialize Flask app

app = Flask(__name__)
CORS(app)
jwt = JWTManager(app)
# Configure database URI and secret key
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:362545@localhost:5432/mydatabase'
#app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgress:password@db:5432/pui_database'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your_secret_key'
app.config['JWT_ALGORITHM'] = 'HS256'  
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24) 
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)  
app.config['JWT_TOKEN_LOCATION'] = ['headers', 'query_string']
bcrypt = Bcrypt(app)


def roles_required(*roles):
    def decorator(func):
        @wraps(func)
        @jwt_required()
        def wrapper(*args, **kwargs):
            claims = get_jwt()
            if claims.get('role') not in roles:
                return jsonify({'error': 'Access forbidden: insufficient privileges'}), 403
            return func(*args, **kwargs)
        return wrapper
    return decorator

def init_db(uri):
    # create_database_if_not_exists(uri)
    engine = create_engine(uri)
    Model.metadata.create_all(engine)
    Session = sessionmaker(bind=engine)
    session = Session()

    # Check if the initial user already exists
    admin_role = session.query(Role).filter_by(role_name='Administrator').one_or_none()
    if not admin_role:
        admin_role = Role(role_name='Administrator')
        session.add(admin_role)
        customer_role = Role(role_name='Customer')
        session.add(customer_role)
        Farmer_role = Role(role_name='Farmer')
        session.add(Farmer_role)
        session.commit()  

    if not session.query(User).filter_by(email='admin@admin.com').first():
        # Create the initial user
        initial_user = User(
            username='Admin',
            email='admin@admin.com',
            password=bcrypt.generate_password_hash("1234567").decode('utf-8'),
            first_name='Admin',
            last_name='Na ja',
            tel='0123456789',
            role=admin_role
        )
        session.add(initial_user)
        session.commit()
        print("Initial user created.")
        session.close()
        
init_db('postgresql://postgres:password@db:5432/pui_database')    
 
# Routes
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    tel = data.get('tel')
    username = data.get('username')  # Ensure username is passed in the request

    if not email or not password or not first_name or not last_name or not tel or not username:
        return jsonify({'error': 'All fields are required'}), 400

    # Validate email format
    if '@' not in email or '.' not in email:
        return jsonify({'error': 'รูปแบบอีเมลไม่ถูกต้อง'}), 400
    with get_db() as db_session:
        # Check if email already exists
        if db_session.query(User).filter_by(email=email).first():
            return jsonify({'error': 'อีเมลนี้มีอยู่แล้ว'}), 409

        # Check if username already exists
        if db_session.query(User).filter_by(username=username).first():
            return jsonify({'error': 'ชื่อผู้ใช้นี้มีอยู่แล้ว'}), 409

        # Hash the password
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        # Default role assignment
        default_role_id = 2  # Assuming 1001 is the role_id for the default role

        # Check if the default role exists in the Role table
        default_role = db_session.query(Role).filter_by(role_id=default_role_id).first()
        if not default_role:
            return jsonify({'error': 'Default role does not exist'}), 400

        # Create new user and assign the correct role_id
        new_user = User(
            username=username,  # Assign the username field
            email=email,
            password=hashed_password,
            first_name=first_name,
            last_name=last_name,
            tel=tel,
            role_id=default_role.role_id  # Assign role_id (foreign key) to the user
        )
        db_session.add(new_user)
        db_session.commit()

        return jsonify({'message': 'User registered successfully'}), 201


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username_or_email = data.get('username_or_email')
    password = data.get('password')

    if not username_or_email or not password:
        return jsonify({'error': 'Username/email and password are required'}), 400

    with get_db() as db_session:
        # Find user by username or email
        user = (
            db_session.query(User)
            .join(Role, User.role_id == Role.role_id)
            .filter((User.username == username_or_email) | (User.email == username_or_email))
            .first()
        )
        
        # Check bcrypt password
        if not user or not bcrypt.check_password_hash(user.password, password):
            return jsonify({'error': 'Invalid credentials'}), 401

        # Get role name from user’s role relationship
        role_name = user.role.role_name if user.role else None
        user_id = user.user_id if user.role else None


        # Generate JWT access token
        access_token = create_access_token(
            identity=str(user.user_id),
            expires_delta=timedelta(hours=2),
            additional_claims={'role': role_name, 'email': user.email}
        )


        return jsonify({
            'access_token': access_token,
            'role_name': role_name,
            "user_id" : user.user_id
        }), 200

@app.route('/order/<string:order_id>', methods=['GET'])
@jwt_required()
@roles_required('Administrator','Farmer')
def get_order(order_id):
    with get_db() as db_session:
        order = db_session.query(Order).filter_by(order_id=order_id).first()

        if not order:
            return jsonify({'error': 'Order not found'}), 404

        order_data = {
            'id': order.order_id,
            'name': order.name,
            'address': order.address,
            'plant': order.plant,
            'plant_number': order.plant_number,
            'quantity': order.quantity,
            'order_status': order.order_status,
            'order_date': order.order_date.isoformat() if order.order_date else None
        }

        return jsonify({'order': order_data}), 200

@app.route('/order/<string:order_id>', methods=['PUT'])
@jwt_required()
@roles_required('Administrator','Farmer')
def update_order(order_id):
    data = request.get_json()
    name = data.get('name')
    address = data.get('address')
    order_data = data.get('data')
    number = data.get('number')
    quantity = data.get('quantity')
    order_status = data.get('order_status')

    if not name or not address or not order_data or not number or not quantity or not order_status:
        return jsonify({'error': 'All fields are required'}), 400

    with get_db() as db_session:
        order = db_session.query(Order).filter_by(order_id=order_id).first()

        if not order:
            return jsonify({'error': 'Order not found'}), 404

        # Validate order status
        valid_statuses = ['Pending', 'Processing', 'Shipped', 'Completed', 'Cancelled']
        if order_status not in valid_statuses:
            return jsonify({'error': 'Invalid order status'}), 400

        # Update the order fields
        order.name = name
        order.address = address
        order.plant = order_data
        order.plant_number = number
        order.quantity = quantity
        order.order_status = order_status

        db_session.commit()

        # Prepare updated order data
        updated_order_data = {
            'id': order.order_id,
            'name': order.name,
            'address': order.address,
            'plant': order.plant,
            'plant_number': order.plant_number,
            'quantity': order.quantity,
            'order_status': order.order_status,
            'order_date': order.order_date.isoformat() if order.order_date else None
        }

        return jsonify({'message': 'Order updated successfully', 'order': updated_order_data}), 200

# Route to place an order
@app.route('/order', methods=['POST'])
@jwt_required()
@roles_required('Administrator','Farmer','Customer')
def place_order():
    try:
        data = request.get_json()
        name = data.get('name')
        address = data.get('address')
        plant = data.get('plant')
        number = data.get('phone')
        quantity = data.get('quantity')
        if not all([name, address, plant, number, quantity]):
            return jsonify({'error': 'All fields are required'}), 400
        
       
        # Set order time to the current time
        # order_time = datetime.utcnow()
        with get_db() as db_session:
            last_order = db_session.query(Order).order_by(Order.order_id.desc()).first()
            # next_id = (last_order.order_id if last_order else 0) + 1
            # Create new order
            new_order = Order(
                # order_id=next_id,
                name=name,
                address=address,
                plant=plant,
                plant_number=number,
                quantity=quantity,
                # order_time=order_time,
                order_status="Pending"
            )
            db_session.add(new_order)
            db_session.commit()

            return jsonify({'message': 'Order placed successfully',}), 201
    except Exception as e:
        return jsonify({'error': 'Internal server error', 'details': str(e)}), 500

@app.route('/orderlist', methods=['GET'])
@jwt_required()
@roles_required('Administrator','Farmer','Customer')
def get_all_orders():
    # Fetch all orders from the database
    with get_db() as db_session:
        orders = db_session.query(Order).all()

        # Convert the orders to a list of dictionaries
        orders_list = []
        for order in orders:
            orders_list.append({
                'id': order.order_id,
                'name': order.name,
                'address': order.address,
                'plant': order.plant,
                'order_date': order.order_date.isoformat() if order.order_date else None,
                'plant_number': order.plant_number,
                'quantity': order.quantity,
                'order_status': order.order_status
            })

        return jsonify({'orders': orders_list}), 200
@app.route('/dashboard', methods=['GET'])
@jwt_required()
@roles_required('Administrator','Farmer','Customer')
def get_orders_today_summary():
    try:
        # Calculate today's time range in UTC
        today_start = datetime.now(timezone.utc).replace(hour=0, minute=0, second=0, microsecond=0)
        today_end = datetime.now(timezone.utc).replace(hour=23, minute=59, second=59, microsecond=999999)

        with get_db() as db_session:
            # Filter orders for today's date
            orders_today = (
                db_session.query(Order)
                .filter(Order.order_date >= today_start, Order.order_date <= today_end)
                .all()
            )

            # Get all orders for summary
            all_orders = db_session.query(Order).all()
            sensor_data = db_session.query(Sensor).all()
            # Convert all orders to a list of dicts
            orders_list = [
                {
            'id': order.order_id,
            'name': order.name,
            'address': order.address,
            'plant': order.plant,
            'plant_number': order.plant_number,
            'quantity': order.quantity,
            'order_status': order.order_status,
            'order_date': order.order_date.isoformat() if order.order_date else None
                } for order in all_orders
            ]
            # sensor_list = [
            #     {
            #         # 'id': sensor.sensor_id,
            #         # 'name': sens,
            #         # 'address': order.address,
            #         # 'date': order.order_date.isoformat() if order.order_date else None,
            #         # # 'number': order.number,
            #         'status': sensor.sensor_status
            #     } for sensor in sensor_data
            # ]

            # Summaries
            total_orders_today = len(orders_today)
            # total_orders = len(all_orders)  # Total orders
            in_progress_count = len([
                order for order in all_orders
                if order.order_status and order.order_status.lower() == "pending"
            ])
            status_free = len([
                sensor for sensor in sensor_data
                if sensor.sensor_status and sensor.sensor_status.lower() == "inactive"
            ])
            status_progress = len([
                sensor for sensor in sensor_data
                if sensor.sensor_status and sensor.sensor_status.lower() == "active"
            ])
        
            return jsonify({
                'summary': {
                    'total_orders_today': total_orders_today,
                    'in_progress_count': in_progress_count,
                    'status_free' : status_free,
                    'status_progress' : status_progress
                    
                },
                'orders': orders_list  # Full list of orders
            }), 200

    except Exception as e:
        return jsonify({'error': 'An error occurred while processing the request.', 'message': str(e)}), 500

@app.route('/user', methods=['GET'])
@jwt_required()
@roles_required('Administrator')
def get_all_user():
    # Fetch all orders from the database
    with get_db() as db_session:
        uss = db_session.query(User).all()

        # Convert the orders to a list of dictionaries
        userlist = []
        for ussr in uss:
            userlist.append({
                'id': ussr.user_id,
                'name': ussr.username,
                'address': ussr.email,
                'first_name': ussr.first_name,
                'last_name': ussr.last_name,
                'tel': ussr.tel,
                'role': ussr.role_id

            })

        return jsonify({'ussr': userlist}), 200

@app.route('/sensor', methods=['GET'])
@jwt_required()
@roles_required('Administrator','Farmer')
def get_all_sensor():
    # Fetch all orders from the database
    with get_db() as db_session:
        ssr = db_session.query(Sensor).all()

        # Convert the orders to a list of dictionaries
        sensr_list = []
        for ssr in ssr:
            sensr_list.append({
                'id': ssr.sensor_id,
                'start': ssr.fermentation_start,
                'daysf': ssr.day_fermented,
                'status': ssr.sensor_status,
                'order': ssr.order_id,

            })

        return jsonify({'ssr': sensr_list}), 200

@app.route('/user/<int:user_id>', methods=['GET'])
@jwt_required()
@roles_required('Administrator','Farmer','Customer')
def get_user_by_id(user_id):
    with get_db() as db_session:
        user = db_session.query(User).filter_by(user_id=user_id).first()

        if not user:
            return jsonify({'error': 'ไม่พบผู้ใช้'}), 404

        user_data = {
            'id': user.user_id,
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'tel': user.tel,
            'role': user.role_id
        }

        return jsonify({'user': user_data}), 200
@app.route('/orders/<int:order_id>/status', methods=['PUT'])
@jwt_required()
@roles_required('Administrator','Farmer')
def update_order_status(order_id):
    current_user = get_jwt_identity()  # ตรวจสอบตัวตนของผู้ใช้

    # รับข้อมูล JSON จากคำขอ
    data = request.get_json()
    new_status = data.get('status')

    if not new_status:
        return jsonify({"error": "Status is required"}), 400

    # ใช้ get_db() ในการเปิด session กับฐานข้อมูล
    with get_db() as db_session:
        # ค้นหาคำสั่งซื้อที่ต้องการอัปเดต
        order = db_session.query(Order).filter(Order.order_id == order_id).first()

        if not order:
            return jsonify({"error": "Order not found"}), 404

        # อัปเดตสถานะคำสั่งซื้อ
        order.order_status = new_status
        db_session.commit()

# In-memory storage for sensor data
sensor_data_history = []

# Load environment variables (with defaults for local testing)
MQTT_PROTOCOL = os.getenv("MQTT_PROTOCAL", "mqtt")
MQTT_HOST = os.getenv("MQTT_HOST", "203.158.253.160")
MQTT_PORT = int(os.getenv("MQTT_PORT", "1883"))
MQTT_TOPIC = os.getenv("MQTT_TOPIC", "sensor/data")

# Generate a unique client id
client_id = f"mqtt_{os.urandom(4).hex()}"

# Build connection URL (for logging purposes)
connect_url = f"{MQTT_PROTOCOL}://{MQTT_HOST}:{MQTT_PORT}"

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print(f"Connected to MQTT broker {connect_url}")
        client.subscribe(MQTT_TOPIC)
        print(f"Subscribed to topic: {MQTT_TOPIC}")
    else:
        print(f"Failed to connect, return code {rc}")

def on_message(client, userdata, msg):
    try:
        message_str = msg.payload.decode()
        sensor_data = json.loads(message_str)
        
        # Process sensor data if it is not empty.
        if sensor_data:
            sensor_id = list(sensor_data.keys())[0]
            data = sensor_data[sensor_id]
            
            # Create a standardized JSON object with a timestamp.
            new_data = {
                "sensorId": sensor_id,
                "soil_temperature": data.get("soilTemperature"),
                "soil_moisture": data.get("soilHumidity"),
                "ec": data.get("soilEC"),
                #"ec": 0, #For testAlert
                "ph": data.get("soilPH"),
                "nitrogen": data.get("soilN"),
                "potassium": data.get("soilP"),
                "phosphorus": data.get("soilK"),
                "timestamp": datetime.utcnow().isoformat()
            }
            sensor_data_history.append(new_data)
            print("Received and processed data:", new_data)
    except Exception as e:
        print("Error processing MQTT message:", e)

# Set up MQTT client and assign callbacks
mqtt_client = mqtt.Client(client_id=client_id, clean_session=True)
mqtt_client.on_connect = on_connect
mqtt_client.on_message = on_message

def start_mqtt():
    mqtt_client.connect(MQTT_HOST, MQTT_PORT, keepalive=60)
    mqtt_client.loop_forever()

# Start the MQTT loop in a separate thread
mqtt_thread = threading.Thread(target=start_mqtt)
mqtt_thread.daemon = True  # Allows the program to exit even if thread is running
mqtt_thread.start()

@app.route("/sensors", methods=["GET"])
@jwt_required()
@roles_required('Administrator','Farmer')
def get_latest_sensor_data():
    if sensor_data_history:
        return jsonify(sensor_data_history[-1])
    abort(404, description="No sensor data available")

# REST API endpoint to get the full sensor data history
@app.route("/sensors/history", methods=["GET"])
@jwt_required()
@roles_required('Administrator','Farmer')
def get_sensor_data_history():
    return jsonify(sensor_data_history)

@app.route("/sensors/alerts", methods=["GET"])
@jwt_required()
@roles_required('Administrator','Farmer','Customer')
def sensor_alerts():
    def event_stream():
        last_index = len(sensor_data_history)
        while True:
            if len(sensor_data_history) > last_index:
                new_entries = sensor_data_history[last_index:]
                for data in new_entries:
                    
                    if data.get("ec") <= 0:
                        alert_message = {
                            "alert": "Sensor Error",
                            "data": data
                        }
                        yield f"data: {json.dumps(alert_message)}\n\n"
                last_index = len(sensor_data_history)
         
            time.sleep(1)
    return Response(event_stream(), mimetype="text/event-stream")


if __name__ == '__main__':
    app.run(host='0.0.0.0',port='5000',debug=True)

