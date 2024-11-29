import {is} from '@enact/core/keymap';
import Button from '@enact/sandstone/Button';
import IconItem from '@enact/sandstone/IconItem';
import ImageItem from '@enact/sandstone/ImageItem';
import Item from '@enact/sandstone/Item';
import {Header, Panel, Panels} from '@enact/sandstone/Panels';
import Scroller from '@enact/sandstone/Scroller';
import {VirtualGridList} from '@enact/sandstone/VirtualList';
import $L from '@enact/sandstone/internal/$L';
import Spotlight from '@enact/spotlight';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/controls';
import ri from '@enact/ui/resolution';
import Touchable from '@enact/ui/Touchable';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import compose from 'ramda/src/compose';
import {useCallback, useState, useRef, useLayoutEffect} from 'react';

import galleryIcon from '../../images/icon_app_gallery.png';
import gameHomeIcon from '../../images/icon_app_game.png';
import homeOfficeIcon from '../../images/icon_app_homeoffice.png';
import mediaDiscoveryIcon from '../../images/icon_app_mediadiscovery.png';
import {svgGenerator} from '../helper/svg';

import css from './Panels.module.less';

const Config = mergeComponentMetadata('Panels', Panels);

const items = [];
for (let i = 0; i < 20; i++) {
	const headingZeros = Array(2).join('0');
	const count = (headingZeros + i).slice(-2);
	const text = `Item ${count}`;
	const subText = `SubItem ${count}`;
	const color = Math.floor(Math.random() * (0x1000000 - 0x101010) + 0x101010).toString(16);
	const source = svgGenerator(600, 600, color, 'ffffff', `Image ${i}`);

	items.push({text, subText, source});
}

const renderItem = ({index, ...rest}) => {
	const {text, subText, source} = items[index];

	return (
		<ImageItem {...rest} label={subText} src={source}>
			{text}
		</ImageItem>
	);
};

renderItem.propTypes = {
	index: PropTypes.number
};

const VirtualGridListInScroller = ({onClick, ...rest}) => {
	const virtualGridListProps = {
		...rest,
		childProps: {onClick: onClick},
		dataSize: 20,
		direction: 'horizontal',
		itemRenderer: renderItem,
		itemSize: {
			minWidth: ri.scale(688),
			minHeight: ri.scale(570)
		},
		style: {
			height: ri.scale(570),
			paddingBottom: ri.scaleToRem(36)
		}
	};

	const virtualGridLists = [];

	for (let i = 0; i < 2; i++) {
		const id = `vgl_${i}`;

		virtualGridLists.push(
			<VirtualGridList
				{...virtualGridListProps}
				id={id}
				key={id}
				spotlightId={id}
			/>
		);
	}

	return (
		<Scroller>
			{virtualGridLists}
		</Scroller>
	);
};

VirtualGridListInScroller.propTypes = {
	onClick: PropTypes.func
};

export const WithAutoFocusControl = (args) => {
	const [panelIndex, setState] = useState(0);

	const forward = useCallback(() => {
		setState(panelIndex + 1);
	}, [panelIndex]);

	const backward = useCallback(() => {
		setState(panelIndex - 1);
	}, [panelIndex]);

	const handleTransition = useCallback(() => {
		setTimeout(() => {
			if (!Spotlight.getPointerMode() && !Spotlight.getCurrent() && !Spotlight.isPaused()) {
				Spotlight.focus(`panel-container-${panelIndex}`);
			}
		}, 1000);
	}, [panelIndex]);

	const handleBack = compose(backward, action('onBack'));

	const story = (
		<Panels
			index={panelIndex}
			noCloseButton
			onBack={handleBack}
			onTransition={handleTransition}
			onWillTransition={action('onWillTransition')}
		>
			<Panel autoFocus={args['autoFocus for Panel 0']} spotlightId="panel-container-0">
				<Header title="Panel With AutoFocus Control" />
				<VirtualGridListInScroller onClick={forward} />
			</Panel>
			<Panel spotlightId="panel-container-1">
				<Header title="Second Panel" />
				<Item>Item</Item>
			</Panel>
		</Panels>
	);
	return story;
};

select('autoFocus for Panel 0', WithAutoFocusControl, ['none', 'last-focused', 'default-element'], Config, 'none');

