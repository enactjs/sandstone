import DatePicker from '@enact/sandstone/DatePicker';
import ExpandableInput from '@enact/sandstone/ExpandableInput';
import ExpandableItem from '@enact/sandstone/ExpandableItem';
import ExpandableList from '@enact/sandstone/ExpandableList';
import Group from '@enact/ui/Group';
import Icon from '@enact/sandstone/Icon';
import Item from '@enact/sandstone/Item';
import Picker from '@enact/sandstone/Picker';
import RadioItem from '@enact/sandstone/RadioItem';
import React from 'react';
import ri from '@enact/ui/resolution';
import Scroller from '@enact/sandstone/Scroller';
import TimePicker from '@enact/sandstone/TimePicker';

import PanelHeader from '../components/PanelHeader';

import css from './MainView.module.less';

const
	airports = [
		'San Francisco Airport Terminal Gate 1',
		'Boston Airport Terminal Gate 2',
		'Tokyo Airport Terminal Gate 3',
		'נמל התעופה בן גוריון טרמינל הבינלאומי'
	],
	data = [],
	itemData = [];

for (let i = 0; i < 20; i++) {
	data.push(airports[i % 4]);
}

for (let i = 0; i < 50; i++) {
	itemData.push(`Item ${i}`);
}

class MainView extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			focusableScrollbar: false,
			height: 4000,
			width: 1000
		};
	}

	getScaledSize = (size) => ri.scale(parseInt(size) || 0)

	handleFocusableScrollbar = () => {
		this.setState((state) => ({focusableScrollbar: !state.focusableScrollbar}));
	}

	handleHeight = ({value}) => this.setState({height: value})

	handleWidth = ({value}) => this.setState({width: value})

	render () {
		const {height, width} = this.state;

		return (
			<div className={css.mainView}>
				<PanelHeader
					handleFocusableScrollbar={this.handleFocusableScrollbar}
					handleHeight={this.handleHeight}
					handleWidth={this.handleWidth}
					height={height}
					title="Scroller Native"
					type="compact"
					width={width}
				/>
				<div className={css.content}>
					<Scroller focusableScrollbar={this.state.focusableScrollbar}>
						<div style={{height: `${this.getScaledSize(height)}px`, width: `${this.getScaledSize(width)}px`}}>
							<ExpandableList
								closeOnSelect
								noneText="nothing selected"
								title="ExpandableList"
							>
								{['option1', 'option2', 'option3']}
							</ExpandableList>
							<ExpandableItem title="ExpandableItem">
								<Item>
									This can be any type of content you might want to
									render inside a labeled expandable container
								</Item>
								<Item>
									<Icon>star</Icon> You could include other components as well <Icon>star</Icon>
								</Item>
							</ExpandableItem>
							<ExpandableList
								closeOnSelect
								noneText="nothing selected"
								title="ExpandableList"
							>
								{data}
							</ExpandableList>
							<ExpandableInput
								defaultValue="Initial value"
								title="Input with defaultValue"
							/>
							<Picker
								orientation="vertical"
								width="medium"
							>
								{airports}
							</Picker>
							<DatePicker
								noLabels={false}
								noneText="Nothing Selected"
								title="DatePicker"
							/>
							<RadioItem> FirstLongTextWithSpace FirstLongTextWithSpace FirstLongTextWithSpace FirstLongTextWithSpace </RadioItem>
							<RadioItem disabled> Default disabled Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong Text </RadioItem>
							<Group childComponent={Item}>
								{itemData}
							</Group>
							<TimePicker
								noLabels={false}
								noneText="Nothing Selected"
								title="TimePicker"
							/>
						</div>
					</Scroller>
				</div>
			</div>
		);
	}
}

export default MainView;
