import {mount} from 'enzyme';
import Delayable from '../';

describe('Delayable', () => {
	test(
		'should render after the delay',
		() => {
			const Component = Delayable(
				{delay: 100},
				() => {
					return (
						<div>
							<button>Button 1</button>
							<button>Button 2</button>
						</div>
					);
				}
			);

			const subject = mount(<Component />);

			setTimeout(() => {
				const buttons = subject.find('button');

				const expected = 2;
				const actual = buttons.length;

				expect(actual).toBe(expected);
			}, 200);
		}
	);

	test(
		'should render immediately',
		() => {
			const Component = Delayable(
				{delay: 1000},
				() => {
					return (
						<div>
							<button>Button 1</button>
							<button>Button 2</button>
						</div>
					);
				}
			);

			const subject = mount(<Component instant />);

			const buttons = subject.find('button');

			const expected = 2;
			const actual = buttons.length;

			expect(actual).toBe(expected);
		}
	);
});
