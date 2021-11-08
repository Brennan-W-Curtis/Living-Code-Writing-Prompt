import { Link } from 'react-router-dom';
import ModeToggle from './ModeToggle';
import UserAuthentication from './UserAuthentication';
import { FaFeatherAlt, FaCloud } from 'react-icons/fa';

const HeaderContent = ({ authenticatedUser, setAuthenticatedUser, toggleMode, setToggleMode }) => {
    return (
        <header>
            <nav>
                <div class="headerMenu">
                    <div className="brandIcon">
                        <FaFeatherAlt className="iconNegative" />
                        <FaCloud className="iconContent" />
                    </div>
                    <h1>Plume</h1>
                    <ul className="mainNavigation">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="suggested-music">Find Music</Link>
                        </li>
                        <li>
                            <Link to="saved-articles">Saved Articles</Link>
                        </li>
                    </ul>
                </div>
                <UserAuthentication 
                    authenticatedUser={authenticatedUser}
                    setAuthenticatedUser={setAuthenticatedUser}
                />
            </nav>
            <div className="displayToggle">
                <ModeToggle 
                    setToggleMode={setToggleMode}
                    toggleMode={toggleMode}
                />
            </div>
        </header>
    )
}

export default HeaderContent;