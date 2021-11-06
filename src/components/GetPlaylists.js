import axios from 'axios';

const GetPlaylists = ({ accessToken, setData }) => {

    const handlePlaylists = () => {
        // Store a string value of the playlist endpoint to a variable.
        const playlistsEndpoint = "https://api.spotify.com/v1/me/playlists";

        // Make a request to the API to access the user's playlists.
        axios({
            url: playlistsEndpoint,
            method: "GET",
            dataResponse: "json",
            headers: {
                Authorization: "Bearer " + accessToken
            }
        })
        .then(response => {
            // Store the data returned by the API in a state variable.
            setData(response.data);
        });
        
    }

    return (
        <button
            onClick={handlePlaylists}
        >Playlists</button>
    )
}

export default GetPlaylists;