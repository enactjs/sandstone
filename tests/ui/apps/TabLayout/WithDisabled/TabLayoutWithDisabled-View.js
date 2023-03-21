import spotlight from '@enact/spotlight';

import Button from '../../../../../Button';
import BodyText from '../../../../../BodyText';
import Panel from '../../../../../Panels';
import Scroller from '../../../../../Scroller';
import TabLayout from '../../../../../TabLayout';
import ThemeDecorator from '../../../../../ThemeDecorator';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const App = (props) => {
	const tabs = 3;

	return <div {...props}>
		<Panel>
			<TabLayout
				id="tabLayout"
				orientation="vertical"
			>
				{Array.from({length: tabs}, (v, i) => (
					<TabLayout.Tab
						disabled={i % 2 === 1}
						title={`Tab ${i}`}
						key={`tab${i}`}
					>
						<Scroller key={'view' + i}>
							<Button id={'topButton' + i}>Tab {i} Top</Button>
							<BodyText>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ante sit amet dui
								cursus tempus ut nec nisl. In scelerisque, nunc in interdum varius, dolor magna
								auctor tellus, quis mattis mauris lectus vel metus. Maecenas tempus quam ac
								dignissim gravida. Integer ut posuere sapien. Duis consequat vitae libero nec
								posuere. Curabitur sagittis mauris vel massa cursus, et mollis est malesuada.
								Vestibulum ante libero, gravida id purus eget, varius porttitor ipsum. Suspendisse
								quis consequat sem, eget gravida est. Morbi pulvinar diam vel mattis lacinia.
								Integer eget est quis augue tincidunt tincidunt quis at nisi. Duis at massa nunc.
								Cras malesuada, sem quis aliquet vulputate, ante ipsum congue ante, eu volutpat
								ipsum sem posuere ante. Suspendisse potenti. Nullam in lacinia mi.
							</BodyText>
							<BodyText>
								Donec ac ultricies nunc, quis pharetra orci. Mauris semper blandit sodales. Morbi eu
								mollis eros. Fusce id lacinia massa. Nam vitae eleifend arcu. Ut ex leo, semper at
								lectus ullamcorper, congue dignissim nunc. Etiam volutpat est mauris. Nullam ut
								tellus vehicula, tempus urna ac, gravida urna. Nunc diam lorem, dictum consectetur
								libero vitae, aliquet tristique nibh. Maecenas tellus nibh, convallis et consectetur
								at, semper ac lacus. Quisque efficitur id risus eget fringilla. Vestibulum ac nibh
								viverra, efficitur tortor vitae, auctor eros. Nulla sit amet sagittis libero, a
								rhoncus nulla. Phasellus vitae tellus ut enim porttitor congue. Vestibulum ante
								ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
							</BodyText>
							<BodyText>
								Vivamus at augue eget justo finibus commodo ut a urna. Pellentesque eu tempus
								libero, a tristique risus. Sed vel posuere elit. Nulla faucibus nisl turpis, id
								ultricies massa rutrum sit amet. Suspendisse aliquet suscipit convallis. Quisque
								convallis, ipsum nec feugiat vulputate, mi dolor posuere nisi, vel iaculis urna
								lacus sit amet massa. Ut a velit urna. Morbi id massa dui. Class aptent taciti
								sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer
								pharetra eros eget turpis maximus, in fermentum nisl bibendum. Phasellus mattis urna
								et libero malesuada, sed rutrum dolor dignissim.
							</BodyText>
							<BodyText>
								Sed vel nunc lobortis lectus tincidunt viverra. Nullam lobortis eros vel congue
								pellentesque. Donec faucibus felis non neque volutpat dapibus. Nam id mi vel ligula
								maximus imperdiet at eget sapien. Duis in eros lobortis, maximus risus commodo,
								dignissim erat. Suspendisse semper magna leo, eget tincidunt est laoreet non.
								Phasellus nec posuere ipsum, at egestas urna. Fusce pellentesque finibus magna, eget
								hendrerit enim aliquam condimentum.
							</BodyText>
							<BodyText>
								Donec at dolor eget ante faucibus gravida a eget erat. In vehicula nibh eu venenatis
								ullamcorper. Nulla nisl justo, tempus vitae felis et, molestie posuere augue. Morbi
								pellentesque lacinia lacus quis bibendum. Integer nec nisi id mauris gravida
								scelerisque eu eu nibh. Sed accumsan ut ligula at aliquam. Quisque odio ex, viverra
								sit amet lectus scelerisque, sollicitudin ornare ante. Vestibulum arcu augue,
								vehicula vel pellentesque sed, aliquam ut nunc.
							</BodyText>
							<Button>Tab {i} Bottom</Button>
						</Scroller>
					</TabLayout.Tab>
				))}
			</TabLayout>
		</Panel>
	</div>;
};

export default ThemeDecorator(App);
