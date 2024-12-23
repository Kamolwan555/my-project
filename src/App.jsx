import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Navigation from "./Nav";
import Calculate from "./calculate";
import Fertilizer from "./Fertilizer";
import Order from "./Order";
import Soil from "./Soil";
import Recommend from "./Recommend";
import Soildata from "./Soildata";
import Home from "./Home";
import Login from "./Login/Login";
import Register from "./Register";
import { PrivateRoute } from "./component/PrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/nav" element={<Navigation />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Navigation />}>
          <Route
            path="home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="calculate" element={<Calculate />} />
          <Route path="fertilizer" element={<Fertilizer />} />
          <Route path="order" element={<Order />} />
          <Route path="soil" element={<Soil />} />
          <Route path="recommend" element={<Recommend />} />
          <Route path="soildata" element={<Soildata />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
