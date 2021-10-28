import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const TimerButtons = props => {
    const { handleDecrement, handleIncrement, handleReset, handleResume, handleStart, handleStop, countingStatus } = props;

    return (
        <div>
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
            {/* Increase */}
            <div className="increaseTime">
                <button
                    onClick={() => handleIncrement(60)}
                >
                    <FaChevronUp />
                </button>
                <button
                    onClick={() => handleIncrement(1)}
                >
                    <FaChevronUp />
                </button>
            </div>
            {/* Decrease */}
            <div className="decreaseTime">
                <button
                    onClick={() => handleDecrement(60)}
                >
                    <FaChevronDown />
                </button>
                <button
                    onClick={() => handleDecrement(1)}
                >
                    <FaChevronDown />
                </button>
            </div>
        </div>
    )
}

export default TimerButtons;