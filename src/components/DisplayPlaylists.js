const DisplayPlaylists = ({ data }) => {
    return (
        <div>
            {
                // Iterate through all of the available playlists and render the artwork with a link to the playlist in spotify and some information about it.
                data.items.map(playlist => {
                    return (
                        <div>
                            <div>
                                <a href={playlist.external_urls.spotify} target="_blank" rel="noopener">
                                    <img src={playlist.images[0].url} />
                                </a>
                            </div>
                            <p>Name: {playlist.name}</p>
                            <p>Tracks: {playlist.tracks.total}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default DisplayPlaylists;