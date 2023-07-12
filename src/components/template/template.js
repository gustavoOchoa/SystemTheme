import React from 'react';
import Head from "next/head";
import Footer from "./footer";
import { useRouter } from "next/router";
/** REDUX CONFIG */
import { store } from "../../store/store";
import { Provider } from 'react-redux';
import Main from "./main";

function Template({children}) {

    let router = useRouter();
    if (router.asPath.includes('/security')) {
        return (
            <>
                <Head>
                    <title>{process.env.page_title}</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <meta name="description" content="Generated by create next app"/>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>
                <div id="root" className="">
                    <div className='Loader'>
                        {children}
                    </div>
                    <Footer/>
                </div>
            </>
        );
    } else {

        return (
            <>
                <Head>
                    <title>{process.env.page_title}</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <meta name="description" content="Generated by create next app"/>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>
                <Provider store={store}>
                    <Main>{children}</Main>
                </Provider>
            </>
        );
    }

}

export default Template;