/**
 * Sandstone styled popover component and behavior.
 *
 * @example
 * <Popover />
 *
 * @module sandstone/Popover
 * @exports Popover
 */

import kind from '@enact/core/kind';
import Layout from '@enact/ui/Layout';
import PropTypes from 'prop-types';

import Button from '../Button';

import componentCss from './Popover.module.less';

const Popover = kind({
    name: 'Popover',

    propTypes: {
        /**
         * A global attribute that turns an element into a popover element.
         *
         * @type {('auto'|'manual')}
         * @default 'auto'
         * @public
         */
        popover: PropTypes.oneOf(['auto', 'manual']),

        /**
         * Turns a <button> or <input> element into a popover control button.
         * Takes the ID of the popover element to control as its value.
         *
         * @type {String}
         * @default null
         * @public
         */
        popoverTarget: PropTypes.string,

        /**
         * Specifies the action to be performed on the popover element.
         *
         * @type {('hide'|'show'|'toggle')}
         * @default 'toggle
         * @public
         */
        popoverTargetAction: PropTypes.oneOf(['hide', 'show', 'toggle'])
    },

    styles: {
        css: componentCss,
        publicClassNames: ['popover']
    },

    render: ({css, popover, popoverTarget, popoverTargetAction}) => {
        return (
            <Layout className={componentCss.popoverContainer}>
                <button
                    className={componentCss.htmlButton}
                    popovertarget={popoverTarget}
                    popovertargetaction={popoverTargetAction}
                >
                    <Button css={css}>Open Popover</Button>
                </button>
                <div className={componentCss.popover} id={popoverTarget} popover={popover}>
                    <p>I am a Popover with more information.</p>
                    <button
                        className={componentCss.htmlButton}
                        popovertarget={popoverTarget}
                        popovertargetaction="hide"
                    >
                        <Button css={css}>Close</Button>
                    </button>
                </div>
            </Layout>
        );
    }
});

export default Popover;
