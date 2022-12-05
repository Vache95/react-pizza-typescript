import React, { useCallback, useContext, useRef, useState } from 'react';
import styles from './search.module.scss';
import Close from '../../assets/img/close.svg';
import debounce from 'lodash.debounce';
import { SearchContext } from '../../App';
const Search = () => {
  const [value, setValue] = useState('');
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const inputRef = useRef();

  const onClickClear = () => {
    setSearchValue('');
    setValue('');
    inputRef.current.focus();
  };

  const updateInput = useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 1000),
    [],
  );

  const onChangeInputs = (event) => {
    setValue(event.target.value);
    updateInput(event.target.value);
  };
  return (
    <div className={styles.root}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={styles.icon}>
        <title />
        <g id="search">
          <path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z" />
        </g>
      </svg>
      <input
        ref={inputRef}
        onChange={(event) => onChangeInputs(event)}
        className={styles.input}
        placeholder="Поиск пиццы..."
        value={value}
      />
      {value && (
        <img className={styles.clearIcon} src={Close} alt="cose" onClick={() => onClickClear()} />
      )}
    </div>
  );
};

export default Search;