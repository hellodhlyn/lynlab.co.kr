<template>
  <div id="index">
    <div id="content">
      <div id="header">
        <h1 id="title">
          Do Hoerin
        </h1>
        <h2>Software Developer, since 2007</h2>
        <div class="actions">
          <nuxt-link :to="{ name: 'blog' }">
            <div class="action">
              BLOG
            </div>
          </nuxt-link>
          <a href="mailto:lyn@lynlab.co.kr"><div class="action">CONTACT</div></a>
        </div>
      </div>

      <h3>Profile</h3>
      <h4>Experience</h4>
      <p>
        <strong><a href="https://dunamu.com" target="_blank">주식회사 두나무</a> —</strong>
        백엔드 소프트웨어 개발자 (2016. 3 ~)<br>
        암호화폐 거래소 <a href="https://upbit.com" target="_blank">업비트</a> 백엔드 개발 및 운영 (2017 ~)<br>
        <a href="https://dunamu.com/views/02_wedo_stockplus_ko.html" target="_blank">카카오스탁</a>,
        <a href="https://finance.daum.net" target="_blank">다음금융</a> 서비스 백엔드 개발 및 레거시 시스템 유지보수 (2016 ~ 2018)
      </p>
      <p>
        <strong>SW마에스트로 과정 연수생</strong> (2015)<br>
        미래창조과학부 SW마에스트로 과정 6기 1단계 과정 연수
      </p>
      <p>
        <strong>안드로이드 1인 개발</strong> (2010 ~ 2016)<br>
        안드로이드 애플리케이션 1인 개발 및 서비스 운영<br>
        "결함 찾기" 서비스는 전세계 24만 다운로드 기록
      </p>

      <h4>Education</h4>
      <p>
        <strong>연세대학교</strong> (2014. 3 ~)<br>
        공과대학 컴퓨터과학과 학부 재학<br>
        공과대학 프로그래밍 동아리 <a href="https://poolc.org" target="_blank">PoolC</a> 회원 (2015 ~), 동아리장 (2016)
      </p>
      <p><strong>경남과학고등학교</strong> (2012. 3 ~ 2014. 2)</p>

      <h4>Awards</h4>
      <p>
        <strong>한국정보올림피아드 —</strong> 다수 수상 (2009 ~ 2013)<br>
        지역본선 동/은/금상, 전국대회 장려상<br>
        국제정보올림피아드(IOI) 교육생
      </p>
      <p>
        <strong>삼성휴먼테크 논문대상 —</strong> 수학/전산 부문 금상(1등상) (2013)<br>
        Apparatus and Method for Correcting Display<br>
        특허 출원 : 디스플레이 보정 장치 및 방법 (10-2014-0192784)
      </p>

      <h3>Social / Contacts</h3>
      <div class="icons">
        <div class="icon github">
          <a href="https://github.com/hellodhlyn" target="_blank"><img src="~/assets/icons/github.svg"></a>
        </div>
        <div class="icon twitter">
          <a href="https://twitter.com/hellodhlyn" target="_blank"><img src="~/assets/icons/twitter.svg"></a>
        </div>
        <div class="icon instagram">
          <a href="https://instagram.com/hellodhlyn" target="_blank"><img src="~/assets/icons/instagram.svg"></a>
        </div>
        <div class="icon gmail">
          <a href="mailto:lyn@lynlab.co.kr" target="_blank"><img src="~/assets/icons/gmail.svg"></a>
        </div>
      </div>

      <div id="footer">
        <p>© {{ 1900 + new Date().getYear() }} Do Hoerin, LYnLab</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#index {
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(to right top, #7e57c2, #0083e5, #00a0d2, #00b29e, #66bb6a);
  background-repeat: no-repeat;
  background-attachment: fixed;
  color: #ffffff;
  overflow-y: scroll;
}

#header {
  margin: 60px 0;
}

#footer {
  margin-top: 100px;

}

#content {
  padding: 80px;

  h1 {
    margin: 0;
    font-size: 500%;
    font-weight: 900;
  }

  h2 {
    font-size: 200%;
    font-weight: 100;
  }

  h3 {
    margin-top: 120px;
    margin-bottom: 20px;
    font-size: 250%;
    font-weight: 900;
  }

  h4 {
    margin-top: 40px;
    margin-bottom: 0;
    font-size: 150%;
    font-weight: 900;

    &:first-of-type { margin-top: 0; }
  }

  p {
    margin: 15px 0;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.8;

    a {
      color: #ffffff;
    }
  }

  strong {
    font-weight: 900;
  }

  .actions {
    margin: 40px 0;
    display: flex;
    width: 100%;

    a { text-decoration: none; }

    .action {
      width: 80px;
      height: 45px;
      line-height: 45px;
      margin: 0 5px;
      padding-left: 30px;
      padding-right: 30px;
      border-radius: 45px;
      background: #ffffff;
      text-align: center;
      color: #212121;
      font-weight: 900;

      &:hover { background-color: #eeeeee; }
    }
  }

  .icons {
    display: flex;

    .icon {
      margin-right: 10px;
      height: 50px;
      width: 50px;
      border-radius: 25px;

      img {
        padding: 10px;
        width: 30px;
        height: 30px;
      }

      &.github { background-color: #181717; };
      &.twitter { background-color: #1da1f2; };
      &.instagram { background-color: #e4405f; };
      &.gmail { background-color: #d14836; };
      &.go { background-color: #76e1fe; };
      &.graphql { background-color: #e10098; };
      &.nuxtjs { background-color: #00c58e; };
      &.gcp { background-color: #4285f4; };
      &.kubernetes { background-color: #326ce5; };
    }
  }
}
</style>
