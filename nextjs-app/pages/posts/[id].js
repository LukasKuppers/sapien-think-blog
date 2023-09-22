import Head from 'next/head';
import Image from 'next/image';

import { getAllArticleIds, getArticleData } from '../../lib/articles';
import DateDisplay from '../../components/date';
import TopBar from '../../components/topBar';
import utilStyles from '../../styles/utils.module.css';
import styles from '../../styles/posts/[id].module.css';
import { jetBrainsMonoBold, jetBrainsMono, merriweather, montserrat } from '../../lib/fonts';


export async function getStaticPaths() {
  // const paths = getAllPostIds();
  const paths = await getAllArticleIds();

  return {
    paths, 
    fallback: false // ensure any paths not returned from getStaticPaths will result in 404 page
  };
}


export async function getStaticProps({ params }) {
  // const postData = await getPostData(params.id);
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
        {articleData.thumbnail ? 
          <img 
            src={articleData.thumbnail}
            alt='article thumbnail image'
            style={{width: '100%'}}
          /> : 
          <hr />}
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
