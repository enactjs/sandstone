import React from 'react';
import {mount} from 'enzyme';

import FixedPopupPanels from '../FixedPopupPanels';

describe('FixedPopupPanels', () => {

	it('should have the default size when nothing is assigned', function () {
		const subject = mount(<FixedPopupPanels />);

		const expected = 'thin';
		const actual = subject.find('Popup').prop('className');

		expect(actual).toContain(expected);
	});

	it('should have thin size applied when size="thin"', function () {
		const subject = mount(<FixedPopupPanels size="thin" />);

		const expected = 'thin';
		const actual = subject.find('Popup').prop('className');

		expect(actual).toContain(expected);
	});

	it('should have half size applied when size="half"', function () {
		const subject = mount(<FixedPopupPanels size="half" />);

		const expected = 'half';
		const actual = subject.find('Popup').prop('className');

		expect(actual).toContain(expected);
	});

});
