import classnames from 'classnames';
import handle, {forward} from '@enact/core/handle';
import {mapAndFilterChildren} from '@enact/core/util';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import Spotlight from '@enact/spotlight';
import Pause from '@enact/spotlight/Pause';
import ViewManager, {shape} from '@enact/ui/ViewManager';
import invariant from 'invariant';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';
import ReactDOM from 'react-dom';

import {startCapture, stopCapture} from './captureKeys';
import SharedStateDecorator, {SharedState} from '../SharedStateDecorator';
import {ContextAsDefaults} from './util';

import css from './Viewport.module.less';

const PanelsStateContext = React.createContext({});

/**
 * The container for a set of Panels
 *
 * @class Viewport
 * @memberof sandstone/Panels
 * @private
 */
const ViewportBase = class extends React.Component {
	static displayName = 'Viewport';

	static contextType = SharedState;

	static propTypes = /** @lends sandstone/Panels.Viewport.prototype */ {

		/**
		 * A function that generates a globally-unique identifier for a panel index
		 *
		 * @type {Function}
		 * @required
		 */
		generateId: PropTypes.func.isRequired,

		/**
		 * Set of functions that control how the panels are transitioned into and out of the
		 * viewport
		 *
		 * @type {Arranger}
		 */
		arranger: shape,

		/**
		 * Forwarded as `autoFocus` to each panel.
		 *
		 * If the `Panel` already has an `autoFocus` prop, it is maintained.
		 *
		 * Otherwise, if `autoFocus` is set, the value of this prop is added to the props. If it is
		 * unset, 'default-element' is passed when navigating to a higher index.
		 *
		 * @type {String}
		 */
		autoFocus: PropTypes.string,

		/**
		 * Sets the hint string read when focusing the back button.
		 *
		 * @type {String}
		 */
		backButtonAriaLabel: PropTypes.string,

		/**
		 * The background opacity of the application back button.
		 *
		 * @type {('opaque'|'transparent')}
		 */
		backButtonBackgroundOpacity: PropTypes.oneOf(['opaque', 'transparent']),

		/**
		 * Panels to be rendered
		 *
		 * @type {Panel}
		 */
		children: PropTypes.node,

		/**
		 * Hint string read when focusing the application close button.
		 *
		 * @type {String}
		 */
		closeButtonAriaLabel: PropTypes.string,

		/**
		 * Background opacity of the application close button.
		 *
		 * @type {('opaque'|'transparent')}
		 */
		closeButtonBackgroundOpacity: PropTypes.oneOf(['opaque', 'transparent']),

		/**
		 * Index of the active panel
		 *
		 * @type {Number}
		 * @default 0
		 */
		index: PropTypes.number,

		/**
		 * Disable panel transitions
		 *
		 * @type {Boolean}
		 * @default false
		 */
		noAnimation: PropTypes.bool,

		/**
		 * Omits the back button.
		 *
		 * @type {Boolean}
		 */
		noBackButton: PropTypes.bool,

		/**
		 * Omits the close button.
		 *
		 * @type {Boolean}
		 */
		noCloseButton: PropTypes.bool,

		/**
		 * Called with cancel/back key events.
		 *
		 * @type {Function}
		 */
		onBack: PropTypes.func,

		/**
		 * Called when the app close button is clicked.
		 *
		 * @type {Function}
		 */
		onClose: PropTypes.func,

		/**
		 * Passed to `arranger` for use in determining how to animate.
		 *
		 * @type {Boolean}
		 */
		rtl: PropTypes.bool,

		type: PropTypes.string
	};

	static defaultProps = {
		index: 0,
		noAnimation: false
	};

	constructor () {
		super();

		this.paused = new Pause('Viewport');
		this.state = {
			prevIndex: -1,
			direction: 'forward'
		};
	}

	static getDerivedStateFromProps (props, state) {
		return {
			prevIndex: props.index,
			direction: state.prevIndex > props.index ? 'backward' : 'forward'
		};
	}

	componentDidMount () {
		// eslint-disable-next-line react/no-find-dom-node
		this.node = ReactDOM.findDOMNode(this);
	}

	shouldComponentUpdate ({index}) {
		// FIXME: This is non-standard but is the only API in the current architecture to do this
		// work. It should be refactored in the future in order to not overload this method with
		// side effects.
		if (index !== this.props.index) {
			const current = Spotlight.getCurrent();
			// :scope refers to the current node and allows us to use the direct descendant '>'
			// selector to limit the results to views (and not other components with [data-index])
			const panel = this.node.querySelector(`:scope > [data-index='${this.props.index}']`);

			if (current && panel && panel.contains(current)) {
				current.blur();
			}
		}

		return true;
	}

	componentDidUpdate (prevProps) {
		for (let i = prevProps.index; this.context && i > this.props.index; i--) {
			this.context.delete(i);
		}
	}

	componentWillUnmount () {
		this.resume();
	}

	addTransitioningClass = () => {
		if (this.node) {
			this.node.classList.add(css.transitioning);
		}

		return true;
	};

	removeTransitioningClass = () => {
		if (this.node) {
			this.node.classList.remove(css.transitioning);
		}

		return true;
	};

	pause = () => {
		startCapture();
		this.paused.pause();
	};

	resume = () => {
		stopCapture();
		this.paused.resume();
	};

	handle = handle.bind(this);

	handleTransition = this.handle(
		forward('onTransition'),
		this.removeTransitioningClass,
		this.resume
	);

	handleWillTransition = this.handle(
		forward('onWillTransition'),
		this.addTransitioningClass,
		this.pause
	);

	mapChildren = (children, generateId) => mapAndFilterChildren(children, (child, index) => {
		const {spotlightId = generateId(index, 'panel-container', Spotlight.remove)} = child.props;
		const props = {
			spotlightId,
			'data-index': index
		};

		// Respect Panel-configured autoFocus if it is set
		if (child.props.autoFocus == null) {
			if (this.props.autoFocus) {
				// if not and Viewport-wide autoFocus is configured, use it
				props.autoFocus = this.props.autoFocus;
			} else if (this.state.direction === 'forward') {
				// Otherwise, only set autofocus when moving forward
				props.autoFocus = 'default-element';
			}
		}

		return React.cloneElement(child, props);
	});

	getEnteringProp = (noAnimation) => noAnimation ? null : 'hideChildren';

	render () {
		const {
			arranger,
			children,
			generateId,
			index,
			noAnimation,
			rtl,
			type,
			...rest
		} = this.props;

		const enteringProp = this.getEnteringProp(noAnimation);
		const mappedChildren = this.mapChildren(children, generateId);
		const className = classnames(css.viewport, rest.className);

		const count = React.Children.count(mappedChildren);
		invariant(
			index === 0 && count === 0 || index < count,
			`Panels index, ${index}, is invalid for number of children, ${count}`
		);

		// Relay each of the state-specific props to the context
		const panelsContext = {
			type,
			index,
			count
		};

		delete rest.className;
		return (
			<PanelsStateContext.Provider value={panelsContext}>
				<ViewManager
					{...rest}
					arranger={arranger}
					className={className}
					component="main"
					duration={250}
					enteringDelay={100} // TODO: Can we remove this?
					enteringProp={enteringProp}
					index={index}
					noAnimation={noAnimation}
					onTransition={this.handleTransition}
					onWillTransition={this.handleWillTransition}
					rtl={rtl}
				>
					{mappedChildren}
				</ViewManager>
			</PanelsStateContext.Provider>
		);
	}
};

const ViewportDecorator = compose(
	ContextAsDefaults,
	SharedStateDecorator,
	I18nContextDecorator({rtlProp: 'rtl'})
);

const Viewport = ViewportDecorator(ViewportBase);

export default Viewport;
export {
	PanelsStateContext,
	Viewport,
	ViewportBase,
	ViewportDecorator
};
