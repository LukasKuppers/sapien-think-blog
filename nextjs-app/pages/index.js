import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import styles from '../styles/index.module.css';
import utilStyles from '../styles/utils.module.css';
import Title from '../components/title';
import { merriweather } from '../lib/fonts';
const text = require('../textChunks.json');


const Home = () => {
  
  const [windowWidth, setWindowWidth] = useState(0);

  // keep track of window width
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // clean up listener when component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  const getTitleSize = () => {
    if (windowWidth < 874) {
      return 's';
    }
    if (windowWidth < 1386) {
      return 'm';
    }
    return 'l';
  };

  return (
    <div className={styles.pageContainer}>
      <Head>
        <title>{text.siteName}</title>
        <meta name='description' content='Explore ideas and their origins. Read articles on philosophy topics including books, thinkers, and history.' />
      </Head>

      <div className={styles.layoutContainer}>
        <div className={styles.layoutPortion}>
          <div>
            <Title size={getTitleSize()} />
            <br />
            <span className={`${merriweather.className} ${utilStyles.colSecondary}`}>{text.landingPageIntro}</span>
          </div>
        </div>
        <div className={styles.layoutPortion}><span /></div>
      </div>
    </div>
  );
};


export default Home;
