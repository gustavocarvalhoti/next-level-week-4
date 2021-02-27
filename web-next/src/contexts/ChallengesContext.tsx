import {createContext, ReactNode, useEffect, useState} from 'react';
import challenges from '../../challenges.json';
import Cookies from 'js-cookie';
import {LevelUpModal} from "../components/LevelUpModal";

/*
Required
children: ReactNode -> For all components
*/

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExp: number;
    challengesCompleted: number;
}

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExp: number;
    challengesCompleted: number;
    expToNextLevel: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
    activeChallenge: Challenge;
}

// Declare the initial object, this format
export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({children, ...rest}: ChallengesProviderProps) {

    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExp, setCurrentExp] = useState(rest.currentExp ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const expToNextLevel = Math.pow((level + 1) * 4, 2);

    // Just only one
    useEffect(() => {
        /* For send msg on the Browser */
        Notification.requestPermission();
    }, []);

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExp', String(currentExp));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentExp, challengesCompleted]);

    function levelUp() {
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio', {
                body: `valendo ${challenge.amount}xp`
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return;
        }

        const {amount} = activeChallenge;
        let finalExp = currentExp + amount;
        if (finalExp >= expToNextLevel) {
            finalExp = finalExp - expToNextLevel;
            levelUp();
        }

        setCurrentExp(finalExp);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    const data = {
        level,
        currentExp,
        challengesCompleted,
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        expToNextLevel,
        completeChallenge,
        closeLevelUpModal,
    };

    return (
        <ChallengesContext.Provider value={data}>
            {children}
            {isLevelUpModalOpen && <LevelUpModal/>}
        </ChallengesContext.Provider>
    )
}