import React from 'react';
import {mount} from 'enzyme';

import Button from '../../Button';
import MediaControls from '../MediaControls';

const actionGuideLabel = 'test action guide label';

describe('MediaControls Specs', () => {
	test(
		'should have `actionGuideLabel`',
		() => {
			const mediaControls = mount(
				<MediaControls
					visible
					actionGuideLabel={actionGuideLabel}
				>
					<Button size="large" icon="playlist" />
				</MediaControls>
			);
			const actual = mediaControls.find('ActionGuide .text').text();
			expect(actual).toBe(actionGuideLabel);
		}
	);

	test(
		'should not have `actionGuideLabel`',
		() => {
			const mediaControls = mount(
				<MediaControls
					visible
					actionGuideLabel={actionGuideLabel}
				/>
			);
			expect(mediaControls.exists('ActionGuide .text')).toBeFalsy();
		}
	);

	test(
		'should have `children`',
		() => {
			const mediaControls = mount(
				<MediaControls
					visible
				>
					<Button data-test-id="testButton" size="large" icon="playlist" />
				</MediaControls>
			);
			mediaControls.instance().showMoreComponents();
			mediaControls.update();
			expect(mediaControls.exists('[data-test-id="testButton"]')).toBeTruthy();
		}
	);

	test(
		'should have `bottomComponents`',
		() => {
			const mediaControls = mount(
				<MediaControls
					visible
					actionGuideLabel={actionGuideLabel}
				>
					<bottomComponents>
						<Button data-test-id="testButton" size="large" icon="playlist" />
					</bottomComponents>
				</MediaControls>
			);
			mediaControls.instance().showMoreComponents();
			mediaControls.update();
			expect(mediaControls.exists('[data-test-id="testButton"]')).toBeTruthy();
		}
	);
});
