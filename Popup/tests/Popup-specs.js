import React from 'react';
import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import {mount, shallow} from 'enzyme';

import {Popup, PopupBase} from '../Popup';
import css from '../Popup.module.less';

const FloatingLayerController = FloatingLayerDecorator('div');

describe('Popup specs', () => {
	it('should be rendered opened if open is set to true', () => {
		const popup = mount(
			<FloatingLayerController>
				<Popup open><div>popup</div></Popup>
			</FloatingLayerController>
		);

		const expected = true;
		const actual = popup.find('FloatingLayer').prop('open');

		expect(actual).toBe(expected);
	});

	it('should not be rendered if open is set to false', () => {
		const popup = mount(
			<FloatingLayerController>
				<Popup><div>popup</div></Popup>
			</FloatingLayerController>
		);

		const expected = false;
		const actual = popup.find('FloatingLayer').prop('open');

		expect(actual).toBe(expected);
	});

	it('should set role to alert by default', () => {
		const popup = shallow(
			<PopupBase><div>popup</div></PopupBase>
		);

		const expected = 'alert';
		const actual = popup.find(`.${css.popup}`).prop('role');

		expect(actual).toBe(expected);
	});

	it('should allow role to be overridden', () => {
		const popup = shallow(
			<PopupBase role="dialog"><div>popup</div></PopupBase>
		);

		const expected = 'dialog';
		const actual = popup.find(`.${css.popup}`).prop('role');

		expect(actual).toBe(expected);
	});

	it('should set "data-webos-voice-exclusive" when popup is open', () => {
		const popup = mount(
			<FloatingLayerController>
				<Popup open><div>popup</div></Popup>
			</FloatingLayerController>
		);

		const expected = true;
		const actual = popup.find(`.${css.popup}`).first().prop('data-webos-voice-exclusive');

		expect(actual).toBe(expected);
	});

	it('should set "data-webos-voice-disabled" when voice control is disabled', () => {
		const popup = shallow(
			<PopupBase open data-webos-voice-disabled><div>popup</div></PopupBase>
		);

		const expected = true;
		const actual = popup.find(`.${css.popup}`).prop('data-webos-voice-disabled');

		expect(actual).toBe(expected);
	});

	describe('with position bottom', function () {
		it('should have bottom class', () => {
			const popup = shallow(
				<PopupBase open position="bottom"><div>popup</div></PopupBase>
			);

			expect(popup.find(`.${css.popup}`).prop('className').split(' ')).toContain('bottom');
		});

		it('should have bottom class in popup transition container', () => {
			const popup = shallow(
				<PopupBase open position="bottom"><div>popup</div></PopupBase>
			);

			expect(popup.prop('className').split(' ')).toContain('bottom');
		});
	});

	describe('with position left', function () {
		it('should have left class', () => {
			const popup = shallow(
				<PopupBase open position="left"><div>popup</div></PopupBase>
			);

			expect(popup.find(`.${css.popup}`).prop('className').split(' ')).toContain('left');
		});

		it('should have left class in popup transition container', () => {
			const popup = shallow(
				<PopupBase open position="left"><div>popup</div></PopupBase>
			);

			expect(popup.prop('className').split(' ')).toContain('left');
		});
	});

	describe('with position top', function () {
		it('should have right class', () => {
			const popup = shallow(
				<PopupBase open position="right"><div>popup</div></PopupBase>
			);

			expect(popup.find(`.${css.popup}`).prop('className').split(' ')).toContain('right');
		});

		it('should have right class in popup transition container', () => {
			const popup = shallow(
				<PopupBase open position="right"><div>popup</div></PopupBase>
			);

			expect(popup.prop('className').split(' ')).toContain('right');
		});
	});

	describe('with position top', function () {
		it('should have top class', () => {
			const popup = shallow(
				<PopupBase open position="top"><div>popup</div></PopupBase>
			);

			expect(popup.find(`.${css.popup}`).prop('className').split(' ')).toContain('top');
		});

		it('should have top class popup transition container', () => {
			const popup = shallow(
				<PopupBase open position="top"><div>popup</div></PopupBase>
			);

			expect(popup.prop('className').split(' ')).toContain('top');
		});
	});

	describe('with position center', function () {
		it('should have center class', () => {
			const popup = shallow(
				<PopupBase open position="center"><div>popup</div></PopupBase>
			);

			expect(popup.find(`.${css.popup}`).prop('className').split(' ')).toContain('center');
		});

		it('should have center class popup transition container', () => {
			const popup = shallow(
				<PopupBase open position="center"><div>popup</div></PopupBase>
			);

			expect(popup.prop('className').split(' ')).toContain('center');
		});
	});

	describe('with position fullscreen', function () {
		it('should have fullscreen class', () => {
			const popup = shallow(
				<PopupBase open position="fullscreen"><div>popup</div></PopupBase>
			);

			expect(popup.find(`.${css.popup}`).prop('className').split(' ')).toContain('fullscreen');
		});

		it('should have fullscreen class popup transition container', () => {
			const popup = shallow(
				<PopupBase open position="fullscreen"><div>popup</div></PopupBase>
			);

			expect(popup.prop('className').split(' ')).toContain('fullscreen');
		});
	});

	describe('with position changes dynamically - [GT-28270]', function () {
		it('should not have top class when position change from top to any other position', () => {
			const firstPosition = 'top';
			const popup = shallow(
				<PopupBase open position={firstPosition}><div>popup</div></PopupBase>
			);

			expect(popup.find(`.${css.popup}`).prop('className').split(' ')).toContain(firstPosition);
			expect(popup.prop('className').split(' ')).toContain(firstPosition);
			expect(popup.find(`.${css.popup}`).prop('className').split(' ')).not.toContain('fullscreen');
			expect(popup.prop('className').split(' ')).not.toContain('fullscreen');
			expect(popup.find(`.${css.popup}`).prop('className').split(' ')).not.toContain('center');
			expect(popup.prop('className').split(' ')).not.toContain('center');
			expect(popup.find(`.${css.popup}`).prop('className').split(' ')).not.toContain('bottom');
			expect(popup.prop('className').split(' ')).not.toContain('bottom');
			expect(popup.find(`.${css.popup}`).prop('className').split(' ')).not.toContain('right');
			expect(popup.prop('className').split(' ')).not.toContain('right');
			expect(popup.find(`.${css.popup}`).prop('className').split(' ')).not.toContain('left');
			expect(popup.prop('className').split(' ')).not.toContain('left');

			popup.setProps({position: 'fullscreen'});

			expect(popup.find(`.${css.popup}`).prop('className').split(' ')).not.toContain(firstPosition);
			expect(popup.prop('className').split(' ')).not.toContain(firstPosition);

			popup.setProps({position: 'center'});

			expect(popup.find(`.${css.popup}`).prop('className').split(' ')).not.toContain(firstPosition);
			expect(popup.prop('className').split(' ')).not.toContain(firstPosition);

			popup.setProps({position: 'bottom'});

			expect(popup.find(`.${css.popup}`).prop('className').split(' ')).not.toContain(firstPosition);
			expect(popup.prop('className').split(' ')).not.toContain(firstPosition);

			popup.setProps({position: 'left'});

			expect(popup.find(`.${css.popup}`).prop('className').split(' ')).not.toContain(firstPosition);
			expect(popup.prop('className').split(' ')).not.toContain(firstPosition);

			popup.setProps({position: 'right'});

			expect(popup.find(`.${css.popup}`).prop('className').split(' ')).not.toContain(firstPosition);
			expect(popup.prop('className').split(' ')).not.toContain(firstPosition);
		});
	});
});
