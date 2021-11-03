import ModeToggle from './ModeToggle';
import UserAuthentication from './UserAuthentication';

import { FaFeatherAlt, FaCloud } from 'react-icons/fa';

const HeaderContent = ({ authenticatedUser, setAuthenticatedUser, toggleMode, setToggleMode }) => {
    return (
        <div>
            <nav>
                <div className="brandIcon">
                    <FaFeatherAlt />
                    <FaCloud />
                </div>
                <h1>Plume</h1>
            </nav>
            <div>
                <ModeToggle 
                    setToggleMode={setToggleMode}
                    toggleMode={toggleMode}
                />
                <UserAuthentication 
                    authenticatedUser={authenticatedUser}
                    setAuthenticatedUser={setAuthenticatedUser}
                />
            </div>
        </div>
    )
}

export default HeaderContent;