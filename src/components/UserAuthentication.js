import { useEffect, useState } from 'react';
import { auth, cloud } from '../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from '@firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Link, useHistory } from 'react-router-dom';
import AuthenticationForm from './AuthenticationForm';
import { FaCog } from 'react-icons/fa';

const UserAuthentication = props => {
    // Destructure all state values and functions passed as props.
    const { 
        authenticatedUser, 
        setAuthenticatedUser,
        displayInvalidEmail, 
        setDisplayInvalidEmail,
        displayInvalidPassword,
        setDisplayInvalidPassword, 
        errorInvalidEmail, 
        setErrorInvalidEmail, 
        errorInvalidPassword,
        setErrorInvalidPassword,
        fadeInterface, 
        setDisplayActivity, 
        setSidebarActive 
    } = props;

    // Store all state values for the component in the following variables.
    const [ loginEmail, setLoginEmail ] = useState(""); // Stores the user email input while signning in.
    const [ loginPassword, setLoginPassword ] = useState(""); // Stores the user password input while signning in.
    const [ displayName, setDisplayName ] = useState(""); // Stores the user's username to display in the menu. 
    const [ isLoading, setIsLoading ] = useState(true); // Determines whether a loading indicator is displayed to the user.

    // Store a reference to the useHistory hook in a variable.
    const browserHistory = useHistory();

    // Sets the state value authenticatedUser when there's a change in the authenticated state.
    onAuthStateChanged(auth, currentUser => setAuthenticatedUser(currentUser));

    // Asynchronously handle signing the user in by accessing an existing user created within Firebase based on their input email and password.
    const loginUser = async event => {
        // Prevents the default action of the submit event.
        event.preventDefault();

        try {
            // Store the returned promise in a variable when accessing a previously created user in Firebase authentication.
            await signInWithEmailAndPassword(auth, loginEmail, loginPassword);

            // Clear the login email and password inputs.
            setLoginEmail("");
            setLoginPassword("");

            // Clear all error messages currently rendered on the page upon successfully authenticating.
            setErrorInvalidEmail("");
            setDisplayInvalidEmail(false);
            setErrorInvalidPassword("");
            setDisplayInvalidPassword(false);

            // Displays the user notification window upon the user successfully signing in.
            setDisplayActivity(true);

            // Redirect the user to the landing page after signing in.
            browserHistory.push("/");

        } catch (error) {

            // Conditionally render an error message if the user inputs an invalid email.
            if (error.message === "Firebase: Error (auth/invalid-email).") {
                setErrorInvalidEmail("Please enter a valid email.");
                setDisplayInvalidEmail(true);
            } else {
                setErrorInvalidEmail("");
                setDisplayInvalidEmail(false);
            }

            // Conditionally render an error message if the user attempts to sign into an account that does not exist.
            if (error.message === "Firebase: Error (auth/user-not-found).") {
                setErrorInvalidEmail("Sorry, user not found.");
                setDisplayInvalidEmail(true);
            } else {
                setErrorInvalidEmail("");
                setDisplayInvalidEmail(false);
            }

            // Conditionally render an error message if the user inputs an invalid password.
            if (error.message === "Firebase: Error (auth/wrong-password).") {
                setErrorInvalidPassword("Sorry, the password you entered is incorrect.");
                setDisplayInvalidPassword(true);
            } else {
                setErrorInvalidPassword("");
                setDisplayInvalidPassword(false);
            }

        }
        
    }

    // Asynchronously handles signing the current authenticated user out. 
    const logoutUser = async () => await signOut(auth);

    useEffect(() => {

        const accessDatabase = async () => {
            // Conditionally access previously saved articles if the current user is authenticated
            if (authenticatedUser !== null) {
                // Asynchronously store a reference to the users collection and the path to the authenticated user's document within the cloud database.
                const docRef = await doc(cloud, `users/${authenticatedUser.uid}`);
    
                // Asynchronously store a reference to a readable snapshot of the document. 
                const docSnapshot = await getDoc(docRef);
                
                // If a document exists set the render the user's display name to the page.
                if (docSnapshot.exists()) {
                    setDisplayName(docSnapshot.data().displayName);
                    // Sets the isLoading state value to false and hides the loading indicator.
                    setIsLoading(false);
                }

            }

        }
    
        accessDatabase();

    }, [authenticatedUser]);

    return (
        <div className="userAuthentication">
            {
                // If the state value authenticatedUser evaluates to false then render the register and login forms to the page.
                !authenticatedUser ?
                    <AuthenticationForm 
                        displayInvalidEmail={displayInvalidEmail}
                        displayInvalidPassword={displayInvalidPassword}
                        errorInvalidEmail={errorInvalidEmail}
                        errorInvalidPassword={errorInvalidPassword} 
                        loginUser={loginUser}
                        loginEmail={loginEmail}
                        setLoginEmail={setLoginEmail}
                        loginPassword={loginPassword}
                        setLoginPassword={setLoginPassword}
                    /> :
                    <div className="currentUser">
                        {/* If the state variable authenticatedUser evaluates to true the user's email is rendered to the page. */}
                        {
                            isLoading ?
                                <p className="loadingName">Loading...</p> :
                                <span className={!fadeInterface ? "userGreeting" : "userGreeting reducedOpacity"}>
                                    <p className="welcomeMessage">Welcome, </p>
                                    <button 
                                        className="accessPreferences"
                                        // Reveals the sidebar menu to the user when they click on their name.
                                        onClick={() => setSidebarActive(true)}
                                        aria-label="Reveal User Preferences"
                                    >
                                        <p className="displayName">{authenticatedUser ? `${displayName}` : ""}</p>
                                        <FaCog className="preferencesIcon" aria-label="Options" aria-hidden="true"/>
                                    </button>
                                </span>
                        }
                        <Link 
                            to="/" 
                            className={!fadeInterface ? "logoutRedirect" : "logoutRedirect reducedOpacity"}
                            onClick={logoutUser}
                        >Sign Out</Link>
                    </div>
            }
        </div>
    )
}

export default UserAuthentication;