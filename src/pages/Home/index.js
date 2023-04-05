import Header from '../../components/Header';
import { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import styles from './Home.module.scss';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import MyTable from '../../components/MyTable';
import Button from '../../components/Button';
import ToastSuccess from '../../components/ToastSuccess';
import Users from '../../components/Users';
function Home() {
    
    const navigate = useNavigate();
    const handleCreate = () => {
        navigate('/create')
    }
    
    return (
        <div className={clsx(styles['big-wrapper'])}>
            <Header />
            <ToastSuccess msg={'Đăng nhập thành công'}></ToastSuccess>
            <div className={clsx(styles.wrapper)}>
                
                <h1 className={clsx(styles.title)}>Danh sách Website</h1>
                    <div className={clsx(styles.table)}>
                        <MyTable></MyTable>
                    </div>
                    {/* <Button  className={clsx(styles.btn)} size='lg' onClick={handleCreate}>
                        <FontAwesomeIcon className={clsx(styles['btn-icon'])} icon={faPlus}></FontAwesomeIcon>
                        Tạo trang web
                    </Button> */}

                    <div className={clsx(styles.btn)}>
                        <Button  primary onClick={handleCreate}>
                        <FontAwesomeIcon className={clsx(styles['btn-icon'])} icon={faPlus}></FontAwesomeIcon>
                            Tạo trang web
                        </Button>
                    </div>
            </div>
            <Users />
        </div>
    );
}

export default Home;
