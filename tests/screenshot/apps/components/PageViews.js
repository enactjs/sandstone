
import Item from '../../../../Item';
import PageViews, {Page} from '../../../../PageViews';
import {Panel, Header} from '../../../../Panels';

import {withConfig} from './utils';

import css from './PageViews.module.less';

const PageComponents = [
	<Page>Page 1</Page>,
	<Page>
		<Item>Item 1</Item>
		<Item>Item 2</Item>
	</Page>,
	<Page>Page 3</Page>
];

const BaseTests = [
	{
		component: <Panel><Header title="title of panel" subtitle="subtitle of panel" /><PageViews index={0} pageIndicatorPosition="top">{PageComponents[0]}</PageViews></Panel>,
		wrapper: {full: true}
	},
	{
		component: <Panel><Header title="title of panel" subtitle="subtitle of panel" /><PageViews index={0} pageIndicatorPosition="top">{PageComponents}</PageViews></Panel>,
		wrapper: {full: true}
	},
	{
		component: <Panel><Header title="title of panel" subtitle="subtitle of panel" /><PageViews index={1} pageIndicatorPosition="top">{PageComponents}</PageViews></Panel>,
		wrapper: {full: true}
	},
	{
		component: <Panel><Header title="title of panel" subtitle="subtitle of panel" /><PageViews index={2} pageIndicatorPosition="top">{PageComponents}</PageViews></Panel>,
		wrapper: {full: true}
	},
	{
		component: <Panel><Header title="title of panel" subtitle="subtitle of panel" /><PageViews fullContents index={2} pageIndicatorPosition="top">{PageComponents}</PageViews></Panel>,
		wrapper: {full: true}
	},
	{
		component: <Panel><Header title="title of panel" subtitle="subtitle of panel" /><PageViews index={0}>{PageComponents[0]}</PageViews></Panel>,
		wrapper: {full: true}
	},
	{
		component: <Panel><Header title="title of panel" subtitle="subtitle of panel" /><PageViews index={0}>{PageComponents}</PageViews></Panel>,
		wrapper: {full: true}
	},
	{
		component: <Panel><Header title="title of panel" subtitle="subtitle of panel" /><PageViews index={1}>{PageComponents}</PageViews></Panel>,
		wrapper: {full: true}
	},
	{
		component: <Panel><Header title="title of panel" subtitle="subtitle of panel" /><PageViews index={2}>{PageComponents}</PageViews></Panel>,
		wrapper: {full: true}
	},
	{
		component: <Panel><Header title="title of panel" subtitle="subtitle of panel" /><PageViews css={css} index={1}>{PageComponents}</PageViews></Panel>,
		wrapper: {full: true}
	},
	{
		component: <Panel><Header title="title of panel" subtitle="subtitle of panel" /><PageViews fullContents index={2}>{PageComponents}</PageViews></Panel>,
		wrapper: {full: true}
	},
	{
		component: <Panel><Header title="title of panel" subtitle="subtitle of panel" /><PageViews pageIndicatorType="number" index={0}>{PageComponents[0]}</PageViews></Panel>,
		wrapper: {full: true}
	},
	{
		component: <Panel><Header title="title of panel" subtitle="subtitle of panel" /><PageViews pageIndicatorType="number" index={0}>{PageComponents}</PageViews></Panel>,
		wrapper: {full: true}
	},
	{
		component: <Panel><Header title="title of panel" subtitle="subtitle of panel" /><PageViews pageIndicatorType="number" index={1}>{PageComponents}</PageViews></Panel>,
		wrapper: {full: true}
	},
	{
		component: <Panel><Header title="title of panel" subtitle="subtitle of panel" /><PageViews pageIndicatorType="number" index={2}>{PageComponents}</PageViews></Panel>,
		wrapper: {full: true}
	},
	{
		component: <Panel><Header title="title of panel" subtitle="subtitle of panel" /><PageViews pageIndicatorType="number" pageIndicatorPosition="top" index={0}>{PageComponents[0]}</PageViews></Panel>,
		wrapper: {full: true}
	},
	{
		component: <Panel><Header title="title of panel" subtitle="subtitle of panel" /><PageViews pageIndicatorType="number" index={0} pageIndicatorPosition="top">{PageComponents}</PageViews></Panel>,
		wrapper: {full: true}
	},
	{
		component: <Panel><Header title="title of panel" subtitle="subtitle of panel" /><PageViews pageIndicatorType="number" index={1} pageIndicatorPosition="top">{PageComponents}</PageViews></Panel>,
		wrapper: {full: true}
	},
	{
		component: <Panel><Header title="title of panel" subtitle="subtitle of panel" /><PageViews pageIndicatorType="number" index={2} pageIndicatorPosition="top">{PageComponents}</PageViews></Panel>,
		wrapper: {full: true}
	}
];

const PageViewsTests = [
	...BaseTests,
	...withConfig({locale: 'ar-SA'}, BaseTests)
];

export default PageViewsTests;
