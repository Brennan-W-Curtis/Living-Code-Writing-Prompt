import { useRef } from 'react';
import IdleTimer from 'react-idle-timer';

const InactivityWarning = props => {
    // Destructured all state values passed as props.
    const { 
        handleStart,
        countingStatus, 
        setCountingStatus, 
        displayWarning, 
        setDisplayWarning, 
        currentInterval, 
    } = props;

    // Store a reference to the idle timer component and set it's current property to null.
    const idleRef = useRef(null);

    // Handles rendering warning component after the user has been inactive for 15 seconds once they have engaged the countdown timer. 
    const handleIdle = () => {
        if (countingStatus === true) {
            setDisplayWarning(true)
            clearInterval(currentInterval);
            setCountingStatus(false);
        } 
    }

    return (
        <div className="inactivityWarning">
            <IdleTimer 
                onIdle={handleIdle}
                ref={idleRef}
                timeout={16 * 1000}
            />
            {
                // If this state variable evaluates to true than the inactivity warning is displayed to the user.
                displayWarning ?
                    <div className="warningModal fadeIn">
                        <p>You have been inactive for 15 seconds. Would you like to continue?</p>
                        <button 
                            onClick={() => {
                                handleStart()
                                setCountingStatus(true)
                                setDisplayWarning(false)
                            }}
                        >
                            Continue
                        </button>
                    </div> :
                    null

            }
        </div>
    )
}

export default InactivityWarning;