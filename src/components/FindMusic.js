import { useEffect, useState } from 'react';
import GenreDropdown from './GenreDropdown';

const FindMusic = () => {
    // Store all state values for the component in the following variables.
    const [ accessToken, setAccessToken ] = useState(""); // Stores a string value that reflects the access token return after authenticating the user.
    const [ genreCategories, setGenreCategories ] = useState([]);
    const [ genrePlaylists, setGenrePlaylists] = useState([]);
      
    // All necessary string values in order to authenticate the user with spotify's API.
    const clientId = process.env.REACT_APP_clientId;
    const clientSecret = process.env.REACT_APP_clientSecret;

    const retrieveToken = async () => {
        try {
            const response = await fetch("https://accounts.spotify.com/api/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Basic " + btoa(clientId + ":" + clientSecret)
                },
                body: "grant_type=client_credentials"
            });
            const jsonData = await response.json();
            return jsonData.access_token;
        } catch(error) {
            console.log(error.message)
        }
    } 

    const retrieveGenres = async token => {
        try {
            const response = await fetch("https://api.spotify.com/v1/browse/categories?locale=sv_US", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token 
                }
            });
            const jsonData = response.json();
            return jsonData;
        } catch(error) {
            console.log(error.message);
        }
    }

    const retrievePlaylists = async (token, genreId) => {
        const limit = 10;
        const response = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        });
        const jsonData = response.json();
        return jsonData.playlists.items;
    }

    return (
        <section>
            <div>
                <GenreDropdown 
                    retrieveGenres={retrieveGenres}
                    retrieveToken={retrieveToken}
                />
            </div>
        </section>
    )
}

export default FindMusic;