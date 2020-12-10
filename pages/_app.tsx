import { AppProps } from 'next/app';
import Head from 'next/head';
import 'tailwindcss/tailwind.css';
import NavBar from '../components/navbar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>LYnLab</title>
      </Head>
      <div>
        <NavBar />
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
