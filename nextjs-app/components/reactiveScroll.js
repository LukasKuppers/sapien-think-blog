import styles from './reactiveScroll.module.css';


const ReactiveScroll = ({ children }) => {
  return (
    <div className={`${styles.container}`}>
      {children}
    </div>
  );
};


export default ReactiveScroll;
