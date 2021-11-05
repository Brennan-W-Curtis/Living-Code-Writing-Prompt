import { useState } from 'react';
// import axios from 'axios';

const SuggestMusic = () => {

    const [ token, setToken ] = useState("")
    
    const clientId = process.env.REACT_APP_clientId;
    const clientSecret = process.env.REACT_APP_clientSecret;
    const spotifyEndpoint = "https://acounts.spotify.com/authorize"
    const redirectUrl = process.env.REACT_APP_redirectUrl;

    const spaceDelimiter = "%20";

    const scopes = [
        "user-top-read",
        "user-read-currently-playing",
        "user-read-playback-state"
    ]

    const scopesUrl = scopes.join(spaceDelimiter);

    const handleLogin = () => {
        // window.location = `${spotifyEndpoint}?
        // client_id=${clientId}&
        // redirect_url=${redirectUrl}&
        // scopes=${scopes}&
        // response_type=token&
        // show_dialogue=true`;
    }

    return (
        <section>
            <div>
                <button
                    onClick={handleLogin}
                >
                    Login
                </button>
            </div>
        </section>
    )
}

export default SuggestMusic;