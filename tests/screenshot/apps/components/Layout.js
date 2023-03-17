import Layout, {Cell, Column, Row} from '@enact/ui/Layout';
import Button from '@enact/sandstone/Button';

import {withConfig, withProps} from './utils';

import css from './Layout.module.less';

const rowTestCases = [
	// horizontal
	<Layout>
		<Cell className={css.red}>Layout Content</Cell>
		<Cell className={css.blue} shrink>Layout Side</Cell>
	</Layout>,

	<Layout orientation="horizontal">
		<Cell className={css.red}>Row Content</Cell>
		<Cell className={css.blue} shrink>Row Side</Cell>
	</Layout>,

	<Row>
		<Cell className={css.red}>Row Column1</Cell>
		<Cell className={css.blue}>Row Column2</Cell>
	</Row>,

	<Row>
		<Cell className={css.red}>Row Content</Cell>
		<Cell className={css.blue} shrink>Long Long Long Long Side</Cell>
	</Row>,

	<Row>
		<Cell className={css.red}>Row Content</Cell>
		<Cell className={css.blue} shrink size={100}>Long Long Long Long Side</Cell>
	</Row>,

	<Row>
		<Cell className={css.red}>Row Content</Cell>
		<Cell className={css.blue} shrink size={500}>Long Long Long Long Side</Cell>
	</Row>,

	<Layout>
		<Cell className={css.blue} shrink>Layout menu</Cell>
		<Cell className={css.red}>Layout Content</Cell>
		<Cell className={css.blue} shrink>Layout Side</Cell>
	</Layout>
];

const columnTestCases = [
	<Layout>Layout</Layout>,

	// vertical
	<Layout orientation="vertical" style={{height: "500px"}}>
		<Cell className={css.blue} shrink>Column header1</Cell>
		<Cell className={css.red}>Column Content1</Cell>
		<Cell className={css.blue} shrink>Column footer1</Cell>
	</Layout>,

	<Column style={{height: "500px"}}>
		<Cell className={css.blue} shrink>Column header2</Cell>
		<Cell className={css.red}>Column Content2</Cell>
		<Cell className={css.blue} shrink>Column footer2</Cell>
	</Column>,

	<Column style={{height: "500px"}}>
		<Cell className={css.blue} shrink>Column header3</Cell>
		<Cell className={css.red}>Column Content3</Cell>
		<Cell className={css.blue} shrink size={300}>Column footer3</Cell>
	</Column>,

	<Column style={{height: "500px"}}>
		<Cell className={css.blue} shrink>Column header4</Cell>
		<Cell className={css.red}>Column Content4</Cell>
		<Cell className={css.blue} shrink size={1000}>Column footer4</Cell>
	</Column>,

	<Column style={{height: "500px"}}>
		<Cell className={css.blue} shrink>Column header5</Cell>
		<Cell className={css.red}>Column Content5</Cell>
		<Cell className={css.blue} size={500}>Column footer5</Cell>
	</Column>
];

const layoutTestCases = [
	// 2D layout
	<Row style={{height: "500px"}}>
		<Cell className={css.red} size="20%">Sidebar</Cell>
		<Cell>
			<Column>
				<Cell className={css.blue} size={90} component="header">
					<h1>HEADER</h1>
				</Cell>
				<Cell className={css.green}>
					<p>Body area</p>
				</Cell>
			</Column>
		</Cell>
	</Row>,

	<Layout>
		<Cell className={css.red} shrink>
			<Button>First</Button>
		</Cell>
		<Cell className={css.blue}>
			<div>A div with some long text in it</div>
		</Cell>
		<Cell className={css.green} shrink>
			<Button>Last</Button>
		</Cell>
	</Layout>,

	<Layout align="center">
		<Cell className={css.red} component="label" size="40%" shrink>Align center layout</Cell>
		<Cell className={css.blue} component={Button} icon="home" />
	</Layout>
];

// 7 6 3
const LayoutTests = [
	...rowTestCases,
	...columnTestCases,
	...layoutTestCases,
	...withProps ({wrap: 'wrap'}, rowTestCases),
	...withProps ({wrap: 'wrap'}, layoutTestCases),
	...withProps ({wrap: 'reverse'}, rowTestCases),
	...withProps ({wrap: 'reverse'}, layoutTestCases),

	// *************************************************************
	// RTL
	// locale = 'ar-SA'
	// *************************************************************
	...withConfig({locale: 'ar-SA'}, [
		...rowTestCases,
		...layoutTestCases,
		...withProps ({wrap: 'wrap'}, rowTestCases),
		...withProps ({wrap: 'wrap'}, layoutTestCases),
		...withProps ({wrap: 'reverse'}, rowTestCases),
		...withProps ({wrap: 'reverse'}, layoutTestCases)
	])
];

export default LayoutTests;
