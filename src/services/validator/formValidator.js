import React from 'react';

const formValidator = (form) => {
    return new Promise(async (resolve, reject) => {
        try {
            let constraint = await getConstraints(form);
            let error = [];
            for (let i = 0; i < form.length; i++) {
                if(form[i].tagName === 'INPUT' || form[i].tagName === 'TEXTAREA' || form[i].tagName === 'SELECT'){
                    let id = form[i].id;
                    error.push(await validateElement(form[i], constraint[id]));
                }
            }
            resolve(error);
        }
        catch (e) {
            reject(e);
        }
    })
};

/**
 * funcion que valida cada elemento que se encontro en el formulario exceptuando botones
 * @param elem
 * @param validator
 */
export function validateElement(elem, validator){
    let errors = {
        id: null,
        message: []
    };
    errors.id = elem.id;
    /** validar required */
    if(validator.presence){
        if(validator.presence.required === true){
            if(elem.value === null || elem.value === 'undefined' || elem.value === ''){
                errors.message.push(validator.presence.message);
            }
        }
    }

    /** validacion de tamaño */
    if(validator.maxlength){
        if(validator.maxlength !== null){
            if(elem.value.length > validator.maxlength.long){
                errors.message.push(validator.maxlength.message);
            }
        }
    }

    /** validacion de tipos */
    if(validator.type){
        let valor = elem.value;
        let RegExPattern = new RegExp(rules[validator.type.pattern]);
        if(valor !== ''){
            let match = RegExPattern.exec(valor);
            if (!match || match[0].length != valor.length) {
                errors.message.push(validator.type.message);
            }
        }
    }
    return errors;
}

/**
 *
 * @type {{date: RegExp, onlyIntNumber: RegExp, posFiscal: {func: string}, valCUIT: {func: string}, integer: RegExp, imp: RegExp, url: RegExp, numWithDot: RegExp, number: RegExp, phone: RegExp, valDate: {func: string}, time: RegExp, email: RegExp}}
 */
export const rules = {
    "text": /^[a-zA-Z\ \']+$/,
    "phone": /^([\+][0-9]{1,3}[ \.\-])?([\(]{1}[0-9]{2,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/,
    "integer": /^[\-\+]?\d+$/,
    "email": /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
    "number": /^[\-\+]?((([0-9]{1,3})([,][0-9]{3})*)|([0-9]+))?([\.]([0-9]+))?$/,
    "date": /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
    "url": /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
    "onlyIntNumber": /^[0-9]*$/,
    "imp": /^-?[0-9]{1,3}(\.[0-9]{3})*(\,[0-9]+)?$/,
    "time": /^([0-2][0-9]:[0-5][0-9])?$/,
    "numWithDot": /^(-?[0-9]{1,3}(\.[0-9]{3})*)?$/,
    "posFiscal": {"func": "funValPosFiscal"},
    "valDate": {"func": "funValDate"},
    "valCUIT": {"func": "funValCuit"}
};

/**
 * genera el objeto validador de acurdo a las clases que se tenga en el listado de elementos
 * que existen dentro del formulario (inputs, textareas, selects)
 * @param listInputs
 */
export function getConstraints(listInputs){
    let listConstr = {};
    for (let i = 0; i < listInputs.length; i++) {
        let inputConstraint = {};
        if(listInputs[i].tagName === 'INPUT'){
            /** armado de objeto required */
            if(listInputs[i].classList.contains('required')){
                inputConstraint.presence = { required: true, message: "Este campo es obligatorio" };
            }
            else{
                inputConstraint.presence = { required: false };
            }
            /** armado de tipos de datos */
            let iterator = listInputs[i].classList.values();
            for (const value of iterator) {
                switch(value){
                    case "val_telefono":
                        inputConstraint.type = {pattern: "phone", message: 'No es formato de Telefono!'};
                        break;
                    case "val_url":
                        inputConstraint.type = {pattern: "url", message: 'No es formato URL permitido!'};
                        break;
                    case "val_date":
                        inputConstraint.type = {pattern: "date", message: 'No es formato de fecha permitido!'};
                        break;
                    case "val_dec":
                        inputConstraint.type = {pattern: "numWithDot", message: 'Formato incorrecto debe ser un numero decimal'};
                        break;
                    case "val_time":
                        inputConstraint.type = {pattern: "time", message: 'Debe ser Hora:Minutos:Segundos'};
                        break;
                    case "val_imp":
                        inputConstraint.type = {pattern: "imp", message: 'Formato incorrecto debe ser un importe'};
                        break;
                    case "val_int":
                        inputConstraint.type = {pattern: "integer", message: 'Debe ser un entero.'};
                        break;
                    case "val_int_pos":
                        inputConstraint.type = {pattern: "onlyIntNumber", message: 'Debe ser un entero positivo.'};
                        break;
                    case "val_num":
                        inputConstraint.type = {pattern: "number", message: 'Debe ser un numero valido'};
                        break;
                    /*case "val_text":
                        inputConstraint.type = {pattern: "text", message: 'Debe ser un texto'};
                        break;*/
                    case "val_may":
                        inputConstraint.type = {pattern: "may", message: 'Debe ser un texto en mayusuclas'};
                        break;
                    case "val_min":
                        inputConstraint.type = {pattern: "min", message: 'Debe ser un texto en minusculas'};
                        break;
                    case "val_datetime":
                        inputConstraint.type = {pattern: "datetime", message: 'Debe tener un formato de fecha completo'};
                        break;
                    case "val_email":
                        inputConstraint.type = {pattern: 'email', message: 'Debe ser un email valido'};
                        break;
                    case "val_pos_fiscal":
                        inputConstraint.type = {pattern: 'posFiscal', message: 'Debe ser un email valido'};
                        break;
                    case "val_date_func":
                        inputConstraint.type = {pattern: 'valDate', message: 'Debe ser un email valido'};
                        break;
                    case "val_cuit":
                        inputConstraint.type = {pattern: 'valCUIT', message: 'Debe ser un email valido'};
                        break;
                    default:
                        break;
                }
            }
            /** armado de maxLength del input */
            if(listInputs[i].getAttribute('maxlength')){
                inputConstraint.maxlength = {long: listInputs[i].getAttribute('maxlength'), message: 'Supera el máximo de caracteres autorizados'};
            }
            else{
                inputConstraint.maxlength = null;
            }
        }
        if(listInputs[i].id !== ''){
            listConstr[listInputs[i].id] = inputConstraint;
        }
    }
    return listConstr;
}
export default formValidator;


