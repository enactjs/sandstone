const getItemNodeFromTarget = (contentRef, eventTarget) => {
	if (!eventTarget || !contentRef) {
		return null;
	}
	// To support nested VirtualList, need to get the nearest item node from contentRef.
	let itemNode = eventTarget;
	let parentNode = eventTarget && eventTarget.parentNode;
	while (contentRef && parentNode && contentRef !== parentNode.parentNode) {
		itemNode = parentNode;
		parentNode = parentNode.parentNode;
	}
	return itemNode;
};

export {
	getItemNodeFromTarget
};
