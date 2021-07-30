import {createEvent, fireEvent, render, screen} from '@testing-library/react';
import {useEffect, useRef} from 'react';

import DebounceDecorator from '../';

describe('DebounceDecorator', () => {
	test('should emit the event after the delay', (done) => {
		const Component = DebounceDecorator(
			{debounce: 'onChange', delay: 100},
			function Base ({onChange}) {
				const ref = useRef(null);

				useEffect(() => {
					const {current} = ref;
					current.addEventListener('onChange', onChange);

					return () => {
						current.removeEventListener('onChange', onChange);
					};
				}, [onChange]);

				return <div ref={ref}>Test</div>;
			}
		);

		const spy = jest.fn();

		render(<Component onChange={spy} />);

		const elem = screen.getByText('Test');
		fireEvent(elem, createEvent('onChange', elem));

		expect(spy).not.toHaveBeenCalled();

		setTimeout(() => {
			expect(spy).toHaveBeenCalled();
			done();
		}, 150);
	});

	test('should restart the delay if another event occurs before timeout', (done) => {
		const Component = DebounceDecorator(
			{debounce: 'onChange', delay: 100},
			function Base ({onChange}) {
				const ref = useRef(null);

				useEffect(() => {
					const {current} = ref;
					current.addEventListener('onChange', onChange);

					return () => {
						current.removeEventListener('onChange', onChange);
					};
				}, [onChange]);

				return <div ref={ref}>Test</div>;
			}
		);

		const spy = jest.fn();
		render(<Component onChange={spy} />);

		setTimeout(() => {
			expect(spy).not.toHaveBeenCalled();

			const elem = screen.getByText('Test');
			fireEvent(elem, createEvent('onChange', elem));
		}, 50);

		setTimeout(() => {
			expect(spy).not.toHaveBeenCalled();
		}, 125);

		setTimeout(() => {
			expect(spy).toHaveBeenCalled();
			done();
		}, 200);
	});

	test('should not emit the event if the cancel event occurs before the delay', (done) => {
		const Component = DebounceDecorator(
			{cancel: 'onCancel', debounce: 'onChange', delay: 100},
			function Base ({onCancel, onChange}) {
				const ref = useRef(null);

				useEffect(() => {
					const {current} = ref;
					current.addEventListener('onChange', onChange);
					current.addEventListener('onCancel', onCancel);

					return () => {
						current.removeEventListener('onChange', onChange);
						current.removeEventListener('onCancel', onCancel);
					};
				}, [onCancel, onChange]);

				return <div ref={ref}>Test</div>;
			}
		);

		const spy = jest.fn();
		render(<Component onChange={spy} />);

		const elem = screen.getByText('Test');
		fireEvent(elem, createEvent('onChange', elem));
		fireEvent(elem, createEvent('onCancel', elem));

		expect(spy).not.toHaveBeenCalled();

		setTimeout(() => {
			expect(spy).not.toHaveBeenCalled();
			done();
		}, 150);
	});

	test('should emit the onCancel event immediately', () => {
		const Component = DebounceDecorator(
			{cancel: 'onCancel', debounce: 'onChange', delay: 100},
			function Base ({onCancel}) {
				const ref = useRef(null);

				useEffect(() => {
					const {current} = ref;
					current.addEventListener('onCancel', onCancel);

					return () => {
						current.removeEventListener('onCancel', onCancel);
					};
				}, [onCancel]);

				return <div ref={ref}>Test</div>;
			}
		);

		const spy = jest.fn();
		render(<Component onCancel={spy} />);

		const elem = screen.getByText('Test');
		fireEvent(elem, createEvent('onCancel', elem));

		expect(spy).toHaveBeenCalled();
	});
});
