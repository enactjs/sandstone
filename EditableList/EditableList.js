/**
 * Sandstone styled EditableList components
 *
 *
 * @module sandstone/EditableList
 * @exports EditableList
 */

import {forwardCustom} from '@enact/core/handle';
import {is} from '@enact/core/keymap';
import {clamp} from '@enact/core/util';
import Scroller from '@enact/sandstone/Scroller';
import classNames from 'classnames';
import {useCallback, useEffect, useRef} from 'react';

import css from './EditableList.module.less';

const hoverArea = 150;
const hoverToScrollMultiplier = 0.03;

const EditableList = (props) => {
	const {centered, children, dataSize} = props;
	const itemOffsetRef = useRef();
	const containerRef = useRef();
	const selectedItem = useRef(); // If this value is not null, we are editing
	const fromIndex = useRef();
	const prevFromIndex = useRef();
	const prevToIndex = useRef();
	const doms = useRef([]);
	const canAdd = useRef(true);
	const flow = useRef();
	const rafId = useRef(null);

	const finalizeOrder = useCallback(() => {
		// finalize the order
		if (doms.current.length > 0) {
			let selectedOrder = selectedItem.current.style.order;
			const factor = flow.current > 0 ? 1 : -1;
			const changedOrder = [];

			console.log("factor: " , factor);

			doms.current.forEach((dom) => {
				const order = Number(dom.style.order);
				console.log("forEach ", order);
				selectedOrder = order;
				dom.style.order = order - factor;
				dom.classList.remove(css.hoveredTransform);
				dom.classList.remove(css.hovered);
				if (factor > 0) {
					changedOrder.push(order);
				} else {
					changedOrder.unshift(order);
				}
			});
			console.log(changedOrder);

			if (factor > 0) {
				console.log(changedOrder);
				changedOrder.push(Number(selectedItem.current.style.order));
			} else {
				changedOrder.unshift(Number(selectedItem.current.style.order));
			}

			doms.current = [];
			selectedItem.current.style.order = selectedOrder;

			//create order array
			const orders = Array.from({length: dataSize}, (_, i) => i + 1)
			console.log(orders);
			console.log("changed Orders:", changedOrder);
			console.log("fromIndex: ", fromIndex.current);
			console.log("prevToIndex: ", prevToIndex.current);
			orders.splice(Math.min(fromIndex.current, prevToIndex.current), changedOrder.length, ...changedOrder);
			console.log(orders);
			forwardCustom('onComplete', (ev) => ({orders}))({}, props);
		}

		selectedItem.current.classList.remove(css.selected);
		selectedItem.current.classList.remove(css.hovered);
		selectedItem.current.classList.remove(css.selectedTransform);
		selectedItem.current = null;
		flow.current = null;
		prevToIndex.current = null;
		containerRef.current.style.setProperty('--item-offset', '0px');

	}, [dataSize, props]);

	const startEditing = useCallback((item) => {
		// add selected transition to selected item
		// FIXME: Need to figure out the right element
		if (item.classList.contains('spottable')) {
			item.classList.add(css.selected);
			item.classList.add(css.selectedTransform);
			selectedItem.current = item;

			fromIndex.current = Number(item.style.order) - 1;
			prevFromIndex.current = prevToIndex.current = fromIndex.current;
			console.log("fromIndex:", fromIndex.current);
		}
	}, []);

	const handleClick = useCallback((ev) => {
		if (selectedItem.current) {
			finalizeOrder();
		} else {
			// add selected transition to selected item
			startEditing(ev.target.parentElement);
		}
	}, [finalizeOrder, startEditing]);

	const moveSiblings = useCallback(({direction, toIndex, diff}) => {
		const curItem = selectedItem.current;

		if (direction > 0) {
			containerRef.current.style.setProperty('--moving-sign', direction);
			let sibling = curItem.nextElementSibling;
			let i = toIndex;
			while (i > fromIndex.current && sibling) {
				sibling.classList.add(css.hovered);
				sibling.classList.add(css.hoveredTransform);

				if (!doms.current.includes(sibling)) {
					doms.current.push(sibling);
				}

				sibling = sibling.nextElementSibling;
				i--;
			}
		} else {
			containerRef.current.style.setProperty('--moving-sign', direction);
			let sibling = curItem.previousElementSibling;
			let i = fromIndex.current;
			while (i > toIndex && sibling) {
				sibling.classList.add(css.hovered);
				sibling.classList.add(css.hoveredTransform);

				if (!doms.current.includes(sibling)) {
					doms.current.push(sibling);
				}

				sibling = sibling.previousElementSibling;
				i--;
			}
		}

		flow.current = diff;

	}, []);

	const moveItems = useCallback((toIndex) => {
		const curItem = selectedItem.current;

		if (curItem) {
			if (toIndex < dataSize && toIndex >= 0) {
				const offset = (toIndex - fromIndex.current) * itemOffsetRef.current;
				containerRef.current.style.setProperty('--item-offset', offset + 'px');

				// reset status
				canAdd.current = true;

				if (toIndex !== prevToIndex.current) {
					console.log("prevToIndex :", prevToIndex.current);
					console.log("toIndex!", toIndex);
					const direction = Math.sign(toIndex - prevFromIndex.current);
					const diff = toIndex - prevToIndex.current;
					console.log("diff: ", diff);
					console.log("flow.current to compare: ", flow.current);
					if (flow.current && Math.sign(diff) !== Math.sign(flow.current) && doms.current.length > 0) {
						canAdd.current = false;
					}
					console.log("canAdd ?", canAdd.current);
					console.log("direction ? ", direction);
					if (canAdd.current) {
						moveSiblings({direction, toIndex, diff});
						console.log("Added complete ", doms.current.length);
					} else {
						console.log("Cant' add, we should remove ", doms.current.length);
						const numToRemove = direction > 0 ? toIndex - prevToIndex.current : prevToIndex.current - toIndex;
						if (doms.current.length > 0) {
							console.log("removing", numToRemove);
							for (let i = 0; i < numToRemove; i++) {
								const toItem = doms.current.pop();
								toItem?.classList.remove(css.hoveredTransform);
							}
						}
						//FIXEME: When there's jump, we need to see we can add more...
						if (numToRemove > doms.current.length) {
							moveSiblings({direction, toIndex, diff});
						}
					}

					prevToIndex.current = prevFromIndex.current = toIndex;
				}
			}
		}
	}, [dataSize, moveSiblings]);

	const startRaf = useCallback((job) => {
		if (typeof window === 'object') {
			rafId.current = window.requestAnimationFrame(job);
		}
	}, []);

	const stopRaf = useCallback(() => {
		if (typeof window === 'object' && rafId.current !== null) {
			window.cancelAnimationFrame(rafId.current);
			rafId.current = null;
		}
	}, []);

	const scrollAndMoveItems = useCallback(({x, forward}) => {
		const container = containerRef.current;
		const distance = (forward ? 1 : -1) * container.clientWidth * hoverToScrollMultiplier;
		const movePos = x;

		const scrollJob = () => {
			const left = clamp(
				0,
				container.offsetLeft * 2 + container.scrollWidth - container.clientWidth,
				container.scrollLeft + distance
			);
			const toIndex = Math.floor((movePos + containerRef.current.scrollLeft) / itemOffsetRef.current);

			//container.scrollTo(left, 0);
			moveItems(toIndex);

			startRaf(scrollJob);
		};

		startRaf(scrollJob);
	}, [startRaf, moveItems]);

	const handleMouseMove = useCallback((ev) => {
		const container = containerRef.current;
		if (ev.clientX > container.offsetLeft + container.clientWidth - hoverArea
			&& container.scrollLeft < container.offsetLeft * 2 + container.scrollWidth - container.clientWidth - hoverArea) {
			console.log("hover to right area!");
			scrollAndMoveItems({x: ev.clientX, forward: true});
		} else if (ev.clientX < container.offsetLeft + hoverArea && container.scrollLeft > 0) {
			console.log("hover to left area!");
			scrollAndMoveItems({x: ev.clientX, forward: false});
		} else {
			stopRaf();
			const toIndex = Math.floor((ev.clientX + containerRef.current.scrollLeft) / itemOffsetRef.current);

			moveItems(toIndex);
		}
	}, [scrollAndMoveItems, moveItems, stopRaf]);

	const handleKeyDown = useCallback((ev) => {
		const {keyCode, target} = ev;
		if (is('enter', keyCode)) {
			if (selectedItem.current) {
				finalizeOrder();
			} else {
				startEditing(target);
			}
		} else if (is('left', keyCode) || is('right', keyCode)) {
			if (selectedItem.current) {
				const container = containerRef.current;
				const toIndex = is('left', keyCode) ? prevToIndex.current - 1 : prevToIndex.current + 1;

				const itemLeft = toIndex * itemOffsetRef.current - container.scrollLeft;
				console.log("x", itemLeft);
				if (itemLeft > container.offsetLeft + container.clientWidth - itemOffsetRef.current) {
					const left = itemLeft - (container.clientWidth - itemOffsetRef.current) + container.scrollLeft;
					container.scrollTo(left, 0);
				} else if(itemLeft < 0) {
					const left = container.scrollLeft + itemLeft;
					container.scrollTo(left, 0);
				}

				moveItems(toIndex);
				ev.preventDefault();
				ev.stopPropagation();
			}
		}
	}, [finalizeOrder, startEditing, moveItems]);

	useEffect(() => {
		// calculate the unit size once
		if (!itemOffsetRef.current) {
			containerRef.current = document.querySelector(`.${css.container}`)?.children[0];
			const item = containerRef.current?.children[0]?.children[0]?.children[0];
			const neighbor = item.nextElementSibling || item.previousElementSibling;
			itemOffsetRef.current = Math.abs(item.offsetLeft - neighbor?.offsetLeft);
			containerRef.current?.style.setProperty('--item-unit', itemOffsetRef.current + 'px');
		}
	}, []);

	console.log("rendered!");

	return (
		<Scroller className={css.container} hoverToScroll>
			<div className={centered ? css.wrapper : null}>
				<div
					className={classNames(css.list, {[css.centered]: centered})}
					onClick={handleClick}
					onKeyDown={handleKeyDown}
					onMouseMove={handleMouseMove}
				>
					{children}
				</div>
			</div>
		</Scroller>
	);
}

export default EditableList;
