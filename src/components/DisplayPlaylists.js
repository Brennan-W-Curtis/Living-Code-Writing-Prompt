import axios from 'axios';

const DisplayPlaylists = ({ accessToken, data, setData, dataReady, setDataReady }) => {

    const handlePlaylists = () => {
        // Store a string value of the playlist endpoint to a variable.
        const playlistsEndpoint = "https://api.spotify.com/v1/me/playlists";

        try {
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
                setDataReady(true);
            });
        } catch(error) {
            console.log(error.message);
        }
        
    }

    return (
        <div>
            {
                !dataReady ?
                    <button
                        onClick={handlePlaylists}
                    >Playlists</button> :
                    null
                
            }
            {           
                dataReady ?
                // Iterate through all of the available playlists and render the artwork with a link to the playlist in spotify and some information about it.
                    data.items.map((playlist, index) => {
                        return (
                            <div key={index}>
                                <div className="imageContainer">
                                    <a href={playlist.external_urls.spotify} target="_blank" rel="noreferrer">
                                        <img src={playlist.images[0].url} alt={`A collage of albums from the ${playlist.name} playlist`} />
                                    </a>
                                </div>
                                <p>Name: {playlist.name}</p>
                                <p>Tracks: {playlist.tracks.total}</p>
                            </div>
                        )
                    }) :
                    null                        
            }
        </div>
    )
}

export default DisplayPlaylists;