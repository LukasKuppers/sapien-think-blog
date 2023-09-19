import '../styles/globals.css';
import utilStyles from '../styles/utils.module.css';


const App = ({ Component, pageProps }) => {
    return (
        <div className={`app-wrapper ${utilStyles.colThemeBg}`}>
            <Component {...pageProps} />
        </div>
    );
};


export default App;
