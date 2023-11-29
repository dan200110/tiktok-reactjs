import classNames from "classnames/bind";
import styles from './Menu.module.scss';
import Button from "~/components/Button";

const cx = classNames.bind(styles)

function MenuItem({ data, onClick }) {
    return (
        <button className={cx('menu-item')} to={data.to} onClick={onClick}>
            <span className={cx('menu-item-icon')}>{data.icon}</span>
            <span>{data.title}</span>
        </button>
    );
}

export default MenuItem;