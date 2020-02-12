import ProgressBar from '../../../../ProgressBar';
import React from 'react';

// TODO: RTL

const ProgressBarTests = [
	<ProgressBar />,
	<ProgressBar highlighted />,
	<ProgressBar progress={0.5} />,
	<ProgressBar progress={1} />,
	<ProgressBar highlighted progress={0.5} />,
	<ProgressBar highlighted progress={1} />,
	<ProgressBar backgroundProgress={0.5} />,
	<ProgressBar backgroundProgress={1} />,
	<ProgressBar backgroundProgress={0.25} progress={0.5} />,
	<ProgressBar backgroundProgress={0.5} progress={0.25} />,
	<ProgressBar highlighted backgroundProgress={0.5} />,
	<ProgressBar highlighted backgroundProgress={1} />,
	<ProgressBar highlighted backgroundProgress={0.5} progress={0.25} />,
	<ProgressBar tooltip />,
	<ProgressBar tooltip progress={0.5} />,
	<ProgressBar tooltip percent progress={0.5} />,
	<ProgressBar progress={0.75} progressAnchor={0.5} />,
	<ProgressBar progress={0.25} progressAnchor={0.5} />,
	<ProgressBar backgroundProgress={0.25} progress={0.75} progressAnchor={0.5} />,
	<ProgressBar backgroundProgress={0.75} progress={0.25} progressAnchor={0.5} />,
	<ProgressBar backgroundProgress={0.1} progress={0.25} progressAnchor={0.2} />,
	<ProgressBar progress={0.25} progressAnchor={0.5} tooltip />,
	<ProgressBar orientation="vertical" />,
	<ProgressBar orientation="vertical" highlighted />,
	<ProgressBar orientation="vertical" progress={0.5} />,
	<ProgressBar orientation="vertical" progress={1} />,
	<ProgressBar orientation="vertical" highlighted progress={0.5} />,
	<ProgressBar orientation="vertical" highlighted progress={1} />,
	<ProgressBar orientation="vertical" backgroundProgress={0.5} />,
	<ProgressBar orientation="vertical" backgroundProgress={1} />,
	<ProgressBar orientation="vertical" backgroundProgress={0.25} progress={0.5} />,
	<ProgressBar orientation="vertical" backgroundProgress={0.5} progress={0.25} />,
	<ProgressBar orientation="vertical" highlighted backgroundProgress={0.5} />,
	<ProgressBar orientation="vertical" highlighted backgroundProgress={1} />,
	<ProgressBar orientation="vertical" highlighted backgroundProgress={0.5} progress={0.25} />,
	<ProgressBar orientation="vertical" progress={0.75} progressAnchor={0.5} />,
	<ProgressBar orientation="vertical" progress={0.25} progressAnchor={0.5} />,
	<ProgressBar orientation="vertical" backgroundProgress={0.25} progress={0.75} progressAnchor={0.5} />,
	<ProgressBar orientation="vertical" backgroundProgress={0.75} progress={0.25} progressAnchor={0.5} />,
	<ProgressBar orientation="vertical" backgroundProgress={0.1} progress={0.25} progressAnchor={0.2} />,
	<ProgressBar orientation="vertical" progress={0.25} progressAnchor={0.5} tooltip />
];
export default ProgressBarTests;
