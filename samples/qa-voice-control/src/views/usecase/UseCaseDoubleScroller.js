import Heading from '@enact/sandstone/Heading';
import Item from '@enact/sandstone/Item';
import {Panel, Header} from '@enact/sandstone/Panels';
import Repeater from '@enact/ui/Repeater';
import {Scroller} from '@enact/sandstone/Scroller';

import React from 'react';

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
		console.log('handleKoreaFocus>', this.state);	// eslint-disable-line no-console
	};

	handleAfricaFocus = () => {
		if (!this.state.isAfricaFocused) {
			this.setState({
				isKoreaFocused: false,
				isAfricaFocused: true
			});
		}
		console.log('handleAfricaFocus>', this.state);	// eslint-disable-line no-console
	};

	render () {
		return (
			<Panel>
				<Header title="Use Case Double Scroller" />
				<div style={{display: 'flex', flexDirection: 'row'}}>
					<div>
						<Heading style={{width: '400px'}}>{'한국'}</Heading>
						<div data-korea-scroller>
							<Scroller
								style={{width: '400px', height: '700px'}}
								onFocus={this.handleKoreaFocus}
								data-webos-voice-focused={this.state.isKoreaFocused}
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
						<Heading style={{width: '400px'}}>{'아프리카'}</Heading>
						<div data-africa-scroller>
							<Scroller
								style={{width: '400px', height: '700px'}}
								onFocus={this.handleAfricaFocus}
								data-webos-voice-focused={this.state.isAfricaFocused}
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
			</Panel>
		);
	}
}

export default UseCaseDoubleScroller;
