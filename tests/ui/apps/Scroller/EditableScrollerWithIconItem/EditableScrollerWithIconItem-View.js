import classNames from 'classnames';
import spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import Cell from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import {Component, createRef} from 'react';

import Button from '../../../../../Button/Button';
import IconItem from '../../../../../IconItem';
import {InputField} from '../../../../../Input';
import Scroller from '../../../../../Scroller/Scroller';
import ThemeDecorator from '../../../../../ThemeDecorator/ThemeDecorator';
import css from './EditableScrollerWithIconItem.module.less';

const ScrollerContainer = SpotlightContainerDecorator('div');
const OptionsContainer = SpotlightContainerDecorator({leaveFor: {down: '#left'}}, 'div');
const ItemButtonsContainer = SpotlightContainerDecorator({leaveFor: {left: '', right: ''}}, 'div');

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const iconItems = [];
const icons = [
	'bgm',
	'bookmark',
	'browser',
	'camera',
	'demosync',
	'ftp',
	'gamepad',
	'network'
];

const updateDataSize = (dataSize) => {
	iconItems.length = 0;

	for (let index = 0; index < dataSize; index++) {
		const props = {
			background: '#' + Math.floor(Math.random() * (0x1000000 - 0x808080) + 0x404040).toString(16),
			bordered: index < 2,
			icon: icons[index % icons.length],
			label: icons[index % icons.length].toLocaleUpperCase(),
			labelOn: (index % 3 ) === 2 ? 'focus' : null
		};

		iconItems.push({index, props: {...props}});
	}
	return dataSize;
};

class app extends Component {
	constructor (props) {
		super(props);
		this.state = {
			editableCentered: true,
			nativeScroll: true,
			numItems: 10,
			items: iconItems
		};
		this.hideIndex = null;
		this.removeItem = createRef();
		this.hideItem = createRef();
		this.showItem = createRef();
		this.focusItem = createRef();
		this.scrollingRef = createRef();
		updateDataSize(this.state.numItems);
	}

	onToggle = ({currentTarget}) => {
		const key = currentTarget.getAttribute('id');
		this.setState((state) => ({[key]: !state[key]}));
	};

	onChangeNumItems = ({value}) => {
		this.setState({numItems: value});
		updateDataSize(value);
	};

	handleComplete = (ev) => {
		const {orders, hideIndex} = ev;
		this.hideIndex = hideIndex;

		// change data from the new orders
		const newItems = [];

		orders.forEach(order => {
			newItems.push(this.state.items[order - 1]);
		});

		for (let i = 0; i < orders.length; i++) {
			newItems[i].hidden = (i >= hideIndex);
		}

		this.setState({items: newItems});
	};

	onClickHideButton = (ev) => {
		if (this.hideItem.current) {
			this.hideItem.current();
		}
		ev.preventDefault();
		ev.stopPropagation();
	};

	onClickShowButton = (ev) => {
		if (this.showItem.current) {
			this.showItem.current();
		}
		ev.preventDefault();
		ev.stopPropagation();
	};

	onFocusItem = (ev) => {
		if (this.focusItem.current) {
			this.focusItem.current(ev.target);
		}
		ev.preventDefault();
		ev.stopPropagation();
	};

	render () {
		const {editableCentered, nativeScroll, numItems, items} = this.state;
		const buttonDefaultProps = {minWidth: false, size: 'small'};
		const scrollMode = nativeScroll ? 'NativeScroll' : 'TranslateScroll';
		const inputStyle = {width: ri.scaleToRem(300)};
		return (
			<div {...this.props} id="scroller">
				<Cell component={OptionsContainer}>
					<Button {...buttonDefaultProps} id="nativeScroll" onClick={this.onToggle}>{scrollMode}</Button>
					<Button {...buttonDefaultProps} id="editableCentered" onClick={this.onToggle}>EditableCentered</Button>
					<InputField id="numItems" defaultValue={numItems} type="number" onChange={this.onChangeNumItems} size="small" style={inputStyle} />
				</Cell >
				<Cell component={ScrollerContainer}>
					<Scroller
						dataSize={numItems}
						direction="horizontal"
						horizontalScrollbar="hidden"
						hoverToScroll
						key={nativeScroll ? 'native' : 'translate'}
						verticalScrollbar="hidden"
						editable={{
							centered: editableCentered,
							css,
							selectItemBy: 'press',
							hideIndex: this.hideIndex,
							onComplete: this.handleComplete,
							removeItemFuncRef: this.removeItem,
							hideItemFuncRef: this.hideItem,
							showItemFuncRef: this.showItem,
							focusItemFuncRef: this.focusItem
						}}
					>
						{
							items.map((item, index) => {
								return (
									<div key={item.index} className={classNames(css.itemWrapper, {[css.hidden]: item.hidden})} aria-label={`Icon ${item.index}`} data-index={item.index} style={{order: index + 1}} disabled={item.hidden}>
										<ItemButtonsContainer className={css.removeButtonContainer}>
											{item.hidden ? null : <Button aria-label="Delete" className={css.removeButton} onClick={this.onClickRemoveButton} icon="trash" />}
											{item.hidden ? null : <Button aria-label="Hide" className={css.removeButton} onClick={this.onClickHideButton} icon="minus" />}
											{item.hidden ? <Button aria-label="Show" className={css.removeButton} onClick={this.onClickShowButton} icon="plus" /> : null}
										</ItemButtonsContainer>
										<IconItem
											aria-label={`Icon ${item.index}. Edit mode to press and hold OK button`}
											className={css.iconItem}
											disabled={item.hidden}
											onFocus={this.onFocusItem}
											{...item.props}
										/>
									</div>
								);
							})
						}
					</Scroller>
				</Cell>
			</div>
		);
	}
}

export default ThemeDecorator(app);
