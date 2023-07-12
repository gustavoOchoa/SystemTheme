import React, {useEffect} from "react";
import LoginPage from '../../src/components/login/loginPage';
import Style from "../../styles/extranet/Index.module.css";

function Index(){
    useEffect(() => {
        document.body.classList.add("background");
    });
    return (
        <>
        <LoginPage
            entorno="EXTERNO"
            style = {Style}
        />
        </>
    );
}

export default Index;