import Button from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';
import Item from '@enact/sandstone/Item';
import Popup from '@enact/sandstone/Popup';
import Scroller from '@enact/sandstone/Scroller';
import ri from '@enact/ui/resolution';
import React from 'react';

class PopupView extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			open1: false,
			open2: false,
			open3: false,
			open4: false,
			open5: false
		};

		this.handleOpen1 = this.handleOpen(1);
		this.handleOpen2 = this.handleOpen(2);
		this.handleOpen3 = this.handleOpen(3);
		this.handleOpen4 = this.handleOpen(4);
		this.handleOpen5 = this.handleOpen(5);

		this.handleClose1 = this.handleClose(1);
		this.handleClose2 = this.handleClose(2);
		this.handleClose3 = this.handleClose(3);
		this.handleClose4 = this.handleClose(4);
		this.handleClose5 = this.handleClose(5);
	}

	handleOpen = (expNum) => () => this.setState({['open' + expNum]: true});

	handleClose = (expNum) => () => this.setState({['open' + expNum]: false});

	render () {
		const {open1, open2, open3, open4, open5} = this.state;

		return (
			<>
				<Button onClick={this.handleOpen1}>Basic Popup</Button>
				<Button onClick={this.handleOpen2}>Long Popup</Button>
				<Button onClick={this.handleOpen3}>Scroller Popup</Button>
				<Button onClick={this.handleOpen4}>Button In Popup</Button>
				<Button onClick={this.handleOpen5}>Customizable aria-label popup</Button>

				<Popup
					open={open1}
					onClose={this.handleClose1}
				>
					<span>Popup...</span>
				</Popup>

				<Popup
					open={open2}
					onClose={this.handleClose2}
				>
					<span>
						Enact is a framework designed to be performant, customizable and well structured.
						<br />
						The goal in creating Enact was to build upon the experience gained in producing the Enyo JavaScript framework and to incorporate the latest advances in JavaScript and Web engine technology.
						<br />
						Enact is designed to be used by both novice and expert developers.
						<br />
						Why Enact?
						<br />
						Ease of Use
						<br />
						Enact builds atop the excellent React library, and provides a full framework to the developer.
						<br />
						The recent boom of web technologies and related tools has led to a plethora of options available.
						<br />
						In fact, getting started might be the most difficult part of building a modern web application.
						<br />
						Enact allows developers to avoid this pain by providing an opinionated collection of libraries and tools that have been thoroughly vetted to work well together.
					</span>
				</Popup>

				<Popup
					open={open3}
					onClose={this.handleClose3}
				>
					<Button>Button Outside Scroller</Button>
					<Scroller style={{height: ri.scale(170) + 'px', marginTop: ri.scale(10) + 'px'}}>
						<Item>Test Item 1</Item>
						<Item>Test Item 2</Item>
						<Item>Test Item 3</Item>
						<Item>Test Item 4</Item>
						<Item>Test Item 5</Item>
						<Item>Test Item 6</Item>
						<Item>Test Item 7</Item>
						<Item>Test Item 8</Item>
						<Item>Test Item 9</Item>
						<Item>Test Item 10</Item>
					</Scroller>
				</Popup>

				<Popup
					open={open4}
					onClose={this.handleClose4}
				>
					<Heading showLine>Buttons In Popup Example</Heading>
					<Button>Hello</Button>
					<Button>Goodbye</Button>
				</Popup>

				<Popup
					aria-label="This is a popup"
					open={open5}
					onClose={this.handleClose5}
				>
					<Heading showLine>Buttons In Popup Example</Heading>
					<Button>Hello</Button>
					<Button>Goodbye</Button>
				</Popup>
			</>
		);
	}
}

export default PopupView;
