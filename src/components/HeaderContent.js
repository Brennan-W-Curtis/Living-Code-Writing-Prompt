import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo';
import UserAuthentication from './UserAuthentication';
import { FaBars } from 'react-icons/fa';

const HeaderContent = ({ authenticatedUser, setAuthenticatedUser, fadeInterface, navigationActive, setNavigationActive, setSidebarActive }) => {
    return (
        <header>
            <div className="headerMenu">
                <nav className={!navigationActive ? "primaryMenu" : "primaryMenu navigationActive"} aria-label="Primary Navigation">
                    <Link 
                        to="/" 
                        className={!fadeInterface ? "homeLink" : "homeLink reducedOpacity"}
                        onClick={() => setNavigationActive(false)}
                    >
                        <BrandLogo />
                    </Link>
                    <ul className={authenticatedUser ? "mainNavigation" : "visitorNavigation"}>
                        <li>
                            <Link 
                                to="journal-page" 
                                className={!fadeInterface ? "individualLinks" : "individualLinks reducedOpacity"}
                                onClick={() => setNavigationActive(false)}
                            >
                                Journal Page
                            </Link>
                        </li>
                        {
                            authenticatedUser ?
                            <li>
                                <Link 
                                    to="find-music" 
                                    className={!fadeInterface ? "individualLinks" : "individualLinks reducedOpacity"}
                                    onClick={() => setNavigationActive(false)}
                                >
                                    Find Music
                                </Link>
                            </li> :
                            null
                        }
                        {   
                            authenticatedUser ?
                            <li>
                                <Link 
                                    to="saved-entries" 
                                    className={!fadeInterface ? "individualLinks" : "individualLinks reducedOpacity"}
                                    onClick={() => setNavigationActive(false)}
                                >
                                    Saved Entries
                                </Link>
                            </li> :
                            null
                        }
                    </ul>
                </nav>
                <button 
                    className={!fadeInterface ? "menuButton" : "menuButton reducedOpacity"}
                    onClick={() => setNavigationActive(true)} 
                >
                    <FaBars 
                        className="menuIcon"
                        aria-label="Navigation Menu"
                    /> 
                </button>
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
                                    fadeInterface={fadeInterface}
                                    setSidebarActive={setSidebarActive}
                                /> :
                                null
                    }
                </div>
            </div>
        </header>
    )
}

export default HeaderContent;