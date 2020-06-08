/* eslint-disable react/jsx-no-bind */
import Button from '@enact/sandstone/Button';
import Item from '@enact/sandstone/Item';
import Scroller from '@enact/sandstone/Scroller';
import {FixedPopupPanels, Panel, Header} from '@enact/sandstone/FixedPopupPanels';
import ri from '@enact/ui/resolution';
import React from 'react';

const itemData = [];
for (let i = 0; i < 6; i++) {
	itemData.push(`Item ${i}`);
}

const FixedPopupPanelsView = () => {
	const [openPopupOfSettings, setOpenPopupOfSettings] = React.useState(false);
	const [openOfOptionDetail, setOpenOfOptionDetail] = React.useState(false);
	const [index, setIndex] = React.useState(0);
	const goNext = () => setIndex(1);
	const goPrevious = () => setIndex(0);

	return (
		<>
			<Button size="small" onClick={() => setOpenPopupOfSettings(true)}>Settings Popup</Button>
			<Button size="small" onClick={() => setOpenOfOptionDetail(true)}>Option detail Popup</Button>
			<FixedPopupPanels
				index={index}
				onClose={() => setOpenPopupOfSettings(false)}
				open={openPopupOfSettings}
			>
				<Panel>
					<Header>
						<title>Header Title</title>
						<subtitle>Subtitle</subtitle>
					</Header>
					<Scroller direction="vertical" style={{height: ri.scaleToRem(780)}}>
						{itemData.map((item, i) => <Item key={i} onClick={goNext}>{item}</Item>)}
					</Scroller>
					<Button onClick={goNext}>Button 1</Button>
					<Button onClick={goNext}>Button 2</Button>
				</Panel>
				<Panel>
					<Header>
						<title>Header Title</title>
						<subtitle>Subtitle</subtitle>
					</Header>
					<Scroller direction="vertical" style={{height: ri.scaleToRem(408)}}>
						{itemData.map((item, i) => <Item key={i} onClick={goPrevious}>{item}</Item>)}
					</Scroller>
					<Button onClick={goPrevious}>Button 1</Button>
					<Button onClick={goPrevious}>Button 2</Button>
				</Panel>
			</FixedPopupPanels>
			<FixedPopupPanels
				index={index}
				onClose={() => setOpenOfOptionDetail(false)}
				open={openOfOptionDetail}
			>
				<Panel>
					<Header>
						<title>Option</title>
					</Header>
					<Item onClick={goNext}>Example Item 1</Item>
					<Item onClick={goNext}>Example Item 2</Item>
					<Item onClick={goNext}>Example Item 3</Item>
				</Panel>
				<Panel>
					<Header>
						<title>Option</title>
					</Header>
					<Item onClick={goPrevious}>Example Item 1</Item>
					<Item onClick={goPrevious}>Example Item 2</Item>
					<Item onClick={goPrevious}>Example Item 3</Item>
				</Panel>
			</FixedPopupPanels>
		</>
	);
};

export default FixedPopupPanelsView;
