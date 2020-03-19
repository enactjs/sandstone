import React from 'react';
import {mount} from 'enzyme';

import {Panels} from '../Panels';


// 2019-04-11 - Skipped tests here are avoiding a Hooks testing issue. At this time, enzyme does not
// properly test hooks, specifically the useCallback method.

describe('Panels Specs', () => {

	test(
		'should set {autoFocus} on child to "default-element" on first render',
		() => {
			// eslint-disable-next-line enact/prop-types
			const Panel = ({autoFocus, id}) => <div id={id}>{autoFocus}</div>;
			const panels = mount(
				<Panels index={0}>
					<Panel id="p1" />
					<Panel id="p2" />
				</Panels>
			);

			const expected = 'default-element';
			const actual = panels.find('Panel').prop('autoFocus');

			expect(actual).toBe(expected);
		}
	);

	test(
		'should set {autoFocus} on child to "default-element" when navigating to a higher index',
		() => {
			// eslint-disable-next-line enact/prop-types
			const Panel = ({autoFocus, id}) => <div id={id}>{autoFocus}</div>;
			const panels = mount(
				<Panels index={0}>
					<Panel id="p1" />
					<Panel id="p2" />
				</Panels>
			);

			panels.setProps({
				index: 1
			});

			const expected = 'default-element';
			const actual = panels.find('Panel').prop('autoFocus');

			expect(actual).toBe(expected);
		}
	);

	test(
		'should not set {autoFocus} on child when navigating to a higher index when it has an autoFocus prop set',
		() => {
			// eslint-disable-next-line enact/prop-types
			const Panel = ({autoFocus, id}) => <div id={id}>{autoFocus}</div>;
			const panels = mount(
				<Panels index={0}>
					<Panel id="p1" />
					<Panel id="p2" autoFocus="last-focused" />
				</Panels>
			);

			panels.setProps({
				index: 1
			});

			const expected = 'last-focused';
			const actual = panels.find('Panel').prop('autoFocus');

			expect(actual).toBe(expected);
		}
	);
});
