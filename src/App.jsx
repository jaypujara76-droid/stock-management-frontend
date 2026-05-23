import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { useEffect, useState } from "react";

import api from "./services/api";

import LoginPage
from "./pages/LoginPage";

import RegisterPage
from "./pages/RegisterPage";

import StockPage
from "./pages/StockPage";

import OrderPage
from "./pages/OrderPage";

function App() {
  const [authVerified, setAuthVerified] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setTokenValid(false);
        setAuthVerified(true);
        return;
      }

      try {
        await api.get("/auth/validate");
        setTokenValid(true);
      } catch {
        localStorage.removeItem("token");
        setTokenValid(false);
      } finally {
        setAuthVerified(true);
      }
    };

    verifyToken();
  }, []);

  if (!authVerified) {
    return null;
  }

  const token = tokenValid;

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
