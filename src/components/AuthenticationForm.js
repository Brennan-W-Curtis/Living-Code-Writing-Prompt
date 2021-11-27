import { FaWindowClose } from 'react-icons/fa';

const AuthenticationForm = ({ loginUser, loginEmail, setLoginEmail, loginPassword, setLoginPassword, setDisplayLogin }) => {
    return (
        <div className="authenticationForm fadeIn">
            <div className="windowInteraction">
                <FaWindowClose 
                    onClick={() => setDisplayLogin(false)}
                />
            </div>
            <form action="submit">
                <label htmlFor="loginEmail" className="sr-only">Login Email</label>
                <input 
                    type="email" 
                    id="loginEmail" 
                    name="loginEmail" 
                    placeholder="Email"
                    // Monitors the current value entered by the user in the login email input. 
                    onChange={event => setLoginEmail(event.target.value)}
                    value={loginEmail}
                />
                <label htmlFor="loginPassword" className="sr-only">Login Password</label>
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
                >
                    Submit
                </button>
            </form>
        </div>
    )
} 

export default AuthenticationForm;