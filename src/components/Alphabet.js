import  React, {Component} from 'react';

import alphabets from './alphabets.json';
import './alphabet.css';

export default class Alphabet extends Component {

	constructor(props) {
		super(props);
		this.state = {
			alphabets,
			currentPosition:0
		};
	}

	render() {
		return(
			<div className="game">
				<div className="option">
					<div className="fields">
						<div className="field-block">
							{this.state.alphabets[this.state.currentPosition].letter}
						</div>
					</div>
					<div className="buttons">
						<a className="button prev">Previous</a>
						<a className="button sound">Play Sound Again</a>
						<a className="button next">Next</a>
					</div>
					<div className="fields">
						<div className="field-block">
							<div className="left-field">
								<div className="placeholder-span hide">Click next to see the image</div>
								<img src={this.state.alphabets[this.state.currentPosition].image} 
									 alt="picture corresponding to letter"
									 className="letter-image"/>
							</div>
							<div className="rigth-field">
								<div className="placeholder-span hide">Click next to see the text</div>
								<div className="word">{this.state.alphabets[this.state.currentPosition].word.toUpperCase()}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}