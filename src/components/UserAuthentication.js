import { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from '@firebase/auth';
import RegisterationForm from './RegisterationForm';
import AuthenticationForm from './AuthenticationForm';

const UserAuthentication = ({ authenticatedUser, setAuthenticatedUser }) => {
    // Store all state values for the component in the following variables.
    const [ registerEmail, setRegisterEmail ] = useState(""); // Stores a string value that reflects the user email input during registration. 
    const [ registerPassword, setRegisterPassword ] = useState(""); // Stores a string value that reflects the user password input during registration.
    const [ loginEmail, setLoginEmail ] = useState(""); // Stores a string value that reflects the user email input while signning in.
    const [ loginPassword, setLoginPassword ] = useState(""); // Stores a string value that reflects the user password input while signning in.

    // Sets the state value authenticatedUser when there's a change in the authenticated state.
    onAuthStateChanged(auth, currentUser => {
        setAuthenticatedUser(currentUser);
    })

    // Asynchronously handle registering a user by creating a new user within Firebase based on their input email and password.
    const registerUser = async event => {
        // Prevents the default action of the submit event.
        event.preventDefault();

        // Store a regular expression that determines whether the input by the user string is valid email.
        const emailRegex = /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/;

        // Determine whether the email is formatted correctly if not inputEmail's value becomes null.
        const formattedEmail = registerEmail.toLowerCase().match(emailRegex);

        // Conditional statement that determines whether a user will be created.
        if (formattedEmail) {

            try {
                // Store the returned promise in a variable when generating a new user in Firebase authentication.
                await createUserWithEmailAndPassword(auth, formattedEmail, registerPassword);

                // Clear the register email and password inputs.
                setRegisterEmail("");
                setRegisterPassword("");

            } catch (error) {
                console.log(error.message);
            }

        } else {
            console.log("Please enter a valid email to register.")
        }

    }

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
                <div>
                    <RegisterationForm 
                        registerUser={registerUser}
                        registerEmail={registerEmail}
                        setRegisterEmail={setRegisterEmail}
                        registerPassword={registerPassword}
                        setRegisterPassword={setRegisterPassword}
                    />
                    <AuthenticationForm 
                        loginUser={loginUser}
                        loginEmail={loginEmail}
                        setLoginEmail={setLoginEmail}
                        loginPassword={loginPassword}
                        setLoginPassword={setLoginPassword}
                    />
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