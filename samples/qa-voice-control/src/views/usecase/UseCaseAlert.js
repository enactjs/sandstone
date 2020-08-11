import Alert from '@enact/sandstone/Alert';
import Button from '@enact/sandstone/Button';
import {Header} from '@enact/sandstone/Panels';
import React from 'react';


class UseCaseAlert extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			open: false
		};
	}

	handleOpen = () => {
		this.setState({open: true});
	};

	render () {
		return (
			<>
				<Header title="Alert" />
				<Button onClick={this.handleOpen}>open</Button>
				<Alert open={this.state.open}>
					<Button>hello</Button>
					<Button>world</Button>
				</Alert>
			</>
		);
	}
}

export default UseCaseAlert;
