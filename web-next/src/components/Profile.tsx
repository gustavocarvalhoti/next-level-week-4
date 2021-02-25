import styles from '../styles/components/Profile.module.css';
import {useContext} from "react";
import {ChallengesContext} from "../contexts/ChallengesContext";

export function Profile() {
    const {level} = useContext(ChallengesContext);

    return (
        <div className={styles.profileContainer}>
            <img
                src="https://avatars.githubusercontent.com/u/28713649?s=460&u=fe18cf16a2d99f9b8c2c4c2128ffebed194f85ef&v=4"
                alt="Gustavo Carvalho"
            />
            <div>
                <strong>Gustavo Carvalho</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level {level}
                </p>
            </div>
        </div>
    );
}