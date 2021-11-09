import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/styles.css';
import HeaderContent from './components/HeaderContent';
import MainContent from './components/MainContent';
import LoadArticles from './components/LoadArticles';
import FindMusic from './components/FindMusic';
import ErrorPage from './components/ErrorPage';
import UserRegistration from './components/UserRegistration';

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
          <Switch>
            <Route exact path="/">
              <MainContent 
                authenticatedUser={authenticatedUser}
                count={count}
                setCount={setCount}
                countingStatus={countingStatus}
                setCountingStatus={setCountingStatus}
                userInput={userInput}
                setUserInput={setUserInput}
              />
            </Route>
            <Route path="/saved-articles">
              <section className="loadingSection">
                <LoadArticles 
                  authenticatedUser={authenticatedUser}
                  setUserInput={setUserInput}
                />
              </section>
            </Route>
            <Route path="/suggested-music">
              <section className="musicSection">
                <FindMusic />
              </section>
            </Route>
            <Route path="/register-account">
              <section className="registrationSection">
                <UserRegistration />
              </section>
            </Route>
            <Route path="*">
              <section className="errorSection">
                <ErrorPage />
              </section>
            </Route>
          </Switch>
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