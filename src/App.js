import { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './styles/styles.css';
import CountdownTimer from './components/CountdownTimer';
import WritingSpace from './components/WritingSpace';
import InactivityWarning from './components/InactivityWarning';
import CommunalPrompts from './components/CommunalPrompts';
import SuggestMusic from  './components/SuggestMusic';
import SaveWriting from './components/SaveWriting';
import HeaderContent from './components/HeaderContent';
import LoadArticles from './components/LoadArticles';

const App = () => {
  // Store all state values for the application in the following variables.
  const [ count, setCount ] = useState(0); // Stores an integer value that reflects thes total amount of time set by the user in seconds.
  const [ countingStatus, setCountingStatus] = useState(null); // Stores a boolean value or null that determines whether the timer is counting down and which buttons are rendered.
  const [ toggleMode, setToggleMode ] = useState(false); // Stores a boolean value that determines whether the page's theme is either light or dark.
  const [ authenticatedUser, setAuthenticatedUser ] = useState({}); // Stores an object with all of the relevant data of the user currently signed in.
  const [ userInput, setUserInput ] = useState(""); // Stores the input by the user as it changes within the textarea element.

  return (
    <Router>
      <header className={toggleMode ? "eveningDisplay" : "morningDisplay"}>
        <div className="wrapper">
          <HeaderContent 
            setToggleMode={setToggleMode}
            toggleMode={toggleMode}
            authenticatedUser={authenticatedUser}
            setAuthenticatedUser={setAuthenticatedUser}
          />
        </div>
      </header>
      <main className={toggleMode ? "eveningDisplay" : "morningDisplay"}>
        <div className="wrapper">
          <Route exact path="/">
            <section>
              <div>
                <CommunalPrompts />
                <CountdownTimer
                  count={count}
                  countingStatus={countingStatus}
                  setCount={setCount}
                  setCountingStatus={setCountingStatus}
                />
              </div>
            </section>
            <section>
              <div>
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
              </div>
            </section>
          </Route>
          <Route path="/saved-articles">
            <LoadArticles 
              authenticatedUser={authenticatedUser}
              setUserInput={setUserInput}
            />
          </Route>
          <Route path="/suggested-music">
            <SuggestMusic />
          </Route>
        </div>
      </main>
      <footer className={toggleMode ? "eveningDisplay" : "morningDisplay"}>
        <div className="wrapper">
        </div>
      </footer>
    </Router>
  );
}

export default App;