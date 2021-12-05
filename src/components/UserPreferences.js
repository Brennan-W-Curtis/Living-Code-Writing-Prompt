import { FaAngleRight, FaFile, FaSave, FaRegSquare, FaCheckSquare } from 'react-icons/fa';

const UserPreferences = props => {
    // Destructure all state values and functions passed as props.
    const { 
        contributePrompt, 
        setContributePrompt, 
        displayCountdown,
        setDisplayCountdown,
        promptDisplay, 
        setPromptDisplay,
        setPromptLock,
        setPromptFadingOut, 
        setContributeFadingOut, 
        sidebarActive, 
        setSidebarActive,
        toggleMode,
        setToggleMode,
        setUserInput 
    } = props;

    // Toggles the visibility of a feature based on whether the current authenticated user has enabled it.
    const togglePreference = (userPreference, preferenceFading, preferenceDisplay) => {
        if (userPreference) {
            preferenceFading(true);
            setTimeout(() => preferenceDisplay(false), 550);
        } else {
            preferenceFading(false);
            preferenceDisplay(true);
        }
    }

    return (
        <div className={sidebarActive ? "userPreferences preferencesActive" : "userPreferences"}>
            <ul className="preferencesList">
                <li 
                    className="preferenceOption"
                    onClick={() => {
                        setPromptLock(true);
                        setSidebarActive(false);
                    }}
                >
                    <span className="optionText">
                        <p>Plume Journals</p>
                        <FaAngleRight className="preferencesToggle" />
                    </span>
                </li>
                <li
                    className="preferenceOption"
                    onClick={() => setUserInput("")}
                >
                    <span className="optionText">
                        <FaFile className="sidebarIcon" />
                        <p>New</p>
                    </span>
                </li>
                <li
                    className="preferenceOption"
                >
                    <span className="optionText">
                        <FaSave className="sidebarIcon" />
                        <p>Save</p>
                    </span>
                </li>
                {/* <li
                    className="preferenceOption"
                >
                    <span className="optionText">
                        <FaCog className="sidebarIcon" />
                        <p>Preferences</p>
                    </span>
                </li> */}
                <li 
                    className="preferenceOption"
                    onClick={() => setToggleMode(!toggleMode)}
                >
                    <span className="optionText">
                        {
                            !toggleMode ? 
                                <FaRegSquare className="sidebarIcon" /> :
                                <FaCheckSquare className="sidebarIcon" />
                        }
                        <p>Evening Mode</p>
                    </span>
                </li>
                <li 
                    className="preferenceOption"
                    // Toggles whether the writing prompt display is either visible or hidden for the user.
                    onClick={() => {
                        togglePreference(promptDisplay, setPromptFadingOut, setPromptDisplay);
                        setPromptLock(false);
                    }}
                >
                    <span className="optionText">
                        {
                            promptDisplay ? 
                                <FaCheckSquare className="sidebarIcon" /> :
                                <FaRegSquare className="sidebarIcon" /> 
                        }
                        <p>Display Prompts</p>
                    </span>
                </li>
                <li 
                    className="preferenceOption"
                    // Toggles whether the input form to contribute a prompt is either visible or hidden for the user.
                    onClick={() => togglePreference(contributePrompt, setContributeFadingOut, setContributePrompt)}
                >
                    <span className="optionText">
                        {
                            !contributePrompt ? 
                                <FaRegSquare className="sidebarIcon" /> : 
                                <FaCheckSquare className="sidebarIcon" />
                        }
                        <p>Contribute Prompt</p>
                    </span>
                </li>
                <li 
                    className="preferenceOption"
                    onClick={() => setDisplayCountdown(!displayCountdown)}
                >
                    <span className="optionText">
                        {
                            displayCountdown ? 
                                <FaCheckSquare className="sidebarIcon" /> :
                                <FaRegSquare className="sidebarIcon" />  
                        }
                        <p>Countdown Timer</p>
                    </span>
                </li>
                <li>
                    <div></div>
                </li>
            </ul>
        </div>
    )
}

export default UserPreferences;