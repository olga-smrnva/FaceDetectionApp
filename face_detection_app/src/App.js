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
	apiKey: "b5dc65dc60c0414daed11280d9e3f2bd",
});

    
class App extends Component {
	constructor() {
	  super();
	  this.state = {
		input: "",
		imageUrl: "",
	  };
	}

	onInputChange = (event) => {
		this.setState({ input: event.target.value });
	};
	
	onButtonSubmit = () => {
		this.setState({ imageUrl: this.state.input });
		console.log(this.state.imageUrl);
		app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
			function (response) {
				console.log(
					response.outputs[0].data.regions[0].region_info.bounding_box
				);
			},
			function (err) {
			console.log(err);
		  }
		);
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
				<FaceRecognition imageUrl={this.state.imageUrl}/>
			</div>
		);
	}
}

export default App;
