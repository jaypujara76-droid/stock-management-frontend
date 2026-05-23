import {
  Box,
  Button,
  Paper,
  TextField,
  Typography
} from "@mui/material";

import { useState }
from "react";

import { useNavigate, Link }
from "react-router-dom";

import api from "../services/api";

function LoginPage() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      firstName: "",
      password: ""
    });

  const [errors, setErrors] =
    useState({});

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName?.trim()) {
      newErrors.firstName =
        "First name is required";
    }

    if (!formData.password) {
      newErrors.password =
        "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {

      setLoading(true);

      const response =
        await api.post(
          "/auth/login",
          formData
        );

      localStorage.setItem(
        "token",
        response.data.data.token
      );

      alert("Login Successful");

      navigate("/stocks");

    } catch (error) {

      alert(
        error.response?.data?.message
      );
    } finally {

      setLoading(false);
    }
  };

  return (

    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{
        backgroundColor: "#f5f5f5"
      }}
    >

      <Paper
        sx={{
          padding: 4,
          width: 400,
          boxShadow: 3
        }}
      >

        <Typography
          variant="h5"
          mb={3}
          fontWeight="bold"
        >
          Login
        </Typography>

        <form onSubmit={handleSubmit}>

          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            margin="normal"
            value={formData.firstName}
            onChange={handleChange}
            error={!!errors.firstName}
            helperText={errors.firstName}
            required
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            required
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

        </form>

        <Typography
          mt={2}
          variant="body2"
        >

          Don't have an account?{" "}

          <Link
            to="/register"
            style={{ textDecoration: "none" }}
          >
            <Typography
              component="span"
              sx={{
                color: "primary.main",
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline"
                }
              }}
            >
              Register here
            </Typography>
          </Link>

        </Typography>

      </Paper>

    </Box>
  );
}

export default LoginPage;
