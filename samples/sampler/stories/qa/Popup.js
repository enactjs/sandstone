import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import {action} from '@enact/storybook-utils/addons/actions';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import Alert from '@enact/sandstone/Alert';
import Button from '@enact/sandstone/Button';
import Popup from '@enact/sandstone/Popup';
import Toggleable from '@enact/ui/Toggleable';

Popup.displayName = 'Popup';

const Container = SpotlightContainerDecorator('div');

const PopupFromSelfOnlyContainer = Toggleable(
	{prop: 'open', toggle: 'onToggle'},
	({onToggle, open}) => (
		<div>
			<Container spotlightId="selfOnlyContainer" spotlightRestrict="self-only">
				<Button onClick={onToggle}>button</Button>
			</Container>
			<Alert open={open}>
				<span>popup</span>
				<buttons>
					<Button onClick={onToggle}>button</Button>
				</buttons>
			</Alert>
		</div>
	)
);

export default {
	title: 'Sandstone/Popup',
	component: 'Popup'
};

export const UsingSpotlightRestrict = (args) => (
	<div>
		<p>
			The contents of the popup below should contain the only controls that can be navigated to
			using 5-way. This is because the popup is using a `spotlightRestrict` value of `self-only`. If
			the value changes to `self-first`, the other panel controls can receive focus, but priority
			will be given to controls within the popup first.
		</p>
		<Button>Button</Button>
		<Popup
			open={args['open']}
			noAnimation={args['noAnimation']}
			noAutoDismiss={args['noAutoDismiss']}
			onClose={action('onClose')}
			position={args['position']}
			scrimType={args['scrimType']}
			spotlightRestrict={args['spotlightRestrict']}
		>
			<div>{args['children']}</div>
			<br />
			<Container>
				<Button>Button</Button>
				<Button>Button</Button>
				<Button>Button</Button>
			</Container>
		</Popup>
	</div>
);

boolean('open', UsingSpotlightRestrict, Popup, true);
boolean('noAnimation', UsingSpotlightRestrict, Popup, false);
boolean('noAutoDismiss', UsingSpotlightRestrict, Popup, false);
select('position', UsingSpotlightRestrict, ['bottom', 'center', 'fullscreen', 'left', 'right', 'top'], Popup, 'bottom');
select('scrimType', UsingSpotlightRestrict, ['none', 'translucent', 'transparent'], Popup, 'translucent');
select('spotlightRestrict', UsingSpotlightRestrict, ['self-first', 'self-only'], Popup, 'self-only');
text('children', UsingSpotlightRestrict, Popup, 'Hello Popup');

UsingSpotlightRestrict.storyName = 'using spotlightRestrict';

export const FromSelfOnlyContainer = () => <PopupFromSelfOnlyContainer />;

FromSelfOnlyContainer.storyName = 'from self-only container';
FromSelfOnlyContainer.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

const PopupWithBackgroundBlurEffect = Toggleable(
	{prop: 'open', toggle: 'onToggle'},
	({onToggle, open}) => (
		<div style={{backgroundImage: 'url("http://picsum.photos/1280/720?image=1044")', height: '100%'}}>
			<Button onClick={onToggle}>open</Button>
			<Popup
				open={open}
				position="bottom"
				scrimType="blur"
				onClose={onToggle}
			>
				<span>popup</span>
			</Popup>
		</div>
	)
);

export const WithBackgroundBlurEffect = () => <PopupWithBackgroundBlurEffect />;

WithBackgroundBlurEffect.storyName = 'with background blur effect';
WithBackgroundBlurEffect.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

const PopupWithBlurEffect = Toggleable(
	{prop: 'open', toggle: 'onToggle'},
	({onToggle, open}) => (
		<div style={{backgroundImage: 'url("http://picsum.photos/1280/720?image=1044")', height: '100%'}}>
			<Button onClick={onToggle}>open</Button>
			<Popup
				open={open}
				position="bottom"
				scrimType="transparent"
				blurType="popup"
				onClose={onToggle}
			>
				<span>popup</span>
			</Popup>
		</div>
	)
);

export const WithBlurEffect = () => <PopupWithBlurEffect />;

WithBlurEffect.storyName = 'with blur effect';
WithBlurEffect.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

const PopupWithGradientBlurEffect = Toggleable(
	{prop: 'open', toggle: 'onToggle'},
	({onToggle, open}) => (
		<div style={{backgroundImage: 'url("http://picsum.photos/1280/720?image=1044")', height: '100%'}}>
			<Button onClick={onToggle}>open</Button>
			<Popup
				open={open}
				position="bottom"
				blurType="gradient"
				scrimType="transparent"
				onClose={onToggle}
			>
				<span>popup</span>
			</Popup>
		</div>
	)
);

export const WithGradientBlurEffect = () => <PopupWithGradientBlurEffect />;

WithGradientBlurEffect.storyName = 'with gradient blur effect';
WithGradientBlurEffect.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};
