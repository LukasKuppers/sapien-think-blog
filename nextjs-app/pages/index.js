import Head from 'next/head';
import { JetBrains_Mono } from 'next/font/google';

import utilStyles from '../styles/utils.module.css';
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: '800' });
const text = require('../textChunks.json');


const Home = () => {
  return (
    <div>
      <Head>
        <title>{text.siteName}</title>
      </Head>

      <h1 className={`${jetBrainsMono.className} ${utilStyles.colPrimary}`}>sapien think</h1>
    </div>
  );
};


export default Home;
