import React, {useState} from 'react';
import style from "./InputGroup.module.css";

function InputGroup({inputId, name, label, clasName, required, maxLength, error, selType, lupa}) {
    let stileInput = stile(selType, lupa, style);
    return (
        <>
            <div className={['form-floating', style.group].join(' ')}>
            {
                (selType !== 'BETWEEN')?
                <>
                    <input
                        type="text"
                        className={[stileInput, 'form-control', clasName, required, (error.length > 0)? style.no_valid: style.valid].join(' ')}
                        id={(lupa === 'show')? inputId+'_desc': inputId}
                        maxLength={maxLength}
                        placeholder={label}
                        name={(lupa === 'show')? inputId+'_desc': inputId}
                    />
                    <label
                        className={style.label}
                        htmlFor={inputId}
                    >
                        {label}
                    </label>
                    {(lupa === 'show')?
                    <button
                        type='button'
                        className={['btn', 'btn-primary', style.btn_lupa].join(' ')}
                    >
                        <i className={['demo-psi-magnifi-glass'].join(' ')}></i>
                    </button> : ''
                    }
                    <div
                        className={[style.errors, (error.length > 0)? style.no_valid : style.valid].join(' ')}
                    >
                        {(error).map((item, index)=>{
                            return <span key={index}>{item}</span>
                        })}
                    </div>
                </>: ''
            }
            {
                (selType === 'BETWEEN')? <>
                <div className={['form-floating', style.left_btw].join(' ')}>
                <input
                    type="text"
                    className={[style.input_btw, 'form-control', clasName, required, (error.length > 0)? style.no_valid: style.valid].join(' ')}
                    id={inputId+'_desde'}
                    maxLength={maxLength}
                    placeholder={label}
                    name={inputId+'_desde'}
                />
                <label
                    className={style.label}
                    htmlFor={inputId+'_desde'}>
                    {label}
                </label>
                <div
                    className={[style.errors, (error.length > 0)? style.no_valid : style.valid].join(' ')}
                >
                    {(error).map((item, index)=>{
                        return <span key={index}>{item}</span>
                    })}
                </div>
                </div>
                <div className={['form-floating', style.right_btw].join(' ')}>
                <input type="text"
                    className={[style.input_btw, 'form-control', clasName, required, (error.length > 0)? style.no_valid: style.valid].join(' ')}
                    id={inputId+'_hasta'}
                    maxLength={maxLength}
                    placeholder={label}
                    name={inputId+'_hasta'}
                />
                <label
                    className={[style.label].join(' ')}
                    htmlFor={inputId+'_hasta'}>
                    {label}
                </label>
                <div
                    className={[style.errors, (error.length > 0)? style.no_valid : style.valid].join(' ')}
                >
                    {(error).map((item, index)=>{
                        return <span key={index}>{item}</span>
                    })}
                </div>
                </div>
                </>: ''
            }
            </div>
            {
                (lupa === 'show')? <>
                    <input type={(lupa === 'show')? 'hidden' : 'text'}
                           className={[style.input_btw, 'form-control', clasName, required, (error.length > 0)? style.no_valid: style.valid].join(' ')}
                           id={inputId+'_lupa'}
                           maxLength={maxLength}
                           placeholder={label}
                           name={name+'_code'}
                    />
                </>: ''
            }

        </>
    );
}

export const stile = (seltype, lupa, style)=>{
    if(seltype==='BETWEEN'){
        return style.input_btw;
    }
    else if(lupa === 'show'){
        return style.input_lupa;
    }
    else{
        return style.input_line;
    }
};

export default InputGroup;