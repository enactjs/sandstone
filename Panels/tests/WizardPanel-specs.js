import React from 'react';
import {mount} from 'enzyme';

import {View, WizardPanel} from '../WizardPanel';

describe('WizardPanel Specs', () => {
	test(
		'should have title in `Header`',
		() => {
			const title = 'WizardPanel title';

			const wizardPanel = mount(
				<WizardPanel title={title} />
			);

			const headerTitle = wizardPanel.find('Cell.titleCell').find('.text').first().text();

			const expected = title;
			const actual = headerTitle;

			expect(actual).toBe(expected);
		}
	);


	test(
		'should have title overridden by title set in `View`',
		() => {
			const wizardTitle = 'WizardPanel title';
			const viewTitle = 'View title';

			const wizardPanel = mount(
				<WizardPanel title={wizardTitle}>
					<View title={viewTitle} />
				</WizardPanel>
			);

			const headerTitle = wizardPanel.find('Cell.titleCell .text').first().text();

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
				<WizardPanel>
					<View subtitle={viewSubtitle} />
				</WizardPanel>
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
				<WizardPanel>
					<View footer={viewFooter} />
				</WizardPanel>
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
				<WizardPanel>
					<View>
						<buttons>
							<button>Button 1</button>
							<button>Button 2</button>
						</buttons>
					</View>
				</WizardPanel>
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
				<WizardPanel>
					<View>
						{contentText}
					</View>
				</WizardPanel>
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

			const wizardPanel = mount(
				<WizardPanel nextButtonText={nextButtonText} />
			);

			const nextButton = wizardPanel.find('.nextButton .text').text();

			const expected = nextButtonText;
			const actual = nextButton;

			expect(actual).toBe(expected);
		}
	);

	test(
		'should have prevButtonText in `.prevButton`',
		() => {
			const prevButtonText = 'previous';

			const wizardPanel = mount(
				<WizardPanel prevButtonText={prevButtonText} />
			);

			const prevButton = wizardPanel.find('.prevButton .text').text();

			const expected = prevButtonText;
			const actual = prevButton;

			expect(actual).toBe(expected);
		}
	);

	test(
		'should have disabled `.nextButton` on the last view',
		() => {
			const wizardPanel = mount(
				<WizardPanel index={2}>
					<View>View 1</View>
					<View>View 2</View>
					<View>View 3</View>
				</WizardPanel>
			);

			const nextButton = wizardPanel.find('Button .nextButton').prop('disabled');

			const expected = true;
			const actual = nextButton;

			expect(actual).toBe(expected);
		}
	);

	test(
		'should have disabled `.prevButton` on the first view',
		() => {
			const wizardPanel = mount(
				<WizardPanel>
					<View>View 1</View>
					<View>View 2</View>
					<View>View 3</View>
				</WizardPanel>
			);

			const prevButton = wizardPanel.find('Button .prevButton').prop('disabled');

			const expected = true;
			const actual = prevButton;

			expect(actual).toBe(expected);
		}
	);
});
