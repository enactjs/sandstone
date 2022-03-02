/**
 * Sandstone styled EditableList components
 *
 *
 * @module sandstone/EditableList
 * @exports EditableList
 */

import {forward, forwardCustom} from '@enact/core/handle';
import {useCallback, useEffect, useRef} from 'react';

import css from './EditableList.module.less';

const EditableList = (props) => {
	const {children, dataSize} = props;
	const itemOffsetRef = useRef();
	const containerRef = useRef();
	const selectedItem = useRef(); // If this value is not null, we are editing
	const fromIndex = useRef();
	const prevToIndex = useRef();
	const doms = useRef([]);
	const canAdd = useRef(true);
	const flow = useRef();

	const handleClick = useCallback((ev) => {
		if (selectedItem.current) {
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
				forwardCustom('onComplete', (ev) => ({orders}))(ev, props);
			}

			selectedItem.current.classList.remove(css.selected);
			selectedItem.current.classList.remove(css.selectedTransform);
			selectedItem.current = null;
			flow.current = null;
			prevToIndex.current = null;
			containerRef.current.style.setProperty('--item-offset', '0px');
		} else {
			// add selected transition to selected item
			const item = ev.target.parentElement;
			// FIXME: Need to figure out the right element
			if (item.classList.contains('spottable')) {
				item.classList.add(css.selected);
				selectedItem.current = item;

				// calculate the unit size once
				if (!itemOffsetRef.current) {
					const neighbor = item.nextElementSibling || item.previousElementSibling;
					itemOffsetRef.current = Math.abs(item.offsetLeft - neighbor?.offsetLeft);
					containerRef.current?.style.setProperty('--item-unit', itemOffsetRef.current + 'px');
				}

				fromIndex.current = Math.floor((ev.clientX + containerRef.current.scrollLeft) / itemOffsetRef.current);
				console.log("fromIndex:", fromIndex.current);
			}
		}
	}, [dataSize, props]);

	const handleMouseMove = useCallback((ev) => {
		// change order when move over to the other items
		const item = ev.target.parentElement;
		const curItem = selectedItem.current;

		if (curItem) {
			const toIndex = Math.floor((ev.clientX + containerRef.current.scrollLeft) / itemOffsetRef.current);
			const offset = (toIndex - fromIndex.current) * itemOffsetRef.current;
			const direction = Math.sign(ev.movementX) > 0;

			containerRef.current.style.setProperty('--item-offset', offset + 'px');
			curItem.classList.add(css.selectedTransform);

			// reset status
			canAdd.current = true;

			if (toIndex !== prevToIndex.current) {
				console.log("prevToIndex :", prevToIndex.current);
				const diff = toIndex - prevToIndex.current;
				console.log("diff: ", diff);
				console.log("flow.current to compare: ", flow.current);
				if (flow.current && Math.sign(diff) !== Math.sign(flow.current) && doms.current.length > 0) {
					canAdd.current = false;
				}
				console.log("canAdd ?", canAdd.current);
				console.log("changed!", toIndex);
				if (canAdd.current) {
					if (direction > 0) {
						containerRef.current.style.setProperty('--moving-sign', Math.sign(ev.movementX));
						let sibling = curItem.nextElementSibling;
						let i = toIndex;
						while (i > fromIndex.current) {
							sibling.classList.add(css.hovered);
							sibling.classList.add(css.hoveredTransform);

							if (!doms.current.includes(sibling)) {
								doms.current.push(sibling);
							}

							sibling = sibling.nextElementSibling;
							i--;
						}
					} else {
						containerRef.current.style.setProperty('--moving-sign', Math.sign(ev.movementX));
						let sibling = curItem.previousElementSibling;
						let i = fromIndex.current;
						while (i > toIndex) {
							sibling.classList.add(css.hovered);
							sibling.classList.add(css.hoveredTransform);

							if (!doms.current.includes(sibling)) {
								doms.current.push(sibling);
								console.log(doms.current);
							}

							sibling = sibling.previousElementSibling;
							i--;
						}
					}
					flow.current = diff;
					console.log("flow.current: ", flow.current);
				} else {
					if (direction > 0) {
						if (doms.current.length > 0) {
							for (let i = 0; i < toIndex - prevToIndex.current; i++) {
								const toItem = doms.current.pop();
								toItem.classList.remove(css.hoveredTransform);
							}
						}
					} else {
						if (doms.current.length > 0) {
							for (let i = 0; i < prevToIndex.current - toIndex; i++) {
								const toItem = doms.current.pop();
								toItem.classList.remove(css.hoveredTransform);
							}
						}
					}
				}

				prevToIndex.current = toIndex;
			}
		}
	}, []);

	console.log("rendered!");

	return (
		<div className={css.container} ref={containerRef}>
			<div
				className={css.list}
				onClick={handleClick}
				onMouseMove={handleMouseMove}
			>
				{children}
			</div>
		</div>
	);
}

export default EditableList;
