import axios from 'axios';
import {parseCookies, setCookie} from "nookies";

const API = () => {
    let instance = axios.create();

    instance.interceptors.request.use(async function (config) {
        const cokie = await getCookieToken();
        if (cokie) {
            config.headers['token'] = cokie.token;
            config.headers['param'] = cokie.param;
        }
        config.headers['X-Requested-With'] = 'XMLHttpRequest';
        return config;
    }, error => {
        return Promise.reject(error);
    });

    instance.interceptors.response.use(
        function (response) {
            if(response.config.headers.param && response.config.headers.token){
                setCookieToken(response.config.headers.token, response.config.headers.param);
            }
            return response;
        },
        function (error) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            return Promise.reject(error);
        }
    );

    return instance;
};

export const setCookieToken = (token, param)=> {
    setCookie(null, 'token', token, {
        secure: process.env.enviroment !== 'development',
        maxAge: process.env.maxAge,
        sameSite: "strict",
        path: "/",
    });

    setCookie(null, 'param', param, {
        secure: process.env.enviroment !== 'development',
        maxAge: process.env.maxAge,
        sameSite: "strict",
        path: "/",
    });

    let cokies = parseCookies();
    let ret = {};
    ret.success = !!(cokies.param && cokies.token);
    return ret;
};

export const removeCookies = ()=> {
    return new Promise(async (resolve, reject) => {
        try {
            let urlencoded = new URLSearchParams();
            urlencoded.append("token", "");
            urlencoded.append("param", "");
            const res = await axios.post('/api/setCookie', urlencoded);
            resolve(res.data);
        }
        catch (e) {
            reject(e);
        }
    })
};

export const getCookieToken = async ()=> {
    return parseCookies();
};

export default API();