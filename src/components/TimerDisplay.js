import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const TimerDisplay = ({ count, countingStatus, handleDecrement, handleIncrement, fadeInterface }) => {
    // Conditionally render the minute part of the timer display only if it stores an  value greater than zero.
    const conditionalFormatting = timeUnit => {
        // Should the counting status state variable have a value of null then the minutes unit will display above the the increment and decrement buttons.
        if (timeUnit === 0 && (countingStatus === true || countingStatus === false)) {
            return "";
        } else {
            return timeUnit >= 10 ? timeUnit + ":" : "0" + timeUnit + ":";
        }

    };

    // Converts the value stored in the counter variable to minutes and seconds. 
    const convertTime = totalCount => {
        // Stores the amount input by the user in hours.
        let hours = Math.floor(totalCount / (60 * 60));
        // Stores the amount input by the user in minutes.
        let minutes = Math.floor((totalCount / 60) % 60);
        // Store the amount input by the user in seconds.
        let seconds = totalCount % 60;

        // Update the values stored in the variables by conditionally rendering them with a zero if they are less than ten.
        hours = conditionalFormatting(hours);
        minutes = conditionalFormatting(minutes) === "" && totalCount >= 3600 ? "00:" : conditionalFormatting(minutes);
        seconds = seconds >= 10 ? seconds : "0" + seconds;

        // Return the amount input by the user as a format that can be read by minutes and seconds.
        return `${hours}${minutes}${seconds}`
    };

    return (
        <div className="timerDisplay">
            {/* Increase */}
            <div className="increaseTime">
                <button
                    className={countingStatus === true ? "hiddenComponent adjustmentButton" : "adjustmentButton"}
                    onClick={() => handleIncrement(300)}
                >
                    <FaChevronUp 
                        className="increaseButton"
                        aria-label="Increase Count by 5 minutes"
                    />
                </button>
                <button
                    className={countingStatus === true ? "hiddenComponent adjustmentButton" : "adjustmentButton"}
                    onClick={() => handleIncrement(5)}
                >
                    <FaChevronUp 
                        className="increaseButton"
                        aria-label="Increase Count by 5 seconds"
                    />
                </button>
            </div>
            <div className="incrementTime">
                <button
                    className={countingStatus === true ? "hiddenComponent adjustmentButton" : "adjustmentButton"}
                    onClick={() => handleIncrement(60)}
                >
                    <FaChevronUp 
                        className="incrementButton"
                        aria-label="Increase Count by 1 minute"
                    />
                </button>
                <button
                    className={countingStatus === true ? "hiddenComponent adjustmentButton" : "adjustmentButton"}
                    onClick={() => handleIncrement(1)}
                >
                    <FaChevronUp 
                        className="incrementButton"
                        aria-label="Increase Count by 5 seconds"
                    />
                </button>
            </div>
            <div className="currentTime">
                <p className={fadeInterface ? "reducedOpacity" : null}>{convertTime(count)}</p>
            </div>
            {/* Decrease */}
            <div className="decrementTime">
                <button
                    className={countingStatus === true ? "hiddenComponent adjustmentButton" : "adjustmentButton"}
                    onClick={() => handleDecrement(60)}
                >
                    <FaChevronDown 
                        className="decrementButton"
                        aria-label="Decrease Count by 1 minute"
                    />
                </button>
                <button
                    className={countingStatus === true ? "hiddenComponent adjustmentButton" : "adjustmentButton"}
                    onClick={() => handleDecrement(1)}
                >
                    <FaChevronDown 
                        className="decrementButton"
                        aria-label="Decrease Count by 1 second"
                    />
                </button>
            </div>
            <div className="decreaseTime">
                <button
                    className={countingStatus === true ? "hiddenComponent adjustmentButton" : "adjustmentButton"}
                    onClick={() => handleDecrement(300)}
                >
                    <FaChevronDown 
                        className="decreaseButton"
                        aria-label="Decrease Count by 5 minutes"
                    />
                </button>
                <button
                    className={countingStatus === true ? "hiddenComponent adjustmentButton" : "adjustmentButton"}
                    onClick={() => handleDecrement(5)}
                >
                    <FaChevronDown 
                        className="decreaseButton"
                        aria-label="Decrease Count by 5 seconds"
                    />
                </button>
            </div>
        </div>
    )
}

export default TimerDisplay;