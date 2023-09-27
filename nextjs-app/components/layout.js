import Head from 'next/head';

import TopBar from './topBar';
import BottomBar from './bottomBar';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';


export default function Layout({ children, pageTitle, pageDesc }) {
  return (
    <div className={`${styles.pageContainer} ${utilStyles.colThemeBg}`}>
      <Head>
        <title>{pageTitle}</title>
        <meta name='description' content={pageDesc} />
      </Head>
      <TopBar title={pageTitle} scrollThresholdPx={200} />

      <main className={styles.pageContent}>{children}</main>

      <BottomBar />
    </div>
  );
}
