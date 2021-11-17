import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const TimerDisplay = ({ count, countingStatus, handleDecrement, handleIncrement }) => {
    // Conditionally render the minute part of the timer display only if it stores an  value greater than zero.
    const conditionalMinutes = minutes => {
        // Should the counting status state variable have a value of null then the minutes unit will display above the the increment and decrement buttons.
        if (minutes === 0 && (countingStatus === true || countingStatus === false)) {
            return "";
        } else {
            return minutes >= 10 ? minutes + ":" : "0" + minutes + ":";
        }

    }

    // Converts the value stored in the counter variable to minutes and seconds. 
    const convertTime = totalCount => {
        // Stores the amount input by the user in minutes.
        let minutes = Math.floor(totalCount / 60);
        // Store the amount input by the user in seconds.
        let seconds = totalCount % 60;

        // Update the values stored in the variables by conditionally rendering them with a zero if they are less than ten.
        minutes = conditionalMinutes(minutes);
        seconds = seconds >= 10 ? seconds : "0" + seconds;

        // Return the amount input by the user as a format that can be read by minutes and seconds.
        return `${minutes}${seconds}`
    }

    return (
        <div className="timerDisplay">
            {/* Increase */}
            <div className="increaseTime">
                <button
                    className="adjustmentButton"
                    onClick={() => handleIncrement(300)}
                >
                    <FaChevronUp 
                        className="increaseTransition"
                    />
                </button>
                <button
                    className="adjustmentButton"
                    onClick={() => handleIncrement(5)}
                >
                    <FaChevronUp 
                        className="increaseTransition"
                    />
                </button>
            </div>
            <div className="incrementTime">
                <button
                    className="adjustmentButton"
                    onClick={() => handleIncrement(60)}
                >
                    <FaChevronUp 
                        className="incrementTransition"
                    />
                </button>
                <button
                    className="adjustmentButton"
                    onClick={() => handleIncrement(1)}
                >
                    <FaChevronUp 
                        className="incrementTransition"
                    />
                </button>
            </div>
            <div className="currentTime">
                <p>{convertTime(count)}</p>
            </div>
            {/* Decrease */}
            <div className="decrementTime">
                <button
                    className="adjustmentButton"
                    onClick={() => handleDecrement(60)}
                >
                    <FaChevronDown 
                        className="decrementTransition"
                    />
                </button>
                <button
                    className="adjustmentButton"
                    onClick={() => handleDecrement(1)}
                >
                    <FaChevronDown 
                        className="decrementTransition"
                    />
                </button>
            </div>
            <div className="decreaseTime">
                <button
                    className="adjustmentButton"
                    onClick={() => handleDecrement(300)}
                >
                    <FaChevronDown 
                        className="decreaseTransition"
                    />
                </button>
                <button
                    className="adjustmentButton"
                    onClick={() => handleDecrement(5)}
                >
                    <FaChevronDown 
                        className="decreaseTransition"
                    />
                </button>
            </div>
        </div>
    )
}

export default TimerDisplay;