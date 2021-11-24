import { useState } from 'react';
import { auth, cloud } from '../firebase';
import { onAuthStateChanged, createUserWithEmailAndPassword } from '@firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import RegisterationForm from './RegisterationForm';

const UserRegistration = ({ setAuthenticatedUser }) => {
    // Store all state values for the component in the following variables.
    const [ registerEmail, setRegisterEmail ] = useState(""); // Stores the user email input during registration. 
    const [ registerPassword, setRegisterPassword ] = useState(""); // Stores the user password input during registration.
    const [ registerUsername, setRegisterUsername ] = useState(""); // Stores the user's desired name that's displayed.

    // Sets the state value authenticatedUser when there's a change in the authenticated state.
    onAuthStateChanged(auth, currentUser => {
        setAuthenticatedUser(currentUser);
    });

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
                    // Store a display name chosen by the user to their account. 
                    .then(userCredential => {
                        const docRef = await doc(cloud, `users/${userCredential.user.uid}`);
                        const docEntry = {
                            displayName: registerUsername
                        };
                        await setDoc(docRef, docEntry);
                    });

                // Clear the register username, email, and password inputs.
                setRegisterUsername("");
                setRegisterEmail("");
                setRegisterPassword("");

            } catch (error) {
                console.log(error.message);
            }

        } else {
            console.log("Please enter a valid email to register.");
        }

    }

    return (
        <div className="registrationContent">
            <div className="registerationDescription">
                <h2>Plume</h2>
                <p>Once you register you'll be able to save your progress.</p>
            </div>
            <RegisterationForm 
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