import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/system";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useRegisterMutation } from "../services/api";
import PasswordInput from "./PasswordInput";

const validation = yup.object({
  fullName: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  role: yup
    .string()
    .oneOf(["EMPLOYER", "CANDIDATE"], "Invalid role")
    .required("Role is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Minimum 5 characters")
    .max(16, "Maximum 16 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function SignupForm() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [registerUser] = useRegisterMutation();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validation),
  });

  const onSubmit = async (data) => {
    try {
      await registerUser(data).unwrap();
      toast.success("User registered successfully!");
      navigate("/");
    } catch (error) {
      const validationError = error?.data?.errors?.[0]?.msg;
      toast.error(validationError || "Something went wrong!");
    }
  };

  return (
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ backgroundColor: "#F3F2EF" }}
    >
      <Card variant="outlined" sx={{ maxWidth: 400, p: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h4" align="center" color="#0077B5" fontWeight="bold">
            75wayJob Portal
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              margin="normal"
              fullWidth
              label="Name"
              {...register("fullName")}
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Role"
              select
              defaultValue=""
              {...register("role")}
              error={!!errors.role}
              helperText={errors.role?.message}
            >
              <MenuItem value="EMPLOYER">EMPLOYER</MenuItem>
              <MenuItem value="CANDIDATE">CANDIDATE</MenuItem>
            </TextField>
            <PasswordInput
              margin="normal"
              fullWidth
              label="Password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <PasswordInput
              margin="normal"
              fullWidth
              label="Confirm Password"
              {...register("confirmPassword")}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, backgroundColor: "#0077B5", color: "#FFF" }}
              disabled={!isValid}
            >
              Signup
            </Button>
            <Typography align="center" sx={{ mt: 2 }}>
              Already have an account?{" "}
              <NavLink to="/login" style={{ color: "#0077B5" }}>
                Sign in
              </NavLink>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
