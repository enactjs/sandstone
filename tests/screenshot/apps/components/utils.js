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

export {
	withConfig,
	withProps
};
