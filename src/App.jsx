import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import LoginPage
from "./pages/LoginPage";

import RegisterPage
from "./pages/RegisterPage";

import StockPage
from "./pages/StockPage";

import OrderPage
from "./pages/OrderPage";

function App() {

  const token =
    localStorage.getItem("token");

  const ProtectedAuthRoute = ({ element }) => {
    return token ? <Navigate to="/stocks" /> : element;
  };

  return (

    <Routes>

      <Route
        path="/login"
        element={<ProtectedAuthRoute element={<LoginPage />} />}
      />

      <Route
        path="/register"
        element={<ProtectedAuthRoute element={<RegisterPage />} />}
      />

      <Route
        path="/stocks"
        element={
          token
            ? <StockPage />
            : <Navigate to="/login" />
        }
      />

      <Route
        path="/orders"
        element={
          token
            ? <OrderPage />
            : <Navigate to="/login" />
        }
      />

      <Route
        path="*"
        element={
          <Navigate to="/login" />
        }
      />

    </Routes>
  );
}

export default App;