export default {
	title: 'Sandstone/Panels',
	component: 'Panels'
};

WithAutoFocusControl.storyName = 'with AutoFocus Control';
WithAutoFocusControl.parameters = {
	props: {
		noPanels: true
	}
};

const ScrollerConfig = mergeComponentMetadata('Scroller', Scroller);

let itemsArr = [];
const imageSrcs = [
	'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3MDAiIGhlaWdodD0iNzAwIiB2aWV3Qm94PSIwIDAgNzAwIDcwMCI+PGRlZnM+PHN0eWxlPi5hLC5ie2ZpbGw6I2ZmZjt9LmJ7b3BhY2l0eTowLjg7fTwvc3R5bGU+PC9kZWZzPjxwb2x5Z29uIGNsYXNzPSJhIiBwb2ludHM9IjM0OS45IDUyNy44IDE5OS45IDQyOS44IDE5OS45IDM3NC40IDM1MC4xIDQ3Mi43IDM0OS45IDM0OC41IDE5OS45IDI2MS4xIDE5OS45IDIwOS4zIDM1MCAyOTMuNiAzNTAgMjkzLjYgMzUwLjIgMjkzLjcgMzQ5LjkgMTY5LjMgMTAyLjcgNDguNSAxMDIuNyA0NzIuNiAzNTAuMSA2NTEuNiAzNDkuOSA1MjcuOCIvPjxwb2x5Z29uIGNsYXNzPSJiIiBwb2ludHM9IjM1MC4xIDY1MS42IDU5Ny4zIDQ3Mi44IDU5Ny4zIDM2Ni4zIDM0OS45IDUyNy44IDM1MC4xIDY1MS42Ii8+PHBvbHlnb24gY2xhc3M9ImIiIHBvaW50cz0iMzUwLjEgNDcyLjcgNTIzLjUgMzU5LjMgNTIzLjUgMjQ3LjQgMzQ5LjkgMzQ4LjUgMzUwLjEgNDcyLjciLz48cG9seWdvbiBjbGFzcz0iYiIgcG9pbnRzPSIzNTAgMjkzLjYgMzUwIDI5My42IDM1MC4yIDI5My43IDU5Ny4zIDE1NC44IDU5Ny4zIDQ4LjQgMzQ5LjkgMTY5LjMgMzUwIDI5My42Ii8+PC9zdmc+',
	galleryIcon,
	gameHomeIcon,
	homeOfficeIcon,
	mediaDiscoveryIcon
];

const populateItems = ({index}) => {
	const color = Math.floor(Math.random() * (0x1000000 - 0x101010) + 0x101010).toString(16);
	const iconItemProps = {
		background: (function () {
			if (index < 2) return '#1b1b1b';
			else if (index % 6 === 0) return '#ffffff';
			else return '#' + color;
		})(),
		bordered: index < 2,
		icon: index === 0 ? 'demosync' : (index === 1 ? 'usb' : ''), // eslint-disable-line no-nested-ternary
		image: index > 1 ? {
			src: imageSrcs[index % 5],
			size: {
				width: ri.scaleToRem(150),
				height: ri.scaleToRem(150)
			}
		} : null,
		label: (function () {
			if (index === 1) return 'USB';
			else if (index === 6) return 'Gallery';
		})(),
		labelColor: index === 6 ? 'dark' : null,
		labelOn: index === 6 ? 'focus' : null,
		disabled: index === 1
	};

	return {index, iconItemProps};
};

for (let i = 0; i < 20; i++) {
	itemsArr.push(populateItems({index: i}));
}

const ContainerDivWithLeaveForConfig = SpotlightContainerDecorator({leaveFor: {left: '', right: ''}}, 'div');
const TouchableDiv = Touchable('div');

