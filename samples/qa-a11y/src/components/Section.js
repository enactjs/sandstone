import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';
import {Cell, Row} from '@enact/ui/Layout';

import Heading from '@enact/sandstone/Heading';

import css from './Section.module.less';

//
// A "section" to be used in Kitchen-Sink style QA stories
//
// Accepts a title for the section, and children components.
// Each child component should have an "alt" attribute that will be used as the title.
// Typically this is a 1-2 word "state" description of what the child is representing,
// like "Normal", "Selected", or "With Icon"
//
// This is a cell, so `size` prop may be supplied as well, to fit multiple on one line
//

const SectionBase = kind({
	name: 'Section',

	propTypes: {
		title: PropTypes.string
	},

	styles: {
		css,
		className: 'section'
	},

	render: ({children, title, ...rest}) => (
		<Cell size={1500} {...rest}>
			<Heading showLine>{title}</Heading>
			{React.Children.map(children, child => (
				<Row className={css.componentDemo} align="center">
					<Cell component="label" size="30%">{child.props.alt}</Cell>
					<Cell>{child}</Cell>
				</Row>
			))}
		</Cell>
	)
});

export default SectionBase;
