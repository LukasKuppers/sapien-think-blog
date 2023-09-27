import Layout from "../components/layout";
import Content404 from "../components/content404";

const text = require('../textChunks.json');


const Custom404 = () => {
    return (
        <Layout pageTitle={text.notFoundTitle} pageDesc={text.notFoundDesc}>
          <Content404 />
        </Layout>
    );
};


export default Custom404;
