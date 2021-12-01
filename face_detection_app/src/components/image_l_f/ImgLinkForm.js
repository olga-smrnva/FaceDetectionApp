import React from 'react';
import './ImgLinkForm.css';

const ImgLinkForm = () => {
	return (
		<div>
			<p className='f3'>
				{'Hey, let\'s start detecting faces' }
			</p>
			<div className='center'>
				<div className='form center pa4 br3 shadow-5'>
					<input className='f4 pa2 w-70 center' typr='text'/>
					<button className='w-30 qrow f4 link ph3 pv2 bn dib white bg-light-purple'>Detect</button>
				</div>
			</div>
		</div>
	);
};

export default ImgLinkForm;