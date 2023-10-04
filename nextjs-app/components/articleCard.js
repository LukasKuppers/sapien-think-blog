import Link from 'next/link';

import DateDisplay from './date';
import styles from './articleCard.module.css';
import utilStyles from '../styles/utils.module.css';
import { jetBrainsMono, montserrat } from '../lib/fonts';


const ArticleCard = ({ article, condense }) => {

  const getThumbnailLink = () => {
    return article.thumbnail_link ?
      article.thumbnail_link :
      '/images/ruins.svg';
  };

  return (
    <Link href={`/articles/${article.id}`} className={`${styles.container} ${utilStyles.colPrimary}`}>
      {!condense ? 
        <div className={styles.thumbnailContainer}>
          <img src={getThumbnailLink()} alt='article image thumbnail' />
        </div> : ''}
      <h1 className={`${condense ? styles.titleSmall : styles.title} ${jetBrainsMono.className}`}>{article.title}</h1>
      {article.subtitle && !condense ? 
        <span className={montserrat.className}>{article.subtitle}</span> : ''}
      <DateDisplay timestamp={article.date} />
    </Link>
  );
};


export default ArticleCard;
