const TimerButtons = ({ handleReset, handleResume, handleStart, handleStop, countingStatus }) => {
    return (
        <div className="timerInterface">
            <div className="playbackButtons">
                {
                    countingStatus === null ?
                        <div className="countingNull">
                            <button
                                className="startButton"
                                onClick={handleStart}
                            >
                                Start
                            </button>
                            <button
                                className="resetButton"
                                onClick={handleReset}
                            >
                                Reset
                            </button> 
                        </div> :
                        null
                }
                {
                    countingStatus === true ?
                        <div className="countingTrue">
                            <button
                                className="stopButton"
                                onClick={handleStop}
                            >
                                Stop
                            </button>
                            <button
                                className="resetButton"
                                onClick={handleReset}
                            >
                                Reset
                            </button>
                        </div> :
                        null
                }
                {
                    countingStatus === false ?
                        <div className="countingFalse">
                            <button
                                className="resumeButton"
                                onClick={handleResume}
                            >
                                Resume
                            </button>
                            <button
                                className="resetButton"
                                onClick={handleReset}
                            >
                                Reset
                            </button>
                        </div> :
                        null
                }
            </div>
        </div> 
    )
}

export default TimerButtons;