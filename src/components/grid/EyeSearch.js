import style from './EyeSearch.module.css';
import { useState } from "react";

export default function EyeSearch({ data, setEyeSearchFilter, eyeSearchFilter}) {
  // const optionsFilters = [
  //   { value: "LIKE", icon: "glyphicon glyphicon-filter", text: "Contiene" },
  //   { value: "IGU", icon: "glyphicon glyphicon-ok-circle", text: "Igual a" },
  //   { value: "LIKSTART", icon: "glyphicon glyphicon-log-out", text: "Empiece por" },
  //   { value: "LIKEND", icon: "glyphicon glyphicon-log-in", text: "Termina por" },
  //   { value: "MENIGU", icon: "glyphicon glyphicon-chevron-left", text: "Menor o Igual" },
  //   { value: "MAYIGU", icon: "glyphicon glyphicon-chevron-right", text: "Mayor o Igual" },
  //   { value: "NULL", icon: "glyphicon glyphicon-ban-circle", text: "No Informado" },
  // ];
  const optionsFilters = [
    { value: "LIKE", icon: "filter", text: "Contiene" },
    { value: "IGU", icon: "circle-check", text: "Igual a" },
    { value: "LIKSTART", icon: "log-out", text: "Empiece por" },
    { value: "LIKEND", icon: "log-in", text: "Termina por" },
    { value: "MENIGU", icon: "chevron-left", text: "Menor o Igual" },
    { value: "MAYIGU", icon: "chevron-right", text: "Mayor o Igual" },
    { value: "NULL", icon: "circle-empty-alert", text: "No Informado" },
  ];

  const [eyeSearch, setEyeSearch] = useState({
    typeFilter: "LIKE",
    valueFilter: "",
    iconFilter: "filter",
    showCancel: false,
    activeFilter: false,
  });

  const handleChangeFilter = (prop) => (event) => {
    switch (prop) {
      case "changeValue":
        setEyeSearch({ ...eyeSearch, ["valueFilter"]: event.target.value });
        break;
      case "pressSubmit":
        if (event.key === "Enter") {
          if (event.target.value.length === 0) {
            setEyeSearch({ ...eyeSearch, ["showCancel"]: false });
            
            let auxEyeSearchFilter = eyeSearchFilter;
            delete auxEyeSearchFilter[event.target.name];
            setEyeSearchFilter({ ...auxEyeSearchFilter });
          } else {
            setEyeSearch({ ...eyeSearch, ["showCancel"]: true });
            setEyeSearchFilter({ ...eyeSearchFilter, [event.target.name]: {nameFilter: event.target.name, typeFilter: eyeSearch.typeFilter, valueFilter: event.target.value} });
          } 
        }
        break;
      case "removeFilter":
        setEyeSearch({
          ...eyeSearch,
          ["showCancel"]: false,
          ["valueFilter"]: "",
        });
        
        let auxEyeSearchFilter = eyeSearchFilter;
        delete auxEyeSearchFilter[event.target.name];
        setEyeSearchFilter({ ...auxEyeSearchFilter });
        break;
      default:
        const result = optionsFilters.find((filter) => filter.value === prop);
        setEyeSearch({
          ...eyeSearch,
          ["typeFilter"]: result.value,
          ["iconFilter"]: result.icon,
        });
        break;
    }
  };
  
  return (
    <div
      className="input-group input-group-sm test-shearch"
      key={"div_" + data}
      id={"div_" + data}
    >
      <button
        // className="btn btn-outline-secondary dropdown-toggle"
        className={['btn', 'btn-outline-primary', 'dropdown-toggle', style.btns].join(' ')}
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        key={"btn_filter_" + data}
        id={"btn_filter_" + data}
      >
        {/* <span className={eyeSearch.iconFilter}></span> */}
        <i className={['frmwk-icon', eyeSearch.iconFilter, style.icon, style.iconSearch].join(' ')}></i>
      </button>
      <ul className="dropdown-menu">
        {optionsFilters.map((valOption, index) => {
          return (
            <li key={index}>
              <a
                key={"OptionFilter_" + data + "_" + valOption.value}
                className="dropdown-item"
                value={valOption.value}
                onClick={handleChangeFilter(valOption.value)}
              >
                {/* <span className={valOption.icon}></span> */}
                <i className={['frmwk-icon', valOption.icon, style.icon, style.iconSearch].join(' ')}></i>
                {" " + valOption.text}
              </a>
            </li>
          );
        })}
      </ul>
      <input
        type="text"
        className="form-control"
        aria-label="Text input with dropdown button"
        key={"txt_filter_" + data}
        id={"txt_filter_" + data}
        name={data}
        value={eyeSearch.valueFilter}
        onChange={handleChangeFilter("changeValue")}
        onKeyUp={handleChangeFilter("pressSubmit")}
      />
      {eyeSearch.showCancel ? btnRemove(handleChangeFilter, data) : null}
    </div>
  );
}

export function btnRemove(handleChangeFilter, data) {
  return (
    <button
      // className="btn btn-outline-secondary"
      className={['btn', 'btn-outline-primary', style.btns].join(' ')}
      type="button"
      aria-expanded="false"
      name={data}
      onClick={handleChangeFilter("removeFilter")}
      style={{fontWeight:"bold"}}
    >x</button>
  );
}
