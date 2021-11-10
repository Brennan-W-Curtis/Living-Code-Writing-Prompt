import { useCallback, useEffect, useState } from 'react';
import WarningModal from './WarningModal';

const InactivityWarning = ({ countingStatus }) => {
    // Store all state values for the component in the following variables.
    const [ userWarning, setUserWarning ] = useState(0); // Stores how long before an inactivity warning is rendered on the page.
    const [ displayWarning, setDisplayWarning ] = useState(false); // Determines whether an inactivity warning is displayed to the user. 
    const [ timeoutWarning, setTimeoutWarning ] = useState(); // Stores the current interval set by the setTimeout method. 

    // Handles whether the inactivity warning is displayed by setting a state variable to true after enough time passes.
    const handleWarning = useCallback(() => {
        setDisplayWarning(true);
    }, []);

    // Sets the value of the property to a setTimeout method that calls the handleWarning function based on the useWarning state variable.
    const setTimeouts = useCallback(() => {
        setTimeoutWarning(setTimeout(handleWarning, userWarning));
    }, [handleWarning, userWarning]);

    // Clears the value of the timeout interval stored within the property.
    const clearTimeouts = useCallback(() => {
        // If the property evaluates to true then it's timeout interval is cleared.
        if (timeoutWarning) clearTimeout(timeoutWarning);
    }, [timeoutWarning]);

    useEffect(() => {
        // If the counting status evaluates to true than the idle timer is activated.
        if (countingStatus) {
            // Sets the idle timer fifteen seconds after which the warning is rendered to the page.
            setUserWarning(15000);
    
            // Declare an array with string values that will be used to assess whether the user is inactive.
            const events = [
                "load",
                "mousemove",
                "mousedown",
                "click",
                "scroll",
                "keypress"
            ];
    
            // Resets the timeout intervals by first clearing it should the property be false and then setting it based on the userWarning state variable.
            const resetTimeout = () => {
                clearTimeouts();
                setTimeouts();
            }
    
            // Loops through the array and adds an event listener to the window object that reflects each of the string values stored within the event array that calls the resetTimeout function.  
            for (let i in events) {
                window.addEventListener(events[i], resetTimeout);
            }
    
            // Calls the setTimeouts method.
            setTimeouts();
    
            return () => {
    
                // Loops through the array and removes each previously added event listener and clears the timeout interval. 
                for (let i in events) {
                    window.removeEventListener(events[i], resetTimeout);
                    clearTimeouts();
                }
    
            }

        } 

    }, [clearTimeouts, setTimeouts, countingStatus]);

    return (
        <div>
            {
                // If this state variable evaluates to true than the inactivity warning is displayed to the user.
                displayWarning ?
                    <WarningModal 
                        setDisplayWarning={setDisplayWarning}
                    /> :
                    null

            }
        </div>
    )
}

export default InactivityWarning;