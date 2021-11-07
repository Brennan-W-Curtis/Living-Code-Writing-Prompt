import { useEffect, useState } from 'react';

const GenreDropdown = ({ retrieveGenres, retrieveToken }) => {

    const [ genres, setGenres ] = useState();
    
    useEffect(() => {
        const loadGenres = async () => {
            try {
                const accessToken = await retrieveToken();
                const genreData = await retrieveGenres(accessToken); 
                return genreData.categories.items;   
            } catch(error) {
                console.log(error.message)
            }
        }
        setGenres(loadGenres());
    }, []);

    return (
        <div>
            <select>
                {
                    genres !== undefined ?
                        genres.map(genre => {
                            <option>{genre.id}</option>
                        }) :
                        null
                }
            </select>
            <div></div>
        </div>
    )
}

export default GenreDropdown;