export const WithEditableScroller = (args) => {
	const dataSize = args['editableDataSize'];
	const [iconItems, setIconItems] = useState(itemsArr);
	const [panelIndex, setPanelIndex] = useState(0);
	const removeItem = useRef();
	const hideItem = useRef();
	const showItem = useRef();
	const focusItem = useRef();
	const divRef = useRef();
	const mutableRef = useRef({
		hideIndex: null,
		initialSelected: {},
		timer: null
	});

	useLayoutEffect(() => {
		itemsArr = [];
		for (let i = 0; i < dataSize; i++) {
			itemsArr.push(populateItems({index: i}));
		}
		setIconItems(itemsArr);
		mutableRef.current.hideIndex = dataSize;
	}, [dataSize]);

	const findItemNode = useCallback((node) => {
		for (let current = node; current !== divRef.current && current !== document; current = current.parentNode) {
			if (current.dataset.index) {
				return current;
			}
		}
	}, [divRef]);

	const onClickRemoveButton = useCallback((ev) => {
		if (removeItem.current) {
			removeItem.current();
		}
		ev.preventDefault();
	}, []);

	const onClickHideButton = useCallback((ev) => {
		if (hideItem.current) {
			hideItem.current();
		}
		ev.preventDefault();
	}, []);

	const onClickShowButton = useCallback((ev) => {
		if (showItem.current) {
			showItem.current();
		}
		ev.preventDefault();
	}, []);

	const onFocusItem = useCallback((ev) => {
		if (focusItem.current) {
			focusItem.current(ev.target);
		}
	}, []);

	const handleHoldStart = useCallback(() => {
		setPanelIndex(panelIndex + 1);
	}, [panelIndex]);

	const handleMouseDown = useCallback((ev) => {
		if (!ev.target.className.includes('Button')) {
			const targetItemNode = findItemNode(ev.target);
			if (targetItemNode && targetItemNode.style.order) {
				mutableRef.current.initialSelected.itemIndex = targetItemNode.style.order;
			}
		}
	}, [findItemNode]);

	const handleKeyDown = useCallback((ev) => {
		const {keyCode, repeat, target} = ev;
		if (is('enter', keyCode) && target.getAttribute('role') !== 'button') {
			if (repeat && !mutableRef.current.timer) {
				const targetItemNode = findItemNode(ev.target);
				if (targetItemNode && targetItemNode.style.order) {
					mutableRef.current.initialSelected.itemIndex = targetItemNode.style.order;
				}
				mutableRef.current.timer = setTimeout(() => {
					setPanelIndex(panelIndex + 1);
				}, 200);

			}
		}
	}, [findItemNode, panelIndex]);

	const handleKeyUp = useCallback((ev) => {
		if (ev.target.getAttribute('role') === 'button') {
			return;
		}
		if (mutableRef.current.timer) {
			clearTimeout(mutableRef.current.timer);
			mutableRef.current.timer = null;
		}
	}, []);

	const handleScroll = useCallback((ev) => {
		mutableRef.current.initialSelected.scrollLeft = ev.scrollLeft;
	}, []);

	const handleComplete = useCallback((ev) => {
		const {orders, hideIndex} = ev;
		mutableRef.current.hideIndex = hideIndex;

		// change data from the new orders
		const newItems = [];

		orders.forEach(order => {
			newItems.push(iconItems[order - 1]);
		});

		for (let i = 0; i < orders.length; i++) {
			newItems[i].hidden = (i >= hideIndex);
		}

		setIconItems(newItems);
	}, [iconItems]);

	const forward = useCallback(() => {
		setPanelIndex(panelIndex + 1);
		mutableRef.current.initialSelected.scrollLeft = 0;
		mutableRef.current.initialSelected.itemIndex = null;
		mutableRef.current.timer = null;
	}, [panelIndex]);

	const backward = useCallback(() => {
		setPanelIndex(panelIndex - 1);
		mutableRef.current.initialSelected.scrollLeft = 0;
		mutableRef.current.initialSelected.itemIndex = null;
		mutableRef.current.timer = null;
	}, [panelIndex]);

	return (
		<Panels
			index={panelIndex}
			noCloseButton
			onBack={backward}
		>
			<Panel>
				<Header title="Panel with Editable Scroller" subtitle="Click pencil button to start edit mode" />
				<div ref={divRef}>
					<Button aria-label="Edit mode" style={{marginLeft: '36px'}} onClick={forward} icon="edit" />
					<TouchableDiv
						onHoldStart={handleHoldStart}
						onMouseDown={handleMouseDown}
						onKeyDown={handleKeyDown}
						onKeyUp={handleKeyUp}
					>
						<Scroller
							direction="horizontal"
							onClick={action('onClickScroller')}
							onKeyDown={action('onKeyDown')}
							onScroll={handleScroll}
							onScrollStart={action('onScrollStart')}
							onScrollStop={action('onScrollStop')}
						>
							<div className={classNames(css.scrollerWrapper, css.wrapper, {[css.centered]: args['editableCentered']})}> {
								iconItems.map((item, index) => {
									return (
										<div key={item.index} className={classNames(css.itemWrapper, {[css.hidden]: item.hidden})} aria-label={`Icon ${item.index}`} data-index={item.index} style={{order: index + 1}}>
											<div className={css.removeButtonContainer} />
											<IconItem
												{...item.iconItemProps}
												aria-label={`Icon ${item.index} ${$L('Press and hold the OK button to edit.')}`}
												className={css.iconItem}
												disabled={item.iconItemProps['disabled'] || item.hidden}
												onClick={action('onClickItem')}
											/>
										</div>
									);
								})}
							</div>
						</Scroller>
					</TouchableDiv>
				</div>
			</Panel>
			<Panel>
				<Header title="Edit AppList" subtitle="This is subtitle of editAppList" />
				<div ref={divRef}>
					<Scroller
						direction="horizontal"
						editable={{
							centered: args['editableCentered'],
							css,
							hideIndex: mutableRef.current.hideIndex,
							onComplete: handleComplete,
							removeItemFuncRef: removeItem,
							hideItemFuncRef: hideItem,
							showItemFuncRef: showItem,
							focusItemFuncRef: focusItem,
							initialSelected: mutableRef.current.initialSelected,
							selectItemBy: 'press'
						}}
					>
						{
							iconItems.map((item, index) => {
								return (
									<div key={item.index} className={classNames(css.itemWrapper, {[css.hidden]: item.hidden})} aria-label={`Icon ${item.index}`} data-index={item.index} style={{order: index + 1}} disabled={item.iconItemProps['disabled'] || item.hidden}>
										<ContainerDivWithLeaveForConfig className={css.removeButtonContainer}>
											{item.hidden ? null : <Button aria-label="Delete" className={css.removeButton} onClick={onClickRemoveButton} icon="trash" />}
											{item.hidden ? null : <Button aria-label="Hide" className={css.removeButton} onClick={onClickHideButton} icon="minus" />}
											{item.hidden ? <Button aria-label="Show" className={css.removeButton} onClick={onClickShowButton} icon="plus" /> : null}
										</ContainerDivWithLeaveForConfig>
										<IconItem
											{...item.iconItemProps}
											spotlightId={`item_${index}`}
											aria-label={`Icon ${item.index}`}
											className={css.editableIconItem}
											css={css}
											disabled={item.iconItemProps['disabled'] || item.hidden}
											onClick={action('onClickItem')}
											onFocus={onFocusItem}
										/>
									</div>
								);
							})
						}
					</Scroller>
				</div>
			</Panel>
		</Panels>
	);
};

