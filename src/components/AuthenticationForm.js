const AuthenticationForm = props => {
    // Destructure all state values and functions passed as props.
    const {
        displayInvalidEmail,
        displayInvalidPassword,
        errorInvalidEmail,
        errorInvalidPassword, 
        loginUser, 
        loginEmail, 
        setLoginEmail, 
        loginPassword, 
        setLoginPassword 
    } = props;

    return (
        <div className="authenticationContent">
            <div className="authenticationDescription">
                <h2>Sign In</h2>
                <p>Access your previous work and start your next journey.</p>
            </div>
            <div className="authenticationForm fadeIn">
                <form action="submit">
                    <span className={ displayInvalidEmail ? "invalidEmail" : "hiddenComponent invalidEmail"}>
                        <p>{errorInvalidEmail}</p>
                    </span>
                    <label htmlFor="loginEmail" className="sr-only">Login Email</label>
                    <input 
                        type="email" 
                        className={displayInvalidEmail ? "displayError" : ""} 
                        id="loginEmail" 
                        name="loginEmail" 
                        placeholder="Email"
                        // Monitors the current value entered by the user in the login email input. 
                        onChange={event => setLoginEmail(event.target.value)}
                        value={loginEmail}
                    />
                    <span className={ displayInvalidPassword ? "invalidPassword" : "hiddenComponent invalidPassword"}>
                        <p>{errorInvalidPassword}</p>
                    </span>
                    <label htmlFor="loginPassword" className="sr-only">Login Password</label>
                    <input 
                        type="password" 
                        className={displayInvalidPassword ? "displayError" : ""} 
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