const WarningModal = ({ count, setCount, setCountingStatus, setCurrentInterval, setDisplayWarning }) => {
    return (
        <div className="warningModal">
            <p>You have been inactive for 15 seconds. Would you like to continue?</p>
            <button 
                onClick={() => {
                    setCountingStatus(true);
                    setDisplayWarning(false);
                }}
            >
                Continue
            </button>
        </div>
    )
}

export default WarningModal;