import {add, is} from '@enact/core/keymap';
import Button from '@enact/sandstone/Button';
import IconItem from '@enact/sandstone/IconItem';
import Scroller from '@enact/sandstone/Scroller';
import $L from '@enact/sandstone/internal/$L';
import Spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/controls';
import ri from '@enact/ui/resolution';
import {ScrollerBasic as UiScrollerBasic} from '@enact/ui/Scroller';
import Touchable from '@enact/ui/Touchable';
import classNames from 'classnames';
import {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';

import galleryIcon from '../../images/icon_app_gallery.png';
import gameHomeIcon from '../../images/icon_app_game.png';
import homeOfficeIcon from '../../images/icon_app_homeoffice.png';
import mediaDiscoveryIcon from '../../images/icon_app_mediadiscovery.png';

import css from './IconItem.module.less';

add('cancel', 27);
const isCancel = is('cancel');

const ScrollerConfig = mergeComponentMetadata('Scroller', UiScrollerBasic, Scroller);
const prop = {
	direction: ['both', 'horizontal', 'vertical'],
	focusableScrollbarOption: {
		false: false,
		true: true,
		byEnter: 'byEnter'
	},
	scrollbarOption: ['auto', 'hidden', 'visible'],
	scrollModeOption: ['native', 'translate']
};

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
			else if (index === 6) return 'Gallery label that has very long text';
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

const Container = SpotlightContainerDecorator('div');
const ContainerDivWithLeaveForConfig = SpotlightContainerDecorator({leaveFor: {left: '', right: ''}}, 'div');
const TouchableDiv = Touchable('div');

export const EditableIcon = (args) => {
	const dataSize = args['editableDataSize'];
	const [items, setItems] = useState(itemsArr);
	const [editMode, setEditMode] = useState(false);
	const removeItem = useRef();
	const hideItem = useRef();
	const showItem = useRef();
	const focusItem = useRef();
	const blurItem = useRef();
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
		setItems(itemsArr);
		mutableRef.current.hideIndex = dataSize;
	}, [dataSize]);

	const findItemNode = useCallback((node) => {
		for (let current = node; current !== divRef.current && current !== document; current = current.parentNode) {
			if (current.dataset.index) {
				return current;
			}
		}
	}, [divRef]);

	const onClickModeButton = useCallback(() => {
		setEditMode(mode => !mode);
		mutableRef.current.initialSelected.scrollLeft = 0;
		mutableRef.current.initialSelected.itemIndex = null;
		mutableRef.current.timer = null;
	}, [setEditMode]);

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

	const onMouseLeaveItem = useCallback((ev) => {
		if (blurItem.current && Spotlight.getPointerMode()) {
			blurItem.current(ev.target);
		}
	}, []);

	const handleHoldStart = useCallback(() => {
		setEditMode(true);
	}, [setEditMode]);

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
					setEditMode(true);
				}, 200);

			}
		}
	}, [findItemNode]);

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
			newItems.push(items[order - 1]);
		});

		for (let i = 0; i < orders.length; i++) {
			newItems[i].hidden = (i >= hideIndex);
		}

		setItems(newItems);
	}, [items]);

	const handleGlobalKeyUp = useCallback((ev) => {
		if (isCancel(ev.keyCode)) {
			setEditMode(false);
			mutableRef.current.initialSelected.scrollLeft = 0;
			mutableRef.current.initialSelected.itemIndex = null;
			mutableRef.current.timer = null;
		}
	}, []);

	useEffect(() => {
		document.addEventListener('keyup', handleGlobalKeyUp);
		return (() => {
			document.removeEventListener('keyup', handleGlobalKeyUp);
		});
	}, [handleGlobalKeyUp]);

	return (
		<div ref={divRef}>
			<Container>
				{editMode ? <Button style={{marginLeft: '36px'}} onClick={onClickModeButton} icon="arrowhookleft" /> : <Button style={{marginLeft: '36px'}} onClick={onClickModeButton} icon="edit" />}
				{editMode ?
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
							blurItemFuncRef: blurItem,
							focusItemFuncRef: focusItem,
							initialSelected: mutableRef.current.initialSelected,
							selectItemBy: 'press'
						}}
						focusableScrollbar={args['focusableScrollbar']}
						horizontalScrollbar={args['horizontalScrollbar']}
						hoverToScroll={args['hoverToScroll']}
						key={args['scrollMode']}
						noScrollByWheel={args['noScrollByWheel']}
						onClick={action('onClickScroller')}
						onKeyDown={action('onKeyDown')}
						onScrollStart={action('onScrollStart')}
						onScrollStop={action('onScrollStop')}
						scrollMode={args['scrollMode']}
						spotlightDisabled={args['spotlightDisabled']}
						verticalScrollbar={args['verticalScrollbar']}
					>
						{
							items.map((item, index) => {
								return (
									<div
										aria-label={`Icon ${item.index}`}
										className={classNames(css.itemWrapper, {[css.hidden]: item.hidden})}
										data-index={item.index}
										disabled={item.iconItemProps['disabled'] || item.hidden}
										key={item.index}
										onMouseLeave={onMouseLeaveItem}
										style={{order: index + 1}}
									>
										<ContainerDivWithLeaveForConfig className={css.removeButtonContainer}>
											{item.hidden ? null : <Button aria-label="Delete" className={css.removeButton} onClick={onClickRemoveButton} icon="trash" />}
											{item.hidden ? null : <Button aria-label="Hide" className={css.removeButton} onClick={onClickHideButton} icon="minus" />}
											{item.hidden ? <Button aria-label="Show" className={css.removeButton} onClick={onClickShowButton} icon="plus" /> : null}
										</ContainerDivWithLeaveForConfig>
										<IconItem
											{...item.iconItemProps}
											aria-label={`Icon ${item.index}`}
											className={css.editableIconItem}
											css={css}
											disabled={item.iconItemProps['disabled'] || item.hidden}
											label={item.iconItemProps['label']}
											onClick={action('onClickItem')}
											onFocus={onFocusItem}
											order={index}
										/>
									</div>
								);
							})
						}
					</Scroller> :
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
								items.map((item, index) => {
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
				}
			</Container>
		</div>
	);
};

