import { useState } from 'react';
import { Link } from 'react-router-dom';
import ModeToggle from './ModeToggle';
import UserAuthentication from './UserAuthentication';
import { FaFeatherAlt, FaCloud } from 'react-icons/fa';

const HeaderContent = ({ authenticatedUser, setAuthenticatedUser, toggleMode, setToggleMode }) => {
    // Store all state values for the component in the following variables.
    const [ displayLogin, setDisplayLogin ] = useState(false); // Determines whether the login modal will be displayed.

    // Handles wheher the login modal is displayed for the user.
    const handleLogin = () => setDisplayLogin(!displayLogin);

    return (
        <header>
            <div className="headerMenu">
                <div className="menuLinks">
                    <div className="brandIcon">
                        <FaFeatherAlt className="iconNegative" aria-hidden="true" />
                        <FaCloud className="iconContent" aria-hidden="true" />
                    </div>
                    <h1>Plume</h1>
                    <nav>
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
                    </nav>
                </div>
                <div className="menuAuthentication">
                    {
                        !authenticatedUser ?
                            <div className="userOptions">
                                <button
                                    onClick={handleLogin}
                                >Sign in</button>
                                <Link to="register-account">Register</Link>                            
                            </div> :
                            authenticatedUser ?
                                <UserAuthentication 
                                    authenticatedUser={authenticatedUser}
                                    setAuthenticatedUser={setAuthenticatedUser}
                                /> :
                                null
                    }
                </div>
            </div>
            <div className="displayToggle">
                <ModeToggle 
                    setToggleMode={setToggleMode}
                    toggleMode={toggleMode}
                />
                {
                    displayLogin && !authenticatedUser ?
                        <div className="loginModal">
                            <UserAuthentication 
                                authenticatedUser={authenticatedUser}
                                setAuthenticatedUser={setAuthenticatedUser}
                            /> 
                        </div> :
                        null
                }
            </div>
        </header>
    )
}

export default HeaderContent;