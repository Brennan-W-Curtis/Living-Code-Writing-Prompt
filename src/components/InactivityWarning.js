import { useRef, useState } from 'react';
import IdleTimer from 'react-idle-timer';
import WarningModal from './WarningModal';

const InactivityWarning = ({ countingStatus, currentInterval, setCountingStatus }) => {
    // Store all state values for the component in the following variables.
    const [ displayWarning, setDisplayWarning ] = useState(false); // Determines whether an inactivity warning is displayed to the user. 

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
                timeout={15 * 1000}
            />
            {
                // If this state variable evaluates to true than the inactivity warning is displayed to the user.
                displayWarning ?
                    <WarningModal 
                        setDisplayWarning={setDisplayWarning}
                        setCountingStatus={setCountingStatus}
                    /> :
                    null

            }
        </div>
    )
}

export default InactivityWarning;