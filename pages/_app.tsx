import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NextProgress from 'nextjs-progressbar';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'tailwindcss/tailwind.css';
import NavBar from '../components/navbar';
import Footer from '../components/footer';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isIndex = router.pathname === '' || router.pathname === '/';

  return (
    <>
      <Head>
        <title>LYnLab</title>
      </Head>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 leading-relaxed">
        <NextProgress color="#339af0" height={5} />
        <NavBar />
        <div className={isIndex ? '' : 'pt-20'}>
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default MyApp;
