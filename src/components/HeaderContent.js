import { useState } from 'react';
import { Link } from 'react-router-dom';
import ModeToggle from './ModeToggle';
import BrandLogo from './BrandLogo';
import UserAuthentication from './UserAuthentication';

const HeaderContent = ({ authenticatedUser, setAuthenticatedUser, toggleMode, setToggleMode }) => {
    // Store all state values for the component in the following variables.
    const [ displayLogin, setDisplayLogin ] = useState(false); // Determines whether the login modal will be displayed.

    // Handles wheher the login modal is displayed for the user.
    const handleLogin = () => setDisplayLogin(!displayLogin);

    return (
        <header>
            <div className="headerMenu">
                <nav className="menuLinks">
                <Link to="/"><BrandLogo /></Link>
                    <ul className="mainNavigation">
                        <li>
                            <Link to="writing-space" className="individualLinks">Writing Space</Link>
                        </li>
                        <li>
                            <Link to="suggested-music" className="individualLinks">Find Music</Link>
                        </li> 
                        <li>
                            <Link to="saved-articles" className="individualLinks">Saved Articles</Link>
                        </li> 
                    </ul>
                </nav>
                <div className="menuAuthentication">
                    {
                        !authenticatedUser ?
                            <div className="userOptions">
                                <button
                                    className="loginButton"
                                    onClick={handleLogin}
                                >
                                    Sign in
                                </button>
                                <Link to="register-account" className="registerLink">Register</Link>                            
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
                                setDisplayLogin={setDisplayLogin}
                            /> 
                        </div> :
                        null
                }
            </div>
        </header>
    )
}

export default HeaderContent;