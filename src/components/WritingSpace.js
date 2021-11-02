import { useState } from 'react';

const WritingSpace = () => {
    // Store all state values for the component in the following variables.
    const [ userInput, setUserInput ] = useState(""); // Stores the input by the user as it changes within the textarea element.

    console.log(userInput);

    return (
        <div>
            <form action="">
                <label htmlFor="userInput" className="sr-only">Writing Space</label>
                <textarea 
                    name="userInput" 
                    id="userInput" 
                    required
                    // Monitors changes in the user's input.
                    onChange={event => setUserInput(event.target.value)}
                    placeholder="Please enter some text."
                ></textarea>
            </form>
        </div>        
    )
}

export default WritingSpace;