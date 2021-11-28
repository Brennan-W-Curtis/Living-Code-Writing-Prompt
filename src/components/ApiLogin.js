import { useEffect } from "react";

// Access spotify API by using the Implicit Grant Authorization Flow.
const ApiLogin = ({ setAccessToken, setUserVerified }) => {
    // All necessary string values in order to authenticate the user's identity with spotify's API.
    const clientId = process.env.REACT_APP_clientId;
    const authorizationEndpoint = "https://accounts.spotify.com/authorize";
    const redirectUri = process.env.REACT_APP_redirectUri;

    // Redirect the user to a page that will authenticate their identity.
    const handleLogin = () => {
        window.location = `${authorizationEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&show_dialog=true`;
    }

    const spotifyParameters = redirectedUrl => {
        // Stores takes all remaining characters after the "#" character and creates an array of parameter strings by splitting the original string at each instance of an ambersand symbol.
        const urlParameters = redirectedUrl.slice(1).split("&");

        // Stores an object after reducing the array to key value pairs by separating each parameter at the "=" character to easily access the access token.
        const splitParameters = urlParameters
                                    .reduce((accumulator, currentValue) => {
                                        // Destructure the current index into an array of with a key and value items.
                                        const [ key, value ] = currentValue.split("=");

                                        // Create properties in the accumulator object based on the key value pairs.
                                        accumulator[key] = value;
                                    
                                        // Return the object to store in the splitParameters variable.
                                        return accumulator;
                                    }, {});
        return splitParameters;
    }

    useEffect(() => {
        // Condition statement that determines whether an access token will be saved to state depending on whether the user authenticates.
        if (window.location.hash) {
            // Destructure the access token property from the splitParameters object.
            const { access_token } = spotifyParameters(window.location.hash);
            
            // Store the access_token returned by spotify within the state value accessToken.
            setAccessToken(access_token);

            // Set the userVerified state value to true and enable them to access their playlists without signing in for an hour. 
            setUserVerified(true);

            // Replace the current URL address without adding it to the history entries.
            window.history.replaceState({}, document.title, "/suggested-music");
        }

    },[setAccessToken, setUserVerified])

    return (
        <div className="apiLogin">
            <button
                onClick={handleLogin}
            >
                Login
            </button>
        </div>
    )
}

export default ApiLogin;