boolean('editableCentered', EditableIcon, ScrollerConfig, true);
number('editableDataSize', EditableIcon, ScrollerConfig, 20);
select('focusableScrollbar', EditableIcon, prop.focusableScrollbarOption, ScrollerConfig);
select('horizontalScrollbar', EditableIcon, prop.scrollbarOption, ScrollerConfig);
boolean('hoverToScroll', EditableIcon, ScrollerConfig, true);
boolean('noScrollByWheel', EditableIcon, ScrollerConfig);
select('scrollMode', EditableIcon, prop.scrollModeOption, ScrollerConfig);
boolean('spotlightDisabled', EditableIcon, ScrollerConfig, false);
select('verticalScrollbar', EditableIcon, prop.scrollbarOption, ScrollerConfig);

EditableIcon.storyName = 'with editable scroller';

export const EditableIconWithLongPress = (args) => {
	const dataSize = args['editableDataSize'];
	const [items, setItems] = useState(itemsArr);
	const removeItem = useRef();

	useLayoutEffect(() => {
		itemsArr = [];
		for (let i = 0; i < dataSize; i++) {
			itemsArr.push(populateItems({index: i}));
		}
		setItems(itemsArr);
	}, [dataSize]);

	const onClickRemoveButton = useCallback((ev) => {
		if (removeItem.current) {
			removeItem.current();
		}
		ev.preventDefault();
		ev.stopPropagation();
	}, []);

	const handleComplete = useCallback((ev) => {
		const {orders} = ev;
		// change data from the new orders
		const newItems = [];

		orders.forEach(order => {
			newItems.push(items[order - 1]);
		});

		setItems(newItems);
	}, [items]);

	return (
		<Scroller
			direction="horizontal"
			editable={{
				centered: args['editableCentered'],
				css,
				onComplete: handleComplete,
				removeItemFuncRef: removeItem
			}}
			focusableScrollbar={args['focusableScrollbar']}
			horizontalScrollbar={args['horizontalScrollbar']}
			hoverToScroll={args['hoverToScroll']}
			key={args['scrollMode']}
			noScrollByWheel={args['noScrollByWheel']}
			onClick={action('onClickScroller')}
			onKeyDown={action('onKeyDown')}
			onScrollStart={action('onScrollStart')}
			onScrollStop={action('onScrollStop')}
			scrollMode={args['scrollMode']}
			spotlightDisabled={args['spotlightDisabled']}
			verticalScrollbar={args['verticalScrollbar']}
		>
			{
				items.map((item, index) => {
					return (
						<div key={item.index} className={css.itemWrapper} aria-label={`Icon ${item.index}`} data-index={item.index} style={{order: index + 1}}>
							<div className={css.removeButtonContainer}>
								<Button aria-label="Delete" className={css.removeButton} onClick={onClickRemoveButton} icon="trash" />
							</div>
							<IconItem
								aria-label={`Icon ${item.index} ${$L('Press and hold the OK button to edit.')}`}
								className={css.iconItem}
								onClick={action('onClickItem')}
								{...item.iconItemProps}
							/>
						</div>
					);
				})
			}
		</Scroller>
	);
};

boolean('editableCentered', EditableIconWithLongPress, ScrollerConfig, true);
number('editableDataSize', EditableIconWithLongPress, ScrollerConfig, 20);
select('focusableScrollbar', EditableIconWithLongPress, prop.focusableScrollbarOption, ScrollerConfig);
select('horizontalScrollbar', EditableIconWithLongPress, prop.scrollbarOption, ScrollerConfig);
boolean('hoverToScroll', EditableIconWithLongPress, ScrollerConfig, true);
boolean('noScrollByWheel', EditableIconWithLongPress, ScrollerConfig);
select('scrollMode', EditableIconWithLongPress, prop.scrollModeOption, ScrollerConfig);
boolean('spotlightDisabled', EditableIconWithLongPress, ScrollerConfig, false);
select('verticalScrollbar', EditableIconWithLongPress, prop.scrollbarOption, ScrollerConfig);

EditableIconWithLongPress.storyName = 'with editable scroller trigger by long press';

export default {
	title: 'Sandstone/IconItem',
	component: 'IconItem'
};
