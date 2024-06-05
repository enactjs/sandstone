import kind from '@enact/core/kind';
import {forward} from '@enact/core/handle';
import hoc from '@enact/core/hoc';
import EnactPropTypes from '@enact/core/internal/prop-types';
import {WithRef} from '@enact/core/internal/WithRef';
import Spotlight from '@enact/spotlight';
import IdProvider from '@enact/ui/internal/IdProvider';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import {Component, createRef} from 'react';

import $L from '../internal/$L';
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

		/**
		 * The `id` of DropdownList referred to when setting aria-labelledby
		 *
		 * @type {String}
		 * @private
		 */
		id: PropTypes.string,

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
		 * @type {('huge'|'x-large'|'large'|'medium'|'small'|'tiny')|number}
		 */
		width: PropTypes.oneOfType([
			PropTypes.oneOf(['tiny', 'small', 'medium', 'large', 'x-large', 'huge']),
			PropTypes.number
		])
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
			const {key, ...restChild} = {...child};

			return (
				<Item
					{...rest}
					{...restChild}
					key={key}
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
		className: ({width, styler}) => styler.append(typeof width === 'string' ? width : null),
		dataSize: ({children}) => children ? children.length : 0,
		// Note: Retaining this in case we need to support different item sizes for large text mode:
		// itemSize: ({skinVariants}) => ri.scale(skinVariants && skinVariants.largeText ? 126 : 126)
		itemSize: () => 126
	},

	render: ({dataSize, id, itemSize, scrollTo, width, ...rest}) => {
		delete rest.children;
		delete rest.onSelect;
		delete rest.selected;
		delete rest.skinVariants;
		delete rest.width;

		return (
			<div role="region" aria-labelledby={`${id}_dropdownlist`}>
				<div id={`${id}_dropdownlist`} aria-label={$L('Dropdown list opened')} />
				<VirtualList
					{...rest}
					cbScrollTo={scrollTo}
					dataSize={dataSize}
					itemSize={ri.scale(itemSize)}
					style={{
						height: ri.scaleToRem((itemSize * dataSize) + 36),
						width: typeof width === 'number' ? ri.scaleToRem(width) : null
					}}
				/>
			</div>
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
	const WrappedWithRef = WithRef(Wrapped);

	return class extends Component {
		static displayName = 'DropdownListSpotlightDecorator';

		static propTypes = {
			/*
			 * Passed by DropdownBase to resume Spotlight
			 *
			 * @type {Function}
			 */
			handleSpotlightPause: PropTypes.func,

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
		};

		constructor (props) {
			super(props);

			this.clientSiblingRef = createRef(null);
			this.state = {
				prevChildren: props.children,
				prevFocused: null,
				prevSelected: this.props.selected,
				prevSelectedKey: getKey(props),
				ready: isSelectedValid(props) ? ReadyState.INIT : ReadyState.DONE
			};
		}

		componentDidMount () {
			if (this.props.handleSpotlightPause) {
				this.props.handleSpotlightPause(false);
			}
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
		};

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
				offset: ri.scale(126 * 2), // @sand-item-small-height * 2 (TODO: large text mode not supported!)
				stickTo: 'start' // offset from the top of the dropdown
			});

			this.setState({ready: ReadyState.SCROLLED});
		};

		focusSelected () {
			this.setState({ready: ReadyState.DONE});
		}

		handleFocus = (ev) => {
			const current = ev.target;
			const dropdownListNode = this.clientSiblingRef?.current;

			if (this.state.ready === ReadyState.DONE && !Spotlight.getPointerMode() &&
				current.dataset['index'] != null && dropdownListNode.contains(current)
			) {
				const focusedIndex = Number(current.dataset['index']);
				const lastFocusedKey = getKey({children: this.props.children, selected: focusedIndex});
				this.lastFocusedKey = lastFocusedKey;
			}

			if (this.props.onFocus) {
				this.props.onFocus(ev);
			}
		};

		render () {
			const props = {...this.props};
			delete props.handleSpotlightPause;

			return (
				<WrappedWithRef {...props} onFocus={this.handleFocus} outermostRef={this.clientSiblingRef} referrerName="DropdownList" scrollTo={this.setScrollTo} />
			);
		}
	};
});

const DropdownListDecorator = compose(
	DropdownListSpotlightDecorator,
	IdProvider({
		generateProp: null,
		prefix: 'dl_'
	}),
	Skinnable({variantsProp: 'skinVariants'})
);

const DropdownList = DropdownListDecorator(DropdownListBase);

export default DropdownList;
export {
	DropdownList,
	DropdownListBase,
	isSelectedValid
};
