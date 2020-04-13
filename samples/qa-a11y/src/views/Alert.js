import Button from '@enact/sandstone/Button';
import Alert from '@enact/sandstone/Alert';
import React from 'react';

class AlertView extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			open1: false,
			open2: false
		};

		this.handleOpen1 = this.handleOpen(1);
		this.handleOpen2 = this.handleOpen(2);

		this.handleClose1 = this.handleClose(1);
		this.handleClose2 = this.handleClose(2);
	}

	handleOpen = (expNum) => () => this.setState({['open' + expNum]: true})

	handleClose = (expNum) => () => this.setState({['open' + expNum]: false})

	render () {
		const {open1, open2} = this.state;

		return (
			<div>
				<Button size="small" onClick={this.handleOpen1}>Small Alert</Button>
				<Button size="small" onClick={this.handleOpen2}>Large Alert</Button>

				<Alert
					open={open1}
					onClose={this.handleClose1}
				>
					<span>Hello</span>
					<buttons>
						<Button size="small" onClick={this.handleClose1}>Howdy</Button>
					</buttons>
				</Alert>

				<Alert
					open={open2}
					onClose={this.handleClose2}
				>
					<span>{`Not to worry, this message isn't going to be very long.
					It just has to be long enough to show what a long message looks like.
					That's all; have a nice day.`}</span>
					<buttons>
						<Button size="small" onClick={this.handleClose2}>First Button!</Button>
						<Button size="small" onClick={this.handleClose2}>Oh My Yes, Kitten</Button>
						<Button size="small" onClick={this.handleClose2}>Hide And Show</Button>
						<Button size="small" onClick={this.handleClose2}>Close</Button>
					</buttons>
				</Alert>
			</div>
		);
	}
}

export default AlertView;
