import Alert, {AlertImage} from '@enact/sandstone/Alert';
import Button from '@enact/sandstone/Button';
import {Row} from '@enact/ui/Layout';
import React from 'react';

import Section from '../components/Section';

import css from '../App/App.module.less';

class AlertView extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			open1: false,
			open2: false,
			open3: false,
			open4: false,
			open5: false,
			open6: false,
			open7: false,
			open8: false
		};

		this.handleOpen1 = this.handleOpen(1);
		this.handleOpen2 = this.handleOpen(2);
		this.handleOpen3 = this.handleOpen(3);
		this.handleOpen4 = this.handleOpen(4);
		this.handleOpen5 = this.handleOpen(5);
		this.handleOpen6 = this.handleOpen(6);
		this.handleOpen7 = this.handleOpen(7);
		this.handleOpen8 = this.handleOpen(8);

		this.handleClose1 = this.handleClose(1);
		this.handleClose2 = this.handleClose(2);
		this.handleClose3 = this.handleClose(3);
		this.handleClose4 = this.handleClose(4);
		this.handleClose5 = this.handleClose(5);
		this.handleClose6 = this.handleClose(6);
		this.handleClose7 = this.handleClose(7);
		this.handleClose8 = this.handleClose(8);
	}

	handleOpen = (expNum) => () => this.setState({['open' + expNum]: true})

	handleClose = (expNum) => () => this.setState({['open' + expNum]: false})

	render () {
		const {open1, open2, open3, open4, open5, open6, open7, open8} = this.state;

		return (
			<Row wrap>
				<Section className={css.marginTop} size="50%" title="Alert Fullscreen">
					<Button alt="Normal" onClick={this.handleOpen1}>Text</Button>
					<Button alt="With 3(max) Buttons" onClick={this.handleOpen2}>Text</Button>
					<Button alt="With Thumbnail" onClick={this.handleOpen3}>Text</Button>
					<Button alt="Without Title" onClick={this.handleOpen4}>Text</Button>
					<Button alt="Without Content" onClick={this.handleOpen5}>Text</Button>
				</Section>

				<Section className={css.marginTop} size="50%" title="Alert Overlay which has No title">
					<Button alt="Normal" onClick={this.handleOpen6}>Text</Button>
					<Button alt="With 3(max) Buttons" onClick={this.handleOpen7}>Text</Button>
					<Button alt="With Thumbnail" onClick={this.handleOpen8}>Text</Button>
				</Section>

				<Alert
					onClose={this.handleClose1}
					open={open1}
					title="Header Title"
				>
					<span>Body Text</span>
					<buttons>
						<Button onClick={this.handleClose1}>Text</Button>
					</buttons>
				</Alert>

				<Alert
					onClose={this.handleClose2}
					open={open2}
					title="Good morning"
				>
					<span>
						Not to worry, this message isn&apos;t going to be very long.
						It just has to be long enough to show what a long message looks like.
						That&apos;s all; have a nice day.
					</span>
					<buttons>
						<Button onClick={this.handleClose2}>First Button!</Button>
						<Button onClick={this.handleClose2}>Oh My Yes, Kitten</Button>
						<Button onClick={this.handleClose2}>Hide And Show</Button>
					</buttons>
				</Alert>

				<Alert
					onClose={this.handleClose3}
					open={open3}
					title="Header Title"
				>
					<image>
						<AlertImage src={'https://via.placeholder.com/250.png?text=image'} type="thumbnail" />
					</image>
					<span>Body Text</span>
					<buttons>
						<Button onClick={this.handleClose3}>Text</Button>
						<Button onClick={this.handleClose3}>Text</Button>
					</buttons>
				</Alert>

				<Alert
					onClose={this.handleClose4}
					open={open4}
				>
					<span>
						Not to worry, this message isn&apos;t going to be very long.
						It just has to be long enough to show what a long message looks like.
						That&apos;s all; have a nice day.
					</span>
					<buttons>
						<Button onClick={this.handleClose4}>First Button!</Button>
						<Button onClick={this.handleClose4}>Oh My Yes, Kitten</Button>
						<Button onClick={this.handleClose4}>Hide And Show</Button>
					</buttons>
				</Alert>

				<Alert
					onClose={this.handleClose5}
					open={open5}
					title="Good afternoon"
				>
					<buttons>
						<Button onClick={this.handleClose5}>First Button!</Button>
						<Button onClick={this.handleClose5}>Oh My Yes, Kitten</Button>
					</buttons>
				</Alert>

				<Alert
					onClose={this.handleClose6}
					open={open6}
					type="overlay"
				>
					<span>
						Not to worry, this message isn&apos;t going to be very long.
						It just has to be long enough to show what a long message looks like.
						That&apos;s all; have a nice day.
					</span>
					<buttons>
						<Button onClick={this.handleClose6}>First Button!</Button>
						<Button onClick={this.handleClose6}>Oh My Yes, Kitten</Button>
					</buttons>
				</Alert>

				<Alert
					onClose={this.handleClose7}
					open={open7}
					type="overlay"
				>
					<span>
						Not to worry, this message isn&apos;t going to be very long.
						It just has to be long enough to show what a long message looks like.
						That&apos;s all; have a nice day.
					</span>
					<buttons>
						<Button onClick={this.handleClose7}>First Button!</Button>
						<Button onClick={this.handleClose7}>Oh My Yes, Kitten</Button>
						<Button onClick={this.handleClose7}>Hide And Show</Button>
					</buttons>
				</Alert>

				<Alert
					onClose={this.handleClose8}
					open={open8}
					type="overlay"
				>
					<image>
						<AlertImage src={'https://via.placeholder.com/250.png?text=image'} type="thumbnail" />
					</image>
					<span>
						Not to worry, this message isn&apos;t going to be very long.
						It just has to be long enough to show what a long message looks like.
						That&apos;s all; have a nice day.
					</span>
					<buttons>
						<Button onClick={this.handleClose8}>First Button!</Button>
						<Button onClick={this.handleClose8}>Oh My Yes, Kitten</Button>
					</buttons>
				</Alert>
			</Row>
		);
	}
}

export default AlertView;
