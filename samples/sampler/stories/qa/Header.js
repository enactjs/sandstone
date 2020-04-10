import {boolean, text, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Button from '@enact/sandstone/Button';
import Input from '@enact/sandstone/Input';
import {Header, HeaderBase} from '@enact/sandstone/Panels';
import Steps from '@enact/sandstone/Steps';

Header.displayName = 'Header';
const Config = mergeComponentMetadata('Header', HeaderBase, Header);

const inputData = {
	tallText: 'ฟิ้  ไั  ஒ  த',

	shortTitle: 'Enact',
	shortSubtitle: 'An app framework',
	shortRtlTitle: 'غينيا واستمر',
	shortRtlSubtitle: 'غينيا واستمر',

	longTitle: 'Core, The building blocks of an Enact application. Sandstone, our touch-centric UI library.',
	longSubtitle: 'An app development framework built atop React that’s easy to use, performant and customizable. The goal of Enact is to provide the building blocks for creating robust and maintainable applications.',
	longRtlTitle: 'هذا النص طويل ولكن ليس طويلاً. بالتأكيد ليست قصيرة جدا ، على الرغم من.'
};

const prop = {
	above: {
		none: null,
		steps: <Steps current={3} total={5} />
	},
	buttons: {
		'no buttons': null,
		'1 button': <Button icon="ellipsis" />,
		'2 buttons': <React.Fragment>
			<Button icon="search" />
			<Button icon="ellipsis" />
		</React.Fragment>
	},
	buttonsSelection: ['no buttons', '1 button', '2 buttons'],
	marqueeOn: ['hover', 'render']
};

const headerStoryConfig = {
	props: {
		noHeader: true
	}
};

function headerComponents () {
	const slotAboveSelection = select('slotAbove', ['none', 'steps'], Config);
	const slotAbove = prop.above[slotAboveSelection];
	const slotBeforeSelection = select('slotBefore', prop.buttonsSelection, Config);
	const slotBefore = prop.buttons[slotBeforeSelection];
	const slotAfterSelection = select('slotAfter', prop.buttonsSelection, Config);
	const slotAfter = prop.buttons[slotAfterSelection];
	const childrenSelection = select('children', prop.buttonsSelection, Config);
	const children = prop.buttons[childrenSelection];

	return {slotAbove, slotBefore, slotAfter, children};
}

storiesOf('Header', module)
	.add(
		'just title',
		() => {
			const {slotAbove, slotBefore, slotAfter, children} = headerComponents();
			return (
				<Header
					title={text('title', Config, inputData.shortTitle)}
					marqueeOn={select('marqueeOn', prop.marqueeOn, Config)}
					slotAbove={slotAbove}
					slotAfter={slotAfter}
					slotBefore={slotBefore}
				>
					{children}
				</Header>
			);
		}, headerStoryConfig
	)
	.add(
		'just title, Compact',
		() => {
			const {slotAbove, slotBefore, slotAfter, children} = headerComponents();
			return (
				<Header
					type="compact"
					title={text('title', Config, inputData.shortTitle)}
					marqueeOn={select('marqueeOn', prop.marqueeOn, Config)}
					slotAbove={slotAbove}
					slotAfter={slotAfter}
					slotBefore={slotBefore}
				>
					{children}
				</Header>
			);
		}, headerStoryConfig
	)
	.add(
		'short titles',
		() => {
			const {slotAbove, slotBefore, slotAfter, children} = headerComponents();
			return (
				<Header
					title={text('title', Config, inputData.shortTitle)}
					subtitle={text('subtitle', Config, inputData.shortSubtitle)}
					marqueeOn={select('marqueeOn', prop.marqueeOn, Config)}
					slotAbove={slotAbove}
					slotAfter={slotAfter}
					slotBefore={slotBefore}
				>
					{children}
				</Header>
			);
		}, headerStoryConfig
	)
	.add(
		'short titles, Compact',
		() => {
			const {slotAbove, slotBefore, slotAfter, children} = headerComponents();
			return (
				<Header
					type="compact"
					title={text('title', Config, inputData.shortTitle)}
					subtitle={text('subtitle', Config, inputData.shortSubtitle)}
					marqueeOn={select('marqueeOn', prop.marqueeOn, Config)}
					slotAbove={slotAbove}
					slotAfter={slotAfter}
					slotBefore={slotBefore}
				>
					{children}
				</Header>
			);
		}, headerStoryConfig
	)
	.add(
		'long titles',
		() => {
			const {slotAbove, slotBefore, slotAfter, children} = headerComponents();
			return (
				<Header
					title={text('title', Config, inputData.longTitle)}
					subtitle={text('subtitle', Config, inputData.longSubtitle)}
					marqueeOn={select('marqueeOn', prop.marqueeOn, Config)}
					slotAbove={slotAbove}
					slotAfter={slotAfter}
					slotBefore={slotBefore}
				>
					{children}
				</Header>
			);
		}, headerStoryConfig
	)
	.add(
		'long titles, Compact',
		() => {
			const {slotAbove, slotBefore, slotAfter, children} = headerComponents();
			return (
				<Header
					type="compact"
					title={text('title', Config, inputData.longTitle)}
					subtitle={text('subtitle', Config, inputData.longSubtitle)}
					marqueeOn={select('marqueeOn', prop.marqueeOn, Config)}
					slotAbove={slotAbove}
					slotAfter={slotAfter}
					slotBefore={slotBefore}
				>
					{children}
				</Header>
			);
		}, headerStoryConfig
	)
	.add(
		'RTL text',
		() => {
			const {slotAbove, slotBefore, slotAfter, children} = headerComponents();
			return (
				<Header
					title={text('title', Config, inputData.shortRtlTitle)}
					subtitle={text('subtitle', Config, inputData.shortRtlSubtitle)}
					marqueeOn={select('marqueeOn', prop.marqueeOn, Config)}
					slotAbove={slotAbove}
					slotAfter={slotAfter}
					slotBefore={slotBefore}
				>
					{children}
				</Header>
			);
		}, headerStoryConfig
	)
	.add(
		'RTL text, Compact',
		() => {
			const {slotAbove, slotBefore, slotAfter, children} = headerComponents();
			return (
				<Header
					type="compact"
					title={text('title', Config, inputData.shortRtlTitle)}
					subtitle={text('subtitle', Config, inputData.shortRtlSubtitle)}
					marqueeOn={select('marqueeOn', prop.marqueeOn, Config)}
					slotAbove={slotAbove}
					slotAfter={slotAfter}
					slotBefore={slotBefore}
				>
					{children}
				</Header>
			);
		}, headerStoryConfig
	)
	.add(
		'RTL text, long title',
		() => {
			const {slotAbove, slotBefore, slotAfter, children} = headerComponents();
			return (
				<Header
					title={text('title', Config, inputData. longRtlTitle)}
					subtitle={text('subtitle', Config, inputData.shortRtlSubtitle)}
					marqueeOn={select('marqueeOn', prop.marqueeOn, Config)}
					slotAbove={slotAbove}
					slotAfter={slotAfter}
					slotBefore={slotBefore}
				>
					{children}
				</Header>
			);
		}, headerStoryConfig
	)
	.add(
		'RTL text, long title, Compact',
		() => {
			const {slotAbove, slotBefore, slotAfter, children} = headerComponents();
			return (
				<Header
					type="compact"
					title={text('title', Config, inputData. longRtlTitle)}
					subtitle={text('subtitle', Config, inputData.shortRtlSubtitle)}
					marqueeOn={select('marqueeOn', prop.marqueeOn, Config)}
					slotAbove={slotAbove}
					slotAfter={slotAfter}
					slotBefore={slotBefore}
				>
					{children}
				</Header>
			);
		}, headerStoryConfig
	)
	.add(
		'tall-glyphs',
		() => {
			const {slotAbove, slotBefore, slotAfter, children} = headerComponents();
			return (
				<Header
					title={text('title', Config, inputData.tallText)}
					subtitle={text('subtitle', Config, inputData.tallText)}
					marqueeOn={select('marqueeOn', prop.marqueeOn, Config)}
					slotAbove={slotAbove}
					slotAfter={slotAfter}
					slotBefore={slotBefore}
				>
					{children}
				</Header>
			);
		}, headerStoryConfig
	)
	.add(
		'tall-glyphs, Compact',
		() => {
			const {slotAbove, slotBefore, slotAfter, children} = headerComponents();
			return (
				<Header
					type="compact"
					title={text('title', Config, inputData.tallText)}
					subtitle={text('subtitle', Config, inputData.tallText)}
					marqueeOn={select('marqueeOn', prop.marqueeOn, Config)}
					slotAbove={slotAbove}
					slotAfter={slotAfter}
					slotBefore={slotBefore}
				>
					{children}
				</Header>
			);
		}, headerStoryConfig
	);

storiesOf('Header.Input', module)
	.add(
		'tall-glyphs',
		() => {
			const {slotAbove, slotBefore, slotAfter, children} = headerComponents();
			const input = boolean('Input Mode', Config, true) ? <Input placeholder={text('placeholder', Config, inputData.longTitle)} dismissOnEnter={boolean('Input dismissOnEnter', Config, true)} /> : null;
			const showInput = boolean('showInput', Config, true);
			return (
				<Header
					title={text('title', Config, inputData.tallText)}
					headerInput={input}
					subtitle={text('subtitle', Config, inputData.longSubtitle)}
					marqueeOn={select('marqueeOn', prop.marqueeOn, Config)}
					showInput={showInput}
					slotAbove={slotAbove}
					slotAfter={slotAfter}
					slotBefore={slotBefore}
				>
					{children}
				</Header>
			);
		}, headerStoryConfig
	)
	.add(
		'long text',
		() => {
			const {slotAbove, slotBefore, slotAfter, children} = headerComponents();
			const input = boolean('Input Mode', Config, true) ? <Input placeholder={text('placeholder', Config, inputData.longTitle)} dismissOnEnter={boolean('Input dismissOnEnter', Config, true)} /> : null;
			const showInput = boolean('showInput', Config, true);
			return (
				<Header
					headerInput={input}
					title={text('title', Config, inputData.longTitle)}
					subtitle={text('subtitle', Config, inputData.longSubtitle)}
					marqueeOn={select('marqueeOn', prop.marqueeOn, Config)}
					showInput={showInput}
					slotAbove={slotAbove}
					slotAfter={slotAfter}
					slotBefore={slotBefore}
				>
					{children}
				</Header>
			);
		}, headerStoryConfig
	);
