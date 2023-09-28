import Image from 'next/image';
import Link from 'next/link';

import styles from './bottomBar.module.css';
import utilStyles from '../styles/utils.module.css';
import { montserrat } from '../lib/fonts';


const BottomBar = () => {
  return (
    <div className={`${styles.container} ${utilStyles.colPrimary} ${montserrat.className}`}>
      <div className={styles.logoContainer}>
        <Image src='/images/logo.svg' height={50} width={50} alt='logo'/>
        <span>© sapienthink.com</span>
      </div>
      <div className={styles.linkContainer}>
        <Link className={utilStyles.colPrimary} href='/'>Home</Link>
        <Link className={utilStyles.colPrimary} href='/about'>About</Link>
        <Link className={utilStyles.colPrimary} href='/articles/list'>All Articles</Link>
      </div>
    </div>
  )
};


export default BottomBar;
