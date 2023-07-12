import React, {useState, useRef, useEffect} from "react";
import {parseCookies, destroyCookie } from 'nookies';
import {SimpleAlert} from "../../src/components/simpleAlert/SimpleAlert";
import Image from "next/image";

function Dashboard(){
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

            <h3 style={{ textAlign: 'center' }}>Ignitor Framework</h3>
            <Image
                src={'/ignitor.svg'}
                width={400}
                height={400}
            />
        </>
    );
}


export default Dashboard;
