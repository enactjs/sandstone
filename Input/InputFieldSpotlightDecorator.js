import {
	call,
	forward, forwardCustom, forwardWithPrevent, handle, stopImmediate} from '@enact/core/handle';
import hoc from '@enact/core/hoc';
import {is} from '@enact/core/keymap';
import {getDirection, Spotlight} from '@enact/spotlight';
import Pause from '@enact/spotlight/Pause';
import Spottable from '@enact/spotlight/Spottable';
import PropTypes from 'prop-types';
import {
	// Component as ReactComponent,
	useCallback, useEffect, useMemo, useRef, useState
} from 'react';

import {lockPointer, releasePointer} from './pointer';

const isBubbling = (ev) => ev.currentTarget !== ev.target;

// A regex to check for input types that allow selectionStart
const SELECTABLE_TYPES = /text|password|search|tel|url/;

const isSelectionAtLocation = (target, location) => {
	if (SELECTABLE_TYPES.test(target.type)) {
		return target.selectionStart === location;
	} else {
		return true;
	}
};

// const handleKeyDown = handle(
// 	forwardWithPrevent('onKeyDown'),
// 	call('onKeyDown')
// );

/**
 * Default config for {@link sandstone/Input.InputSpotlightDecorator|InputSpotlightDecorator}
 *
 * @memberof sandstone/Input/InputSpotlightDecorator.InputSpotlightDecorator
 * @hocconfig
 */
const defaultConfig = {
	/**
	 * Suppress the pointer lock behavior of sandstone input
	 *
	 * @type {Boolean}
	 * @default false
	 * @memberof sandstone/Input/InputSpotlightDecorator.InputSpotlightDecorator.defaultConfig
	*/
	noLockPointer: false
};

/**
 * A higher-order component that manages the
 * spotlight behavior for an {@link sandstone/Input.Input}
 *
 * @class InputSpotlightDecorator
 * @memberof sandstone/Input/InputSpotlightDecorator
 * @hoc
 * @private
 */
