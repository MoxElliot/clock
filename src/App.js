
function App() {
  return (
    <div className="App">
        <div className="app-container">
          <h1> 25 + 5 Clock </h1>
          <div className="adjust-container">
            <div className="inc-dec-adjust-container">
              <h2> Break Length</h2>
              <div className="inc-dec">
                <button id="break-increment">+</button>
                <p>0</p>
                <button id="break-decrement">-</button>
              </div>
            </div>
            <div className="inc-dec-adjust-container">
              <h2> Session Length</h2>
              <div className="inc-dec">
                <button id="session-increment">+</button>
                <p>0</p>
                <button id="session-decrement">-</button>
              </div>
            </div>
          </div>
          <div className="timer-container">
            <div id="time-left">
              <h2>Session Time</h2>
              <p id="time">3:30</p>
              <button id="start_stop">
                Start/Stop
              </button>
              
              <button id="reset">
                Reset
              </button>
            </div>
          </div>
        </div>
    </div>
  );
}

export default App;
