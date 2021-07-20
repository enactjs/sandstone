import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import {mount} from 'enzyme';
import {DateTimeDecorator} from '../';
import PickerBase from '../../Picker';

describe('DateTimeDecorator', () => {
	test(
		'should accept an updated JavaScript Date for its value prop',
		() => {
			const Picker = DateTimeDecorator({}, function PickerBasic () {
				return <PickerBase />;
			});

			render(
				<Picker
					title="Date"
					value={new Date(2000, 0, 1, 12, 30)}
					locale="en-US"
				/>
			);
screen.debug();
			// subject.setProps({
			// 	value: new Date(2000, 0, 1, 12, 45)
			// });
			//
			// const expected = 45;
			// const actual = subject.find('PickerBase').prop('value').getMinutes();
			//
			// expect(actual).toBe(expected);
		}
	);

});
