import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  Dashboard,
  Footer,
  Home,
  Login,
  MyOrders,
  AllOrders,
  Navbar,
  Signup,
  AddProduct,
} from "./components";
import { useSelector } from "react-redux";

function App() {
  const token = useSelector((state) => state.token.value);
  return (
    <div id="app" className="App">
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route
          path="/login"
          element={token ? <Navigate replace to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={token ? <Navigate replace to="/" /> : <Signup />}
        />
        <Route
          path="/my-orders"
          element={!token ? <Navigate replace to="/login" /> : <MyOrders />}
        />
        <Route
          path="/dashboard"
          element={!token ? <Navigate replace to="/login" /> : <Dashboard />}
        />
        <Route
          path="/all-orders"
          element={!token ? <Navigate replace to="/login" /> : <AllOrders />}
        />
        <Route
          path="/add-product"
          element={!token ? <Navigate replace to="/login" /> : <AddProduct />}
        />
        <Route path="/page/:id" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
