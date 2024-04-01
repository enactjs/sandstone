/**
 * Provides a Sandstone styled pages component with page indicator and navigation buttons.
 *
 * @module sandstone/PageViews
 * @exports PageViews
 */

import {PageViews} from './PageViews';
import Page from './Page';

/**
 * A shortcut to access {@link sandstone/PageViews.Page}
 *
 * @name Page
 * @static
 * @memberof sandstone/PageViews.PageViews
 */
PageViews.Page = Page;

export default PageViews;
export {
	Page,
	PageViews
};
