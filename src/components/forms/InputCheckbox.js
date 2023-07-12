import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/material/FormLabel";



function InputCheckbox({label= 'Título', name = [], optionName = [], values = [], classes = '', responsive = '', required, readonly, change, errors}){
    let v_checkbox = [];
    if((name.length != 0) && (name.length === optionName.length && optionName.length === values.length)){
        for (let i = 0; i < name.length; i++) {
            v_checkbox.push( 
                <FormControlLabel
                control={<Checkbox size="small" />}
                label={optionName[i]}
                value={values[i]}
                name={name[i]}
                key={'id_checkbox_' + i}
              />
            );    
        }
    }else{
        console.log('No se pudo crear el checkbox: El valor name está vacío o los arrays name, optionName, values no son iguales');
    }


    return(
        <div className={[responsive, classes].join(' ')}>
                <FormGroup>
                    <FormLabel id="demo-radio-buttons-group-label">
                        {label}:
                    </FormLabel>
                    {v_checkbox}
                </FormGroup>
                <div className="errores"></div>

        </div>
    )
}


export default InputCheckbox;