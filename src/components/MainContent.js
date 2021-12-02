import { useEffect, useRef, useState } from 'react';
import CountdownTimer from './CountdownTimer';
import WritingSpace from './WritingSpace';
import InactivityWarning from './InactivityWarning';
import CommunalPrompts from './CommunalPrompts';
import ContributePrompt from './ContributePrompt';
import WordCount from './WordCount';
import SaveWriting from './SaveWriting';

const MainContent = props => {
    // Destructure all state values and functions passed as props.
    const { 
        animateIndicator,
        authenticatedUser,
        contributePrompt,
        setContributePrompt,
        contributeFadingOut,
        setContributeFadingOut,
        count, 
        setCount, 
        countingStatus, 
        setCountingStatus,
        displayActivity,
        setDisplayActivity,
        currentPrompt,
        promptFadingOut,
        promptIsLoading,
        sidebarActive,
        userInput, 
        setUserInput, 
        setUserActivity 
    } = props;

    // Store a useRef hook that will be assigned the current interval in a variable.
    const timeInterval = useRef(null);
    
    // Store all state values for the component in the following variables.
    const [ currentInterval, setCurrentInterval ] = useState(); // Stores the information of the current interval. 
    const [ displaySaving, setDisplaySaving ] = useState(false); // Determines whether the saving options window is rendered to the page.
    const [ saveFadingOut, setSaveFadingOut ] = useState(false); // Determines whether the saving prompt component either fades in or out.
    const [ displayWarning, setDisplayWarning ] = useState(false); // Determines whether an inactivity warning is displayed to the user.
    const [ savingArticle, setSavingArticle ] = useState(false); // Indicates whether the current user is currently saving their article.

    // Briefly displays a notification that indicates to the user their article has been successfully saved.
    useEffect(() => {

        // Conditional statement that determines whether the notificaiton will display render to the page.
        if (savingArticle && displayActivity) {
            setUserActivity("Success, your entry is saved!");
            animateIndicator();
        }

    }, [animateIndicator, displayActivity, savingArticle, setUserActivity]);

    // Briefly displays a notification that indicates to the user whether their prompt has been submitted or rejected.
    useEffect(() => {

        if (contributePrompt && displayActivity === "true") {
            setUserActivity("Success, your prompt is added!");
            animateIndicator();
        }

        if (contributePrompt && displayActivity === "false") {
            setUserActivity("Please enter a valid prompt.");
            animateIndicator();
        }

    }, [animateIndicator, contributePrompt, displayActivity, setUserActivity]);

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
                    currentPrompt={currentPrompt}
                    promptFadingOut={promptFadingOut}
                    promptIsLoading={promptIsLoading}
                    sidebarActive={sidebarActive}
                />
                <div className="primaryInteraction">
                    {
                        contributePrompt ?
                            <ContributePrompt 
                                setContributePrompt={setContributePrompt}
                                contributeFadingOut={contributeFadingOut}
                                setContributeFadingOut={setContributeFadingOut}
                                setDisplayActivity={setDisplayActivity}
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
                    setDisplayActivity={setDisplayActivity}
                    displaySaving={displaySaving}
                    setDisplaySaving={setDisplaySaving}
                    saveFadingOut={saveFadingOut}
                    setSaveFadingOut={setSaveFadingOut}
                    setUserActivity={setUserActivity}
                    setSavingArticle={setSavingArticle}
                    userInput={userInput}
                    setUserInput={setUserInput}
                />
              </section>
              <section className="eventsSection">
                <WordCount 
                    userInput={userInput}
                />
              </section>
        </>
    )
} 

export default MainContent;