import styles from './unsplashImage.module.css';
import { montserrat } from '../lib/fonts';

const APP_NAME = 'sapien_think';
const UNSPLASH_LINK = `https://unsplash.com/?utm_source=${APP_NAME}&utm_medium=referral`;


const UnsplashImage = ({ imageData }) => {

  const getPhotographerLink = () => {
    const username = imageData.photographer_username;
    return `https://unsplash.com/@${username}?utm_source=${APP_NAME}&utm_medium=referral`;
  };

  return (
    <div className={styles.container}>
      <img className={styles.unsplashImage}
        src={imageData.regular_link}
        alt={imageData.alt_text}
      />
      <span className={`${styles.credits} ${montserrat.className}`}>
        Photo by 
        <a href={getPhotographerLink()}>{imageData.photographer_name}</a>
        on 
        <a href={UNSPLASH_LINK}>Unsplash</a>
      </span>
    </div>
  );
};


export default UnsplashImage;
