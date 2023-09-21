import Head from 'next/head';

import { getAllArticleIds, getArticleData } from '../../lib/articles';
import DateDisplay from '../../components/date';
import TopBar from '../../components/topBar';
import utilStyles from '../../styles/utils.module.css';
import styles from '../../styles/posts/[id].module.css';
import { jetBrainsMonoBold, jetBrainsMono, merriweather } from '../../lib/fonts';


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
        <title>{articleData.data.title}</title>
      </Head>
      <TopBar title={articleData.data.title} scrollThresholdPx={200} />

      <article className={styles.articleContainer}>
        <h1 className={`${utilStyles.headingXl} ${jetBrainsMonoBold.className}`}>{articleData.data.title}</h1>
        <div className={utilStyles.lightText}>
          <DateDisplay timestamp={articleData.data.date} />
        </div>
        <div
          className={`${jetBrainsMono.variable} ${jetBrainsMonoBold.variable} ${merriweather.variable}`} 
          dangerouslySetInnerHTML={{ __html: articleData.content }} />
      </article>
    </div>
  );
};


export default Post;
