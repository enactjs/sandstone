// Full List (Hash) of Feedback states and their icons with metadata
//

export default {
	play          : {icon: 'play',               position: 'after',   allowHide: true,   message: null},
	pause         : {icon: 'pause',              position: 'after',   allowHide: false,  message: null},
	rewind        : {icon: 'backward',           position: 'before',  allowHide: false,  message: 'x'},
	fastForward   : {icon: 'forward',            position: 'after',   allowHide: false,  message: 'x'},
	jumpBackward  : {icon: 'jumpBackward',       position: 'before',  allowHide: false,  message: ' '},
	jumpForward   : {icon: 'jumpForward',        position: 'after',   allowHide: false,  message: ' '},
	jumpToStart   : {icon: 'jumpBackward',       position: 'before',  allowHide: true,   message: null},
	jumpToEnd     : {icon: 'jumpForward',        position: 'after',   allowHide: true,   message: null},
	stop          : {icon: 'stop',               position: null,      allowHide: true,   message: null}
};
