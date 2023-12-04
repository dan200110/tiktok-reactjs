import classNames from "classnames/bind";
import styles from './Menu.module.scss';
import Button from "~/components/Button/Button";

const cx = classNames.bind(styles)

function MenuItem({ data, onClick }) {
    const classes = cx('menu-item', {
        separate: data.separate
    })

    return (
        <button className={classes} to={data.to} onClick={onClick}>
            <span className={cx('menu-item-icon')}>{data.icon}</span>
            <span>{data.title}</span>
        </button>
    );
}

export default MenuItem;