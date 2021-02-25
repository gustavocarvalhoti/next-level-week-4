import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {ChallengesContext} from "./ChallengesContext";

interface CountdownProviderProps {
    children: ReactNode
}

interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}

// Global
let countDownTimeout: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({children}: CountdownProviderProps) {

    const {startNewChallenge} = useContext(ChallengesContext);

    const defaultTime = 1 * 5;
    const [time, setTime] = useState(defaultTime);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);
    const minutes = Math.floor(time / 60); // Rounds down
    const seconds = time % 60;


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

    function startCountdown() {
        setIsActive(true);
    }

    function resetCountdown() {
        // Cancel the execute timeout
        clearTimeout(countDownTimeout);
        setIsActive(false);
        setTime(defaultTime);
        setHasFinished(false);
    }

    const data = {
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCountdown,
        resetCountdown,
    };

    return (
        <CountdownContext.Provider value={data}>
            {children}
        </CountdownContext.Provider>
    )
}