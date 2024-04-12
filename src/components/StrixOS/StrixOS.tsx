import Desktop from '../Desktop/Desktop';
import Taskbar from '../Taskbar/Taskbar';
import styles from './StrixOS.module.scss';

const StrixOS = () => {
    return (
        <div className={styles['StrixOS']}>
            <Desktop />
            <Taskbar />
        </div>
    );
};

export default StrixOS;