import React, {useEffect, useState} from 'react';
import Header from "./header";
import Menu from "./menu";
import Footer from "./footer";
import {useDispatch} from 'react-redux'
import {setStatus, setUserData, setUserMenu, setUserPerf, setUserHome} from '../../store/slices/usuariosSlice'
import API, { getCookieToken } from '../API/API';
import { paramDecode } from "../../services/helpers/helpersService";
import { useSelector } from 'react-redux';
import {setCookie} from 'nookies';
import { paramEncode } from "../../services/helpers/helpersService";
import Link from 'next/link';


export default function Main ({children}) {
    const dispatch = useDispatch();
    const [breadcrumb, setBreadcrumb] = useState(['hola']);
    const [description, setDescription] = useState('');
    const [navBar, setNavBar] = useState([]);
    const hasWindow = typeof window !== 'undefined';
    const [winWidth, setWinWidth] = useState(getWidth());
    const [collapse, setCollapse] = useState('collapse');
    const menuHome = useSelector((state) => state.usuarios.userHome)


    function getWidth() {
        return hasWindow ? window.innerWidth : null;
    }

    const rezise = () => {
        
        if(root.classList.contains('m_min')){
            setCollapse('collapse max')
            root.classList.remove('m_min');
            root.classList.add('m_max');
            let lista = [...root.classList];
            setNavBar(lista);
        }
        else{
            setCollapse('collapse min')
            root.classList.remove('m_max');
            root.classList.add('m_min');
            let lista = [...root.classList];
            setNavBar(lista);
        }
    };

    useEffect(()=>{
        let width = getWidth();
        if(width < 992){
            root.classList.remove('show');
            root.classList.add('no_show');
            let lista = [...root.classList];
            setNavBar(lista);
        }
        else{
            root.classList.remove('no_show');
            root.classList.add('show');
            let lista = [...root.classList];
            setNavBar(lista);
        }
    }, [setNavBar]);

    useEffect(() => {
        if (hasWindow) {
            function handleResize() {
                setWinWidth(getWidth());
                if(winWidth < 992){
                    root.classList.remove('show');
                    root.classList.add('no_show');
                    let lista = [...root.classList];
                    setNavBar(lista);
                }
                else{
                    root.classList.remove('no_show');
                    root.classList.add('show');
                    let lista = [...root.classList];
                    setNavBar(lista);
                }
            }
            window.addEventListener('resize', handleResize);
        }
    }, [winWidth, hasWindow, setNavBar]);

    useEffect(()=> {
        const getUserData = async () => {
            dispatch(setStatus());
            let urlFrmwk = process.env.fmk_frmwk6;
            return await API.get(urlFrmwk + 'templatedata');
        };

        getUserData()
            .then((response)=>{
                console.log(response)
                dispatch(setUserData(response.data.user_data));
                dispatch(setUserMenu(response.data.user_menu));
                dispatch(setUserPerf(response.data.user_perf));
                dispatch(setUserHome(response.data.user_home));

            }).catch((e) => {
            console.log('error em Redux'+JSON.stringify(e));
        });
    }, [dispatch]);

    async function getParams(){
        const data = await getCookieToken();
        const v_params = await paramDecode(data.param);
        setBreadcrumb((v_params.titulo_pagina).split(','));
        setDescription(v_params.descripcion);
    }

    useEffect(() => {
        getParams();
    },[]);

    async function updateCookies() {
        const v_params = {
            titulo_pagina: menuHome.D_TITULO,
            id_menu: menuHome.ID_MENU,
            d_url: menuHome.D_URL,
            descripcion: menuHome.D_DESCRIP,
            d_parametros: menuHome.D_PARAMETROS
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


    return(
        <div id="root" className="m_max">
            <main>
                <div id="content_back" className='text-light'>
                    <span className='h3'>
                        {Array.isArray(breadcrumb) ?
                        breadcrumb.map((item, index)=>(
                            index === breadcrumb.length - 1 ?
                            <span key={'breadcrumb_' + index}>{item}</span>
                            :
                            index === 0 ?
                            <span key={'breadcrumb_' + index}><Link href={'/' + menuHome.D_URL}><span onClick={event => updateCookies()} className='h5' style={{cursor: 'pointer'}} >{item}</span></Link> / </span>
                            :
                            <span key={'breadcrumb_' + index}><span className='h5'>{item}</span> / </span>

                        ))
                        :
                        "Menú Principal (Intranet)"}
                    </span>
                    <p><small>{description === 'null' ? 'no hay descripción' :  description }</small></p>
                </div>
                <div id="content_front">
                    {children}
                </div>
            </main>
            <Header
                handleResize={rezise}
            />
            <Menu
                widthBar={navBar}
                collapse = {collapse}
                getParams = {getParams}
            />


            
            <Footer/>
            
        </div>
    );
}