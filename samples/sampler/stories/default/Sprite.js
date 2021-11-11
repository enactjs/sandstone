import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, range, select} from '@enact/storybook-utils/addons/controls';
import Sprite from '@enact/sandstone/Sprite';

Sprite.displayName = 'Sprite';
const Config = mergeComponentMetadata('Sprite', Sprite);

// import icons
import spriteGear2k from '../../images/sprite-gear-2k.png';
import spriteGear4k from '../../images/sprite-gear-4k.png';

const prop = {
	orientation: ['horizontal', 'vertical'],
	iterations: [1, 2, 3, 10, Infinity]
};

export default {
	title: 'Sandstone/Sprite',
	component: 'Sprite'
};

export const _Sprite = (args) => (
	<Sprite
		src={{
			fhd: spriteGear2k,
			uhd: spriteGear4k
		}}
		columns={6}
		rows={5}
		height={120}
		width={120}
		orientation="horizontal"
		stopped={args['stopped']}
		duration={args['duration']}
		iterations={Number(args['iterations'])}
		onSpriteAnimation={action('onSpriteAnimation')}

		// These are design-time props, which don't make sense to be modified
		// at runtime, but would be useful to someone trying to learn what the
		// options are and how the props affect the component.More customizability
		// (at a future time) could open them up to make them useful for this sample.
		//
		// columns={number('columns', DesignTimeConfig, {range: true, min: 5, max: 10}, 6)}
		// rows={number('rows', DesignTimeConfig, {range: true, min: 3, max: 7}, 5)}
		// height={number('height', DesignTimeConfig, {min: 30, max: 300}, 120)}
		// width={number('height', DesignTimeConfig, {min: 30, max: 300}, 120)}
		// offsetTop={number('offsetTop', DesignTimeConfig, {min: 0, max: 300}, 0)}
		// offsetLeft={number('offsetLeft', DesignTimeConfig, {min: 0, max: 300}, 0)}
		// orientation={select('orientation', prop.orientation, DesignTimeConfig)}
	/>
);

boolean('stopped', _Sprite, Config);
range('duration', _Sprite, Config, {min: 500, max: 10000, step: 250}, 1000);
select('iterations', _Sprite, prop.iterations, Config);

_Sprite.storyName = 'Sprite';
_Sprite.parameters = {
	info: {
		text: 'Basic usage of Sprite'
	}
};
