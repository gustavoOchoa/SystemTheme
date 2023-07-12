import React, {useEffect, useState} from 'react';
import styles from './Header.module.css';
import {useSelector} from 'react-redux';
import Image from "next/image";

function Header(props) {
    let usuario = useSelector((state) => state.usuarios.userData);

    return (
        <>
        <header className={styles.header}>
            <div className={styles.header_inner}>
                <div className={styles.header_brand}>
                    <div className={styles.brand_wrap}>
                        <a href="" className={[styles.brand_img, 'frmwk6_logo'].join(' ')}>
                            <Image
                            alt={process.env.frmwk6_title}
                            src={"/imgs/white_logo.png"}
                            width={60}
                            height={30}
                            />
                        </a>
                        <a href="" className={[styles.brand_txt, 'frmwk6_title'].join(' ')}>
                            {process.env.frmwk6_title}
                        </a>
                    </div>
                </div>
                <div className={styles.header_content}>
                    <div className={styles.header_content_start}>
                        <button
                            type="button"
                            className={[styles.nav_btn_burger,'nav-toggler', 'header_btn', 'btn', 'btn-icon', 'btn-sm'].join(' ')}
                            aria-label="Nav Toggler"
                            onClick={props.handleResize}
                        >
                            <i className="demo-psi-view-list"></i>
                        </button>
                    </div>
                    <div className={styles.header_content_end}>
                        <div className="dropdown">
                            <button className="header_btn btn btn-icon btn-sm" type="button" data-bs-toggle="dropdown"
                                    aria-label="Notification dropdown" aria-expanded="false">
                                <span className="d-block position-relative">
                                    <i className="demo-psi-bell"></i>
                                    <span className="badge badge-super rounded bg-danger p-1">
                                        <span className="visually-hidden">Notificaciones no leidas</span>
                                    </span>
                                </span>
                            </button>
                            <div id="notif" className={[styles.notif_drop, 'notif_drop_down', 'dropdown-menu', 'dropdown-menu-end'].join(' ')}>
                                <div className={['px-3', 'py-2', 'mb-1'].join(' ')}>
                                    <h5 className={[styles.notif_title].join(' ')}>Notificaciones</h5>
                                </div>
                                <div className="list-group list-group-borderless">
                                    <div
                                        className="list-group-item list-group-item-action d-flex align-items-start mb-2">
                                        <div className="flex-shrink-0 me-3">
                                            <i className="demo-psi-data-settings text-muted fs-2"></i>
                                        </div>
                                        <div className="flex-grow-1 ">
                                            <a href="" className={[styles.notif_title, 'd-block', 'mb-0', 'text-decoration-none'].join(' ')}>Your
                                                storage is full</a>
                                            <small className={[styles.notif_small, 'text-muted'].join(' ')}>Local storage is nearly full.</small>
                                        </div>
                                    </div>
                                    <div
                                        className="list-group-item list-group-item-action d-flex align-items-start mb-2">
                                        <div className="flex-shrink-0 me-3">
                                            <i className="demo-psi-data-settings text-muted fs-2"></i>
                                        </div>
                                        <div className="flex-grow-1 ">
                                            <a href="" className={[styles.notif_title, 'd-block', 'mb-0', 'text-decoration-none'].join(' ')}>Writing
                                                a New Article</a>
                                            <small className={[styles.notif_small, 'text-muted'].join(' ')}>Wrote a news article for the John Mike.</small>
                                        </div>
                                    </div>
                                    <div className="text-center mb-2">
                                        <a href="#" className={[styles.notif_title,'btn-link', 'text-decoration-none'].join(' ')}>Mostrar todas las notificaciones</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dropdown">
                            <button className="header__btn btn btn-icon btn-sm" type="button" data-bs-toggle="dropdown"
                                    aria-label="User dropdown" aria-expanded="false">
                                <i className="demo-psi-male"></i>
                            </button>
                            <div id="user_drop_down" className={[styles.user_info, 'dropdown-menu', 'dropdown-menu-end'].join(' ')}>
                                <div className="d-flex align-items-center">
                                    <div className={[styles.user_row, 'row'].join(' ')}>
                                        <div className={[styles.user_left, 'col-md-7'].join(' ')}>
                                            <h5 className={styles.user_name}>{usuario.D_DENOMINACION}</h5>
                                            <span className={['text-muted', 'fst-italic'].join(' ')}>{usuario.D_MAIL}</span>
                                        </div>
                                        <ul className={[styles.user_right, 'col-md-5'].join(' ')}>
                                            <li>
                                                <a href="">Cambio de Clave</a>
                                            </li>
                                            <li>
                                                <a href="">Logout</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        </>
    );
}

export default Header;