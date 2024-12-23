// function Order() {
//     return (
//         <div>
//             <h2>This is Order Page.</h2>
//         </div>
//     );
// }

// export default Order;

// PlaceOrder.js
import { useState } from "react";
import axios from "axios";

const PlaceOrder = () => {
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
      console.log(name);
      console.log(address);
      console.log(dataa);
      console.log(number);
      console.log(email);
      console.log(error);
      console.log(message);
      // const token = localStorage.getItem('access_token'); // Assume JWT is stored in local storage
      // const response = await axios.post('http://localhost:5000/order', {
      //   name,
      //   address,
      //   data,
      //   number,
      //   email,
      // }, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      // setMessage(response.data.message);
      // const axios = require("axios");
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

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      setError(err.response ? err.response.data.error : "Error occurred");
    }
  };

  return (
    <div>
      <h2>Place Order</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {message && <div style={{ color: "green" }}>{message}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Order Data"
          value={dataa}
          onChange={(e) => setData(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
};

export default PlaceOrder;

