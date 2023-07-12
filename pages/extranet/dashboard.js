import React, {useState, useRef, useEffect} from "react";
import {parseCookies, destroyCookie } from 'nookies';
import {SimpleAlert} from "../../src/components/simpleAlert/SimpleAlert";

function Dashboard(props){
    const [error, setError] = useState('');

    useEffect(()=>{
        let cokies = parseCookies();
        if(cokies.mensaje_error){
            setError(cokies.mensaje_error);
            destroyCookie({}, 'mensaje_error', {
                path: '/', // THE KEY IS TO SET THE SAME PATH
            });
        }
    }, []);

    return (
        <>
            {error? <SimpleAlert
                tipo={'danger'}
                mensaje={error}
                tiempo={10000}
            /> : ''}
            <h3>ESTE ES EL DASHBOARD DE EXTRANET</h3>
        </>
    );
}

export default Dashboard;