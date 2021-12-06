import WordCount from './WordCount';
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
        enableSaving,
        setEnableSaving,
        sidebarActive, 
        setSidebarActive,
        toggleMode,
        setToggleMode,
        userInput,
        setUserInput,
        setPromptLock,
        setPromptFadingOut, 
        setSaveFadingOut,
        setContributeFadingOut 
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
            <nav aria-label="User Preferences">
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
                            <button className="iconContainer">
                                <FaAngleRight className="preferencesToggle" aria-label="Hide User Preferences" />
                            </button>
                        </span>
                    </li>
                    <li
                        className="preferenceOption"
                        onClick={() => setUserInput("")}
                    >
                        <span className="optionText">
                            <button className="iconContainer">
                                <FaFile className="sidebarIcon" aria-label="New Document" />
                            </button>
                            <p>New</p>
                        </span>
                    </li>
                    <li
                        className="preferenceOption"
                        // Toggles whether the saving window is either visible or hidden for the user.
                        onClick={() => togglePreference(enableSaving, setSaveFadingOut, setEnableSaving)}
                    >
                        <span className="optionText">
                            <button className="iconContainer">
                                <FaSave className="sidebarIcon" aria-label="Save Document" />
                            </button>
                            <p>Save</p>
                        </span>
                    </li>
                    <li 
                        className="preferenceOption"
                        // Toggles whether dark mode is enabled for the user.
                        onClick={() => setToggleMode(!toggleMode)}
                    >
                        <span className="optionText">
                            <button className="iconContainer">
                                {
                                    !toggleMode ? 
                                        <FaRegSquare className="sidebarIcon" aria-label="Toggle Dark Mode" /> :
                                        <FaCheckSquare className="sidebarIcon" aria-label="Toggle Dark Mode" />
                                }
                            </button>
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
                            <button className="iconContainer">
                                {
                                    promptDisplay ? 
                                        <FaCheckSquare className="sidebarIcon" aria-label="Toggle Writing Prompts" /> :
                                        <FaRegSquare className="sidebarIcon" aria-label="Toggle Writing Prompts" /> 
                                }
                            </button>
                            <p>Display Prompts</p>
                        </span>
                    </li>
                    <li 
                        className="preferenceOption"
                        // Toggles whether the input form to contribute a prompt is either visible or hidden for the user.
                        onClick={() => togglePreference(contributePrompt, setContributeFadingOut, setContributePrompt)}
                    >
                        <span className="optionText">
                            <button className="iconContainer">
                                {
                                    !contributePrompt ? 
                                        <FaRegSquare className="sidebarIcon" aria-label="Toggle Contribute Prompt" /> : 
                                        <FaCheckSquare className="sidebarIcon" aria-label="Toggle Contribute Prompt" />
                                }
                            </button>
                            <p>Contribute Prompt</p>
                        </span>
                    </li>
                    <li 
                        className="preferenceOption"
                        // Toggles whether the countdown timer is enabled for the user.
                        onClick={() => setDisplayCountdown(!displayCountdown)}
                    >
                        <span className="optionText">
                            <button className="iconContainer">
                                {
                                    displayCountdown ? 
                                        <FaCheckSquare className="sidebarIcon" aria-label="Toggle Countdown Timer" /> :
                                        <FaRegSquare className="sidebarIcon" aria-label="Toggle Countdown Timer" />  
                                }
                            </button>
                            <p>Countdown Timer</p>
                        </span>
                    </li>
                    <li className="preferenceFeatures">
                        <div className="featureContainer">
                            <WordCount 
                                userInput={userInput}
                            />
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default UserPreferences;