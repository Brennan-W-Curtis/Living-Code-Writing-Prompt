import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cloud } from '../firebase';
import { deleteField, doc, getDoc, updateDoc } from 'firebase/firestore';

const LoadArticles = ({ authenticatedUser, setUserInput }) => {
    // Store all state values for the component in the following variables.
    const [ savedArticles, setSavedArticles ] = useState([]);

    useEffect(() => {

        const renderArticles = async () => {
            // Conditionally access previously saved articles if the current user is authenticated
            if (authenticatedUser !== null) {
                // Asynchronously store a reference to the users collection and the path to the authenticated user's document within the cloud database.
                const docRef = await doc(cloud, `users/${authenticatedUser.uid}`);
    
                // Asynchronously store a reference to a readable snapshot of the document. 
                const docSnapshot = await getDoc(docRef);
                
                // If a document exists set the state value savedArticles to the array of values in its userArticles property.
                if (docSnapshot.exists()) {
                    setSavedArticles(docSnapshot.data().userArticles);
                }

            }

        }
    
        renderArticles();

    }, [authenticatedUser, savedArticles]);

    // Handles loading the selected article to the writing space on the homepage.
    const handleLoading = bodyText => {
        setUserInput(bodyText);
    };

    // Handles deleting all of the user's saved articles.
    const deleteArticles = async () => {
        try {
            const docRef = doc(cloud, `users/${authenticatedUser.uid}`);
            const docEntry = {
                userArticles: deleteField()
            };
            await updateDoc(docRef, docEntry);
        } catch(error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div>
                {
                    savedArticles ?
                        <button
                            onClick={deleteArticles}
                        >Delete Articles</button> :
                        null
                }
            </div>
            <ul className="articleList">
                {
                    // If there are articles present within state iterate through each of them and render them to the page as part of an unordered list.
                    savedArticles ? 
                        savedArticles.map((article, index) => {
                            return (
                                <li key={index}>
                                    <span>
                                        <Link 
                                            to="/"
                                            onClick={() => handleLoading(article.articleBody)}
                                        >
                                            {article.articleTitle}
                                        </Link>
                                    </span>
                                </li>
                            )
                        }) :
                        // Conditionally render a different message to the user depending on whether their identity has been authenticated.
                        authenticatedUser !== null ?
                            <p>Currently you do not have any saved articles.</p> :
                            <p>You must be signed in to access saved articles.</p>
                }
            </ul>
        </div>
    )
}

export default LoadArticles;