import React, {useEffect, useState} from 'react';
import Operador from './Operador';
import InputGroup from "./InputGroup";

function FormRow(props) {
    const [opValue, setOpValue] = useState('');
    const [lupa, setLupa] = useState('hide');

    useEffect(()=>{
        if(props.operadores[0].code === 'BETWEEN'){
            setOpValue('BETWEEN');
            setLupa('hide');
        }
        if(props.operadores[0].code !== 'BETWEEN' && props.operadores[0].type === 'LUPA'){
            setOpValue('LUPA');
            setLupa('show');
        }
        if(props.operadores[0].code !== 'BETWEEN' && props.operadores[0].type !== 'LUPA'){
            setOpValue('TXT');
            setLupa('hide');
        }
    }, [props.operadores]);

    const onHandleSelect = (event)=>{
        let index = event.target.selectedIndex;
        let optionElement = event.target.childNodes[index];
        let option =  optionElement.getAttribute('data-label');
        if(optionElement.value === 'BETWEEN'){
            setOpValue('BETWEEN');
            setLupa('hide');
        }
        if(optionElement.value !== 'BETWEEN' && option === 'LUPA'){
            setOpValue('LUPA');
            setLupa('show');
        }
        if(optionElement.value !== 'BETWEEN' && option !== 'LUPA'){
            setOpValue('TXT');
            setLupa('hide');
        }
    };

    return(
        <>
            <InputGroup
                inputId={props.htmlFor}
                name={props.name}
                label={props.label}
                clasName={props.class}
                required={props.required}
                maxLength={props.maxLength}
                error={props.error}
                selType={opValue}
                lupa={lupa}
            />
            <Operador
                id_filter={props.idFilter}
                opers={props.operadores}
                onSelectOp={onHandleSelect}
            />
        </>
    );
}

export default FormRow;


