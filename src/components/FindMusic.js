import { useState } from 'react';
import ApiLogin from './ApiLogin';
import DisplayPlaylists from "./DisplayPlaylists";

const FindMusic = () => {
    // Store all state values for the component in the following variables.
    const [ accessToken, setAccessToken ] = useState(""); // Stores the access token return after authenticating the user.
    const [ playlistData, setPlaylistData ] = useState({}); // Stores an object with all the data on the authenticated user's playlists returned by the spotify api.
    const [ userVerified, setUserVerified ] = useState(false); // Reflects whether the user has signed into the spotify api.
    const [ dataReady, setDataReady ] = useState(false); // Determines whether the user's playlists will be rendered to the page.

    return (
        <div className="findMusic">
            <p>Set the right mood and listen to your favourite music while you write.</p>
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
                        playlistData={playlistData}
                        setPlaylistData={setPlaylistData}
                        dataReady={dataReady}
                        setDataReady={setDataReady}
                    /> :
                    null
            }
        </div>
    )
}

export default FindMusic;