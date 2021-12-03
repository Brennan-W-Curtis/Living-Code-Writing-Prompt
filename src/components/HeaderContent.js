import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo';
import UserAuthentication from './UserAuthentication';

const HeaderContent = ({ authenticatedUser, setAuthenticatedUser, setSidebarActive }) => {
    return (
        <header>
            <div className="headerMenu">
                <nav className="menuLinks">
                <Link to="/" className="homeLink"><BrandLogo /></Link>
                    <ul className={authenticatedUser ? "mainNavigation" : "visitorNavigation"}>
                        <li>
                            <Link to="journal-page" className="individualLinks">Journal Page</Link>
                        </li>
                        {
                            authenticatedUser ?
                            <li>
                                <Link to="suggested-music" className="individualLinks">Find Music</Link>
                            </li> :
                            null
                        }
                        {   
                            authenticatedUser ?
                            <li>
                                <Link to="saved-entries" className="individualLinks">Saved Entries</Link>
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