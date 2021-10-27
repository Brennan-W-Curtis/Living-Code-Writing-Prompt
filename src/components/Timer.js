import { useState } from 'react';
import TimerButtons from './TimerButtons';
import TimerDisplay from './TimerDisplay';

const Timer = () => {
    // Declare a namespace object for the component.
    const timerComponent = {};

    // Store all values state in the following variables.
    const [ count, setCount ] = useState(0); // Stores an integer value that reflects thes total amount of time set by the user in seconds.
    const [ countingDown, countingDown] = useState(false); // Stores a boolean value that determines whether the timer is counting down.

    timerComponent.updatedSeconds = count;

    // Handles incrementing the value that represents the total amount of time in state
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
        runTimer();
        setCountingDown(true);
        setInterval(runTimer, 1000);
    }

    const handleStop = () => {}

    // Handles reseting the countdown timer to zero and stopping the countdown.
    const handleReset = () => {
        
        // If the timer is not currently counting down set the counter value in state to zero.
        if (countingDown === false) {
            setCount(0);
        }

    }

    // Decrements that the reference value of timerSeconds by one and than updates the time value in state.
    const runTimer = () => {  
        timerComponent.updatedSeconds--;
        setCount(timerComponent.updatedSeconds);
    }

    return (
        <div>
            <TimerDisplay 
                count={count}
            />
            <TimerButtons 
                countdown={countingDown}
                handleDecrement={handleDecrement}
                handleIncrement={handleIncrement}
                handleReset={handleReset}
                handleStart={handleStart}
                handleStop={handleStop}
            />
        </div>
    )
}

export default Timer;