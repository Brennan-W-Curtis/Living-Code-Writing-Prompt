const AuthenticationForm = ({ loginUser, loginEmail, setLoginEmail, loginPassword, setLoginPassword }) => {
    return (
        <div>
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
        </div>
    )
} 

export default AuthenticationForm;