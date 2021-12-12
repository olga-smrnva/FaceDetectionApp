import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImgLinkForm from './components/image_l_f/ImgLinkForm';
import Rank from './components/rank/Rank';
import FaceRecognition from './components/face_recognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
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
		input: '',
		imageUrl: '',
		box: {},
		route: 'signin',
		isSignedIn: false
	  };
	}

	calculateFaceLocation = (data) => {
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById('inputimage');
		const width = Number(image.width);
		const height = Number(image.height);
		return {
		  leftCol: clarifaiFace.left_col * width,
		  topRow: clarifaiFace.top_row * height,
		  rightCol: width - (clarifaiFace.right_col * width),
		  bottomRow: height - (clarifaiFace.bottom_row * height)
		};
	  };

	displayFaceBox = (box) => {
		this.setState({box: box});
	};

	onKeyPress = (event) => {
		if (event.key === 'Enter') {
			this.onButtonSubmit();
		};
	};

	onInputChange = (event) => {
		this.setState({ input: event.target.value });
	};
	
	onButtonSubmit = () => {
		this.setState({ imageUrl: this.state.input });
		console.log(this.state.imageUrl);
		app.models
			.predict(
				Clarifai.FACE_DETECT_MODEL, 
				this.state.input)
			.then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
			.catch(err => console.log(err))
	};

	onRouteChange = (route) => {
		if (route === 'signout') {
			this.setState({isSignedIn: false})
		} else if (route === 'home'){
			this.setState({isSignedIn: true})
		};
		this.setState({route: route});
	};

	render() {
		const { isSignedIn, imageUrl, route, box } = this.state;
		return (
			<div className="App">
				<Particles className='particles'
          			params={ParticlesConfig}
        		/>
				<Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
				{ route === 'home' 
					? <div> 
						<Logo />
						<Rank />
						<ImgLinkForm 
							onInputChange={this.onInputChange} 
							onKeyPress={this.onKeyPress}
							onButtonSubmit={this.onButtonSubmit}
						/>
						<FaceRecognition box={box} imageUrl={imageUrl}/>
					</div>
					: (
						 route === 'signin'
						? <SignIn onRouteChange={this.onRouteChange}/>
						: <Register onRouteChange={this.onRouteChange}/>
					)
				}
			</div>
		);
	}
}

export default App;
