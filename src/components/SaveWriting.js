import { useState } from 'react';
import { cloud } from '../firebase';
import { arrayUnion, doc, setDoc } from 'firebase/firestore';
import { jsPDF } from 'jspdf';

const SaveWriting = ({ authenticatedUser, count, countingStatus, userInput }) => {
    // Store all state values for the component in the following variables.
    const [ articleTitle, setArticleTitle ] = useState(""); // Store the title chosen by the user for their article.
    
    // Handles saving the user's writing to the cloud database based on the their unique id.
    const handleSave = async event => {
        event.preventDefault();

        try {
            // Asynchronously store a reference to the users collection and the path to the authenticated user's document within the cloud database. 
            const docRef = await doc(cloud, `users/${authenticatedUser.uid}`);
            // Create an object to store the user's article by assigning userInput and articleTitle state values to the articleBody and articleTitle properties respectively.
            const userArticle = {
                articleTitle: articleTitle,
                articleBody: userInput      
            }
            // Updates the array stored inside the user's document without overwriting previously saved content by the authenticated user.  
            const docEntry = {
                userArticles: arrayUnion(userArticle)
            }
            // Asynchronously update the document based on the object passed as it's seconds argument if a document exists otherwise create a new one.  
            await setDoc(docRef, docEntry, { merge: true });
            console.log("Document written with ID: ", docRef.id);
        } catch(error) {
            console.log("Error adding document: ", error.message);
        }

    }

    // Handles exporting the user's article into a PDF image format to download.
    const handleExport = () => {
        const document = new jsPDF();
        document.text(`${userInput}`, 20, 20);
        document.save(`${articleTitle}.pdf`);
    }

    return (
        <>
            {   
                // If the user has engaged the countdown timer and it has reached zero after signing into the application the options to either save or export their writing will be rendered to the page.
                count === 0 && countingStatus === false && authenticatedUser ?
                <div>
                    <label htmlFor="inputTitle" className="sr-only">Article Title</label>
                    <input 
                        type="text" 
                        name="articleTitle" 
                        id="articleTitle" 
                        placeholder="Title" 
                        onChange={event => setArticleTitle(event.target.value)}
                        value={articleTitle}
                        required
                    />
                    <button 
                        onClick={handleSave}
                    >Save</button>
                    <button
                        onClick={handleExport}
                    >Export</button>
                </div> :
                null
            }
        </>
    )
}

export default SaveWriting;