import { useState } from 'react';
import { cloud } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const LoadArticles = ({ authenticatedUser, setUserInput }) => {

    const [ savedArticles, setSavedArticles ] = useState();

    // useEffect(() => {

        const accessDatabase = async () => {

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
    
        accessDatabase();

    // }, [authenticatedUser.uid, savedArticles])

    return (
        <section>
            <div>
                {
                    savedArticles ? 
                        savedArticles.map((article, index) => {
                            return (
                                <span key={index}>
                                    <button>{article.articleTitle}</button>
                                </span>
                            )
                        }) :
                        // Conditionally render a different message to the user depending on whether their identity has been authenticated.
                        authenticatedUser !== null ?
                            <p>Currently you do not have any saved articles.</p> :
                            <p>You must be signed in to access saved articles.</p>
                }
            </div>
        </section>
    )
}

export default LoadArticles;