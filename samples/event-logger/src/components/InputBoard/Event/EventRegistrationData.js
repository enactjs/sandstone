const domEventNames = {
	focus: [
		'focus',
		'blur'
	],
	keyboard: [
		'keydown',
		'keypress',
		'keyup'
	],
	mouse: [
		'click',
		'mouseenter',
		'mouseover',
		'mousemove',
		'mousedown',
		'mouseup',
		'auxclick',
		'dblclick',
		'contextmenu',
		'wheel',
		'mouseleave',
		'mouseout',
		'select',
		'pointerlockchange',
		'pointerlockerror'
	],
	pointer: [
		'pointerover',
		'pointerenter',
		'pointerdown',
		'pointermove',
		'pointerup',
		'pointercancel',
		'pointerout',
		'pointerleave',
		'gotpointercapture',
		'lostpointercapture'
	],
	touch: [
		'touchend',
		'touchenter',
		'touchleave',
		'touchmove',
		'touchstart'
	]
};

const reactSyntheticEventNames = {
	focus: [
		'onFocus',
		'onBlur'
	],
	keyboard: [
		'onKeyDown',
		'onKeyPress',
		'onKeyUp'
	],
	mouse: [
		'onClick',
		'onContextMenu',
		'onDoubleClick',
		'onDrag',
		'onDragEnd',
		'onDragEnter',
		'onDragExit',
		'onDragLeave',
		'onDragOver',
		'onDragStart',
		'onDrop',
		'onMouseDown',
		'onMouseEnter',
		'onMouseLeave',
		'onMouseMove',
		'onMouseOut',
		'onMouseOver',
		'onMouseUp'
	],
	pointer: [
		'onPointerDown',
		'onPointerMove',
		'onPointerUp',
		'onPointerCancel',
		'onGotPointerCapture',
		'onLostPointerCapture',
		'onPointerEnter',
		'onPointerLeave',
		'onPointerOver',
		'onPointerOut'
	],
	touch: [
		'onTouchCancel',
		'onTouchEnd',
		'onTouchMove',
		'onTouchStart'
	]
};

const properties = {
	focus: [
	],
	keyboard: [
		'key',
		'keyCode',
		'repeat',
		'location',
		'charCode',
		'locale',
		'altKey',
		'ctrlKey',
		'shiftKey',
		'metaKey',
		'which'
	],
	mouse: [
		'clientX',
		'clientY',
		'pageX',
		'pageY',
		'screenX',
		'screenY',
		'altKey',
		'ctrlKey',
		'metaKey',
		'shiftKey'
	],
	pointer: [
		'pointerId',
		'width',
		'height',
		'pressure',
		'tangentialPressure',
		'tiltX',
		'tiltY',
		'twist',
		'pointerType',
		'isPrimary'
	],
	touch: [
		'touches',
		'altKey',
		'ctrlKey',
		'metaKey',
		'shiftKey'
	],
	touches: [
		'clientX',
		'clientY',
		'pageX',
		'pageY',
		'screenX',
		'screenY'
	]
};

export default {
	domEventNames,
	properties,
	reactSyntheticEventNames
};
