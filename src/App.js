import React, { useState, useEffect } from 'react';



const App = () => {
  
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(sessionLength*60);
  const [breakLength, setBreakLength] = useState(5);
  const [timerInitialized, setTimerInitialized] = useState("Timer Off")
  

  
  
  useEffect(() => {
  
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft-1);
    }, 1000);
  
    return () => clearTimeout(timer)
     
  }, [timerInitialized === "Timer On"]);

  const TimerToggle = () => {
    if(timerInitialized === "Timer On"){
      setTimerInitialized("Timer Off")}
      else if (timerInitialized === "Timer Off")
        {setTimerInitialized("Timer On")}
      }

  return (
    <div className="App">
        <div className="app-container">
          <h1> 25 + 5 Clock </h1>
          <div className="adjust-container">
            <div className="inc-dec-adjust-container">
              <h2 id="break-label"> Break Length</h2>
              <div className="inc-dec">
                <button id="break-increment" onClick={() => setBreakLength(breakLength + 1)}>+</button>
                <p id="break-length">{breakLength}</p>
                <button id="break-decrement" onClick={() => setBreakLength(breakLength - 1)}>-</button>
              </div>
            </div>
            <div className="inc-dec-adjust-container">
              <h2 id="session-label"> Session Length</h2>
              <div className="inc-dec">
                <button id="session-increment" onClick={() => setSessionLength(sessionLength + 1)}>+</button>
                <p id="session-length">{sessionLength}</p>
                <button id="session-decrement" onClick={() => setSessionLength(sessionLength - 1)}>-</button>
              </div>
            </div>
          </div>
          <div className="timer-container">
            <div>
              <h2 id="timer-label">{timerInitialized}</h2>
              <p id="time-left">{timeLeft > 0 ? Math.floor(timeLeft / 60) + ":" +  Math.floor(timeLeft % 60): "Timer Done"}</p>
              <div id="buttons">
                <button id="start_stop" onClick={TimerToggle}>
                  Start/Stop
                </button>
                
                <button id="reset">
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default App;
