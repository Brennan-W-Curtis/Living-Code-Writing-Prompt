import { Link } from 'react-router-dom';
import ModeToggle from './ModeToggle';
import BrandLogo from './BrandLogo';
import UserAuthentication from './UserAuthentication';

const HeaderContent = ({ authenticatedUser, setAuthenticatedUser, toggleMode, setToggleMode }) => {
    return (
        <header>
            <div className="headerMenu">
                <nav className="menuLinks">
                <BrandLogo />
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
                                <Link 
                                    to="authenticate-user"
                                    className="loginLink"
                                >
                                    Sign in   
                                </Link>
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
            </div>
        </header>
    )
}

export default HeaderContent;