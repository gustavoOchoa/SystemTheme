import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";



function InputDate({label = 'Título', classes, name, responsive = '', errors, required, readonly, change}){
    const [value, setValue] = useState(null);
    return(
        <div className={["form-floating mb-3", responsive, classes].join(' ')}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label={label}
            value={value}
            onChange={(newValue) => {setValue(newValue);}}
            renderInput={(params) => <TextField {...params} sx={{ mt: 2 }} fullWidth size="small"/>}
          />
        </LocalizationProvider>
        <div className="errores"></div>

      </div>  
    )
}

export default InputDate;