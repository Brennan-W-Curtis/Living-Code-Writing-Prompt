import { useEffect, useState } from 'react';
import realtime from '../firebase';
import { ref, onValue } from 'firebase/database';

const CommunalPrompts = ({ contributePrompt, setContributePrompt }) => {
    // Store all state values for the component in the following variables.
    const [ currentPrompt, setCurrentPrompt ] = useState(""); // Stores a randomly selected prompt from the storedPrompts state variable.
    const [ storedPrompts, setStoredPrompts ] = useState([]); // Stores an array of string values that it receives from the realtime database that includes all of the submitted prompts by users.
    const [ isLoading, setIsLoading ] = useState(true); // Determines whether a loading indicator is displayed to the user.

    // On initial render the storedPrompts state variable is updated with the values in the realtime database and a random prompt is selected to render onto the page.
    useEffect(() => {
        // Store a reference to the realtime database.
        const dbRef = ref(realtime);

        onValue(dbRef, snapshot => {

            const myData = snapshot.val();
            const databasePrompts = [];

            // Iterate through the entirety of the myData object and push each value into an array.
            for (let value in myData) {

                // Declare an object that stores an individual prompt with it's respective id.
                const promptObject = {
                    id: value,
                    prompt: myData[value]
                }

                // Push each prompt object to an array declared within the lexical scope.
                databasePrompts.push(promptObject);

            }

            // Set the state variable with an empty array to an array with all of the prompt objects.
            setStoredPrompts(databasePrompts);

        });
        
    }, []);
    
    useEffect(() => {
        
        // If the storedPrompts array length is greater than zero set the currentPrompt state variable to a prompt based on a randomly generated index. 
        if (storedPrompts.length > 0) {
            const randomIndex = Math.floor(Math.random() * storedPrompts.length);
            setCurrentPrompt(storedPrompts[randomIndex].prompt);
            setIsLoading(false);
        }

        // Include storedPrompts as a dependency, when this value changes it triggers a re-render that calls the function above. 
    }, [storedPrompts]);

    // Toggles whether the input form is visible for the user to contribute a prompt and submit it to the realtime database.
    const toggleContribute = () => setContributePrompt(!contributePrompt);
    
    return (
        <div className="communalPrompts">
            <div className="promptDisplay">
                <button
                    className="contributeButton"
                    onClick={toggleContribute}
                >Contribute</button>
                {
                    isLoading ?
                        <p>Loading...</p> :
                        <p className="currentPrompt"><span>"</span>{currentPrompt}<span>"</span></p>
                }
            </div>
        </div>
    )
}

export default CommunalPrompts;