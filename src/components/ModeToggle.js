const ModeToggle = ({ setToggleMode, toggleMode }) => {

    return (
        <div className="modeToggle">
            <label className="toggleLabel">
                <input 
                    type="checkbox" 
                    // Handles changing the current theme rendered to the page.
                    onChange={() =>setToggleMode(!toggleMode)}
                />
                <span className="modeSlider"></span>
            </label>
        </div>
    )
}

export default ModeToggle;