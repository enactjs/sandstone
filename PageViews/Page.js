/**
 * Page for {@link sandstone/PageViews.PageViews|PageViews}.
 *
 * @class Page
 * @memberof sandstone/PageViews
 * @ui
 * @public
 */
function Page ({
	children
}) {
	return <div style={{height: '100%'}}>{children}</div>;
}

export default Page;
export {
	Page
};
