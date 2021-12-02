import { FaAngleRight, FaRegSquare, FaCheckSquare } from 'react-icons/fa';

const UserPreferences = props => {
    // Destructure all state values and functions passed as props.
    const { 
        contributePrompt, 
        setContributePrompt, 
        promptDisplay, 
        setPromptDisplay,
        setPromptFadingOut, 
        setContributeFadingOut, 
        sidebarActive, 
        setSidebarActive 
    } = props;

    // const [ darkEnabled, setDarkEnabled ] = useState(false);
    // const [ focusEnabled, setFocusEnabled ] = useState(false);
    // const [ countdownEnabled, setCountdownEnabled ] = useState(false);

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
                    onClick={() => setSidebarActive(false)}
                >
                    <span className="optionText">
                        <p>Plume Journals</p>
                        <FaAngleRight className="preferencesToggle" />
                    </span>
                </li>
                {/* <li className="preferenceOption">
                    <span className="optionText">
                        {
                            !focusEnabled ? 
                                <FaRegSquare /> : 
                                <FaCheckSquare />
                        }
                        <p>Focus Mode</p>
                    </span>
                </li>
                <li className="preferenceOption">
                    <span className="optionText">
                        {
                            !darkEnabled ? 
                                <FaRegSquare /> :
                                <FaCheckSquare />
                        }
                        <p>Dark Mode</p>
                    </span>
                </li> */}
                <li 
                    className="preferenceOption"
                    // Toggles whether the writing prompt display is either visible or hidden for the user.
                    onClick={() => togglePreference(promptDisplay, setPromptFadingOut, setPromptDisplay)}
                >
                    <span className="optionText">
                        {
                            promptDisplay ? 
                                <FaCheckSquare /> :
                                <FaRegSquare /> 
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
                                <FaRegSquare /> : 
                                <FaCheckSquare />
                        }
                        <p>Contribute Prompt</p>
                    </span>
                </li>
                {/* <li className="preferenceOption">
                    <span className="optionText">
                        {
                            !countdownEnabled ? 
                                <FaRegSquare /> : 
                                <FaCheckSquare />
                        }
                        <p>Countdown Timer</p>
                    </span>
                </li> */}
            </ul>
        </div>
    )
}

export default UserPreferences;