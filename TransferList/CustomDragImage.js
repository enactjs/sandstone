import {forwardRef, useCallback, useImperativeHandle, useRef, useState} from 'react';
import {flushSync} from 'react-dom';

import css from './TransferList.module.less';
import itemCss from '../Item/Item.module.less';

const DragImage = forwardRef((props, ref) => {
	const getCommonElementStyles = useCallback (() => {
		const item = document.querySelectorAll(`.${css.draggableItem}`)[0];
		if (!item) {
			return {};
		}

		const baseStyles = {
			left: '0px',
			border: '1px solid black',
			position: "absolute",
			height: item.clientHeight + 'px',
			width: item.clientWidth + 'px'
		};

		if (props.listComponent === 'VirtualList') {
			const itemBg = item.querySelectorAll(`.${itemCss.bg}`)[0];

			return {
				...baseStyles,
				backgroundColor: window.getComputedStyle(itemBg).backgroundColor,
				borderRadius: window.getComputedStyle(itemBg).borderRadius
			};
		}

		return {
			...baseStyles,
			backgroundColor: window.getComputedStyle(item, ':before').backgroundColor,
			borderRadius: window.getComputedStyle(item, ':before').borderRadius
		};
	}, [props.listComponent]);

	const generateMultiDragImage = useCallback(() => {
		const item = document.querySelectorAll(`.${css.draggableItem}`)[0];
		if (!item) {
			return;
		}

		return <div style={{...getCommonElementStyles(), height: 1.6 * item.clientHeight + 'px', top: 0, zIndex: '-110'}}>
			<div style={{...getCommonElementStyles(), top: 0, zIndex: '-100'}} />
			<div style={{...getCommonElementStyles(), top: 0.3 * item.clientHeight + 'px', zIndex: '-90'}} />
			<div style={{...getCommonElementStyles(), top: 0.6 * item.clientHeight + 'px', zIndex: '-80'}} />
		</div>;
	}, [getCommonElementStyles]);

	let [content, setContent] = useState(null);
	let domRef = useRef(null);

	useImperativeHandle(ref, () => (isSingle, callback) => {
		// This will be called during the dragStart event by handleScroll. We need to render the
		// preview synchronously before this event returns so we can call event.dataTransfer.setDragImage.
		flushSync(() => {
			const singleDragImage = <div style={getCommonElementStyles()} />;
			const multiDragImage = generateMultiDragImage();

			setContent(isSingle ? singleDragImage : multiDragImage);
		});

		// Yield back to useDrag to set the drag image.
		callback(domRef.current);

		// Remove the preview from the DOM after a frame so the browser has time to paint.
		requestAnimationFrame(() => {			// eslint-disable-line
			setContent(null);
		});
	}, [setContent, generateMultiDragImage, getCommonElementStyles]);

	if (!content) {
		return null;
	}

	return (<div
		style={{zIndex: -100, position: 'absolute', top: 0, left: -100000}}
		ref={domRef}
	>{content}</div>);
});

export default DragImage;
