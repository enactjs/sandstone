import ri from '@enact/ui/resolution';

import CheckboxItem from '../CheckboxItem';
import Icon from '../Icon';
import ImageItem from '../ImageItem';

import componentCss from './TransferList.module.less';
import imageItemCss from '../ImageItem/ImageItem.module.less';

// SVG generator used as a `src` prop from ImageItem when the lists are rendered by `VirtualGridList` component
const svgGenerator = (width, height, customText) => (
	`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}' width='${width}' height='${height}'%3E` +
	`%3Crect width='${width}' height='${height}' fill='%23117fba'%3E%3C/rect%3E` +
	`%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='36px' fill='%23ffffff'%3E${customText}%3C/text%3E%3C/svg%3E`
);

// When `listComponent` prop is set to `VirtualList`, the `CheckboxItem` component is used to render the items in the lists
export const renderItem = ({disabled, elements, itemSize, list, moveInFirst, moveInSecond, onSelect, orientation, reorderList, selectedItems, showSelectionOrder, ...rest}) => (data) => {
	const {index, 'data-index': dataIndex} = data;
	const element = elements[index];
	const selectedIndex = selectedItems.findIndex((args) => args.element === element && args.list === list) + 1;
	const selected = selectedIndex !== 0;
	const style = orientation === 'horizontal' ? {} : {height: `calc(100% - ${ri.scaleToRem(42)})`, width: ri.scaleToRem(itemSize * 3)};

	// Called when an item from the list is selected. The information contains the name, index and parent list (e.g. BBC World News 0 first)
	const handleClick = () => {
		onSelect(element, index, list);
	};

	// When `moveOnSpotlight` prop is set to true, selecting and transferring the items can be done with Enter and arrow keys
	// Handle down arrow key on item
	const handleSpotlightDown = (ev) => {
		if (orientation === 'vertical' && list === 'first') moveInSecond();
		if (elements.length - 1 !== index && orientation === 'horizontal') return;
		if (list === 'first' && orientation === 'vertical') return;
		ev.preventDefault();
		ev.stopPropagation();
	};

	// Handle left arrow key on item
	const handleSpotlightLeft = (ev) => {
		if (orientation === 'horizontal' && list === 'second') moveInFirst();
		if (index !== 0 || orientation === 'horizontal') return;
		ev.preventDefault();
		ev.stopPropagation();
	};

	// Handle right arrow key on item
	const handleSpotlightRight = (ev) => {
		if (orientation === 'horizontal' && list === 'first') moveInSecond();
		if (elements.length - 1 !== index || orientation === 'horizontal') return;
		ev.preventDefault();
		ev.stopPropagation();
	};

	// Handle up arrow key on item
	const handleSpotlightUp = (ev) => {
		if (orientation === 'vertical' && list === 'second') moveInFirst();
		if (index !== 0 && orientation === 'horizontal') return;
		if (list === 'second' && orientation === 'vertical') return;
		ev.preventDefault();
		ev.stopPropagation();
	};

	// In case of reordering the list with arrow keys, capture events help with catching all events on child elements of a VirtualList component
	// https://react.dev/learn/responding-to-events#capture-phase-events
	const handleKeyDownCapture = (ev) => {
		if (!selected || selectedItems.length > 1) return;
		if (orientation !== 'vertical') {
			if (ev.key === 'ArrowUp') {
				reorderList(list, index, -1, element);
			} else if (ev.key === 'ArrowDown') {
				reorderList(list, index, 1, element);
			}
		} else if (orientation !== 'horizontal') {
			if (ev.key === 'ArrowLeft') {
				reorderList(list, index, -1, element);
			} else if (ev.key === 'ArrowRight') {
				reorderList(list, index, 1, element);
			}
		}
	};

	return (
		<CheckboxItem
			{...rest}
			className={componentCss.draggableItem}
			data-index={dataIndex}
			draggable={!disabled}
			disabled={disabled}
			id={`${index}-${list}`}
			key={index + list}
			onClick={handleClick}	// eslint-disable-line  react/jsx-no-bind
			onKeyDownCapture={handleKeyDownCapture}	// eslint-disable-line  react/jsx-no-bind
			onSpotlightDown={handleSpotlightDown}	// eslint-disable-line  react/jsx-no-bind
			onSpotlightLeft={handleSpotlightLeft}	// eslint-disable-line  react/jsx-no-bind
			onSpotlightRight={handleSpotlightRight}	// eslint-disable-line  react/jsx-no-bind
			onSpotlightUp={handleSpotlightUp}	// eslint-disable-line  react/jsx-no-bind
			selected={selected}
			slotAfter={(selected && showSelectionOrder) && selectedIndex}
			style={style}
		>
			{element}
		</CheckboxItem>
	);
};

