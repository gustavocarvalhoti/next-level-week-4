import {createContext, ReactNode, useState} from 'react';
import challenges from '../../challenges.json';

/*
Required
children: ReactNode -> For all components
*/

interface ChallengesProviderProps {
    children: ReactNode
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
    activeChallenge: Challenge;
}

// Declare the initial object, this format
export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({children}: ChallengesProviderProps) {

    const [level, setLevel] = useState(1);
    const [currentExp, setCurrentExp] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const expToNextLevel = Math.pow((level + 1) * 4, 2);

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge);
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    const data = {
        level,
        currentExp,
        challengesCompleted,
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        expToNextLevel
    };

    return (
        <ChallengesContext.Provider value={data}>
            {children}
        </ChallengesContext.Provider>
    )
}

