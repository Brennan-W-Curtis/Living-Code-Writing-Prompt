const CommunalPrompts = ({ contributePrompt, setContributePrompt, currentPrompt, promptIsLoading, setContributeFadingOut }) => {
    // Toggles whether the input form is either visible for the user to contribute a prompt and submit it to the realtime database.
    const toggleContribute = () => {
        if (contributePrompt) {
            setContributeFadingOut(true)
            setTimeout(() => setContributePrompt(false), 1000);
        } else {
            setContributeFadingOut(false);
            setContributePrompt(true)
        }
    }
    
    return (
        <div className="communalPrompts">
            <div className="promptDisplay">
                <button
                    className="contributeButton"
                    onClick={toggleContribute}
                >
                    Contribute
                </button>
                {
                    promptIsLoading ?
                        <p className="currentPrompt">Loading...</p> :
                        <p className="currentPrompt"><span>"</span>{currentPrompt}<span>"</span></p>
                }
            </div>
        </div>
    )
}

export default CommunalPrompts;