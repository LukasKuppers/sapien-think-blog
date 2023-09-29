import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { getAllArticleIds } from '../../lib/articles';

import Layout from "../../components/layout";
import ArticleSearchBar from '../../components/articleSearchBar';
import ArticleCard from '../../components/articleCard';
import styles from '../../styles/posts/list.module.css';
import utilStyles from '../../styles/utils.module.css';
import { jetBrainsMonoBold, jetBrainsMono, merriweather, montserrat } from '../../lib/fonts';

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

  const searchParams = useSearchParams();

  const ifSearchParam = (yes, no) => {
    const query = searchParams.get('search');

    return query ? yes(query) : no();
  };

  const getFilteredArticles = () => {
    return ifSearchParam(
      (query) => {
        const finalQuery = query.toLowerCase();
        return articlesList.filter((article) => {
          const title = article.title.toLowerCase();
          return title.includes(finalQuery);
        });
      }, 
      () => {
        return articlesList;
      });
  };

  const getSearchTitle = () => {
    return ifSearchParam(
      (query) => {
        return `Search Results for: ${query}`
      }, 
      () => {
        return '';
      });
  };

  return (
    <Layout pageTitle={text.allArticlesTitle} pageDesc={text.allArticlesDesc}>
      <div className={`${styles.container}`}>
        <div className={styles.headingContainer}>
          <Image src='/images/scrolls.svg' width={200} height={200} alt='scrolls stack on eachother' />
          <h1 className={`${utilStyles.colPrimary} ${jetBrainsMonoBold.className}`}>Articles A-Z</h1>
        </div>

        <ArticleSearchBar />

        <h2 className={`${jetBrainsMono.className} ${utilStyles.colPrimary}`}>{getSearchTitle()}</h2>
        {ifSearchParam(
          () => <Link className={`${montserrat.className} ${utilStyles.colPrimary}`} 
                      href='/articles/list'>🡠 See All Articles</Link>, 
          () => '')}
        <div className={`${styles.contentContainer} ${jetBrainsMono.variable} 
                         ${merriweather.variable} ${utilStyles.colPrimary}`}>
          {getFilteredArticles().map(article => <ArticleCard key={article.id} article={article} />)}
        </div>
      </div>
    </Layout>
  )
}


export default List;