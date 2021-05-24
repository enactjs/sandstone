import classnames from 'classnames/bind';
import {objectify} from '@enact/ui/Skinnable/util';
import {generateDate, urlParamsToObject} from '@enact/ui-test-utils/utils';
import spotlight from '@enact/spotlight';
import {Component as ReactComponent, cloneElement, useEffect} from 'react';

import ThemeDecorator from '../../../ThemeDecorator';

import {components, testMetadata} from './SandstoneComponents';
import imports from './importer';
import {LoremString} from './components/utils';

import css from './Sandstone-View.module.less';

const url = new URL(window.location.href);

// Bind our classnames against css modules
const cx = classnames.bind(css);

// NOTE: Forcing pointer mode on to prevent spotlight focusing of components, which leads to marquee
spotlight.setPointerMode(true);

const parsed = urlParamsToObject();

function getWrapperClasses ({wrapper}) {
	return cx('wrapper', wrapper, parsed.skin);
}

function getWrapperStyle ({wrapper = {}}) {
	const {padded} = wrapper;
	if (padded && padded !== true) {
		return {'--wrapper-padding': padded};
	}
}

// TODO: Show error on screen if bad test ID or props
function prepareTest (componentName, testId) {
	if (!components[componentName] || !components[componentName][testId]) {
		return {
			testElement: <div>INVALID COMPONENT OR TEST ID</div>,
			wrapperClasses: css.error
		};
	}

	const componentMetadata = components[componentName][testId];
	let component;

	// If test wants focus, set mode to 5-way so auto-focus works
	if (componentMetadata.focus) {
		spotlight.setPointerMode(false);
	}

	// If this is a complex test (not a bare component), extract component for cloning
	if (componentMetadata.component) {
		component = componentMetadata.component;
	} else {
		component = componentMetadata;
	}

	let children = component.props.children;
	if (children === '-Lorem') {
		children = LoremString;
	}

	const ElementProps = {
		'data-ui-test-id': 'test',
		style: {...component.props.style, outlineColor: 'lime'},
		className: css.outline
	};

	return {
		testElement: cloneElement(component, ElementProps, children),
		wrapperClasses: getWrapperClasses(componentMetadata),
		wrapperStyle: getWrapperStyle(componentMetadata)
	};
}

function prepareFromUrl () {
	// Naively, assuming parsed in the form of: {component: 'ComponentName', props: {}}
	const Component = imports[parsed.component];
	const componentProps = parsed.props || {};
	const wrapperProps = parsed.wrapper || {};

	if (componentProps.children === '-Lorem') {
		componentProps.children = LoremString;
	}

	if (componentProps.defaultValue && /\d{4}-\d{2}-\d{2}/.test(componentProps.defaultValue)) {
		componentProps.defaultValue = generateDate(componentProps.defaultValue);
	}
	return {
		testElement: <Component {...componentProps} />,
		wrapperClasses: getWrapperClasses({skin: parsed.skin, wrapper: wrapperProps}),
		wrapperStyle: getWrapperStyle({skin: parsed.skin, wrapper: wrapperProps})
	};
}

class App extends ReactComponent {
	static getDerivedStateFromError () {
		// Update state so the next render will show the fallback UI.
		return {hasError: true};
	}

	constructor (props) {
		super(props);
		this.state = {hasError: false};
	}

	render () {
		const {component, testId, ...props} = this.props;
		let testElement;
		let wrapperClasses, wrapperStyle;

		if (this.state.hasError) {
			return (
				<div {...props}>
					<div className={css.error}>
						ERROR IN {component} test {testId}
					</div>
				</div>
			);
		}

		if (testId >= 0) {
			({testElement, wrapperClasses, wrapperStyle} = prepareTest(component, testId));
		} else {
			({testElement, wrapperClasses, wrapperStyle} = prepareFromUrl());
		}

		return (
			<div {...props}>
				<div className={wrapperClasses} style={wrapperStyle}>{testElement}</div>
			</div>
		);
	}
}

const ExportedApp = (props) => {
	// Common test parameters
	let skin = url.searchParams.get('skin');
	let highContrast = url.searchParams.get('highContrast') === 'true';

	// Legacy test parameters
	let locale = url.searchParams.get('locale');
	let textSize = url.searchParams.get('textSize') === 'large' ? 'large' : 'normal';
	let noAutoFocus = true;

	if (props.testId >= 0 && components[props.component] && components[props.component][props.testId]) {
		locale = components[props.component][props.testId].locale;
		textSize = components[props.component][props.testId].textSize;
		// If focus enabled by test, use auto-focus to set an initial focus
		noAutoFocus = !components[props.component][props.testId].focus;

		// Test can override values from the test runner
		if (components[props.component][props.testId].skin) {
			skin = components[props.component][props.testId].skin;
		}

		const skinVariants = objectify(components[props.component][props.testId].skinVariants);
		if (skinVariants.highContrast) {
			delete skinVariants.highContrast;
			highContrast = true;
		}
		if (skinVariants.largeText) {
			delete skinVariants.largeText;
			textSize = 'large';
		}
		if (Object.keys(skinVariants).length) {
			// eslint-disable-next-line no-console
			console.warn(`Unknown skin variant in ${props.component} test ${props.testId}`);
		}
	}

	const WrappedApp = ThemeDecorator({noAutoFocus}, App);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/exhaustive-deps
		document.querySelector('#root > div').classList.add('spotlight-input-key');
	}, []);

	return (
		<WrappedApp {...props} skin={skin} highContrast={highContrast} locale={locale} textSize={textSize} />
	);
};

export default ExportedApp;
export {
	components,
	testMetadata
};
