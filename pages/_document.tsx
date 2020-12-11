import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';

export default class MyDoucment extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link href="https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css" rel="stylesheet" type="text/css" />
        </Head>
        <body>
          <script type="text/javascript" src="/scripts/theme.js" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
