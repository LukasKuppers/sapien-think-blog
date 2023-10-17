import Image from 'next/image';

import Layout from "../components/layout";
import styles from '../styles/about.module.css';
import utilStyles from '../styles/utils.module.css';
import { jetBrainsMonoBold, jetBrainsMono, merriweather } from '../lib/fonts';

const text = require('../textChunks.json');


const About  = () => {
  return (
    <Layout pageTitle={text.aboutTitle} pageDesc={text.aboutDesc}>
      <div className={`${styles.container}`}>
        <div className={styles.headingContainer}>
          <Image src='/images/socrates.svg' alt='socrates sitting contemplatively' width={200} height={200} />
          <h1 className={`${utilStyles.colPrimary} ${jetBrainsMonoBold.className}`}>About</h1>
        </div>
        <div className={`${styles.contentContainer} ${jetBrainsMono.variable} 
                         ${merriweather.variable} ${utilStyles.colPrimary}`}>
          <p>{text.aboutIntro}</p>
          <h2>Our Philosophy</h2>
          <p>{text.aboutPhilosophy}</p>
          <h2>Nurturing Curiosity</h2>
          <p>{text.aboutNurturingCuriosity}</p>
          <h2>Our Commitment</h2>
          <p>{text.aboutCommitment}</p>
          <br />
          <h2>Disclosure</h2>
          <p>{text.aboutDisclosures}</p>
        </div>
      </div>
    </Layout>
  )
}


export default About;
