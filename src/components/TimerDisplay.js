const TimerDisplay = ({ time }) => {
    return (
        <div>
            <span>{(time.seconds >= 10) ? time.seconds : "0" + time.seconds} </span>
            <span>{(time.minutes >= 10) ? time.minutes : "0" + time.minutes} </span>
        </div>
    )
}

export default TimerDisplay;