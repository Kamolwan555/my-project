import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Navigation from "./Navigation/Nav";
import Calculate from "./DashboardContent/Calculate";
import Fertilizer from "./DashboardContent/Fertilizer";
import Order from "./DashboardContent/Order";
import Soil from "./DashboardContent/Soil";
import Recommend from "./DashboardContent/Recommend";
import Soildata from "./DashboardContent/Soildata";
import Home from "./DashboardContent/Home";
import Login from "./Authentication/Login/Login";
import Register from "./Authentication/Login/Register";
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
