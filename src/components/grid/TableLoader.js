import React from "react";
import { useLottie } from "lottie-react";
import LottieTableLoader from "../../../public/imgs/Lottie/LottieTableLoader.json"

const TableLoader = () => {

    const style = {
        height: 285,
        padding: 0,
        backgroundColor: 'whitesmoke'
    };

    const options = {
        animationData: LottieTableLoader,
        loop: true,
    };

    const { View } = useLottie(options, style);
    return <div className="border rounded p-2">{View}</div>

};

export default TableLoader;