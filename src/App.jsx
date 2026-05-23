import {
  Routes,
  Route,
  Navigate,
  useLocation
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

  useLocation();

  const token = localStorage.getItem("token");

  return (

    <Routes>

      <Route
        path="/login"
        element={token ? <Navigate to="/stocks" /> : <LoginPage />}
      />

      <Route
        path="/register"
        element={token ? <Navigate to="/stocks" /> : <RegisterPage />}
      />

      <Route
        path="/"
        element={
          token ? <Navigate to="/stocks" /> : <Navigate to="/login" />
        }
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
