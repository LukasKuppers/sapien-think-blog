import DateDisplay from './date';
import styles from './articleCard.module.css';
import utilStyles from '../styles/utils.module.css';
import { jetBrainsMono } from '../lib/fonts';


const ArticleCard = ({ article }) => {
  return (
    <div className={`${styles.container} ${utilStyles.colPrimary}`}>
      {article.thumbnail_link ? 
        <img src={article.thumbnail_link} /> : ''}
      <h1 className={jetBrainsMono.className}>{article.title}</h1>
      <DateDisplay timestamp={article.date} />
    </div>
  );
};


export default ArticleCard;
