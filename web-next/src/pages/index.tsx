import Head from "next/head";
import {ExperienceBar} from "../components/ExperienceBar";
import {Profile} from "../components/Profile";
import styles from "../styles/components/Home.module.css";
import {CompletedChallenges} from "../components/CompletedChallenges";
import {Countdown} from "../components/Countdown";

export default function Home() {
    return (
        <div className={styles.container}>
            {/* Create and use on the tag <head> on HTML just for this page*/}
            <Head>
                <title>Início | move.it</title>
            </Head>
            <ExperienceBar/>
            <section>
                <div>
                    <Profile/>
                    <CompletedChallenges/>
                    <Countdown/>
                </div>
                <div>

                </div>
            </section>
        </div>
    )
}
