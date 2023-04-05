import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import styles from './Unauthorized.module.scss';
import { useNavigate } from 'react-router-dom';
function Unauthorized() {
    const navigate = useNavigate();

    const handleBack = () => navigate(-1);
    return (
        <div>
            <div className={clsx(styles.back)}>
                <FontAwesomeIcon onClick={handleBack} icon={faChevronLeft} />
            </div>
            <h1>Unauthorized</h1>
        </div>
    );
}

export default Unauthorized;
