import { FaQuoteLeft, FaQuoteRight, FaRandom } from 'react-icons/fa';

const CommunalPrompts = ({ currentPrompt, promptDisplay, promptLock, promptFadingOut, promptIsLoading, sidebarActive }) => {
    return (
        <div className="communalPrompts">
            <div 
                className={
                    promptDisplay && promptLock && (!sidebarActive || sidebarActive)  ?
                        "promptDisplay" :
                        !promptDisplay && promptLock ?
                            "hiddenComponent promptDisplay" :
                            !promptFadingOut && !promptLock ? 
                                "promptDisplay fadeIn" : 
                                "promptDisplay fadeOut" 
                }
            >
                {
                    promptIsLoading ?
                        <p className="currentPrompt">Loading...</p> :
                        <p className="currentPrompt">
                            <FaQuoteLeft className="quoteIcons quoteLeft" aria-hidden="true"/>
                            {currentPrompt}
                            <FaQuoteRight className="quoteIcons quoteRight" aria-hidden="true"/>
                        </p>
                        
                }
            </div>
        </div>
    )
}

export default CommunalPrompts;