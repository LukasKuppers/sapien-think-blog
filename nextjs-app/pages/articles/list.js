import Image from 'next/image';

import { getAllArticleIds } from '../../lib/articles';

import Layout from "../../components/layout";
import ArticleCard from '../../components/articleCard';
import styles from '../../styles/posts/list.module.css';
import utilStyles from '../../styles/utils.module.css';
import { jetBrainsMonoBold, jetBrainsMono, merriweather } from '../../lib/fonts';

const text = require('../../textChunks.json');


export async function getStaticProps() {
  const allArticles = await getAllArticleIds();
  let articlesList = allArticles.map(articleData => articleData.params);

  // sort by title
  articlesList = articlesList.sort((a, b) => a.title.localeCompare(b.title));

  return {
    props: {
      articlesList
    }
  };
}


const List  = ({ articlesList }) => {
  return (
    <Layout pageTitle={text.allArticlesTitle} pageDesc={text.allArticlesDesc}>
      <div className={`${styles.container}`}>
        <div className={styles.headingContainer}>
          <Image src='/images/scrolls.svg' width={200} height={200} />
          <h1 className={`${utilStyles.colPrimary} ${jetBrainsMonoBold.className}`}>Articles A-Z</h1>
        </div>
        <div className={`${styles.contentContainer} ${jetBrainsMono.variable} 
                         ${merriweather.variable} ${utilStyles.colPrimary}`}>
          {articlesList.map(article => <ArticleCard article={article} />)}
        </div>
      </div>
    </Layout>
  )
}


export default List;