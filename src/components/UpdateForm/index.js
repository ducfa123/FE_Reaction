import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Header from '../Header';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './UpdateForm.module.scss';
import clsx from 'clsx';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { readWeb, updateWeb } from '../../helper/webapi';
import ToastSuccess from '../ToastSuccess';
import ToastFail from '../ToastFail';
import { useParams } from 'react-router-dom';
function UpdateForm() {
    const navigate = useNavigate();
    const webId = useParams();

    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [failMsg, setFailMsg] = useState('');
    const [webName, setWebName] = useState('');
    const [webUrl, setwebUrl] = useState('');
    console.log(webId.webId,webName,webUrl);
    useEffect(() => {
        readWeb(webId).then((res) => {
            setWebName(res.data.data.webName);
            setwebUrl(res.data.data.webURL);
        });
    }, []);

    const handleClickSubmit = (e) => {
        e.preventDefault();

        updateWeb(webId.webId, webName, webUrl)
            .then((response) => {
                setSuccess(true);
                setSuccessMsg('Thành công');
            })
            .catch((error) => {
                setFail(true);
                setFailMsg('Thất bại');
            });
    };

    const handleBack = () => {
        navigate('/main');
    };

    return (
        <div className={clsx(styles.wrapper)}>
            <Header />
            <div className={clsx(styles.content)}>
                <div className={clsx(styles.tittle)}>
                    <h1 className={clsx(styles.title)}>Cập nhật trang web</h1>
                </div>
                <div className={clsx(styles.form)}>
                    <Form onSubmit={handleClickSubmit}>
                        <div className={clsx(styles['input-form'])}>
                            <Form.Group className="mb-3" controlId="formGridEmail">
                                <Form.Label>Tên trang Web</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={(e) => {
                                        setWebName(e.target.value);
                                    }}
                                    value={webName}
                                />
                            </Form.Group>
                        </div>
                        <div className={clsx(styles['input-form'])}>
                            <Form.Group className="mb-3" controlId="formGridPassword">
                                <Form.Label>URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={(e) => {
                                        setwebUrl(e.target.value);
                                    }}
                                    value={webUrl}
                                />
                            </Form.Group>
                        </div>
                        <div className={clsx(styles.btn)}>
                            <Button primary submit small>
                                Submit
                            </Button>
                        </div>
                    </Form>
                </div>
                <div className={clsx(styles.back)}>
                    <FontAwesomeIcon onClick={handleBack} icon={faChevronLeft} />
                </div>
                {success && <ToastSuccess msg={successMsg}></ToastSuccess>}
                {fail && <ToastFail msg={failMsg}></ToastFail>}
            </div>
        </div>
    );
}

export default UpdateForm;
