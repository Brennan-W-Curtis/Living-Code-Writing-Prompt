import ApiLogin from './ApiLogin';
import DisplayPlaylists from "./DisplayPlaylists";

const FindMusic = ({ accessToken, setAccessToken, userVerified, setUserVerified }) => {  
    return (
        <div className="findMusic">
            <div className="musicDescription">
                <h2>Your Playlists</h2>
                <p>Set the right mood and listen to your favourite music while you write.</p>
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
                    /> :
                    null
            }
        </div>
    )
}

export default FindMusic;