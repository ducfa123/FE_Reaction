import styles from './ToastSuccess.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Toast from 'react-bootstrap/Toast';
import clsx from 'clsx';
import {useState,useEffect} from 'react';

function ToastSuccess({msg}) {

    const [showSuccess, setShowSuccess] = useState(true);
    const toggleShowSuccess = () => setShowSuccess(!showSuccess);
    useEffect(()=>{
        const timeLapse =  setTimeout(()=>{
            setShowSuccess(false)
        },3000)
    },[]);
    return ( 
        <Toast className={clsx(styles.toast)} show={showSuccess} onClose={toggleShowSuccess}>
                    <Toast.Header className={clsx(styles.header)}>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <FontAwesomeIcon className={clsx(styles.check)} icon={faCheck}></FontAwesomeIcon>
                        <p className="me-auto">Success</p>
                    </Toast.Header>
                    <Toast.Body className={clsx(styles.msg)}>{msg}</Toast.Body>
         </Toast>
     );
}

export default ToastSuccess;