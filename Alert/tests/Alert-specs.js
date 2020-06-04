import React from 'react';
import {mount, shallow} from 'enzyme';
import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import {Alert, AlertBase, AlertImage} from '../Alert';
import Button from '../../Button';

const FloatingLayerController = FloatingLayerDecorator('div');

describe('Alert', () => {
	test('should be rendered opened if open is set to true', () => {
		const alert = mount(
			<FloatingLayerController>
				<Alert open />
			</FloatingLayerController>
		);

		const expected = true;
		const actual = alert.find('FloatingLayer').prop('open');

		expect(actual).toBe(expected);
	});

	test('should not be rendered if open is set to false', () => {
		const alert = mount(
			<FloatingLayerController>
				<Alert />
			</FloatingLayerController>
		);

		const expected = false;
		const actual = alert.find('FloatingLayer').prop('open');

		expect(actual).toBe(expected);
	});

	test('should render title', () => {
		const alert = shallow(
			<AlertBase open id="test" title="alert title" />
		);

		const expected = 'alert title';
		const actual = alert.find('#test_title').prop('children');

		expect(actual).toBe(expected);
	});

	test('should render content', () => {
		const alert = shallow(
			<AlertBase open id="test" title="alert title">
				{'alert message'}
			</AlertBase>
		);
		const expected = 'alert message';
		const actual = alert.find('#test_content').prop('children');

		expect(actual).toBe(expected);
	});

	test('should render to empty string if children is not set', () => {
		const alert = shallow(
			<AlertBase open id="test" title="alert title" />
		);
		const actual = alert.find('#test_content').prop('children');

		expect(actual).toBeFalsy();
	});

	test('should render icon type of image if `image` prop is set to `icon`', () => {
		const alert = mount(
			<FloatingLayerController>
				<Alert open id="test" title="alert title">
					<image>
						<AlertImage src="testIconImage.png" type="icon" />
					</image>
					<buttons>
						<Button>yes</Button>
					</buttons>
				</Alert>
			</FloatingLayerController>
		);
		const expected = 'testIconImage.png';
		const actual = alert.find('AlertImage').prop('src');

		expect(actual).toBe(expected);
	});

	test('should render icon type of image if `image` prop is set to `thumbnail`', () => {
		const alert = mount(
			<FloatingLayerController>
				<Alert open id="test" title="alert title">
					<image>
						<AlertImage src="testThumbnailImage.png" type="thumbnail" />
					</image>
					<buttons>
						<Button>yes</Button>
					</buttons>
				</Alert>
			</FloatingLayerController>
		);
		const expected = 'testThumbnailImage.png';
		const actual = alert.find('AlertImage').prop('src');

		expect(actual).toBe(expected);
	});
});

describe('AlertOverlay specs', () => {
	test('should be rendered opened if open is set to true', () => {
		const alertOverlay = mount(
			<FloatingLayerController>
				<Alert type="overlay" open />
			</FloatingLayerController>
		);

		const expected = true;
		const actual = alertOverlay.find('FloatingLayer').prop('open');

		expect(actual).toBe(expected);
	});

	test('should not be rendered if open is set to false', () => {
		const alertOverlay = mount(
			<FloatingLayerController>
				<Alert type="overlay" />
			</FloatingLayerController>
		);

		const expected = false;
		const actual = alertOverlay.find('FloatingLayer').prop('open');

		expect(actual).toBe(expected);
	});

	test('should render content', () => {
		const alertOverlay = shallow(
			<Alert type="overlay" open>
				<span>
					this is alert overlay.
				</span>
				<buttons>
					<Button>yes</Button>
					<Button>yes</Button>
				</buttons>
			</Alert>
		);
		const expected = 'this is alert overlay.';
		const actual = alertOverlay.find('span').prop('children');

		expect(actual).toBe(expected);
	});

	test('should render icon type of image if `image` prop is set to `icon`', () => {
		const alertOverlay = mount(
			<FloatingLayerController>
				<Alert type="overlay" open>
					<image>
						<AlertImage src="testIconImage.png" type="icon" />
					</image>
					<buttons>
						<Button>yes</Button>
					</buttons>
				</Alert>
			</FloatingLayerController>
		);
		const expected = 'testIconImage.png';
		const actual = alertOverlay.find('AlertImage').prop('src');

		expect(actual).toBe(expected);
	});

	test('should render icon type of image if `image` prop is set to `thumbnail`', () => {
		const alertOverlay = mount(
			<FloatingLayerController>
				<Alert type="overlay" open>
					<image>
						<AlertImage src="testThumbnailImage.png" type="thumbnail" />
					</image>
					<buttons>
						<Button>yes</Button>
					</buttons>
				</Alert>
			</FloatingLayerController>
		);
		const expected = 'testThumbnailImage.png';
		const actual = alertOverlay.find('AlertImage').prop('src');

		expect(actual).toBe(expected);
	});
});
