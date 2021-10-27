const TimerDisplay = props => {
    const { count } = props;

    // Converts the value stored in the counter variable to minutes and seconds 
    const convertTime = totalCount => {
        // Stores the amount input by the user for the counter value in minutes.
        let minutes = Math.floor(totalCount / 60);
        // Store the amount input by the user for the counter value in seconds.
        let seconds = totalCount % 60;

        // Update the values stored in the variables by conditionally rendering them with a zero if they are less than ten.
        minutes = minutes >= 10 ? minutes : "0" + minutes;
        seconds = seconds >= 10 ? seconds : "0" + seconds;

        // Return the amount input by the user as a format that can be read by minutes and seconds 
        return `${minutes}:${seconds}`
    }

    return (
        <div>
            <span>{convertTime(count)}</span>
        </div>
    )
}

export default TimerDisplay;