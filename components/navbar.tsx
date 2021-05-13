import Link from 'next/link';
import { useEffect, useState } from 'react';
import contact from '../data/contact.json';

export default function NavBar() {
  const [theme, setTheme] = useState(String);

  useEffect(() => {
    if (theme === '') {
      setTheme(localStorage.getItem('lynlab.theme') || 'light');
    }
    localStorage.setItem('lynlab.theme', theme);
    theme === 'light' ? document.body.classList.remove('dark') : document.body.classList.add('dark');
  });

  return (
    <div className="w-full h-16 md:h-20 fixed px-4 md:px-8 flex flex-wrap bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-300
                    bg-opacity-80 border-b border-gray-300 dark:border-gray-800 items-center content-center transition-color z-50">
      <div className="flex flex-wrap items-center md:text-lg tracking-tighter">
        <Link href="/">
          <img className="h-10 md:h-12 w-10 md:w-12 cursor-pointer transition-opacity hover:opacity-50"
               src={`/images/logo-${theme !== 'dark' ? 'black' : 'white'}.png`} alt="lynlab logo" />
        </Link>
        <Link href="/blog">
          <p className="ml-3 cursor-pointer transition-opacity hover:opacity-50">blog</p>
        </Link>
        <Link href="/about">
          <p className="ml-3 cursor-pointer transition-opacity hover:opacity-50">about</p>
        </Link>
      </div>

      <div className="flex-grow" />

      <div className="hidden mx-1 sm:flex flex-wrap content-center">
        {
          contact.map((item) => (
            <a href={item.link} target="_blank" key={`contact-${item.name}`}
               className="mr-3 cursor-pointer hover:opacity-50 transition-opacity">
              <i className={`text-xl bi-${item.icon} before:align-middle`} />
            </a>
          ))
        }
      </div>

      <div className="h-8 w-8 rounded-full flex bg-gray-900 text-white dark:bg-white dark:text-gray-900
                      justify-center items-center cursor-pointer hover:opacity-50 transition-opacity"
           onClick={() => setTheme(theme !== 'dark' ? 'dark' : 'light')}>
        {
          theme !== 'dark'
            ? <i className="text-lg bi-moon before:align-middle" />
            : <i className="text-lg bi-brightness-high before:align-middle" />
        }
      </div>
    </div>
  );
}
