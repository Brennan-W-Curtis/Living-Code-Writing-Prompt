const ModeToggle = ({ setToggleMode, toggleMode }) => {

    // Handles changing the current theme rendered to the page.
    const handleChange = () => {
        setToggleMode(!toggleMode);
    }

    return (
        <div>
            <label htmlFor="" className="">
                <input 
                    type="checkbox" 
                    name="" 
                    id="" 
                    onChange={handleChange}
                />
                <span></span>
            </label>
        </div>
    )
}

export default ModeToggle;