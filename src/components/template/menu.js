import React, { useState, useEffect, useRef } from 'react';
import styles from './Menu.module.css';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Image from "next/image";
import RightClickMenu from './rightClickMenu';
import {setCookie} from 'nookies';
import { paramEncode } from "../../services/helpers/helpersService";

function Menu(props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showRClickMenu, setShowRClickMenu] = useState(false);
    const [isRClickMenuOpen, setIsRClickMenuOpen] = useState(false);
    const [customStyleRClickMenu, setCustomStyleRClickMenu] = useState();
    const [itemData, setItemData] = useState(null);
    const toggle = () => setIsMenuOpen(!isMenuOpen);
    let usuario = useSelector((state) => state.usuarios.userData);
    let menuItems = useSelector((state) => state.usuarios.userMenu);
    let collapse = props.collapse;
    const getParams = props.getParams;

    /** CLICK DERECHO EN ITEMS DEL MENU */
    const handleRigthClick = (e, item) => {

        // Si es el click derecho del mouse, mostramos div y ajustamos la posicion
        if (e.button === 2) {
            // Si el div ya esta abierto, seteamos este state para evitar conflictos en el componente RightClickMenu
            setIsRClickMenuOpen(showRClickMenu ? true : false)
            setShowRClickMenu(true);
            setCustomStyleRClickMenu({
                top: e.pageY,
                left: e.pageX
            })
            setItemData(item);
        }
    }

    /** CREA LOS ITEMS DEL MENU */
    const filterAllMenu = (it, ind) => {

        let icon_clases = (it.d_icono) ? ['glyphicon', 'frmwk-icon', it.d_icono, 'fs-6'] : ['fs-6'];

        return (
            <li
                className={[(it.id_menu_padre === '0') ? styles.base : styles.border_start,
                (it.c_tipo_menu === 'MENU') ? styles.has_sub : ''].join(' ')} key={it.id_menu}>
                <a
                    onClick={(it.id_menu_padre === '0') ? clickMenu : () => { }}
                    className={[styles.toggler, 'navbar-toggler', 'nav-link'].join(' ')}
                    data-bs-toggle="collapse"
                    data-bs-target={`#panel-` + it.id_menu}
                    aria-controls="navbarNav"
                    aria-expanded="false"
                >
                    <i className={icon_clases.join(' ')}></i>
                    <span className={['nav-label', 'ms-1'].join(' ')}>{it.d_titulo}</span>
                </a>
                <ul id={"panel-" + it.id_menu} className={[styles.nav_content, 'nav', collapse].join(' ')} key={'submenu_' + ind + '_' + it.id_menu}>
                    {
                        (it.submenu) ? it.submenu.map((it, ind) => subMenu(it, ind)) : null
                    }
                </ul>
            </li>
        );

    }

    async function handleNewClick(p_breadcrumb, p_id_menu, p_url, p_descripcion, p_parametros) {
        const v_params = {
            titulo_pagina: p_breadcrumb,
            id_menu: p_id_menu,
            d_url: p_url,
            descripcion: p_descripcion,
            d_parametros: p_parametros
        };
        const encodedData = await paramEncode(v_params);
        setCookie(null, 'param', encodedData, {
            secure: process.env.enviroment !== 'development',
            maxAge: process.env.maxAge,
            sameSite: "strict",
            path: "/",
        });
        getParams();

    } 

    const subMenu = (item, index) => {

        let icon_clases = (item.d_icono) ? ['glyphicon', 'frmwk-icon', item.d_icono, 'fs-6'] : ['fs-6'];

        if (item.c_tipo_menu == 'MENU') {
            return (
                filterAllMenu(item, index)
            );
        } else if (item.c_tipo_menu == 'ITEM' && item.frmwk == 'NEW') {
            return (
                <li className={[styles.border_start, 'nav-item'].join(' ')} key={item.id_menu}>
                    <Link href={'/' + item.d_url}>
                        <a onContextMenu={(e) => e.preventDefault()}
                            onMouseDown={(e) => handleRigthClick(e, item)}
                            className={[styles.nav_link, 'nav-link'].join(' ')}
                            onClick={event => handleNewClick(item.d_breadcrumb, item.id_menu, item.d_url, item.d_description, item.d_parametros)}>
                            <i className={icon_clases.join(' ')}></i>
                            <span>{item.d_titulo}</span>
                        </a>
                    </Link>
                </li>
            )
        } else if (item.c_tipo_menu == 'ITEM' && item.frmwk == 'OLD') {
            return (
                <li className={[styles.border_start, 'nav-item'].join(' ')} key={item.id_menu}>
                    <a
                        onContextMenu={(e) => e.preventDefault()}
                        onMouseDown={(e) => handleRigthClick(e, item)}
                        onClick={(e) => handleOldClick(process.env.int_frmwk5 + item.d_url, item.id_menu, e)}
                        className={[styles.nav_link, 'nav-link'].join(' ')}
                    >
                        <i className={icon_clases.join(' ')}></i>
                        <span>{item.d_titulo}</span>
                    </a>
                </li>
            )
        }
    }

    const clickMenu = () => {
        let target = document.querySelectorAll('.first');//e.currentTarget.parentNode.classList;
        target.forEach((item) => {
            let child = item.childNodes;
            child.forEach((it) => {
                if (it.classList.contains('show')) {
                    it.classList.remove('show');
                }
            })
        });
    }

    const handleOldClick = (url, id_menu, e) => {
        e.preventDefault();
        let newHtml = document.getElementById('form_menu');
        let token = localStorage.getItem('token');
        let form = document.createElement('form');
        form.method = 'POST';
        form.action = url;
        let input1 = document.createElement('input');
        input1.type = 'text';
        input1.name = 'p_n_id_menu';
        input1.value = id_menu;
        let input2 = document.createElement('input');
        input2.type = 'text';
        input2.name = 'token';
        input2.value = token;
        form.appendChild(input1);
        form.appendChild(input2);
        newHtml.appendChild(form);
        form.submit();
    };

    const imgStyle = {
        borderRadius: '50%'
    };

    const navBarClas = () => {
        //console.log(props.widthBar);
        if ((props.widthBar).includes('m_min') && (props.widthBar).includes('show')) { return styles.minShow }
        if ((props.widthBar).includes('m_max') && (props.widthBar).includes('show')) { return styles.maxShow }
        if ((props.widthBar).includes('m_min') && (props.widthBar).includes('no_show')) { return styles.minNoShow }
        if ((props.widthBar).includes('m_max') && (props.widthBar).includes('no_show')) { return styles.maxNoShow }
    };

    return (
        <nav id="menu mainnav-container" className={[styles.mainnav, navBarClas()].join(' ')}>

            {showRClickMenu && <RightClickMenu setIsRClickMenuOpen={setIsRClickMenuOpen} isRClickMenuOpen={isRClickMenuOpen} customStyleRClickMenu={customStyleRClickMenu} itemData={itemData} setShowRClickMenu={setShowRClickMenu} showRClickMenu={showRClickMenu} />}

            <div id="form_menu" style={{ display: 'none' }}></div>
            <div className={styles.mainnav_inner}>
                <div className={[styles.mainnav_top_content, 'scrollable-content', 'pb-5'].join(' ')}>
                    <div className={['mainnav_profile', 'mt-3', 'd-flex3'].join(' ')}>
                        <div className={['mt-2', 'd-mn-max'].join(' ')}></div>
                        <div className={['mininav_toggle', 'text-center', 'py-2', 'collapsed'].join(' ')}>
                            <div className={[styles.usercaps, 'caps'].join(' ')}>
                                <Image
                                    alt={usuario.USERCAPS}
                                    style={imgStyle}
                                    src={(usuario.D_PATH_IMG)? usuario.D_PATH_IMG : '/imgs/users/default_user.jpg'}
                                    width={60}
                                    height={60}
                                />
                            </div>
                        </div>
                        <div className={[styles.usercaps_content, 'content', 'd-mn-max'].join(' ')}>
                            <div className={['d-grid'].join(' ')}>
                                <span className={['dropdown-toggle', 'd-flex', 'justify-content-center', 'align-items-center'].join(' ')}>
                                    <h6 className="mb-0 me-3">{usuario.D_DENOMINACION}</h6>
                                </span>
                                <p className={['d-flex', 'justify-content-center', 'align-items-center'].join(' ')}>
                                    <small className="text-muted">{usuario.D_MAIL}</small></p>
                            </div>
                        </div>

                    </div>
                    <div className={['py-3', styles.mainnav_categoriy].join(' ')}>
                        
                        <h6 className={['mt-0', 'px-3', 'fw-bold', 'navigation'].join(' ')}>Navegación</h6>
                        {
                            menuItems && (
                                <ul className={[styles.mainnav_menu, 'nav', 'flex-column'].join(' ')}>
                                    {menuItems.map((item, index) => {
                                        return filterAllMenu(item, index, styles);
                                    })}
                                </ul>
                            )
                        }
                    </div>
                </div>
                <div className={[styles.mainnav_bottom_content, 'border-top', 'pb-2'].join(' ')}>
                    <ul id="mainnav" className="mainnav_menu nav flex-column">
                        <li className="nav-item has-sub logout">
                            <Link href="/intranet">
                                <a
                                    className={['nav-link', styles.mininav_logout, 'collapsed'].join(' ')}
                                    aria-expanded="false"
                                >
                                    <i className={['demo-pli-unlock', styles.darkIcon, 'fs-5'].join(' ')}></i>
                                    <span className="nav-label ms-1">Logout</span>
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Menu;



