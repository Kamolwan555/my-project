from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, Boolean,create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship,sessionmaker
from contextlib import contextmanager
from datetime import datetime, timedelta,timezone
import os

DATABASEURL = 'postgresql://postgres:password@db:5432/pui_database'
engine = create_engine(DATABASEURL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Model = declarative_base()
class User(Model):
    __tablename__ = 'user'

    user_id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password = Column(String(200), nullable=False)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    tel = Column(String(20), nullable=False)
    role_id = Column(Integer, ForeignKey('role.role_id'), nullable=False)

    role = relationship('Role', back_populates='users')
    fertilizers = relationship('Fertilizer', back_populates='user')


class Order(Model):
    __tablename__ = 'order'

    order_id = Column(Integer, primary_key=True,autoincrement=True)
    name = Column(String(100))
    address = Column(String(100))
    plant = Column(String(100))
    plant_number = Column(String(100))
    quantity = Column(String(100))
    order_date = Column(DateTime, default=func.now())  
    order_status = Column(String(100))
    # fertilizer_id = Column(Integer, ForeignKey('fertilizer.fertilizer_id'), nullable=False)

    sensors = relationship('Sensor', back_populates='order')


class Role(Model):
    __tablename__ = 'role'

    role_id = Column(Integer, primary_key=True)
    role_name = Column(String(50), nullable=False)

    users = relationship('User', back_populates='role')


class Sensor(Model):
    __tablename__ = 'sensor'

    sensor_id = Column(Integer, primary_key=True)
    fermentation_start = Column(String(50), nullable=False)
    day_fermented = Column(String(50), nullable=False)
    sensor_status = Column(String(50), nullable=False)
    order_id = Column(Integer, ForeignKey('order.order_id'), nullable=False)

    order = relationship('Order', back_populates='sensors')


class Fertilizer(Model):
    __tablename__ = 'fertilizer'

    fertilizer_id = Column(Integer, primary_key=True)
    data_n = Column(String(50), nullable=False)
    data_p = Column(String(50), nullable=False)
    data_k = Column(String(50), nullable=False)
    result1 = Column(String(50), nullable=False)
    result2 = Column(String(50), nullable=False)
    user_id = Column(Integer, ForeignKey('user.user_id'), nullable=False)

    user = relationship('User', back_populates='fertilizers')


class Calinput(Model):
    __tablename__ = 'calinput'

    cal_id = Column(Integer, primary_key=True)
    plant = Column(String(50), nullable=False)
    cal_n = Column(String(50), nullable=False)
    cal_p = Column(String(50), nullable=False)
    cal_k = Column(String(50), nullable=False)

# Create all tables
Model.metadata.create_all(engine)

@contextmanager
def get_db():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()