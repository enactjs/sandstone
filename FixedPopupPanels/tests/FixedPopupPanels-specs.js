import React from 'react';
import {mount} from 'enzyme';

import FixedPopupPanels from '../FixedPopupPanels';

describe('FixedPopupPanels', () => {

	it('should have the default width when nothing is assigned', function () {
		const subject = mount(<FixedPopupPanels />);

		const expected = 'narrow';
		const actual = subject.find('Popup').prop('className');

		expect(actual).toContain(expected);
	});

	it('should have narrow width applied when width="narrow"', function () {
		const subject = mount(<FixedPopupPanels width="narrow" />);

		const expected = 'narrow';
		const actual = subject.find('Popup').prop('className');

		expect(actual).toContain(expected);
	});

	it('should have half width applied when width="half"', function () {
		const subject = mount(<FixedPopupPanels width="half" />);

		const expected = 'half';
		const actual = subject.find('Popup').prop('className');

		expect(actual).toContain(expected);
	});

});
