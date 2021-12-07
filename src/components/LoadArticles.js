import { Link } from 'react-router-dom';
import { cloud } from '../firebase';
import { deleteField, doc, getDoc, updateDoc } from 'firebase/firestore';
import { FaWindowClose } from 'react-icons/fa';

const LoadArticles = ({ authenticatedUser, savedArticles, setUserInput }) => {

    // Handles loading the selected article to the writing space on the homepage.
    const handleLoading = bodyText => {
        setUserInput(bodyText);
    };

    // Handles deleting individual articles that have been previously saved by the current user.
    const handleDelete = async articleId => {

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

    }

    // Handles deleting all of the user's saved articles.
    const deleteArticles = async () => {
        
        // Asynchronously store a reference to the users collection and the path to the authenticated user's document within the cloud database.
        const docRef = await doc(cloud, `users/${authenticatedUser.uid}`);

        // Assign a method that deletes the field that it's assigned to delete all of the user's articles. 
        const docEntry = {
            userArticles: deleteField()
        };

        // Asynchronously update the document with the docEntry object.
        await updateDoc(docRef, docEntry);
       
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
                    savedArticles !== undefined ?
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
                    savedArticles === undefined || savedArticles.length === 0 ?
                        <div className="emptyMessage">
                            <p>Your journal is empty, let's change that <Link to="journal-page" className="emptyRedirect">here</Link>!</p>
                        </div> : 
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
                        }) 
                }
            </ul>
        </div>
    )
}

export default LoadArticles;