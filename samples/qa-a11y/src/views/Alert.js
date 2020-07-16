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
					<Button onClick={this.handleOpen1} alt="Normal">Button</Button>
					<Button onClick={this.handleOpen2} alt="With 3(max) Buttons">Button</Button>
					<Button onClick={this.handleOpen3} alt="With Thumbnail">Button</Button>
					<Button onClick={this.handleOpen4} alt="Without Title">Button</Button>
					<Button onClick={this.handleOpen5} alt="Without Content">Button</Button>
				</Section>

				<Section className={css.marginTop} size="50%" title="Alert Overlay which has no title">
					<Button onClick={this.handleOpen6} alt="Normal">Button</Button>
					<Button onClick={this.handleOpen7} alt="With 3(max) Buttons">Button</Button>
					<Button onClick={this.handleOpen8} alt="With Thumbnail">Button</Button>
				</Section>

				<Alert
					open={open1}
					onClose={this.handleClose1}
					title="this is title"
				>
					<span>this is content</span>
					<buttons>
						<Button onClick={this.handleClose1}>Howdy</Button>
					</buttons>
				</Alert>

				<Alert
					open={open2}
					onClose={this.handleClose2}
					title="good morning"
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
					open={open3}
					onClose={this.handleClose3}
					title="this is title"
				>
					<image>
						<AlertImage src={'https://via.placeholder.com/250.png?text=image'} type="thumbnail" />
					</image>
					<span>this is content</span>
					<buttons>
						<Button onClick={this.handleClose3}>Howdy</Button>
						<Button onClick={this.handleClose3}>Hide And Show</Button>
					</buttons>
				</Alert>

				<Alert
					open={open4}
					onClose={this.handleClose4}
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
					open={open5}
					onClose={this.handleClose5}
					title="good afternoon"
				>
					<buttons>
						<Button onClick={this.handleClose5}>First Button!</Button>
						<Button onClick={this.handleClose5}>Oh My Yes, Kitten</Button>
					</buttons>
				</Alert>

				<Alert
					open={open6}
					onClose={this.handleClose6}
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
					open={open7}
					onClose={this.handleClose7}
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
					open={open8}
					onClose={this.handleClose8}
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
