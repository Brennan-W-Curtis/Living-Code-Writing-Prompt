import { useState } from 'react';
import CountdownTimer from './CountdownTimer';
import WritingSpace from './WritingSpace';
import InactivityWarning from './InactivityWarning';
import CommunalPrompts from './CommunalPrompts';
import ContributePrompt from './ContributePrompt';
import SaveWriting from './SaveWriting';

const MainContent = props => {
    // Destructured all state values passed as props.
    const { authenticatedUser, count, setCount, countingStatus, setCountingStatus, userInput, setUserInput } = props;
    
    // Store all state values for the component in the following variables.
    const [ contributePrompt, setContributePrompt ] = useState(false); // Determines whether a component allowing the user to enter a prompt is displayed.
    const [ fadingOut, setFadingOut ] = useState(false); // Determines whether the contribute prompt component either fades in or out.

    return (
        <>
            <section className="featuresSection">
                <CommunalPrompts 
                    contributePrompt={contributePrompt}
                    setContributePrompt={setContributePrompt}
                    setFadingOut={setFadingOut}
                />
                <div className="primaryInteraction">
                    {
                        contributePrompt ?
                            <ContributePrompt 
                                contributePrompt={contributePrompt}
                                setContributePrompt={setContributePrompt}
                                fadingOut={fadingOut}
                                setFadingOut={setFadingOut}
                            /> :
                            null
                    }
                    <CountdownTimer
                        count={count}
                        countingStatus={countingStatus}
                        setCount={setCount}
                        setCountingStatus={setCountingStatus}
                    />
                </div>
              </section>
              <section className="writingSection">
                <InactivityWarning 
                    countingStatus={countingStatus}
                />
                <WritingSpace 
                    userInput={userInput}
                    setUserInput={setUserInput}
                />
                <SaveWriting 
                    authenticatedUser={authenticatedUser}
                    count={count}
                    countingStatus={countingStatus}
                    userInput={userInput}
                    setUserInput={setUserInput}
                />
              </section>
        </>
    )
} 

export default MainContent;