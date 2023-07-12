import { useRef, useState, useEffect} from "react";
import { IMaskInput } from "react-imask";

import style from "./Input.module.css";

function InputText({
  label = "Título",
  classes = "",
  name,
  responsive = "",
  errors,
  required,
  readonly,
  change,
  mask = String,
  value = "",
}) {

  const ref = useRef(null);
  const [valItem, setvalItem] = useState(value);
  useEffect(() => {
    setvalItem(value);
  }, [value])
  

  return (
    <label
      className={[
        style.pure_material_textfield_outlined,
        classes,
        responsive,
      ].join(" ")}
    >
      <IMaskInput
        mask={mask}
        unmask={true} // true|false|'typed'
        ref={ref}
        value={valItem}
        onAccept={(value, mask) => {    
            setvalItem(value);        
            if(change !== undefined && typeof change === 'function'){
                change(value)
            }
        }}
        placeholder=""
        className="fw-lighter"
        name={name}
      />

      <span className="fw-lighter">{label}</span>
    </label>
  );
}

export default InputText;
