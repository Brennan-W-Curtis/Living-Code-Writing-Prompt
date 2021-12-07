import { useState } from 'react';
import ApiLogin from './ApiLogin';
import DisplayPlaylists from "./DisplayPlaylists";

const FindMusic = ({ accessToken, setAccessToken, userVerified, setUserVerified }) => {  
    // Store all error handling state values for user registration in the following variables.
    const [ displayUnfulfilledRequest, setDisplayUnfulfilledRequest ] = useState(false);
    const [ errorUnfulfilledRequest, setErrorUnfulfilledRequest ] = useState("");

    return (
        <div className="findMusic">
            <div className="musicDescription">
                <h2>Your Playlists</h2>
                <p>Set the right mood and listen to your favourite music while you write.</p>
                <span className={ !displayUnfulfilledRequest ? "unresponsiveError" : "hiddenComponent unresponsiveError"}>
                    <p>{errorUnfulfilledRequest}</p>
                </span>
            </div>
            {
                !userVerified ?
                    <ApiLogin
                        setAccessToken={setAccessToken}
                        setUserVerified={setUserVerified}
                    /> :
                    null

            }
            {
                userVerified ? 
                    <DisplayPlaylists 
                        accessToken={accessToken}
                        setUserVerified={setUserVerified}
                        setDisplayUnfulfilledRequest={setDisplayUnfulfilledRequest}
                        setErrorUnfulfilledRequest={setErrorUnfulfilledRequest}
                    /> :
                    null
            }
        </div>
    )
}

export default FindMusic;