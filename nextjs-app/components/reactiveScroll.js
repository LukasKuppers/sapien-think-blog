import React, { useRef, useEffect, useState } from 'react';

import styles from './reactiveScroll.module.css';
import utilStyles from '../styles/utils.module.css';


const ReactiveScroll = ({ children }) => {

  const containerRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const container = containerRef.current;

    const overflow = container.scrollHeight > container.clientHeight;
    setIsOverflowing(overflow);
  }, []);

  return (
    <div ref={containerRef} className={`${isOverflowing ? styles.containerScroll : styles.container}`}>
      {isOverflowing ? <div className={`${styles.blockerTop} ${utilStyles.colThemeBg}`} /> : ''}
      <div className={styles.scrollContent}>
        {children}
      </div>
      {isOverflowing ? <div className={`${styles.blockerBottom} ${utilStyles.colThemeBg}`} /> : ''}
    </div>
  );
};


export default ReactiveScroll;
