import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImgLinkForm from './components/image_l_f/ImgLinkForm';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Navigation />
				<Logo />
				<ImgLinkForm />
				{/*
				<FaceRecognition />} */}
			</div>
		);
	}
}

export default App;
