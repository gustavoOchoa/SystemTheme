import { useState, useEffect } from "react";
import InputText from "../forms/InputText";

export default function DynamicInputs({ rowItem, rowData, oper, setABMdata }) {
  const [data, setdata] = useState();
  
  useEffect(() => {
    setdata(rowData);
  }, []);

  const setValueItem = (value) => {
    let colName = rowItem.D_COLUMN_NAME;
    setABMdata(colName.toUpperCase(), value);
  }

  return (
    <div className="input-group">
      <InputText
        classes={rowItem.D_CLASE}
        label={rowItem.D_COLUMN_TITLE}
        responsive={"col-sm-12 col-lg-12"}
        errors={""}
        required={rowItem.M_OBLIGATORIO}
        readonly={rowItem.M_READONLY}
        change={setValueItem}
        value={(oper === "edit") ? data : ""}
      />
    </div>
  );
}
