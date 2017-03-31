import React, {Component} from 'react';
import 'whatwg-fetch';
import Menu from './components/Menu';
import Panels from './components/Panels';

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			panelIndex: 0
		}
	}

	getBtnId = (e) => {
		if(e.target && e.target.nodeName === "BUTTON") {
			this.setState({
				panelIndex: Number(e.target.id)
			});
	  }
	}

	render() {
		return (
			<div className="container">
				<Menu getBtnId={this.getBtnId} />

				<Panels panelIndex={this.state.panelIndex} />
        
			</div>
		)
	}
}

export default Main;
