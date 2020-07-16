import RangePicker from '@enact/sandstone/RangePicker';
import React from 'react';

import Section from '../components/Section';

import css from '../App/App.module.less';

const RangePickerView = () => (
	<>
		<h2>Default</h2>

		<Section className={css.marginTop} title="Horizontal">
			<RangePicker
				alt="Horizontal"
				defaultValue={0}
				max={100}
				min={0}
				orientation="horizontal"
				step={5}
				width="medium"
			/>

			<RangePicker
				alt="Horizontal and Disabled"
				defaultValue={0}
				disabled
				max={100}
				min={0}
				orientation="horizontal"
				step={5}
				width="medium"
			/>
		</Section>

		<Section className={css.marginTop} title="Horizontal and Joined">
			<RangePicker
				alt="Horizontal and Joined"
				defaultValue={0}
				joined
				max={100}
				min={0}
				orientation="horizontal"
				step={5}
				width="medium"
			/>
			<RangePicker
				alt="Horizontal, Joined, and Disabled"
				defaultValue={0}
				disabled
				joined
				max={100}
				min={0}
				orientation="horizontal"
				step={5}
				width="medium"
			/>
		</Section>

		<Section className={css.marginTop} title="Vertical" vertical>
			<RangePicker
				alt="Vertical"
				defaultValue={0}
				max={100}
				min={0}
				orientation="vertical"
				step={5}
				width="medium"
			/>

			<RangePicker
				alt="Vertical and Joined"
				defaultValue={0}
				joined
				max={100}
				min={0}
				orientation="vertical"
				step={5}
				width="medium"
			/>

			<RangePicker
				alt="Vertical and Disabled"
				defaultValue={0}
				disabled
				max={100}
				min={0}
				orientation="vertical"
				step={5}
				width="medium"
			/>

			<RangePicker
				alt="Vertical, Joined, and Disabled"
				defaultValue={0}
				disabled
				joined
				max={100}
				min={0}
				orientation="vertical"
				step={5}
				width="medium"
			/>
		</Section>

		<h2 className={css.headerMarginTop}>decrementAriaLabel and incrementAriaLabel</h2>

		<Section className={css.marginTop} title="Horizontal">
			<RangePicker
				alt="Horizontal"
				decrementAriaLabel="This is a Label 1."
				defaultValue={0}
				incrementAriaLabel="This is a Label 2."
				max={100}
				min={0}
				orientation="horizontal"
				step={5}
				width="medium"
			/>

			<RangePicker
				alt="Horizontal and Disabled"
				decrementAriaLabel="This is a Label 3."
				defaultValue={0}
				incrementAriaLabel="This is a Label 4."
				disabled
				max={100}
				min={0}
				orientation="horizontal"
				step={5}
				width="medium"
			/>
		</Section>

		<Section className={css.marginTop} title="Horizontal and Joined">
			<RangePicker
				alt="Horizontal and Joined"
				decrementAriaLabel="This is a Label 5."
				defaultValue={0}
				incrementAriaLabel="This is a Label 6."
				joined
				max={100}
				min={0}
				orientation="horizontal"
				step={5}
				width="medium"
			/>
			<RangePicker
				alt="Horizontal, Joined, and Disabled"
				decrementAriaLabel="This is a Label 7."
				defaultValue={0}
				disabled
				incrementAriaLabel="This is a Label 8."
				joined
				max={100}
				min={0}
				orientation="horizontal"
				step={5}
				width="medium"
			/>
		</Section>

		<Section className={css.marginTop} title="Vertical" vertical>
			<RangePicker
				alt="Vertical"
				decrementAriaLabel="This is a Label 9."
				defaultValue={0}
				incrementAriaLabel="This is a Label 10."
				max={100}
				min={0}
				orientation="vertical"
				step={5}
				width="medium"
			/>

			<RangePicker
				alt="Vertical and Joined"
				decrementAriaLabel="This is a Label 11."
				defaultValue={0}
				incrementAriaLabel="This is a Label 12."
				joined
				max={100}
				min={0}
				orientation="vertical"
				step={5}
				width="medium"
			/>

			<RangePicker
				alt="Vertical and Disabled"
				decrementAriaLabel="This is a Label 13."
				defaultValue={0}
				disabled
				incrementAriaLabel="This is a Label 14."
				max={100}
				min={0}
				orientation="vertical"
				step={5}
				width="medium"
			/>

			<RangePicker
				alt="Vertical, Joined, and Disabled"
				decrementAriaLabel="This is a Label 15."
				defaultValue={0}
				disabled
				incrementAriaLabel="This is a Label 16."
				joined
				max={100}
				min={0}
				orientation="vertical"
				step={5}
				width="medium"
			/>
		</Section>

		<h2 className={css.headerMarginTop}>Aria-labelled</h2>

		<Section className={css.marginTop} title="Horizontal">
			<RangePicker
				alt="Horizontal and Joined"
				aria-label="This is a Label 17."
				defaultValue={0}
				max={100}
				min={0}
				orientation="horizontal"
				step={5}
				width="medium"
			/>

			<RangePicker
				alt="Horizontal, Joined, and Disabled"
				aria-label="This is a Label 18."
				defaultValue={0}
				disabled
				max={100}
				min={0}
				orientation="horizontal"
				step={5}
				width="medium"
			/>
		</Section>

		<Section className={css.marginTop} title="Horizontal and Joined">
			<RangePicker
				alt="Horizontal and Joined"
				aria-label="This is a Label 19."
				defaultValue={0}
				joined
				max={100}
				min={0}
				orientation="horizontal"
				step={5}
				width="medium"
			/>

			<RangePicker
				alt="Horizontal, Joined, and Disabled"
				aria-label="This is a Label 20."
				defaultValue={0}
				disabled
				joined
				max={100}
				min={0}
				orientation="horizontal"
				step={5}
				width="medium"
			/>
		</Section>

		<Section className={css.marginTop} title="Vertical" vertical>
			<RangePicker
				alt="Vertical"
				aria-label="This is a Label 21."
				decrementAriaLabel="This is a Label 22."
				defaultValue={0}
				incrementAriaLabel="This is a Label 23."
				max={100}
				min={0}
				orientation="vertical"
				step={5}
				width="medium"
			/>

			<RangePicker
				alt="Vertical and Joined"
				aria-label="This is a Label 24."
				decrementAriaLabel="This is a Label 25."
				defaultValue={0}
				incrementAriaLabel="This is a Label 26."
				joined
				max={100}
				min={0}
				orientation="vertical"
				step={5}
				width="medium"
			/>

			<RangePicker
				alt="Vertical and Disabled"
				aria-label="This is a Label 27."
				decrementAriaLabel="This is a Label 28."
				defaultValue={0}
				disabled
				incrementAriaLabel="This is a Label 29."
				max={100}
				min={0}
				orientation="vertical"
				step={5}
				width="medium"
			/>

			<RangePicker
				alt="Vertical, Joined, and Disabled"
				aria-label="This is a Label 30."
				decrementAriaLabel="This is a Label 31."
				defaultValue={0}
				disabled
				incrementAriaLabel="This is a Label 32."
				joined
				max={100}
				min={0}
				orientation="vertical"
				step={5}
				width="medium"
			/>
		</Section>
	</>
);

export default RangePickerView;
