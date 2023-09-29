import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import {Cell} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import {Component, createRef} from 'react';

import Button from '../../../../../Button';
import Scroller from '../../../../../Scroller';
import ImageItem from '../../../../../ImageItem';
import {InputField} from '../../../../../Input';
import ThemeDecorator from '../../../../../ThemeDecorator';

import css from './EditableScrollerItem.module.less';

const ContainerDivWithLeaveForConfig = SpotlightContainerDecorator({leaveFor: {left: '', right: ''}}, 'div');
const OptionsContainer = SpotlightContainerDecorator({leaveFor: {down: '#left'}}, 'div');
const ScrollerContainer = SpotlightContainerDecorator('div');

const getImageItems = (dataSize) => {
	const scrollerItems = [];
	for (let i = 0; i < dataSize; i++) {
		const index = i;
		const color = Math.floor(Math.random() * (0x1000000 - 0x101010) + 0x101010).toString(16);
		const source = {
			hd: `http://via.placeholder.com/200x200/${color}/ffffff/?text=Image+${index}`,
			fhd: `http://via.placeholder.com/300x300/${color}/ffffff/?text=Image+${index}`,
			uhd: `http://via.placeholder.com/600x600/${color}/ffffff/?text=Image+${index}`
		};
		scrollerItems.push({source, index});
	}
	return scrollerItems;
};

class app extends Component {
	constructor (props) {
		super(props);
		this.state = {
			editableCentered: true,
			editMode: false,
			items: getImageItems(5),
			nativeScroll: true,
			numItems: 5
		};
		this.focusItem = createRef();
		this.hideItem = createRef();
		this.mutableRef = createRef();
		this.mutableRef.current = {hideIndex: null};
		this.removeItem = createRef();
		this.showItem = createRef();
	}

	onChangeNumItems = ({value}) => {
		const items = getImageItems(value);
		this.setState({items: items, numItems: value});
	};

	handleComplete = (ev) => {
		const {orders, hideIndex} = ev;
		this.mutableRef.current.hideIndex = hideIndex;

		// change data from the new orders
		const newItems = [];

		orders.forEach(order => {
			newItems.push(this.state.items[order - 1]);
		});

		for (let i = 0; i < orders.length; i++) {
			newItems[i].disabled = (i >= hideIndex);
		}

		this.setState({items: newItems});
	};

	onClickHideButton = (ev) => {
		if (this.hideItem.current) {
			this.hideItem.current();
		}
		ev.preventDefault();
	};

	onClickRemoveButton = (ev) => {
		if (this.removeItem.current) {
			this.removeItem.current();
		}
		ev.preventDefault();
	};

	onClickShowButton = (ev) => {
		if (this.showItem.current) {
			this.showItem.current();
		}
		ev.preventDefault();
	};

	onFocusItem = (ev) => {
		if (this.focusItem.current) {
			this.focusItem.current(ev.target);
		}
		ev.preventDefault();
	};

	onToggle = ({currentTarget}) => {
		const key = currentTarget.getAttribute('id');
		this.setState((state) => ({[key]: !state[key]}));
	};

	render () {
		const {editMode, editableCentered, items, nativeScroll, numItems} = this.state;
		const buttonDefaultProps = {minWidth: false, size: 'small'};
		const inputStyle = {width: ri.scaleToRem(300)};
		return (
			<div {...this.props} id="scroller">
				<Cell component={OptionsContainer} shrink>
					<Button {...buttonDefaultProps} id="editableCentered" onClick={this.onToggle}>EditableCentered</Button>
					<InputField defaultValue={numItems} id="numItems" onChange={this.onChangeNumItems} size="small" style={inputStyle} type="number" />
				</Cell>
				<Cell component={ScrollerContainer}>
					{editMode ? <Button icon="arrowhookleft" id="editMode" onClick={this.onToggle} style={{marginLeft: '36px'}} /> : <Button icon="edit" id="editMode" onClick={this.onToggle} style={{marginLeft: '36px'}} />}
					{editMode ?
						<Scroller
							direction="horizontal"
							editable={{
								centered: editableCentered,
								css,
								focusItemFuncRef: this.focusItem,
								hideIndex: this.mutableRef.current.hideIndex,
								hideItemFuncRef: this.hideItem,
								onComplete: this.handleComplete,
								removeItemFuncRef: this.removeItem,
								selectItemBy: 'press',
								showItemFuncRef: this.showItem
							}}
							horizontalScrollbar="auto"
							key={nativeScroll ? 'native' : 'translate'}
							verticalScrollbar="auto"
						>
							{
								items.map((item, index) => {
									return (
										<div aria-label={`Item ${item.index}`} className={css.itemWrapper} data-index={item.index} key={item.index} style={{order: index + 1}}>
											<ContainerDivWithLeaveForConfig className={css.removeButtonContainer}>
												{item.disabled ? null : <Button aria-label="Delete" className={css.removeButton} icon="trash" id="removeItem" onClick={this.onClickRemoveButton} />}
												{item.disabled ? null : <Button aria-label="Hide" className={css.removeButton} icon="minus" id="hideItem" onClick={this.onClickHideButton} />}
												{item.disabled ? <Button aria-label="Show" className={css.removeButton} icon="plus" id="showItem" onClick={this.onClickShowButton} /> : null}
											</ContainerDivWithLeaveForConfig>
											<ImageItem
												className={css.imageItem}
												disabled={item.disabled}
												id={`item${item.index}`}
												onFocus={this.onFocusItem}
												src={item.source}
											>
												{`Item ${item.index}`}
											</ImageItem>
										</div>
									);
								})
							}
						</Scroller> :
						<Scroller
							direction="horizontal"
						>
							<div className={`${css.scrollerWrapper} ${css.wrapper} ${editableCentered ? css.centered : ''}`}> {
								items.map((item, index) => {
									return (
										<div aria-label={`Image ${item.index}`} data-index={item.index} className={`${css.itemWrapper} ${item.disabled ? css.hidden : ''}`} key={item.index} style={{order: index + 1}}>
											<div className={css.removeButtonContainer} />
											<ImageItem
												aria-label={`Image ${item.index}. Edit mode to press and hold OK key`}
												className={css.imageItem}
												disabled={item.disabled}
												id={`item${item.index}`}
												src={item.source}
											>
												{`Item ${item.index}`}
											</ImageItem>
										</div>
									);
								})}
							</div>
						</Scroller>
					}
				</Cell>
			</div>
		);
	}
}

export default ThemeDecorator(app);
