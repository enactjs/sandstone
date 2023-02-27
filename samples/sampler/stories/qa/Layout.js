import {boolean, select} from '@enact/storybook-utils/addons/controls';
import Layout, {Cell, Column, Row} from '@enact/ui/Layout';

export default {
	title: 'Sandstone/Layout',
	component: 'Layout'
};

export const WithNestedLayout = (args) => (
	<Column style={{width : "1400px", height : "700px"}}>
		<Row wrap={args['wrap']}>
			<Cell
				grow={args['grow']}
				shrink={args['shrink']}
				size={args['size']}
			>
				A Short Text
			</Cell>
			<Cell
				grow={args['grow']}
				shrink={args['shrink']}
				size={args['size']}
			>
				B Short Text
			</Cell>
			<Cell
				grow={args['grow']}
				shrink={args['shrink']}
				size={args['size']}
			>
				C Short Text
			</Cell>
		</Row>
		<Row wrap={args['wrap']}>
			<Cell
				grow={args['grow']}
				shrink={args['shrink']}
				size={args['size']}
			>
				A Long Long Long Long Long Long Long Text
			</Cell>
			<Cell
				grow={args['grow']}
				shrink={args['shrink']}
				size={args['size']}
			>
				B Long Long Long Long Long Long Long Text
			</Cell>
			<Cell
				grow={args['grow']}
				shrink={args['shrink']}
				size={args['size']}
			>
				C Long Long Long Long Long Long Long Text
			</Cell>
		</Row>
		<Row wrap={args['wrap']}>
			<Cell
				grow={args['grow']}
				shrink={args['shrink']}
				size={args['size']}
			>
				A Medium Medium Text
			</Cell>
			<Cell
				grow={args['grow']}
				shrink={args['shrink']}
				size={args['size']}
			>
				B Medium Medium Text
			</Cell>
			<Cell
				grow={args['grow']}
				shrink={args['shrink']}
				size={args['size']}
			>
				C Medium Medium Text
			</Cell>
		</Row>
	</Column>
);

select('wrap', WithNestedLayout, ['nowrap', 'wrap', 'reverse'], Layout, 'nowrap');

boolean('grow', WithNestedLayout, Cell, false);
boolean('shrink', WithNestedLayout, Cell, false);
select('size', WithNestedLayout, ['', '300px', '500px', '1000px', '1500px'], Cell, '');

WithNestedLayout.storyName = "Nested Layout";

export const WithIndiviualControl = (args) => (
	<Layout
		orientation={args['orientation']}
		style={{width : "1400px"}}
		wrap={args['wrap']}
	>
		<Cell
			grow={args['grow A']}
			shrink={args['shrink A']}
			size={args['size A']}
		>
			A Short Text
		</Cell>
		<Cell
			grow={args['grow B']}
			shrink={args['shrink B']}
			size={args['size B']}
		>
			B Short Text
		</Cell>
		<Cell
			grow={args['grow C']}
			shrink={args['shrink C']}
			size={args['size C']}
		>
			C Short Text
		</Cell>
	</Layout>
);

select('orientation', WithIndiviualControl, ['horizontal', 'vertical'], Layout, 'horizontal');
select('wrap', WithIndiviualControl, ['nowrap', 'wrap', 'reverse'], Layout, 'nowrap');

boolean('grow A', WithIndiviualControl, Cell, false);
boolean('shrink A', WithIndiviualControl, Cell, false);
select('size A', WithIndiviualControl, ['', '300px', '500px', '1000px', '1500px'], Cell, '');

boolean('grow B', WithIndiviualControl, Cell, false);
boolean('shrink B', WithIndiviualControl, Cell, false);
select('size B', WithIndiviualControl, ['', '300px', '500px', '1000px', '1500px'], Cell, '');

boolean('grow C', WithIndiviualControl, Cell, false);
boolean('shrink C', WithIndiviualControl, Cell, false);
select('size C', WithIndiviualControl, ['', '300px', '500px', '1000px', '1500px'], Cell, '');

WithIndiviualControl.storyName = "Individual Control";
