import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImgLinkForm from './components/image_l_f/ImgLinkForm';
import Rank from './components/rank/Rank';
import FaceRecognition from './components/face_recognition/FaceRecognition';
import Particles from "react-tsparticles";
import ParticlesConfig from './components/particles/ParticlesConfig';
import Clarifai from 'clarifai';
import './App.css';

const app = new Clarifai.App({
	apiKey: 'b5dc65dc60c0414daed11280d9e3f2bd'
})

    
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
