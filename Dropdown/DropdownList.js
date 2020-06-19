import kind from '@enact/core/kind';
import {forward} from '@enact/core/handle';
import hoc from '@enact/core/hoc';
import EnactPropTypes from '@enact/core/internal/prop-types';
import Spotlight from '@enact/spotlight';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';
import ReactDOM from 'react-dom';

import Icon from '../Icon';
import Item from '../Item';
import Skinnable from '../Skinnable';
import VirtualList from '../VirtualList';

import css from './Dropdown.module.less';
import {compareChildren} from '../internal/util';

const isSelectedValid = ({children, selected}) => Array.isArray(children) && children[selected] != null;

const getKey = ({children, selected}) => {
	if (isSelectedValid({children, selected})) {
		return children[selected].key;
	}
};

const indexFromKey = (children, key) => {
	let index = -1;
	if (children) {
		index = children.findIndex(child => child.key === key);
	}

	return index;
};

const DropdownListBase = kind({
	name: 'DropdownListBase',

	propTypes: {
		/*
		 * The selections for Dropdown
		 *
		 * @type {String[]|Array.<{key: (Number|String), children: (String|Component)}>}
		 */
		children: PropTypes.oneOfType([
			PropTypes.arrayOf(PropTypes.string),
			PropTypes.arrayOf(PropTypes.shape({
				children: EnactPropTypes.renderable.isRequired,
				key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
			}))
		]),

		/*
		 * Called when an item is selected.
		 *
		 * @type {Function}
		 */
		onSelect: PropTypes.func,

		/*
		 * Callback function that will receive the scroller's scrollTo() method
		 *
		 * @type {Function}
		 */
		scrollTo: PropTypes.func,

		/*
		 * Index of the selected item.
		 *
		 * @type {Number}
		 */
		selected: PropTypes.number,

		/*
		 * State of possible skin variants.
		 *
		 * Used to scale the `itemSize` of the `VirtualList` based on large-text mode
		 *
		 * @type {Object}
		 */
		skinVariants: PropTypes.object,

		/*
		 * The width of DropdownList.
		 *
		 * @type {('huge'|'x-large'|'large'|'medium'|'small'|'tiny')}
		 */
		width: PropTypes.oneOf(['tiny', 'small', 'medium', 'large', 'x-large', 'huge'])
	},

	styles: {
		css,
		className: 'dropdownList'
	},

	handlers: {
		itemRenderer: ({index, ...rest}, props) => {
			const {children, selected} = props;
			const isSelected = index === selected;
			const slotAfter = isSelected ? (<Icon>check</Icon>) : null;

			let child = children[index];
			if (typeof child === 'string') {
				child = {children: child};
			}
			const data = child.children;

			return (
				<Item
					{...rest}
					{...child}
					slotAfter={slotAfter}
					data-selected={isSelected}
					// eslint-disable-next-line react/jsx-no-bind
					onClick={() => forward('onSelect', {data, selected: index}, props)}
					size="small"
				/>
			);
		}
	},

	computed: {
		className: ({width, styler}) => styler.append(width),
		dataSize: ({children}) => children ? children.length : 0,
		// Note: Retaining this in case we need to support different item sizes for large text mode:
		// itemSize: ({skinVariants}) => ri.scale(skinVariants && skinVariants.largeText ? 156 : 156)
		itemSize: () => 126
	},

	render: ({dataSize, itemSize, scrollTo, ...rest}) => {
		delete rest.children;
		delete rest.onSelect;
		delete rest.selected;
		delete rest.skinVariants;
		delete rest.width;

		return (
			<VirtualList
				{...rest}
				cbScrollTo={scrollTo}
				dataSize={dataSize}
				itemSize={ri.scale(itemSize)}
				style={{height: ri.scaleToRem((itemSize * dataSize) + 36)}}
			/>
		);
	}
});

const ReadyState = {
	// Initial state. Scrolling and focusing pending
	INIT: 0,
	// Scroll requested
	SCROLLED: 1,
	// Focus completed or not required
	DONE: 2
};

