const TimerButtons = ({ handleReset, handleResume, handleStart, handleStop, countingStatus }) => {
    return (
        <div className="timerInterface">
            <div className="playbackButtons">
                {
                    countingStatus === null ?
                        <button
                            className="startButton"
                            onClick={handleStart}
                        >Start</button> :
                        null
                }
                {
                    countingStatus === true ?
                        <div>
                            <button
                                className="stopButton"
                                onClick={handleStop}
                            >Stop</button>
                            <button
                                className="resetButton"
                                onClick={handleReset}
                            >Reset</button>
                        </div> :
                        null
                }
                {
                    countingStatus === false ?
                        <div>
                            <button
                                className="resumeButton"
                                onClick={handleResume}
                            >Resume</button>
                            <button
                                className="resetButton"
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