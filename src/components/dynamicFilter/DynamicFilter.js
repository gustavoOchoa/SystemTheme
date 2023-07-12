import React, {cloneElement, useEffect, useState} from 'react';
import getFormInputs from "../../services/filters/filterService";
import FormRow from "./FormRow";
import formValidator from "../../services/validator/formValidator";
import style from './DynamicFilter.module.css';

function DynamicFilter({children, id_menu, n_grid, grid_title, m_autoquery, param}) {
    const [form, setForm] = useState([]);
    const [valid, setValid] = useState([]);
    const [show, setShow] = useState(false);
    const [cond, setCond] = useState({});

    const onHandleSubmit =  function onHandleSubmit(event){
        event.preventDefault();
        formValidator(event.target.elements).then((err)=>{
            setValid(err);
            formIsValid(err).then((res)=>{
                if(res === true){
                    buildFilters(event.target.elements).then((filters)=>{
                        setCond(filters);
                    });
                }
            });
        });
    };

    const onHandleSHow = () => {setShow(!show);};

    useEffect(()=>{
        getFormInputs(id_menu, n_grid).then((data)=>{
            setForm(data);
        });
    }, [id_menu, setForm, n_grid]);

    return (
        <div>
            <div className={[(show===true)? style.show_search : style.no_show_search].join(' ')}>
                <div className={style.card_header}>
                    <h5 className={style.title_search}>Busqueda</h5>
                    <button className={['btn', style.btn_show].join(' ')} onClick={onHandleSHow}>
                        <i className={[(show===true)? 'demo-psi-minimize-3' : 'demo-psi-maximize-3'].join(' ')}></i>
                    </button>
                </div>
                <form onSubmit={onHandleSubmit}>
                    <div className="row">
                        {(form != [])? showFormRows(form, valid): ''}
                        <div className="col-sm-12 col-md-6 col-lg-3 d-flex">
                            <button
                                type="submit"
                                className={['btn', 'btn-primary', 'align-self-end', 'mx-1'].join(' ')}
                            >Enviar</button>
                            <button
                                type="reset"
                                className={['btn', 'btn-secondary', 'align-self-end'].join(' ')}>Limpiar</button>
                        </div>
                    </div>
                </form>
            </div>
            <div>{cloneElement(children, {children, id_menu, n_grid, grid_title, m_autoquery, param, cond})}</div>
        </div>
    );
}

export const buildFilters = async (elem)=>{
    let ret = new Object();
    for(let index = 0; index < elem.length; index++){
        let ind;
        if(elem[index].tagName === 'INPUT' || elem[index].tagName === 'SELECT'){
            let aux = (elem[index].id).split('_');
            ind = aux[1];
        }
        if(typeof ind !== 'undefined'){
            ret[ind]={
                index: null,
                oper: null,
                value: []
            };
        }
    }
    addToObj(ret, elem);
    return ret;
};
export function addToObj(ret, elem){
    for(let index = 0; index < elem.length; index++){
        let ind;
        if(elem[index].tagName === 'INPUT' || elem[index].tagName === 'SELECT'){
            let aux = (elem[index].id).split('_');
            ind = aux[1];
            if(aux[0] === 'index'){
                if(aux[2]){
                    ret[ind].index = ind;
                    if(aux[2]==='desde'){ret[ind].value[0] = elem[index].value;}
                    if(aux[2]==='hasta'){ret[ind].value[1] = elem[index].value;}
                    //if(aux[2]==='desc'){ret[ind].value[0] = elem[index].value;}
                    if(aux[2]==='lupa'){ret[ind].value[0] = elem[index].value;}
                }
                else{
                    ret[ind].index = ind;
                    ret[ind].value[0] = elem[index].value;
                }
            }
            if(aux[0] === 'op'){
                ret[ind].oper = elem[index].value;
            }
        }
    }
    return ret;
}
export function showFormRows(form, valid){
    return(
        <>
            {form.map((item, index)=>{
                return(
                    <div className="col-sm-12 col-md-6 col-lg-6 mb-2" key={index}>
                        <FormRow
                            idFilter={item.N_ID_FILTRO}
                            name={item.C_FILTRO}
                            htmlFor={item.C_FILTRO}
                            label={item.D_LABEL}
                            class={item.INPUT_CLASS}
                            type={item.INPUT_TYPE}
                            maxLength={null}
                            placeholder={null}
                            required={item.M_OBLIGATORIO === 'S'? 'required': ''}
                            error={funError(item.N_ID_FILTRO, valid)}
                            operadores={item.operadores}
                        />
                    </div>
                );
            })}
        </>
    );
}
export const formIsValid = async (errors) => {
    let hasError = true;
    errors.map((item, index)=>{
        if(item.message.length > 0){
            hasError = false;
        }
    });
    return hasError;
};
export function funError(id, errArray){
    let ret = [];
    errArray.map((item, index)=>{
        if(item.id === 'index_'+id){ret = item.message}
        if(item.id === 'index_'+id+'_desde'){ret = item.message}
        if(item.id === 'index_'+id+'_hasta'){ret = item.message}
        if(item.id === 'index_'+id+'_desc'){ret = item.message}
    });
    return ret;
}
export default DynamicFilter;