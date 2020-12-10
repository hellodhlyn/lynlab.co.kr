import Link from 'next/link';
import 'css.gg/icons/css/moon.css';

export default function NavBar() {
  return (
    <div className="h-16 px-6 flex flex-wrap dark:bg-gray-900 text-gray-900 dark:text-gray-300 content-center">
      <div>
        <Link href="/">
          <img className="h-12 w-12 cursor-pointer transition-opacity hover:opacity-80" src="/images/logo-black.png" />
        </Link>
      </div>

      <div className="flex-grow" />

      <div className="flex flex-wrap content-center">
        <i className="h-8 w-8 gg-moon cursor-pointer transition-opacity hover:opacity-80" />
      </div>
    </div>
  );
}
