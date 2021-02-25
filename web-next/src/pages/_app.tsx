import '../styles/global.css';
import {ChallengesProvider} from "../contexts/ChallengesContext";

/* For use every pages, sidebar for example */
function MyApp({Component, pageProps}) {

    return (
        /* Context for all application */
        <ChallengesProvider>
            <Component {...pageProps} />
        </ChallengesProvider>
    )
}

export default MyApp;