import { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import RegisterationForm from './RegisterationForm';

const UserRegistration = () => {
    // Store all state values for the component in the following variables.
    const [ registerEmail, setRegisterEmail ] = useState(""); // Stores a string value that reflects the user email input during registration. 
    const [ registerPassword, setRegisterPassword ] = useState(""); // Stores a string value that reflects the user password input during registration.
    const [ registerUsername, setRegisterUsername ] = useState(""); // Stores a string value that reflects the user's desired name that's displayed.

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

    return (
        <div>
            <div>
                <p>Once you register you'll be able to save your progress and resume later.</p>
            </div>
            <RegisterationForm 
                registeredUser={registerUser}
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