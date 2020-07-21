import Button from '@enact/sandstone/Button';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import VideoPlayer, {MediaControls} from '@enact/sandstone/VideoPlayer';

import componentCss from './MainPanel.module.less';

const SelectableVideoPlayer = class extends React.Component {

	static displayName = 'SelectableVideoPlayer'

	static propTypes = {
		css: PropTypes.object
	}

	state = {
		selection: null
	}

	handleToggleSelection = () => {
		const {selection} = this.state;

		const {currentTime} = this.video.getMediaState();

		if (selection == null || selection.length === 2) {
			this.setState({
				selection: [currentTime],
				selecting: true
			});
		} else {
			this.setState({
				selection: [selection[0], currentTime].sort((a, b) => a - b),
				selecting: false
			});
		}
	}

	handleTimeUpdate = () => {
		const {selection} = this.state;
		const {currentTime} = this.video.getMediaState();

		if (selection != null) {
			const [selectionEnd] = selection;
			// const [selectionStart] = selection; // commented to suppress build warnings; uncomment for seek code below if necessary

			if (currentTime >= selectionEnd) {
				// seek to start
				// this.video.seek(selectionStart);

				// ... or pause() and lock at end
				this.video.pause();
				// this.video.seek(selectionEnd);
			}
		}
	}

	handleSeekOutsideSelection = (ev) => {

		// prevent the action and seek to the beginning or end
		const {selection} = this.state;
		const [selectionStart, selectionEnd] = selection;
		ev.preventDefault();

		if (ev.time < selectionStart) {
			this.video.seek(selectionStart);
		} else if (ev.time > selectionStart) {
			// this.video.pause();
			this.video.seek(selectionEnd);
		}

		// or remove the selection and allow the default behavior
		// this.setState({
		// 	selection: null
		// });
	}

	setVideo = (video) => {
		this.video = video;
	}

	render () {
		const {css} = this.props;
		const {selecting} = this.state;

		return (
			<VideoPlayer
				{...this.props}
				loop
				onSeekOutsideSelection={this.handleSeekOutsideSelection}
				onTimeUpdate={this.handleTimeUpdate}
				selection={this.state.selection}
				ref={this.setVideo}
			>
				<MediaControls>
					<Button className={selecting ? css.selecting : ''} onTap={this.handleToggleSelection}>repeat</Button>
				</MediaControls>
				<source src="http://media.w3.org/2010/05/video/movie_300.mp4" />
			</VideoPlayer>
		);
	}
};

const MainPanel = kind({
	name: 'MainPanel',

	render: () => (
		<SelectableVideoPlayer css={componentCss} />
	)
});

export default MainPanel;
