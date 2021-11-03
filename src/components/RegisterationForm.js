const RegisterationForm = ({ registerUser, registerEmail, setRegisterEmail, registerPassword, setRegisterPassword}) => {
    return (
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
        </div>
    )
}

export default RegisterationForm;