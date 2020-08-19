import Heading from '@enact/sandstone/Heading';
import Item from '@enact/sandstone/Item';
import Scroller from '@enact/sandstone/Scroller';
import Repeater from '@enact/ui/Repeater';
import ri from '@enact/ui/resolution';
import React from 'react';

import CommonView from '../../components/CommonView';

let itemList = [
	'고양이', '강아지', '멍멍이', '토끼', '개미', '사자', '호랑이', '물고기', '기린', '원숭이', '쥐', '뱀', '박쥐', '치타', '낙타', '연어', '광어', '참치', '돔', '방어'
];


class UseCaseDoubleScroller extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			isKoreaFocused: true,
			isAfricaFocused: false
		};
	}

	handleKoreaFocus = () => {
		if (!this.state.isKoreaFocused) {
			this.setState({
				isKoreaFocused: true,
				isAfricaFocused: false
			});
		}
		console.log('handleKoreaFocus > ', this.state);	// eslint-disable-line no-console
	};

	handleAfricaFocus = () => {
		if (!this.state.isAfricaFocused) {
			this.setState({
				isKoreaFocused: false,
				isAfricaFocused: true
			});
		}
		console.log('handleAfricaFocus > ', this.state);	// eslint-disable-line no-console
	};

	render () {
		return (
			<CommonView noScroller title="Double Scroller">
				<div style={{display: 'flex', flexDirection: 'row'}}>
					<div>
						<Heading style={{width: ri.scale(400)}}>{'한국'}</Heading>
						<div data-korea-scroller>
							<Scroller
								data-webos-voice-focused={this.state.isKoreaFocused}
								onFocus={this.handleKoreaFocus}
								style={{width: ri.scale(400), height: ri.scale(700)}}
							>
								<Repeater
									childComponent={Item}
									itemProps={{
										'data-webos-voice-group-label': '한국'
									}}
								>
									{itemList}
								</Repeater>
							</Scroller>
						</div>
					</div>
					<div>
						<Heading style={{width: ri.scale(400)}}>{'아프리카'}</Heading>
						<div data-africa-scroller>
							<Scroller
								data-webos-voice-focused={this.state.isAfricaFocused}
								onFocus={this.handleAfricaFocus}
								style={{width: ri.scale(400), height: ri.scale(700)}}
							>
								<Repeater
									childComponent={Item}
									itemProps={{
										'data-webos-voice-group-label': '아프리카'
									}}
								>
									{itemList}
								</Repeater>
							</Scroller>
						</div>
					</div>
				</div>
			</CommonView>
		);
	}
}

export default UseCaseDoubleScroller;
