import { useState } from 'react';

const WritingSpace = () => {
    // Store all state values for the component in the following variables.
    const [ userInput, setUserInput ] = useState("");

    const handleInput = event => {
        event.preventDefault();
        setUserInput(event.target.value)
    }

    return (
        <div>
            <form action="">
                <label htmlFor="userInput" className="sr-only">Writing Space</label>
                <textarea 
                    name="userInput" 
                    id="userInput" 
                    required
                    onChange={handleInput}
                    placeholder="Please enter some text."
                ></textarea>
            </form>
        </div>        
    )
}

export default WritingSpace;