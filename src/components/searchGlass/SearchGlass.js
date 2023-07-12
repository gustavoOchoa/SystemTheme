import { useEffect, useState } from "react";
import style from "./SearchGlass.module.css";
import Grid from "../grid/Grid";
import { makeID } from "../../services/helpers/helpersService"

export default function SearchGlass(props) {
  const [dataGrid, setDataGrid] = useState({
    showModal: false,
    contentModal: null,
    valueFilter: "",
    valueCondition: "",
    idModalComponent: ""
  });

  const hideABM = {add:false, edit:false, del:false}

  // const idModalComponent = makeid();
  // const [contentGrid, setcontentGrid] = useState(null)

  const handleDataGrid = (oper) => (event) => {
    switch (oper) {
      case "openModal":
        setDataGrid({ ...dataGrid, ["showModal"]: true });
        break;
      case "closeModal":
        setDataGrid({ ...dataGrid, ["showModal"]: false });
        break;
      case "valueFilterGrid":
        setDataGrid({ ...dataGrid, ["valueFilter"]: event.target.value });
        break;
      case "acitionFilterGrid":
        setDataGrid({ ...dataGrid, ["valueCondition"]: dataGrid.valueFilter });
        break;
      default:
        break;
    }
  };
  
  useEffect(() => {
    setDataGrid({ ...dataGrid, ["idModalComponent"]: makeID() });   
  }, [])
  
  // useEffect(() => {    
  //   setDataGrid({ ...dataGrid, ["valueCondition"]: props.condInput });
  // }, [props.condInput]);
  
  
  return (
    <>
      <button
        type="button"
        className={["btn", "btn-outline-primary", style.btns].join(" ")}
        data-bs-toggle="modal"
        data-bs-target={"#"+dataGrid.idModalComponent}//"#exampleModal"
        onClick={handleDataGrid("openModal")}
      >
        <i className={["frmwk-icon", "search", style.icon].join(" ")}></i>
      </button>

      <div
        className="modal fade"
        id={dataGrid.idModalComponent}
        tabIndex={-1}
        aria-labelledby={dataGrid.idModalComponent+"Label"}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={dataGrid.idModalComponent+"Label"}>
                {props.modal_title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              {/* {contentGrid} */}

              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingrese un valor a buscar..."
                  aria-label="Ingrese un valor a buscar..."
                  aria-describedby="button-addon2"
                  onChange={handleDataGrid("valueFilterGrid")}
                />
                <button
                  className={["btn", "btn-outline-primary", style.btns, style.btnLov].join(" ")}
                  type="button"
                  id="button-addon2"
                  onClick={handleDataGrid("acitionFilterGrid")}
                >
                  <i className={["frmwk-icon", "search", style.icon].join(" ")}></i>
                </button>
              </div>

              {dataGrid.showModal ? (
                <Grid
                  grid_title={props.grid_title}
                  m_autoquery="S"
                  id_lista={props.id_lista}
                  param={props.param}
                  cols={props.cols}
                  cond={dataGrid.valueCondition}
                  showABM={hideABM}
                />
              ) : (
                ""
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">
                <i
                  className={[
                    "frmwk-icon",
                    "square-empty-check",
                    style.iconLight,
                  ].join(" ")}
                ></i>
                Seleccionar valor
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleDataGrid("closeModal")}
              >
                <i
                  className={[
                    "frmwk-icon",
                    "square-empty-remove",
                    style.iconLight,
                  ].join(" ")}
                ></i>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}