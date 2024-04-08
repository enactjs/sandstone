/**
 * Provides a Sandstone styled pages component with page indicator and navigation buttons.
 *
 * Usage:
 * ```
 * <PageViews>
 *		<PageViews.Page aria-label="This is a description for page">
 *			lorem ipsum ...
 *		</PageViews.Page>
 * </PageViews>
 * ```
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
