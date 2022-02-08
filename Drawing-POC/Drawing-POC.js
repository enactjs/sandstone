import kind from '@enact/core/kind';
import Drawing from '@enact/ui/Drawing-POC';
import Slider from '../Slider';
import css from './Drawing-POC.module.less';
import PropTypes from 'prop-types';
import { useState } from 'react';

const DrawingBase = kind({
    name: 'Drawing',

    functional: true,

    propTypes: {
        brushColor: PropTypes.string,
        brushSize: PropTypes.number,
        canvasColor: PropTypes.string,
        disabled: PropTypes.bool,
    },

    defaultProps: {
        brushSize: 5,
        brushColor: 'green',
        canvasColor: '#fff',
    },

    render: ({ brushColor, brushSize, canvasColor }) => {
        // const [brushSize, setBrushSize] = useState(5);
        console.log(brushSize);
        return (
            <div className={css.app}>
                <h1>Drawing component</h1>
                <div>Brush size: {brushSize}</div>
                <Slider
                    backgroundProgress={0}
                    max={30}
                    min={0}
                    // onChange={(e) => {
                    //     setBrushSize(e.value);
                    //     console.log('fron changeHandler');
                    // }}
                    step={1}
                    tooltip={false}
                    defaultValue={brushSize}
                />
                <Drawing brushSize={brushSize} brushColor={brushColor} canvasColor={canvasColor}/>
            </div>
        );
    },
});

export default DrawingBase;
