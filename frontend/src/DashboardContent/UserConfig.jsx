import { useNavigate } from "react-router-dom";
import "../DashboardContent/css/index.css";
import { Table, ConfigProvider, Row, Col } from "antd";

const SimpleTable = () => {
    const navigate = useNavigate();

    const columns = [
        {
            title: 'User ID',
            dataIndex: 'userid',
            key: 'userid',
        },
        {
            title: 'First Name',
            dataIndex: 'firstname',
            key: 'firstname',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastname',
            key: 'lastname',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone Number',
            dataIndex: 'tel',
            key: 'tel',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
    ];

    const data = [
        {
            key: '1',
            userid: '12345',
            firstname: 'John',
            lastname: 'Doe',
            email: 'john.doe@example.com',
            tel: '123-456-7890',
            role: 'Admin',
        },
        {
            key: '2',
            userid: '67890',
            firstname: 'Jane',
            lastname: 'Smith',
            email: 'jane.smith@example.com',
            tel: '987-654-3210',
            role: 'User',
        },
    ];

    return (
        <ConfigProvider
            theme={{
                token: {
                    fontFamily: '"Noto Sans Thai", serif',
                },
            }}
        >
            <div className="container">
                <Row>
                    <Col xs={24} sm={24}>
                        <div className="header">
                            <p className="subtitle">การตั้งค่าผู้ใช้</p>
                        </div>
                        <Table
                            className="custom-font-table"
                            columns={columns}
                            dataSource={data}
                            pagination={{
                                pageSize: 5,
                                responsive: true,
                            }}
                            scroll={{ x: 'max-content' }}
                            locale={{ emptyText: 'No data available' }}
                            onRow={(record) => ({
                                onClick: () => {
                                    navigate(`/edituser/${record.userid}`);
                                },
                            })}
                        />
                    </Col>
                </Row>
            </div>
        </ConfigProvider>
    );
};

export default SimpleTable;
