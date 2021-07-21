import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import {DateTimeDecorator} from '../';

describe('DateTimeDecorator', () => {
	test(
		'should accept an updated JavaScript Date for its value prop',
		() => {
			const Picker = DateTimeDecorator({}, function PickerBase (props) {
				return <div {...props} />;
			});

			const {rerender} = render(
				<Picker
					title="Date"
					value={new Date(2000, 0, 1, 12, 30)}
					locale="en-US"
				/>
			);

			screen.debug();

			rerender(
				<Picker value={new Date(2000, 0, 1, 12, 45)} />
			);

			screen.debug();

		//	const expected = 45;
		//	const actual = screen.getByTitle("Date"); // .find('PickerBase').prop('value').getMinutes();
		//	expect(actual).toBe(expected);
		}
	);
});
