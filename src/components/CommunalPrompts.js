const CommunalPrompts = ({ currentPrompt, promptFadingOut, promptIsLoading, sidebarActive }) => {
    
    return (
        <div className="communalPrompts">
            <div 
                className={
                    !sidebarActive ?
                        "promptDisplay" :
                        !promptFadingOut ? 
                            "promptDisplay fadeIn" : 
                            "promptDisplay fadeOut" 
                }
            >
                {
                    promptIsLoading ?
                        <p className="currentPrompt">Loading...</p> :
                        <p className="currentPrompt"><span>"</span>{currentPrompt}<span>"</span></p>
                }
            </div>
        </div>
    )
}

export default CommunalPrompts;