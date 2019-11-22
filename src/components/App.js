import React, { useState } from 'react';
import Timer from './Timer';
import Changer from './Changer';
import { play, pause } from './conditions';

const App = () => {
	const [breakLength, setBreakLength] = useState(5)
	const [sessionLength, setSessionLength] = useState(25)
	const [condition, setCondition] = useState(pause);
	const [undo, setUndo] = useState(false)
	
	return (
		<div className='container'>
			<div className='child'>
				<h2>Pomodoro Clock</h2>
				<div className='timer-container'>
					<Changer length={breakLength} 
							setLength={setBreakLength} condition={condition}>Break Length</Changer>
					<Timer sessionLength={sessionLength * 60} 
							breakLength={breakLength * 60} condition={condition} undo={undo} />
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
						setUndo(true)
						setSessionLength(25);
						setBreakLength(5);
						setCondition(pause);
					}}></i>
				</div>
			</div>	
		</div>	
	);
}

export default App;