import React, { useState, useEffect } from 'react';

const App = () => {
  
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(1500);
  const [breakLength, setBreakLength] = useState(5);
  const [timerInitialized, setTimerInitialized] = useState("Timer Off")
  

  useEffect(() => {
    if (timerInitialized === "Timer On" && timeLeft > 0){
      setTimeout(() => {
      setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
    }, 1000);
    } else if (timeLeft === 0 && timerInitialized !== "Break Time") {
      setTimerInitialized(prevInit => prevInit = "Break Time");
      setTimeLeft(prevTimeLeft => prevTimeLeft = breakLength * 60);
    } else if (timerInitialized === "Break Time" && timeLeft > 0) {
      setTimeout(() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
      }, 1000);
    }
    return () => clearTimeout(timeLeft)
     
  });

  const handleSessionInc = () => {
    console.log(sessionLength)
    if (sessionLength < 60) {
     setSessionLength(prevCount => prevCount + 1)
    } else (setSessionLength(prevCount => prevCount))
  }

  const handleBreakInc = () => {
    console.log(breakLength)
    if (breakLength < 60) {
     setBreakLength(prevCount => prevCount + 1)
    } else (setBreakLength(prevCount => prevCount))
  }

  const handleSessionDec = () => {
    console.log(sessionLength)
    if (sessionLength > 1) {
     setSessionLength(prevCount => prevCount - 1)
    } else (setSessionLength(prevCount => prevCount))
  }

  const handleBreakDec = () => {
    console.log(breakLength)
    if (breakLength > 1) {
     setBreakLength(prevCount => prevCount - 1)
    } else (setBreakLength(prevCount => prevCount))
  }

  const TimerToggle = () => {
    if(timerInitialized === "Timer On"){
      setTimerInitialized("Timer Off")}
      else if (timerInitialized === "Timer Off"){
        setTimerInitialized("Timer On");
        setTimeLeft(prevTimeLeft => prevTimeLeft = sessionLength * 60)}
      }

  const ResetToggle = () => {
    
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(1500);
    setTimerInitialized("Timer Off");
    console.log(timeLeft)

  }
  return (
    <div className="App">
        <div className="app-container">
          <h1> 25 + 5 Clock </h1>
          <div className="adjust-container">
            <div className="inc-dec-adjust-container">
              <h2 id="break-label"> Break Length</h2>
              <div className="inc-dec">
                <button id="break-increment" onClick={handleBreakInc}>+</button>
                <p id="break-length">{breakLength}</p>
                <button id="break-decrement" onClick={handleBreakDec}>-</button>
              </div>
            </div>
            <div className="inc-dec-adjust-container">
              <h2 id="session-label"> Session Length</h2>
              <div className="inc-dec">
                <button id="session-increment" onClick={handleSessionInc}>+</button>
                <p id="session-length">{sessionLength}</p>
                <button id="session-decrement" onClick={handleSessionDec}>-</button>
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
                
                <button id="reset" onClick={ResetToggle}>
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}


// timeLeft > 0 ? Math.floor(timeLeft / 60) + ":" +  Math.floor(timeLeft % 60): "Timer Done"
export default App;
