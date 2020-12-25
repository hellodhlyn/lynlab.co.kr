import { useRouter } from 'next/router';

export default function Footer() {
  const router = useRouter();
  if (router.pathname === '' || router.pathname === '/') {
    return null;
  }

  return (
    <div className="w-full p-4 md:p-8 border-t border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
      <div className="mx-auto text-xs">
        <img alt="크리에이티브 커먼즈 라이선스" src="https://i.creativecommons.org/l/by-sa/4.0/80x15.png" />
        <p className="py-2">본 사이트의 저작물은 별도의 언급이 없는 한&nbsp;
          <a className="underline hover:opacity-50 transition-opacity" href="https://creativecommons.org/licenses/by-sa/4.0/">크리에이티브 커먼즈 저작자표시-동일조건변경허락 4.0</a>&nbsp;
          국제 라이선스에 따라 이용할 수 있습니다.</p>
        <p>© 2011 - {new Date().getFullYear()} Hoerin Doh, All rights reserved.</p>
      </div>
    </div>
  );
}
