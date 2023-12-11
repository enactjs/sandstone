import Button from '@enact/sandstone/Button';
import Icon from '@enact/sandstone/Icon';
import ImageItem from '@enact/sandstone/ImageItem';
import Item from '@enact/sandstone/Item';
import {Panel, Header} from '@enact/sandstone/Panels';
import Scroller from '@enact/sandstone/Scroller';
import TabLayout, {Tab} from '@enact/sandstone/TabLayout';
import Spotlight from '@enact/spotlight';
import {scaleToRem} from '@enact/ui/resolution';
import {useCallback} from 'react';

const tabsWithIcons = [
	{title: 'Home', icon: 'home'},
	{title: 'Button', icon: 'gear'},
	{title: 'Item', icon: 'trash'}
];

const svgGenerator = (width, height, bgColor, textColor, customText) => (
	`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}' width='${width}' height='${height}'%3E` +
	`%3Crect width='${width}' height='${height}' fill='%23${bgColor}'%3E%3C/rect%3E` +
	`%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='36px' fill='%23${textColor}'%3E${customText}%3C/text%3E%3C/svg%3E`
);
const images = new Array(20).fill().map( (_, i) =>
	<ImageItem
		inline
		key={`image${i}`}
		caption="Image"
		src={svgGenerator(360, 240, 'd8d8d8', '6e6e6e', '360 X 240')}
		style={{width: scaleToRem(180), height: scaleToRem(120)}}
	>
		{`ImageItem ${i + 1}`}
	</ImageItem>
);

const containerSpotlightId = 'qa-a11y-tablayout-view-container';

const TabLayoutView = () => {
	const handleExpand = useCallback(() => {
		Spotlight.set(containerSpotlightId, {
			restrict: 'self-first'
		});
	}, []);
	const handleCollapse = useCallback(() => {
		Spotlight.set(containerSpotlightId, {
			restrict: 'self-only'
		});
	}, []);

	return (
		<Panel spotlightId={containerSpotlightId}>
			<Header title="Sandstone TabLayout" subtitle="Basic TabLayout" />
			<TabLayout onCollapse={handleCollapse} onExpand={handleExpand}>
				<Tab
					icon={tabsWithIcons[0].icon}
					title={tabsWithIcons[0].title}
				>
					<Scroller>
						{images}
					</Scroller>
				</Tab>
				<Tab
					icon={tabsWithIcons[1].icon}
					title={tabsWithIcons[1].title}
				>
					<Button icon="demosync">Button 0</Button>
					<Button icon="demosync">Button 1</Button>
					<Button icon="demosync">Button 2</Button>
					<Button icon="demosync">Button 3</Button>
				</Tab>
				<Tab
					disabled
					title={tabsWithIcons[2].title}
					icon={tabsWithIcons[2].icon}
				>
					<Item slotBefore={<Icon>playcircle</Icon>}>Single Item</Item>
				</Tab>
			</TabLayout>
		</Panel>
	);
};

export default TabLayoutView;
