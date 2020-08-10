import React from 'react';
import {Panel, Header} from '@enact/sandstone/Panels';
import Spinner from '@enact/sandstone/Spinner';

class UseCaseSpinner extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		return (
			<Panel>
				<Header title="Use Case Spinner" />
				<Spinner />
			</Panel>
		);
	}
}

export default UseCaseSpinner;
