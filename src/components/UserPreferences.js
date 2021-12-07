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
            <ul className="preferencesList">
                <li className="preferenceOption">
                    <button
                        className="listButton"
                        onClick={() => {
                            setPromptLock(true);
                            setSidebarActive(false);
                        }}
                    >
                        <span className="optionText">
                            <p>Plume Journals</p>
                            <span className="iconContainer">
                                <FaAngleRight className="preferencesToggle" aria-label="Hide User Preferences" />
                            </span>
                        </span>
                    </button>
                </li>
                <li className="preferenceOption">
                    <button
                        className="listButton"
                        onClick={() => setUserInput("")}
                    >
                        <span className="optionText">
                            <span className="iconContainer">
                                <FaFile className="sidebarIcon" aria-label="New Document" />
                            </span>
                            <p>New</p>
                        </span>
                    </button>
                </li>
                <li className="preferenceOption">
                    <button
                        className="listButton"
                        // Toggles whether the saving window is either visible or hidden for the user.
                        onClick={() => togglePreference(enableSaving, setSaveFadingOut, setEnableSaving)}
                    >
                        <span className="optionText">
                            <span className="iconContainer">
                                <FaSave className="sidebarIcon" aria-label="Save Document" />
                            </span>
                            <p>Save</p>
                        </span>
                    </button>
                </li>
                <li className="preferenceOption">
                    <button
                        className="listButton"
                        // Toggles whether dark mode is enabled for the user.
                        onClick={() => setToggleMode(!toggleMode)}
                    >    
                        <span className="optionText">
                            <span className="iconContainer">
                                {
                                    !toggleMode ? 
                                        <FaRegSquare className="sidebarIcon" aria-label="Toggle Dark Mode" /> :
                                        <FaCheckSquare className="sidebarIcon" aria-label="Toggle Dark Mode" />
                                }
                            </span>
                            <p>Evening Mode</p>
                        </span>
                    </button>
                </li>
                <li className="preferenceOption">
                    <button
                        className="listButton"
                        // Toggles whether the writing prompt display is either visible or hidden for the user.
                        onClick={() => {
                            togglePreference(promptDisplay, setPromptFadingOut, setPromptDisplay);
                            setPromptLock(false);
                        }}
                    > 
                        <span className="optionText">
                            <span className="iconContainer">
                                {
                                    promptDisplay ? 
                                    <FaCheckSquare className="sidebarIcon" aria-label="Toggle Writing Prompts" /> :
                                    <FaRegSquare className="sidebarIcon" aria-label="Toggle Writing Prompts" /> 
                                }
                            </span>
                            <p>Display Prompts</p>
                        </span>
                    </button>   
                </li>
                <li className="preferenceOption">
                    <button
                        className="listButton"
                        // Toggles whether the input form to contribute a prompt is either visible or hidden for the user.
                        onClick={() => togglePreference(contributePrompt, setContributeFadingOut, setContributePrompt)}
                    > 
                        <span className="optionText">
                            <span className="iconContainer">
                                {
                                    !contributePrompt ? 
                                    <FaRegSquare className="sidebarIcon" aria-label="Toggle Contribute Prompt" /> : 
                                    <FaCheckSquare className="sidebarIcon" aria-label="Toggle Contribute Prompt" />
                                }
                            </span>
                            <p>Contribute Prompt</p>
                        </span>
                    </button>
                </li>
                <li className="preferenceOption">
                    <button
                        className="listButton"
                        // Toggles whether the countdown timer is enabled for the user.
                        onClick={() => setDisplayCountdown(!displayCountdown)}
                    > 
                        <span className="optionText">
                            <span className="iconContainer">
                                {
                                    displayCountdown ? 
                                    <FaCheckSquare className="sidebarIcon" aria-label="Toggle Countdown Timer" /> :
                                    <FaRegSquare className="sidebarIcon" aria-label="Toggle Countdown Timer" />  
                                }
                            </span>
                            <p>Countdown Timer</p>
                        </span>
                    </button>
                </li>
                <li className="preferenceFeatures">
                    <div className="featureContainer">
                        <WordCount 
                            userInput={userInput}
                        />
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default UserPreferences;