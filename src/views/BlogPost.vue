<template>
  <div id="blog-post">
    <div id="header">
      <div class="layer img">
        <img src="../assets/header.jpg">
      </div>
      <div class="layer data">
        <div class="container">
          <p id="tags">#Golang #Docker</p>
          <h1>초경량 Golang Docker 이미지 만들기</h1>
          <p>Scratch 이미지를 이용해 Docker 이미지를 778MB에서 1MB로 경량화 시키는 방법!</p>
          <p>2018. 09. 10. ・ 251명 읽음</p>
        </div>
      </div>
    </div>

    <div class="container" id="contents" v-if="!post">
      <list-loader></list-loader>
    </div>
    <div class="container" id="contents" v-else>
      <!-- Content here -->
    </div>

    <div class="container" id="footer">
      <VueDisqus shortname="lynlab" :url="'https://lynlab.co.kr' + this.$route.fullPath"></VueDisqus>

      <img alt="크리에이티브 커먼즈 라이선스" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png">
      <p>이 저작물은 <a href="https://creativecommons.org/licenses/by-sa/4.0/">크리에이티브 커먼즈 저작자표시-동일조건변경허락 4.0</a> 국제 라이선스에 따라 이용할 수 있습니다. </p>
    </div>

    <AddThis publicId="ra-5a8713a8c30b87b5"/>
  </div>
</template>

<style lang="scss" scoped>
a { color: #03A9F4; }

#header {
  height: 600px;
  width: 100%;
  color: #fafafa;

  .layer {
    width: 100%;
    position: absolute;
  }

  .img {
    img {
      height: 600px;
      width: 100%;
      filter: brightness(30%);
      object-fit: cover;
    }
  }

  .data {
    height: 480px;
    padding-top: 120px;

    h1 {
      font-size: 300%;
      font-weight: 300;
      margin: 0;
    }

    p {
      font-size: 18px;
      &#tags { margin: 36px 0 0 0; }
    }
  }
}

#contents {
  padding: 40px 0;
  margin: 0 auto;
  width: 800px;

  font-size: 18px;
  font-weight: 400;
  line-height: 2.0;
  word-break: break-all;

  img {
    display: block;
    max-width: 600px;
    margin: 40px auto;
  }

  pre code {
    padding: 20px;
    font-size: 14px;
  }

  blockquote {
    margin: 0;
    padding: 10px 20px;
    background-color: #F5F5F5;
    border-left: #E0E0E0 solid 10px;
  }
}

#footer {
  padding: 40px 0;
  text-align: center;

  hr {
    margin: 20px 0;
    border: 0;
    border-bottom: 1px solid;
    color: #e0e0e0;
  }

  p {
    margin: 0;
  }
}
</style>

<script>
export default {
  data() {
    return {
      post: null,
    };
  },
};
</script>
