import Head from 'next/head';

import { getAllArticleIds, getArticleData } from '../../lib/articles';
import DateDisplay from '../../components/date';
import TopBar from '../../components/topBar';
import UnsplashImage from '../../components/unsplashImage';
import utilStyles from '../../styles/utils.module.css';
import styles from '../../styles/posts/[id].module.css';
import { jetBrainsMonoBold, jetBrainsMono, merriweather, montserrat } from '../../lib/fonts';


export async function getStaticPaths() {
  const paths = await getAllArticleIds();

  // currently rendering all existent articles at build time
  return {
    paths, 
    fallback: 'blocking' // ensure any paths not returned from getStaticPaths will result in 404 page
  };
}


export async function getStaticProps({ params }) {
  const articleData = await getArticleData(params.id);

  return {
    props: {
      articleData
    }
  };
}


const Post = ({ articleData }) => {
  return (
    <div className={`${styles.pageContainer} ${utilStyles.colThemeBg}`}>
      <Head>
        <title>{articleData.title}</title>
      </Head>
      <TopBar title={articleData.title} scrollThresholdPx={200} />

      <article className={styles.articleContainer}>
        <h1 className={`${jetBrainsMonoBold.className} ${utilStyles.heading2Xl}`}>{articleData.title}</h1>
        {articleData.subtitle ? 
          <span className={`${montserrat.className} ${utilStyles.headingLg}`}>{articleData.subtitle}</span> : ''}
        <div className={utilStyles.lightText}>
          <DateDisplay timestamp={articleData.date} />
        </div>
        <br />
        {articleData.image ? <UnsplashImage imageData={articleData.image} /> : <hr />}
        <br />
        <div className={styles.articleContentContainer}>
          <div
            className={`${jetBrainsMono.variable} ${jetBrainsMonoBold.variable} ${merriweather.variable}`} 
            dangerouslySetInnerHTML={{ __html: articleData.content }} />
        </div>
      </article>
    </div>
  );
};


export default Post;
