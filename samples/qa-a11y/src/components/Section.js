import kind from '@enact/core/kind';
import {Children} from 'react';
import PropTypes from 'prop-types';
import {Cell, Row} from '@enact/ui/Layout';

import Heading from '@enact/sandstone/Heading';

import css from './Section.module.less';

//
// A "section" to be used in Kitchen-Sink style QA stories
//
// Accepts a title for the section, and children components.
// Each child component should have an "alt" attribute that will be used as the title.
// Typically. this is a 1-2 word "state" description of what the child is representing,
// like "Normal", "Selected", or "With Icon"
//
// This is a cell, so `size` prop may be supplied as well, to fit multiple on one line
//

const SectionBase = kind({
	name: 'Section',

	propTypes: {
		horizontal: PropTypes.bool,
		title: PropTypes.string
	},

	styles: {
		css,
		className: 'section'
	},

	render: ({children, horizontal, title, ...rest}) => (
		horizontal ?
			<Cell size={1500} {...rest}>
				<Heading showLine>{title}</Heading>
				<Row className={css.componentDemo}>
					{Children.map(children, child => (
						<Cell component="label" size="20%">
							<div>{child.props.alt}</div>
							{child}
						</Cell>
					))}
				</Row>
			</Cell> :
			<Cell size={1500} {...rest}>
				<Heading showLine>{title}</Heading>
				{Children.map(children, child => (
					<Row className={css.componentDemo} align="center">
						<Cell component="label" size="40%">{child.props.alt}</Cell>
						<Cell>{child}</Cell>
					</Row>
				))}
			</Cell>
	)
});

export default SectionBase;
