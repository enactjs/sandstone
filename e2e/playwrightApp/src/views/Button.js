import kind from '@enact/core/kind';
import Button from '@enact/sandstone/Button';

const ButtonView = kind({
	name: 'ButtonView',

	render: (props) => (
		<div {...props}>
			<div>
				<Button
					id="button1"
				>
					Default Button
				</Button>
				<Button
					id="button2"
					disabled
					placeholder="disableButton"
				>
					Button disabled
				</Button>
				<Button
					id="button3"
					backgroundOpacity="transparent"
				>
					Transparent Button
				</Button>
				<Button
					id="button4"
					icon="check"
				>
					Button icon check
				</Button>
				<Button
					id="button5"
					icon="check"
					iconPosition="after"
				>
					Button icon position after
				</Button>
				<Button
					id="button6"
					minWidth={false}
				>
					Button minWidth false
				</Button>
				<Button
					id="button7"
					size="small"
				>
					Button size small
				</Button>
				<Button
					id="button8"
					icon="home"
					placeholder="inputButton"
				/>
			</div>
		</div>
	)
});

export default ButtonView;
