import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cloud } from '../firebase';
import { deleteField, doc, getDoc, updateDoc } from 'firebase/firestore';
import { FaWindowClose } from 'react-icons/fa';

const LoadArticles = ({ authenticatedUser, setUserInput }) => {
    // Store all state values for the component in the following variables.
    const [ savedArticles, setSavedArticles ] = useState([]); // Stores a reference to all of the user's previously saved articles in the database.

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

    // Handles deleting individual articles that have been previously saved by the current user.
    const handleDelete = async articleId => {
        try {
            // Asynchronously store a reference to the users collection and the path to the authenticated user's document within the cloud database.
            const docRef = await doc(cloud, `users/${authenticatedUser.uid}`);
    
            // Asynchronously store a reference to a readable snapshot of the document. 
            const docSnapshot = await getDoc(docRef);

            // Destructure the snapshot reference to access the user's articles.
            const { userArticles } = docSnapshot.data();

            // Filter the array of the article selected by the user based on it's article id.
            const filteredArticles = userArticles.filter((article, index) => index !== articleId);

            // Store the filtered array within a docEntry object that will be used to update the userArticles field.
            const docEntry = {
                userArticles: filteredArticles
            };

            // Update the user document with the recently changed field to remove the article from the database. 
            await updateDoc(docRef, docEntry);

        } catch(error) {
            console.log("Unable to delete article, ", error.message);
        }
    }

    // Handles deleting all of the user's saved articles.
    const deleteArticles = async () => {
        try {
            // Asynchronously store a reference to the users collection and the path to the authenticated user's document within the cloud database.
            const docRef = await doc(cloud, `users/${authenticatedUser.uid}`);

            // Assign a method that deletes the field that it's assigned to delete all of the user's articles. 
            const docEntry = {
                userArticles: deleteField()
            };

            // Asynchronously update the document with the docEntry object.
            await updateDoc(docRef, docEntry);
            
        } catch(error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="loadingDescription">
                <h2>Previous Works</h2>
                <p>Continue working on previous entries by selecting a title.</p>
            </div>
            <div className="articleOptions">
                {
                    savedArticles !== undefined ?
                        <p className="articleCounter">You currently have <span>{savedArticles.length}</span> entries saved.</p> :
                        null
                }
                {
                    savedArticles ?
                        <button
                            className="deleteArticles"
                            onClick={deleteArticles}
                        >
                            Delete Articles
                        </button> :
                        null
                }
            </div>
            <ul className="articleList">
                {
                    // If there are articles present within state iterate through each of them and render them to the page as part of an unordered list.  
                    savedArticles === undefined ?
                        null :
                        savedArticles.length > 0 ?
                            savedArticles.map((article, index) => {
                                const {articleBody, articleTitle } = article;
                                return (
                                    <li key={index} className="fadeIn">
                                        <span>
                                            <Link 
                                                to="journal-page"
                                                onClick={() => handleLoading(articleBody)}
                                            >
                                                {articleTitle}
                                            </Link>
                                            <FaWindowClose 
                                                className="deleteArticle"
                                                onClick={() => handleDelete(index)}
                                            />
                                        </span>
                                    </li>
                                )
                            }) :
                            <div className="emptyMessage">
                                <p>Your journal is empty, let's change that <Link to="journal-page" className="emptyRedirect">here</Link>!</p>
                            </div>
                }
            </ul>
        </div>
    )
}

export default LoadArticles;