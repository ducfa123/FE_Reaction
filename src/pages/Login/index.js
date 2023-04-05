import { useRef, useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

import AuthContext from '../../context/AuthContext';
import clsx from 'clsx';
import styles from './Login.module.scss';

import useAuth from '../../hooks/useAuth';
import { login } from '../../helper/authorization';
import Button from '../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import Toast from 'react-bootstrap/Toast';
import Success from '../../context/SuccessToast';
import ToastFail from '../../components/ToastFail';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/main';

    const { setAuth } = useAuth()
    const userRef = useRef();
    const errRef = useRef();

    // const {showSuccess, setShowSuccess} = useContext(Success)

    const [showFail, setShowFail] = useState(false);
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const type = []
            const response = await login(user, pwd);
            const accessToken = response?.data?.accessToken;
            const refreshToken = response?.data?.refreshToken
            type.push(response?.data.user.type) 
            setAuth({ user, pwd,type, accessToken,refreshToken });
            setUser('');
            setPwd('');
            navigate(from, { replace: true });
        } catch (err) {
            setShowFail(true);
        }
    };

    return (
        <section className={clsx(styles[['section']])}>
            <form className={clsx(styles[['form']])} onSubmit={handleSubmit}>
                <h1>Đăng nhập</h1>
                <div className={clsx(styles['username'])}>
                    <label htmlFor="username">Tên tài khoản:</label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                    />
                </div>

                <div className={clsx(styles['password'])}>
                    <label htmlFor="password">Mật khẩu:</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                    />
                </div>
                <p className={clsx(styles.line)}>
                    Chưa đăng ký tài khoản?
                    <br />
                    <span>
                        {/*put router link here*/}
                        <Link to="/register">Đăng ký</Link>
                    </span>
                </p>
                <Button primary large>
                    Đăng nhập
                </Button>
            </form>
            {showFail && <ToastFail msg={'Đăng nhập thất bại'}></ToastFail>}
        </section>
    );
};

export default Login;
