import { ReactNode } from 'react';
import styles from './Desktop.module.scss';

interface Desktop {
    children?: ReactNode
}

const Desktop = ({children}: Desktop) => {
    return (
        <div className={styles['Desktop']}>
            {children}
        </div>
    );
};

export default Desktop;