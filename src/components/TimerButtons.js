const TimerButtons = props => {
    const { handleMinutesDecrement, handleMinutesIncrement, handleSecondsDecrement, handleSecondsIncrement, handleStart, minutes, setMinutes, seconds, setSeconds } = props;

    return (
        <div>
            <button
                onClick={handleStart}
            >Start</button>
            {/* Seconds */}
            <button
                onClick={() => handleSecondsIncrement(seconds, setSeconds)}
            >Increment Seconds</button>
            <button
                onClick={() => handleSecondsDecrement(seconds, setSeconds)}
            >Decrement Seconds</button>
            {/* Minutes */}
            <button
                onClick={() => handleMinutesIncrement(minutes, setMinutes)}
            >Increment Seconds</button>
            <button
                onClick={() => handleMinutesDecrement(minutes, setMinutes)}
            >Decrement Seconds</button>
            
        </div>
    )
}

export default TimerButtons;