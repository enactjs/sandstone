import React from 'react';
import {mount, shallow} from 'enzyme';

import {WizardPanel, WizardPanels, WizardPanelsBase} from '../';

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
					<WizardPanel subtitle={viewSubtitle} />
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
					<WizardPanel title={viewTitle} />
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
					<WizardPanel subtitle={viewSubtitle} />
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
					<WizardPanel footer={viewFooter} />
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
					<WizardPanel>
						<buttons>
							<button>Button 1</button>
							<button>Button 2</button>
						</buttons>
					</WizardPanel>
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
					<WizardPanel>
						{contentText}
					</WizardPanel>
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
				<WizardPanelsBase total={2} nextButtonText={nextButtonText} />
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
				<WizardPanelsBase index={1} prevButtonText={prevButtonText} />
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
				<WizardPanelsBase index={2} total={3} />
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
				<WizardPanelsBase index={0} total={3} />
			);

			const prevButton = wizardPanel.find({slot: 'slotBefore'});

			const expected = false;
			const actual = prevButton.exists();

			expect(actual).toBe(expected);
		}
	);

	test(
		'should hide next button with `noNextButton`',
		() => {
			const wizardPanel = shallow(
				<WizardPanelsBase index={2} noNextButton total={4} />
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
				<WizardPanelsBase index={2} noPrevButton total={4} />
			);

			const prevButton = wizardPanel.find({slot: 'slotBefore'});

			const expected = false;
			const actual = prevButton.exists();

			expect(actual).toBe(expected);
		}
	);

	// [GT-28312]
	test(
		'should reflect the current index in Steps',
		() => {
			const index = 1;
			const wizardPanel = shallow(
				<WizardPanelsBase index={index} total={5} />
			);

			const expected = {current: index + 1};
			const actual = wizardPanel.find({slot: 'slotAbove'}).props();

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
					<WizardPanel />
				</WizardPanelsBase>
			);

			let actual = wizardPanel.find(viewManager).prop('noAnimation');
			expect(actual).toBeFalsy();

			wizardPanel.setProps({noAnimation: true});

			actual = wizardPanel.find(viewManager).prop('noAnimation');
			expect(actual).toBe(true);
		}
	);
});
