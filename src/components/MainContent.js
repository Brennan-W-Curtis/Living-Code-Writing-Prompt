import { useEffect, useRef, useState } from 'react';
import CountdownTimer from './CountdownTimer';
import WritingSpace from './WritingSpace';
import InactivityWarning from './InactivityWarning';
import CommunalPrompts from './CommunalPrompts';
import ContributePrompt from './ContributePrompt';
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
        displayCountdown,
        displayActivity,
        setDisplayActivity,
        enableSaving,
        setEnableSaving,
        fadeInterface,
        setFadeInterface,
        saveFadingOut,
        setSaveFadingOut,
        currentPrompt,
        promptDisplay,
        promptLock,
        promptFadingOut,
        promptIsLoading,
        setCurrentPrompt,
        sidebarActive,
        storedPrompts,
        userInput, 
        setUserInput, 
        setUserActivity 
    } = props;

    // Store a useRef hook that will be assigned the current interval in a variable.
    const timeInterval = useRef(null);
    
    // Store all state values for the component in the following variables.
    const [ currentInterval, setCurrentInterval ] = useState(); // Stores the information of the current interval. 
    const [ displaySaving, setDisplaySaving ] = useState(false); // Determines whether the saving options window is rendered to the page.
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

        if (contributePrompt && displayActivity) {
            setUserActivity("Success, your prompt is added!");
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
            setTimeout(() => setFadeInterface(true), 3000);
        }
        
    }

    return (
        <>
            <section className="featuresSection">
                <CommunalPrompts 
                    currentPrompt={currentPrompt}
                    fadeInterface={fadeInterface}
                    promptDisplay={promptDisplay}
                    promptLock={promptLock}
                    promptFadingOut={promptFadingOut}
                    promptIsLoading={promptIsLoading}
                    setCurrentPrompt={setCurrentPrompt}
                    sidebarActive={sidebarActive}
                    storedPrompts={storedPrompts}
                />
                <div className="primaryInteraction">
                    {
                        contributePrompt ?
                            <ContributePrompt 
                                contributeFadingOut={contributeFadingOut}
                                setContributeFadingOut={setContributeFadingOut}
                                storedPrompts={storedPrompts}
                                setContributePrompt={setContributePrompt}
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
                        displayCountdown={displayCountdown}
                        fadeInterface={fadeInterface}
                        setFadeInterface={setFadeInterface}
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
                    setFadeInterface={setFadeInterface}
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
                    enableSaving={enableSaving}
                    setEnableSaving={setEnableSaving}
                    saveFadingOut={saveFadingOut}
                    setSaveFadingOut={setSaveFadingOut}
                    setUserActivity={setUserActivity}
                    setSavingArticle={setSavingArticle}
                    userInput={userInput}
                    setUserInput={setUserInput}
                />
              </section>
        </>
    )
} 

export default MainContent;