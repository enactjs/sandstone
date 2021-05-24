import Slider, {SliderTooltip as Tooltip} from '../../../../Slider';

import css from './Slider.module.less';

// TODO: RTL, different min/max with visible tooltip

const SliderTests = [
	<Slider />,
	<Slider value={50} />,
	<Slider value={50} showAnchor />,
	<Slider value={100} />,
	<Slider backgroundProgress={0.5} />,
	<Slider backgroundProgress={1} />,
	<Slider backgroundProgress={0.25} value={50} />,
	<Slider disabled backgroundProgress={0.25} value={50} />,
	<Slider backgroundProgress={0.5} value={25} />,
	<Slider backgroundProgress={0.5} value={50} />,
	<Slider value={75} progressAnchor={0.5} />,
	<Slider value={25} progressAnchor={0.5} />,
	<Slider value={25} progressAnchor={0.5} showAnchor />,
	<Slider backgroundProgress={0.25} value={75} progressAnchor={0.5} />,
	<Slider backgroundProgress={0.75} value={25} progressAnchor={0.5} />,
	<Slider backgroundProgress={0.1} value={25} progressAnchor={0.2} />,
	<Slider value={25} progressAnchor={0.5} tooltip />,
	<Slider orientation="vertical" />,
	<Slider orientation="vertical" value={50} />,
	<Slider orientation="vertical" value={50} showAnchor />,
	<Slider orientation="vertical" value={100} />,
	<Slider orientation="vertical" backgroundProgress={0.5} />,
	<Slider orientation="vertical" backgroundProgress={1} />,
	<Slider orientation="vertical" backgroundProgress={0.25} value={50} />,
	<Slider orientation="vertical" disabled backgroundProgress={0.25} value={50} />,
	<Slider orientation="vertical" backgroundProgress={0.5} value={25} />,
	<Slider orientation="vertical" value={75} progressAnchor={0.5} />,
	<Slider orientation="vertical" value={25} progressAnchor={0.5} />,
	<Slider orientation="vertical" value={25} progressAnchor={0.5} showAnchor />,
	<Slider orientation="vertical" backgroundProgress={0.25} value={75} progressAnchor={0.5} />,
	<Slider orientation="vertical" backgroundProgress={0.75} value={25} progressAnchor={0.5} />,
	<Slider orientation="vertical" backgroundProgress={0.1} value={25} progressAnchor={0.2} />,
	<Slider orientation="vertical" value={25} progressAnchor={0.5} tooltip />,

	// Customized style
	<Slider css={css} value={50} />,
	<Slider css={css} orientation="vertical" value={50} />,
	<Slider css={css} orientation="vertical" value={50} showAnchor />,

	// *************************************************************
	// tooltip - all positions
	// NOTE: Tooltip won't show on slider without focus.  Nothing should show!
	// TODO: Add focus support
	// *************************************************************
	{
		component: <Slider tooltip percent value={50} />,
		wrapper: {
			padded: true
		},
		focus: true
	},
	{
		component: <Slider tooltip min={-60.0} max={60.0} step={0.5} value={4.5} />,
		wrapper: {
			padded: true
		},
		focus: true
	},
	{
		component: <Slider tooltip={<Tooltip position="above" />} value={40} backgroundProgress={0.5} />,
		wrapper: {
			padded: true
		},
		focus: true
	},
	{
		component: <Slider tooltip={<Tooltip position="above" />} disabled value={40} backgroundProgress={0.5} />,
		wrapper: {
			padded: true
		},
		focus: true
	},
	{
		component: <Slider tooltip={<Tooltip position="above left" />} value={40} backgroundProgress={0.5} />,
		wrapper: {
			padded: true
		},
		focus: true
	},
	{
		component: <Slider tooltip={<Tooltip position="above right" />} value={40} backgroundProgress={0.5} />,
		wrapper: {
			padded: true
		},
		focus: true
	},
	{
		component: <Slider tooltip={<Tooltip position="above before" />} value={40} backgroundProgress={0.5} />,
		wrapper: {
			padded: true
		},
		focus: true
	},
	{
		component: <Slider tooltip={<Tooltip position="above after" />} value={40} backgroundProgress={0.5} />,
		wrapper: {
			padded: true
		},
		focus: true
	},
	{
		component: <Slider tooltip={<Tooltip position="before" />} value={40} backgroundProgress={0.5} />,
		wrapper: {
			padded: true
		},
		focus: true
	},
	{
		component: <Slider tooltip={<Tooltip position="left" />} value={40} backgroundProgress={0.5} />,
		wrapper: {
			padded: true
		},
		focus: true
	},
	{
		component: <Slider tooltip={<Tooltip position="right" />} value={40} backgroundProgress={0.5} />,
		wrapper: {
			padded: true
		},
		focus: true
	},
	{
		component: <Slider tooltip={<Tooltip position="after" />} value={40} backgroundProgress={0.5} />,
		wrapper: {
			padded: true
		},
		focus: true
	},
	{
		component: <Slider tooltip={<Tooltip position="below" />} value={40} backgroundProgress={0.5} />,
		wrapper: {
			padded: true
		},
		focus: true
	},
	{
		component: <Slider tooltip={<Tooltip position="below left" />} value={40} backgroundProgress={0.5} />,
		wrapper: {
			padded: true
		},
		focus: true
	},
	{
		component: <Slider tooltip={<Tooltip position="below right" />} value={40} backgroundProgress={0.5} />,
		wrapper: {
			padded: true
		},
		focus: true
	},
	{
		component: <Slider tooltip={<Tooltip position="below before" />} value={40} backgroundProgress={0.5} />,
		wrapper: {
			padded: true
		},
		focus: true
	},
	{
		component: <Slider tooltip={<Tooltip position="below after" />} value={40} backgroundProgress={0.5} />,
		wrapper: {
			padded: true
		},
		focus: true
	},
	// Vertical tooltip placement -- valid positions: before/after/left/right
	{
		component: <Slider orientation="vertical" tooltip={<Tooltip position="left" />} value={40} backgroundProgress={0.5} />,
		wrapper: {
			padded: true
		},
		focus: true
	},
	{
		component: <Slider orientation="vertical" tooltip={<Tooltip position="left" />} disabled value={40} backgroundProgress={0.5} />,
		wrapper: {
			padded: true
		},
		focus: true
	},
	{
		component: <Slider orientation="vertical" tooltip={<Tooltip position="right" />} value={40} backgroundProgress={0.5} />,
		wrapper: {
			padded: true
		},
		focus: true
	},
	{
		component: <Slider orientation="vertical" tooltip={<Tooltip position="before" />} value={40} backgroundProgress={0.5} />,
		wrapper: {
			padded: true
		},
		focus: true
	},
	{
		component: <Slider orientation="vertical" tooltip={<Tooltip position="after" />} value={40} backgroundProgress={0.5} />,
		wrapper: {
			padded: true
		},
		focus: true
	},
	// *************************************************************
	// locale = 'ar-SA'
	// *************************************************************
	{
		locale: 'ar-SA',
		component: <Slider value={40} backgroundProgress={0.5} />
	}
];
export default SliderTests;
