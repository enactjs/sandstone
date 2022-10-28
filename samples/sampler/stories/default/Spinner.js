import Spinner, {SpinnerBase} from '@enact/sandstone/Spinner';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import ri from '@enact/ui/resolution';
import UiSpinner, {SpinnerBase as UiSpinnerBase} from '@enact/ui/Spinner';

Spinner.displayName = 'Spinner';
const Config = mergeComponentMetadata('Spinner', UiSpinnerBase, UiSpinner, SpinnerBase, Spinner);

export default {
	title: 'Sandstone/Spinner',
	component: 'Spinner'
};

export const _Spinner = (args) => (
	<div
		style={{
			outline: 'teal dashed 1px',
			position: 'relative',
			padding: ri.scaleToRem(180),
			backgroundColor: 'rgba(0, 187, 187, 0.5)'
		}}
	>
		<div
			style={{
				position: 'absolute',
				height: '100%',
				width: '100%',
				top: 0,
				left: 0
			}}
			onClick={action('Outside container events')}
		/>
		<div
			style={{
				outline: 'teal dashed 1px',
				position: 'relative',
				height: ri.scaleToRem(360),
				width: '50%'
			}}
		>
			<label
				style={{
					outline: 'teal dashed 1px',
					backgroundColor: 'rgba(0, 128, 128, 0.5)',
					color: '#0bb',
					position: 'absolute',
					transform: 'translateY(-100%)',
					borderBottomWidth: 0,
					padding: '0.1em 1em',
					fontWeight: 100,
					fontStyle: 'italic',
					fontSize: ri.scaleToRem(30)
				}}
			>
				Container
			</label>
			<div
				style={{
					position: 'absolute',
					height: '100%',
					width: '100%'
				}}
				onClick={action('Inside container events')}
			/>
			<Spinner
				blockClickOn={args['blockClickOn']}
				centered={args['centered']}
				paused={args['paused']}
				scrim={args['scrim']}
				size={args['size']}
				transparent={args['transparent']}
			>
				{args['content']}
			</Spinner>
		</div>
	</div>
);

select('blockClickOn', _Spinner, [null, 'container', 'screen'], Config);
boolean('centered', _Spinner, Config);
boolean('paused', _Spinner, Config);
boolean('scrim', _Spinner, Config);
select('size', _Spinner, [null, 'medium', 'small'], Config);
boolean('transparent', _Spinner, Config);
text('content', _Spinner, Config, '');

_Spinner.storyName = 'Spinner';
_Spinner.parameters = {
	info: {
		text: 'Basic usage of Spinner'
	}
};