// const InputSpotlightDecorator = hoc(defaultConfig, (config, Wrapped) => {
// 	const {noLockPointer} = config;
// 	const Component = Spottable({emulateMouse: false}, Wrapped);
// 	const forwardBlur = forward('onBlur');
// 	const forwardMouseDown = forward('onMouseDown');
// 	const forwardFocus = forward('onFocus');
// 	const forwardKeyUp = forward('onKeyUp');
//
// 	return class extends ReactComponent {
// 		static displayName = 'InputSpotlightDecorator';
//
// 		static propTypes = /** @lends sandstone/Input/InputSpotlightDecorator.InputSpotlightDecorator.prototype */ {
// 			/**
// 			 * Focuses the <input> when the decorator is focused via 5-way.
// 			 *
// 			 * @type {Boolean}
// 			 * @default false
// 			 * @public
// 			 */
// 			autoFocus: PropTypes.bool,
//
// 			/**
// 			 * Applies a disabled style and the control becomes non-interactive.
// 			 *
// 			 * @type {Boolean}
// 			 * @default false
// 			 * @public
// 			 */
// 			disabled: PropTypes.bool,
//
// 			/**
// 			 * Blurs the input when the "enter" key is pressed.
// 			 *
// 			 * @type {Boolean}
// 			 * @default false
// 			 * @public
// 			 */
// 			dismissOnEnter: PropTypes.bool,
//
// 			/**
// 			 * Called when the internal <input> is focused.
// 			 *
// 			 * @type {Function}
// 			 * @param {Object} event
// 			 * @public
// 			 */
// 			onActivate: PropTypes.func,
//
// 			/**
// 			 * Called when the internal <input> loses focus.
// 			 *
// 			 * @type {Function}
// 			 * @param {Object} event
// 			 * @public
// 			 */
// 			onDeactivate: PropTypes.func,
//
// 			/**
// 			 * Called when the component is removed while retaining focus.
// 			 *
// 			 * @type {Function}
// 			 * @param {Object} event
// 			 * @public
// 			 */
// 			onSpotlightDisappear: PropTypes.func,
//
// 			/**
// 			 * Disables spotlight navigation into the component.
// 			 *
// 			 * @type {Boolean}
// 			 * @default false
// 			 * @public
// 			 */
// 			spotlightDisabled: PropTypes.bool
// 		};
//
// 		constructor (props) {
// 			super(props);
//
// 			this.focused = null;
// 			this.node = null;
// 			this.fromMouse = false;
// 			this.paused = new Pause('InputSpotlightDecorator');
// 			this.handleKeyDown = handleKeyDown.bind(this);
// 			this.prevStatus = {
// 				focused: null,
// 				node: null
// 			};
// 		}
//
// 		componentWillUnmount () {
// 			this.paused.resume();
//
// 			if (this.focused === 'input') {
// 				const {onSpotlightDisappear} = this.props;
//
// 				if (onSpotlightDisappear) {
// 					onSpotlightDisappear();
// 				}
//
// 				if (!noLockPointer) {
// 					releasePointer(this.node);
// 				}
// 			}
// 		}
//
// 		updateFocus = () => {
// 			// focus node if `InputSpotlightDecorator` is pausing Spotlight or if Spotlight is paused
// 			if (
// 				this.node &&
// 				Spotlight.getCurrent() !== this.node &&
// 				(this.paused.isPaused() || !Spotlight.isPaused())
// 			) {
// 				if (this.fromMouse) {
// 					this.node.focus({preventScroll: true});
// 				} else {
// 					this.node.focus();
// 				}
// 			}
//
// 			const focusChanged = this.focused !== this.prevStatus.focused;
// 			if (focusChanged) {
// 				if (this.focused === 'input') {
// 					forwardCustom('onActivate')(null, this.props);
// 					if (!noLockPointer) {
// 						lockPointer(this.node);
// 					}
// 					this.paused.pause();
// 				} else if (this.prevStatus.focused === 'input') {
// 					forwardCustom('onDeactivate')(null, this.props);
// 					if (!noLockPointer) {
// 						releasePointer(this.prevStatus.node);
// 					}
// 					this.paused.resume();
// 				}
// 			}
//
// 			this.prevStatus.focused = this.focused;
// 			this.prevStatus.node = this.node;
// 		};
//
// 		focus = (focused, node, fromMouse) => {
// 			this.focused = focused;
// 			this.node = node;
// 			this.fromMouse = fromMouse;
// 			this.updateFocus();
// 		};
//
// 		blur = () => {
// 			if (this.focused || this.node) {
// 				this.focused = null;
// 				this.node = null;
// 				this.updateFocus();
// 			}
// 		};
//
// 		focusDecorator = (decorator) => {
// 			this.focus('decorator', decorator, false);
// 		};
//
// 		focusInput = (decorator, fromMouse) => {
// 			this.focus('input', decorator.querySelector('input'), fromMouse);
// 		};
//
// 		onBlur = (ev) => {
// 			if (!this.props.autoFocus) {
// 				if (isBubbling(ev)) {
// 					if (Spotlight.getPointerMode()) {
// 						this.blur();
// 						forwardBlur(ev, this.props);
// 					} else {
// 						this.focused = 'decorator';
// 						this.node = ev.currentTarget;
// 						this.fromMouse = false;
// 						ev.stopPropagation();
// 					}
// 				} else if (!ev.currentTarget.contains(ev.relatedTarget)) {
// 					// Blurring decorator but not focusing input
// 					forwardBlur(ev, this.props);
// 					this.blur();
// 				}
// 			} else if (isBubbling(ev)) {
// 				if (this.focused === 'input' && this.node === ev.target && ev.currentTarget !== ev.relatedTarget) {
// 					this.blur();
// 					forwardBlur(ev, this.props);
// 				} else {
// 					this.focusDecorator(ev.currentTarget);
// 					ev.stopPropagation();
// 					this.blur();
// 				}
// 			}
// 		};
//
// 		onMouseDown = (ev) => {
// 			const {disabled, spotlightDisabled} = this.props;
//
// 			this.setDownTarget(ev);
// 			// focus the <input> whenever clicking on any part of the component to ensure both that
// 			// the <input> has focus and Spotlight is paused.
// 			if (!disabled && !spotlightDisabled) {
// 				this.focusInput(ev.currentTarget, true);
// 			}
//
// 			forwardMouseDown(ev, this.props);
// 		};
//
// 		onFocus = (ev) => {
// 			forwardFocus(ev, this.props);
//
// 			// when in autoFocus mode, focusing the decorator directly will cause it to
// 			// forward the focus onto the <input>
// 			if (!isBubbling(ev) && (this.props.autoFocus && this.focused === null && !Spotlight.getPointerMode())) {
// 				this.focusInput(ev.currentTarget, false);
// 				ev.stopPropagation();
// 			}
// 		};
//
// 		onKeyDown (ev) {
// 			const {currentTarget, keyCode, target} = ev;
//
// 			// cache the target if this is the first keyDown event to ensure the component had focus
// 			// when the key interaction started
// 			this.setDownTarget(ev);
//
// 			if (this.focused === 'input') {
// 				const isDown = is('down', keyCode);
// 				const isLeft = is('left', keyCode);
// 				const isRight = is('right', keyCode);
// 				const isUp = is('up', keyCode);
//
// 				// move spotlight
// 				const shouldSpotlightMove = (
// 					// No value exists! (Can happen when disabled)
// 					target.value == null ||
// 					// on left + at beginning of selection
// 					(isLeft && isSelectionAtLocation(target, 0)) ||
// 					// on right + at end of selection (note: fails on non-selectable types usually)
// 					(isRight && isSelectionAtLocation(target, target.value.length)) ||
// 					// on up
// 					isUp ||
// 					// on down
// 					isDown
// 				);
//
// 				// prevent modifying the value via 5-way for numeric fields
// 				if ((isUp || isDown) && target.type === 'number') {
// 					ev.preventDefault();
// 				}
//
// 				if (shouldSpotlightMove) {
// 					const direction = getDirection(keyCode);
// 					const {getPointerMode, move, setPointerMode} = Spotlight;
//
// 					if (getPointerMode()) {
// 						setPointerMode(false);
// 					}
//
// 					stopImmediate(ev);
// 					this.paused.resume();
//
// 					// Move spotlight in the keypress direction
// 					if (move(direction)) {
// 						// if successful, reset the internal state
// 						this.blur();
// 					} else {
// 						// if there is no other spottable elements, focus `InputDecorator` instead
// 						this.focusDecorator(currentTarget);
// 					}
// 				} else if (isLeft || isRight) {
// 					// prevent 5-way nav for left/right keys within the <input>
// 					stopImmediate(ev);
// 				}
// 			}
// 		}
//
// 		onKeyUp = (ev) => {
// 			const {dismissOnEnter} = this.props;
// 			const {currentTarget, keyCode, target} = ev;
//
// 			// verify that we have a matching pair of key down/up events to avoid adjusting focus
// 			// when the component received focus mid-press
// 			if (target === this.downTarget) {
// 				this.downTarget = null;
//
// 				if (!this.props.disabled) {
// 					if (this.focused === 'input' && dismissOnEnter && is('enter', keyCode)) {
// 						this.focusDecorator(currentTarget);
// 						// prevent Enter onKeyPress which triggers an onMouseDown via Spotlight
// 						ev.preventDefault();
// 					} else if (this.focused !== 'input' && is('enter', keyCode)) {
// 						this.focusInput(currentTarget, false);
// 					}
// 				}
// 			}
//
// 			forwardKeyUp(ev, this.props);
// 		};
//
// 		setDownTarget (ev) {
// 			const {repeat, target} = ev;
//
// 			if (!repeat) {
// 				this.downTarget = target;
// 			}
// 		}
//
// 		render () {
// 			const props = Object.assign({}, this.props);
// 			delete props.autoFocus;
// 			delete props.onActivate;
// 			delete props.onDeactivate;
//
// 			return (
// 				<Component
// 					{...props}
// 					onBlur={this.onBlur}
// 					onMouseDown={this.onMouseDown}
// 					onFocus={this.onFocus}
// 					onKeyDown={this.handleKeyDown}
// 					onKeyUp={this.onKeyUp}
// 				/>
// 			);
// 		}
// 	};
// });

