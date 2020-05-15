import React from 'react';
import {mount, shallow} from 'enzyme';

import {Panel, WizardPanels, WizardPanelsBase} from '../';

describe('WizardPanel Specs', () => {
	test(
		'should have title in `Header`',
		() => {
			const title = 'WizardPanel title';

			const wizardPanel = shallow(
				<WizardPanelsBase title={title} />
			);

			const headerTitle = wizardPanel.find({type: 'wizard'}).prop('title');

			const expected = title;
			const actual = headerTitle;

			expect(actual).toBe(expected);
		}
	);

	test(
		'should have subtitle in `Header`',
		() => {
			const subtitle = 'WizardPanel subtitle';

			const wizardPanel = shallow(
				<WizardPanelsBase subtitle={subtitle} />
			);

			const headerSubTitle = wizardPanel.find({type: 'wizard'}).prop('subtitle');

			const expected = subtitle;
			const actual = headerSubTitle;

			expect(actual).toBe(expected);
		}
	);

	test(
		'should have title overridden by title set in `View`',
		() => {
			const wizardTitle = 'WizardPanel title';
			const viewTitle = 'View title';

			const wizardPanel = mount(
				<WizardPanels title={wizardTitle}>
					<Panel title={viewTitle} />
				</WizardPanels>
			);

			const headerTitle = wizardPanel.find('Header').prop('title');

			const expected = viewTitle;
			const actual = headerTitle;

			wizardPanel.unmount();
			expect(actual).toBe(expected);
		}
	);

	test(
		'should have subtitle from `View`',
		() => {
			const viewSubtitle = 'View subtitle';

			const wizardPanel = mount(
				<WizardPanels>
					<Panel subtitle={viewSubtitle} />
				</WizardPanels>
			);

			const headerSubtitle = wizardPanel.find('Header').prop('subtitle');

			const expected = viewSubtitle;
			const actual = headerSubtitle;

			wizardPanel.unmount();
			expect(actual).toBe(expected);
		}
	);

	test(
		'should have footer from `View`',
		() => {
			const viewFooter = 'View footer';

			const wizardPanel = mount(
				<WizardPanels>
					<Panel footer={viewFooter} />
				</WizardPanels>
			);

			const footerText = wizardPanel.find('.footer').text();

			const expected = viewFooter;
			const actual = footerText;

			wizardPanel.unmount();
			expect(actual).toBe(expected);
		}
	);

	test(
		'should have View buttons rendered in `.buttonContainer`',
		() => {
			const wizardPanel = mount(
				<WizardPanels>
					<Panel>
						<buttons>
							<button>Button 1</button>
							<button>Button 2</button>
						</buttons>
					</Panel>
				</WizardPanels>
			);

			const buttons = wizardPanel.find('.buttonContainer').find('button').length;

			const expected = 2;
			const actual = buttons;

			wizardPanel.unmount();
			expect(actual).toBe(expected);
		}
	);

	test(
		'should have View contents rendered in `.content`',
		() => {
			const contentText = 'content';

			const wizardPanel = mount(
				<WizardPanels>
					<Panel>
						{contentText}
					</Panel>
				</WizardPanels>
			);

			const content = wizardPanel.find('.content').find('.enact-fit').text();

			const expected = contentText;
			const actual = content;

			wizardPanel.unmount();
			expect(actual).toBe(expected);
		}
	);

	test(
		'should have nextButtonText in `.nextButton`',
		() => {
			const nextButtonText = 'next';

			const wizardPanel = shallow(
				<WizardPanelsBase totalPanels={2} nextButtonText={nextButtonText} />
			);

			// Using slot as a proxy to find Button since it's name isn't set
			const nextButton = wizardPanel.find({slot: 'slotAfter'});

			const expected = {children: nextButtonText};
			const actual = nextButton.props();

			expect(actual).toMatchObject(expected);
		}
	);

	test(
		'should have prevButtonText in `.prevButton`',
		() => {
			const prevButtonText = 'previous';

			const wizardPanel = shallow(
				<WizardPanelsBase index={1} totalPanels={2} prevButtonText={prevButtonText} />
			);

			const prevButton = wizardPanel.find({slot: 'slotBefore'});

			const expected = {children: prevButtonText};
			const actual = prevButton.props();

			expect(actual).toMatchObject(expected);
		}
	);

	test(
		'should hide next button on the last view',
		() => {
			const wizardPanel = shallow(
				<WizardPanelsBase index={2} noNextButton totalPanels={3} />
			);

			const nextButton = wizardPanel.find({slot: 'slotAfter'});

			const expected = false;
			const actual = nextButton.exists();

			expect(actual).toBe(expected);
		}
	);

	test(
		'should hide previous button on the first view',
		() => {
			const wizardPanel = shallow(
				<WizardPanelsBase index={0} noPrevButton totalPanels={3} />
			);

			const prevButton = wizardPanel.find({slot: 'slotBefore'});

			const expected = false;
			const actual = prevButton.exists();

			expect(actual).toBe(expected);
		}
	);

	test(
		'should set next button "aria-label" to nextButtonAriaLabel',
		() => {
			const label = 'custom next button label';
			const wizardPanel = shallow(
				<WizardPanelsBase totalPanels={2} nextButtonAriaLabel={label} />
			);

			const expected = label;
			const actual = wizardPanel.find({slot: 'slotAfter'}).prop('aria-label');

			expect(actual).toBe(expected);
		}
	);

	test(
		'should set previous button "aria-label" to prevButtonAriaLabel',
		() => {
			const label = 'custom previous button label';
			const wizardPanel = shallow(
				<WizardPanelsBase index={1} totalPanels={2} prevButtonAriaLabel={label} />
			);

			const expected = label;
			const actual = wizardPanel.find({slot: 'slotBefore'}).prop('aria-label');

			expect(actual).toBe(expected);
		}
	);

	test(
		'should hide next button with `noNextButton`',
		() => {
			const wizardPanel = shallow(
				<WizardPanelsBase index={2} noNextButton totalPanels={4} />
			);

			const nextButton = wizardPanel.find({slot: 'slotAfter'});

			const expected = false;
			const actual = nextButton.exists();

			expect(actual).toBe(expected);
		}
	);

	test(
		'should hide previous button with `noPrevButton`',
		() => {
			const wizardPanel = shallow(
				<WizardPanelsBase index={2} noPrevButton totalPanels={4} />
			);

			const prevButton = wizardPanel.find({slot: 'slotBefore'});

			const expected = false;
			const actual = prevButton.exists();

			expect(actual).toBe(expected);
		}
	);

	test(
		'should fire onWillTransition with target index',
		() => {
			const spy = jest.fn();
			let index = 0;
			const wizardPanel = mount(
				<WizardPanels index={index} onWillTransition={spy} noAnimation>
					<Panel>I gots contents</Panel>
					<Panel>I gots contents2</Panel>
				</WizardPanels>
			);

			spy.mockClear();
			index++;
			wizardPanel.setProps({index});

			const expected = {index};
			const actual = spy.mock.calls.length && spy.mock.calls[0][0];

			wizardPanel.unmount();
			expect(actual).toMatchObject(expected);
		}
	);

	test(
		'should fire onTransition with target index',
		() => {
			const spy = jest.fn();
			let index = 0;
			const wizardPanel = mount(
				<WizardPanels index={index} onTransition={spy} noAnimation>
					<Panel>I gots contents</Panel>
					<Panel>I gots contents2</Panel>
				</WizardPanels>
			);

			spy.mockClear();
			index++;
			wizardPanel.setProps({index});

			const expected = {index};
			const actual = spy.mock.calls.length && spy.mock.calls[0][0];

			wizardPanel.unmount();
			expect(actual).toMatchObject(expected);
		}
	);

	test(
		'should advance on next click',
		() => {
			const wizardPanel = mount(
				<WizardPanels>
					<Panel />
					<Panel />
					<Panel />
				</WizardPanels>
			);

			const nextButton = wizardPanel.find('Button[aria-label="Next"]');

			nextButton.simulate('click');

			const expected = {current: 2};
			const actual = wizardPanel.find('Steps').props();

			wizardPanel.unmount();
			expect(actual).toMatchObject(expected);
		}
	);

	test(
		'should go back on prev click',
		() => {
			const wizardPanel = mount(
				<WizardPanels defaultIndex={1}>
					<Panel />
					<Panel />
					<Panel />
				</WizardPanels>
			);

			const prevButton = wizardPanel.find('Button[aria-label="Previous"]');

			prevButton.simulate('click');

			const expected = {current: 1};
			const actual = wizardPanel.find('Steps').props();

			wizardPanel.unmount();
			expect(actual).toMatchObject(expected);
		}
	);

	test(
		'should go back on back key',
		() => {
			const map = {};

			window.addEventListener = jest.fn((event, cb) => {
				map[event] = cb;
			});

			const wizardPanel = mount(
				<WizardPanels defaultIndex={1}>
					<Panel />
					<Panel />
					<Panel />
				</WizardPanels>
			);

			map.keyup({type: 'keyup', currentTarget: window, keyCode: 27});
			wizardPanel.update();

			const expected = {current: 1};
			const actual = wizardPanel.find('Steps').props();

			wizardPanel.unmount();
			expect(actual).toMatchObject(expected);
		}
	);

	test(
		'should not go back on back key when noPrevButton set',
		() => {
			const map = {};

			window.addEventListener = jest.fn((event, cb) => {
				map[event] = cb;
			});

			const wizardPanel = mount(
				<WizardPanels defaultIndex={1} noPrevButton>
					<Panel />
					<Panel />
					<Panel />
				</WizardPanels>
			);

			map.keyup({type: 'keyup', currentTarget: window, keyCode: 27});
			wizardPanel.update();

			const expected = {current: 2};
			const actual = wizardPanel.find('Steps').props();

			wizardPanel.unmount();
			expect(actual).toMatchObject(expected);
		}
	);

	test(
		'should go back on back key when onBack does not call preventDefault',
		() => {
			const map = {};

			window.addEventListener = jest.fn((event, cb) => {
				map[event] = cb;
			});
			const spy = jest.fn();

			const wizardPanel = mount(
				<WizardPanels defaultIndex={1} onBack={spy}>
					<Panel />
					<Panel />
					<Panel />
				</WizardPanels>
			);

			map.keyup({type: 'keyup', currentTarget: window, keyCode: 27});
			wizardPanel.update();

			const expected = {current: 1};
			const actual = wizardPanel.find('Steps').props();

			wizardPanel.unmount();
			expect(actual).toMatchObject(expected);
		}
	);

	test(
		'should not go back on back key when onBack calls preventDefault',
		() => {
			const map = {};

			window.addEventListener = jest.fn((event, cb) => {
				map[event] = cb;
			});
			const spy = jest.fn((ev) => ev.preventDefault());

			const wizardPanel = mount(
				<WizardPanels defaultIndex={1} onBack={spy}>
					<Panel />
					<Panel />
					<Panel />
				</WizardPanels>
			);

			map.keyup({type: 'keyup', currentTarget: window, keyCode: 27});
			wizardPanel.update();

			const expected = {current: 2};
			const actual = wizardPanel.find('Steps').props();

			wizardPanel.unmount();
			expect(actual).toMatchObject(expected);
		}
	);

	test(
		'should support noAnimation',
		() => {
			// FIXME: Temporary selector until our components have corrected display names
			const viewManager = '.content > *';
			const wizardPanel = shallow(
				<WizardPanelsBase>
					<Panel />
				</WizardPanelsBase>
			);

			let actual = wizardPanel.find(viewManager).prop('noAnimation');
			expect(actual).toBeFalsy();

			wizardPanel.setProps({noAnimation: true});

			actual = wizardPanel.find(viewManager).prop('noAnimation');
			expect(actual).toBe(true);
		}
	);

	// [GT-28312]
	test(
		'should reflect the current index in Steps',
		() => {
			const index = 1;
			const wizardPanel = shallow(
				<WizardPanelsBase index={index} totalPanels={5} />
			);

			const expected = {current: index + 1};
			const actual = wizardPanel.find({slot: 'slotAbove'}).props();

			expect(actual).toMatchObject(expected);
		}
	);

	// [GT-28312]
	test(
		'should reflect the current index in Steps when "current" is not specified',
		() => {
			const index = 1;
			const wizardPanel = shallow(
				<WizardPanelsBase index={index} totalPanels={5} />
			);

			const expected = {current: index + 1};
			const actual = wizardPanel.find({slot: 'slotAbove'}).props();

			expect(actual).toMatchObject(expected);
		}
	);

	test(
		'should reflect the specified index in Steps when "current" is set',
		() => {
			const current = 3;
			const wizardPanel = shallow(
				<WizardPanelsBase index={1} current={current} total={5} totalPanels={5} />
			);

			const expected = {current: current};
			const actual = wizardPanel.find({slot: 'slotAbove'}).props();

			expect(actual).toMatchObject(expected);
		}
	);

	test(
		'should reflect the total views in Steps when "total" is not specified',
		() => {
			const total = 5;
			const wizardPanel = shallow(
				<WizardPanelsBase index={1} totalPanels={5} />
			);

			const expected = {total: total};
			const actual = wizardPanel.find({slot: 'slotAbove'}).props();

			expect(actual).toMatchObject(expected);
		}
	);

	test(
		'should reflect the specified total in Steps when "total" is set',
		() => {
			const total = 3;
			const wizardPanel = shallow(
				<WizardPanelsBase index={1} current={1} total={total} totalPanels={5} />
			);

			const expected = {total};
			const actual = wizardPanel.find({slot: 'slotAbove'}).props();

			expect(actual).toMatchObject(expected);
		}
	);
});
