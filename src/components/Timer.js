import React, { useState, useEffect, useRef } from 'react';
import { play, pause } from './conditions';

const Timer = ({ sessionLength, breakLength, condition, undo }) => {
	const [sessionOn, setSession] = useState(true);
	const [currentTime, setCurrentTime] = useState(sessionLength);
	const audioRef = useRef();

	const timer = () => {
		setCurrentTime(currentTime - 1);
	}
	
	useEffect(() => {
		if (currentTime !== 0 && condition === play) {
			let id = setInterval(timer, 1000);
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
		} else if (undo) {
			audioRef.current.pause()
			audioRef.current.currentTime = 0;
			setCurrentTime(sessionLength);
		}
	}, [condition, currentTime, undo])

	useEffect(() => {
		if (condition === pause) {
			setCurrentTime(sessionLength);
		}
	}, [sessionLength])

	useEffect(() => {
		if (sessionOn) {
			setCurrentTime(sessionLength);
		} else if (!sessionOn) {
			setCurrentTime(breakLength);
		}
	}, [sessionOn])

	const padZeros = number => {
		if (number < 10) {
			return number.toString().padStart(2, '0');
		} else {
			return number;
		}
	}

	return (
		<div className='session'>
			<span>{sessionOn ? 'Session' : 'Break'}</span>
			<p className='timer'>{`${padZeros(Math.floor((currentTime % (60 * 60)) / 60))}
				:${padZeros(Math.floor((currentTime % 60)))}`}</p>
			<audio id='beep' ref={audioRef}><source src='https://zvukipro.com/uploads/files/2018-11/1541268424_z_uki-dlya-_ideo-z_uk-gonga.mp3' type='audio/mpeg'/></audio>
		</div>
	);
}

export default Timer;
