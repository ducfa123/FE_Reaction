import classNames from 'classnames';
import clsx from 'clsx';

import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

function Button({
    to,
    href,
    children,
    seconary = false,
    primary = false,
    submit= false,
    outline = false,
    small = false,
    large = false,
    onClick,
    disable,
    ...passProps
}) {
    let Comp = 'button';

    const props = {
        onClick,
        ...passProps,
    };

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    } else if (submit){
        Comp = 'button'
        // props.type = 'submit';
    }

    const classes = clsx(styles.wrapper, {
        [styles.seconary] : seconary,
        [styles.primary]: primary,
        [styles.outline]: outline,
        [styles.submit]: submit,
        [styles.small]: small,
        [styles.large]: large,
        [styles.disable]: disable,
    });
    return (
        <Comp className={classes} {...props}>
            <span>{children}</span>
        </Comp>
    );
}

export default Button;
