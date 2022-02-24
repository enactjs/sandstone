/**
 * Sandstone styled EditableList components
 *
 *
 * @module sandstone/EditableList
 * @exports EditableList
 */

import {useCallback, useEffect, useRef} from 'react';

import css from './EditableList.module.less';

const EditableList = (props) => {
	const {children} = props;
	const itemOffsetRef = useRef();
	const containerRef = useRef();
	const selectedItem = useRef(); // If this value is not null, we are editing
	const lastHoveredItem = useRef();
	let animating = false;

	const handleClick = useCallback((ev) => {
		animating = false;
		if (selectedItem.current) {
			// finalize the order
			const sItem = selectedItem.current;
			const hItem = lastHoveredItem.current;
			sItem.classList.remove(css.selected);
			sItem.classList.remove(css.selectedTransform);
			hItem.classList.remove(css.hovered);
			hItem.classList.remove(css.hoveredTransform);

			const hoveredOrder = Number(hItem.style.order);
			const selectedOrder = Number(sItem.style.order);

			if (hoveredOrder > selectedOrder) {
				let nextSibling = sItem.nextElementSibling;
				while (nextSibling && nextSibling !== hItem) {
					nextSibling.style.order = Number(nextSibling.style.order) - 1;
					nextSibling.classList.remove(css.hoveredTransform);
					nextSibling.classList.remove(css.hovered);
					nextSibling = nextSibling.nextElementSibling;
				}
				hItem.style.order = hoveredOrder - 1;
				sItem.style.order = hoveredOrder;
			}

			if (hoveredOrder < selectedOrder) {
				let nextSibling = hItem;
				while (nextSibling && nextSibling !== sItem) {
					console.log("before", Number(nextSibling.style.order));
					nextSibling.style.order = Number(nextSibling.style.order) + 1;
					console.log("after", nextSibling.style.order);
					nextSibling.classList.remove(css.hoveredTransform);
					nextSibling.classList.remove(css.hovered);
					nextSibling = nextSibling.nextElementSibling;
				}
				sItem.style.order = hoveredOrder;
			}

			// nullify the selected & hovered item
			selectedItem.current = null;
			lastHoveredItem.current = null;
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
			}
		}
	}, []);

	const handleTransitionEnd = useCallback(() => {
		animating = false;
	}, []);

	const handleMouseMove = useCallback((ev) => {
		// change order when move over to the other items
		const item = ev.target.parentElement;
		const curItem = selectedItem.current;

		if (curItem && item.classList.contains('spottable') && item !== curItem && animating === false) {
			console.log("It's another item!");
			//console.log(containerRef.current.style.getPropertyValue('--item-width'));
			const curOffset = Number(containerRef.current.style.getPropertyValue('--item-offset').replace('px', ''));
			console.log(curOffset);
			console.log("hovered item left: " + item.getBoundingClientRect().left);
			console.log("selected item left: " + curItem.getBoundingClientRect().left);
			let offset = item.getBoundingClientRect().left - curItem.getBoundingClientRect().left;

			console.log("offset ", offset);
			// The case where the selected item get back to its slot again
			if (item.classList.contains(css.hoveredTransform)) {
				console.log("0 so removing class", css.hoveredTransform);

				item.classList.remove(css.hoveredTransform);

				lastHoveredItem.current = curItem;
			} else {
				containerRef.current.style.setProperty('--moving-sign', Math.sign(ev.movementX));

				item.classList.add(css.hoveredTransform);
				lastHoveredItem.current = item;
			}

			containerRef.current.style.setProperty('--item-offset', curOffset + offset + 'px');

			curItem.classList.add(css.selectedTransform);
			item.classList.add(css.hovered);

			animating = true;
		}
	}, []);

	console.log("rendered!");

	return (
		<div className={css.container} ref={containerRef}>
			<div
				className={css.list}
				onTransitionEnd={handleTransitionEnd}
				onClick={handleClick}
				onMouseMove={handleMouseMove}
			>
				{children}
			</div>
		</div>
	);
}

export default EditableList;
