import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImgLinkForm from './components/image_l_f/ImgLinkForm';
import Rank from './components/rank/Rank';
import Particles from 'react-particles-js';
import './App.css';

const particleOptions = {
	particles: {
		number: {
			value: 70,
			density: {
				enable: true,
				value_area: 800
			}
		}
	}
};

class App extends Component {
	render() {
		return (
			<div className="App">
				<Particles className='particles'
					params={particleOptions}
				/>
				<Navigation />
				<Logo />
				<Rank />
				<ImgLinkForm />
				{/*
				<FaceRecognition />} */}
			</div>
		);
	}
}

export default App;
