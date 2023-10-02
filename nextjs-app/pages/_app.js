import Script from 'next/script';

import '../styles/globals.css';
import utilStyles from '../styles/utils.module.css';


const App = ({ Component, pageProps }) => {
  return (
    <div className={`app-wrapper ${utilStyles.colThemeBg}`}>
      {/* Google tag (gtag.js) */}
      <Script strategy='lazyOnload' src="https://www.googletagmanager.com/gtag/js?id=G-1RFVFJFGX6"></Script>
      <Script strategy='lazyOnload'>
        {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-1RFVFJFGX6');`}
      </Script>

      <Component {...pageProps} />
    </div>
  );
};


export default App;
