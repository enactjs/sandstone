import ProgressBar, {ProgressBarTooltip as Tooltip} from '../../../../ProgressBar';

import {withConfig} from './utils';

// [QWT-2781] - generic to test Progress Bar and Background Progress Bar Colors - no end marked for this test
const ProgressBarLTRTests = [
	<ProgressBar />,
	<ProgressBar disabled />,
	<ProgressBar highlighted />,
	<ProgressBar progress={0.5} />,
	<ProgressBar progress={0.5} showAnchor />,
	<ProgressBar progress={1} />,
	<ProgressBar highlighted progress={0.5} />,
	<ProgressBar highlighted progress={1} />,
	<ProgressBar backgroundProgress={0.5} />,
	<ProgressBar backgroundProgress={1} />,
	<ProgressBar backgroundProgress={0.25} progress={0.5} />,  // [QWT-2779] - Step 6
	<ProgressBar backgroundProgress={0.5} progress={0.25} />,  // [QWT-2779] - Step 5
	<ProgressBar backgroundProgress={0.5} progress={0.5} />,
	<ProgressBar highlighted backgroundProgress={0.5} />,
	<ProgressBar highlighted backgroundProgress={1} />,
	// [QWT-2784]
	<ProgressBar highlighted backgroundProgress={0.5} progress={0.25} />,
	// end of [QWT-2784]
	{
		component: <ProgressBar tooltip />,
		wrapper: {
			padded: true
		}
	},
	{
		component: <ProgressBar tooltip progress={0.5} />,
		wrapper: {
			padded: true
		}
	},
	{
		component: <ProgressBar disabled tooltip progress={0.5} />,
		wrapper: {
			padded: true
		}
	},
	{
		component: <ProgressBar tooltip percent progress={0.5} />,
		wrapper: {
			padded: true
		}
	},
	{
		component: <ProgressBar progress={0.25} progressAnchor={0.5} tooltip />,
		wrapper: {
			padded: true
		}
	},
	<ProgressBar progress={0.75} progressAnchor={0.5} />,
	<ProgressBar progress={0.25} progressAnchor={0.5} />,
	<ProgressBar progress={0.25} progressAnchor={0.5} showAnchor />,
	<ProgressBar backgroundProgress={0.25} progress={0.75} progressAnchor={0.5} />,
	<ProgressBar backgroundProgress={0.75} progress={0.25} progressAnchor={0.5} />,
	<ProgressBar backgroundProgress={0.1} progress={0.25} progressAnchor={0.2} />,
	{
		component: <ProgressBar progress={0.25} progressAnchor={0.5} tooltip />,
		wrapper: {
			padded: true
		}
	},
	<ProgressBar orientation="vertical" />,
	<ProgressBar orientation="vertical" disabled />,
	<ProgressBar orientation="vertical" highlighted />,
	<ProgressBar orientation="vertical" progress={0.5} />, // [QWT-2778]
	<ProgressBar orientation="vertical" progress={0.5} showAnchor />,
	<ProgressBar orientation="vertical" progress={1} />,
	<ProgressBar orientation="vertical" highlighted progress={0.5} />,
	<ProgressBar orientation="vertical" highlighted progress={1} />,
	<ProgressBar orientation="vertical" backgroundProgress={0.5} />,
	<ProgressBar orientation="vertical" backgroundProgress={1} />,
	<ProgressBar orientation="vertical" backgroundProgress={0.25} progress={0.5} />, // [QWT-2778]
	<ProgressBar orientation="vertical" backgroundProgress={0.5} progress={0.25} />,
	<ProgressBar orientation="vertical" highlighted backgroundProgress={0.5} />,
	<ProgressBar orientation="vertical" highlighted backgroundProgress={1} />,
	<ProgressBar orientation="vertical" highlighted backgroundProgress={0.5} progress={0.25} />,
	<ProgressBar orientation="vertical" progress={0.75} progressAnchor={0.5} />,
	<ProgressBar orientation="vertical" progress={0.25} progressAnchor={0.5} />,
	<ProgressBar orientation="vertical" progress={0.25} progressAnchor={0.5} showAnchor />,
	<ProgressBar orientation="vertical" backgroundProgress={0.25} progress={0.75} progressAnchor={0.5} />,
	<ProgressBar orientation="vertical" backgroundProgress={0.75} progress={0.25} progressAnchor={0.5} />,
	<ProgressBar orientation="vertical" backgroundProgress={0.1} progress={0.25} progressAnchor={0.2} />,
	<ProgressBar orientation="vertical" progress={0.25} progressAnchor={0.5} tooltip />,
	<ProgressBar orientation="vertical" progress={0.25} progressAnchor={0.5} tooltip disabled />,
	// *************************************************************
	// tooltip - all positions
	// *************************************************************
	// Change 'position' (location and direction) dynamically of Tooltip - [QWT-2783]
	{
		component: <ProgressBar tooltip={<Tooltip position="above" />} progress={0.4} backgroundProgress={0.5} />,
		wrapper: {
			padded: true
		}
	},
	{
		component: <ProgressBar tooltip={<Tooltip position="above left" />} progress={0.4} backgroundProgress={0.5} />,
		wrapper: {
			padded: true
		}
	},
	{
		component: <ProgressBar tooltip={<Tooltip position="above right" />} progress={0.4} backgroundProgress={0.5} />,
		wrapper: {
			padded: true
		}
	},
	{
		component: <ProgressBar tooltip={<Tooltip position="above before" />} progress={0.4} backgroundProgress={0.5} />,
		wrapper: {
			padded: true
		}
	},
	{
		component: <ProgressBar tooltip={<Tooltip position="above after" />} progress={0.4} backgroundProgress={0.5} />,
		wrapper: {
			padded: true
		}
	},
	{
		component: <ProgressBar tooltip={<Tooltip position="before" />} progress={0.4} backgroundProgress={0.5} />,
		wrapper: {
			padded: true
		}
	},
	{
		component: <ProgressBar tooltip={<Tooltip position="left" />} progress={0.4} backgroundProgress={0.5} />,
		wrapper: {
			padded: true
		}
	},
	{
		component: <ProgressBar tooltip={<Tooltip position="right" />} progress={0.4} backgroundProgress={0.5} />,
		wrapper: {
			padded: true
		}
	},
	{
		component: <ProgressBar tooltip={<Tooltip position="after" />} progress={0.4} backgroundProgress={0.5} />,
		wrapper: {
			padded: true
		}
	},
	{
		component: <ProgressBar tooltip={<Tooltip position="below" />} progress={0.4} backgroundProgress={0.5} />,
		wrapper: {
			padded: true
		}
	},
	{
		component: <ProgressBar tooltip={<Tooltip position="below left" />} progress={0.4} backgroundProgress={0.5} />,
		wrapper: {
			padded: true
		}
	},
	{
		component: <ProgressBar tooltip={<Tooltip position="below right" />} progress={0.4} backgroundProgress={0.5} />,
		wrapper: {
			padded: true
		}
	},
	{
		component: <ProgressBar tooltip={<Tooltip position="below before" />} progress={0.4} backgroundProgress={0.5} />,
		wrapper: {
			padded: true
		}
	},
	{
		component: <ProgressBar tooltip={<Tooltip position="below after" />} progress={0.4} backgroundProgress={0.5} />,
		wrapper: {
			padded: true
		}
	},
	// end of [QWT-2783]
	// Vertical tooltip placement -- valid positions: before/after/left/right [QWT-2777]
	{
		component: <ProgressBar orientation="vertical" tooltip={<Tooltip position="left" />} progress={0.4} backgroundProgress={0.5} />,
		wrapper: {
			padded: true
		}
	},
	{
		component: <ProgressBar orientation="vertical" tooltip={<Tooltip position="right" />} progress={0.4} backgroundProgress={0.5} />,
		wrapper: {
			padded: true
		}
	},
	{
		component: <ProgressBar orientation="vertical" tooltip={<Tooltip position="before" />} progress={0.4} backgroundProgress={0.5} />,
		wrapper: {
			padded: true
		}
	},
	{
		component: <ProgressBar orientation="vertical" tooltip={<Tooltip position="after" />} progress={0.4} backgroundProgress={0.5} />,
		wrapper: {
			padded: true
		}
	},
	// end of [QWT-2777]
	// Radial tooltip placement -- valid positions: before/after/left/right [QWT-2776]
	{
		component: <ProgressBar orientation="radial" tooltip={<Tooltip position="left" />} progress={0.4} backgroundProgress={0.5} />,
		wrapper: {
			padded: true
		}
	},
	{
		component: <ProgressBar orientation="radial" tooltip={<Tooltip position="right" />} progress={0.4} backgroundProgress={0.5} />,
		wrapper: {
			padded: true
		}
	},
	{
		component: <ProgressBar orientation="radial" tooltip={<Tooltip position="before" />} progress={0.4} backgroundProgress={0.5} />,
		wrapper: {
			padded: true
		}
	},
	{
		component: <ProgressBar orientation="radial" tooltip={<Tooltip position="after" />} progress={0.4} backgroundProgress={0.5} />,
		wrapper: {
			padded: true
		}
	},
	// end of [QWT-2776]
	// *************************************************************
	// end of tooltip - all positions
	// *************************************************************
	<ProgressBar orientation="radial" />,
	<ProgressBar orientation="radial" disabled />,
	<ProgressBar orientation="radial" highlighted />,
	<ProgressBar orientation="radial" progress={0.5} />,
	<ProgressBar orientation="radial" progress={1} />,
	<ProgressBar orientation="radial" highlighted progress={0.5} />,
	<ProgressBar orientation="radial" highlighted progress={1} />,
	<ProgressBar orientation="radial" backgroundProgress={0.5} />,
	<ProgressBar orientation="radial" backgroundProgress={1} />,
	<ProgressBar orientation="radial" backgroundProgress={0.25} progress={0.5} />,
	<ProgressBar orientation="radial" backgroundProgress={0.5} progress={0.25} />,
	<ProgressBar orientation="radial" highlighted backgroundProgress={0.5} />,
	<ProgressBar orientation="radial" highlighted backgroundProgress={1} />,
	<ProgressBar orientation="radial" highlighted backgroundProgress={0.5} progress={0.25} />
	/* Disabling progressAnchor tests for radial as it's not supported yet
	<ProgressBar orientation="radial" progress={0.75} progressAnchor={0.5} />,
	<ProgressBar orientation="radial" progress={0.25} progressAnchor={0.5} />,
	<ProgressBar orientation="radial" backgroundProgress={0.25} progress={0.75} progressAnchor={0.5} />,
	<ProgressBar orientation="radial" backgroundProgress={0.75} progress={0.25} progressAnchor={0.5} />,
	<ProgressBar orientation="radial" backgroundProgress={0.1} progress={0.25} progressAnchor={0.2} />,
	<ProgressBar orientation="radial" progress={0.25} progressAnchor={0.5} tooltip />,
	*/
];

const ProgressBarTests = [
	...ProgressBarLTRTests,
	// *************************************************************
	// locale = 'ar-SA'
	// *************************************************************
	// [QWT-2782]
	...withConfig({locale: 'ar-SA'}, ProgressBarLTRTests)
];

export default ProgressBarTests;
