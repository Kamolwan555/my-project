import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Spin, Row, Col } from 'antd';

// const { Option } = Select;

const SensorCard = () => {
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [selectedSensor, setSelectedSensor] = useState(null);

  useEffect(() => {
    const fetchSensorData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/sensor');
        setSensorData(response.data.ssr);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSensorData();
  }, []);

  // const handleSelectChange = (value) => {
  //   const sensor = sensorData.find((s) => s.id === value);
  //   setSelectedSensor(sensor);
  // };

  return (
    <div style={{ padding: 20 }}>
      {/* <Select
        style={{ width: 200, marginBottom: 20 }}
        placeholder="Select a sensor"
        onChange={handleSelectChange}
      >
        {sensorData.map((sensor) => (
          <Option key={sensor.id} value={sensor.id}>
            Order {sensor.order}
          </Option>
        ))}
      </Select> */}
      <Row gutter={[16, 16]}>
        {loading ? (
          <Spin size="large" />
        ) : (
          <>
            {sensorData.map((sensor) => (
              <Col span={8} key={sensor.id}>
                <Card title={`Order ${sensor.order}`} bordered={false}>
                  <p>ID: {sensor.id}</p>
                  <p>Days: {sensor.daysf}</p>
                  <p>Start: {sensor.start}</p>
                  <p>Status: {sensor.status}</p>
                </Card>
              </Col>
            ))}
          </>
        )}
      </Row>
    </div>
  );
};

export default SensorCard;
