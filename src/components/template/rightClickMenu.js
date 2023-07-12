import styles from './Menu.module.css';
import { useEffect, useRef, useState } from "react";


export default function RightClickMenu({ setIsRClickMenuOpen, isRClickMenuOpen, customStyleRClickMenu, itemData, setShowRClickMenu, showRClickMenu }) {
    const refDiv = useRef(null);
    const [firstRender, setFirstRender] = useState(true);

    const handleClickOutside = (e) => {

        /** Si hizo un click fuera del div, se eliminara del DOM */
        if (refDiv.current && !refDiv.current.contains(e.target)) {
            /** Si esta abierto el div, lo mantengo abierto pero cambio la posicion en el DOM */
            setShowRClickMenu(false);
        }
    };

    useEffect(() => {

        /** Solo detectamos los click afuera del div, despues de abrirlo, es decir despues del primer render */
        if (!firstRender) {
            document.addEventListener('mousedown', handleClickOutside);
        }

    });

    useEffect(() => {
        setFirstRender(false);
    }, [])


    useEffect(() => {
        /** EN EL CASO QUE EL DIV YA ESTE ABIERTO, LO VOLVEMOS A RENDERIZAR */
        if (isRClickMenuOpen) {
            setTimeout(() => {
                setIsRClickMenuOpen(false);
                setShowRClickMenu(true);
            }, 100);
        }
    }, [isRClickMenuOpen])

    const handleLinkClick = () => {
        setIsRClickMenuOpen(false);
        setShowRClickMenu(false);

        /** CREATE URL */
        let url = "";
        url = itemData.frmwk == "OLD" ? process.env.int_frmwk5 : "/";
        url = url.concat(itemData.d_url);
        /** END CREATE URL */

        let form = document.createElement("form");
        form.setAttribute("method", "POST");
        form.setAttribute("action", url);
        form.setAttribute("target", "_blank");

        /** PARAMS */
        let d_parametros = document.createElement("input");
        d_parametros.name = "d_parametros";
        d_parametros.value = itemData.d_parametros;
        d_parametros.type = 'hidden';
        form.appendChild(d_parametros);

        /** ID MENU */
        let id_menu = document.createElement('input');
        id_menu.type = 'hidden';
        id_menu.name = 'id_menu';
        id_menu.value = itemData.id_menu;
        form.appendChild(id_menu);

        /** OBTENCION DE TOKEN */
        let token = document.createElement('input');
        token.type = 'hidden';
        token.name = 'token';
        token.value = localStorage.getItem('token');
        form.appendChild(token);

        document.body.appendChild(form);
        form.submit();

        // Eliminamos del dom el formulario creado
        form.remove();
    }

    return (
        <div onContextMenu={(e) => e.preventDefault()} className={[styles.rightclick_div, 'shadow', 'border', 'rounded'].join(' ')} style={customStyleRClickMenu} ref={refDiv}>
            <a className="text-decoration-none" style={{ cursor: 'pointer' }} onClick={handleLinkClick}>
                <div className='p-3'>
                    Abrir en nueva pestaña
                </div>
            </a>
        </div>
    );
}