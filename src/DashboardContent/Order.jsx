
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
      setError(err.response?.data?.error || "An error occurred while placing the order.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center" }}>Place Your Order</h2>
      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
      {message && <div style={{ color: "green", marginBottom: "10px" }}>{message}</div>}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Order Data"
          value={dataa}
          onChange={(e) => setData(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>
          Submit Order
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

const buttonStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "none",
  backgroundColor: "#007BFF",
  color: "white",
  fontSize: "16px",
  cursor: "pointer",
};

export default Order;
