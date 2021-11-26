import { useState } from 'react';
import { cloud } from '../firebase';
import { arrayUnion, doc, setDoc } from 'firebase/firestore';
import MyDocument from "./MyDocument";
import { PDFDownloadLink } from '@react-pdf/renderer'
import { FaWindowClose } from 'react-icons/fa';

const SaveWriting = ({ authenticatedUser, count, countingStatus, displaySaving, setDisplaySaving, saveFadingOut, setSaveFadingOut, userInput, setUserInput }) => {
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
            };

            // Updates the array stored inside the user's document without overwriting previously saved content by the authenticated user.  
            const docEntry = {
                userArticles: arrayUnion(userArticle)
            };
            
            // Asynchronously update the document based on the object passed as it's seconds argument if a document exists otherwise create a new one.  
            await setDoc(docRef, docEntry, { merge: true });

            // Clear the user input and article title inputs.
            setUserInput("");
            setArticleTitle("");
            
            console.log("Article successfully saved.")

        } catch(error) {
            console.log("Error adding document: ", error.message);
        }

    }

    // Handles closing the saving options window.
    const handleClose = () => {
        // Uses a boolean state value to determine whether it displays
        setSaveFadingOut(true);
        setTimeout(() => setDisplaySaving(false), 1000);
        setTimeout(() => setSaveFadingOut(false), 1000);
    }

    return (
        <div className="saveWriting">
            {   
                // If the user has engaged the countdown timer and it has reached zero after signing into the application the options to either save or export their writing will be rendered to the page.
                authenticatedUser && count === 0 && countingStatus === false && displaySaving ?
                    <div className={saveFadingOut ? "savingOptions fadeOut" : "savingOptions fadeIn"}>
                        <div className="closeWindow">
                            <FaWindowClose 
                                className="closeIcon"
                                onClick={handleClose}
                            />
                        </div>
                        <label htmlFor="inputTitle" className="sr-only">Article Title</label>
                        <input 
                            type="text" 
                            name="articleTitle"
                            className="articleTitle" 
                            id="articleTitle" 
                            placeholder="Title" 
                            onChange={event => setArticleTitle(event.target.value)}
                            value={articleTitle}
                            required
                        />
                        <div className="savingButtons">
                            <button 
                                onClick={handleSave}
                            >
                                Save
                            </button>
                            <PDFDownloadLink document={<MyDocument userInput={userInput} />} fileName={`${articleTitle}.pdf`}>
                                <button>Download</button>
                            </PDFDownloadLink>
                        </div>
                    </div> :
                    null
            }
        </div>
    )
}

export default SaveWriting;