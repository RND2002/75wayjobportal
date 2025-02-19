import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useLoginMutation } from "../services/api";
import PasswordInput from "./PasswordInput";

const validationSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Minimum 5 characters required")
    .max(16, "Maximum 16 characters allowed"),
});

type FormData = yup.InferType<typeof validationSchema>;

export default function LoginForm() {
  const [loginUser] = useLoginMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await loginUser(data).unwrap();
      toast.success("User logged in successfully!");
      navigate("/", { replace: true });
    } catch (error: any) {
      console.log(error)
      const validationError = error?.data?.data?.errors?.[0]?.msg;
      toast.error(validationError ?? error?.data?.message ?? "Something went wrong!");
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
              label="Email"
              InputProps={{ style: { backgroundColor: "#f9f9f9" } }}
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <PasswordInput
              margin="normal"
              fullWidth
              label="Password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, backgroundColor: "#0077B5", color: "#FFF" }}
              disabled={!isValid}
            >
              Log in
            </Button>
            <Typography align="center" sx={{ mt: 2 }}>
              Don't have an account? {" "}
              <NavLink to="/signup" style={{ color: "#0077B5" }}>
                Sign up
              </NavLink>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
