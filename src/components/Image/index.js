import { useNavigate, useParams } from 'react-router-dom';
import { readImgSrcWeb } from '../../helper/webapi';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faTriangleExclamation, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import styles from './Image.module.scss';
import Header from '../Header';
import clsx from 'clsx';
import Modal from 'react-bootstrap/Modal';
import Button from '../Button';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:6789');
function Image() {
    const navigate = useNavigate();
    const [imgArr, setImgArr] = useState([]);
    const webId = useParams();

    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [imgSource, setImgSource] = useState('');
    const [index, setIndex] = useState(0);
    // const [dataReceive, setDataRecive] = useState(false);
    const [isSensitiveImg, setIsSensitiveImg] = useState(false);
    const [notSensitiveImg, setNotSensitiveImg] = useState(false);
    useEffect(() => {
        readImgSrcWeb(webId).then((response) => {
            setImgArr(response.data);
        });
    }, []);
    useEffect(() => {
        socket.on('send_infering_result_5000', (data) => {
        // socket.on('start_infering', (data) => {
            console.log(data.response);
            return data.response === true ? setIsSensitiveImg(true) : setNotSensitiveImg(true);
        });
    }, [socket]);
    // console.log(imgArr);

    const handleBack = () => {
        navigate('/main');
    };

    const emitInferEvent = () => {
        socket.emit('start_infer_model', {
            webId,
            index,
            sid: 5000,
        });
    };
    return (
        <div className={clsx(styles.wrapper)}>
            <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Chọn hình ảnh</Modal.Title>
                </Modal.Header>
                <div className={clsx(styles.body)}>
                    <Modal.Body>
                        <img className={clsx(styles.imageChoosen)} src={imgSource} alt="content"></img>
                    </Modal.Body>
                    <div className={clsx(styles['btn-wrapper'])}>
                        <div
                            className={clsx(styles['close-btn'])}
                            onClick={() => {
                                setShow(false);
                                setIsSensitiveImg(false);
                                setNotSensitiveImg(false);
                            }}
                        >
                            <Button seconary>Đóng</Button>
                        </div>
                        <div className={clsx(styles['choose-btn'])} onClick={emitInferEvent}>
                            <Button primary>Chọn</Button>
                        </div>
                    </div>
                    <div>
                        {isSensitiveImg && (
                            <h1 className={clsx(styles.true)}>
                                <FontAwesomeIcon
                                    className={clsx(styles.trueicon)}
                                    icon={faTriangleExclamation}
                                ></FontAwesomeIcon>
                                Đây là hình ảnh nhạy cảm
                            </h1>
                        )}
                        {notSensitiveImg && (
                            <h1 className={clsx(styles.nottrue)}>
                                <FontAwesomeIcon
                                    className={clsx(styles.falseicon)}
                                    icon={faCircleCheck}
                                ></FontAwesomeIcon>
                                Đây không phải hình ảnh nhạy cảm
                            </h1>
                        )}
                    </div>
                </div>
            </Modal>
            <Header />
            <div className={clsx(styles.content)}>
                <div className={clsx(styles.back)}>
                    <FontAwesomeIcon onClick={handleBack} icon={faChevronLeft} />
                </div>

                <h1>Danh sách hình ảnh của website</h1>
                <div className={clsx(styles.listimg)}>
                    {imgArr.data?.map((imgSrc, index) => {
                        return (
                            <img
                                onClick={() => {
                                    setImgSource(imgSrc);
                                    setShow(true);
                                    setIndex(index);
                                }}
                                className={clsx(styles.img)}
                                key={index}
                                src={imgSrc}
                                alt={index}
                            ></img>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Image;
