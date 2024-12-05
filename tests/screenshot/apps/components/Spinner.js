import ri from '@enact/ui/resolution';
import Spinner from '../../../../Spinner';

const SpinnerTests = [
	<div
		style={{
			outline: 'teal dashed 1px',
			position: 'relative',
			padding: ri.unit(90, 'rem'),
			backgroundColor: 'rgba(0, 187, 187, 0.5)'
		}}
	>
		<div
			style={{
				outline: 'teal dashed 1px',
				position: 'relative',
				height: ri.unit(180, 'rem')
			}}
		>
			<Spinner />
		</div>
	</div>,
	<div
		style={{
			outline: 'teal dashed 1px',
			position: 'relative',
			padding: ri.unit(90, 'rem'),
			backgroundColor: 'rgba(0, 187, 187, 0.5)'
		}}
	>
		<div
			style={{
				outline: 'teal dashed 1px',
				position: 'relative',
				height: ri.unit(180, 'rem')
			}}
		>
			<Spinner centered />
		</div>
	</div>,
	<div
		style={{
			outline: 'teal dashed 1px',
			position: 'relative',
			padding: ri.unit(90, 'rem'),
			backgroundColor: 'rgba(0, 187, 187, 0.5)'
		}}
	>
		<div
			style={{
				outline: 'teal dashed 1px',
				position: 'relative',
				height: ri.unit(180, 'rem')
			}}
		>
			<Spinner size="small" />
		</div>
	</div>,
	<div
		style={{
			outline: 'teal dashed 1px',
			position: 'relative',
			padding: ri.unit(90, 'rem'),
			backgroundColor: 'rgba(0, 187, 187, 0.5)'
		}}
	>
		<div
			style={{
				outline: 'teal dashed 1px',
				position: 'relative',
				height: ri.unit(180, 'rem')
			}}
		>
			<Spinner>Loading content</Spinner>
		</div>
	</div>,
	<div
		style={{
			outline: 'teal dashed 1px',
			position: 'relative',
			padding: ri.unit(90, 'rem'),
			backgroundColor: 'rgba(0, 187, 187, 0.5)'
		}}
	>
		<div
			style={{
				outline: 'teal dashed 1px',
				position: 'relative',
				height: ri.unit(180, 'rem')
			}}
		>
			<Spinner transparent />
		</div>
	</div>,
	<div
		style={{
			outline: 'teal dashed 1px',
			position: 'relative',
			padding: ri.unit(90, 'rem'),
			backgroundColor: 'rgba(0, 187, 187, 0.5)'
		}}
	>
		<div
			style={{
				outline: 'teal dashed 1px',
				position: 'relative',
				height: ri.unit(180, 'rem')
			}}
		>
			<Spinner paused>Loading content</Spinner>
		</div>
	</div>
];

export default SpinnerTests;
