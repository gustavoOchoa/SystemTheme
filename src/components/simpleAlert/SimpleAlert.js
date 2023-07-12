import {useState, useEffect} from "react";
/**
 * tipo: primary | danger | secondary | success | warning | info | light | dark
 * mensaje: string mensaje que se debe mostrar
 * tiempo: number tiempo en que tarda en desaparecer en milisegundos
 * */


const SimpleAlert = (props) => {
    const [show, setShow] = useState(true);
    useEffect(() => {
        const timeId = setTimeout(() => {
            /** despues de 3 segundos desaparece */
            setShow(false)
        }, (props.tiempo)? props.tiempo: 3000);

        return () => {
            clearTimeout(timeId)
        }
    }, []);

    // Si nunca se setea show o no existe show termina aca
    if (!show) {
        return null;
    }

    return (
        <div className={`alert alert-${props.tipo}`}>
            {props.mensaje}
        </div>
    )
}

export { SimpleAlert };