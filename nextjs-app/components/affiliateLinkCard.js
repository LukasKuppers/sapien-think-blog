import styles from './affiliateLinkCard.module.css';
import utilStyles from '../styles/utils.module.css';
import { jetBrainsMono } from '../lib/fonts';

const ASSOCIATES_TRACKING_ID = 'sapienthink06-20';


/**
   * Given a source reference (as plain string), extract the author(s) and title of work.
   * @param {String} reference - the reference as a plain string.
   * @returns an array with two values, the first is the author(s), the second is the title of the work.
   */
const extractAuthorsAndTitle = (reference) => {
  // process author lists with middle name initials
  // collapses patterns like 'G. W. F.' to 'G.'
  const regex = /([A-Z])\.(\s[A-Z]\.)+/g;
  reference = reference.replace(regex, '$1.');

  // remove all " characters
  reference = reference.replace(/"/g, '');
  
  const sections = reference.split('. ');
  const filteredSections = sections
    .filter(str => str[0] !== '(')      // remove *some* dates
    .filter(str => str !== 'in');       // remove filler info
      
  return [filteredSections[0], filteredSections[1]];
};


const AffiliateLinkCard = ({ reference }) => {

  const getSearchTerm = () => {
    const [author, title] = extractAuthorsAndTitle(reference);
    return `${author}, ${title}`;
  };

  const getAffiliateLink = () => {
    return `https://www.amazon.ca/gp/search?ie=UTF8&tag=${ASSOCIATES_TRACKING_ID}&linkCode=ur2&camp=15121&creative=330641&index=books-ca&keywords=${getSearchTerm()}`;
  };

  return (
    <a className={`${styles.container} ${jetBrainsMono.className}`} target='_blank' href={getAffiliateLink()}>
      <span className={`${styles.adDisclaimer} ${utilStyles.colSecondary}`}>Ad</span>
      {getSearchTerm()}
    </a>
  );
};


export default AffiliateLinkCard;
