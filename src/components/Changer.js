import React from 'react';
import { pause } from './conditions';

const Changer = ({ length, children, setLength, condition }) => {
	return (
		<div className='changer-container'>
			{children}
			<div className='changer'>
			<i className="angle double up icon" onClick={() => {
					if (length < 60 && condition === pause){
						setLength(length + 1)
					}
				}}></i>
			<span>{length}</span>
			<i className="angle double down icon" onClick={() => {
					if (length > 1 && condition === pause){
						setLength(length - 1)
					}
				}}></i>
			</div>
		</div>
	);
}

export default Changer;
