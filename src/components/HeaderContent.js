import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo';
import UserAuthentication from './UserAuthentication';
import { FaBars } from 'react-icons/fa';

const HeaderContent = ({ authenticatedUser, setAuthenticatedUser, fadeInterface, setSidebarActive }) => {
    return (
        <header>
            <div className="headerMenu">
                <nav className="menuLinks" aria-label="Primary Navigation">
                    <Link to="/" className={!fadeInterface ? "homeLink" : "homeLink reducedOpacity"}><BrandLogo /></Link>
                    <ul className={authenticatedUser ? "mainNavigation" : "visitorNavigation"}>
                        <li>
                            <Link to="journal-page" className={!fadeInterface ? "individualLinks" : "individualLinks reducedOpacity"}>Journal Page</Link>
                        </li>
                        {
                            authenticatedUser ?
                            <li>
                                <Link to="find-music" className={!fadeInterface ? "individualLinks" : "individualLinks reducedOpacity"}>Find Music</Link>
                            </li> :
                            null
                        }
                        {   
                            authenticatedUser ?
                            <li>
                                <Link to="saved-entries" className={!fadeInterface ? "individualLinks" : "individualLinks reducedOpacity"}>Saved Entries</Link>
                            </li> :
                            null
                        }
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
                                    fadeInterface={fadeInterface}
                                    setSidebarActive={setSidebarActive}
                                /> :
                                null
                    }
                    {
                        authenticatedUser ?
                            <FaBars 
                                className="responsiveMenu" 
                            /> :
                            null
                        
                    }
                </div>
            </div>
        </header>
    )
}

export default HeaderContent;