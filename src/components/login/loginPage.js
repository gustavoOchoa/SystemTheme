import React, {useEffect, useState} from 'react';
import Image from 'next/image'
import LogoPic from '/public/imgs/colored_logo.png'
import Head from "next/head";
import Loader from "../loader/Loader";
import { SimpleAlert } from '../simpleAlert/SimpleAlert';
import loggon from '../../services/login/loginService';
import API, {setCookieToken} from '../API/API';
import { useRouter } from 'next/router';
import Link from 'next/link';

function LoginPage(props){
    const route = useRouter();
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [logged, setLogged] = useState('off');
    const [error, setError] = useState('');
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        switch(name){
            case "user":
                setUser(value);
                break;
            case "password":
                setPassword(value);
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!user || !password){
            setError('Debe ingresar usuario y contraseña');
            setLogged('off');
            return null;
        }
        setLogged('pending');
        try {
            let entor = props.entorno;
            let auth = await loggon({entor, user, password});
            if(auth.error !== 'OK'){
                setError(auth.error);
                setLogged('off');
                localStorage.clear();
            }
            else{
                let retSuccess = await setCookieToken(auth.token, auth.param);
                setLogged('off');
                let url = JSON.parse(atob(auth.param));
                document.body.classList.remove("background");
                route.push(url.d_url);
            }
        }
        catch (e) {
            setError(e.error);
        }

    };

    return (
        <>
            <Head>
                <title>{process.env.page_title}</title>
            </Head>
            {(logged == 'pending')? <Loader text="Cargando" /> : ''}
            <div className='justify-content-center d-flex'>
                <div className='bg-white col-3 align-items mt-5 shadow border rounded'>
                    <div className='text-center p-lg-2'>
                        <div className='logo mt-1'>
                            <Image
                                src={LogoPic}
                                alt="TDI"
                                width={100}
                                height={40}
                            />
                        </div>
                        <h3>Inicia sesión</h3>
                        <small className='text-secondary'>Accede con tu cuenta</small>
                    </div>
                    {error && <SimpleAlert tipo='danger' mensaje={error}/>}
                    <form
                        className='p-4'
                        id={props.style.form}
                        autoComplete="off"
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="hidden"
                            id="entorno"
                            name="entorno"
                            value={props.entorno}
                        />
                        <div className="form-group">
                            <input
                                onChange={handleOnChange}
                                type="text"
                                className="form-control"
                                id="user"
                                name="user"
                                placeholder="Nombre de usuario"
                                required />
                        </div>
                        <div className="form-group mt-2">
                            <input
                                onChange={handleOnChange}
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Contraseña"
                                required />
                        </div>
                        <div className="form-check mt-2">
                            <input type="checkbox" className="form-check-input p-2" id="remmeber" />
                            <label className="form-check-label ps-2">Recuerdame</label>
                        </div>
                        <div className='text-center mt-2'>
                            <button
                                type="submit"
                                className={[props.style.btn_send_login, 'btn', 'btn-primary', 'w-75', 'mt-2', 'align-items-center'].join(' ')}
                            >
                                Ingresar
                            </button>
                            <button
                                type="button"
                                className={[props.style.btn_send_login, 'btn', 'btn-primary', 'w-75', 'mt-2', 'align-items-center'].join(' ')}
                            >
                                Facebook
                            </button>
                            <button
                                type="submit"
                                className={[props.style.btn_send_login, 'btn', 'btn-primary', 'w-75', 'mt-2', 'align-items-center'].join(' ')}
                            >
                                Google
                            </button>
                        </div>
                    </form>
                    <div className='row text-center p-3 mb-2 mt-2'>
                        <div className="col-12"><Link href="/intranet/password_reset"><a style={{textDecoration: "none"}}><small>Olvidaste tu contraseña?</small></a></Link></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginPage;