import  React, {Component} from 'react';
import classNames from 'classnames';

import alphabets from './alphabets.json';
import './alphabet.css';

export default class Alphabet extends Component {

	constructor(props) {
		super(props);
		this.state = {
			alphabets,
			currentPosition:0,
			currentTick:0, 
			random: false,
			sound: true
		};

		this.prev = this.prev.bind(this);
		this.next = this.next.bind(this);
		this.playSound = this.playSound.bind(this);
		this.manualPlaySound = this.manualPlaySound.bind(this);
		this.switchRandom = this.switchRandom.bind(this);
		this.switchSound = this.switchSound.bind(this);
	}

	componentDidMount() {
		let letterSound = document.querySelector(`audio[data-key="letter sound"]`);
		let wordSound = document.querySelector(`audio[data-key="word sound"]`);
		console.log(letterSound, wordSound);

		this.state.currentPosition === 0 ? letterSound.currentTime = 0 & letterSound.play() : "";
		// if(this.state.currentPosition === 0) {
		// 	letterSound.currentTime = 0;
		// 	letterSound.play();
		// }
	}

	componentDidUpdate(prevProps, prevState) {
		this.playSound();
	}

	playSound() {
		let letterSound = document.querySelector(`audio[data-key="letter sound"]`);
		let wordSound = document.querySelector(`audio[data-key="word sound"]`);
		
		this.state.sound ? (this.state.currentTick === 0 ? letterSound.currentTime = 0 & letterSound.play() : wordSound.currentTime = 0 & wordSound.play()) : "";
		
		// if(this.state.sound) {
		// 	if (this.state.currentTick === 0) {
		// 	letterSound.currentTime = 0;
		// 	letterSound.play();
		// 	}
		// 	else { 
		// 		wordSound.currentTime = 0; 
		// 		wordSound.play();
		// 	}
		// }
	}


	manualPlaySound() {
		let letterSound = document.querySelector(`audio[data-key="letter sound"]`);
		let wordSound = document.querySelector(`audio[data-key="word sound"]`);
		
		this.state.currentTick === 0 ? letterSound.currentTime = 0 & letterSound.play() : wordSound.currentTime = 0 & wordSound.play();

	}

	randomNumber(min, max) {
		return Math.floor(Math.random() * (max-min + 1) + min);
	}

	next() {
		console.log('next button clicked');
		
	// 	this.state.random ? 
	// 		(this.state.currentTick < 2 ? this.setState({currentTick: this.state.currentTick+1}) : this.setState({currentPosition: , currentTick: 0})) : 
	// 	this.state.currentPosition === this.state.alphabets.length-1 ? 
	// 		(this.state.currentTick < 2 ? this.setState({currentTick: this.state.currentTick+1}) : this.setState({currentPosition:0, currentTick:0})) :
	// 	this.state.currentTick < 2 ? this.setState({currentTick: this.state.currentTick+1}) : this.setState({currentPosition: this.state.currentPosition+1, currentTick: 0});
	// 	
		if(this.state.random) {
			if(this.state.currentTick < 2) {
				this.setState({currentTick: this.state.currentTick+1});
			}
			else {
				this.setState({currentPosition: this.randomNumber(0,25), currentTick: 0});
			}
		}
		else {
			if(this.state.currentPosition === this.state.alphabets.length-1) {
				if(this.state.currentTick < 2) {
					this.setState({currentTick: this.state.currentTick+1});
				}
				else {
					this.setState({currentPosition:0, currentTick:0});
				}
			}
			else {
				if(this.state.currentTick < 2) {
					this.setState({currentTick: this.state.currentTick+1});
				}
				else {
					this.setState({currentPosition: this.state.currentPosition+1, currentTick: 0});
				}
			}
		}
	}

	prev() {
		console.log('prev button clicked');
		this.state.currentPosition > 0 ? this.setState({currentPosition: this.state.currentPosition-1}) : this.setState({currentPosition: this.state.alphabets.length-1});
	}


	switchRandom() {
		this.setState({random: !this.state.random});
		this.next();
	}

	switchSound() {
		this.setState({sound: !this.state.sound});
	}


	render() {
		let showImg = this.state.currentTick !== 0 ? true : false;
		let showWord = this.state.currentTick === 2 ? true : false;
		console.log(showImg)  
		return(
			<div className="game">
				<span className="random-label">Random letters: </span>
				<label className="switch">
					<input type="checkbox"
						   defaultValue="false"
						   checked={this.state.random}
						   onClick={this.switchRandom} />
					<div className="slider round"></div>
				</label>

				<span className="random-label">Sound: </span>
				<label className="switch">
					<input type="checkbox"
						   defaultValue="false"
						   checked={this.state.sound}
						   onClick={this.switchSound} />
					<div className="slider round"></div>
				</label>

				<div className="option">
					<div className="fields">
						<div className="field-block">{this.state.alphabets[this.state.currentPosition].letter}</div>
						<audio src={this.state.alphabets[this.state.currentPosition].letterSound}
							   data-key="letter sound" />
					</div>
					position: {this.state.currentPosition} <br/>
					tick: {this.state.currentTick}
					<div className="buttons">
						<a className="button prev"
						   onClick={this.prev}>Previous</a>
						<a className="button sound"
						   onClick={this.manualPlaySound}>Play Sound</a>
						<a className="button next"
						   onClick={this.next}>Next</a>
					</div>
					<div className="fields">
						<div className="field-block">
							<div className="left-field">
								<div className={classNames("placeholder-span", {hide: showImg})}>Click next to see the image</div>
								<img src={this.state.alphabets[this.state.currentPosition].image} 
									 alt="picture corresponding to letter"
									 className={classNames("letter-image", {hide: !showImg})}/>
								<audio src={this.state.alphabets[this.state.currentPosition].wordSound}
							   		   data-key="word sound" />
							</div>
							<div className="rigth-field">
								<div className={classNames("placeholder-span", {hide: showWord})}>Click next to see the text</div>
								<div className={classNames("word", {hide: !showWord})}>{this.state.alphabets[this.state.currentPosition].word.toUpperCase()}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}