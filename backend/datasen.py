import os

# กำหนดค่าตัวแปรโดยตรงในโค้ด
protocol = "mqtt"
host = "203.158.253.160"
port = "1883"
client_id = f"mqtt_{hex(int.from_bytes(os.urandom(4), 'big'))[2:]}"
topic = "sensor/data"

# สร้าง URL การเชื่อมต่อ
connect_url = f"{protocol}://{host}:{port}"

# แสดงผลลัพธ์
print(f"Protocol: {protocol}")
print(f"Host: {host}")
print(f"Port: {port}")
print(f"Client ID: {client_id}")
print(f"Topic: {topic}")
print(f"Connect URL: {connect_url}")
