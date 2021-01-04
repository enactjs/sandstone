import Alert, {AlertImage} from '@enact/sandstone/Alert';
import Button from '@enact/sandstone/Button';
import React from 'react';

import Section from '../components/Section';
import useEventHandlers from '../components/useEventHandlers';

import appCss from '../App/App.module.less';

const AlertView = () => {
	const [open, handleOpen] = useEventHandlers(8);

	return (
		<>
			<Section size="50%" title="Alert Fullscreen">
				<Button alt="Normal" onClick={handleOpen(0, true)}>Text 0</Button>
				<Button alt="With 3(max) Buttons" onClick={handleOpen(1, true)}>Text 1</Button>
				<Button alt="With Thumbnail" onClick={handleOpen(2, true)}>Text 2</Button>
				<Button alt="Without Title" onClick={handleOpen(3, true)}>Text 3</Button>
				<Button alt="Without Content" onClick={handleOpen(4, true)}>Text 4</Button>
			</Section>

			<Section className={appCss.marginTop} size="50%" title="Alert Overlay which has No title">
				<Button alt="Normal" onClick={handleOpen(5, true)}>Text 0</Button>
				<Button alt="With 3(max) Buttons" onClick={handleOpen(6, true)}>Text 1</Button>
				<Button alt="With Thumbnail" onClick={handleOpen(7, true)}>Text 2</Button>
			</Section>

			<Alert
				onClose={handleOpen(0, false)}
				open={open[0]}
				title="Heading Title"
			>
				<span>Content</span>
				<buttons>
					<Button onClick={handleOpen(0, false)}>Text</Button>
				</buttons>
			</Alert>

			<Alert
				onClose={handleOpen(1, false)}
				open={open[1]}
				title="Good morning"
			>
				<span>
					Not to worry, this message isn&apos;t going to be very long.
					It just has to be long enough to show what a long message looks like.
					That&apos;s all; have a nice day.
				</span>
				<buttons>
					<Button onClick={handleOpen(1, false)}>First Button!</Button>
					<Button onClick={handleOpen(1, false)}>Oh My Yes, Kitten</Button>
					<Button onClick={handleOpen(1, false)}>Hide And Show</Button>
				</buttons>
			</Alert>

			<Alert
				onClose={handleOpen(2, false)}
				open={open[2]}
				title="Heading Title"
			>
				<image>
					<AlertImage src={'https://via.placeholder.com/250.png?text=image'} type="thumbnail" />
				</image>
				<span>Content</span>
				<buttons>
					<Button onClick={handleOpen(2, false)}>Text 0</Button>
					<Button onClick={handleOpen(2, false)}>Text 1</Button>
				</buttons>
			</Alert>

			<Alert
				onClose={handleOpen(3, false)}
				open={open[3]}
			>
				<span>Content</span>
				<buttons>
					<Button onClick={handleOpen(3, false)}>Text 0</Button>
					<Button onClick={handleOpen(3, false)}>Text 1</Button>
					<Button onClick={handleOpen(3, false)}>Text 2</Button>
				</buttons>
			</Alert>

			<Alert
				onClose={handleOpen(4, false)}
				open={open[4]}
				title="Heading Title"
			>
				<buttons>
					<Button onClick={handleOpen(4, false)}>Text 0</Button>
					<Button onClick={handleOpen(4, false)}>Text 1</Button>
				</buttons>
			</Alert>

			<Alert
				onClose={handleOpen(5, false)}
				open={open[5]}
				type="overlay"
			>
				<span>
					Not to worry, this message isn&apos;t going to be very long.
					It just has to be long enough to show what a long message looks like.
					That&apos;s all; have a nice day.
				</span>
				<buttons>
					<Button onClick={handleOpen(5, false)}>First Button!</Button>
					<Button onClick={handleOpen(5, false)}>Oh My Yes, Kitten</Button>
				</buttons>
			</Alert>

			<Alert
				onClose={handleOpen(6, false)}
				open={open[6]}
				type="overlay"
			>
				<span>Content</span>
				<buttons>
					<Button onClick={handleOpen(6, false)}>Text 0</Button>
					<Button onClick={handleOpen(6, false)}>Text 1</Button>
					<Button onClick={handleOpen(6, false)}>Text 2</Button>
				</buttons>
			</Alert>

			<Alert
				onClose={handleOpen(7, false)}
				open={open[7]}
				type="overlay"
			>
				<image>
					<AlertImage src={'https://via.placeholder.com/250.png?text=image'} type="thumbnail" />
				</image>
				<span>
					Content
				</span>
				<buttons>
					<Button onClick={handleOpen(7, false)}>Text 0</Button>
					<Button onClick={handleOpen(7, false)}>Text 1</Button>
				</buttons>
			</Alert>
		</>
	);
};

export default AlertView;
