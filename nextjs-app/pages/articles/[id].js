import { getAllArticleIds, getArticleData, getRelatedArticles } from '../../lib/articles';
import Content404 from '../../components/content404';
import Layout from '../../components/layout';
import DateDisplay from '../../components/date';
import TagsDisplay from '../../components/tagsDisplay';
import UnsplashImage from '../../components/unsplashImage';
import ArticleCard from '../../components/articleCard';
import AffiliateLinkCard from '../../components/affiliateLinkCard';

import utilStyles from '../../styles/utils.module.css';
import styles from '../../styles/posts/[id].module.css';
import { jetBrainsMonoBold, jetBrainsMono, merriweather, montserrat } from '../../lib/fonts';

const text = require('../../textChunks.json');


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
  let propsObj = {
    props: {
      articleData
    }
  };

  // get related articles, if current has any tags
  if (articleData.tags) {
    let relatedArticles = await getRelatedArticles(articleData.tags);
    relatedArticles = relatedArticles.filter((article) => {
      return article.params.id !== articleData.id;
    });

    // include a max of three related articles
    propsObj.props.relatedArticles = getRandomElements(relatedArticles, 3);
  }

  return propsObj;
}


// helper: gets n random elements from array - returns new array
const getRandomElements = (array, n) => {
  if (n >= array.length) {
    return array.slice();
  }

  const shuffledArr = array.slice().sort(() => Math.random() - 0.5);
  return shuffledArr.slice(0, n);
};


const Post = ({ articleData, relatedArticles }) => {

  if (!articleData || !articleData.hasOwnProperty('content')) {
    // display 404 page
    return (
      <Layout pageTitle={text.notFoundTitle} pageDesc={text.notFoundDesc}>
        <Content404 />
      </Layout>
    )
  }

  const renderReferenceLinks = () => {
    const references = articleData.references;

    return (
      <div className={styles.referenceLinksContainer}>
        <span className={`${styles.relatedArticlesTitle} ${jetBrainsMono.className}`}>Referenced Works:</span>
        <div className={styles.relatedArticlesList}>
          {references.map(reference => <AffiliateLinkCard key={reference} searchTerm={reference} />)}
        </div>
      </div>
    );
  };

  const renderRelatedArticles = () => {
    return (
      <div className={styles.relatedArticlesContainer}>
        <span className={`${styles.relatedArticlesTitle} ${jetBrainsMono.className}`}>Related:</span>
        <div className={styles.relatedArticlesList}>
          {relatedArticles.map(article => <ArticleCard 
            key={article.params.id} 
            article={article.params}
            condense={true} />)}
        </div>
      </div>
    );
  };

  return (
    <Layout pageTitle={articleData.title} pageDesc={articleData.subtitle ? articleData.subtitle : articleData.title}>
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
        {articleData.tags ? 
          <TagsDisplay tags={articleData.tags} /> : ''}
      </article>
      {renderReferenceLinks()}
      <br />
      {relatedArticles ? renderRelatedArticles() : ''}
    </Layout>
  );
};


export default Post;
