import CheckboxItem from '@enact/sandstone/CheckboxItem';
import React from 'react';

const ScrollModeSwitch = (props) => {
	return (
		<CheckboxItem {...props}>
			Native Scrolling
		</CheckboxItem>
	);
};

export default ScrollModeSwitch;
export {ScrollModeSwitch};
