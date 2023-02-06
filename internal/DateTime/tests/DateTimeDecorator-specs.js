import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import {DateTimeDecorator} from '../';

describe('DateTimeDecorator', () => {
	test('should accept an updated JavaScript Date for its value prop', () => {
		const Picker = DateTimeDecorator({}, function PickerBase ({locale, title, value}) {
			const minuteValue = value.getMinutes();
			return <div locale={locale} title={title}>{minuteValue}</div>;
		});

		const {rerender} = render(
			<Picker
				title="Date"
				value={new Date(2000, 0, 1, 12, 30)}
				locale="en-US"
			/>
		);

		rerender(
			<Picker
				title="Date"
				value={new Date(2000, 0, 1, 12, 45)}
				locale="en-US"
			/>
		);

		const expected = '45';
		const actual = screen.getByTitle('Date').textContent;

		expect(actual).toBe(expected);
	});
});
