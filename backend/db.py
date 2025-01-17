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

    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password = Column(String(200), nullable=False)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    tel = Column(String(20), nullable=False)
    role_id = Column(Integer, ForeignKey('role.role_id'), nullable=False)

    role = relationship('Role', back_populates='users')

class Order(Model):
    __tablename__ = 'orders'
    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    address = Column(String(100))
    data = Column(String(100))
    number = Column(String(100))
    email = Column(String(100))
    order_date = Column(DateTime,default=func.now())  
    status = Column(String(100))
    
class Role(Model):
    __tablename__ = 'role'

    role_id = Column(Integer, primary_key=True)
    role_name = Column(String(50), nullable=False)

    users = relationship('User', back_populates='role')
    
# Create all tables
Model.metadata.create_all(engine)

@contextmanager
def get_db():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()