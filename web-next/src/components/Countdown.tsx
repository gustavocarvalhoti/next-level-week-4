import styles from '../styles/components/Countdown.module.css';
import {useEffect, useState} from "react";

export function Countdown() {

    const [time, setTime] = useState(23 * 60);
    const [active, setActive] = useState(false);

    // Rounds down
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    // Split Minutes, casa 5, return 0 and 5, casa 25 return 2 ans 5
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    function startCountdown() {
        setActive(true);
    }

    // When active change
    useEffect(() => {
        if (active && time > 0) {
            setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        }
    }, [active, time])

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>
            <button
                type="button"
                className={styles.countdownButton}
                onClick={startCountdown}
            >
                Iniciar um ciclo
            </button>
        </div>
    );
}