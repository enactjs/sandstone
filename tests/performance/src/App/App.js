import kind from '@enact/core/kind';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import React from 'react';

import Picker from '../views/Picker';
import ScrollerPanel from '../views/ScrollerPanel';
import Panels from '../views/Panels';
import ExpandableItem from '../views/ExpandableItem';
import Popup from '../views/Popup';
import Marquee from '../views/Marquee';
import Spinner from '../views/Spinner';
import Button from '../views/Button';
import VirtualList from '../views/VirtualList';
import VirtualListClientSize from '../views/VirtualListClientSize';
import GridListImageItem from '../views/GridListImageItem';
import Item from '../views/Item';
import Slider from '../views/Slider';
import MarqueeMultiple from '../views/MarqueeMultiple';
import ViewManager from '../views/ViewManager';
import ScrollerMultipleChildren from '../views/ScrollerMultipleChildren';
import TransitionVsCSSAnimation from '../views/TransitionVsCSSAnimation';

import {BrowserRouter as Router, Route} from 'react-router-dom';

const App = kind({
	name: 'App',

	render: (props) => (
		<Router>
			<div {...props}>
				<Route path="/panels" component={Panels} />
				<Route path="/picker" component={Picker} />
				<Route path="/scroller" component={ScrollerPanel} />
				<Route path="/expandableItem" component={ExpandableItem} />
				<Route path="/popup" component={Popup} />
				<Route path="/marquee" component={Marquee} />
				<Route path="/spinner" component={Spinner} />
				<Route path="/button" component={Button} />
				<Route path="/virtualList" component={VirtualList} />
				<Route path="/virtualListClientSize" component={VirtualListClientSize} />
				<Route path="/gridListImageItem" component={GridListImageItem} />
				<Route path="/item" component={Item} />
				<Route path="/slider" component={Slider} />
				<Route path="/marqueeMultiple" component={MarqueeMultiple} />
				<Route path="/viewManager" component={ViewManager} />
				<Route path="/scrollerMultipleChildren" component={ScrollerMultipleChildren} />
				<Route path="/transitionVsCSSAnimation" component={TransitionVsCSSAnimation} />
			</div>
		</Router>
	)
});

export default ThemeDecorator(App);
