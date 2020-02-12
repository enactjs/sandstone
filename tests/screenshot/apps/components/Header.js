import {Header} from '../../../../Panels';
import Input from '../../../../Input';
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

const baseTests = [
	<Header type="standard" title="Header" />,
	<Header type="standard" title="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut nunc dolor." marqueeOn="hover" />,
	<Header type="standard" title="Header" centered />,
	<Header type="standard" title="Header" subtitle="Subtitle" />,
	<Header type="standard" title="Header" subtitle="Subtitle" centered />
];

const LtrTests = [
	...withProps({type: 'standard'}, baseTests),
	...withProps({type: 'compact'}, baseTests),
	...withProps({type: 'walkthrough'}, baseTests),

	...withProps({type: 'standard', showInput: true, headerInput: <Input />}, baseTests),
	...withProps({type: 'compact', showInput: true, headerInput: <Input />}, baseTests),
	...withProps({type: 'walkthrough', showInput: true, headerInput: <Input />}, baseTests)
];

const HeaderTests = [
	...LtrTests,
	...withConfig({locale: 'ar-SA'}, LtrTests)
];

export default HeaderTests;
