import Image from 'next/image';
import { JetBrains_Mono } from 'next/font/google';

import utilStyles from '../styles/utils.module.css';
import styles from './title.module.css';

const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: '800' });


const Title = () => {
    return (
        <div className={styles.container}>
            <Image src='/images/logo.svg' height={60} width={60} alt='logo'/>
            <h1 className={`${jetBrainsMono.className} ${utilStyles.colPrimary}`}>Sapien Think</h1>
        </div>
    );
};


export default Title;
