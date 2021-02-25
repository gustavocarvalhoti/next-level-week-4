import styles from '../styles/components/Countdown.module.css';
import {useContext, useEffect, useState} from "react";
import {ChallengesContext} from "../contexts/ChallengesContext";

// Global
let countDownTimeout: NodeJS.Timeout;

export function Countdown() {

    const {startNewChallenge} = useContext(ChallengesContext);

    const defaultTime = 1 * 5;
    const [time, setTime] = useState(defaultTime);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    // Rounds down
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    // Split Minutes, casa 5, return 0 and 5, casa 25 return 2 ans 5
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    function startCountdown() {
        setIsActive(true);
    }

    function resetCountdown() {
        // Cancel the execute timeout
        clearTimeout(countDownTimeout);
        setIsActive(false);
        setTime(defaultTime);
    }

    // When active change
    useEffect(() => {
        if (isActive && time > 0) {
            countDownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        } else if (isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])

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
            {hasFinished ? (
                <button
                    disabled
                    className={styles.countdownButton}
                >
                    Ciclo encerrado
                </button>
            ) : (
                <>
                    {isActive ? (
                        <button
                            type="button"
                            className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                            onClick={resetCountdown}
                        >
                            Abandonar um ciclo
                        </button>
                    ) : (
                        <button
                            type="button"
                            className={styles.countdownButton}
                            onClick={startCountdown}
                        >
                            Iniciar um ciclo
                        </button>
                    )}
                </>
            )}
        </div>
    );
}