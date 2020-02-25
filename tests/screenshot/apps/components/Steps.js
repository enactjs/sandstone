import Steps from '../../../../Steps';
import React from 'react';

const StepsTests = [
	<Steps />, // default `size` is "small"
	<Steps size="tiny" />,
	<Steps size="medium" />,
	<Steps size="large" />,
	<Steps total={0} />,
	<Steps total={25} />,
	<Steps size="tiny" total={25} />,
	<Steps size="medium" total={25} />,
	<Steps size="large" total={25} />,
	<Steps total={250} />,
	<Steps size="tiny" total={250} />,
	<Steps size="medium" total={250} />,
	<Steps size="large" total={250} />,
	<Steps current={196} total={250} />,
	<Steps skip={1} total={1} />,
	<Steps skip={[1]} total={1} />,
	<Steps skip={10} total={10} />,
	<Steps skip={[4, 5, 9]} total={10} />,
	<Steps skip={[4, '5', 9]} total={10} />,
	<Steps skip={[4, null, 9]} total={10} />,
	<Steps skip={[9, 5, 4]} total={10} />,
	<Steps current={3} skip={[4, 5, 9]} total={10} />,
	<Steps current={4} skip={[4, 5, 9]} total={10} />,
	<Steps current={5} skip={[4, 5, 9]} total={10} />,
	<Steps skip={[]} />,
	<Steps skip={0} />,
	<Steps skip={[0]} />,
	<Steps skip={1} />,
	<Steps skip={[1]} />,
	<Steps current={2} total={1} />,
	<Steps current={2} skip={1} total={1} />,
	<Steps current={2} skip={2} total={1} />,
	<Steps current={2} skip={[1, 2]} total={1} />
	//TODO: some icon related tests
];
export default StepsTests;
