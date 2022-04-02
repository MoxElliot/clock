import React, { useState, useEffect } from 'react';


const accurateInterval = function (fn, time) {
  var cancel, nextAt, timeout, wrapper
  nextAt = new Date().getTime() + time
  timeout = null
  wrapper = function () {
    nextAt += time
    timeout = setTimeout(wrapper, nextAt - new Date().getTime())
    return fn()
  }
  cancel = function () {
    return clearTimeout(timeout)
  }
  timeout = setTimeout(wrapper, nextAt - new Date().getTime())
  return {
    cancel: cancel
  }
}

const App = () => {
  let sessionOverSound
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(1500);
  const [breakLength, setBreakLength] = useState(5);
  const [timerDisplay, setTimerDisplay] = useState("Timer Off")
//  const [timerActive, setTimerActive] = useState(false)
  const [timeInterval, setTimeInterval] = useState("")
  const [isBreak, setIsBreak] = useState(false)
  
 
 useEffect(() => {
 
    if (timeLeft < 1) {
      sessionOverSound.play()
      if (timeInterval) {
        timeInterval.cancel()
      }
      if (isBreak) {
        setTimeLeft(sessionLength * 60)
      } else {
        setTimeLeft(breakLength * 60)
      }
      startTime()
      setIsBreak((prevIsBreak) => !prevIsBreak)
      if (timerDisplay === "Timer On") {
        setTimerDisplay("Break Time")
      } else if (timerDisplay === "Break Time") {
        setTimerDisplay("Timer Off")
      }
    }
    if(timerDisplay === "Timer Off") {
      if (timeInterval) {
        timeInterval.cancel()
      }
    }
  }, [timeLeft, breakLength, isBreak, sessionLength, timeInterval, timerDisplay, sessionOverSound])

  const startTime = () => {
    setTimeInterval(
      accurateInterval(
        () => {
          setTimeLeft(prevTimeLeft => prevTimeLeft - 1)
        }, 1000)
    )
  }


  const setSeconds = () => { 
    let seconds = Math.floor( timeLeft % 60)
      if (seconds < 10) {
        seconds = "0" + seconds}
        return seconds
      }
  const setMinutes = () => { 
    let minutes = Math.floor( timeLeft / 60)
    if (minutes < 10) {
        minutes = "0" + minutes}
      return minutes
    }

  const handleSessionInc = () => {

    if (sessionLength < 60 && timerDisplay === "Timer Off") {
     setSessionLength(prevCount => prevCount + 1)
     setTimeLeft(prevCount => prevCount + 60)
    } else if (sessionLength < 60 && timerDisplay !== "Timer Off") {
      setSessionLength(prevCount => prevCount + 1)
    } else (setSessionLength(prevCount => prevCount))
  }

  const handleBreakInc = () => {

    if (breakLength < 60) {
     setBreakLength(prevCount => prevCount + 1)
    } else (setBreakLength(prevCount => prevCount))
  }

  const handleSessionDec = () => {

     if (sessionLength > 1 && timerDisplay === "Timer Off") {
     setSessionLength(prevCount => prevCount - 1)
     setTimeLeft(prevCount => prevCount - 60)
    } else if (sessionLength < 60 && timerDisplay !== "Timer Off") {
      setSessionLength(prevCount => prevCount - 1)
    } else (setSessionLength(prevCount => prevCount))
  }

  const handleBreakDec = () => {
    
    if (breakLength > 1) {
     setBreakLength(prevCount => prevCount - 1)
    } else (setBreakLength(prevCount => prevCount))
  }

  
  const TimerToggle = () => {
    if(timerDisplay === "Timer Off"){
      setTimerDisplay("Timer On")
      startTime()
      return
  } else if (timerDisplay === "Timer On" || timerDisplay === "Break Time"){
        setTimerDisplay("Timer Off");
        }
      }

  const ResetToggle = () => {
    
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(1500);
    setTimerDisplay("Timer Off");
    setIsBreak(false)
    setTimeInterval("")
    sessionOverSound.pause()
    sessionOverSound.currentTime = 0
    if (timeInterval) {
      timeInterval.cancel()
    }
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
              <h2 id="timer-label">{timerDisplay}</h2>
              <div id="time-left">{setMinutes(timeLeft)}:{setSeconds(timeLeft)}</div>
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
        <audio
          id="beep"
          preload="auto"
          ref={(audio) => {
            sessionOverSound = audio;
          }}
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
    </div>
  );
}


// timeLeft > 0 ? Math.floor(timeLeft / 60) + ":" +  Math.floor(timeLeft % 60): "Timer Done"
export default App;
