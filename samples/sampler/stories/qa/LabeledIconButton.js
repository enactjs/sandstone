import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select} from '@enact/storybook-utils/addons/knobs';
import UIButton, {ButtonBase as UIButtonBase} from '@enact/ui/Button';
import {LabeledIconBase as UiLabeledIconBase, LabeledIcon as UiLabeledIcon} from '@enact/ui/LabeledIcon';
import React from 'react';
import {storiesOf} from '@storybook/react';
import Scroller from '@enact/ui/Scroller';
import Layout, {Cell} from '@enact/ui/Layout';

import Button, {ButtonBase} from '@enact/sandstone/Button';
import {IconButtonBase} from '@enact/sandstone/IconButton';
import LabeledIconButton from '@enact/sandstone/LabeledIconButton';

import iconNames from '../default/icons';

LabeledIconButton.displayName = 'LabeledIconButton';
const Config = mergeComponentMetadata('LabeledIconButton', UiLabeledIconBase, UiLabeledIcon, Button, ButtonBase, UIButton, UIButtonBase, IconButtonBase, LabeledIconButton);

storiesOf('LabeledIconButton', module)
	.add(
		'aligned grid',
		() => {
			const disabled = boolean('disabled', Config);
			const labelPosition = select('labelPosition', ['above', 'after', 'before', 'below', 'left', 'right'], Config);
			return (
				<Scroller>
					<Layout wrap align="center space-between">
						{iconNames.map((icon) =>
							<Cell size={400} key={'icon' + icon}>
								<LabeledIconButton
									style={{marginLeft: 0, marginRight: 0}}
									icon={icon}
									disabled={disabled}
									flip={select('flip', ['', 'both', 'horizontal', 'vertical'], Config, '')}
									labelPosition={labelPosition}
									size={select('size', ['small', 'large'], Config)}
								>{icon}</LabeledIconButton>
							</Cell>
						)}
					</Layout>
				</Scroller>
			);
		}
	)
	.add(
		'inline',
		() => {
			const disabled = boolean('disabled', Config);
			const labelPosition = select('labelPosition', ['above', 'after', 'before', 'below', 'left', 'right'], Config);
			return (
				<Scroller>
					{iconNames.map((icon) =>
						<LabeledIconButton
							key={'icon' + icon}
							icon={icon}
							inline
							disabled={disabled}
							flip={select('flip', ['', 'both', 'horizontal', 'vertical'], Config, '')}
							labelPosition={labelPosition}
							size={select('size', ['small', 'large'], Config)}
						>{icon}</LabeledIconButton>
					)}
				</Scroller>
			);
		}
	);
