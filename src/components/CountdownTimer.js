import { useEffect } from 'react';
import TimerButtons from './TimerButtons';
import TimerDisplay from './TimerDisplay';

// Destructure props object to access countingStatus state variables.
const CountdownTimer = props => {
    // Destructured all state values passed as props.
    const {
        handleStart,
        count, 
        setCount, 
        countingStatus, 
        setCountingStatus, 
        currentInterval, 
        displayCountdown,
        fadeInterface,
        setFadeInterface,
        setDisplaySaving,
        timeInterval
    } = props;
 
    // Handles stoping the countdown timer by clearing the setInterval and setting the counting status to false.
    const handleStop = () => {
        clearInterval(timeInterval.current);
        setCountingStatus(false);
        setFadeInterface(false);
    };

    // Handles reseting the countdown timer to zero and stopping the countdown.
    const handleReset = () => {
        setCount(0);
        setCountingStatus(null);
        clearInterval(currentInterval);
        setFadeInterface(false);
    };

    // Handles resuming the countdown timer after first stopping.
    const handleResume = () => handleStart();

    useEffect(() => {

        // Handles stopping the countdown timer once the count value reaches zero.
        if (count <= 0 && countingStatus !== null) {
            clearInterval(timeInterval.current);
            setCountingStatus(false);
            setDisplaySaving(true);
        }

    }, [count, countingStatus, setCountingStatus, setDisplaySaving, timeInterval]);

    useEffect(() => {

        // Clears the current interval upon the page loading.
        clearInterval(timeInterval.current);

    }, [timeInterval]);
    
    // Handles incrementing the value that represents the total amount of time in state.
    const handleIncrement = amount => {
        const totalSeconds = count;
        setCount(totalSeconds + amount);
    };

    // Handles decrementing the value that represents the total amount of time in state.
    const handleDecrement = amount => {

        // Store a reference to the state value count to use for comparison.
        const totalSeconds = count;
        
        // If count does not equal zero and the sum of totalSeconds minus the amount being decremented by is greater than zero than set the count to the result.
        if (totalSeconds !== 0 && (totalSeconds - amount >= 0)) {
            setCount(totalSeconds - amount);
        }

    };

    return (
        <div className={displayCountdown ? "countdownTimer" : "countdownTimer hiddenComponent"}>
            <TimerButtons 
                countingStatus={countingStatus}
                fadeInterface={fadeInterface}
                handleReset={handleReset}
                handleResume={handleResume}
                handleStart={handleStart}
                handleStop={handleStop}
            />
            <TimerDisplay 
                count={count}
                countingStatus={countingStatus}
                handleDecrement={handleDecrement}
                handleIncrement={handleIncrement}
                fadeInterface={fadeInterface}
            />
        </div>
    )
}

export default CountdownTimer;