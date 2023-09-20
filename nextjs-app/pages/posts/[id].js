import Head from 'next/head';

import { getAllPostIds, getPostData } from '../../lib/posts';
import Date from '../../components/date';
import TopBar from '../../components/topBar';
import utilStyles from '../../styles/utils.module.css';
import styles from '../../styles/posts/[id].module.css';


export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths, 
        fallback: false // ensure any paths not returned from getStaticPaths will result in 404 page
    };
}


export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData
        }
    };
}


const Post = ({ postData }) => {
    return (
        <div className={`${styles.pageContainer} ${utilStyles.colThemeBg}`}>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <TopBar title={postData.title} scrollThresholdPx={200} />

            <article className={styles.articleContainer}>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </div>
    );
};


export default Post;
