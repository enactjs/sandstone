import React from 'react';

const withProps = (props, tests) => {
	return tests.map(t => {
		if (React.isValidElement(t)) {
			return React.cloneElement(t, props);
		}

		return {
			...t,
			component: React.cloneElement(t.component, props)
		};
	});
};

const withConfig = (config, tests) => {
	return tests.map(t => {
		if (React.isValidElement(t)) {
			return {
				...config,
				component: t
			};
		}

		return {
			...t,
			...config
		};
	});
};

const LoremString =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac tellus in velit ornare commodo. Nam dignissim fringilla nulla, sit amet hendrerit sapien laoreet quis. Praesent quis tellus non diam viverra feugiat.';

const LongerLoremString = `Longer ${LoremString} ${LoremString} ${LoremString} ${LoremString}`;

export {
	LongerLoremString,
	LoremString,
	withConfig,
	withProps
};
