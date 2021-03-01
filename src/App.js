import './App.css';
import { Subject, interval } from "rxjs";
import { takeUntil } from 'rxjs/operators';
import { useEffect, useState } from 'react';

const App = () => {
  const [seconds, setSeconds] = useState(0);
  const [status, setStatus] = useState('stop');
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    const unsubscribe$ = new Subject();
    interval(1000)
      .pipe(takeUntil(unsubscribe$))
      .subscribe(() => {
        if (status === 'run') {
          setSeconds(seconds => seconds + 1000);
        }
      });

    return () => {
      unsubscribe$.next();
      unsubscribe$.complete();
    };
  }, [status]);

  const stopBtn = () => {
    setStatus('stop');
    setSeconds(0);
  }

  const waitBtn = () => {
    if (clicked) setStatus('wait');
    setClicked(true)
    setTimeout(() => {
      setClicked(false)
    }, 200);
  }

  const startBtn = () => setStatus('run');
  const resetBtn = () => setSeconds(0);

  return (
    <div className='App'>
      <p>{new Date(seconds).toISOString().slice(11, 19)}</p>
      <div>
        <button onClick={startBtn}>Start</button>
        <button onClick={stopBtn}>Stop</button>
        <button onClick={resetBtn}>Reset</button>
        <button onClick={waitBtn}>Wait</button>
      </div>
    </div>
  );
};

export default App;
