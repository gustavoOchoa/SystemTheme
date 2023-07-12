import { useEffect, useState } from "react";
import style from './GridFooter.module.css';
import DynamicForm from "./DynamicForm";

function GridFooter(props) {
    let total = props.totalPages;
    const position = props.position;
    const limite = total - 2;
    const handlePaginator = props.handlePaginator;
    const handleRefresh = props.handleRefresh;
    const records = props.records;
    const handleRows = props.handleRows;

    const renderPages = () => {
        let v_page = [];
        if(total < 7){
            for(let i = 1; i <= total; i++){
                let pageLink = (<a className={['page-link', 'd-none', 'd-lg-block', style.link].join(' ')}>{i}</a>)
                if(i === position){
                    pageLink = (<a className={['page-link', 'd-none', 'd-lg-block', style.link, style.pageSelected].join(' ')}>{i}</a>);
                }
                v_page.push(
                            <li className={['page-item'].join(' ')} key={'page-'+ i} onClick={event => handlePaginator(i)}>
                                {pageLink}
                            </li>
                );
            }    
        }else{
            if(limite - 2 <= position){
                for(let i = limite - 2; i <= limite; i++){
                    let pageLink = (<a className={['page-link', 'd-none', 'd-lg-block', style.link].join(' ')}>{i}</a>)
                    if(i === position){
                        pageLink = (<a className={['page-link', 'd-none', 'd-lg-block', style.link, style.pageSelected].join(' ')}>{i}</a>);
                    }

                    v_page.push(
                                <li className={['page-item'].join(' ')} key={'page-' + i} onClick={event => handlePaginator(i)}>
                                    {pageLink}
                                </li>
                    );
                }                   
            }else{
                for(let i = position; i < position + 3; i++){
                    let pageLink = (<a className={['page-link', 'd-none', 'd-lg-block', style.link].join(' ')}>{i}</a>)
                    if(i === position){
                        pageLink = (<a className={['page-link', 'd-none', 'd-lg-block', style.link, style.pageSelected].join(' ')}>{i}</a>);
                    }
                    v_page.push(
                                <li className={['page-item'].join(' ')} key={'page-' + i} onClick={event => handlePaginator(i)}>
                                    {pageLink}
                                </li>
                    );
                }
                v_page.push(<li className={['page-item'].join(' ')} key="middle">......</li>);
    
            }
            for(let i = total-1; i <= total; i++){
                let pageLink = (<a className={['page-link', 'd-none', 'd-lg-block', style.link].join(' ')}>{i}</a>)
                if(i === position){
                    pageLink = (<a className={['page-link', 'd-none', 'd-lg-block', style.link, style.pageSelected].join(' ')}>{i}</a>);
                }
                v_page.push(
                            <li className={['page-item'].join(' ')} key={'page-' + i} onClick={event => handlePaginator(i)}>
                                {pageLink}
                            </li>
                );
            }


        }
        return v_page;
    }
    
    const columns = props.gridData?.columns;
    const [propsDynamicForm, setPropsDynamicForm] = useState({
        title: "",
        type: ""
    });
    const handlePropsDynamicForm = (action) => (event) => {
        props.setABMdata(viewData);
        const valColumns = props.gridData?.columns;
        switch (action) {
            case 'add':
                setPropsDynamicForm({ ...propsDynamicForm, ["title"]: 'Agregar Registro', ["type"]: action});
                
                setvisibilityDynamicForm(true);
                break;
            case 'edit':
                setPropsDynamicForm({ ...propsDynamicForm, ["title"]: 'Editar Registro', ["type"]: action});
                
                if (props.rowData.length !== 0) {                    
                    setvisibilityDynamicForm(true);
                }else{
                    alert('debe seleccionar un registro para continuar con la operación seleccionada.');
                }
                break;
            case 'del':
                setPropsDynamicForm({ ...propsDynamicForm, ["title"]: 'Eliminar Registro', ["type"]: action});
                
                if (props.rowData.length !== 0) {
                    setvisibilityDynamicForm(true);
                }else{
                    alert('debe seleccionar un registro para continuar con la operación seleccionada.');
                }  
                break;        
            default:
                setPropsDynamicForm({ ...propsDynamicForm, ["title"]: 'Detalle de Registro', ["type"]: 'view'});
                setvisibilityDynamicForm(true);
                break;
        }
    };
    const [visibilityDynamicForm, setvisibilityDynamicForm] = useState(false)

    const [viewData, setviewData] = useState([])
    useEffect(() => {
        setviewData(props.rowData);  
    }, [props.rowData])
    

    return (
        <>
        <div className={['row mt-4', style.footer_container].join(' ')}>
            <div className={[style.buttons_area, 'col-3'].join(' ')}>
                <div className="row">
                    {(props.showABM.add == true || props.showABM.edit == true || props.showABM.del == true ) ? 
                    <div className={['col-7', style.buttons_grid].join(' ')}>
                        {(props.showABM.add) ? 
                        <button type="button" className={['btn', 'btn-outline-primary', style.btns].join(' ')} 
                        onClick={handlePropsDynamicForm("add")}>
                            <i className={['frmwk-icon', 'square-empty-plus', style.icon].join(' ')}></i>
                        </button> : "" }
                        
                        {(props.showABM.edit) ? 
                        <button type="button" className={['btn', 'btn-outline-primary', style.btns].join(' ')} 
                        onClick={handlePropsDynamicForm("edit")}>
                            <i className={['frmwk-icon', 'square-edit', style.icon].join(' ')}></i>
                        </button> : "" }
                        
                        {(props.showABM.del) ? 
                        <button type="button" className={['btn', 'btn-outline-primary', style.btns].join(' ')} onClick={handlePropsDynamicForm("del")}>
                            <i className={['frmwk-icon', 'square-empty-remove', style.icon].join(' ')}></i>
                        </button>
                         : "" }
                    </div> : "" }
                    <div className={['col-5', style.buttons_adv].join(' ')}>
                        <button type="button" className={['btn', 'btn-outline-primary', style.btns].join(' ')} onClick={() => handleRefresh()}>
                            <i className={['frmwk-icon', 'refresh', style.icon].join(' ')}></i>
                        </button>
                        <button type="button" className={['btn', 'btn-outline-primary', style.btns].join(' ')} onClick={props.handleEyeSearch("clickShowFilters")}>
                            <i className={['frmwk-icon', props.propEyeSearch.iconFooter, style.icon].join(' ')}></i>
                        </button>
                    </div>
                </div>
            </div>
            {total && <div className={[style.pagination_area, 'col-6 justify-content-center d-flex'].join(' ')}>
                <nav>
                    <ul className={['pagination', style.pagination_color].join(' ')}>
                        <li className={['page-item'].join(' ')}>
                            <a className={['page-link', style.link].join(' ')}  onClick={() => handlePaginator(1)}>
                                <i className={['frmwk-icon', 'chevron-last-left', style.chevrons].join(' ')}></i>
                            </a>
                        </li>
                        <li className={['page-item'].join(' ')}>
                            <a className={['page-link', style.link].join(' ')} onClick={() => handlePaginator('left')}>
                                <i className={['frmwk-icon', 'chevron-left', style.chevrons].join(' ')}></i>
                            </a>
                        </li>
                        {
                            renderPages()
                        }
                        <li className={['page-item'].join(' ')}>
                            <a className={['page-link', style.link].join(' ')} onClick={() => handlePaginator('right')}>
                                <i className={['frmwk-icon', 'chevron-right', style.chevrons].join(' ')}></i>
                            </a>
                        </li>
                        <li className={['page-item'].join(' ')}>
                            <a className={['page-link', style.link].join(' ')} onClick={() => handlePaginator(total)}>
                                <i className={['frmwk-icon', 'chevron-last-right', style.chevrons].join(' ')}></i>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>}
            {!total && 
                <div className="col-6 justify-content-center d-flex" role="status">
                    <div className='spinner-border'></div>
                </div>}
            <div className='col-3 d-flex'>
                <div className='d-grid col-5'>
                    <span>{position} de {total} páginas</span>
                    <span>{records} registros</span>
                </div>
                <div className='col-7'>
                    <select className="form-select w-50" aria-label="Default select example">
                        <option defaultValue onClick={() => handleRows(50)}>50</option>
                        <option onClick={() => handleRows(100)}>100</option>
                        <option onClick={() => handleRows(1000)}>1000</option>
                    </select>
                </div>
            </div>            
        </div>
        {(columns !== undefined) ? 
        <DynamicForm 
            title={propsDynamicForm.title}
            type={propsDynamicForm.type}
            visibilityDynamicForm={visibilityDynamicForm}
            setvisibilityDynamicForm={setvisibilityDynamicForm}
            gridData={columns}
            // rowData={data}
            rowData={viewData}
            ABMdata={props.ABMdata}
            setABMdata={props.setABMdata}
        /> : ""}
        </>
    );
}

export default GridFooter;
