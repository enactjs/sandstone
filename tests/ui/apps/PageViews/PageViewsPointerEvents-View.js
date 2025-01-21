import Button from '../../../../Button';
import {PageViews} from '../../../../PageViews';
import ThemeDecorator from '../../../../ThemeDecorator';
import spotlight from '@enact/spotlight';
import ri from '@enact/ui/resolution';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<PageViews fullContents style={{width: ri.scaleToRem(750), height: ri.scaleToRem(750)}}>
		<PageViews.Page >
			<div style={{display: 'flex', flexDirection: 'column'}}>
				<Button>Button 0</Button>
				<Button>Button 1</Button>
				<Button id="PageViewsButton2">Button 2</Button>
				<Button>Button 3</Button>
				<Button>Button 4</Button>
				<Button>Button 5</Button>
				<Button>Button 6</Button>
				<Button>Button 7</Button>
			</div>
		</PageViews.Page>
		<PageViews.Page>
			<Button style={{height: '100%', width: '100%'}}>world</Button>
		</PageViews.Page>
	</PageViews>
</div>;

export default ThemeDecorator(app);
