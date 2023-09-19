import Image from 'next/image';
import Link from 'next/link';

import utilStyles from '../styles/utils.module.css';
import styles from './title.module.css';
import { jetBrainsMonoBold } from '../lib/fonts';


const Title = ({ size }) => {
    
    const mapSizeToOption = (sizeMap) => {
        if (!sizeMap.hasOwnProperty(size)) {
            console.warn('Title: supplied size option is invalid. Size should be one of s, m or l');
            return sizeMap['m'];
        }
        return sizeMap[size];
    }

    const getLogoSize = () => {
        return mapSizeToOption({
            's': 50, 
            'm': 60, 
            'l': 100
        });
    };

    const getFontClass = () => {
        return mapSizeToOption({
            's': styles.textSmall, 
            'm': styles.textMedium, 
            'l': styles.textLarge
        });
    };

    return (
        <Link href='/' className={styles.container}>
            <Image src='/images/logo.svg' height={getLogoSize()} width={getLogoSize()} alt='logo'/>
            <h1 className={`${jetBrainsMonoBold.className} ${utilStyles.colPrimary} ${getFontClass()}`}
                >Sapien Think</h1>
        </Link>
    );
};


export default Title;
