import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';
import { gaTrackingId } from '../lib/gtag';

export default class MyDoucment extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaTrackingId}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
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
