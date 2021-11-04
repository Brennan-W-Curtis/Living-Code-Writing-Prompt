import { Link } from 'react-router-dom';
import ModeToggle from './ModeToggle';
import UserAuthentication from './UserAuthentication';
import { FaFeatherAlt, FaCloud } from 'react-icons/fa';

const HeaderContent = ({ authenticatedUser, setAuthenticatedUser, toggleMode, setToggleMode }) => {
    return (
        <div>
            <div>
                <nav>
                    <div>
                        <div className="brandIcon">
                            <FaFeatherAlt />
                            <FaCloud />
                        </div>
                        <h1>Plume</h1>
                    </div>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="suggested-music">Music</Link>
                        </li>
                        <li>
                            <Link to="saved-passages">Saved Passages</Link>
                        </li>
                    </ul>
                </nav>
                <UserAuthentication 
                    authenticatedUser={authenticatedUser}
                    setAuthenticatedUser={setAuthenticatedUser}
                />
            </div>
            <div>
                <ModeToggle 
                    setToggleMode={setToggleMode}
                    toggleMode={toggleMode}
                />
            </div>
        </div>
    )
}

export default HeaderContent;