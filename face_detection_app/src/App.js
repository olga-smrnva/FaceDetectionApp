import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImgLinkForm from './components/image_l_f/ImgLinkForm';
import Rank from './components/rank/Rank';
import FaceRecognition from './components/face_recognition/FaceRecognition';
import Particles from "react-tsparticles";
import ParticlesConfig from './components/particles/ParticlesConfig';
import './App.css';

const raw = JSON.stringify({
	"user_app_id": {
			"user_id": "6wnn6umeuz57",
			"app_id": "9c5180a13ef1415199b0b8f25b3c672d"
	  },
	"inputs": [
		{
			"data": {
				"image": {
					"url": "https://samples.clarifai.com/metro-north.jpg"
				}
			}
		}
	]
});
  
const requestOptions = {
	method: 'POST',
	headers: {
		'Accept': 'application/json',
		'Authorization': 'Key b5dc65dc60c0414daed11280d9e3f2bd'
	},
	body: raw
};
    
class App extends Component {
	constructor() {
		super();
		this.state = {
			input: '',
		};
	};

	onInputChange = (event) => {
		console.log(event.target.value);
	};

	onButtonSubmit = () => {
		console.log('click');
		fetch("https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/versions/{MODEL_VERSION_ID}/outputs", requestOptions)
			.then(response => response.text())
			.then(result => console.log(JSON.parse(result, null, 2).outputs[0].data))
			.catch(error => console.log('error', error));
};

	render() {
		return (
			<div className="App">
				<Particles className='particles'
          			params={ParticlesConfig}
        		/>
				<Navigation />
				<Logo />
				<Rank />
				<ImgLinkForm 
					onInputChange={this.onInputChange} 
					onButtonSubmit={this.onButtonSubmit}
				/>
				<FaceRecognition />
			</div>
		);
	}
}

export default App;
