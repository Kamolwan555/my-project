import { useEffect, useState } from 'react';

const Dashboard = () => {
    const [orders, setOrders] = useState([]);
    const [summary, setSummary] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch data from the backend API
        const fetchOrders = async () => {
            try {
                const response = await fetch('/dashboard', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer YOUR_JWT_TOKEN_HERE`, // Replace with a valid JWT token
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }

                const data = await response.json();
                setOrders(data.orders || []);
                setSummary(data.summary || {});
            } catch (err) {
                setError(err.message);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>

            {error ? (
                <div style={{ color: 'red' }}>Error: {error}</div>
            ) : (
                <>
                    {/* Summary Section */}
                    <div>
                        <h2>Order Summary</h2>
                        <p>Total Orders Today: {summary.total_orders_today || 0}</p>
                        <p>Total Orders: {summary.total_orders || 0}</p>
                        <p>In Progress: {summary.in_progress_count || 0}</p>
                        <p>Completed: {summary.completed_count || 0}</p>
                    </div>

                    {/* Orders List Section */}
                    <div>
                        <h2>Orders</h2>
                        <table border="1">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Date</th>
                                    <th>Number</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length > 0 ? (
                                    orders.map((order) => (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{order.name}</td>
                                            <td>{order.address}</td>
                                            <td>{order.date}</td>
                                            <td>{order.number}</td>
                                            <td>{order.status}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6">No orders found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;
