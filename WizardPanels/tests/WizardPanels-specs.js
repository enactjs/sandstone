import React from 'react';
import {mount, shallow} from 'enzyme';

import {Panel, WizardPanels, WizardPanelsBase} from '../';

describe('WizardPanel Specs', () => {

	const findNextButton = subject => subject.find('.slotAfter').find('Pure');
	const findPrevButton = subject => subject.find('.slotBefore').find('Pure');

	test(
		'should have title in `Header`',
		() => {
			const title = 'WizardPanel title';

			const wizardPanel = mount(
				<WizardPanels title={title}>
					<Panel />
				</WizardPanels>
			);

			const headerTitle = wizardPanel.find('Header').prop('title');

			const expected = title;
			const actual = headerTitle;

			wizardPanel.unmount();
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
		'should have View buttons rendered in footer',
		() => {
			const wizardPanel = mount(
				<WizardPanels>
					<Panel>
						<footer>
							<button>Button 1</button>
							<button>Button 2</button>
						</footer>
					</Panel>
				</WizardPanels>
			);

			const buttons = wizardPanel.find('.footer').find('button').length;

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
		'should not hide next button on the last view when `nextButton` prop is added on the last Panel',
		() => {
			const wizardPanel = shallow(
				<WizardPanels index={2} totalPanels={3}>
					<Panel>I gots contents</Panel>
					<Panel>I gots contents2</Panel>
					<Panel nextButton />
				</WizardPanels>
			);

			const nextButton = wizardPanel.find({slot: 'slotAfter'});

			const expected = false;
			const actual = nextButton.exists();

			expect(actual).toBe(expected);
		}
	);

	test(
		'should hide next button on the last view',
		() => {
			const wizardPanel = shallow(
				<WizardPanels index={2} totalPanels={3} />
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
				<WizardPanels index={0} totalPanels={3} />
			);

			const prevButton = wizardPanel.find({slot: 'slotBefore'});

			const expected = false;
			const actual = prevButton.exists();

			expect(actual).toBe(expected);
		}
	);

	test(
		'should not hide previous button on the first view when `prevButton` prop is added on the first Panel',
		() => {
			const wizardPanel = shallow(
				<WizardPanels index={0} totalPanels={3}>
					<Panel prevButton >Panel 1</Panel>
					<Panel>Panel 2</Panel>
					<Panel>Panel 3</Panel>
				</WizardPanels>
			);

			const prevButton = wizardPanel.find({slot: 'slotBefore'});

			const expected = false;
			const actual = prevButton.exists();

			expect(actual).toBe(expected);
		}
	);

	test(
		'should hide next nextButton on all the panels with `nextButtonVisibility` set to never',
		() => {
			const wizardPanel = shallow(
				<WizardPanels index={2} nextButtonVisibility="never" totalPanels={4} />
			);

			const nextButton = wizardPanel.find({slot: 'slotAfter'});

			const expected = false;
			const actual = nextButton.exists();

			expect(actual).toBe(expected);
		}
	);

	test(
		'should hide previous button on all the panels with `prevButtonVisibility` set to never',
		() => {
			const wizardPanel = shallow(
				<WizardPanels index={2} prevButtonVisibility="never" totalPanels={4} />
			);

			const prevButton = wizardPanel.find({slot: 'slotBefore'});

			const expected = false;
			const actual = prevButton.exists();

			expect(actual).toBe(expected);
		}
	);

	test(
		'should hide previous button on the second Panel',
		() => {
			const wizardPanel = shallow(
				<WizardPanels defaultIndex={1} totalPanels={3}>
					<Panel>Panel 1</Panel>
					<Panel prevButton={false}>Panel 2</Panel>
					<Panel>Panel 3</Panel>
				</WizardPanels>
			);

			const prevButton = wizardPanel.find({slot: 'slotBefore'});

			const expected = false;
			const actual = prevButton.exists();

			expect(actual).toBe(expected);
		}
	);

	test(
		'should show previous button on the first view when `prevButtonVisibility` prop is set to always',
		() => {
			const wizardPanel = shallow(
				<WizardPanels index={0} prevButtonVisibility="always" totalPanels={3}>
					<Panel>Panel 1</Panel>
					<Panel>Panel 2</Panel>
					<Panel>Panel 3</Panel>
				</WizardPanels>
			);

			const prevButton = wizardPanel.find({slot: 'slotBefore'});

			const expected = true;
			const actual = prevButton.exists();

			expect(actual).toBe(expected);
		}
	);

	test(
		'should hide previous button on the first view when `prevButtonVisibility` prop is set to always and panel overrides',
		() => {
			const wizardPanel = shallow(
				<WizardPanels index={0} prevButtonVisibility="always" totalPanels={3}>
					<Panel prevButton={false} >Panel 1</Panel>
					<Panel>Panel 2</Panel>
					<Panel>Panel 3</Panel>
				</WizardPanels>
			);

			const prevButton = wizardPanel.find({slot: 'slotBefore'});

			const expected = false;
			const actual = prevButton.exists();

			expect(actual).toBe(expected);
		}
	);

	test(
		'should show next button on the last view when `nextButtonVisibility` prop is set to always',
		() => {
			const wizardPanel = shallow(
				<WizardPanels index={2} nextButtonVisibility="always" totalPanels={3}>
					<Panel>Panel 1</Panel>
					<Panel>Panel 2</Panel>
					<Panel>Panel 3</Panel>
				</WizardPanels>
			);

			const nextButton = wizardPanel.find({slot: 'slotAfter'});

			const expected = false;
			const actual = nextButton.exists();

			expect(actual).toBe(expected);
		}
	);

	test(
		'should show next button on the last view when `nextButtonVisibility` prop is set to always and panel overrides',
		() => {
			const wizardPanel = shallow(
				<WizardPanels index={2} nextButtonVisibility="always" totalPanels={3}>
					<Panel>Panel 1</Panel>
					<Panel>Panel 2</Panel>
					<Panel nextButton={false}>Panel 3</Panel>
				</WizardPanels>
			);

			const nextButton = wizardPanel.find({slot: 'slotAfter'});

			const expected = false;
			const actual = nextButton.exists();

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

			findNextButton(wizardPanel).simulate('click');

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

			findPrevButton(wizardPanel).simulate('click');

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
		'should not go back on back key when prevButtonVisibility set to show never',
		() => {
			const map = {};

			window.addEventListener = jest.fn((event, cb) => {
				map[event] = cb;
			});

			const wizardPanel = mount(
				<WizardPanels defaultIndex={1} prevButtonVisibility="never">
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
		'should reflect the current index in Steps when "current" is not specified',
		() => {
			const index = 1;
			const wizardPanel = mount(
				<WizardPanels index={index}>
					<Panel />
					<Panel />
					<Panel />
					<Panel />
					<Panel />
				</WizardPanels>
			);

			const expected = {current: index + 1};
			const actual = wizardPanel.find('Steps').props();

			expect(actual).toMatchObject(expected);
		}
	);

	test(
		'should reflect the specified index in Steps when "current" is set',
		() => {
			const current = 3;
			const wizardPanel = mount(
				<WizardPanels index={0} current={current}>
					<Panel />
					<Panel />
					<Panel />
					<Panel />
					<Panel />
				</WizardPanels>
			);

			const expected = {current: current};
			const actual = wizardPanel.find('Steps').props();

			expect(actual).toMatchObject(expected);
		}
	);

	test(
		'should reflect the total views in Steps when "total" is not specified',
		() => {
			const wizardPanel = mount(
				<WizardPanels index={1}>
					<Panel />
					<Panel />
					<Panel />
					<Panel />
					<Panel />
				</WizardPanels>
			);

			const expected = {total: 5};
			const actual = wizardPanel.find('Steps').props();

			expect(actual).toMatchObject(expected);
		}
	);

	test(
		'should reflect the specified total in Steps when "total" is set',
		() => {
			const total = 3;
			const wizardPanel =  mount(
				<WizardPanels index={1} current={1} total={total}>
					<Panel />
					<Panel />
					<Panel />
					<Panel />
					<Panel />
				</WizardPanels>
			);

			const expected = {total};
			const actual = wizardPanel.find('Steps').props();

			expect(actual).toMatchObject(expected);
		}
	);
});
