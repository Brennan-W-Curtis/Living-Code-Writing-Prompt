import { useEffect, useRef } from 'react';
import TimerButtons from './TimerButtons';
import TimerDisplay from './TimerDisplay';

// Destructure props object to access countingStatus state variables.
const CountdownTimer = ({ count, setCount, countingStatus, setCountingStatus, currentInterval, setCurrentInterval, setDisplaySaving }) => {
    
    const timeInterval = useRef();

    // Updates the state value responsible for tracking the remaining time by decrementing the count value
    const updateTime = () => {
        setCount(remainingTime => Math.max(0, remainingTime - 1));
    }

    // Handles starting the countdown timer and than continuing to run it at one second intervals. 
    const handleStart = () => {

        // Prevents the countdown timer from running unless the count state variable is greater than zero. 
        if (count > 0) {
            timeInterval.current = setInterval(updateTime, 1000);
            setCountingStatus(true);
            setCurrentInterval(timeInterval.current);
        }
        
    }
 
    // Handles stoping the countdown timer by clearing the setInterval and setting the counting status to false.
    const handleStop = () => {
        clearInterval(timeInterval.current);
        setCountingStatus(false);
    }

    // Handles reseting the countdown timer to zero and stopping the countdown.
    const handleReset = () => {
        setCount(0);
        setCountingStatus(null);
        clearInterval(currentInterval);
    }

    // Handles resuming the countdown timer after first stopping.
    const handleResume = () => handleStart();

    useEffect(() => {

        // Handles stopping the countdown timer once the count value reaches zero.
        if (count <= 0 && countingStatus !== null) {
            setCount(0);
            clearInterval(timeInterval.current);
            setCountingStatus(false);
            setDisplaySaving(true);
        }

    }, [count, countingStatus, setCountingStatus, setDisplaySaving])

    useEffect(() => {

        // Clears the current interval upon the page loading.
        clearInterval(timeInterval.current);

    }, [])
    
    // Handles incrementing the value that represents the total amount of time in state.
    const handleIncrement = amount => {
        const totalSeconds = count;
        setCount(totalSeconds + amount);
    }

    // Handles decrementing the value that represents the total amount of time in state.
    const handleDecrement = amount => {

        // Store a reference to the state value count to use for comparison.
        const totalSeconds = count;
        
        // If count does not equal zero and the sum of totalSeconds minus the amount being decremented by is greater than zero than set the count to the result.
        if (totalSeconds !== 0 && (totalSeconds - amount >= 0)) {
            setCount(totalSeconds - amount);
        }

    }

    return (
        <div className="countdownTimer">
            <TimerButtons 
                countingStatus={countingStatus}
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
            />
        </div>
    )
}

export default CountdownTimer;