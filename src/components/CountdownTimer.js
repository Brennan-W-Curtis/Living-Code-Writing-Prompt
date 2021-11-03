import { useState } from 'react';
import TimerButtons from './TimerButtons';
import TimerDisplay from './TimerDisplay';

// Destructure props object to access countingStatus state variables.
const CountdownTimer = ({ count, countingStatus, setCount, setCountingStatus }) => {

    // Declare a namespace object for the component.
    const timerComponent = {};

    // Store all state values for the component in the following variables.
    const [ currentInterval, setCurrentInterval ] = useState(); // Stores the information of the current interval. 

    // Create a property in the namespace object that updates with the current value stored in the count state variable.
    timerComponent.updatedSeconds = count;

    // Handles incrementing the value that represents the total amount of time in state.
    const handleIncrement = amount => {
        const totalSeconds = count;
        setCount(totalSeconds + amount);
    }

    // Handles decrementing the value that represents the total amount of time in state.
    const handleDecrement = amount => {
        const totalSeconds = count;
        setCount(totalSeconds - amount);
    }

    // Handles starting the countdown timer and than continuing to run it at one second intervals. 
    const handleStart = () => {

        // Prevents the countdown timer from running unless the count state variable is greater than zero. 
        if (count > 0) {
            runTimer();
            setCountingStatus(true);
            setCurrentInterval(setInterval(runTimer, 1000));
        } 

    }

    // Handles stopping the countdown timer once the count value reaches zero.
    const handleStop = () => {
        clearInterval(currentInterval);
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

    // Decrements that the reference value of timerSeconds by one and than updates the time value in state.
    const runTimer = () => {  
        timerComponent.updatedSeconds--;
        // Wrap the updatedSeconds property in a Math.max() to prevent the timer display from rendering negative numbers.
        setCount(Math.max(0, timerComponent.updatedSeconds));

        // Set the countingStatus state variable to false to stop the countdown timer.
        if (timerComponent.updatedSeconds === 0) {
            setCountingStatus(false);
        }

    }

    return (
        <div>
            <TimerDisplay 
                count={count}
                countingStatus={countingStatus}
            />
            <TimerButtons 
                countingStatus={countingStatus}
                handleDecrement={handleDecrement}
                handleIncrement={handleIncrement}
                handleReset={handleReset}
                handleResume={handleResume}
                handleStart={handleStart}
                handleStop={handleStop}
            />
        </div>
    )
}

export default CountdownTimer;