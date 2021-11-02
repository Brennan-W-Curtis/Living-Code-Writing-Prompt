import { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from '@firebase/auth';

const UserAuthentication = () => {
    // Store all state values for the component in the following variables.
    const [ registerEmail, setRegisterEmail ] = useState(""); // Stores a string value that reflects the user email input during registration. 
    const [ registerPassword, setRegisterPassword ] = useState(""); // Stores a string value that reflects the user password input during registration.
    const [ loginEmail, setLoginEmail ] = useState(""); // Stores a string value that reflects the user email input while signning in.
    const [ loginPassword, setLoginPassword ] = useState(""); // Stores a string value that reflects the user password input while signning in.
    const [ authenticatedUser, setAuthenticatedUser ] = useState({}); // Stores an object with all of the relevant data of the user currently signed in.

    // Sets the state value authenticatedUser when there's a change in the authenticated state.
    onAuthStateChanged(auth, currentUser => {
        setAuthenticatedUser(currentUser);
    })

    // Asynchronously handle registering a user by creating a new user within Firebase based on their input email and password.
    const registerUser = async event => {
        event.preventDefault();

        try {
            // Store the returned promise in a variable when generating a new user in Firebase authentication.
            const newUser = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            // Clear the register email and password inputs.
            setRegisterEmail("");
            setRegisterPassword("");
        } catch (error) {
            console.log(error.message);
        }

    }

    // Asynchronously handle signing the user in by accessing an existing user created within Firebase based on their input email and password.
    const loginUser = async event => {
        event.preventDefault();

        try {
            // Store the returned promise in a variable when accessing a previously created user in Firebase authentication.
            const returningUser = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
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
        <div>
            {
                // If the state value authenticatedUser evaluates to false then render the register and login forms to the page.
                !authenticatedUser ?
                <div>
                    <form action="submit">
                        <label htmlFor="registerEmail"></label>
                        <input 
                            type="email" 
                            id="registerEmail" 
                            name="registerEmail" 
                            placeholder="Email" 
                            // Monitors the current value entered by the user in the register email input.
                            onChange={event => setRegisterEmail(event.target.value)}
                            value={registerEmail}
                        />
                        <label htmlFor="registerPassword"></label>
                        <input 
                            type="password" 
                            id="registerPassword" 
                            name="registerPassword" 
                            placeholder="Password"
                            // Monitors the current value entered by the user in the register password input.
                            onChange={event => setRegisterPassword(event.target.value)} 
                            value={registerPassword}
                        />
                        <button 
                            type="submit"
                            onClick={event => registerUser(event)}
                        >Register</button>
                    </form>
                    <form action="submit">
                        <label htmlFor="loginEmail"></label>
                        <input 
                            type="email" 
                            id="loginEmail" 
                            name="loginEmail" 
                            placeholder="Email"
                            // Monitors the current value entered by the user in the login email input. 
                            onChange={event => setLoginEmail(event.target.value)}
                            value={loginEmail}
                        />
                        <label htmlFor="loginPassword"></label>
                        <input 
                            type="password" 
                            id="loginPassword" 
                            name="loginPassword" 
                            placeholder="Password"
                            // Monitors the current value entered by the user in the login password input.
                            onChange={event => setLoginPassword(event.target.value)} 
                            value={loginPassword}
                        />
                        <button 
                            type="submit"
                            onClick={event => loginUser(event)}
                        >Login</button>
                    </form>
                </div> :
                <div>
                    {/* If the state variable authenticatedUser evaluates to true the user's email is rendered to the page. */}
                    <p>{authenticatedUser ? authenticatedUser.email : ""}</p>
                    <button
                        onClick={logoutUser}
                    >Sign Out</button>
                </div>
            }
        </div>
    )
}

export default UserAuthentication;