import style from "./DynamicForms.module.css";
import Drawer from "@mui/material/Drawer";
import DynamicInputs from "./DynamicInputs";

export default function DynamicForm(props) {

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    props.setvisibilityDynamicForm(open);
  };

  const handleValue = (item, value) => {
    props.setABMdata({ ...props.ABMdata, [item]: value });
  }

  const handleChangeFilter = (action) => (event) => {
    if(action === 'save'){props.setABMdata({ ...props.ABMdata, ['oper']: props.type });}    
    props.setvisibilityDynamicForm(false);
  }

  const sendData = () =>{
    console.log('envio de formulario')
  }

  return (
    <>
      <Drawer
        anchor={"right"}
        open={props.visibilityDynamicForm}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { width: "500px", padding: "30px" },
        }}
      >
        <div className="input-group mb-3">
          <h3 className={[style.title].join(" ")}>{props.title}</h3>
          <button type="button" className={['btn', 'btn-outline-primary', style.btns].join(" ")}>
            <i className={["frmwk-icon", "square-empty-remove", style.icon].join(" ")}></i>
          </button>
        </div> 
        <form onSubmit={sendData}>
        {props.gridData.map((item, index) => {
          if ((item.M_EDITABLE === "S" && props.type === "edit") ||
              (item.M_INSERTABLE === "S" && props.type === "add")) 
          {
            let colName = item.D_COLUMN_NAME;
            // return renderInputs(item)
            return (
              <DynamicInputs key={item.ID_GRID_COLUMN} rowItem={item} rowData={props.rowData[colName.toUpperCase()]} oper={props.type} setABMdata={handleValue}/>
              )   
          }
        })}
        <hr/>
        <div className="input-group justify-content-center">
          <button type="button" className={['btn', 'btn-outline-primary', 'me-3', style.btns, style.label].join(" ")} onClick={handleChangeFilter('save')}>
            <i className={["frmwk-icon", "square-empty-check", style.icon].join(" ")}></i>
            Guardar
          </button>
          <button type="button" className={['btn', 'btn-outline-primary', 'me-3', style.btns, style.label].join(" ")} onClick={handleChangeFilter()}>
            <i className={["frmwk-icon", "square-empty-remove", style.icon].join(" ")}></i>
            Cancelar
          </button>
        </div>
        </form>
      </Drawer>
    </>
  );
}