import "../DashboardContent/css/index.css";
import { Form } from "antd";
import { useState } from "react";
import axios from "axios";

const Order = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [dataa, setData] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      let data = JSON.stringify({
        name: name,
        address: address,
        data: dataa,
        number: number,
        email: email,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://127.0.0.1:5000/order",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        data: data,
      };

      const response = await axios.request(config);
      setMessage(response.data.message || "Order placed successfully!");
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "An error occurred while placing the order."
      );
    }
  };

  return (
    <div className="container">
      <div className="header">
        <p className="subtitle">คำสั่งซื้อ</p>
        <button
          type="modal-button"
          className="modal-button"
          onClick={() => setModalOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          เพิ่ม
        </button>
      </div>
      {isModalOpen && (
        <div
          className="modal"
          role="dialog"
          aria-labelledby="modal-title"
          aria-modal="true"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h2 id="modal-title" className="modal-title">
                เพิ่มคำสั่งซื้อใหม่
              </h2>
              <button
                type="button"
                className="size-4 inline-flex justify-center items-center gap-x-2 rounded-full text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                aria-label="Close"
                data-hs-overlay="#hs-scale-animation-modal"
                onClick={() => setModalOpen(false)}
              >
                <svg
                  className="shrink-0 size-5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18"></path>
                  <path d="M6 6L18 18"></path>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} className="form">
                {error && <div className="error">{error}</div>}
                {message && <div className="message">{message}</div>}

                <Form.Item
                  name="name"
                  rules={[{ required: true, message: "โปรดระบุชื่อผู้ซื้อ!" }]}
                >
                  <input
                    type="text"
                    placeholder="ชื่อผู้ซื้อ"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input"
                  />
                </Form.Item>

                <Form.Item
                  name="address"
                  rules={[{ required: true, message: "โปรดระบุที่อยู่!" }]}
                >
                  <input
                    type="text"
                    placeholder="ที่อยู่"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="input"
                  />
                </Form.Item>

                <Form.Item
                  name="dataa"
                  rules={[{ required: true, message: "โปรดระบุข้อมูลคำสั่งซื้อ!" }]}
                >
                  <input
                    type="text"
                    placeholder="ข้อมูลคำสั่งซื้อ"
                    value={dataa}
                    onChange={(e) => setData(e.target.value)}
                    className="input"
                  />
                </Form.Item>

                <Form.Item
                  name="number"
                  rules={[{ required: true, message: "โปรดระบุเบอร์โทรศัพท์!" }]}
                >
                  <input
                    type="text"
                    placeholder="เบอร์โทรศัพท์"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="input"
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  rules={[{ type: "email", required: true, message: "โปรดระบุอีเมลของคุณ!" }]}
                >
                  <input
                    type="email"
                    placeholder="อีเมล"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input"
                  />
                </Form.Item>
              </form>
            </div>
            <div className="modal-footer">
              <button type="save" className="save-button">
                บันทึก
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="body">
        <p className="register-text">
          No data
        </p>
      </div>
    </div>
  );
};

export default Order;
