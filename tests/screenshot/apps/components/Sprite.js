import Sprite from '../../../../Sprite';

import {withConfig} from './utils';

const SpriteTests = [
    <Sprite stopped/>,

    //RTL
    ...withConfig({locale: 'ar-SA'}, <Sprite stopped />),

    //Tallglyphs
    ...withConfig({locale: 'vi-VN'}, <Sprite stopped />)
];

export default SpriteTests;