import React from 'react';
import InputSample from './InputSample';

class MainPanel extends React.Component {
	constructor(props) {
		super(props);
		props.updateLocale('ar-SA');
	}

	render() {
		return (
			<InputSample />
		);
	}
}

export default MainPanel;