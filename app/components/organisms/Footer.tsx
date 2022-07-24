export default function Footer() {
  return (
    <div className="max-w-6xl px-4 md:px-8 py-16 mt-32 mx-auto text-sm">
      <p>
        <img className="h-6 w-6 mr-1 inline" src="/images/cc.svg" alt="크리에이티브 커먼즈 라이선스"/>
        <img className="h-6 w-6 mr-1 inline" src="/images/by.svg" alt="크리에이티브 커먼즈 저작자표시"/>
        <img className="h-6 w-6 mr-1 inline" src="/images/sa.svg" alt="크리에이티브 커먼즈 동일조건변경허락"/>
      </p>
      <p className="py-2">
        본 사이트의 저작물은 별도의 언급이 없는 한&nbsp;
        <a className="underline hover:cursor-pointer" href="https://creativecommons.org/licenses/by-sa/4.0/deed.ko" target="_blank" rel="noreferrer">
          크리에이티브 커먼즈 저작자표시-동일조건변경허락 4.0 국제 라이선스
        </a>
        에 따라 이용할 수 있습니다.
      </p>
      <p>© 2011 - {(new Date()).getFullYear()} Hoerin Doh, All rights reserved.</p>
    </div>
  );
}
