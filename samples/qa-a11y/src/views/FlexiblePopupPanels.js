import Button from '@enact/sandstone/Button';
import {FlexiblePopupPanels, Header, Panel} from '@enact/sandstone/FlexiblePopupPanels';
import Item from '@enact/sandstone/Item';
import Scroller from '@enact/sandstone/Scroller';
import Slider from '@enact/sandstone/Slider';
import ri from '@enact/ui/resolution';

import Section from '../components/Section';
import useArrayState from '../components/useArrayState';

const FlexiblePopupPanelsView = () => {
	const [open, handleOpen] = useArrayState(4);
	const [index, setIndex] = useArrayState(4, 0);

	const prevButton = <Button icon="closex" aria-label="This is Exit." onClick={handleOpen(0, false)} />;
	const nextButton = <Button icon="closex" aria-label="This is Quit." onClick={handleOpen(0, false)} />;

	return (
		<Section title="Default">
			<Button alt="Normal" onClick={handleOpen(0, true)}>Open 0</Button>

			<FlexiblePopupPanels
				index={index[0]}
				open={open[0]}
				onNextClick={setIndex(0, index[0] + 1)}
				onPrevClick={setIndex(0, index[0] - 1)}
				noCloseButton
			>
				<Panel prevButton={prevButton}>
					<Header title="List of options" />
					<Scroller style={{width: ri.scaleToRem(900)}}>
						<Item onClick={setIndex(0, index[0] + 1)}>Item 0</Item>
						<Item onClick={setIndex(0, index[0] + 1)}>Item 1</Item>
						<Item onClick={setIndex(0, index[0] + 1)}>Item 2</Item>
						<Item onClick={setIndex(0, index[0] + 1)}>Item 3</Item>
						<Item onClick={setIndex(0, index[0] + 1)} disabled>Item 4</Item>
					</Scroller>
				</Panel>
				<Panel>
					<Header title="Vertical Slider" />
					<Slider orientation="vertical" defaultValue={50} style={{height: ri.scaleToRem(600)}} />
				</Panel>
				<Panel nextButton={nextButton}>
					<Header title="Third panel" />
					<Scroller style={{width: ri.scaleToRem(900)}}>
						<Item>Item 0</Item>
					</Scroller>
				</Panel>
			</FlexiblePopupPanels>
		</Section>
	);
};

export default FlexiblePopupPanelsView;
