import React, { useEffect, useState } from 'react';

import Title from './title';
import styles from './topBar.module.css';
import utilStyles from '../styles/utils.module.css';
import { jetBrainsMono } from '../lib/fonts';


const TopBar = ({ title, scrollThresholdPx }) => {

  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [displayTitle, setDisplayTitle] = useState(true);

  // setup scrolling functionality for fading in title
  useEffect(() => {
    // dont display title on mobile
    if (window.innerWidth <= 768) {
      setDisplayTitle(false);
    } else {
      // add listener for scroll amount
      const handleScroll = () => {
        const scrollAmount = window.scrollY;
        setIsTitleVisible(scrollAmount >= scrollThresholdPx);
      };

      handleScroll();
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      }
    }
  }, []);

  return (
    <div className={`${styles.container} ${utilStyles.colSecondaryBorder}`}>
      <Title size='s' />
      {displayTitle ?
        <span className={`${styles.title} ${jetBrainsMono.className} ${isTitleVisible ? styles.visible : ''}`}>
          | {title ? title : ''}
        </span> : ''}
    </div>
  )
};


export default TopBar;
