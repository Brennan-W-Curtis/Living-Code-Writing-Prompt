import { useState } from 'react';
import realtime from '../firebase';
import { ref, push } from 'firebase/database';

const ContributeModal = ({ contributeFadingOut, setContributeFadingOut, storedPrompts, setContributePrompt, setDisplayActivity }) => {
    // Store all state values for the component in the following variables.
    const [ userInput, setUserInput ] = useState(""); // Stores the user's current input in state for submitting to the realtime database. 
   
    // Store all error handling state values for user prompt submission in the following variables.
    const [ displayDuplicateError, setDisplayDuplicateError ] = useState(false);
    const [ errorDuplicatePrompt, setErrorDuplicatePrompt ] = useState("");
    const [ displayFormattingError, setDisplayFormattingError ] = useState(false);
    const [ errorFormattingPrompt, setErrorFormattingPrompt ] = useState("");

    // Handles submitting the user's input and sending the data to the realtime database.
    const handleSubmit = async event => {
        // Prevents the default action of the submit event.
        event.preventDefault();

        // Store a regular expression that determines whether a string is three words that have spaces between them, the first and third words have at least 3 letters, and there is either an "a" or "an" as the second word.
        const regex = /^[a-z]{3,}\s(a|an)\s[a-z]{3,}$/;

        // Compares the user input with the regular expression to determine if there is a match.
        const inputPrompt = userInput.toLowerCase().match(regex);

        // Conditionally assign the value of inputPrompt to formattedPrompt if the result of the match doesn't return a value of null. 
        const formattedPrompt = inputPrompt !== null ? inputPrompt[0].charAt(0).toUpperCase() + inputPrompt[0].slice(1) + "." : "";

        // Filter through an array of all the currently available prompts and compare each to the current user's subitted prompt.
        const comparePrompts = storedPrompts.filter(item => item.prompt === formattedPrompt);

        try {

            // If the submitted prompt is a valid format and the returned array is empty it's sent to the realtime database.
            if (formattedPrompt && comparePrompts.length === 0) {
    
                // Store a reference to the realtime database.
                const dbRef = await ref(realtime);
        
                // Push the data input by the user to the realtime database.
                await push(dbRef, formattedPrompt);

                // Clear all error messages currently rendered on the page upon successfully submitting the user's prompt.
                setErrorFormattingPrompt("");
                setDisplayFormattingError(false);
                setErrorDuplicatePrompt("");
                setDisplayDuplicateError(false);
        
                // Clear the input field after the information entered has been pushed.
                setUserInput("");
    
                // Notifies the user they have successfully submitted a prompt.
                setDisplayActivity(true);
                
                // Changes the state values that determine whether the contribute prompt component fades out and then is removed after 1 second.
                setContributeFadingOut(true);
                setTimeout(() => setContributePrompt(false), 1000);
    
            } else {   

                // If the user's prompt is not submitted in a valid format then an error is thrown.
                if (!formattedPrompt) {
                    throw Error("Invalid prompt format.");
                }

                // If the user submits a prompt that already exists within the realtime database throw an error.
                if (comparePrompts.length > 0) {
                    throw Error("Prompt already exists.");
                }

            }

        } catch(error) {

            // Conditionally render an error message if the user inputs an invalid email.
            if (error.message === "Invalid prompt format.") {
                setErrorFormattingPrompt("Please follow the same format as the current prompt.");
                setDisplayFormattingError(true);
            } else {
                setErrorFormattingPrompt("");
                setDisplayFormattingError(false);
            }

            // Conditionally render an error message if the user inputs an invalid email.
            if (error.message === "Prompt already exists.") {
                setErrorDuplicatePrompt("Please enter a prompt that does not already exist.");
                setDisplayDuplicateError(true);
            } else {
                setErrorDuplicatePrompt("");
                setDisplayDuplicateError(false);
            }

        }

    }

    return (
        <div className={ !contributeFadingOut ? "contributePrompts fadeIn" : "contributePrompts fadeOut" }>
            <form 
                action="submit"
                onSubmit={event => {
                    handleSubmit(event);
                }}
            >
                <span className={ displayDuplicateError || displayFormattingError ? "invalidPrompt" : "hiddenComponent invalidPrompt"}>
                    <p>{errorDuplicatePrompt || errorFormattingPrompt}</p>
                </span>
                <label htmlFor="submitPrompt" className="sr-only">Contribute Prompt</label>
                <input 
                    type="text" 
                    className={displayDuplicateError || displayFormattingError ? "displayError submitPrompt" : "submitPrompt"}
                    id="submitPrompt"
                    name="submitPrompt"
                    // Monitors the current value entered by the user in the prompt input.
                    onChange={event => setUserInput(event.target.value)}
                    value={userInput}
                    placeholder="Enter a prompt"
                />
                <button 
                    className="submitButton"
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default ContributeModal;