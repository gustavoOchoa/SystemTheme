import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";


function InputSelect({label ='Título' ,name = '', optionName = [], values = [], classes = '', responsive = '', required, readonly, change, errors}){
    const [selectValues, setSelectValues] = useState({select: ""});

    const handleChange = (prop) => (event) => {
        setSelectValues({ ...values, [prop]: event.target.value });
      };
    
      let v_select = [];
      if((name != '') && (values.length != 0 && optionName.length === values.length)){
        for (let i = 0; i < values.length; i++) {
            v_select.push(
                <MenuItem value={values[i]} key={'id_select_' + i}>{optionName[i]}</MenuItem>
            );    
        }
    }else{
        console.log('No se pudo crear el Radius: El valor name está vacío o los arrays name, optionName, values no son iguales');
    }
          
    
    return(
        <div className={["form-floating mb-3", responsive, classes].join(' ')}>
        <FormControl fullWidth size="small" sx={{ mt: 2 }}>
        <InputLabel>{label}</InputLabel>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectValues.select}
            label="Choose..."

            onChange={handleChange("select")}
          >
            {v_select}
          </Select>
        </FormControl>
        <div className="errores"></div>
      </div>
)
}

export default InputSelect;