boolean('editableCentered', WithEditableScroller, ScrollerConfig, true);
number('editableDataSize', WithEditableScroller, ScrollerConfig, 20);

WithEditableScroller.storyName = 'with Editable Scroller';
WithEditableScroller.parameters = {
	props: {
		noPanels: true
	}
};

export const WithFocusableScrollbar = () => {
	const [panelIndex, setPanelIndex] = useState(0);

	const forward = useCallback(() => {
		setPanelIndex(panelIndex + 1);
	}, [panelIndex]);

	const backward = useCallback(() => {
		setPanelIndex(panelIndex - 1);
	}, [panelIndex]);

	return (
		<Panels
			index={panelIndex}
			noCloseButton
			onBack={backward}
		>
			<Panel aria-label="This is a Panel 0">
				<Header title="Panel 0" />
				<Scroller>
					<Button onClick={forward}>Next</Button>
				</Scroller>
			</Panel>
			<Panel aria-label="This is a Panel 1">
				<Header title="Panel 1" />
				<Scroller focusableScrollbar>
					<Button onClick={backward}>Previous</Button>
				</Scroller>
			</Panel>
		</Panels>
	);
};

WithFocusableScrollbar.storyName = 'with focusable scrollbar';
WithFocusableScrollbar.parameters = {
	props: {
		noPanels: true
	}
};
