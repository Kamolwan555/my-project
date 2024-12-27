from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token,jwt_required, get_jwt_identity
# from dotenv import load_dotenv
from flask_cors import CORS
from datetime import datetime, timedelta,timezone
import os
from sqlalchemy.orm import joinedload

# load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Configure database URI and secret key
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:362545@localhost:5432/mydatabase'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your_secret_key'

# Initialize extensions
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# Define User model
class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey('role.role_id'))  # Reference role.role_id
    role = db.relationship('Role', backref='users')


class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    address = db.Column(db.String(100))
    data = db.Column(db.String(100))
    number = db.Column(db.String(100))
    email = db.Column(db.String(100))
    order_date = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))  # ใช้ timezone-aware datetime

class Role(db.Model):
    __tablename__ = 'role'
    role_id = db.Column(db.Integer, primary_key=True)  # Use 'role_id' instead of 'id'
    role_name = db.Column(db.String(255), nullable=False)
    
# Routes
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({'error': 'Username, email, and password are required'}), 400

    # Validate email format
    if '@' not in email or '.' not in email:
        return jsonify({'error': 'Invalid email format'}), 400

    # Check if username or email already exists
    if User.query.filter((User.username == username) | (User.email == email)).first():
        return jsonify({'error': 'Username or email already exists'}), 409

    # Hash the password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    # Create new user
    new_user = User(username=username, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username_or_email = data.get('username_or_email')
    password = data.get('password')

    if not username_or_email or not password:
        return jsonify({'error': 'Username/email and password are required'}), 400

    # Find user by username or email
    user = (
    User.query
    .join(Role, User.role_id == Role.role_id)  # Join using 'role_id'
    .filter((User.username == username_or_email) | (User.email == username_or_email))
    .first()
)
    if not user or not bcrypt.check_password_hash(user.password, password):
        return jsonify({'error': 'Invalid credentials'}), 401

    # Get role name from user's role
    role_name = user.role.role_name if user.role else None

    # Generate JWT token
    access_token = create_access_token(
        identity=user.username,
        additional_claims={'email': user.email, 'role': role_name},
        expires_delta=timedelta(hours=2)
    )
    print(role_name) 
    return jsonify({
        'access_token': access_token,
        'role_name': role_name,
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

        # Create new order
        new_order = Order(
            name=name,
            address=address,
            data=order_data,
            number=number,
            email=email,
            # order_time=order_time
        )
        db.session.add(new_order)
        db.session.commit()

        return jsonify({'message': 'Order placed successfully', 'order_id': new_order.id}), 201
    except Exception as e:
        return jsonify({'error': 'Internal server error', 'details': str(e)}), 500
        
@app.route('/orderlist', methods=['GET'])
def get_all_orders():
    # Fetch all orders from the database
    orders = Order.query.all()

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
            'order_date': order.order_date.isoformat() if order.order_date else None  # แปลงเป็น ISO 8601
        })

    return jsonify({'orders': orders_list}), 200

@app.route('/dashboard', methods=['GET'])
@jwt_required()
def get_orders_today_summary():
    from datetime import datetime, timezone

    # คำนวณช่วงเวลาของวันนี้
    today_start = datetime.now(timezone.utc).replace(hour=0, minute=0, second=0, microsecond=0)
    today_end = datetime.now(timezone.utc).replace(hour=23, minute=59, second=59, microsecond=999999)

    # กรองคำสั่งซื้อที่ order_date อยู่ในช่วงเวลาวันนี้
    orders = Order.query.filter(Order.order_date >= today_start, Order.order_date <= today_end).all()
    orderls = Order.query.all()
    # แปลงคำสั่งซื้อเป็น list ของ dictionary
    orders_list = [{
        'id': order.id,
        'name': order.name,
        'address': order.address,
        'data': order.data,
        'number': order.number,
        'email': order.email,
        'order_date': order.order_date.isoformat() if order.order_date else None
    } for order in orderls]

    # สรุปจำนวนรายการ
    total_orders = len(orders)

    return jsonify({
        'total_orders_today': total_orders,
        'orders': orders_list
    }), 200

if __name__ == '__main__':
    # Create database tables if not exist
    CORS(app)
    with app.app_context():
        db.create_all()

    app.run(debug=True)
