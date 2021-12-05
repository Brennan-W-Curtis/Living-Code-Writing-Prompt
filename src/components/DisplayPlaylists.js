import { useEffect, useState } from 'react';
import axios from 'axios';

const DisplayPlaylists = ({ accessToken, setUserVerified }) => {
    // Store all state values for the component in the following variables.
    const [ playlistData, setPlaylistData ] = useState({}); // Stores an object with all the data on the authenticated user's playlists returned by the spotify api.

    useEffect(() => {
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

            // If the client is unauthorized to access the content throw an exception.
            if (response.status > 399 && response.status < 500) {
                throw Error("Client denied access.");
            }

            // If the server is unable to fulfill the client's request throw an exception.
            if (response.status > 499 && response.status < 600) {
                throw Error("Server unable to fulfill request.");
            }

            // Store a reference to the playlist objects.
            const playlistArray = response.data;
            
            // Create an empty array to store the user's playlist array.
            const playlistDetails = {};

            // Store a new array with only the relevant properties in a new variable.
            playlistDetails.items = playlistArray.items.map(playlist => {

                return {
                    spotifyUrl: playlist.external_urls.spotify,
                    playlistName: playlist.name,
                    albumCollage: playlist.images[0].url,
                    trackNumbers: playlist.tracks.total
                }

            });

            // Store the data returned by the API in a state variable.
            setPlaylistData(playlistDetails);
                
        })
        .catch(error => {
            console.log(error.message, "Sorry, we're currently unable to complete your request. Please wait a few minutes and refresh.");
            setUserVerified(false);
        });
            
    }, [accessToken, playlistData, setPlaylistData, setUserVerified]);

    return (
        <div className="displayPlaylists">
            <ul className="playlistCollection">
                {           
                    playlistData.items !== undefined ?
                    // Iterate through all of the available playlists and render the artwork with a link to the playlist in spotify and some information about it.
                        playlistData.items.map((playlist, index) => {
                            return (
                                <li key={index} className="userPlaylist fadeIn">
                                    <div className="imageContainer">
                                        <a href={playlist.spotifyUrl} target="_blank" rel="noreferrer">
                                            <img 
                                                src={playlist.albumCollage} 
                                                alt={`A collage of albums from the ${playlist.playlistName} playlist`} 
                                            />
                                        </a>
                                    </div>
                                    <p className="playlistName">Name: {playlist.playlistName}</p>
                                    <p className="playlistTracks">Tracks: {playlist.trackNumbers}</p>
                                </li>
                            )
                        }) :
                        null                        
                }
            </ul>
        </div>
    )
}

export default DisplayPlaylists;