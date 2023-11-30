import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Header.module.scss'
import images from '~/assets/images';
import { faCircleQuestion, faCircleXmark, faEarthAsia, faEllipsisVertical, faEuro, faGear, faKeyboard, faMagnifyingGlass, faMessage, faSignOut, faSpinner, faUpload, faUser } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccoutItem';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';


const cx = classNames.bind(styles)

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Languages',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'Enlish'
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tieng Viet'
                },
            ]
        }
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback'
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    }
]

const currentUser = true

const USER_MENU = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'View profile',
        to: '/profile'
    }, 
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Setting',
        to: '/setting'
    }, 
    ...MENU_ITEMS,
    {
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Log out',
        to: '/logout',
        separate: true
    },
]

function Header() {
    const [searchResult, setSearchResult] = useState([])

    const handleMenuChange = (menuItem) => {
    }

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="Logo" />
                </div>
                <HeadlessTippy
                    interactive={true}
                    visible={searchResult.length > 0}
                    render={attrs => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <h4 className={cx('search-title')}>Accounts</h4>
                                <AccountItem />
                                <AccountItem />

                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div className={cx('search')}>
                        <input
                            placeholder='Search accounts and videos'
                            spellCheck={false}
                        />
                        <button className={cx('clear')}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />

                        <button className={cx('search-btn')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </HeadlessTippy>


                <div className={cx('action')}>
                    {
                        currentUser ? (
                            <div className={cx('current-user')}>
                                <Tippy content="Upload image" placement='bottom'>
                                    <button className={cx('action-btn')}>
                                        <FontAwesomeIcon icon={faUpload} />
                                    </button>
                                </Tippy>
                                <button className={cx('action-btn')}>
                                    <FontAwesomeIcon icon={faMessage} />
                                </button>

                            </div>
                        ) : (
                            <>
                                <Button primary>
                                    Log in
                                </Button>

                            </>
                        )
                    }

                    <Menu items={currentUser ? USER_MENU : MENU_ITEMS} onChange={handleMenuChange()}>
                        {currentUser ? (
                            <img
                                className={cx('user-avatar')}
                                alt="avatar"
                                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTrNBo65CZrcvcIUbzt-GpWqvYsqiWWKyKIZHp9ZXAAw&s'
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}

                    </Menu>
                </div>
                {/* <div className={cx('action')}>
                    <Button primary>
                        Log in
                    </Button>
                    <Menu items={MENU_ITEMS} onChange={handleMenuChange()}>
                        <button className={cx('more-btn')}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </button>
                    </Menu>

                </div> */}
            </div>
        </header>

    );
}

export default Header;