const WritingSpace = ({ userInput, setUserInput }) => {
    return (
        <div className="writingSpace">
            <form action="">
                <label htmlFor="userInput" className="sr-only">Writing Space</label>
                <textarea 
                    name="userInput" 
                    id="userInput" 
                    required
                    // Monitors changes in the user's input.
                    onChange={event => setUserInput(event.target.value)}
                    value={userInput}
                    placeholder="Write to your heart's content and let your feather dance."
                ></textarea>
            </form>
        </div>        
    )
}

export default WritingSpace;