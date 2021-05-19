import ProgressButton from '../../../../ProgressButton';

import {withConfig} from './utils';

const LtrTests = [
	<ProgressButton />,
	<ProgressButton>Update</ProgressButton>,
	<ProgressButton disabled>Update</ProgressButton>,
	<ProgressButton showProgress progress={0.5} />,
	<ProgressButton icon="pause" showProgress progress={0.5} />,
	<ProgressButton showProgress progress={0.5}>Update</ProgressButton>,
	<ProgressButton icon="pause" showProgress progress={0.5}>Update</ProgressButton>,
	<ProgressButton color="red" />,
	<ProgressButton color="green" />,
	<ProgressButton color="yellow" />,
	<ProgressButton color="blue" />,
	<ProgressButton color="red">Update</ProgressButton>,
	<ProgressButton color="green">Update</ProgressButton>,
	<ProgressButton color="yellow">Update</ProgressButton>,
	<ProgressButton color="blue">Update</ProgressButton>,
	<ProgressButton color="red" minWidth={false}>Update</ProgressButton>,
	<ProgressButton color="green" minWidth={false}>Update</ProgressButton>,
	<ProgressButton color="yellow" minWidth={false}>Update</ProgressButton>,
	<ProgressButton color="blue" minWidth={false}>Update</ProgressButton>,

	// size large
	<ProgressButton size="large" />,
	<ProgressButton size="large" >Update</ProgressButton>,
	<ProgressButton size="large" disabled>Update</ProgressButton>,
	<ProgressButton size="large" showProgress progress={0.5} />,
	<ProgressButton size="large" icon="pause" showProgress progress={0.5} />,
	<ProgressButton size="large" showProgress progress={0.5}>Update</ProgressButton>,
	<ProgressButton size="large" icon="pause" showProgress progress={0.5}>Update</ProgressButton>,
	<ProgressButton size="large" color="red" />,
	<ProgressButton size="large" color="green" />,
	<ProgressButton size="large" color="yellow" />,
	<ProgressButton size="large" color="blue" />,
	<ProgressButton size="large" color="red">Update</ProgressButton>,
	<ProgressButton size="large" color="green">Update</ProgressButton>,
	<ProgressButton size="large" color="yellow">Update</ProgressButton>,
	<ProgressButton size="large" color="blue">Update</ProgressButton>,
	<ProgressButton size="large" color="red" minWidth={false}>Update</ProgressButton>,
	<ProgressButton size="large" color="green" minWidth={false}>Update</ProgressButton>,
	<ProgressButton size="large" color="yellow" minWidth={false}>Update</ProgressButton>,
	<ProgressButton size="large" color="blue" minWidth={false}>Update</ProgressButton>,

	// backgroundOpacity opaque
	<ProgressButton backgroundOpacity="opaque">Update</ProgressButton>,
	<ProgressButton backgroundOpacity="opaque" disabled>Update</ProgressButton>,
	<ProgressButton backgroundOpacity="opaque" showProgress progress={0.5} />,
	<ProgressButton backgroundOpacity="opaque" showProgress progress={0.5}>Update</ProgressButton>,
	<ProgressButton backgroundOpacity="opaque" icon="pause" showProgress progress={0.5}>Update</ProgressButton>,
	<ProgressButton backgroundOpacity="opaque" color="red" />,
	<ProgressButton backgroundOpacity="opaque" color="green" />,
	<ProgressButton backgroundOpacity="opaque" color="yellow" />,
	<ProgressButton backgroundOpacity="opaque" color="blue" />,
	<ProgressButton backgroundOpacity="opaque" color="red" minWidth={false}>Update</ProgressButton>,
	<ProgressButton backgroundOpacity="opaque" color="green" minWidth={false}>Update</ProgressButton>,
	<ProgressButton backgroundOpacity="opaque" color="yellow" minWidth={false}>Update</ProgressButton>,
	<ProgressButton backgroundOpacity="opaque" color="blue" minWidth={false}>Update</ProgressButton>,
	<ProgressButton backgroundOpacity="opaque" color="red">Update</ProgressButton>,
	<ProgressButton backgroundOpacity="opaque" color="green">Update</ProgressButton>,
	<ProgressButton backgroundOpacity="opaque" color="yellow">Update</ProgressButton>,
	<ProgressButton backgroundOpacity="opaque" color="blue">Update</ProgressButton>,
	<ProgressButton backgroundOpacity="opaque" color="red" minWidth={false}>Update</ProgressButton>,
	<ProgressButton backgroundOpacity="opaque" color="green" minWidth={false}>Update</ProgressButton>,
	<ProgressButton backgroundOpacity="opaque" color="yellow" minWidth={false}>Update</ProgressButton>,
	<ProgressButton backgroundOpacity="opaque" color="blue" minWidth={false}>Update</ProgressButton>,

	// backgroundOpacity transparent
	<ProgressButton backgroundOpacity="transparent">Update</ProgressButton>,
	<ProgressButton backgroundOpacity="transparent" disabled>Update</ProgressButton>,
	<ProgressButton backgroundOpacity="transparent" showProgress progress={0.5} />,
	<ProgressButton backgroundOpacity="transparent" showProgress progress={0.5}>Update</ProgressButton>,
	<ProgressButton backgroundOpacity="transparent" icon="pause" showProgress progress={0.5}>Update</ProgressButton>,
	<ProgressButton backgroundOpacity="transparent" color="red" />,
	<ProgressButton backgroundOpacity="transparent" color="green" />,
	<ProgressButton backgroundOpacity="transparent" color="yellow" />,
	<ProgressButton backgroundOpacity="transparent" color="blue" />,
	<ProgressButton backgroundOpacity="transparent" color="red" minWidth={false}>Update</ProgressButton>,
	<ProgressButton backgroundOpacity="transparent" color="green" minWidth={false}>Update</ProgressButton>,
	<ProgressButton backgroundOpacity="transparent" color="yellow" minWidth={false}>Update</ProgressButton>,
	<ProgressButton backgroundOpacity="transparent" color="blue" minWidth={false}>Update</ProgressButton>,
	<ProgressButton backgroundOpacity="transparent" color="red">Update</ProgressButton>,
	<ProgressButton backgroundOpacity="transparent" color="green">Update</ProgressButton>,
	<ProgressButton backgroundOpacity="transparent" color="yellow">Update</ProgressButton>,
	<ProgressButton backgroundOpacity="transparent" color="blue">Update</ProgressButton>,
	<ProgressButton backgroundOpacity="transparent" color="red" minWidth={false}>Update</ProgressButton>,
	<ProgressButton backgroundOpacity="transparent" color="green" minWidth={false}>Update</ProgressButton>,
	<ProgressButton backgroundOpacity="transparent" color="yellow" minWidth={false}>Update</ProgressButton>,
	<ProgressButton backgroundOpacity="transparent" color="blue" minWidth={false}>Update</ProgressButton>
];

const ProgressButtonTests = [
	...LtrTests,
	...withConfig({locale: 'ar-SA'}, LtrTests)
];

export default ProgressButtonTests;
