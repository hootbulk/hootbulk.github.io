import React from 'react';
import 'whatwg-fetch';

const Menu = ({ getBtnId }) => {
	return (
		<div
			className="btnGroup"
			onClick={getBtnId}
		>
			<button id="0">Groups</button>
			<button id="1">Snippets</button>
		</div>
	);
}

export default Menu;
