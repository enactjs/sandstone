import Cell from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import {Component, createRef} from 'react';

import Button from '../../../../../Button/Button';
import css from './ScrollerWithEditableSelectItemByLongPress.module.less';
import ImageItem from '../../../../../ImageItem';
import {InputField} from '../../../../../Input';
import Scroller from '../../../../../Scroller/Scroller';
import ThemeDecorator from '../../../../../ThemeDecorator/ThemeDecorator';

const ScrollerContainer = SpotlightContainerDecorator('div');
const OptionsContainer = SpotlightContainerDecorator({leaveFor: {down: '#left'}}, 'div');

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const imageItems = [];

const updateDataSize = (dataSize) => {
	imageItems.length = 0;

	for (let i = 0; i < dataSize; i++) {
		const index = i;
		const color = Math.floor(Math.random() * (0x1000000 - 0x101010) + 0x101010).toString(16);
		const source = {
			hd: `https://placehold.co/200x200/${color}/ffffff/png?text=Image+${index}`,
			fhd: `https://placehold.co/300x300/${color}/ffffff/png?text=Image+${index}`,
			uhd: `https://placehold.co/600x600/${color}/ffffff/png?text=Image+${index}`
		};
		imageItems.push({source, index});
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
			items: imageItems
		};
		this.removeItem = createRef();
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
		const {orders} = ev;
		// change data from the new orders
		const newItems = [];

		orders.forEach(order => {
			newItems.push(this.state.items[order - 1]);
		});
		this.setState({items: newItems});
	};

	onClickRemoveButton = (ev) => {
		if (this.removeItem.current) {
			this.removeItem.current();
		}
		ev.preventDefault();
	};

	render () {
		const {editableCentered, nativeScroll, numItems, items} = this.state;
		const buttonDefaultProps = {minWidth: false, size: 'small'};
		const scrollMode = nativeScroll ? 'NativeScroll' : 'TranslateScroll';
		const inputStyle = {width: ri.scaleToRem(300)};
		return (
			<div {...this.props} id="scroller">
				<Cell component={OptionsContainer} shrink>
					<Button {...buttonDefaultProps} id="nativeScroll" onClick={this.onToggle}>{scrollMode}</Button>
					<Button {...buttonDefaultProps} id="editableCentered" onClick={this.onToggle}>EditableCentered</Button>
					<InputField id="numItems" defaultValue={numItems} type="number" onChange={this.onChangeNumItems} size="small" style={inputStyle} />
				</Cell >
				<Cell component={ScrollerContainer}>
					<Scroller
						dataSize={numItems}
						direction="horizontal"
						horizontalScrollbar="auto"
						key={nativeScroll ? 'native' : 'translate'}
						verticalScrollbar="auto"
						editable={{
							centered:editableCentered,
							css,
							onComplete: this.handleComplete,
							removeItemFuncRef: this.removeItem
						}}
					>
						{
							items.map((item, index) => {
								return (
									<div key={item.index} className={css.itemWrapper} data-index={item.index} style={{order: index + 1}}>
										<div className={css.removeButtonContainer}>
											<Button className={css.removeButton} id="removeItem" onClick={this.onClickRemoveButton} icon="trash" />
										</div>
										<ImageItem
											className={css.imageItem}
											id={`item${item.index}`}
											src={item.source}
											style={{width: ri.scale(600), height: ri.scale(480)}}
										>
											{`Image ${item.index}`}
										</ImageItem>
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
