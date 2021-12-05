import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImgLinkForm from './components/image_l_f/ImgLinkForm';
import Rank from './components/rank/Rank';
import FaceRecognition from './components/face_recognition/FaceRecognition';
import Particles from "react-tsparticles";
import './App.css';
      
class App extends Component {
	render() {
		return (
			<div className="App">
				<Particles className='particles' />
				<Navigation />
				<Logo />
				<Rank />
				<ImgLinkForm />
				<FaceRecognition />
			</div>
		);
	}
}

export default App;
