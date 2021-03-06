import { useState } from 'react';
import { cloud } from '../firebase';
import { arrayUnion, doc, setDoc } from 'firebase/firestore';
import MyDocument from "./MyDocument";
import { PDFDownloadLink } from '@react-pdf/renderer'
import { FaWindowClose } from 'react-icons/fa';

const SaveWriting = props => {
    // Destructure all state values passed as props.
    const { 
        authenticatedUser, 
        count, 
        countingStatus,
        setDisplayActivity, 
        displaySaving, 
        setDisplaySaving,
        enableSaving,
        setEnableSaving, 
        saveFadingOut, 
        setSaveFadingOut, 
        setSavingArticle,
        togglePreference,
        userInput, 
        setUserInput 
    } = props;

    // Store all state values for the component in the following variables.
    const [ articleTitle, setArticleTitle ] = useState(""); // Store the title chosen by the user for their article.

    // Handles saving the user's writing to the cloud database based on the their unique id.
    const handleSave = async event => {
        event.preventDefault();

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

        setEnableSaving(false);

        // Display the user notification window and communicate the article has saved.
        setSavingArticle(true);
        setDisplayActivity(true);

        // Prevents the notification from rendering to the page on each page load.
        setTimeout(() => setSavingArticle(false), 1000);

    }

    // Handles closing the saving options window.
    const handleClose = () => {
        // Uses a boolean state value to determine whether it displays
        setSaveFadingOut(true);
        setTimeout(() => setDisplaySaving(false), 550);
        setTimeout(() => setSaveFadingOut(false), 550);
    }

    return (
        <div className="saveWriting">
            {   
                // If the user has engaged the countdown timer and it has reached zero after signing into the application the options to either save or export their writing will be rendered to the page.
                (authenticatedUser && count === 0 && countingStatus === false && displaySaving) || enableSaving ?
                    <div className={saveFadingOut ? "savingOptions fadeOut" : "savingOptions fadeIn"}>
                        <div className="closeWindow">
                            <button className="exitButton">
                                <FaWindowClose 
                                    className="closeIcon"
                                    onClick={() => {
                                        handleClose();
                                        togglePreference(enableSaving, setSavingArticle, setEnableSaving);
                                    }}
                                    aria-label="Close Saving Window"
                                />
                            </button>
                        </div>
                        <label htmlFor="inputTitle" className="sr-only">Journal Entry Title</label>
                        <input 
                            type="text" 
                            name="articleTitle"
                            className="articleTitle" 
                            id="articleTitle" 
                            placeholder="Title"
                            maxLength="50" 
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