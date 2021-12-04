import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth, cloud } from '../firebase';
import { onAuthStateChanged, createUserWithEmailAndPassword } from '@firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import RegisterationForm from './RegisterationForm';

const UserRegistration = props => {
    // Destructure all state values and functions passed as props.
    const { 
        displayInvalidEmail, 
        setDisplayInvalidEmail,
        displayInvalidPassword,
        setDisplayInvalidPassword, 
        errorInvalidEmail, 
        setErrorInvalidEmail, 
        errorInvalidPassword,
        setErrorInvalidPassword,
        setAuthenticatedUser 
    } = props;

    // Store all general state values for the component in the following variables.
    const [ registerEmail, setRegisterEmail ] = useState(""); // Stores the user email input during registration. 
    const [ registerPassword, setRegisterPassword ] = useState(""); // Stores the user password input during registration.
    const [ registerUsername, setRegisterUsername ] = useState(""); // Stores the user's desired name that's displayed.

    // Store a reference to the useHistory hook in a variable.
    const browserHistory = useHistory();

    // Sets the state value authenticatedUser when there's a change in the authenticated state.
    onAuthStateChanged(auth, currentUser => setAuthenticatedUser(currentUser));

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
                await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
                    // Store the display name chosen by the user to their account in addition to their email and password. 
                    .then(userCredential => {
                        const docRef = doc(cloud, `users/${userCredential.user.uid}`);
                        const docEntry = {
                            displayName: registerUsername,
                            userEmail: registerEmail,
                            userPassword: registerPassword
                        };
                        setDoc(docRef, docEntry);
                    });

                // Clear the register username, email, and password inputs.
                setRegisterUsername("");
                setRegisterEmail("");
                setRegisterPassword("");

                // Clear all error messages currently rendered on the page upon successfully authenticating.
                setErrorInvalidEmail("");
                setDisplayInvalidEmail(false);
                setErrorInvalidPassword("");
                setDisplayInvalidPassword(false);

                // Redirect the user to the landing page after signing in.
                browserHistory.push("/");

            } catch (error) {
                
                // Conditionally render an error message if the user inputs a registered email.
                if (error.message === "Firebase: Error (auth/internal-error).") {
                    setErrorInvalidEmail("Input email is already in use.")
                    setDisplayInvalidEmail(true);
                } else {
                    setErrorInvalidEmail("");
                    setDisplayInvalidEmail(false);
                }

                // Conditionally render an error message if the user inputs a password less than six characters.
                if (error.message === "Firebase: Password should be at least 6 characters (auth/weak-password).") {
                    setErrorInvalidPassword("Your password must be at least 6 characters.");
                    setDisplayInvalidPassword(true);
                } else {
                    setErrorInvalidPassword("");
                    setDisplayInvalidPassword(false);
                }

            }

        } else {

            // Conditionally render an error message that indicates the user must enter a valid email input.
            setErrorInvalidEmail("Please enter a valid email.");
            setDisplayInvalidEmail(true);
            
        }

    }

    return (
        <div className="registrationContent">
            <div className="registerationDescription">
                <h2>Plume</h2>
                <p>Find more value in being productive.</p>
            </div>
            <RegisterationForm
                displayInvalidEmail={displayInvalidEmail}
                displayInvalidPassword={displayInvalidPassword}
                errorInvalidEmail={errorInvalidEmail}
                errorInvalidPassword={errorInvalidPassword} 
                registerUser={registerUser}
                registerEmail={registerEmail}
                setRegisterEmail={setRegisterEmail}
                registerPassword={registerPassword}
                setRegisterPassword={setRegisterPassword}
                registerUsername={registerUsername}
                setRegisterUsername={setRegisterUsername}
            />
        </div>
    )
}

export default UserRegistration;