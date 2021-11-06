import { useState } from 'react';
import realtime from '../firebase';
import { ref, push } from 'firebase/database';

const ContributeModal = ({ setContributePrompt }) => {
    // Store all state values for the component in the following variables.
    const [ userInput, setUserInput ] = useState(""); // Stores the user's current input in state for submitting to the realtime database. 

    // Handles submitting the user's input and sending the data to the realtime database.
    const handleSubmit = event => {
        // Prevents the default action of the submit event.
        event.preventDefault();

        // Store a regular expression that determines whether a string is three words that have spaces between them, the first and third words have at least 3 letters, and there is either an "a" or "an" as the second word.
        const regex = /^[a-z]{3,}\s(a|an)\s[a-z]{3,}$/;

        // Compares the user input with the regular expression to determine if there is a match.
        const inputPrompt = userInput.toLowerCase().match(regex);

        // Conditionally assign the value of inputPrompt to formattedPrompt if the result of the match doesn't return a value of null. 
        const formattedPrompt = inputPrompt !== null ? inputPrompt[0].charAt(0).toUpperCase() + inputPrompt[0].slice(1) + "." : "";

        // If the formattedPrompt is valid it will be sent to the realtime database.
        if (formattedPrompt) {

            // Store a reference to the realtime database.
            const dbRef = ref(realtime);
    
            // Push the data input by the user to the realtime database.
            push(dbRef, formattedPrompt);
    
            // Clear the input field after the information entered has been pushed.
            setUserInput("");
            setContributePrompt(false);
            
        } else {
            console.log("Please enter a valid prompt.");
        }

    }

    return (
        <div>
            <p>Follow the same conventions as the placeholder text.</p>
            <form 
                action="submit"
                onSubmit={event => {
                    handleSubmit(event);
                }}
            >
                <label htmlFor="submitPrompt" className="sr-only">Contribute Prompt</label>
                <input 
                    type="text" 
                    id="submitPrompt"
                    name="submitPrompt"
                    // Monitors the current value entered by the user in the prompt input.
                    onChange={event => setUserInput(event.target.value)}
                    value={userInput}
                    placeholder="Enter a prompt"
                />
                <button 
                    type="submit"
                >Submit</button>
            </form>
        </div>
    )
}

export default ContributeModal;