/**
 * A higher-order component that turns an element into a popover element.
 *
 * @memberof sandstone/Popover
 * @hoc
 * @private
 */

import hoc from '@enact/core/hoc';
import kind from '@enact/core/kind';

import PropTypes from 'prop-types';

import componentCss from './Popover.module.less';

const PopoverBodyDefaultConfig = {
    /**
     * A global attribute that turns an element into a popover element.
     *
     * @public
     */
    popover: 'auto'
};

const PopoverBodyDecorator = hoc(PopoverBodyDefaultConfig, (config, Wrapped) => {
    return kind({
        name: 'PopoverBodyDecorator',

        propTypes: {
            /**
             * The content to be displayed in the body of the popover.
             *
             * @type {Node}
             * @required
             * @public
             */
            children: PropTypes.node.isRequired,

            /**
             * A global attribute that turns an element into a popover element.
             *
             * @type {('auto'|'manual')}
             * @default 'auto'
             * @public
             */
            popover: PropTypes.oneOf(['auto', 'manual'])
        },

        styles: {
            css: componentCss,
            publicClassNames: ['popover']
        },

        computed: {
            className: ({position, styler}) => styler.append(position),
            popoverClassName: ({css, position, scrimType, styler}) => styler.join(css.popover, position, scrimType)
        },

        render: ({children, id, popover, popoverClassName}) => {
            return (
                <Wrapped
                    className={popoverClassName}
                    id={id}
                    popover={popover}
                >
                    {children}
                </Wrapped>
            );
        }
    });
});

const PopoverBody = PopoverBodyDecorator({PopoverBodyDefaultConfig}, 'div');

export default PopoverBody;
export {
    PopoverBodyDecorator
};
