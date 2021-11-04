import { useState } from 'react';
import { cloud } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const LoadPassages = ({ authenticatedUser, setUserInput }) => {

    const [ savedPassages, setSavedPassages ] = useState();

    // useEffect(() => {

        const accessDatabase = async () => {

            if (authenticatedUser !== null) {

                // Asynchronously store a reference to the users collection and the path to the authenticated user's document within the cloud database.
                const docRef = await doc(cloud, `users/${authenticatedUser.uid}`);
    
                // Asynchronously store a reference to a readable snapshot of the document. 
                const docSnapshot = await getDoc(docRef);
                
                // If a document exists set the state value savedPassages to the array of values in its creativeWriting property.
                if (docSnapshot.exists()) {
                    setSavedPassages(docSnapshot.data().creativeWriting);
                }

            }

        }
    
        accessDatabase();

    // }, [authenticatedUser.uid, savedPassages])

    return (
        <section>
            <div>
                {
                    savedPassages ? 
                        savedPassages.map((passage, index) => {
                            return (
                                <span key={index}>
                                    <button>{passage}</button>
                                </span>
                            )
                        }) :
                        // Conditionally render a different message to the user depending on whether their identity has been authenticated.
                        authenticatedUser !== null ?
                            <p>Currently you do not have any saved passages.</p> :
                            <p>You must be signed in to access saved passages.</p>
                }
            </div>
        </section>
    )
}

export default LoadPassages;