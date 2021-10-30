import { useState } from 'react';
import './styles/styles.css';
import CountdownTimer from './components/CountdownTimer';
import WritingSpace from './components/WritingSpace';
import InactivityWarning from './components/InactivityWarning';
import ModeToggle from './components/ModeToggle';
// import writingPrompts from './writingPrompts';

const App = () => {
  // Store all state values for the application in the following variables.
  const [ countingStatus, setCountingStatus] = useState(null); // Stores a boolean value or null that determines whether the timer is counting down and which buttons are rendered.

  return (
    <>
      <header>
        <div className="wrapper">
          <section>
            <ModeToggle />
          </section>
        </div>
      </header>
      <main>
        <div className="wrapper">
          <section>
            <CountdownTimer
              countingStatus={countingStatus}
              setCountingStatus={setCountingStatus}
            />
          </section>
          <section>
            <InactivityWarning 
              countingStatus={countingStatus}
            />
            <WritingSpace />
          </section>
        </div>
      </main>
      <footer>
        <div className="wrapper">
          <p>Created by Living Code</p>
        </div>
      </footer>
    </>
  );
}

export default App;
