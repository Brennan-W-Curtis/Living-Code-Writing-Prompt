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
    const [ contributePrompt, setContributePrompt ] = useState(false); // Determines whether a modal allowing the user to enter a prompt is displayed.

    return (
        <>
            <section className="featuresSection">
                <CommunalPrompts 
                    contributePrompt={contributePrompt}
                    setContributePrompt={setContributePrompt}
                />
                <div className="primaryInteraction">
                    {
                        contributePrompt ?
                            <ContributePrompt 
                                contributePrompt={contributePrompt}
                                setContributePrompt={setContributePrompt}
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
                />
              </section>
        </>
    )
} 

export default MainContent;