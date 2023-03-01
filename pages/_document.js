import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta
          name='google-site-verification'
          content='55AW612_8T7j4pFXCaWLfRA6Icue3Gredo7R9WVNl6E'
        />
        <meta name='robots' content='all' />
        <link
          href='https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;700&display=swap'
          rel='stylesheet'
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `if (window.location.origin.includes("webcache.googleusercontent.com")) { window.OhistoryReplaceState = window.history["replaceState"]; window.history["replaceState"] = (...args)=> { try { return window.OhistoryReplaceState.apply(window.history, args) } catch (e) { console.log(e) } }; window.OhistoryPushState = window.history["pushState"]; window.history["pushState"] = (...args)=> { try { return window.OhistoryPushState.apply(window.history, args) } catch (e) { console.log(e) } }; } `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
