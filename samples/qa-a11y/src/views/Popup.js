import Button from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';
import Item from '@enact/sandstone/Item';
import Popup from '@enact/sandstone/Popup';
import Scroller from '@enact/sandstone/Scroller';
import ri from '@enact/ui/resolution';
import React from 'react';

import Section from '../components/Section';
import useArrayState from '../components/useArrayState';

const PopupView = () => {
	const [open, handleOpen] = useArrayState(5);

	return (
		<>
			<Section title="Default">
				<Button alt="Normal" onClick={handleOpen(0, true)}>Open 0</Button>
				<Button alt="Long Text" onClick={handleOpen(1, true)}>Open 1</Button>
				<Button alt="With Scroller" onClick={handleOpen(2, true)}>Open 2</Button>
				<Button alt="With Buttons" onClick={handleOpen(3, true)}>Open 3</Button>
			</Section>

			<Section title="Aria-labelled">
				<Button alt="Aria-lablled with Buttons" onClick={handleOpen(4, true)}>Open 4</Button>
			</Section>

			<Popup
				onClose={handleOpen(0, false)}
				open={open[0]}
			>
				<span>Content</span>
			</Popup>

			<Popup
				onClose={handleOpen(1, false)}
				open={open[1]}
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
				onClose={handleOpen(2, false)}
				open={open[2]}
			>
				<Button>Button Outside Scroller</Button>
				<Scroller style={{height: ri.scaleToRem(170), marginTop: ri.scaleToRem(10)}}>
					<Item>Item 0</Item>
					<Item>Item 1</Item>
					<Item>Item 2</Item>
					<Item>Item 3</Item>
					<Item>Item 4</Item>
					<Item>Item 5</Item>
					<Item>Item 6</Item>
					<Item>Item 7</Item>
					<Item>Item 8</Item>
					<Item>Item 9</Item>
				</Scroller>
			</Popup>

			<Popup
				onClose={handleOpen(3, false)}
				open={open[3]}
				role="dialog"
			>
				<Heading showLine>Heading</Heading>
				<Button>Text 0</Button>
				<Button>Text 1</Button>
			</Popup>

			<Popup
				aria-label="This is a Label."
				onClose={handleOpen(4, false)}
				open={open[4]}
			>
				<Heading showLine>Heading</Heading>
				<Button>Text 0</Button>
				<Button>Text 1</Button>
			</Popup>
		</>
	);
};

export default PopupView;
