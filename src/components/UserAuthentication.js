import { useEffect, useState } from 'react';
import { auth, cloud } from '../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from '@firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Link, useHistory } from 'react-router-dom';
import AuthenticationForm from './AuthenticationForm';

const UserAuthentication = ({ authenticatedUser, setAuthenticatedUser, setDisplayActivity }) => {
    // Store all state values for the component in the following variables.
    const [ loginEmail, setLoginEmail ] = useState(""); // Stores the user email input while signning in.
    const [ loginPassword, setLoginPassword ] = useState(""); // Stores the user password input while signning in.
    const [ displayName, setDisplayName ] = useState(""); // Stores the user's username to display in the menu. 
    const [ isLoading, setIsLoading ] = useState(true); // Determines whether a loading indicator is displayed to the user.
    const [ sidebarActive, setSidebarActive ] = useState(false); // Determines whether the sidebar menu is visible to the user.

    // Store a reference to the useHistory hook in a variable.
    const windowHistory = useHistory();

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

            // Displays the user notification window upon the user successfully signing in.
            setDisplayActivity(true);

            // Redirect the user to the landing page after signing in.
            windowHistory.push("/");

        } catch (error) {
            console.log(error.message);
        }
        
    }

    // Asynchronously handles signing the current authenticated user out. 
    const logoutUser = async () => await signOut(auth);

    // Reveals the sidebar menu to the user when they click on their name.
    const revealOptions = () => setSidebarActive(true);

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
                                <span className="userGreeting">
                                    <p className="welcomeMessage">Welcome, </p>
                                    <button 
                                        className="userPreferences"
                                        onClick={revealOptions}
                                    >
                                        <p className="displayName">{authenticatedUser ? `${displayName}` : ""}</p>
                                    </button>
                                </span>
                        }
                        <Link 
                            to="/" 
                            className="logoutRedirect"
                            onClick={logoutUser}
                        >Sign Out</Link>
                    </div>
            }
        </div>
    )
}

export default UserAuthentication;