const TimerButtons = props => {
    const { handleDecrement, handleIncrement, handleReset, handleStart, handleStop, countingDown } = props;

    return (
        <div>
            {
                countingDown === false ?
                    <button
                        onClick={handleStart}
                    >Start</button> :
                    null
            }
            {
                countingDown === true ?
                    <div>
                        <button
                            onClick={handleStop}
                        >Stop</button>
                        <button
                            onClick={handleReset}
                        >Reset</button>
                    </div> :
                    null
            }
            {/* Minutes */}
            <div className="adjustMinutes">
                <button
                    onClick={() => handleIncrement(60)}
                >Increment Minutes</button>
                <button
                    onClick={() => handleDecrement(60)}
                >Decrement Minutes</button>
            </div>
            {/* Seconds */}
            <div className="adjustSeconds">
                <button
                    onClick={() => handleIncrement(1)}
                >Increment Seconds</button>
                <button
                    onClick={() => handleDecrement(1)}
                >Decrement Seconds</button>
            </div>
        </div>
    )
}

export default TimerButtons;