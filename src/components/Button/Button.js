import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from './Button.module.scss';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles)

function Button({ to, href, primary = false, outline = false, size = "medium", disabled = false, rounded = false, children, onClick, ...passProps }) {
    let Comp = 'button'
    const props = {
        onClick,
        ...passProps,
    }

    if (disabled) {
        delete props.onClick
    }

    if (to) {
        props.to = to
        Comp = Link
    } else if (href) {
        props.href = href
        Comp = 'a'
    }

    const classes = cx('wrapper', {
        primary,
        outline,
        [size]: size,
        disabled,
        rounded
    });

    return (
        <Comp className={classes} {...props}>
            <span>{children}</span>
        </Comp>
    );
}

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    size: PropTypes.string,
    disabled: PropTypes.bool,
    rounded: PropTypes.bool,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
}

export default Button;