import Head from 'next/head';
import Image from 'next/image';

import utilStyles from '../styles/utils.module.css';
import Title from '../components/title';
const text = require('../textChunks.json');


const Home = () => {
  return (
    <div>
      <Head>
        <title>{text.siteName}</title>
      </Head>

      <Title />
    </div>
  );
};


export default Home;
