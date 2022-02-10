import kind from '@enact/core/kind';
import Drawing from '@enact/ui/Drawing-POC';
import Slider from '../Slider';
import css from './Drawing-POC.module.less';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Panels, Panel, Header } from '../Panels';
import Layout, { Cell, Column, Row } from '@enact/ui/Layout';
import SwitchItem from '../SwitchItem';
import Toggleable from '@enact/ui/Toggleable';
import BodyText from '@enact/ui/BodyText';
import Heading from '@enact/ui/Heading';
import Switch from '../Switch';
import Button from '@enact/ui/Button';

const DrawingBase = kind({
    name: 'Drawing',

    functional: true,

    propTypes: {
        // brushColor: PropTypes.string,
        // brushSize: PropTypes.number,
        // canvasColor: PropTypes.string,
        disabled: PropTypes.bool,
        isErasing: PropTypes.bool,
    },

    defaultProps: {
        // brushSize: 5,
        // brushColor: 'green',
        // canvasColor: '#fff',
        isErasing: false,
    },

    render: ({ isErasing, onSetErasing }) => {
        const [brushSize, setBrushSize] = useState(5);
        const [brushColor, setBrushColor] = useState('green');
        const [canvasColor, setcanvasColor] = useState('#fff');
        return (
            <Column>
                <Row>
                    <Cell>
                        <Heading size='tiny'>
                            <Slider
                                backgroundProgress={0}
                                max={30}
                                min={0}
                                onChange={(e) => {
                                    setBrushSize(e.value);
                                }}
                                step={1}
                                tooltip={false}
                                defaultValue={brushSize}
                            />
                        </Heading>
                    </Cell>
                    <Cell>
                        <Heading size="tiny">
                            Brush color{' '}
                            <input
                                type="color"
                                onChange={(e) => {
                                    setBrushColor(e.target.value);
                                }}
                            />
                        </Heading>
                    </Cell>
                    <Cell>
                        <Heading size="tiny">
                            Canvas color{' '}
                            <input
                                type="color"
                                onChange={(e) => {
                                    setcanvasColor(e.target.value);
                                }}
                            />
                        </Heading>
                    </Cell>
                    <Cell>
                        <Heading size="tiny">
                            Erase
                            <Switch onClick={onSetErasing} />
                        </Heading>
                    </Cell>
                    <Cell>
                        <Heading size="tiny">
                            <Button size='tiny'>Clear all</Button>
                        </Heading>
                    </Cell>
                </Row>
                <Row>
                    <Drawing
                        brushSize={brushSize}
                        brushColor={brushColor}
                        canvasColor={canvasColor}
                        isErasing={isErasing}
                    />
                </Row>
            </Column>
        );
    },
});

export default Toggleable(
    { prop: 'isErasing', toggle: 'onSetErasing' },
    DrawingBase
);
