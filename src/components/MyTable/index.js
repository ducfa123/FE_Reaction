import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { getListWeb, readImgSrcWeb, deleteWeb } from '../../helper/webapi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faTrash, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import styles from './MyTable.module.scss';
import Modal from 'react-bootstrap/Modal';
import Button from '../Button';
import ToastSuccess from '../ToastSuccess';
import ToastFail from '../ToastFail';

function MyTable() {
    const navigate = useNavigate();

    const [dataRecieve, setDataRecieve] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [webId, setWebId] = useState('');
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [deleteFail, setDeleteFail] = useState(false);

    const handleClose = () => setShowDeleteModal(false);
    const handleDelete = () => {
        deleteWeb(webId)
            .then((response) => {
                setDeleteSuccess(true); 
                setShowDeleteModal(false)
                //re-render
                window.location.reload(false);
            })
            .catch((err) => {
                setDeleteFail(true);
                setShowDeleteModal(false)
            });
    };
    useEffect(() => {
        getListWeb().then((response) => {
            setDataRecieve(response.data.data);
        });
    }, []);

    return (
            <div>
              
              <Table striped bordered hover>
                  <thead>
                      <tr>
                          <th>#</th>
                          <th>Tên trang web</th>
                          <th>URL</th>
                          <th>Thời gian tạo</th>
                          <th>Options</th>
                      </tr>
                  </thead>
                  <tbody>
                      {dataRecieve.data?.map((data, index) => {
                          return (
                              <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{data.webName}</td>
                                  <td>{data.webURL}</td>
                                  <td>{data.createdAt}</td>
                                  <td>
                                      <div className={clsx(styles.options)}>
                                          <div className={clsx(styles.about)}>
                                              <Link to={`/image/${data.webId}`}>
                                                  <FontAwesomeIcon icon={faCircleInfo}></FontAwesomeIcon>
                                              </Link>
                                          </div>
                                          <div className={clsx(styles.update)}>
                                              <Link to={`/update/${data.webId}`}>
                                                  <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>
                                              </Link>
                                          </div>
                                          <div
                                              className={clsx(styles.delete)}
                                              onClick={ () => {
                                                setWebId(data.webId);
                                                setShowDeleteModal(true);
                                                
                                              }}
                                          >
                                              <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                                          </div>
                                      </div>
                                  </td>
                              </tr>
                          );
                      })}
                  </tbody>
              </Table>
                  <div >
                      <Modal className={styles.modal} show={showDeleteModal} onHide={handleClose}>
                          <Modal.Header closeButton>
                              <Modal.Title>Xóa Web</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                              Bạn chắc chắn muốn xóa dữ liệu về web này chứ? Hành động này không thể hoàn tác.
                          </Modal.Body>
                          <Modal.Footer>
                              <Button seconary onClick={handleClose}>
                                  Đóng
                              </Button>
                              <Button primary onClick={handleDelete}>
                                  Chắc chắn
                              </Button>
                          </Modal.Footer>
                      </Modal>
                  </div>
            </div>
    );
}

export default MyTable;
