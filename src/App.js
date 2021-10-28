import { useState } from 'react';
import IdleTimer from 'react-idle-timer';
import './styles/styles.css';
import ModeToggle from './components/ModeToggle';
import CountdownTimer from './components/CountdownTimer';
import WritingSpace from './components/WritingSpace';
// import writingPrompts from './writingPrompts';

const App = () => {
  // Store all state values for the application in the following variables.
  const [ countingStatus, setCountingStatus] = useState(null); // Stores a boolean value or null that determines whether the timer is counting down and which buttons are rendered.
  const [ displayWarning, setDisplayWarning ] = useState(false); // Stores a boolean value that determines whether a warning displays after 15 seconds of inactivity.

  return (
    <>
      <header>
        <section>
          <ModeToggle />
        </section>
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
            <WritingSpace 
              countingStatus={countingStatus}
              setDisplayWarning={setDisplayWarning}
            />
          </section>
        </div>
      </main>
      <footer>
      </footer>
    </>
  );
}

export default App;
