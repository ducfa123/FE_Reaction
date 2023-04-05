import styles from './ToastFail.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import Toast from 'react-bootstrap/Toast';
import clsx from 'clsx';
import { useState, useEffect } from 'react';

function ToastFail({ msg }) {
    const [showFail, setShowFail] = useState(true);
    const toggleShowFail = () => setShowFail(!showFail);
    useEffect(()=>{
        const timeLapse =  setTimeout(()=>{
            setShowFail(false)
        },3000)
    },[]);
    return (
        <Toast className={clsx(styles.toast)} onClose={toggleShowFail} show={showFail}>
            <Toast.Header className={clsx(styles.header)}>
                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                <FontAwesomeIcon className={clsx(styles.error)} icon={faTriangleExclamation} />
                <p className="me-auto">Error</p>
            </Toast.Header>
            <Toast.Body className={clsx(styles.msg)}> {msg}</Toast.Body>
        </Toast>
    );
}

export default ToastFail;
