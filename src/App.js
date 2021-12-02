import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import realtime from './firebase';
import { ref, onValue } from 'firebase/database';
import './styles/styles.css';
import HeaderContent from './components/HeaderContent';
import MainContent from './components/MainContent';
import LoadArticles from './components/LoadArticles';
import FindMusic from './components/FindMusic';
import UserRegistration from './components/UserRegistration';
import UserAuthentication from './components/UserAuthentication';
import ErrorPage from './components/ErrorPage';
import LandingPage from './components/LandingPage';
import UserNotifications from './components/UserNotifications';
import UserPreferences from './components/UserPreferences';

const App = () => {
  // Store all state values for the application in the following variables.
  const [ count, setCount ] = useState(0); // Stores the total amount of time set by the user in seconds.
  const [ countingStatus, setCountingStatus] = useState(null); // Determines whether the timer is counting down and which buttons are rendered.
  const [ promptDisplay, setPromptDisplay ] = useState(true); // Determines whether the writing prompt is either visible or hidden.
  const [ currentPrompt, setCurrentPrompt ] = useState(""); // Stores a randomly selected prompt from the storedPrompts state variable.
  const [ storedPrompts, setStoredPrompts ] = useState([]); // Stores an array of string values that it receives from the realtime database that includes all of the submitted prompts by users.
  const [ promptFadingOut, setPromptFadingOut ] = useState(false) // Determines whether the prompt display component either fades in or out.
  const [ contributePrompt, setContributePrompt ] = useState(false); // Determines whether the component that allows the user to contribute a prompt is either visible or hidden.
  const [ promptIsLoading, setPromptIsLoading ] = useState(true); // Determines whether a loading indicator is displayed to the user.
  const [ contributeFadingOut, setContributeFadingOut ] = useState(false); // Determines whether the contribute prompt component either fades in or out.
  const [ authenticatedUser, setAuthenticatedUser ] = useState({}); // Stores an object with all of the relevant data of the user currently signed in.
  const [ accessToken, setAccessToken ] = useState(""); // Stores the access token return after authenticating the user.
  const [ userVerified, setUserVerified ] = useState(false); // Reflects whether the user has signed into the spotify api.
  const [ userInput, setUserInput ] = useState(""); // Stores the input by the user as it changes within the textarea element.
  const [ userActivity, setUserActivity ] = useState(""); // Stores a message for the user based on recent interaction events.
  const [ displayActivity, setDisplayActivity ] = useState(null); // Determines whether the notification window is displayed for the user with either a positive or negative indicator.
  const [ activityFadingOut, setActivityFadingOut ] = useState(false); // Determines whether the notification window is either fading in our fading out.
  const [ toggleMode, setToggleMode ] = useState(false); // Determines whether the page's theme is either light or dark.
  const [ sidebarActive, setSidebarActive ] = useState(false); // Determines whether the sidebar menu is visible to the user.

   // On initial render the storedPrompts state variable is updated with the values in the realtime database and a random prompt is selected to render onto the page.
   useEffect(() => {
    // Store a reference to the realtime database.
    const dbRef = ref(realtime);

    onValue(dbRef, snapshot => {

        // Store a reference of the snapshot of the realtime database to access it's values.
        const myData = snapshot.val();

        // Create an empty array to store all of the prompts from the realtime database.
        const databasePrompts = [];

        // Iterate through the entirety of the myData object and push each value into an array.
        for (let value in myData) {

            // Declare an object that stores an individual prompt with it's respective id.
            const promptObject = {
                id: value,
                prompt: myData[value]
            }

            // Push each prompt object to an array declared within the lexical scope.
            databasePrompts.push(promptObject);

        }

        // Set the state variable with an empty array to an array with all of the prompt objects.
        setStoredPrompts(databasePrompts);

    });
    
  }, []);

  useEffect(() => {
          
    // If the storedPrompts array length is greater than zero set the currentPrompt state variable to a prompt based on a randomly generated index. 
    if (storedPrompts.length > 0) {
        const randomIndex = Math.floor(Math.random() * storedPrompts.length);
        setCurrentPrompt(storedPrompts[randomIndex].prompt);
        setPromptIsLoading(false);
    }

    // Include storedPrompts as a dependency, when this value changes it triggers a re-render that calls the function above. 
  }, [storedPrompts]);

  useEffect(() => {

    // If the current user is not authenticated than set the value of userVerified to false to prevent them from accessing the previous user's playlists.
    if (!authenticatedUser) setUserVerified(false);

  }, [authenticatedUser]);

  // Handles the animating of the notification window.
  const animateIndicator = () => {
    setTimeout(() => setActivityFadingOut(true), 4000);
    setTimeout(() => setUserActivity(""), 4500);
    setTimeout(() => setDisplayActivity(null), 4500);
    setTimeout(() => setActivityFadingOut(false), 4500);
  }

  return (
    <Router>
      <header className={toggleMode ? "eveningDisplay" : "morningDisplay"}>
        <div className="wrapper">
          <HeaderContent 
            authenticatedUser={authenticatedUser}
            setAuthenticatedUser={setAuthenticatedUser}
            toggleMode={toggleMode}
            setToggleMode={setToggleMode}
            setSidebarActive={setSidebarActive}
          />
        </div>
        <aside>
          <UserPreferences
            contributePrompt={contributePrompt}
            setContributePrompt={setContributePrompt}
            promptDisplay={promptDisplay}
            setPromptFadingOut={setPromptFadingOut}
            setPromptDisplay={setPromptDisplay}
            setContributeFadingOut={setContributeFadingOut}
            sidebarActive={sidebarActive}
            setSidebarActive={setSidebarActive}
          />
        </aside>
      </header>
      <main className={toggleMode ? "eveningDisplay" : "morningDisplay"}>
        <div className="wrapper">
          <Switch>
            <Route exact path="/">
              <section className="landingSection">
                <LandingPage 
                  animateIndicator={animateIndicator}
                  authenticatedUser={authenticatedUser}
                  setUserActivity={setUserActivity}
                  setActivityFadingOut={setActivityFadingOut}
                  displayActivity={displayActivity}
                  setDisplayActivity={setDisplayActivity}
                />
              </section>
            </Route>
            <Route path="/journal-page">
              <MainContent 
                animateIndicator={animateIndicator}
                authenticatedUser={authenticatedUser}
                contributePrompt={contributePrompt}
                setContributePrompt={setContributePrompt}
                contributeFadingOut={contributeFadingOut}
                setContributeFadingOut={setContributeFadingOut}
                count={count}
                setCount={setCount}
                countingStatus={countingStatus}
                setCountingStatus={setCountingStatus}
                displayActivity={displayActivity}
                setDisplayActivity={setDisplayActivity}
                currentPrompt={currentPrompt}
                promptFadingOut={promptFadingOut}
                promptIsLoading={promptIsLoading}
                sidebarActive={sidebarActive}
                userInput={userInput}
                setUserInput={setUserInput}
                userActivity={userActivity}
                setUserActivity={setUserActivity}
              />
            </Route>
            {
              authenticatedUser ?
                <Route path="/saved-entries">
                  <section className="loadingSection">
                    <LoadArticles 
                      authenticatedUser={authenticatedUser}
                      setUserInput={setUserInput}
                    />
                  </section>
                </Route> :
                null
            }
            {
              authenticatedUser ?
                <Route path="/suggested-music">
                  <section className="musicSection">
                    <FindMusic 
                      accessToken={accessToken}
                      setAccessToken={setAccessToken}
                      userVerified={userVerified}
                      setUserVerified={setUserVerified}
                    />
                  </section>
                </Route> :
                null
            }
            {
              !authenticatedUser ?
                <Route path="/authenticate-user">
                  <section className="authenticationSection">
                    <UserAuthentication 
                      authenticatedUser={authenticatedUser}
                      setAuthenticatedUser={setAuthenticatedUser}
                      setDisplayActivity={setDisplayActivity}
                    />
                  </section>
                </Route> :
                null
            }
            {
              !authenticatedUser ?
                <Route path="/register-account">
                  <section className="registrationSection">
                    <UserRegistration 
                      setAuthenticatedUser={setAuthenticatedUser}
                    />
                  </section>
                </Route> :
                null
            }
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
          <UserNotifications 
            displayActivity={displayActivity}
            userActivity={userActivity}
            activityFadingOut={activityFadingOut}
          />
        </div>
      </footer>
    </Router>
  );
}

export default App;