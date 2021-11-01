import { useState } from 'react';
import './styles/styles.css';
import CountdownTimer from './components/CountdownTimer';
import WritingSpace from './components/WritingSpace';
import InactivityWarning from './components/InactivityWarning';
import ModeToggle from './components/ModeToggle';
import CommunalPrompts from './components/CommunalPrompts';

const App = () => {
  // Store all state values for the application in the following variables.
  const [ countingStatus, setCountingStatus] = useState(null); // Stores a boolean value or null that determines whether the timer is counting down and which buttons are rendered.
  const [ toggleMode, setToggleMode ] = useState(false); // Stores a boolean value that determines whether the page's theme is either light or dark.

  return (
    <>
      <header className={toggleMode ? "eveningDisplay" : "morningDisplay"}>
        <div className="wrapper">
          <section>
            <ModeToggle 
              setToggleMode={setToggleMode}
              toggleMode={toggleMode}
            />
          </section>
        </div>
      </header>
      <main className={toggleMode ? "eveningDisplay" : "morningDisplay"}>
        <div className="wrapper">
          <section>
            <div>
              <CommunalPrompts />
              <CountdownTimer
                countingStatus={countingStatus}
                setCountingStatus={setCountingStatus}
              />
            </div>
          </section>
          <section>
            <div>
              <InactivityWarning 
                countingStatus={countingStatus}
              />
              <WritingSpace />
            </div>
          </section>
        </div>
      </main>
      <footer className={toggleMode ? "eveningDisplay" : "morningDisplay"}>
        <div className="wrapper">
        </div>
      </footer>
    </>
  );
}

export default App;