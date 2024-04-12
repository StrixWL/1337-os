import { useEffect } from 'react';
import Desktop from '../Desktop/Desktop';
import Taskbar from '../Taskbar/Taskbar';
import Window from '../Window/Window';
import styles from './StrixOS.module.scss';


const StrixOS = () => {
    return (
        <div className={styles['StrixOS']}>
            <Window backgroundColor="pink">
            </Window>
            <Window backgroundColor="lightblue">
            </Window>
            <Desktop />
            <Taskbar />
        </div>
    );
};

export default StrixOS;