from flask import Flask, request, jsonify
#from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token,jwt_required, get_jwt_identity
# from dotenv import load_dotenv
from flask_cors import CORS
from datetime import datetime, timedelta,timezone
import os
from sqlalchemy.orm import joinedload
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from db import *

# load_dotenv()


# Initialize Flask app

app = Flask(__name__)
CORS(app)
# Configure database URI and secret key
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:362545@localhost:5432/mydatabase'
#app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgress:password@db:5432/pui_database'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your_secret_key'
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

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
        return jsonify({'error': 'Invalid email format'}), 400
    with get_db() as db_session:
        # Check if email already exists
        if db_session.query(User).filter_by(email=email).first():
            return jsonify({'error': 'Email already exists'}), 409

        # Check if username already exists
        if db_session.query(User).filter_by(username=username).first():
            return jsonify({'error': 'Username already exists'}), 409

        # Hash the password
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        # Default role assignment
        default_role_id = 1001  # Assuming 1001 is the role_id for the default role

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

        # Generate JWT access token
        access_token = create_access_token(
            identity=str(user.id),  # Convert user.id to string if needed
            additional_claims={'email': user.email, 'role': role_name},
            expires_delta=timedelta(hours=2)
        )

        return jsonify({
            'access_token': access_token,
            'role_name': role_name
        }), 200



# Route to place an order
@app.route('/order', methods=['POST'])
@jwt_required()
def place_order():
    try:
        data = request.get_json()
        name = data.get('name')
        address = data.get('address')
        order_data = data.get('data')
        number = data.get('number')
        email = data.get('email')

        if not all([name, address, order_data, number, email]):
            return jsonify({'error': 'All fields are required'}), 400

        if '@' not in email or '.' not in email:#เชื่อมหน้าบ้านเเล้วลบออก
            return jsonify({'error': 'Invalid email format'}), 400

        # Set order time to the current time
        # order_time = datetime.utcnow()
        with get_db() as db_session:
            # Create new order
            new_order = Order(
                name=name,
                address=address,
                data=order_data,
                number=number,
                email=email,
                # order_time=order_time
                status="Pending"
            )
            db_session.add(new_order)
            db_session.commit()

            return jsonify({'message': 'Order placed successfully', 'order_id': new_order.id}), 201
    except Exception as e:
        return jsonify({'error': 'Internal server error', 'details': str(e)}), 500

@app.route('/orderlist', methods=['GET'])
def get_all_orders():
    # Fetch all orders from the database
    with get_db() as db_session:
        orders = db_session.query(Order).all()

        # Convert the orders to a list of dictionaries
        orders_list = []
        for order in orders:
            orders_list.append({
                'id': order.id,
                'name': order.name,
                'address': order.address,
                'data': order.data,
                'number': order.number,
                'email': order.email,
                'order_date': order.order_date.isoformat() if order.order_date else None,  # แปลงเป็น ISO 8601
                'status': order.status
            })

        return jsonify({'orders': orders_list}), 200

@app.route('/dashboard', methods=['GET'])
@jwt_required()  # Ensure that a valid JWT is required to access the route
def get_orders_today_summary():
    from datetime import datetime, timezone
    
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
        
        # Convert all orders to a list of dicts
        orders_list = [{
            'id': order.id,
            'name': order.name,
            'address': order.address,
            'data': order.data,
            'number': order.number,
            'email': order.email,
            'order_date': order.order_date.isoformat() if order.order_date else None,
            'status': order.status
        } for order in all_orders]

        # Summaries
        total_orders_today = len(orders_today)
        all_order = len(all_orders)  # total orders
        in_progress_count = len([
            order for order in all_orders
            if order.status and order.status.lower() == "in progress"
        ])
        completed_count = len([
            order for order in all_orders
            if order.status and order.status.lower() == "completed"
        ])

        return jsonify({
            'total_orders_today': total_orders_today,
            'all_order': all_order,
            'in_progress_count': in_progress_count,
            'completed_count': completed_count,
            'orders': orders_list  # Full list of orders
        }), 200



if __name__ == '__main__':
    app.run(host='0.0.0.0',port='5000',debug=True)
