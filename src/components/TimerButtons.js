const TimerButtons = ({ handleReset, handleResume, handleStart, handleStop, countingStatus }) => {
    return (
        <div className="timerInterface">
            <div className="playbackButtons">
                {
                    countingStatus === null ?
                        <button
                            onClick={handleStart}
                        >Start</button> :
                        null
                }
                {
                    countingStatus === true ?
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
                {
                    countingStatus === false ?
                        <div>
                            <button
                                onClick={handleResume}
                            >Resume</button>
                            <button
                                onClick={handleReset}
                            >Reset</button>
                        </div> :
                        null
                }
            </div>
        </div> 
    )
}

export default TimerButtons;