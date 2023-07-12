import '../styles/globals.css'
import '../styles/glyphicons.css'
import '../styles/icons.css'
import 'bootstrap/dist/css/bootstrap.css'
import Template from '../src/components/template/template'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

function TDIFrmwk({ Component, pageProps }) {
    const router = useRouter();
    useEffect(() => {
        import("bootstrap/dist/js/bootstrap");
        import("@popperjs/core");

        if (router.asPath === '/') {
            router.push('/extranet');
        }
    }, [router]);


    if (router.asPath === '/intranet' || router.asPath === '/extranet' || router.asPath === '/intranet/password_reset') {
        if(router.pathname.startsWith('/extranet')){
            import("../styles/extranet/extranet.css");
        }
        else{
            import("../styles/intranet/intranet.css");
        }
        return (<Component {...pageProps} />);
    }
    else {
        if(router.pathname.startsWith('/extranet')){
            import("../styles/extranet/extranet.css");
        }
        else{
            import("../styles/intranet/intranet.css");
        }
        return (
            <Template>
                <Component {...pageProps} />
            </Template>
        )
    }

}

export default TDIFrmwk
