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
          <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;700;900&display=swap" rel="stylesheet" />
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
