import { useState } from 'react';
import { FaRegSquare, FaCheckSquare } from 'react-icons/fa';

const optionsMenu = () => {

    const [ focusEnabled, setFocusEnabled ] = useState(false);
    const [ darkEnabled, setDarkEnabled ] = useState(false);
    const [ communalEnabled, setCommunalEnabled ] = useState(false);
    const [ contributeEnabled, setContributeEnabled ] = useState(false);
    const [ countdownEnabled, setCountdownEnabled ] = useState(false);

    return (
        <div className="userPreferences">
            <ul className="preferencesList">
                <li>
                    <p><span>{!focusEnabled ? <FaRegSquare /> : <FaCheckSquare />}</span>Focus Mode</p>
                </li>
                <li>
                    <p><span>{!darkEnabled ? <FaRegSquare /> : <FaCheckSquare />}</span>Dark Mode</p>
                </li>
                <li>
                    <p><span>{!communalEnabled ? <FaRegSquare /> : <FaCheckSquare />}</span>Communal Prompts</p>
                </li>
                <li>
                    <p><span>{!contributeEnabled ? <FaRegSquare /> : <FaCheckSquare />}</span>Contribute Prompt</p>
                </li>
                <li>
                    <p><span>{!countdownEnabled ? <FaRegSquare /> : <FaCheckSquare />}</span>Countdown Timer</p>
                </li>
            </ul>
        </div>
    )
}

export default optionsMenu;