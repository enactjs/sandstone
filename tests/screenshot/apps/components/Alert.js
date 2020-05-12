import Alert, {AlertImage}  from '../../../../Alert';
import Button from '../../../../Button';
import React from 'react';

const AlertTests = [
	// Fullscreen alert with only children should be blank
	<Alert open>Alert!</Alert>,
	<Alert open subtitle="Subtitle" title="Title">Alert with title and subtitle!</Alert>,
	<Alert open subtitle="Subtitle" title="Alert with buttons!">
		<buttons>
			<Button>Yes</Button>
			<Button>No</Button>
		</buttons>
	</Alert>,
	<Alert open subtitle="Subtitle" title="Alert with image!">
		<image>
			<AlertImage
				src="https://via.placeholder.com/240.png?text=image"
				type="thumbnail"
			/>
		</image>
	</Alert>,
	<Alert open subtitle="Subtitle" title="Alert with image and buttons!">
		<image>
			<AlertImage
				src="https://via.placeholder.com/240.png?text=image"
				type="thumbnail"
			/>
		</image>
		<buttons>
			<Button>Yes</Button>
			<Button>No</Button>
		</buttons>
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
	</Alert>,
	<Alert open subtitle="Subtitle" title="Title" type="overlay">
		<image>
			<AlertImage
				src="https://via.placeholder.com/240.png?text=image"
				type="thumbnail"
			/>
		</image>
		<buttons>
			<Button>Yes</Button>
			<Button>No</Button>
		</buttons>
		Overlay Alert with buttons!
	</Alert>
];

export default AlertTests;
