import React, {useEffect, useState} from 'react';
import style from './Operador.module.css'

function Operador({id_filter, selValue, opers, onSelectOp}) {

    const [lupaState, setLupaState] = useState('hide');
    const [selectValue, setSelectValue] = useState('hide');
    const [operadores, setOperadores] = useState(opers);

    useEffect(()=>{
        setSelectValue(selValue);
    }, [selValue, selectValue]);

    return (
        <>
            <div className={style.porc_20}>
                <select
                    value={selectValue}
                    className={[style.sel, 'form-select', (lupaState === 'show')? style.porc60: style.porc_100].join(' ')}
                    id={'op_'+id_filter}
                    onChange={onSelectOp}
                >
                    {(operadores).map((item, index)=>{
                        return <option key={index} data-label={item.type} value={item.code}>{item.val}</option>
                    })}
                </select>
            </div>
        </>
    );
}

export default Operador;