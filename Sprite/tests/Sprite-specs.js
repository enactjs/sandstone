import React from 'react';
import {mount} from 'enzyme';
import {SpriteBase as Sprite} from '../Sprite';

describe('Sprite Specs', () => {

	const simpleAnimationProps = {
		src: 'dummyimage',
		rows: 2,
		columns: 2
	};

	describe('events', () => {
		describe('on first render', () => {
			test('should call onSpriteAnimation', () => {
				const handleAnimation = jest.fn();
				mount(
					<Sprite {...simpleAnimationProps} onSpriteAnimation={handleAnimation}  />
				);

				const expected = 1;
				const actual = handleAnimation.mock.calls.length;

				expect(actual).toBe(expected);
			});

			test('should call onSpriteAnimation and default to "playing"', () => {
				const handleAnimation = jest.fn();
				mount(
					<Sprite {...simpleAnimationProps} onSpriteAnimation={handleAnimation}  />
				);

				const expected = true;
				const actual = handleAnimation.mock.calls[0][0].playing;

				expect(actual).toBe(expected);
			});

			test('should call onSpriteAnimation with stopped:true when stopped', () => {
				const handleAnimation = jest.fn();
				mount(
					<Sprite {...simpleAnimationProps} onSpriteAnimation={handleAnimation} stopped />
				);

				const expected = false;
				const actual = handleAnimation.mock.calls[0][0].playing;

				expect(actual).toBe(expected);
			});

			test('should call onSpriteAnimation with paused:true when paused', () => {
				const handleAnimation = jest.fn();
				mount(
					<Sprite {...simpleAnimationProps} onSpriteAnimation={handleAnimation} paused />
				);

				const expected = true;
				const actual = handleAnimation.mock.calls[0][0].paused;

				expect(actual).toBe(expected);
			});
		});
	});
});
