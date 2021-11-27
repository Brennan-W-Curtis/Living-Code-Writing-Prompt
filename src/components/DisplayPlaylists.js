import { useEffect, useState } from 'react';
import { cloud } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import axios from 'axios';

const DisplayPlaylists = ({ accessToken, authenticatedUser }) => {
    // Store all state values for the component in the following variables.
    const [ playlistData, setPlaylistData ] = useState({}); // Stores an object with all the data on the authenticated user's playlists returned by the spotify api.

    useEffect(() => {
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
                 
            });
            
        } catch(error) {
            console.log(error.message);
        }

    }, [accessToken, playlistData, setPlaylistData]);

    useEffect(() => {

        // Asynchronously store the user's playlist data to the cloud database.
        const storePlaylists = async () => {

            try {

                // If the current user is authenticated then all of their playlists will be sent to the cloud database.
                if (authenticatedUser) {
                    // Asynchronously store a reference to the users collection and the path to the authenticated user's document within the cloud database. 
                    const docRef = await doc(cloud, `users/${authenticatedUser.uid}`);
        
                    // Updates the user's document to include a field that contains all the relevant data of their playlists.  
                    const docEntry = {
                        playlistData
                    };
        
                    // Asynchronously update the document based on the object passed as it's seconds argument if a document exists otherwise create a new one
                    await setDoc(docRef, docEntry, { merge: true });
                }

            } catch(error) {
                console.log(error.message);
            }

        }

        storePlaylists();

    }, [authenticatedUser, playlistData])

    return (
        <div className="displayPlaylists">
            <ul className="playlistCollection">
                {           
                    playlistData.items !== undefined ?
                    // Iterate through all of the available playlists and render the artwork with a link to the playlist in spotify and some information about it.
                        playlistData.items.map((playlist, index) => {
                            return (
                                <li key={index} className="fadeIn">
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