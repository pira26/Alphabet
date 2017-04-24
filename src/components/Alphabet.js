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
			currentTick:0
		};
		this.prev = this.prev.bind(this);
		this.again = this.prev.bind(this);
		this.next = this.next.bind(this);
	}

	prev() {
		console.log('prev button clicked');
		this.setState({
			currentPosition: this.state.currentPosition -1
		});
	}

	again() {
		console.log('again button clicked');
	}

	next() {
		console.log('next button clicked');
		this.state.currentTick < 2 ? this.setState({currentTick: this.state.currentTick +1}) : this.setState({currentPosition: this.state.currentPosition +1, currentTick: 0});
	}

	render() {
		let showImg = this.state.currentTick !== 0 ? true : false;
		let showWord = this.state.currentTick === 2 ? true : false;
		console.log(showImg)  
		return(
			<div className="game">
				<div className="option">
					<div className="fields">
						<div className="field-block">{this.state.alphabets[this.state.currentPosition].letter}</div>
					</div>
					<div className="buttons">
						<a className="button prev"
						   onClick={this.prev}>Previous</a>
						<a className="button sound"
						   onClick={this.again}>Play Sound Again</a>
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