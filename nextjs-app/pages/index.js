import Head from 'next/head';
import Image from 'next/image';

import styles from '../styles/index.module.css';
import utilStyles from '../styles/utils.module.css';
import Title from '../components/title';
const text = require('../textChunks.json');


const Home = () => {
  return (
    <div className={styles.pageContainer}>
      <Head>
        <title>{text.siteName}</title>
      </Head>

      <div className={styles.layoutContainer}>
        <div className={styles.layoutPortion}>
          <Title />
        </div>
        <div className={styles.layoutPortion}></div>
      </div>
    </div>
  );
};


export default Home;
