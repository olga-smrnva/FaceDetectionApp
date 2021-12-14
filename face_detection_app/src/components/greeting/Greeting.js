import React from 'react';

const Greeting = ({ name }) => {
	return (
		<div>
			<div className='white f3'>
				{`Hello, ${name}! Nice to see you again`}
			</div>
		</div>
	);
}

export default Greeting;