import CountdownTimer from './CountdownTimer';
import WritingSpace from './WritingSpace';
import InactivityWarning from './InactivityWarning';
import CommunalPrompts from './CommunalPrompts';
import SaveWriting from './SaveWriting';

const MainContent = props => {
    // Destructured all state values passed as props.
    const { authenticatedUser, setIsLoading, count, setCount, countingStatus, setCountingStatus, userInput, setUserInput } = props;

    return (
        <>
            <section className="featuresSection">
                <CommunalPrompts 
                    setIsLoading={setIsLoading}
                />
                <CountdownTimer
                    count={count}
                    countingStatus={countingStatus}
                    setCount={setCount}
                    setCountingStatus={setCountingStatus}
                />
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