// When `listComponent` prop is set to `VirtualGridList`, the `ImageItem` component is used to render the items in the lists
export const renderImageItem = ({disabled, elements, list, moveInFirst, moveInSecond, onSelect, orientation, reorderList, selectedItems, showSelectionOrder, ...rest}) => (data) => {	// eslint-disable-line	enact/display-name
	const {index, 'data-index': dataIndex} = data;
	const element = elements[index];
	const selectedIndex = selectedItems.findIndex((args) => args.element === element && args.list === list) + 1;
	const selected = selectedIndex !== 0;

	const source = {
		hd: svgGenerator(200, 200, ''),
		fhd: svgGenerator(300, 300, ''),
		uhd: svgGenerator(600, 600, '')
	};

	// Selection overlay for ImageItem component
	const selectionComponent = () => {
		return <div className={componentCss.selectionContainer}>{selected && <Icon className={imageItemCss.selectionIcon}>check</Icon>}{(selected && showSelectionOrder) && selectedIndex}</div>;
	};

	// Called when an item from the list is selected. The information contains the name, index and parent list (e.g. BBC World News 0 first)
	const handleClick = () => {
		onSelect(element, index, list);
	};

	// When `moveOnSpotlight` prop is set to true, selecting and transferring the items can be done with Enter and arrow keys
	// Handle down arrow key on item
	const handleSpotlightDown = (ev) => {
		if (orientation === 'vertical' && list === 'first') moveInSecond();
		if (elements.length - 1 !== index && orientation === 'horizontal') return;
		if (list === 'first' && orientation === 'vertical') return;
		ev.preventDefault();
		ev.stopPropagation();
	};

	// Handle left arrow key on item
	const handleSpotlightLeft = (ev) => {
		if (orientation === 'horizontal' && list === 'second') moveInFirst();
		if ((index !== 0 && index !== 1 ) || orientation === 'horizontal') return;
		ev.preventDefault();
		ev.stopPropagation();
	};

	// Handle right arrow key on item
	const handleSpotlightRight = (ev) => {
		if (orientation === 'horizontal' && list === 'first') moveInSecond();
		if ((elements.length - 1 !== index && elements.length - 2 !== index) || orientation === 'horizontal') return;
		ev.preventDefault();
		ev.stopPropagation();
	};

	// Handle up arrow key on item
	const handleSpotlightUp = (ev) => {
		if (orientation === 'vertical' && list === 'second') moveInFirst();
		if (index !== 0 && orientation === 'horizontal') return;
		if (list === 'second' && orientation === 'vertical') return;
		ev.preventDefault();
		ev.stopPropagation();
	};

	// In case of reordering the list with arrow keys, capture events help with catching all events on child elements of a VirtualGridList component
	// https://react.dev/learn/responding-to-events#capture-phase-events
	const handleKeyDownCapture = (ev) => {
		if (!selected || selectedItems.length > 1) return;
		if (orientation !== 'vertical') {
			if (ev.key === 'ArrowUp') {
				reorderList(list, index, -1, element);
			} else if (ev.key === 'ArrowDown') {
				reorderList(list, index, 1, element);
			}
		} else if (orientation !== 'horizontal') {
			if (ev.key === 'ArrowLeft') {
				reorderList(list, index, -2, element);
			} else if (ev.key === 'ArrowRight') {
				reorderList(list, index, 2, element);
			} else if (ev.key === 'ArrowUp') {
				reorderList(list, index, -1, element);
			} else if (ev.key === 'ArrowDown') {
				reorderList(list, index, 1, element);
			}
		}
	};

	delete rest.itemSize;

	return (
		<ImageItem
			{...rest}
			className={componentCss.draggableItem}
			data-index={dataIndex}
			disabled={disabled}
			draggable={!disabled}
			id={`${index}-${list}`}
			key={index + list}
			onClick={handleClick}	// eslint-disable-line  react/jsx-no-bind
			onKeyDownCapture={handleKeyDownCapture} // eslint-disable-line  react/jsx-no-bind
			onSpotlightDown={handleSpotlightDown}	// eslint-disable-line  react/jsx-no-bind
			onSpotlightLeft={handleSpotlightLeft}	// eslint-disable-line  react/jsx-no-bind
			onSpotlightRight={handleSpotlightRight}	// eslint-disable-line  react/jsx-no-bind
			onSpotlightUp={handleSpotlightUp}	// eslint-disable-line  react/jsx-no-bind
			orientation="horizontal"
			selected={selected}
			selectionComponent={selectionComponent} // eslint-disable-line  react/jsx-no-bind
			showSelection
			src={source}
		>
			{element}
		</ImageItem>
	);
};
