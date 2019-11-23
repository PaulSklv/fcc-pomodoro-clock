import React, { useState, useEffect, useRef } from 'react';
import Changer from './Changer';
import { play, pause } from './conditions';

const App = () => {
	const [breakLength, setBreakLength] = useState(5)
	const [sessionLength, setSessionLength] = useState(25)
	const [condition, setCondition] = useState(pause);
	const [undo, setUndo] = useState(false)
  const [sessionOn, setSession] = useState(true);
	const [currentTime, setCurrentTime] = useState(null);
  const audioRef = useRef();
	
  const timer = () => {
		setCurrentTime(currentTime - 1);
	}
	  
  useEffect(() => {
		if (currentTime !== 0 && condition === play) {
			const id = setInterval(timer, 1000);
			return () => clearInterval(id);
		} else if (condition === pause && !undo) {
        return;
		} else if (currentTime === 0 && sessionOn) {
        audioRef.current.play();
        let id = setTimeout(() => setSession(false), 1000);
        return () => clearTimeout(id);
		} else if (currentTime === 0 && !sessionOn) {
        audioRef.current.play();
        let id = setTimeout(() => setSession(true), 1000);
        return () => clearTimeout(id);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [condition, currentTime])

	useEffect(() => {
		if (condition === play && currentTime === null) {
			setCurrentTime(sessionLength * 60);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [condition])

	useEffect(() => {
		if (sessionOn && currentTime !== null) {
			  setCurrentTime(sessionLength * 60);
		} else if (!sessionOn && currentTime !== null) {
			  setCurrentTime(breakLength * 60);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sessionOn])
  const padZeros = number => {
		if (number < 10) {
      
			return number.toString().padStart(2, '0');
		} else {
      console.log(number);
			return number;
		}
	}

	return (
		<div className='container'>
			<div className='child'>
				<h2>Pomodoro Clock</h2>
				<div className='timer-container'>
					<Changer length={breakLength} 
							setLength={setBreakLength} condition={condition}>Break Length</Changer>
					<div className='session'>
						<span id="timer-label">{sessionOn ? 'Session' : 'Break'}</span>
						<p id="time-left" className='timer'>{currentTime !== null ? `${currentTime === 3600 ? currentTime / 60: padZeros(Math.floor((currentTime % (60 * 60)) / 60))}:${padZeros(Math.floor((currentTime % 60)))}` : sessionLength + ':00'}</p>
      			<audio id='beep' ref={audioRef} hidden><source src='https://zvukipro.com/uploads/files/2018-11/1541268424_z_uki-dlya-_ideo-z_uk-gonga.mp3' type='audio/mpeg'/></audio>
		      </div>
					<Changer length={sessionLength} 
							setLength={setSessionLength} condition={condition}>Session Length</Changer>
				</div>
				<div className='play-pause-undo'>
					<i className={`${condition} icon`} onClick={() => {
						if(condition === pause) {
							setCondition(play);
							setUndo(false);
						} else {
							setCondition(pause);
						}
					}}></i>
					<i className="undo alternate icon" onClick={() => {
						audioRef.current.pause();
			      audioRef.current.currentTime = 0;
						setUndo(true)
						setSessionLength(25);
						setBreakLength(5);
						setCondition(pause);
						setSession(true);
            setCurrentTime(null);
					}}></i>
				</div>
			</div>	
		</div>	
	);
}

export default App;