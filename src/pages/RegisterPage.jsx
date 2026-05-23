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

function RegisterPage() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: ""
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

    if (!formData.lastName?.trim()) {
      newErrors.lastName =
        "Last name is required";
    }

    if (!formData.password) {
      newErrors.password =
        "Password is required";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Confirm password is required";
    }

    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match";
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

      await api.post(
        "/auth/register",
        formData
      );

      alert(
        "Registration Successful"
      );

      navigate("/login");

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
      minHeight="100vh"
      sx={{
        backgroundColor: "#f5f5f5",
        padding: 2
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
          Register
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
            label="Last Name"
            name="lastName"
            margin="normal"
            value={formData.lastName}
            onChange={handleChange}
            error={!!errors.lastName}
            helperText={errors.lastName}
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

          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            margin="normal"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            required
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </Button>

        </form>

        <Typography
          mt={2}
          variant="body2"
        >

          Already have an account?{" "}

          <Link
            to="/login"
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
              Login here
            </Typography>
          </Link>

        </Typography>

      </Paper>

    </Box>
  );
}

export default RegisterPage;

