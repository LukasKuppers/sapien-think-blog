import { useState } from 'react';
import { useRouter } from 'next/navigation';

import styles from './articleSearchBar.module.css';
import { jetBrainsMono } from '../lib/fonts';


const ArticleSearchBar = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const onChangeSearchQuery = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const searchPath = `/articles/list?search=${searchQuery}`;
    router.push(searchPath);

    // reset search bar
    setSearchQuery('');
  };

  return (
    <form onSubmit={handleSearchSubmit} className={styles.searchArea}>
      <input
        className={jetBrainsMono.className}
        onChange={onChangeSearchQuery}
        value={searchQuery}
        placeholder='Search Articles...'
        type='text'
      />
      <button className={jetBrainsMono.className} type='submit'>Search</button>
    </form>
  );
};


export default ArticleSearchBar;
