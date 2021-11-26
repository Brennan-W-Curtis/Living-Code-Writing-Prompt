import { useRef, useState } from 'react';
import CountdownTimer from './CountdownTimer';
import WritingSpace from './WritingSpace';
import InactivityWarning from './InactivityWarning';
import CommunalPrompts from './CommunalPrompts';
import ContributePrompt from './ContributePrompt';
import SaveWriting from './SaveWriting';
import UserNotifications from './UserNotifications';
import WordCount from './WordCount';

const MainContent = props => {
    // Destructured all state values passed as props.
    const { 
        authenticatedUser, 
        count, 
        setCount, 
        countingStatus, 
        setCountingStatus,
        userInput, 
        setUserInput, 
        userActivity, 
        setUserActivity 
    } = props;

    // Store a useRef hook that will be assigned the current interval in a variable.
    const timeInterval = useRef(null);
    
    // Store all state values for the component in the following variables.
    const [ contributePrompt, setContributePrompt ] = useState(false); // Determines whether a component allowing the user to enter a prompt is displayed.
    const [ contributeFadingOut, setContributeFadingOut ] = useState(false); // Determines whether the contribute prompt component either fades in or out.
    const [ currentInterval, setCurrentInterval ] = useState(); // Stores the information of the current interval. 
    const [ displaySaving, setDisplaySaving ] = useState(false); // Determines whether the saving options window is rendered to the page.
    const [ saveFadingOut, setSaveFadingOut ] = useState(false); // Determines whether the saving prompt component either fades in or out.
    const [ displayWarning, setDisplayWarning ] = useState(false); // Determines whether an inactivity warning is displayed to the user.

    // Updates the state value responsible for tracking the remaining time by decrementing the count value
    const updateTime = () => {
        setCount(remainingTime => Math.max(0, remainingTime - 1));
    }

    // Handles starting the countdown timer and than continuing to run it at one second intervals. 
    const handleStart = () => {

        // Prevents the countdown timer from running unless the count state variable is greater than zero. 
        if (count > 0) {
            timeInterval.current = setInterval(updateTime, 1000);
            setCountingStatus(true);
            setCurrentInterval(timeInterval.current);
        }
        
    }

    return (
        <>
            <section className="featuresSection">
                <CommunalPrompts 
                    contributePrompt={contributePrompt}
                    setContributePrompt={setContributePrompt}
                    setContributeFadingOut={setContributeFadingOut}
                />
                <div className="primaryInteraction">
                    {
                        contributePrompt ?
                            <ContributePrompt 
                                setContributePrompt={setContributePrompt}
                                contributeFadingOut={contributeFadingOut}
                                setContributeFadingOut={setContributeFadingOut}
                                setUserActivity={setUserActivity}
                            /> :
                            null
                    }
                    <CountdownTimer
                        handleStart={handleStart}
                        count={count}
                        countingStatus={countingStatus}
                        setCount={setCount}
                        setCountingStatus={setCountingStatus}
                        currentInterval={currentInterval}
                        setCurrentInterval={setCurrentInterval}
                        setDisplaySaving={setDisplaySaving}
                        timeInterval={timeInterval}
                    />
                </div>
              </section>
              <section className="writingSection">
                <InactivityWarning 
                    handleStart={handleStart}
                    countingStatus={countingStatus}
                    setCountingStatus={setCountingStatus}
                    displayWarning={displayWarning}
                    setDisplayWarning={setDisplayWarning}
                    currentInterval={currentInterval}
                />
                <WritingSpace 
                    userInput={userInput}
                    setUserInput={setUserInput}
                />
                <SaveWriting 
                    authenticatedUser={authenticatedUser}
                    count={count}
                    countingStatus={countingStatus}
                    displaySaving={displaySaving}
                    setDisplaySaving={setDisplaySaving}
                    saveFadingOut={saveFadingOut}
                    setSaveFadingOut={setSaveFadingOut}
                    userInput={userInput}
                    setUserInput={setUserInput}
                />
              </section>
              <section className="eventsSection">
                <WordCount 
                    userInput={userInput}
                />
                <UserNotifications 
                    userActivity={userActivity}
                />
              </section>
        </>
    )
} 

export default MainContent;