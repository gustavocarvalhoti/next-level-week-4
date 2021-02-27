import Head from "next/head";
import {ExperienceBar} from "../components/ExperienceBar";
import {Profile} from "../components/Profile";
import styles from "../styles/components/Home.module.css";
import {CompletedChallenges} from "../components/CompletedChallenges";
import {Countdown} from "../components/Countdown";
import {ChallengeBox} from "../components/ChallengeBox";
import {CountdownProvider} from "../contexts/CountdownContext";
import {GetServerSideProps} from "next";
import {ChallengesProvider} from "../contexts/ChallengesContext";

interface HomeProps {
    level: number;
    currentExp: number;
    challengesCompleted: number;
}

export default function Home(props: HomeProps) {
    return (
        /* Context for all application */
        <ChallengesProvider
            level={props.level}
            currentExp={props.currentExp}
            challengesCompleted={props.challengesCompleted}
        >
            <div className={styles.container}>
                {/* Create and use on the tag <head> on HTML just for this page*/}
                <Head>
                    <title>Início | move.it</title>
                </Head>
                <ExperienceBar/>
                {/*Context for this block*/}
                <CountdownProvider>
                    <section>
                        <div>
                            <Profile/>
                            <CompletedChallenges/>
                            <Countdown/>
                        </div>
                        <div>
                            <ChallengeBox/>
                        </div>
                    </section>
                </CountdownProvider>
            </div>
        </ChallengesProvider>
    )
}

// Fill before render the page by Next
export const getServerSideProps: GetServerSideProps = async (context) => {
    const {
        level,
        currentExp,
        challengesCompleted
    } = context.req.cookies;

    return {
        props: {
            level: Number(level),
            currentExp: Number(currentExp),
            challengesCompleted: Number(challengesCompleted),
        }
    }
}