/**
 * A higher-order component that manages the
 * spotlight behavior for an {@link sandstone/Input.Input}
 *
 * @class InputSpotlightDecorator
 * @memberof sandstone/Input/InputSpotlightDecorator
 * @hoc
 * @private
 */const InputSpotlightDecorator = hoc(defaultConfig, (config, Wrapped) => {
	const {noLockPointer} = config;
	const Component = Spottable({emulateMouse: false}, Wrapped);
	const forwardBlur = forward('onBlur');
	const forwardMouseDown = forward('onMouseDown');
	const forwardFocus = forward('onFocus');
	const forwardKeyUp = forward('onKeyUp');

	const InputSpotlight = ({...props}) => {
		const {onSpotlightDisappear} = props;
		const paused = useMemo(() => new Pause('InputSpotlightDecorator'), []);
		const [downTarget, setDownTarget] = useState();
		// const [focused, setFocused] = useState(null);
		const focused = useRef(null);
		const [fromMouse, setFromMouse] = useState(false);
		// const [node, setNode] = useState(null);
		const node = useRef(null);
		// const [prevStatus, setPrevStatus] = useState({
		// 	focused: null,
		// 	node: null
		// });

		const prevStatus = useRef({
			focused: null,
			node: null
		});

		useEffect(() => {
			return () => {
				paused.resume();

				if (focused.current === 'input') {
					if (onSpotlightDisappear) {
						onSpotlightDisappear();
					}

					if (!noLockPointer) {
						releasePointer(node.current);
					}
				}
			};
		}, [paused, onSpotlightDisappear]);
		// }, []);

		const updateFocus = useCallback(() => {
			// focus node if `InputSpotlightDecorator` is pausing Spotlight or if Spotlight is paused
			if (
				node.current &&
				Spotlight.getCurrent() !== node.current &&
				(paused.isPaused() || !Spotlight.isPaused())
			) {
				if (fromMouse) {
					node.current.focus({preventScroll: true});
				} else {
					node.current.focus();
				}
			}

			const focusChanged = focused.current !== prevStatus.current.focused;
			if (focusChanged) {
				if (focused.current === 'input') {
					forwardCustom('onActivate')(null, props);
					if (!noLockPointer) {
						lockPointer(node.current);
					}
					paused.pause();
				} else if (prevStatus.current.focused === 'input') {
					forwardCustom('onDeactivate')(null, props);
					if (!noLockPointer) {
						releasePointer(prevStatus.current.node);
					}
					paused.resume();
				}
			}

			prevStatus.current = {focused: focused.current, node: node.current};
		}, [fromMouse, paused, props]);

		const focus = useCallback((focusedValue, nodeValue, fromMouseValue) => {
			focused.current = focusedValue;
			setFromMouse(fromMouseValue);
			node.current = nodeValue;
			updateFocus();
		}, [updateFocus]);

		const blur = useCallback(() => {
			if (focused.current || node.current) {
				focused.current = null;
				node.current = null;
				updateFocus();
			}
		}, [updateFocus]);

		const focusDecorator = useCallback((decorator) => {
			focus('decorator', decorator, false);
		}, [focus]);

		const focusInput = useCallback((decorator, fromMouseValue) => {
			focus('input', decorator.querySelector('input'), fromMouseValue);
		}, [focus]);

		const onBlur = useCallback((ev) => {
			if (!props.autoFocus) {
				if (isBubbling(ev)) {
					if (Spotlight.getPointerMode()) {
						blur();
						forwardBlur(ev, props);
					} else {
						focused.current = 'decorator';
						setFromMouse(false);
						node.current = ev.currentTarget;
						ev.stopPropagation();
					}
				} else if (!ev.currentTarget.contains(ev.relatedTarget)) {
					// Blurring decorator but not focusing input
					forwardBlur(ev, props);
					blur();
				}
			} else if (isBubbling(ev)) {
				if (focused.current === 'input' && node.current === ev.target && ev.currentTarget !== ev.relatedTarget) {
					blur();
					forwardBlur(ev, props);
				} else {
					focusDecorator(ev.currentTarget);
					ev.stopPropagation();
					blur();
				}
			}
		}, [blur, focusDecorator, props]);

		const updateDownTarget = (ev) => {
			const {repeat, target} = ev;

			if (!repeat) {
				setDownTarget(target);
			}
		};

		const onMouseDown = useCallback((ev) => {
			const {disabled, spotlightDisabled} = props;

			updateDownTarget(ev);
			// focus the <input> whenever clicking on any part of the component to ensure both that
			// the <input> has focus and Spotlight is paused.
			if (!disabled && !spotlightDisabled) {
				focusInput(ev.currentTarget, true);
			}

			forwardMouseDown(ev, props);
		}, [focusInput, props]);

		const onFocus = useCallback((ev) => {
			forwardFocus(ev, props);

			// when in autoFocus mode, focusing the decorator directly will cause it to
			// forward the focus onto the <input>
			if (!isBubbling(ev) && (props.autoFocus && focused.current === null && !Spotlight.getPointerMode())) {
				focusInput(ev.currentTarget, false);
				ev.stopPropagation();
			}
		}, [focusInput, props]);

		const onKeyDown = (ev) => {
			const {currentTarget, keyCode, target} = ev;

			// cache the target if this is the first keyDown event to ensure the component had focus
			// when the key interaction started
			updateDownTarget(ev);

			if (focused.current === 'input') {
				const isDown = is('down', keyCode);
				const isLeft = is('left', keyCode);
				const isRight = is('right', keyCode);
				const isUp = is('up', keyCode);

				// move spotlight
				const shouldSpotlightMove = (
					// No value exists! (Can happen when disabled)
					target.value == null ||
					// on left + at beginning of selection
					(isLeft && isSelectionAtLocation(target, 0)) ||
					// on right + at end of selection (note: fails on non-selectable types usually)
					(isRight && isSelectionAtLocation(target, target.value.length)) ||
					// on up
					isUp ||
					// on down
					isDown
				);

				// prevent modifying the value via 5-way for numeric fields
				if ((isUp || isDown) && target.type === 'number') {
					ev.preventDefault();
				}

				if (shouldSpotlightMove) {
					const direction = getDirection(keyCode);
					const {getPointerMode, move, setPointerMode} = Spotlight;

					if (getPointerMode()) {
						setPointerMode(false);
					}

					stopImmediate(ev);
					paused.resume();

					// Move spotlight in the keypress direction
					if (move(direction)) {
						// if successful, reset the internal state
						blur();
					} else {
						// if there is no other spottable elements, focus `InputDecorator` instead
						focusDecorator(currentTarget);
					}
				} else if (isLeft || isRight) {
					// prevent 5-way nav for left/right keys within the <input>
					stopImmediate(ev);
				}
			}
		};

		const handleKeyDown = handle(
			forwardWithPrevent('onKeyDown'),
			call('onKeyDown'),
			(ev) => onKeyDown(ev)
		);

		const onKeyUp = useCallback((ev) => {
			const {dismissOnEnter} = props;
			const {currentTarget, keyCode, target} = ev;

			// verify that we have a matching pair of key down/up events to avoid adjusting focus
			// when the component received focus mid-press
			if (target === downTarget) {
				setDownTarget(null);

				if (!props.disabled) {
					if (focused.current === 'input' && dismissOnEnter && is('enter', keyCode)) {
						focusDecorator(currentTarget);
						// prevent Enter onKeyPress which triggers an onMouseDown via Spotlight
						ev.preventDefault();
					} else if (focused.current !== 'input' && is('enter', keyCode)) {
						focusInput(currentTarget, false);
					}
				}
			}

			forwardKeyUp(ev, props);
		}, [downTarget, focusDecorator, focusInput, props]);

		const newProps = Object.assign({}, props);
		delete newProps.autoFocus;
		delete newProps.onActivate;
		delete newProps.onDeactivate;

		console.log(focused);

		return (
			<Component
				{...newProps}
				onBlur={onBlur}
				onMouseDown={onMouseDown}
				onFocus={onFocus}
				onKeyDown={handleKeyDown}
				onKeyUp={onKeyUp}
			/>
		);
	};
	InputSpotlight.displayName = 'InputSpotlightDecorator';
	InputSpotlight.propTypes = /** @lends sandstone/Input/InputSpotlightDecorator.InputSpotlightDecorator.prototype */ {
		/**
		 * Focuses the <input> when the decorator is focused via 5-way.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		autoFocus: PropTypes.bool,

		/**
		 * Applies a disabled style and the control becomes non-interactive.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * Blurs the input when the "enter" key is pressed.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		dismissOnEnter: PropTypes.bool,

		/**
		 * Called when the internal <input> is focused.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @public
		 */
		onActivate: PropTypes.func,

		/**
		 * Called when the internal <input> loses focus.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @public
		 */
		onDeactivate: PropTypes.func,

		/**
		 * Called when the component is removed while retaining focus.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @public
		 */
		onSpotlightDisappear: PropTypes.func,

		/**
		 * Disables spotlight navigation into the component.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		spotlightDisabled: PropTypes.bool
	};

	return InputSpotlight;
});

export default InputSpotlightDecorator;
export {InputSpotlightDecorator};
