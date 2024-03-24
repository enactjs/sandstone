/**
 * Sandstone styled popover component and behavior.
 *
 * @example
 * <Popover>Hello!</Popover>
 *
 * @module sandstone/Popover
 * @exports Popover
 */

import kind from '@enact/core/kind';
import Layout from '@enact/ui/Layout';
import PropTypes from 'prop-types';

import PopoverBody from './PopoverBody';
import PopoverControl from './PopoverControl';

import componentCss from './Popover.module.less';

const Popover = kind({
    name: 'Popover',

    propTypes: {
        /**
         * The contents to be displayed in the body of the popover.
         *
         * @type {Node}
         * @required
         * @public
         */
        children: PropTypes.node.isRequired,

        /**
         * Customizes the component by mapping the supplied collection of CSS class names to the
         * corresponding internal elements and states of this component.
         *
         * The following classes are supported:
         *
         * * `popover` - The root class name
         * * `top` - Applied when the `position` is 'top'
         * * `right` - Applied when the `position` is 'right'
         * * `bottom` - Applied when the `position` is 'bottom'
         * * `left` - Applied when the `position` is 'left'
         *
         * @type {Object}
         * @private
         */
        css: PropTypes.object,

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
        popoverTargetAction: PropTypes.oneOf(['hide', 'show', 'toggle']),

        /**
         * Position of the Popover on the screen.
         *
         * @type {('bottom'|'center'|'fullscreen'|'left'|'right'|'top')}
         * @default 'center'
         * @public
         */
        position: PropTypes.oneOf(['bottom', 'center', 'fullscreen', 'left', 'right', 'top']),

        /**
         * Scrim type.
         *
         * @type {('transparent'|'translucent')}
         * @default 'translucent'
         * @public
         */
        scrimType: PropTypes.oneOf(['transparent', 'translucent'])
    },

    defaultProps: {
        popover: 'auto',
        popoverTargetAction: 'toggle',
        position: 'center',
        scrimType: 'translucent'
    },

    styles: {
        css: componentCss,
        publicClassNames: ['popover']
    },

    render: ({children, popover, popoverTarget, popoverTargetAction, position, scrimType}) => {
        return (
            <Layout className={componentCss.popoverContainer}>
                <PopoverControl
                    popoverTarget={popoverTarget}
                    popoverTargetAction={popoverTargetAction}
                >
                    Open Popover
                </PopoverControl>
                <PopoverBody
                    id={popoverTarget}
                    popover={popover}
                    position={position}
                    scrimType={scrimType}
                >
                    {children}
                </PopoverBody>
            </Layout>
        );
    }
});

export default Popover;
