import ImageItem from '@enact/sandstone/ImageItem';
import React from 'react';

import Section from '../components/Section';

import css from '../App/App.module.less';

const SelectableImageItem = (props) => {
	const [checked, setChecked] = React.useState(false);
	const handleClick = () => setChecked(!checked);

	return <ImageItem {...props} onClick={handleClick} selected={checked} />; // eslint-disable-line react/jsx-no-bind
};

const ImageItemView = () => (
	<>
		<Section title="Default">
			<ImageItem
				alt="With Children and Label"
				label="Label"
				orientation="horizontal"
				src="http://via.placeholder.com/200x200/7ed31d/ffffff"
			>
				Text
			</ImageItem>

			<SelectableImageItem
				alt="With Children, Label, and showSelection"
				label="Label"
				orientation="horizontal"
				showSelection
				src="http://via.placeholder.com/200x200/7ed31d/ffffff"
			>
				Text
			</SelectableImageItem>
		</Section>

		<Section className={css.marginTop} title="Aria-labelled">
			<ImageItem
				alt="Aria-labelled with with Children and Label"
				aria-label="This is a Label."
				label="Label"
				orientation="horizontal"
				src="http://via.placeholder.com/200x200/7ed31d/ffffff"
			>
				Text
			</ImageItem>

			<SelectableImageItem
				alt="Aria-labelled with with showSelection"
				aria-label="This is a Label."
				label="Label"
				orientation="horizontal"
				showSelection
				src="http://via.placeholder.com/200x200/7ed31d/ffffff"
			>
				Text
			</SelectableImageItem>

			<ImageItem
				alt="Aria-labelled and Disabled with with Children and Label"
				aria-label="This is a Label."
				disabled
				label="Label"
				orientation="horizontal"
				src="http://via.placeholder.com/200x200/7ed31d/ffffff"
			>
				Text
			</ImageItem>

			<SelectableImageItem
				alt="Aria-labelled and Disabled with with showSelection"
				aria-label="This is a Label."
				disabled
				label="Label"
				orientation="horizontal"
				showSelection
				src="http://via.placeholder.com/200x200/7ed31d/ffffff"
			>
				Text
			</SelectableImageItem>
		</Section>
	</>
);

export default ImageItemView;
