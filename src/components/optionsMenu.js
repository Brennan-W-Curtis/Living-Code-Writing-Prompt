import { useState } from 'react';
import { FaBars, FaAngleRight, FaRegSquare, FaCheckSquare } from 'react-icons/fa';

const optionsMenu = () => {
    const [ focusEnabled, setFocusEnabled ] = useState(false);
    const [ darkEnabled, setDarkEnabled ] = useState(false);
    const [ communalEnabled, setCommunalEnabled ] = useState(false);
    const [ contributeEnabled, setContributeEnabled ] = useState(false);
    const [ countdownEnabled, setCountdownEnabled ] = useState(false);

    return (
        <div className={sidebarActive ? "userPreferences sidebarActive" : "userPreferences sidebarInactive"}>
            <ul className="preferencesList">
                <li className="sidebarToggle">
                    <span><p>Plume Writing </p><FaAngleRight /></span>
                </li>
                <li>
                    <span>{!focusEnabled ? <FaRegSquare /> : <FaCheckSquare />}<p>Focus Mode</p></span>
                </li>
                <li>
                    <span>{!darkEnabled ? <FaRegSquare /> : <FaCheckSquare />}<p>Dark Mode</p></span>
                </li>
                <li>
                    <span>{!communalEnabled ? <FaRegSquare /> : <FaCheckSquare />}<p>Communal Prompts</p></span>
                </li>
                <li>
                    <span>{!contributeEnabled ? <FaRegSquare /> : <FaCheckSquare />}<p>Contribute Prompt</p></span>
                </li>
                <li>
                    <span>{!countdownEnabled ? <FaRegSquare /> : <FaCheckSquare />}<p>Countdown Timer</p></span>
                </li>
            </ul>
        </div>
    )
}

export default optionsMenu;