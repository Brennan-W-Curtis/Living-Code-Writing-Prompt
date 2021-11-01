import { useState } from 'react';
import realtime from '../firebase';
import { ref, push } from 'firebase/database';

const ContributeModal = ({ setContributePrompt }) => {
    // All values that are stored within state
    const [ userInput, setUserInput ] = useState(""); // Stores the user's current input in state for submitting to the realtime database.

    // Monitors the current value entered by the user in the prompt input.
    const handleInput = event => setUserInput(event.target.value);

    // Handles submitting the user's input and sending the data to the realtime database.
    const handleSubmit = event => {
        event.preventDefault();

        // Store a reference to the realtime database.
        const dbRef = ref(realtime);

        // Push the data input by the user to the realtime database.
        push(dbRef, userInput);

        // Clear the input field after the information entered has been pushed.
        setUserInput("");
    }

    return (
        <div>
            <form 
                action="submit"
                onSubmit={handleSubmit}
            >
                <label htmlFor="submitPrompt" className="sr-only">Contribute Prompt</label>
                <input 
                    type="text" 
                    id="submitPrompt"
                    name="submitPrompt"
                    onChange={handleInput}
                    value={userInput}
                    placeholder="Enter a prompt"
                />
                <button 
                    type="submit"
                    onClick={() => setContributePrompt(false)}
                >Submit</button>
            </form>
        </div>
    )
}

export default ContributeModal;