const RegisterationForm = props => {
    
    const { registerUser, registerEmail, setRegisterEmail, registerPassword, setRegisterPassword, registerUsername, setRegisterUsername } = props;

    return (
        <div className="registrationForm fadeIn">
            <form action="submit">
                <label htmlFor="registerUsername" className="sr-only">Register Username</label>
                <input 
                    type="text" 
                    id="registerUsername"
                    name="registerUsername"
                    placeholder="Name"
                    // Monitors the current value entered by the user in the register username input.
                    onChange={event => setRegisterUsername(event.target.value)}
                    value={registerUsername}
                />
                <label htmlFor="registerEmail" className="sr-only">Register Email</label>
                <input 
                    type="email" 
                    id="registerEmail" 
                    name="registerEmail" 
                    placeholder="Email" 
                    // Monitors the current value entered by the user in the register email input.
                    onChange={event => setRegisterEmail(event.target.value)}
                    value={registerEmail}
                />
                <label htmlFor="registerPassword" className="sr-only">Register Password</label>
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
                >
                    Register
                </button>
            </form>
        </div>
    )
}

export default RegisterationForm;