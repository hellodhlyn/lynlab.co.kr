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
    <div className="h-16 px-6 flex flex-wrap dark:bg-gray-900 text-gray-900 dark:text-gray-300 content-center transition-color">
      <div className="flex flex-wrap items-center gap-x-4 tracking-wider">
        <Link href="/">
          <img className="h-12 w-12 cursor-pointer transition-opacity hover:opacity-50"
               src={`/images/logo-${theme !== 'dark' ? 'black' : 'white'}.png`} alt="lynlab logo" />
        </Link>
        <Link href="/blog">
          <p className="cursor-pointer transition-opacity hover:opacity-50">Blog</p>
        </Link>
        <Link href="/resume">
          <p className="cursor-pointer transition-opacity hover:opacity-50">Resume</p>
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
