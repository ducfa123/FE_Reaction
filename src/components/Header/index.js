import image from '../../assets/images';
import styles from './Header.module.scss';
import clsx from 'clsx';
import { useState } from 'react';
import Button from '../Button';
import { logout } from '../../helper/authorization';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import useAuth from '../../hooks/useAuth';
function Header() {
    const {auth } = useAuth()
    const navigate = useNavigate();
    const [showLogOutModal, setShowLogOutModal] = useState(false);
    const handleClose = () => setShowLogOutModal(false);
    const handleLogout = () => {
        logout(auth.accessToken);
        navigate('/');
    };
    return (
        <div>
            <div className={clsx(styles.inner)}>
                <div className={clsx(styles['header-left'])}>
                    <div className={clsx(styles.logo)}>
                        <Link to={'/main'}>
                            <img className={clsx(styles.mta)} alt="logo" src={image.logo}></img>
                        </Link>
                        <div className={clsx(styles.content)}>
                            <h4>Ứng dụng AI phát hiện nội dung nhạy cảm</h4>
                        </div>
                    </div>
                </div>
                <div className={clsx(styles['header-right'])}>
                    <h4>
                        Hỗ trợ
                        <a href="tel:+84 1234 5678"> +84 1234 5678</a>
                    </h4>
                    <p>admin@lqdtu.edu.vn</p>
                    <Button
                        onClick={() => {
                            setShowLogOutModal(true);
                        }}
                        primary
                    >
                        Đăng xuất
                    </Button>
                    <div className={clsx(styles.button)}></div>
                </div>
            </div>
            <div>
                <Modal className={styles.modal} show={showLogOutModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Đăng xuất</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn chắc chắn muốn đăng xuất?</Modal.Body>
                    <Modal.Footer>
                        <Button seconary onClick={handleClose}>
                            Đóng
                        </Button>
                        <Button primary onClick={handleLogout}>
                            Chắc chắn
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}

export default Header;
