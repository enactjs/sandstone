import Button from '../../../../Button';
import ThemeDecorator from '../../../../ThemeDecorator';
import spotlight from '@enact/spotlight';
import {setWebVitalsMetrics} from "../../utils";

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => {

	setWebVitalsMetrics();

	const logProps = () => {
		console.log(props);
	};

	return <div {...props}>
		<Button id="button" onClick={logProps}>
			Default Button
		</Button>
	</div>;
}


export default ThemeDecorator(app);
