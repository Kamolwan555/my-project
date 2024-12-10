import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Drawer from './Drawer'; 
import Calculate from "./calculate";
import Fertilizer from "./Fertilizer";
import Order from "./Order";
import Soil from "./Soil";
import Recommend from "./Recommend";
import Soildata from "./Soildata";
import Home from "./Home";

const App = () => {
return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Drawer />}>
                <Route path="home" element={<Home />} />
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
