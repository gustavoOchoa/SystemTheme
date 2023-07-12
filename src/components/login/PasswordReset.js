import Image from "next/image";
import LogoPic from '/public/imgs/colored_logo.png'
import style from '../../../styles/intranet/Index.module.css';
import Link from "next/link";
import { useState } from "react";
import {resetPassword} from '../../services/login/passwordResetService'


function PasswordReset(){
    const [email, setEmail] = useState({email: ''});

    const handleEmail = (event) => {
        setEmail({[event.target.name]: event.target.value})
    }

    const sendEmail = async (e) => {
        e.preventDefault();
        const data = await resetPassword(email.email);
        console.log(data);
    }


    return(
        <div className="justify-content-center d-flex">
        <div className="bg-white col-3 align-items mt-5 shadow border rounded">
            <div className='text-center p-lg-2'>
                <div className='logo mt-1'>
                    <Image
                        src={LogoPic}
                        alt="TDI"
                        width={100}
                        height={40}
                    />
                </div>
                <h3>¿Olvidaste tu contraseña?</h3>
                <small className='text-secondary'>Ingresa tu email para recuperar tu contraseña</small>
            </div>
            <form onSubmit={sendEmail} className="p-4">

                <div className="form-group">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        name="email"
                        required
                        onChange={handleEmail}
                    />
                </div>
                
                <div className="text-center">
                <button
                    type="submit"
                    className={[style.btn_send_login, 'btn', 'btn-primary', 'w-75', 'mt-3', 'align-items-center'].join(' ')}
                >
                    Enviar
                </button>

                </div>
               
            </form>
            <div className='row text-center p-3 mb-2'>
                <div className="col-12"><Link href="/intranet"><a style={{textDecoration: "none"}}><small>Volver al inicio</small></a></Link></div>
            </div>

        </div>
        </div>
    )
}

export default PasswordReset;   