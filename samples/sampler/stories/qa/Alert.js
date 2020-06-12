import {select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Alert, {AlertBase} from '@enact/sandstone/Alert';
import Button from '@enact/sandstone/Button';

const Config = mergeComponentMetadata('Alert', AlertBase, Alert);
Alert.displayName = 'Alert';

const stringsToChoose = [
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac tellus in velit ornare commodo. Nam dignissim fringilla nulla, sit amet hendrerit sapien laoreet quis. Praesent quis tellus non diam viverra feugiat. In quis mattis purus, quis tristique mi. Mauris vitae tellus tempus, convallis ligula id, laoreet eros. Nullam eu tempus odio, non mollis tellus. Phasellus vitae iaculis nisl. Sed ipsum felis, suscipit vel est quis, interdum pretium dolor. Curabitur sit amet purus ac massa ullamcorper egestas ornare vel lectus. Nullam quis velit sed ex finibus cursus. Duis porttitor congue cursus.',
	'This product is meant for educational purposes only. Any resemblance to real persons, living or dead is purely coincidental. Void where prohibited. Some assembly required. List each check separately by bank number. Batteries not included.',
	'I am a very short string',
	'ab',
	'a'
];

storiesOf('Alert', module)
	.add(
		'with long children',
		() => {
			return (
				<Alert
					open
					title={select('title', stringsToChoose, Config, stringsToChoose[2])}
					type={select('type', ['fullscreen', 'overlay'], Config)}
				>
					<buttons>
						<Button>Yes</Button>
						<Button>No</Button>
					</buttons>
					{select('children', stringsToChoose, Config, stringsToChoose[0])}
				</Alert>
			);
		}
	);
