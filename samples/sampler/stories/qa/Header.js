import {boolean, text, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Button from '@enact/sandstone/Button';
import Input from '@enact/sandstone/Input';
import {Header, HeaderBase} from '@enact/sandstone/Panels';

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

const headerComponents = <Button>Header Button</Button>;

const prop = {
	marqueeOn: ['hover', 'render']
};

const headerStoryConfig = {
	props: {
		noHeader: true
	}
};

storiesOf('Header', module)
	.add(
		'just title',
		() => {
			const addHeaderComponents = boolean('add headerComponents', Config);
			return (
				<Header
					title={text('title', Config, inputData.shortTitle)}
					marqueeOn={select('marqueeOn', prop.marqueeOn, Config)}
				>
					{addHeaderComponents ? headerComponents : null}
				</Header>
			);
		}, headerStoryConfig
	)
	.add(
		'just title, Compact',
		() => {
			const addHeaderComponents = boolean('add headerComponents', Config);
			return (
				<Header
					type="compact"
					title={text('title', Config, inputData.shortTitle)}
					marqueeOn={select('marqueeOn', prop.marqueeOn, Config)}
				>
					{addHeaderComponents ? headerComponents : null}
				</Header>
			);
		}, headerStoryConfig
	)
	.add(
		'short titles',
		() => {
			const addHeaderComponents = boolean('add headerComponents', Config);
			return (
				<Header
					title={text('title', Config, inputData.shortTitle)}
					subtitle={text('subtitle', Config, inputData.shortSubtitle)}
					marqueeOn={select('marqueeOn', prop.marqueeOn, Config)}
				>
					{addHeaderComponents ? headerComponents : null}
				</Header>
			);
		}, headerStoryConfig
	)
	.add(
		'short titles, Compact',
		() => {
			const addHeaderComponents = boolean('add headerComponents', Config);
			return (
				<Header
					type="compact"
					title={text('title', Config, inputData.shortTitle)}
					subtitle={text('subtitle', Config, inputData.shortSubtitle)}
					marqueeOn={select('marqueeOn', prop.marqueeOn, Config)}
				>
					{addHeaderComponents ? headerComponents : null}
				</Header>
			);
		}, headerStoryConfig
	)
	.add(
		'long titles',
		() => {
			const addHeaderComponents = boolean('add headerComponents', Config);
			return (
				<Header
					title={text('title', Config, inputData.longTitle)}
					subtitle={text('subtitle', Config, inputData.longSubtitle)}
					marqueeOn={select('marqueeOn', prop.marqueeOn, Config)}
				>
					{addHeaderComponents ? headerComponents : null}
				</Header>
			);
		}, headerStoryConfig
	)
	.add(
		'long titles, Compact',
		() => {
			const addHeaderComponents = boolean('add headerComponents', Config);
			return (
				<Header
					type="compact"
					title={text('title', Config, inputData.longTitle)}
					subtitle={text('subtitle', Config, inputData.longSubtitle)}
					marqueeOn={select('marqueeOn', prop.marqueeOn, Config)}
				>
					{addHeaderComponents ? headerComponents : null}
				</Header>
			);
		}, headerStoryConfig
	)
	.add(
		'RTL text',
		() => {
			const addHeaderComponents = boolean('add headerComponents', Config);
			return (
				<Header
					title={text('title', Config, inputData.shortRtlTitle)}
					subtitle={text('subtitle', Config, inputData.shortRtlSubtitle)}
					marqueeOn={select('marqueeOn', prop.marqueeOn, Config)}
				>
					{addHeaderComponents ? headerComponents : null}
				</Header>
			);
		}, headerStoryConfig
	)
	.add(
		'RTL text, Compact',
		() => {
			const addHeaderComponents = boolean('add headerComponents', Config);
			return (
				<Header
					type="compact"
					title={text('title', Config, inputData.shortRtlTitle)}
					subtitle={text('subtitle', Config, inputData.shortRtlSubtitle)}
					marqueeOn={select('marqueeOn', prop.marqueeOn, Config)}
				>
					{addHeaderComponents ? headerComponents : null}
				</Header>
			);
		}, headerStoryConfig
	)
	.add(
		'RTL text, long title',
		() => {
			const addHeaderComponents = boolean('add headerComponents', Config);
			return (
				<Header
					title={text('title', Config, inputData. longRtlTitle)}
					subtitle={text('subtitle', Config, inputData.shortRtlSubtitle)}
					marqueeOn={select('marqueeOn', prop.marqueeOn, Config)}
				>
					{addHeaderComponents ? headerComponents : null}
				</Header>
			);
		}, headerStoryConfig
	)
	.add(
		'RTL text, long title, Compact',
		() => {
			const addHeaderComponents = boolean('add headerComponents', Config);
			return (
				<Header
					type="compact"
					title={text('title', Config, inputData. longRtlTitle)}
					subtitle={text('subtitle', Config, inputData.shortRtlSubtitle)}
					marqueeOn={select('marqueeOn', prop.marqueeOn, Config)}
				>
					{addHeaderComponents ? headerComponents : null}
				</Header>
			);
		}, headerStoryConfig
	)
	.add(
		'tall-glyphs',
		() => {
			const addHeaderComponents = boolean('add headerComponents', Config);
			return (
				<Header
					title={text('title', Config, inputData.tallText)}
					subtitle={text('subtitle', Config, inputData.tallText)}
					marqueeOn={select('marqueeOn', prop.marqueeOn, Config)}
				>
					{addHeaderComponents ? headerComponents : null}
				</Header>
			);
		}, headerStoryConfig
	)
	.add(
		'tall-glyphs, Compact',
		() => {
			const addHeaderComponents = boolean('add headerComponents', Config);
			return (
				<Header
					type="compact"
					title={text('title', Config, inputData.tallText)}
					subtitle={text('subtitle', Config, inputData.tallText)}
					marqueeOn={select('marqueeOn', prop.marqueeOn, Config)}
				>
					{addHeaderComponents ? headerComponents : null}
				</Header>
			);
		}, headerStoryConfig
	);

storiesOf('Header.Input', module)
	.add(
		'tall-glyphs',
		() => {
			const addHeaderComponents = boolean('add headerComponents', Config);
			const input = boolean('Input Mode', Config, true) ? <Input placeholder={text('placeholder', Config, inputData.longTitle)} dismissOnEnter={boolean('Input dismissOnEnter', Config, true)} /> : null;
			return (
				<Header
					title={text('title', Config, inputData.tallText)}
					headerInput={input}
					subtitle={text('subtitle', Config, inputData.longSubtitle)}
					marqueeOn={select('marqueeOn', prop.marqueeOn, Config)}
				>
					{addHeaderComponents ? headerComponents : null}
				</Header>
			);
		}, headerStoryConfig
	)
	.add(
		'long text',
		() => {
			const addHeaderComponents = boolean('add headerComponents', Config);
			const input = boolean('Input Mode', Config, true) ? <Input placeholder={text('placeholder', Config, inputData.longTitle)} dismissOnEnter={boolean('Input dismissOnEnter', Config, true)} /> : null;
			return (
				<Header
					headerInput={input}
					title={text('title', Config, inputData.longTitle)}
					subtitle={text('subtitle', Config, inputData.longSubtitle)}
					marqueeOn={select('marqueeOn', prop.marqueeOn, Config)}
				>
					{addHeaderComponents ? headerComponents : null}
				</Header>
			);
		}, headerStoryConfig
	);
