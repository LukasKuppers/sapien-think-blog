import Link from 'next/link';
import Image from 'next/image';

import utilStyles from '../styles/utils.module.css';
import styles from './content404.module.css';
import { jetBrainsMonoBold, jetBrainsMono, merriweather, montserrat } from '../lib/fonts';

const text = require('../textChunks.json');


const Content404 = () => {
  return (
      <div className={`${styles.container} ${utilStyles.colPrimary}`}>
        <div className={styles.headingContainer}>
          <Image src='/images/ruins.svg' width={200} height={200} />
          <div className={styles.statusContainer}>
            <h1 className={jetBrainsMonoBold.className}>404</h1>
            <span className={jetBrainsMono.className}>{text.notFoundStatus}</span>
          </div>
        </div>
        <br />
        <p className={merriweather.className}>
          {text.notFoundInfo}
        </p>
        <Link className={`${utilStyles.colPrimary} ${montserrat.className}`} href='/'>Home</Link>
      </div>
  );
};


export default Content404;
