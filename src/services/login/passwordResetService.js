import axios from "axios";
import {callMaestroABM} from '../../services/grid/gridService'

const resetPassword = async (p_mail) => {
    console.log(p_mail);
    try{
        const data = await callMaestroABM(81, 0, {c_mail: "mgonzalez@tdi.com.ar"});
        console.log(data)
    }catch(error){
        console.error(error);
    }
}

export {resetPassword};