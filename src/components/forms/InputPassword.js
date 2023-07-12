import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";


function InputPassword({label = 'Password', classes = '', name = 'Contraseña', responsive = '', errors, required, readonly, change}){
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
    select: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };




    return (
        <div className={["form-floating mb-3", responsive, classes].join(' ')}>
        <FormControl
          sx={{ mt: 2 }}
          variant="outlined"
          fullWidth
          size="small"
        >
          <OutlinedInput
            id="muiPassword"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? (
                    <Visibility />
                    
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          <InputLabel htmlFor="muiPassword">{label}</InputLabel>
        </FormControl>
        <div className="errores"></div>

      </div>

    )
}

export default InputPassword;