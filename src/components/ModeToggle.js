const ModeToggle = ({ setToggleMode, toggleMode }) => {

    // Handles changing the current theme rendered to the page.
    const handleChange = () => {
        setToggleMode(!toggleMode);
    }

    return (
        <div className="modeToggle">
            <label htmlFor="modeToggle" className="toggleLabel">
                <input 
                    type="checkbox" 
                    name="modeToggle" 
                    id="modeToggle" 
                    onChange={handleChange}
                />
                <span className="modeSlider"></span>
            </label>
        </div>
    )
}

export default ModeToggle;