import React, { useState, useEffect } from 'react';

const App = () => {
  
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(1500);
  const [breakLength, setBreakLength] = useState(5);
  const [timerInitialized, setTimerInitialized] = useState("Timer Off")
  
 
  useEffect(() => {
    let timer = null;
   

    if (timerInitialized === "Timer On" && timeLeft > 0){
      timer = setTimeout(() => {
      setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
    }, 1000);
    } else if (timeLeft === 0 && timerInitialized !== "Break Time") {
      clearTimeout(timer)
      setTimerInitialized("Break Time");
      setTimeLeft(prevTimeLeft => prevTimeLeft = breakLength * 60);
    } else if (timerInitialized === "Break Time" && timeLeft > 0) {
      setTimeout(() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
      }, 1000);
    }
    return () => clearTimeout(timer)
     
  }, [timerInitialized, timeLeft, breakLength ]);

 const secondsToTime = () => { 
   let seconds = Math.floor( timeLeft % 60)
   let minutes = Math.floor( timeLeft/60)
      if (minutes < 10) {
        minutes = "0" + minutes}

    if (seconds < 10) {
       seconds = "0" + seconds}
      return minutes + ":" + seconds
    }
 
  const handleSessionInc = () => {

    if (sessionLength < 60) {
     setSessionLength(prevCount => prevCount + 1)
    } else (setSessionLength(prevCount => prevCount))
  }

  const handleBreakInc = () => {

    if (breakLength < 60) {
     setBreakLength(prevCount => prevCount + 1)
    } else (setBreakLength(prevCount => prevCount))
  }

  const handleSessionDec = () => {

    if (sessionLength > 1) {
     setSessionLength(prevCount => prevCount - 1)
    } else (setSessionLength(prevCount => prevCount))
  }

  const handleBreakDec = () => {
    
    if (breakLength > 1) {
     setBreakLength(prevCount => prevCount - 1)
    } else (setBreakLength(prevCount => prevCount))
  }

  
  const TimerToggle = () => {
    if(timerInitialized === "Timer On" || timerInitialized === "Break Time"){
      setTimerInitialized("Timer Off")}
      else if (timerInitialized === "Timer Off"){
        setTimerInitialized("Timer On");
        setTimeLeft(sessionLength * 60)}
      }

  const ResetToggle = () => {
    
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(1500);
    setTimerInitialized("Timer Off");

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
              <div id="time-left">{secondsToTime()}</div>
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
