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
		'should have subtitle overridden by subtitle set in `View`',
		() => {
			const wizardSubtitle = 'WizardPanel subtitle';
			const viewSubtitle = 'View subtitle';

			const wizardPanel = mount(
				<WizardPanels subtitle={wizardSubtitle}>
					<Panel subtitle={viewSubtitle} />
				</WizardPanels>
			);

			const headerSubtitle = wizardPanel.find('Header').prop('subtitle');

			const expected = viewSubtitle;
			const actual = headerSubtitle;

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

			const headerSubtitle = wizardPanel.find('Cell.titleCell .text').last().text();

			const expected = viewSubtitle;
			const actual = headerSubtitle;

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

			expect(actual).toBe(expected);
		}
	);

	test(
		'should have nextButtonText in `.nextButton`',
		() => {
			const nextButtonText = 'next';

			const wizardPanel = shallow(
				<WizardPanelsBase viewTotal={2} nextButtonText={nextButtonText} />
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
				<WizardPanelsBase viewIndex={1} prevButtonText={prevButtonText} />
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
				<WizardPanelsBase viewIndex={2} viewTotal={3} />
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
				<WizardPanelsBase viewIndex={0} viewTotal={3} />
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
				<WizardPanelsBase viewTotal={2} nextButtonAriaLabel={label} />
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
				<WizardPanelsBase viewIndex={1} viewTotal={2} prevButtonAriaLabel={label} />
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
				<WizardPanelsBase viewIndex={2} noNextButton viewTotal={4} />
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
				<WizardPanelsBase viewIndex={2} noPrevButton viewTotal={4} />
			);

			const prevButton = wizardPanel.find({slot: 'slotBefore'});

			const expected = false;
			const actual = prevButton.exists();

			expect(actual).toBe(expected);
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
			const wizardPanel = shallow(
				<WizardPanelsBase viewIndex={index} viewTotal={5} />
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
				<WizardPanelsBase viewIndex={1} current={current} total={5} viewTotal={5} />
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
				<WizardPanelsBase viewIndex={1} viewTotal={5} />
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
				<WizardPanelsBase viewIndex={1} current={1} total={total} viewTotal={5} />
			);

			const expected = {total};
			const actual = wizardPanel.find({slot: 'slotAbove'}).props();

			expect(actual).toMatchObject(expected);
		}
	);
});
