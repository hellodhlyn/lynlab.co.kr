import Container from "~/components/atoms/Container";
import Href from "~/components/atoms/Href";

export default function Footer() {
  return (
    <Container className="py-16 mt-32 text-sm">
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

      <div className="mt-8 flex items-center text-base">
        <img className="h-12 w-12 mr-1" src="/images/logo-black.png" alt="LYnLab 로고" />
        <Href link="https://hello.dhlyn.me" underline={false}>
          <span className="mx-2">About Me</span>
        </Href>
        <Href link="https://github.com/hellodhlyn" underline={false}>
          <span className="mx-2">GitHub</span>
        </Href>
        <Href link="https://twitter.com/hellodhlyn" underline={false}>
          <span className="mx-2">Twitter</span>
        </Href>
        <Href link="https://instagram.com/hellodhlyn" underline={false}>
          <span className="mx-2">Instagram</span>
        </Href>
      </div>
    </Container>
  );
}
