const AuthenticationForm = ({ loginUser, loginEmail, setLoginEmail, loginPassword, setLoginPassword }) => {
    return (
        <div className="authenticationContent">
            <div className="authenticationDescription">
                <h2>Sign In</h2>
                <p>Access your previous work and start your next journey.</p>
            </div>
            <div className="authenticationForm fadeIn">
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
        </div>
    )
} 

export default AuthenticationForm;