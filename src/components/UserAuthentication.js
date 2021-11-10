import { useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from '@firebase/auth';
import AuthenticationForm from './AuthenticationForm';

const UserAuthentication = ({ authenticatedUser, setAuthenticatedUser }) => {
    // Store all state values for the component in the following variables.
    const [ loginEmail, setLoginEmail ] = useState(""); // Stores the user email input while signning in.
    const [ loginPassword, setLoginPassword ] = useState(""); // Stores the user password input while signning in.

    // Sets the state value authenticatedUser when there's a change in the authenticated state.
    onAuthStateChanged(auth, currentUser => {
        setAuthenticatedUser(currentUser);
    })

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

        } catch (error) {
            console.log(error.message);
        }
        
    }

    // Asynchronously handles signing the current authenticated user out. 
    const logoutUser = async () => {
        await signOut(auth);
    }

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
                        <p className="displayName">{authenticatedUser ? authenticatedUser.email : ""}</p>
                        <button
                            onClick={logoutUser}
                        >Sign Out</button>
                    </div>
            }
        </div>
    )
}

export default UserAuthentication;