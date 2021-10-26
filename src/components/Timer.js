import { useState } from 'react';
import TimerButtons from './TimerButtons';
import TimerDisplay from './TimerDisplay';

const Timer = () => {
    // Store all values state in the following variables  
    const [ time, setTime ] = useState({minutes: 0, seconds: 0}) // Store the total amount of overall time selected by the user
    const [ seconds, setSeconds ] = useState(0); // Stores the amount of seconds selected by the user 
    const [ minutes, setMinutes ] = useState(0); // Stores the amount of minutes selected by the user 

    // Handles incrementing the value that represents seconds in state
    const handleSecondsIncrement = (stateVariable, stateMethod) => {
        stateMethod(stateVariable + 1);
        setTime({minutes: time.minutes, seconds: time.seconds + 1});
    }

    // Handles decrementing the value that represents seconds in state
    const handleSecondsDecrement = (stateVariable, stateMethod) => {
        stateMethod(stateVariable - 1);
        setTime({minutes: time.minutes, seconds: time.seconds - 1});
    }

    const handleMinutesIncrement = (stateVariable, stateMethod) => {
        stateMethod(stateVariable + 1);
        setTime({minutes: time.minutes + 1, seconds: time.seconds});
    }

    const handleMinutesDecrement = (stateVariable, stateMethod) => {
        stateMethod(stateVariable - 1);
        setTime({minutes: time.minutes - 1, seconds: time.seconds});
    }

    // Handles starting the countdown timer and than continuing to run it at one second intervals 
    const handleStart = () => {
        runTimer();
        setInterval(runTimer, 1000);
    }

    // Stores a reference to the amount of seconds that a user sets
    let updatedMinutes = minutes;
    let updatedSeconds = seconds; 

    // Decrements that the reference value of timerSeconds by one and than updates the time value in state
    const runTimer = () => {      
        updatedSeconds--;
        setTime({minutes: updatedMinutes, seconds: updatedSeconds});
    }

    return (
        <div>
            <TimerDisplay 
                time={time}
            />
            <TimerButtons 
                handleMinutesDecrement={handleMinutesDecrement}
                handleMinutesIncrement={handleMinutesIncrement}
                handleSecondsDecrement={handleSecondsDecrement}
                handleSecondsIncrement={handleSecondsIncrement}
                handleStart={handleStart}
                minutes={minutes}
                setMinutes={setMinutes}
                seconds={seconds}
                setSeconds={setSeconds}
            />
        </div>
    )
}

export default Timer;