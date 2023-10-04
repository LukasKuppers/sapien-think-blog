import styles from './tagsDisplay.module.css';
import utilStyles from '../styles/utils.module.css'
import { merriweather, jetBrainsMono } from '../lib/fonts';


const TagsDisplay = ({ tags }) => {

  const renderTagsList = () => {
    return tags.map((tag) => {
      return (
        <div key={tag} className={`${styles.tag} ${jetBrainsMono.className}`}>
          {tag}
        </div>
      );
    });
  }

  return (
    <div className={`${styles.container} ${merriweather.className} ${utilStyles.colPrimary}`}>
      <hr />
      <div className={styles.tagsList}>
        Tags: {renderTagsList()}
      </div>
      <hr />
    </div>
  );
};


export default TagsDisplay;
