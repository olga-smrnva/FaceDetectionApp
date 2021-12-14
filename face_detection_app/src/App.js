import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImgLinkForm from './components/image_link_form/ImgLinkForm';
import Greeting from './components/greeting/Greeting';
import FaceRecognition from './components/face_recognition/FaceRecognition';
import SignIn from './components/sign_in/SignIn';
import Register from './components/register/Register';
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
			isSignedIn: false,
			user: {
				id: '',
				name: '',
				email: '',
				joined: ''
			}
		};
	};

	loadUser = (data) => {
		this.setState({user: {
			id: data.id,
			name: data.name,
			email: data.email,
			joined: data.joined
		}})
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
			this.onPictureSubmit();
		};
	};

	onInputChange = (event) => {
		this.setState({ input: event.target.value });
	};
	
	onPictureSubmit = () => {
		this.setState({ imageUrl: this.state.input });
		app.models
			.predict(
				Clarifai.FACE_DETECT_MODEL, 
				this.state.input)
			.then(response => {
				console.log('hi', response)
				if (response) {
					fetch('http://localhost:3000/image', {
						method: 'put',
						headers: {'Content-Type': 'application/json'},
						body: JSON.stringify({
							id: this.state.user.id
						})
					})
				}
			this.displayFaceBox(this.calculateFaceLocation(response))
			})
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
				{route === 'home' 
					? <div> 
						<Logo />
						<Greeting name={this.state.user.name} />
						<ImgLinkForm 
							onInputChange={this.onInputChange} 
							onKeyPress={this.onKeyPress}
							onPictureSubmit={this.onPictureSubmit}
						/>
						<FaceRecognition box={box} imageUrl={imageUrl}/>
					</div>
					: (
						 route === 'signin'
						? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
						: <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
					)
				}
			</div>
		);
	}
}

export default App;
