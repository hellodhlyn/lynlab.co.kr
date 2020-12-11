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
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 leading-relaxed">
        <NavBar />
        <div className="pt-20">
          <Component {...pageProps} />
        </div>
      </div>
    </>
  );
}

export default MyApp;
