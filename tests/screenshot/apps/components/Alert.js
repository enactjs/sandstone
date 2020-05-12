import Alert, {AlertImage}  from '../../../../Alert';
import Button from '../../../../Button';
import React from 'react';

const AlertTests = [
	<Alert open>Alert!</Alert>,
	<Alert open subtitle="Subtitle" title="Title">Alert with title and subtitle!</Alert>,
	<Alert open subtitle="Subtitle" title="Title">
		<buttons>
			<Button>Yes</Button>
			<Button>No</Button>
		</buttons>
		Alert with buttons!
	</Alert>,
	<Alert open subtitle="Subtitle" title="Title">
		<image>
			<AlertImage
				src="https://via.placeholder.com/240.png?text=image"
				type="thumbnail"
			/>
		</image>
		Alert with image!
	</Alert>,
	<Alert open subtitle="Subtitle" title="Title" type="overlay">Overlay Alert with title!</Alert>,
	<Alert open subtitle="Subtitle" title="Title" type="overlay">
		<buttons>
			<Button>Yes</Button>
			<Button>No</Button>
		</buttons>
		Overlay Alert with buttons!
	</Alert>,
	<Alert open subtitle="Subtitle" title="Title" type="overlay">
		<image>
			<AlertImage
				src="https://via.placeholder.com/240.png?text=image"
				type="thumbnail"
			/>
		</image>
		Overlay Alert with image!
	</Alert>
];

export default AlertTests;