const DropdownListSpotlightDecorator = hoc((config, Wrapped) => {
	return class extends React.Component {
		static displayName = 'DropdownListSpotlightDecorator'

		static propTypes = {
			/*
			 * Called when an item receives focus.
			 *
			 * @type {Function}
			 */
			onFocus: PropTypes.func,

			/*
			 * Index of the selected item.
			 *
			 * @type {Number}
			 */
			selected: PropTypes.number
		}

		constructor (props) {
			super(props);

			this.state = {
				prevChildren: props.children,
				prevFocused: null,
				prevSelected: this.props.selected,
				prevSelectedKey: getKey(props),
				ready: isSelectedValid(props) ? ReadyState.INIT : ReadyState.DONE
			};
		}

		componentDidMount () {
			// eslint-disable-next-line react/no-find-dom-node
			this.node = ReactDOM.findDOMNode(this);
			Spotlight.set(this.node.dataset.spotlightId, {
				defaultElement: '[data-selected="true"]',
				enterTo: 'default-element'
			});
		}

		componentDidUpdate () {
			if (this.state.ready === ReadyState.INIT) {
				this.scrollIntoView();
			} else if (this.state.ready === ReadyState.SCROLLED) {
				this.focusSelected();
			} else {
				const key = getKey(this.props);
				const keysDiffer = key && this.state.prevSelectedKey && key !== this.state.prevSelectedKey;

				if (keysDiffer ||
					((!key || !this.state.prevSelectedKey) && this.state.prevSelected !== this.props.selected) ||
					!compareChildren(this.state.prevChildren, this.props.children)
				) {
					this.resetFocus(keysDiffer);
				}
			}
		}

		setScrollTo = (scrollTo) => {
			this.scrollTo = scrollTo;
		}

		resetFocus (keysDiffer) {
			let adjustedFocusIndex;

			if (!keysDiffer && this.lastFocusedKey) {
				const targetIndex = indexFromKey(this.props.children, this.lastFocusedKey);
				if (targetIndex >= 0) {
					adjustedFocusIndex = targetIndex;
				}
			}

			this.setState({
				prevChildren: this.props.children,
				prevFocused: adjustedFocusIndex,
				prevSelected: this.props.selected,
				prevSelectedKey: getKey(this.props),
				ready: ReadyState.INIT
			});
		}

		scrollIntoView = () => {
			let {selected} = this.props;

			if (this.state.prevFocused == null && !isSelectedValid(this.props)) {
				selected = 0;
			} else if (this.state.prevFocused != null) {
				selected = this.state.prevFocused;
			}

			this.scrollTo({
				animate: false,
				focus: true,
				index: selected,
				offset: ri.scale(312), // @sand-item-height * 2
				stickTo: 'start' // offset from the top of the dropdown
			});

			this.setState({ready: ReadyState.SCROLLED});
		}

		focusSelected () {
			this.setState({ready: ReadyState.DONE});
		}

		handleFocus = (ev) => {
			const current = ev.target;
			if (this.state.ready === ReadyState.DONE && !Spotlight.getPointerMode() &&
				current.dataset['index'] != null && this.node.contains(current)
			) {
				const focusedIndex = Number(current.dataset['index']);
				const lastFocusedKey = getKey({children: this.props.children, selected: focusedIndex});
				this.lastFocusedKey = lastFocusedKey;
			}

			if (this.props.onFocus) {
				this.props.onFocus(ev);
			}
		}

		render () {
			return (
				<Wrapped {...this.props} onFocus={this.handleFocus} scrollTo={this.setScrollTo} />
			);
		}
	};
});

const DropdownListDecorator = compose(
	DropdownListSpotlightDecorator,
	Skinnable({variantsProp: 'skinVariants'})
);

const DropdownList = DropdownListDecorator(DropdownListBase);

export default DropdownList;
export {
	DropdownList,
	DropdownListBase,
	isSelectedValid
};
