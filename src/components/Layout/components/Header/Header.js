import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Header.module.scss'
import images from '~/assets/images';
import { faCircleQuestion, faEarthAsia, faEllipsisVertical, faGear, faKeyboard, faMessage, faSignOut, faUpload, faUser } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Button from '~/components/Button/Button';

import Menu from '~/components/Popper/Menu';
import Search from '../Search/Search';

import { Link } from 'react-router-dom';
import routeConfig from '~/config/routes'

import axios from 'axios';
import { useState, useEffect } from 'react';
const cx = classNames.bind(styles)

const LanguageList = () => {
    const [languages, setLanguages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const response = await axios.get(
                    'https://api.cognitive.microsofttranslator.com/languages?api-version=3.0'
                );

                const languageData = response.data.translation;

                const languagesArray = Object.keys(languageData).map((code) => ({
                    code,
                    title: languageData[code].name,
                    type: 'language',
                }));

                setLanguages(languagesArray);
                setLoading(false); // Set loading to false once data is fetched
            } catch (error) {
                console.error('Error fetching languages:', error);
            }
        };

        fetchLanguages();
    }, []);

    return { languages, loading };
};


const currentUser = true

function Header() {
    const handleMenuChange = (menuItem) => {
    }
    const { languages, loading } = LanguageList();
    const MENU_ITEMS = [
        {
            icon: <FontAwesomeIcon icon={faEarthAsia} />,
            title: 'English',
            children: {
                title: 'Languages',
                data: loading ? [] : languages
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
    console.log(MENU_ITEMS);
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

    const renderMenu = () => {
        if (loading) {
            // If still loading, you can show a loading indicator or handle accordingly
            return (
                <div>
                    {currentUser ? (
                        <img
                            className={cx('user-avatar')}
                            alt="avatar"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTrNBo65CZrcvcIUbzt-GpWqvYsqiWWKyKIZHp9ZXAAw&s"
                        />
                    ) : (
                        <button className={cx('more-btn')}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </button>
                    )}
                </div>
            )
        }

        return (
            <Menu items={currentUser ? USER_MENU : MENU_ITEMS} onChange={handleMenuChange} hideOnClick={false}>
                {currentUser ? (
                    <img
                        className={cx('user-avatar')}
                        alt="avatar"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTrNBo65CZrcvcIUbzt-GpWqvYsqiWWKyKIZHp9ZXAAw&s"
                    />
                ) : (
                    <button className={cx('more-btn')}>
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                    </button>
                )}
            </Menu>
        );
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={routeConfig.home} className={cx('logo')}>
                    <img src={images.logo} alt="Logo" />
                </Link>

                <Search />

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

                    {renderMenu()}
                </div>
            </div>
        </header>
    );
}

export default Header;