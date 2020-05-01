import React from 'react';
import {mount} from 'enzyme';

import {Header} from '../Header';
import {Panel as SandstonePanel} from '../Panel';
import {Panels} from '../Panels';

describe('Panels Specs', () => {

	test(
		'should set {autoFocus} on child to "default-element" on first render',
		() => {
			// eslint-disable-next-line enact/prop-types
			const Panel = ({autoFocus, id}) => <div id={id}>{autoFocus}</div>;
			const panels = mount(
				<Panels index={0}>
					<Panel id="p1" />
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
			const actual = panels.find('Panel#p2').prop('autoFocus');

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
			const actual = panels.find('Panel#p2').prop('autoFocus');

			expect(actual).toBe(expected);
		}
	);

	describe('with Panel and Header', () => {
		test(
			'should not render back button on the first panel',
			() => {
				const panels = mount(
					<Panels index={0}>
						<SandstonePanel id="p1">
							<Header />
						</SandstonePanel>
					</Panels>
				);

				const backButton = panels.find('Header .slotBefore').find('Button');
				const expected = 0;
				const actual = backButton.length;

				expect(actual).toBe(expected);
			}
		);

		test(
			'should render back button when not on the first panel',
			() => {
				const panels = mount(
					<Panels index={1}>
						<SandstonePanel id="p1">
							<Header />
						</SandstonePanel>
						<SandstonePanel id="p1">
							<Header />
						</SandstonePanel>
					</Panels>
				);

				const backButton = panels.find('Header .slotBefore').find('Button');
				const expected = 1;
				const actual = backButton.length;

				expect(actual).toBe(expected);
			}
		);

		test(
			'should not render back button when not on the first panel and \'noBackButton\' is set to true',
			() => {
				const panels = mount(
					<Panels index={1} noBackButton>
						<SandstonePanel id="p1">
							<Header />
						</SandstonePanel>
						<SandstonePanel id="p1">
							<Header />
						</SandstonePanel>
					</Panels>
				);

				const backButton = panels.find('Header .slotBefore').find('Button');
				const expected = 0;
				const actual = backButton.length;

				expect(actual).toBe(expected);
			}
		);

		test(
			'should set back button "aria-label" to backButtonAriaLabel',
			() => {
				const label = 'custom back button label';
				const panels = mount(
					<Panels backButtonAriaLabel={label} index={1}>
						<SandstonePanel id="p1">
							<Header />
						</SandstonePanel>
						<SandstonePanel id="p1">
							<Header />
						</SandstonePanel>
					</Panels>
				);

				const expected = label;
				const actual = panels.find('Header .slotBefore').find('Button').prop('aria-label');

				expect(actual).toBe(expected);
			}
		);

		test(
			'should render close button',
			() => {
				const panels = mount(
					<Panels index={0}>
						<SandstonePanel id="p1">
							<Header />
						</SandstonePanel>
					</Panels>
				);

				const closeButton = panels.find('Header .slotAfter').find('Button');
				const expected = 1;
				const actual = closeButton.length;

				expect(actual).toBe(expected);
			}
		);

		test(
			'should not render close button when \'noCloseButton\' is set to true',
			() => {
				const panels = mount(
					<Panels index={0} noCloseButton>
						<SandstonePanel id="p1">
							<Header />
						</SandstonePanel>
					</Panels>
				);

				const backButton = panels.find('Header .slotAfter').find('Button');
				const expected = 0;
				const actual = backButton.length;

				expect(actual).toBe(expected);
			}
		);

		test(
			'should set close button "aria-label" to closeButtonAriaLabel',
			() => {
				const label = 'custom close button label';
				const panels = mount(
					<Panels closeButtonAriaLabel={label} index={0}>
						<SandstonePanel id="p1">
							<Header />
						</SandstonePanel>
					</Panels>
				);

				const expected = label;
				const actual = panels.find('Header .slotAfter').find('Button').prop('aria-label');

				expect(actual).toBe(expected);
			}
		);
	});
});
