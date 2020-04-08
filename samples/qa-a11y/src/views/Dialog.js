import Button from '@enact/sandstone/Button';
import Dialog from '@enact/sandstone/Dialog';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import Toggleable from '@enact/ui/Toggleable';

const DialogViewBase = kind({
	name: 'DialogView',

	propTypes: {
		onClose: PropTypes.func,
		onOpen: PropTypes.func,
		open: PropTypes.bool
	},

	render: ({onClose, onOpen, open}) => (
		<div>
			<Button size="small" onClick={onOpen}>Dialog</Button>
			<Dialog onClose={onClose} open={open}>
				<title>You&#39;ve been watching TV for a very long time so let&#39;s do a quick check-in.</title>
				<titleBelow>This TV has been active for 10 hours.</titleBelow>
				<span>Perhaps it is time to take a break and get some fresh air. There is a nice coffee shop around the corner</span>
				<buttons>
					<Button size="small" onClick={onClose}>Go Get A Coffee</Button>
					<Button size="small" onClick={onClose}>Keep Watching TV</Button>
				</buttons>
			</Dialog>
		</div>
	)
});

const DialogView = Toggleable(
	{prop: 'open', activate: 'onOpen', deactivate: 'onClose'},
	DialogViewBase
);

export default DialogView;
