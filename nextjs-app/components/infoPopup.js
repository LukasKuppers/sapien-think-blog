import React, { useState } from 'react';

import styles from './infoPopup.module.css';
import utilStyles from '../styles/utils.module.css';
import { jetBrainsMono, montserrat } from '../lib/fonts';


const InfoPopup = ({ infoText }) => {

  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className={`${styles.container} ${jetBrainsMono.className}`}>
      <span 
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >i</span>
      <p className={`${styles.popup} ${isHovering && styles.show} ${montserrat.className} ${utilStyles.colPrimaryBg} ${utilStyles.colTheme}`}>
        {infoText}
      </p>
    </div>
  );
};


export default InfoPopup;
