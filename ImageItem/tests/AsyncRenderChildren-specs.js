import '@testing-library/jest-dom';
import {render} from '@testing-library/react';

import AsyncRenderChildren from '../AsyncRenderChildren';

let data = {};
const Component = (props) => {
	data = props;
	return <AsyncRenderChildren {...props} />;
};

describe('AsyncRenderChildren', () => {
	test('should have a fallback content', () => {
		render(<Component fallback={<div>Loading...</div>} index={1}>children</Component>);

		const fallbackContent = data.fallback.props.children;

		expect(fallbackContent).toBe('Loading...');
	});
});
