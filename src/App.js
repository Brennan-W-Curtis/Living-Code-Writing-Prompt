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

const App = () => {
  // Store all state values for the application in the following variables.
  const [ count, setCount ] = useState(0); // Stores the total amount of time set by the user in seconds.
  const [ countingStatus, setCountingStatus] = useState(null); // Determines whether the timer is counting down and which buttons are rendered.
  const [ storedPrompts, setStoredPrompts ] = useState([]); // Stores an array of string values that it receives from the realtime database that includes all of the submitted prompts by users.
  const [ currentPrompt, setCurrentPrompt ] = useState(""); // Stores a randomly selected prompt from the storedPrompts state variable.
  const [ promptIsLoading, setPromptIsLoading ] = useState(true); // Determines whether a loading indicator is displayed to the user.
  const [ authenticatedUser, setAuthenticatedUser ] = useState({}); // Stores an object with all of the relevant data of the user currently signed in.
  const [ accessToken, setAccessToken ] = useState(""); // Stores the access token return after authenticating the user.
  const [ userVerified, setUserVerified ] = useState(false); // Reflects whether the user has signed into the spotify api.
  const [ userInput, setUserInput ] = useState(""); // Stores the input by the user as it changes within the textarea element.
  const [ savingArticle, setSavingArticle ] = useState(false); // Indicates whether a user is currently saving their article.
  const [ userActivity, setUserActivity ] = useState("Success!"); // Stores a message for the user based on recent interaction events.
  const [ displayActivity, setDisplayActivity ] = useState(null); // Determines whether the notification window is displayed for the user with either a positive or negative indicator.
  const [ activityFadingOut, setActivityFadingOut ] = useState(false); // Determines whether the notification window is either fading in our fading out.
  const [ toggleMode, setToggleMode ] = useState(false); // Determines whether the page's theme is either light or dark.

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

  // Conditional statements that determine what notification is communicated to the user after an event.
  useEffect(() => {

    const animateNotifications = () => {
      setTimeout(() => setUserActivity(""), 4500);
      setTimeout(() => setActivityFadingOut(true), 4000);
      setTimeout(() => setDisplayActivity(null), 4500);
      setTimeout(() => setActivityFadingOut(false), 4500);
    }
    
    // Notifies the user whether they have successfully authenticated their identity. 
    if (authenticatedUser && displayActivity) {
      setUserActivity("Success, you're now signed in!")
      animateNotifications();
    } 

    // Notifies the user whether they have successfully saved their article.
    if (savingArticle && displayActivity) {
      setUserActivity("Success, your article is saved!");
      animateNotifications();
      setTimeout(() => setSavingArticle(false), 4500);
    }

  }, [authenticatedUser, displayActivity, savingArticle]);

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
              <section className="landingSection">
                <LandingPage />
              </section>
            </Route>
            <Route path="/writing-space">
              <MainContent 
                authenticatedUser={authenticatedUser}
                count={count}
                setCount={setCount}
                countingStatus={countingStatus}
                setCountingStatus={setCountingStatus}
                setDisplayActivity={setDisplayActivity}
                currentPrompt={currentPrompt}
                storedPrompts={storedPrompts}
                promptIsLoading={promptIsLoading}
                userInput={userInput}
                setUserInput={setUserInput}
                setSavingArticle={setSavingArticle}
                userActivity={userActivity}
                setUserActivity={setUserActivity}
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
                <FindMusic 
                  accessToken={accessToken}
                  setAccessToken={setAccessToken}
                  userVerified={userVerified}
                  setUserVerified={setUserVerified}
                />
              </section>
            </Route>
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