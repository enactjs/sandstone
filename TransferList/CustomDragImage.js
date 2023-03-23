import React from 'react';

import css from './TransferList.module.less';
import itemCss from '../Item/Item.module.less';

const DragImage = (listComponent, item, itemBg) => {
	let singleItemDragContainer, multipleItemDragContainer;
	console.log(itemBg)
	const setCommonElementStyles = (element) => {
		if (item) {
			if (listComponent === 'VirtualList' && itemBg) {
				element.style.backgroundColor = window.getComputedStyle(itemBg).backgroundColor;
				element.style.borderRadius = window.getComputedStyle(itemBg).borderRadius;
			} else {
				element.style.backgroundColor = window.getComputedStyle(item, ':before').backgroundColor;
				element.style.borderRadius = window.getComputedStyle(item, ':before').borderRadius;
			}

			element.style.border = '1px solid black';
			element.style.height = item.clientHeight + 'px';
			element.style.left = "0px";
			element.style.position = "absolute";
			element.style.width = item.clientWidth + 'px';
		}
	};

	return () => {
		if (item) {
			singleItemDragContainer = document.createElement("div");
			setCommonElementStyles(singleItemDragContainer);
			singleItemDragContainer.style.bottom = "0px";
			singleItemDragContainer.style.left = "0px";
			singleItemDragContainer.style.zIndex = '-100';
			document.body.appendChild(singleItemDragContainer);

			multipleItemDragContainer = document.createElement("div");
			setCommonElementStyles(multipleItemDragContainer);
			multipleItemDragContainer.style.height = 1.6 * item.clientHeight + 'px';
			multipleItemDragContainer.style.top = "0px";
			multipleItemDragContainer.style.zIndex = '-110';
			document.body.appendChild(multipleItemDragContainer);

			let div2 = document.createElement("div");
			setCommonElementStyles(div2);
			div2.style.top = "0px";
			div2.style.zIndex = '-100';

			let div3 = document.createElement("div");
			setCommonElementStyles(div3);
			div3.style.top = 0.3 * item.clientHeight + 'px';
			div3.style.zIndex = '-90';

			let div4 = document.createElement("div");
			setCommonElementStyles(div4);
			div4.style.top = 0.6 * item.clientHeight + 'px';
			div4.style.zIndex = '-80';

			multipleItemDragContainer.appendChild(div2);
			multipleItemDragContainer.appendChild(div3);
			multipleItemDragContainer.appendChild(div4);
		}
		return {singleItemDragContainer, multipleItemDragContainer};
	};
}


export default DragImage;
