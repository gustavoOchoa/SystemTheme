import { NextResponse } from "next/server";
import { paramDecode, paramEncode, getTokenVars } from './src/services/helpers/helpersService';

export async function middleware(req, event) {
    const {pathname} = req.nextUrl;
    if (pathname === '/intranet' || pathname === '/extranet' || pathname === '/intranet/password_reset' || pathname === '/extranet/password_reset') {
        return NextResponse.next();
    } else {
        let url = process.env.fmk_frmwk6 + 'security/checkurl';
        let cokie_param = await paramDecode(req.cookies.get('param'));
        let cokie_token = req.cookies.get('token');
        cokie_param.d_url = pathname.substring(1);
        let bparam = await paramEncode(cokie_param);
        let ret = await serverSecurity(url, cokie_token, bparam, req.nextUrl.pathname);
        let vars = await getTokenVars(cokie_token);
        let entorno = (vars.entorno).toLowerCase();
        switch (ret.code) {
            case 'OK':
                return NextResponse.next();
                break;
            case 'error_500':
                let target = req.nextUrl.clone();
                target.pathname = entorno + ret.target;
                return NextResponse.redirect(target);
                break;
            case 'error_back':
                let targ = req.nextUrl.clone();
                targ.pathname = entorno + ret.target;
                let res = NextResponse.redirect(targ);
                let options = {
                    sameSite: 'Strict',
                    expires: ret.expiration,
                    secure: false,
                    httpOnly: false
                };
                res.cookies.set('mensaje_error', ret.message, options);
                let param_cokie = await paramEncode(ret.cokie);
                res.cookies.set('param', param_cokie, options);
                return res;
                break;
        }
    }
}

async function serverSecurity(url, token, param, path) {
    let returnedData = {};
    let ret = await fetch(url, {
        headers: {
            'token': token,
            'param': param
        },
        method: 'POST',
        body: JSON.stringify({pathname: path}),
    });
    const data = await ret.json();
    console.log(data);
    if(ret.status === 500){
        returnedData.code = 'error_500';
        returnedData.target = '/500';
        returnedData.message = '';
        returnedData.cokie = '';
        returnedData.expiration = '';
        return returnedData;
    }
    else{
        if(data.code === 'NOOK'){
            returnedData.code = 'error_back';
            returnedData.target = '/dashboard';
            returnedData.message = data.mensaje;
            returnedData.cokie = data.cokie;
            returnedData.expiration = data.expiration;
            return returnedData;
        }
        else{
            returnedData.code = 'OK';
            returnedData.target = '';
            returnedData.message = '';
            returnedData.cokie = '';
            returnedData.expiration = '';
            return returnedData;
        }
    }
}

export const config = {
    matcher: ['/intranet/:path*', '/extranet/:path*', '/framework/:path*'],
};