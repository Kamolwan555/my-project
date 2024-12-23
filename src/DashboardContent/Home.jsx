import { Table, Card, Typography } from 'antd'; 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const { Title } = Typography;

const Home = () => {
    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
            status: 'Approved',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
            status: 'Pending',
        },
    ];

    const columns = [
        {
            title: 'ชื่อลูกค้า',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'รายการ',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'การชำระเงิน',
            dataIndex: 'address',
            key: 'payment',
        },
        {
            title: 'สถานะ',
            dataIndex: 'status',
            key: 'status',
        },
    ];

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
        ]
    };

    return (
        <div style={{ padding: 30 }}>
            <Slider {...sliderSettings} style={{ marginBottom: 20 }}>
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index}>
                        <Card
                            bordered={false}
                            style={{ width: '90%', margin: '0 auto' }}
                        >
                            <p>content</p>
                        </Card>
                    </div>
                ))}
            </Slider>
            <div style={{ marginTop: 30 }}>
                <Title level={5} style={{ marginBottom: 20 }}>ตารางคำสั่งซื้อ</Title>
                <Table dataSource={dataSource} columns={columns} />
            </div>
        </div>
    );
};

export default Home;
