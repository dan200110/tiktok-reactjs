import { Wrapper as PopperWrapper } from '~/components/Popper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AccountItem from '~/components/AccoutItem';
import HeadlessTippy from '@tippyjs/react/headless';
import { faCircleQuestion, faCircleXmark, faEarthAsia, faEllipsisVertical, faEuro, faGear, faKeyboard, faMagnifyingGlass, faMessage, faSignOut, faSpinner, faUpload, faUser } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles)

function Search() {
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [showSearchResult, setShowSearchResult] = useState(true)
    const [loading, setLoading] = useState(false)


    const handleHideSearchResult = () => {
        setShowSearchResult(false)
    }

    useEffect(() => {
        if (!searchValue.trim()) {
            setSearchResult([])
            return
        }
        setLoading(true)
        fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(searchValue)}&type=less`)
            .then(res => res.json())
            .then(res => {
                setSearchResult(res.data);
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }, [searchValue])

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