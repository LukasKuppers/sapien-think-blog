import styles from './affiliateLinkCard.module.css';
import { jetBrainsMono } from '../lib/fonts';

const ASSOCIATES_TRACKING_ID = 'sapienthink06-20';


const AffiliateLinkCard = ({ searchTerm }) => {
  
  const getAffiliateLink = () => {
    return `https://www.amazon.ca/gp/search?ie=UTF8&tag=${ASSOCIATES_TRACKING_ID}&linkCode=ur2&camp=15121&creative=330641&index=books-ca&keywords=${searchTerm}`;
  };

  return (
    <a className={`${styles.container} ${jetBrainsMono.className}`} target='_blank' href={getAffiliateLink()}>
      {searchTerm}
    </a>
  );
};


export default AffiliateLinkCard;
