import { Wrapper as PopperWrapper } from '~/components/Popper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AccountItem from '~/components/AccoutItem';
import HeadlessTippy from '@tippyjs/react/headless';
import { faCircleQuestion, faCircleXmark, faEarthAsia, faEllipsisVertical, faEuro, faGear, faKeyboard, faMagnifyingGlass, faMessage, faSignOut, faSpinner, faUpload, faUser } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from '~/hooks';
import * as searchService from '~/apiServices/searchService';
import axios from 'axios';
import request from '~/utils/request';

const cx = classNames.bind(styles)

function Search() {
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [showSearchResult, setShowSearchResult] = useState(true)
    const [loading, setLoading] = useState(false)

    // 1: ''
    const debounced = useDebounce(searchValue, 500)

    const handleHideSearchResult = () => {
        setShowSearchResult(false)
    }

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([])
            return
        }

        const fetchApi = async () => {
            setLoading(true)

            const result = await searchService.searchUserName(debounced);
            setSearchResult(result);
            setLoading(false)

        }

        // const fetchApi = async () => {
        //     setLoading(true)
        //     try {
        //         const res = await request.get(`users/search`, {
        //             params: {
        //                 q: searchValue,
        //                 type: 'less'
        //             }
        //         });
        //         setSearchResult(res.data.data)
        //         setLoading(false)
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }
        
        fetchApi()
    }, [debounced])

    const inputRef = useRef()
    return (
        <HeadlessTippy
            interactive={true}
            visible={showSearchResult && searchResult.length > 0}
            render={attrs => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Accounts</h4>
                        {

                            searchResult.map((result) => (
                                <AccountItem key={result.id} data={result} />
                            ))
                        }

                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideSearchResult}

        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    placeholder='Search accounts and videos'
                    spellCheck={false}
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue}
                    onFocus={() => setShowSearchResult(true)}
                />

                {!!searchValue && !loading && (
                    <button className={cx('clear')} onClick={() => {
                        setSearchValue('')
                        inputRef.current.focus()
                    }}
                    >
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}

                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                <button className={cx('search-btn')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;