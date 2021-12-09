import React from 'react';

const FaceRecognition = () => {
    return (
        <div className='center ma'>
            <div className='absolute ma2'>
                <img src={imageUrl} id='inputimage' alt='' width='500px' height='auto' />
            </div>
        </div>
    );
};

export default FaceRecognition;