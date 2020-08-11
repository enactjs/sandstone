import {Header} from '@enact/sandstone/Panels';
import Spinner from '@enact/sandstone/Spinner';
import React from 'react';


class UseCaseSpinner extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		return (
			<>
				<Header title="Spinner" />
				<Spinner />
			</>
		);
	}
}

export default UseCaseSpinner;
