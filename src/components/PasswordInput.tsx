import { forwardRef, useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface Props extends React.ComponentProps<typeof TextField> {}

const PasswordInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      ref={ref}
      variant="outlined"
      fullWidth
      placeholder="Enter your password"
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
          backgroundColor: "#f3f3f3",
          transition: "0.3s",
          "& fieldset": { borderColor: "transparent" },
          "&:hover fieldset": { borderColor: "#666" },
          "&.Mui-focused fieldset": { borderColor: "#0a66c2", boxShadow: "0 0 0 2px rgba(10, 102, 194, 0.2)" },
        },
        "& input": {
          padding: "14px",
        },
      }}
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword((prev) => !prev)}
              edge="end"
              sx={{ color: "#666" }}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
});

export default PasswordInput;
