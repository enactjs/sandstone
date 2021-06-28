import Button from '@enact/sandstone/Button';
import Item from '@enact/sandstone/Item';
import Scroller from '@enact/sandstone/Scroller';
import {FixedPopupPanels, Panel, Header} from '@enact/sandstone/FixedPopupPanels';
import ri from '@enact/ui/resolution';

import Section from '../components/Section';
import useArrayState from '../components/useArrayState';

const itemData = [];
for (let i = 0; i < 6; i++) {
	itemData.push(`Item ${i}`);
}

const FixedPopupPanelsView = () => {
	const [open, handleOpen] = useArrayState(4);
	const [index, setIndex] = useArrayState(4, 0);

	return (
		<>
			<Section title="Default">
				<Button alt="With Title and Subtitle" onClick={handleOpen(0, true)}>Open 0</Button>
				<Button alt="With Title" onClick={handleOpen(1, true)}>Open 1</Button>
				<Button alt="With Title and Disabled Items" onClick={handleOpen(2, true)}>Open 2</Button>

				<FixedPopupPanels
					index={index[0]}
					onClose={handleOpen(0, false)}
					open={open[0]}
				>
					<Panel>
						<Header>
							<title>Header Title 0</title>
							<subtitle>Subtitle</subtitle>
						</Header>
						<Scroller direction="vertical" style={{height: ri.scaleToRem(780)}}>
							{itemData.map((item, i) => <Item key={i} onClick={setIndex(0, 1)}>{item}</Item>)}
						</Scroller>
						<Button onClick={setIndex(0, 1)}>Text 0</Button>
						<Button onClick={setIndex(0, 1)}>Text 1</Button>
					</Panel>
					<Panel>
						<Header>
							<title>Header Title 1</title>
							<subtitle>Subtitle</subtitle>
						</Header>
						<Scroller direction="vertical" style={{height: ri.scaleToRem(408)}}>
							{itemData.map((item, i) => <Item key={i} onClick={setIndex(0, 0)}>{item}</Item>)}
						</Scroller>
						<Button onClick={setIndex(0, 0)}>Text 0</Button>
						<Button onClick={setIndex(0, 0)}>Text 1</Button>
					</Panel>
				</FixedPopupPanels>

				<FixedPopupPanels
					index={index[1]}
					onClose={handleOpen(1, false)}
					open={open[1]}
				>
					<Panel>
						<Header>
							<title>Option 0</title>
						</Header>
						<Item onClick={setIndex(1, 1)}>Item 0</Item>
						<Item onClick={setIndex(1, 1)}>Item 1</Item>
						<Item onClick={setIndex(1, 1)}>Item 2</Item>
					</Panel>
					<Panel>
						<Header>
							<title>Option 1</title>
						</Header>
						<Item onClick={setIndex(1, 0)}>Item 0</Item>
						<Item onClick={setIndex(1, 0)}>Item 1</Item>
						<Item onClick={setIndex(1, 0)}>Item 2</Item>
					</Panel>
				</FixedPopupPanels>

				<FixedPopupPanels
					index={index[2]}
					onClose={handleOpen(2, false)}
					open={open[2]}
				>
					<Panel>
						<Header>
							<title>Option 2</title>
						</Header>
						<Item onClick={setIndex(2, 1)} disabled>Item 0</Item>
						<Item onClick={setIndex(2, 1)} disabled>Item 1</Item>
						<Item onClick={setIndex(2, 1)}>Item 2</Item>
					</Panel>
					<Panel>
						<Header>
							<title>Option 3</title>
						</Header>
						<Item onClick={setIndex(2, 0)} disabled>Item 0</Item>
						<Item onClick={setIndex(2, 0)} disabled>Item 1</Item>
						<Item onClick={setIndex(2, 0)}>Item 2</Item>
					</Panel>
				</FixedPopupPanels>
			</Section>

			<Section title="Variation">
				<Button alt={'Scroller with focusableScrollbar="byEnter"'} onClick={handleOpen(3, true)}>Open 3</Button>

				<FixedPopupPanels
					index={index[3]}
					onClose={handleOpen(3, false)}
					open={open[3]}
				>
					<Panel>
						<Header>
							<title>Header Title 0</title>
						</Header>
						<Scroller direction="vertical" focusableScrollbar="byEnter" style={{height: 100}}>
							<span>Text 0</span>
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
						</Scroller>
						<Item onClick={setIndex(3, 1)}>Text 1</Item>
					</Panel>
					<Panel>
						<Header>
							<title>Header Title 1</title>
						</Header>
						<Scroller aria-label="This is Scroller." direction="vertical" focusableScrollbar="byEnter" style={{height: 100}}>
							<span>Text 0</span>
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
						</Scroller>
						<Item onClick={setIndex(3, 0)}>Text 1</Item>
					</Panel>
				</FixedPopupPanels>
			</Section>
		</>
	);
};

export default FixedPopupPanelsView;
