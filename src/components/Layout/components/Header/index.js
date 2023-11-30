import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Header.module.scss'
import images from '~/assets/images';
import { faCircleQuestion, faEarthAsia, faEllipsisVertical, faGear, faKeyboard, faMessage, faSignOut, faUpload, faUser } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Button from '~/components/Button';

import Menu from '~/components/Popper/Menu';
import Search from '../Search';

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
    const handleMenuChange = (menuItem) => {
    }

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="Logo" />
                </div>

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