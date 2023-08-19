import React, { useEffect, useRef } from "react";

function Timer({ isTimerRunning, tenzies, seconds, setSeconds, saveTimes, timesItTook }) {
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isTimerRunning && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [isTimerRunning, setSeconds]);

  useEffect(() => {
    if (tenzies) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      
    }
  }, [tenzies, seconds, saveTimes]);

  useEffect(() => {
    if (tenzies) {
      saveTimes(seconds);
    }
  }, [tenzies])

  const minTimeRecord = timesItTook.length > 0 ? Math.min(...timesItTook.map((time) => time.record)) : null;

  return (
    <div className="mt-[70px] font-victor">
      <h1>Tiempo: {seconds} segundos.</h1>
      {tenzies ? (
        <h1>
          Tu mejor tiempo fue {minTimeRecord} segundos.
        </h1>
      ) : (
        ""
      )}
    </div>
  );
}

export default Timer;
