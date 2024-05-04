import React from 'react';
import App from 'next/app';
import Head from 'next/head';
// import Layout from "./layout"
import { ThemeProvider } from 'next-themes'
/* import { UserProvider } from '../contexts/UserContext'; */

import '../styles/globals.css';

class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;

        return (
            <ThemeProvider>
                    <Head>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <title>Lista Dinamica</title>
                    </Head>

                    <Component {...pageProps} />
            </ThemeProvider>
        );
    }
}

export default MyApp;



