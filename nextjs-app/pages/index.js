import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import styles from '../styles/index.module.css';
import Title from '../components/title';
const text = require('../textChunks.json');


const Home = ({ screenWidth }) => {
  
  const [windowWidth, setWindowWidth] = useState(0);

  // keep track of window width
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

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
      </Head>

      <div className={styles.layoutContainer}>
        <div className={styles.layoutPortion}>
          <Title size={getTitleSize()} />
        </div>
        <div className={styles.layoutPortion}><span /></div>
      </div>
    </div>
  );
};


export default Home;
