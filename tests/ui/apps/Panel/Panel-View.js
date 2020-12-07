import React from 'react';
import spotlight from '@enact/spotlight';

import Button from '../../../../Button';
import {Panel, Panels, Header} from '../../../../Panels';
import ThemeDecorator from '../../../../ThemeDecorator';

import UrlPropsDecorator from '../../components/UrlPropsDecorator';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

function PanelWithNav ({children, hideChildrenOverride, index, subtitle, onNext, onPrev, ...rest}) {
	if (typeof hideChildrenOverride !== 'undefined') {
		rest.hideChildren = hideChildrenOverride;
	}

	return (
		<Panel id={`Panel${index}`} {...rest} >
			<Header id={`header${index}`} title={`Panel${index}`} subtitle={subtitle}>
				{onPrev ? <Button icon="arrowlargeleft" onClick={onPrev} slot="slotAfter" id={`prev${index}`} /> : null}
				{onNext ? <Button icon="arrowlargeright" onClick={onNext} slot="slotAfter" id={`next${index}`} /> : null}
			</Header>
			<div id={`body${index}`} />
			{children}
		</Panel>
	);
}

function App ({defaultIndex = 0, ...rest}) {
	const [index, setIndex] = React.useState(defaultIndex);
	const onNext = React.useCallback(() => setIndex(index + 1), [index, setIndex]);
	const onPrev = React.useCallback(() => setIndex(index - 1), [index, setIndex]);

	if (typeof window !== 'undefined') {
		window.setPanelIndex = setIndex;
	}

	return (
		<Panels {...rest} index={index}>
			<PanelWithNav index={1} onNext={onNext} subtitle="Default">
				<div>Panel Body</div>
			</PanelWithNav>
			<PanelWithNav autoFocus="last-focused" index={2} onNext={onNext} onPrev={onPrev} subtitle="autoFocus='last-focused'">
				<Button>Panel2 Button 1</Button>
				<Button>Panel2 Button 2</Button>
			</PanelWithNav>
			<PanelWithNav autoFocus="default-element" index={3} onNext={onNext} onPrev={onPrev} subtitle="autoFocus='default-element'">
				<Button>Panel3 Button 1</Button>
				<Button className="spottable-default">Panel3 Button 2</Button>
			</PanelWithNav>
			<PanelWithNav autoFocus="none" index={4} onNext={onNext} onPrev={onPrev} subtitle="autoFocus='none'">
				<Button>Panel4 Button 1</Button>
				<Button>Panel4 Button 2</Button>
			</PanelWithNav>
			<PanelWithNav index={5} onNext={onNext} onPrev={onPrev} hideChildrenOverride={false} subtitle="hideChildren=false">
				<Button>Panel5 Button 1</Button>
				<Button>Panel5 Button 2</Button>
			</PanelWithNav>
			<PanelWithNav index={6} onNext={onNext} onPrev={onPrev} subtitle="with spottable-default">
				<Button>Panel6 Button 1</Button>
				<Button className="spottable-default">Panel6 Button 2</Button>
			</PanelWithNav>
			<PanelWithNav index={7} onPrev={onPrev} subtitle="default">
				<Button>Panel7 Button 1</Button>
				<Button>Panel7 Button 2</Button>
			</PanelWithNav>
		</Panels>
	);
}

export default UrlPropsDecorator(ThemeDecorator(App));
