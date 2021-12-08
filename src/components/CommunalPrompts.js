import { useState } from 'react';
import { FaQuoteLeft, FaQuoteRight, FaRandom } from 'react-icons/fa';

const CommunalPrompts = props => {
    // Destructure all state values and functions passed as props.
    const { 
        currentPrompt, 
        fadeInterface, 
        promptDisplay, 
        promptLock, 
        promptFadingOut, 
        promptIsLoading,
        setCurrentPrompt, 
        sidebarActive,
        storedPrompts
    } = props;

    // Store all state values for the component in the following variables.
    const [ randomIndex, setRandomIndex ] = useState(null); // Stores the last random index generated for comparison to future numbers.

    // Access a random writing prompt from state based on those stored within the realtime database.
    const randomPrompt = () => {
        // Generate a random number created based on the length of the array of writing prompts and store it within a variable.
        let randomNumber = Math.floor(Math.random() * storedPrompts.length);
        
        // If the random number is the same as the previous number generate a new random number. 
        if (randomIndex === randomNumber) {
            randomNumber = Math.floor(Math.random() * storedPrompts.length);
        }

        // Update the currently displayed writing prompt with a new one based on the random index. 
        setCurrentPrompt(storedPrompts[randomNumber].prompt);

        // Update the random index state value with the most recent number that has been randomly generated. 
        setRandomIndex(randomNumber);
    }

    return (
        <div className="communalPrompts">
            <div 
                className={
                    promptDisplay && promptLock && (!sidebarActive || sidebarActive)  ?
                        "promptDisplay" :
                        !promptDisplay && promptLock ?
                            "hiddenComponent promptDisplay" :
                            !promptFadingOut && !promptLock ? 
                                "promptDisplay fadeIn" : 
                                "promptDisplay fadeOut" 
                }
            >
                {
                    promptIsLoading ?
                        <p className="currentPrompt">Loading...</p> :
                        <p className={!fadeInterface ? "currentPrompt" : "currentPrompt reducedOpacity"}>
                            <FaQuoteLeft className="quoteIcons quoteLeft" aria-hidden="true"/>
                            {currentPrompt}
                            <FaQuoteRight className="quoteIcons quoteRight" aria-hidden="true"/>
                        </p>
                        
                }
                <span className="randomPrompt">
                    <button className="randomButton">
                        <FaRandom 
                            className="randomIcon reducedOpacity" 
                            onClick={randomPrompt}
                            aria-label="Generate Random Prompt" 
                        />
                    </button>
                </span>
            </div>
        </div>
    )
}

export default CommunalPrompts;