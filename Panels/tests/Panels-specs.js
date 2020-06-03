import React from 'react';
import {mount} from 'enzyme';

import Header from '../Header';
import Panel from '../Panel';
import Panels from '../Panels';

describe('Panels Specs', () => {

	test(
		'should set {autoFocus} on child to "default-element" on first render',
		() => {
			// eslint-disable-next-line enact/prop-types
			const DivPanel = ({autoFocus, id}) => <div id={id}>{autoFocus}</div>;
			const panels = mount(
				<Panels index={0}>
					<DivPanel />
				</Panels>
			);

			const expected = 'default-element';
			const actual = panels.find('DivPanel').prop('autoFocus');

			expect(actual).toBe(expected);
		}
	);

	test(
		'should set {autoFocus} on child to "default-element" when navigating to a higher index',
		() => {
			// eslint-disable-next-line enact/prop-types
			const DivPanel = ({autoFocus, id}) => <div id={id}>{autoFocus}</div>;
			const panels = mount(
				<Panels index={0}>
					<DivPanel />
					<DivPanel id="p2" />
				</Panels>
			);

			panels.setProps({
				index: 1
			});

			const expected = 'default-element';
			const actual = panels.find('DivPanel#p2').prop('autoFocus');

			expect(actual).toBe(expected);
		}
	);

	test(
		'should not set {autoFocus} on child when navigating to a higher index when it has an autoFocus prop set',
		() => {
			// eslint-disable-next-line enact/prop-types
			const DivPanel = ({autoFocus, id}) => <div id={id}>{autoFocus}</div>;
			const panels = mount(
				<Panels index={0}>
					<DivPanel />
					<DivPanel id="p2" autoFocus="last-focused" />
				</Panels>
			);

			panels.setProps({
				index: 1
			});

			const expected = 'last-focused';
			const actual = panels.find('DivPanel#p2').prop('autoFocus');

			expect(actual).toBe(expected);
		}
	);

	describe('with Panel and Header', () => {
		test(
			'should not render back button on the first panel',
			() => {
				const panels = mount(
					<Panels index={0}>
						<Panel>
							<Header />
						</Panel>
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
						<Panel>
							<Header />
						</Panel>
						<Panel>
							<Header />
						</Panel>
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
						<Panel>
							<Header />
						</Panel>
						<Panel>
							<Header />
						</Panel>
					</Panels>
				);

				const backButton = panels.find('Header .slotBefore').find('Button');
				const expected = 0;
				const actual = backButton.length;

				expect(actual).toBe(expected);
			}
		);

		test(
			'should not render back button when \'noBackButton\' is set on `Panel` 2',
			() => {
				const panels = mount(
					<Panels index={1}>
						<Panel>
							<Header />
						</Panel>
						<Panel noBackButton>
							<Header />
						</Panel>
					</Panels>
				);

				const backButton = panels.find('Header .slotBefore').find('Button');
				const expected = 0;
				const actual = backButton.length;

				expect(actual).toBe(expected);
			}
		);

		test(
			'should render back button on panel 3 when \'noBackButton\' is set on panel 2',
			() => {
				const panels = mount(
					<Panels index={2}>
						<Panel>
							<Header />
						</Panel>
						<Panel noBackButton>
							<Header />
						</Panel>
						<Panel>
							<Header />
						</Panel>
					</Panels>
				);

				const backButton = panels.find('Header .slotBefore').find('Button');
				const expected = 1;
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
						<Panel>
							<Header />
						</Panel>
						<Panel>
							<Header />
						</Panel>
					</Panels>
				);

				const expected = label;
				const actual = panels.find('Header .slotBefore').find('Button').prop('aria-label');

				expect(actual).toBe(expected);
			}
		);

		test(
			'should set back button "aria-label" to backButtonAriaLabel when defined only on a panel',
			() => {
				const label = 'custom back button label';
				const panels = mount(
					<Panels index={1}>
						<Panel>
							<Header />
						</Panel>
						<Panel backButtonAriaLabel={label}>
							<Header />
						</Panel>
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
						<Panel>
							<Header />
						</Panel>
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
						<Panel>
							<Header />
						</Panel>
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
						<Panel>
							<Header />
						</Panel>
					</Panels>
				);

				const expected = label;
				const actual = panels.find('Header .slotAfter').find('Button').prop('aria-label');

				expect(actual).toBe(expected);
			}
		);
	});
});
