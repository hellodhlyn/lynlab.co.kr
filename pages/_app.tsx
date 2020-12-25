import { AppProps } from 'next/app';
import Head from 'next/head';
import NextProgress from 'nextjs-progressbar';
import { useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'tailwindcss/tailwind.css';
import NavBar from '../components/navbar';
import Footer from '../components/footer';
import { pageview } from '../lib/gtag';

const pathsToHideNavBar = ['', '/'];
const pathsToHideFooter = ['', '/', '/404'];

function MyApp({ Component, pageProps, router }: AppProps) {
  const hideNavBar = pathsToHideNavBar.includes(router.pathname);
  const hideFooter = pathsToHideFooter.includes(router.pathname);

  useEffect(() => {
    const handleRouteChange = (url: URL) => pageview(url);
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);

  return (
    <>
      <Head>
        <title>LYnLab</title>
      </Head>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 leading-relaxed">
        <NextProgress color="#339af0" height={5} />
        {hideNavBar ? null : <NavBar />}
        <div className={hideFooter ? '' : 'pt-20'}>
          <Component {...pageProps} />
        </div>
        {hideFooter ? null : <Footer />}
      </div>
    </>
  );
}

export default MyApp;
