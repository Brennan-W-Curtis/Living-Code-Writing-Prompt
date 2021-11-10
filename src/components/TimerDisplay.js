const TimerDisplay = ({ count, countingStatus }) => {
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
            <span>{convertTime(count)}</span>
        </div>
    )
}

export default TimerDisplay;