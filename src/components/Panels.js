import React, {Component} from 'react';
import SnippetsComponent from './SnippetsComponent';
import GroupsComponent from './GroupsComponent';

class Panels extends Component {

	render() {
		const panels = [
			<GroupsComponent />,
			<SnippetsComponent />
		];
		const correctPanel = panels[this.props.panelIndex];
		return (
			<div className="panel-box">
			{correctPanel}
			</div>
		);
	}
}

export default Panels;
