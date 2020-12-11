import Link from 'next/link';
import { useEffect, useState } from 'react';
import 'css.gg/icons/css/moon.css';
import 'css.gg/icons/css/sun.css';

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
    <div className="w-full h-16 md:h-20 fixed px-4 md:px-6 flex flex-wrap bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-300
                    bg-opacity-80 border-b border-gray-300 dark:border-gray-800 content-center transition-color z-50">
      <div className="flex flex-wrap items-center md:text-lg gap-x-3 tracking-tighter">
        <Link href="/">
          <img className="h-10 md:h-12 w-10 md:w-12 cursor-pointer transition-opacity hover:opacity-50"
               src={`/images/logo-${theme !== 'dark' ? 'black' : 'white'}.png`} alt="lynlab logo" />
        </Link>
        <Link href="/blog">
          <p className="cursor-pointer transition-opacity hover:opacity-50">blog</p>
        </Link>
        <Link href="/resume">
          <p className="cursor-pointer transition-opacity hover:opacity-50">resume</p>
        </Link>
      </div>

      <div className="flex-grow" />

      <div className="flex flex-wrap content-center gap-x-2">
        {
          theme !== 'dark'
            ? <i className="h-8 w-8 gg-moon cursor-pointer transition-opacity hover:opacity-50"
                 onClick={() => setTheme('dark')} />
            : <i className="h-8 w-8 gg-sun cursor-pointer transition-opacity hover:opacity-50"
                 onClick={() => setTheme('light')} />
        }
      </div>
    </div>
  );
}
