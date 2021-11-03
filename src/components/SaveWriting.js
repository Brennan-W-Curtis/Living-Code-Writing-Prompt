import { cloud } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const SaveWriting = ({ authenticatedUser, count, countingStatus, userInput }) => {
    
    // Handles saving the user's writing to the cloud database based on the their unique id.
    const handleSaving = async event => {
        event.preventDefault();

        try {
            // Asynchronously store a reference to the users collection within the cloud database. 
            const docRef = await doc(cloud, `users/${authenticatedUser.uid}`);
            // Create an object to store the user's writing.
            const docEntry = {
                creativeWriting: arrayUnion(userInput)
            }
            // Asynchronously update the document based on the object passed as it's seconds argument if a document exists otherwise create a new one.  
            await setDoc(docRef, docEntry, { merge: true });
            console.log("Document written with ID: ", docRef.id);
        } catch(error) {
            console.log("Error adding document: ", error.message);
        }

    }

    return (
        <>
            {   
                // If the user has engaged the countdown timer and it has reached zero after signing into the application the options to either save or export their writing will be rendered to the page.
                count === 0 && countingStatus === false && authenticatedUser ?
                <div>
                    <button 
                        onClick={handleSaving}
                    >Save</button>
                    <button>Export</button>
                </div> :
                null
            }
        </>
    )
}

export default SaveWriting;