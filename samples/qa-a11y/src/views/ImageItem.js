import ImageItem from '@enact/sandstone/ImageItem';
import React from 'react';

import Section from '../components/Section';

import css from '../App/App.module.less';

const SelectableImageItem = (props) => {
	const [checked, setChecked] = React.useState(false);
	const handleClick = () => setChecked(!checked);

	return <ImageItem {...props} onClick={handleClick} selected={checked} />; // eslint-disable-line react/jsx-no-bind
};

const labelAndSrc = {
	label: 'Label',
	src: 'http://via.placeholder.com/200x200/7ed31d/ffffff'
};

const ImageItemView = () => (
	<>
		<Section title="Default">
			<ImageItem
				{...labelAndSrc}
				alt="With Children and Label"
				orientation="horizontal"
			>
				Text 0
			</ImageItem>

			<SelectableImageItem
				{...labelAndSrc}
				alt="With Children, Label, and showSelection"
				orientation="horizontal"
				showSelection
			>
				Text 1
			</SelectableImageItem>
		</Section>

		<Section className={css.marginTop} title="Aria-labelled">
			<ImageItem
				{...labelAndSrc}
				alt="Aria-labelled with with Children and Label"
				aria-label="This is a Label 0."
				orientation="horizontal"
			>
				Text 0
			</ImageItem>

			<SelectableImageItem
				{...labelAndSrc}
				alt="Aria-labelled with with showSelection"
				aria-label="This is a Label 1."
				orientation="horizontal"
				showSelection
			>
				Text 1
			</SelectableImageItem>

			<ImageItem
				{...labelAndSrc}
				alt="Aria-labelled and Disabled with with Children and Label"
				aria-label="This is a Label 2."
				disabled
				orientation="horizontal"
			>
				Text 2
			</ImageItem>

			<SelectableImageItem
				{...labelAndSrc}
				alt="Aria-labelled and Disabled with with showSelection"
				aria-label="This is a Label 3."
				disabled
				orientation="horizontal"
				showSelection
			>
				Text 3
			</SelectableImageItem>
		</Section>
	</>
);

export default ImageItemView;
