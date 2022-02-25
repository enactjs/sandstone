// TODO: RTL

import {is} from '@enact/core/keymap';
import Spotlight, {getDirection} from '@enact/spotlight';
import ri from '@enact/ui/resolution';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {useCallback, useLayoutEffect, useRef, useState} from 'react';

import Button from '../Button';

import css from './useEditMode.module.less';

const isEnter = is('enter');
const isLeft = is('left');
const isRight = is('right');

/**
 * Reorder or remove children items.
 *
 * @class useEditMode
 * @memberof sandstone/useScroll.useEditMode
 * @ui
 * @private
 */
const useEditMode = (props, instances) => {
	console.log('useEditMode');

	const {children, editMode} = props;
	const {scrollContainerRef, scrollContentRef} = instances;

	const [selecting, setSelecting] = useState(false);
	const mutableObj = useRef({
		currentChildrenList: [],
		selectedDataIndex: null,
		selectedNode: null,
		lastMouseMove: 0
	}).current;

	const temporaryAnimationOff = useCallback((targetItemNode) => {
		targetItemNode.classList.add(css.noAnimation);
		setTimeout(()=>{
			targetItemNode.classList.remove(css.noAnimation);
		},200)
	}, []);

	const calcRemoveButtonPosition = useCallback((targetItemNode) => {
		if(targetItemNode) {
			const targetItemRect = targetItemNode.getBoundingClientRect();
			const containerRect = scrollContainerRef.current.getBoundingClientRect();

			scrollContainerRef.current.style.setProperty('--select-position', `${targetItemRect.x - containerRect.x + targetItemRect.width/2}px`);

			if (containerRect.width < targetItemRect.x || targetItemRect.x < 0) {
				// scroll case. wait scroll done
				Spotlight.focus(targetItemNode); // FIXME: there is a bug sometime scroll does not works.
				setTimeout(() => calcRemoveButtonPosition(targetItemNode), 500);
			}
		}
	}, []);

	const selectItem = useCallback((targetItemNode) => {
		calcRemoveButtonPosition(targetItemNode);

		targetItemNode.classList.add(css.selectedItem);
		temporaryAnimationOff(targetItemNode);

		mutableObj.selectedDataIndex = Number(targetItemNode.dataset.index);
		mutableObj.selectedNode = targetItemNode;
		setSelecting(true);
	}, []);

	const unselectPrevItem = useCallback(() => {
		if (mutableObj.selectedNode && mutableObj.selectedNode.classList) {
			mutableObj.selectedNode.classList.remove(css.selectedItem);
			temporaryAnimationOff(mutableObj.selectedNode);
		}

		mutableObj.selectedDataIndex = null;
		mutableObj.selectedNode = null;
	}, []);

	const unselect = useCallback(() => {
		unselectPrevItem();
		setSelecting(false);
	}, []);


	const findItemNode = useCallback((node) => {
		for (let currentNode = node; currentNode != scrollContentRef.current && currentNode != document; currentNode = currentNode.parentNode) {
			if (currentNode.dataset.index) {
				return currentNode;
			}
		}
	}, []);

	const onSelect = useCallback((ev) => {
		const targetItemNode = findItemNode(ev.target);
		const {selectedNode} = mutableObj;

		if (targetItemNode && targetItemNode.dataset.index) {
			if (targetItemNode === selectedNode) {
				unselectPrevItem();
				unselect();
			} else {
				unselectPrevItem();
				selectItem(targetItemNode);
			}

			ev.preventDefault();
			ev.stopPropagation();

			return;
		}
	}, []);

	const onClickRemoveButton = useCallback((ev) => {
		const {currentChildrenList, selectedDataIndex, selectedNode} = mutableObj;

		if(selectedNode) {
			const nextItem = selectedNode.nextSibling || selectedNode.previousSibling;
			selectedNode.remove();
			Spotlight.focus(nextItem);

			// wait until animation is done
			setTimeout(()=>unselect(), 200);

			const index = currentChildrenList.indexOf(selectedDataIndex);
			if (index !== -1) {
				currentChildrenList.splice(index, 1);
			}

			// TODO invoke event handler
		}
	}, []);


	const onKeyDown = useCallback((ev) => {
		const {keyCode, target} = ev;
		const {selectedNode} = mutableObj;

		if(isEnter(keyCode) && target.dataset.index) {
			return onSelect(ev);
		} else if (selectedNode && (isRight (keyCode) || isLeft (keyCode))) {
			ev.preventDefault();
			ev.stopPropagation();

			const attachBeforeNode = isRight (keyCode) ? selectedNode.nextSibling && selectedNode.nextSibling.nextSibling : selectedNode.previousSibling;
			selectedNode.parentNode.insertBefore(selectedNode, attachBeforeNode);

			calcRemoveButtonPosition(selectedNode);
			Spotlight.focus(selectedNode);

			// TODO invoke event handler
		}
	}, []);

	const onMouseMove = useCallback((ev) => {
		const currentTime = performance.now();
		const {selectedNode} = mutableObj;

		if (currentTime - mutableObj.lastMouseMove < 200) {
			return;
		}
		mutableObj.lastMouseMove = currentTime;

		if (selectedNode) {
			const {x, y} = ev;
			const movedTarget = findItemNode(document.elementFromPoint(x, y));

			if(movedTarget && selectedNode != movedTarget ) {
				const attachBeforeNode = selectedNode.getBoundingClientRect().x < x ? movedTarget.nextSibling : movedTarget;
				selectedNode.parentNode.insertBefore(selectedNode, attachBeforeNode);
				calcRemoveButtonPosition(selectedNode);

				// TODO invoke event handler
			}
		}
	}, []);

	const onMouseLeave = useCallback((ev) => {
		unselectPrevItem();
		unselect();
	}, []);

	useLayoutEffect(() => {
		if(editMode) {
			scrollContentRef.current.classList.add(css.editModeScrollContent);
			scrollContentRef.current.addEventListener('click', onSelect);
			scrollContentRef.current.addEventListener('mousemove', onMouseMove);
			scrollContainerRef.current.addEventListener('keydown', onKeyDown);
			scrollContainerRef.current.addEventListener('mouseleave', onMouseLeave);
		}
		return () => {
			scrollContentRef.current.classList.remove(css.editModeScrollContent);
			scrollContentRef.current.removeEventListener('click', onSelect);
			scrollContentRef.current.removeEventListener('mousemove', onMouseMove);
			scrollContainerRef.current.removeEventListener('keydown', onKeyDown);
			scrollContainerRef.current.removeEventListener('mouseleave', onMouseLeave);
		}
	}, [editMode, scrollContainerRef, scrollContainerRef.current, scrollContentRef, scrollContentRef.current]);

	useLayoutEffect(() => {
		if(editMode && scrollContentRef.current && scrollContentRef.current.childNodes && scrollContentRef.current.childNodes[0].childNodes) {
			const ItemNodes = scrollContentRef.current.childNodes[0].childNodes;
			const ItemWidth = ItemNodes && ItemNodes.length > 2 && (ItemNodes[1].getBoundingClientRect().x - ItemNodes[0].getBoundingClientRect().x);

			// Assume all items have the same size and spacing
			scrollContentRef.current.style.setProperty('--item-width', `${ItemWidth}px`);

			mutableObj.currentChildrenList = children.props.children.map((item)=>item.props['data-index']);
		}
	}, [children, editMode, scrollContentRef, scrollContentRef.current]);

	const className = classNames(css.removeButton, {
		[css.showRemoveButton]: selecting
	});

	return editMode && selecting? <Button className={className} onClick={onClickRemoveButton} icon='trash'/> : null; // TODO Aria-label
};

useEditMode.displayName = 'useEditMode';

export default useEditMode;
export {useEditMode};
