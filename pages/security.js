import { useRouter } from "next/router";
import { useEffect } from "react";
import API, { setCookieToken } from '../src/components/API/API';

export default function Security() {
    const router = useRouter();
    const query = router.query;

    useEffect(() => {
        if (router.isReady) {
            let params = {
                'token' : query.token,
                'param' : query.param,
                'target' : query.target
            };
            let qry = Object.keys(params)
                .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                .join('&');
            let url = 'http://localhost/frmwk/framework/security?' + qry;

            fetch(
                url,
                {
                    method: "get",
                })
                .then((res) => res.json())
                .then(async (data) => {
                    if(data.code===200){
                        let retSuccess = await setCookieToken(query.token, query.param);
                        if(retSuccess.success){
                            router.push(query.target);
                        }
                        else{
                            router.push('/extranet');
                        }
                    }
                })
        }
    }, [router, query.param, query.token, query.target])
}




