const WritingSpace = ({ userInput, setUserInput }) => {
    return (
        <div>
            <form action="">
                <label htmlFor="userInput" className="sr-only">Writing Space</label>
                <textarea 
                    name="userInput" 
                    id="userInput" 
                    required
                    // Monitors changes in the user's input.
                    onChange={event => setUserInput(event.target.value)}
                    value={userInput}
                    placeholder="Please enter some text."
                ></textarea>
            </form>
        </div>        
    )
}

export default WritingSpace;