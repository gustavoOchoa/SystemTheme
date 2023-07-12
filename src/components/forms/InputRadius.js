import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";



function InputRadius({label = '', name = '', optionName = [], values = [], classes = '', responsive = '', required, readonly, change, errors}){
  let v_radius= [];
  if((name != '') && (values.length != 0 && optionName.length === values.length)){
    for (let i = 0; i < values.length; i++) {
        v_radius.push( 
          <FormControlLabel
          value={values[i]}
          control={<Radio size="small" />}
          label={optionName[i]}
          key={'id_radius_' + i}
        />
);    
    }
}else{
    console.log('No se pudo crear el Radius: El valor name está vacío o los arrays name, optionName, values no son iguales');
}

  

  return(
        <div className={["form-floating mb-3", responsive, classes].join(' ')}>
                <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                    {label}:
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                  >
                    {v_radius}
                  </RadioGroup>
                </FormControl>
                <div className="errores"></div>
        </div>
    )
}

export default InputRadius;