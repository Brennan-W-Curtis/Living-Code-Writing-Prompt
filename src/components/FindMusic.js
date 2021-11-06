import { useState } from 'react';
import SpotifyLogin from "./SpotifyLogin";
import GetPlaylists from "./GetPlaylists";

const FindMusic = () => {
    // Store all state values for the component in the following variables.
    const [ accessToken, setAccessToken ] = useState(""); // Stores a string value that reflects the access token return after authenticating the user.
    const [ data, setData ] = useState({}); // Stores an object with all the data on the authenticated user's playlists returned by the spotify api.

    return (
        <section>
            <div>
                <SpotifyLogin
                    setAccessToken={setAccessToken}
                />
                <GetPlaylists 
                    accessToken={accessToken}
                    setData={setData}
                />
            </div>
        </section>
    )
}

export default FindMusic;