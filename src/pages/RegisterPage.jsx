import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  TextField,
  Typography
} from "@mui/material";

import { useState }
from "react";

import { useNavigate, Link }
from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

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

  const [showPassword, setShowPassword] =
    useState(false);

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    return minLength && hasSpecialChar && hasDigit;
  };

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
    } else if (!validatePassword(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters with 1 special character and 1 digit";
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

      toast.success(
        "Registration Successful"
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Registration failed"
      );
    } finally {

      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{
          width: "100%",
          backgroundColor: "#f5f5f5",
          padding: 2
        }}
      >

      <Paper
        sx={{
          padding: 4,
          width: 400,
          maxWidth: "100%",
          mx: "auto",
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

        <form onSubmit={handleSubmit} noValidate>

          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            margin="normal"
            value={formData.firstName}
            onChange={handleChange}
            error={!!errors.firstName}
            helperText={errors.firstName}
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
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />

          <TextField
            fullWidth
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            margin="normal"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
              />
            }
            label="Show passwords"
            sx={{ mt: 1 }}
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
    </>
  );
}

export default RegisterPage;

