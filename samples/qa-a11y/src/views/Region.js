/* eslint-disable react/no-unescaped-entities */

import kind from '@enact/core/kind';
import Button from '@enact/sandstone/Button';
import Region from '@enact/sandstone/Region';
import React from 'react';

import css from './Region.module.less';

import appCss from '../App/App.module.less';

const RegionView = kind({
	name: 'RegionView',

	render: (props) => (
		<div {...props}>
			<h2 className={appCss.headerMarginTop}>Single Level</h2>

			<Region className={css.region} title="With aria-label">
				<p>Focusing Text 1 should read "With aria-label, Text 1, button"</p>
				<Button>Text 1</Button>
			</Region>

			<Region className={css.region} title="With aria-labelledby" aria-labelledby="header1">
				<div id="header1">The Panel</div>
				<p>Focusing Text 2 should read "The Panel, Text 2, button"</p>
				<Button>Text 2</Button>
			</Region>

			<Region className={css.region} title="With aria-labelledby + aria-label" aria-labelledby="header2">
				<div id="header2" aria-label="The Panel">Header (with aria-label="The Panel")</div>
				<p>Focusing Text 3 should read "The Panel, Text 3, button"</p>
				<Button>Text 3</Button>
			</Region>

			<Region title="Switching Focus Within Level">
				<p>Focusing Text 4 should read "Switching Focus Within Level, Text 4, button"</p>
				<Button>Text 4</Button>
				<p>Focusing Text 5 should read "Text 5, button"</p>
				<Button>Text 5</Button>
			</Region>

			<h2 className={appCss.headerMarginTop}>Multi Level</h2>

			<Region className={css.region} title="With aria-label">
				<p>Focusing Text 6 should read "With aria-label, Popup, Text 6, button"</p>
				<div role="dialog" aria-label="Popup">
					<p>Popup with aria-label="Popup"</p>
					<Button>Text 6</Button>
				</div>
			</Region>

			<Region className={css.region} title="With aria-labelledby" aria-labelledby="header3">
				<div id="header3">The Panel</div>
				<p>Focusing Text 7 should read "The Panel, Popup, Text 7, button"</p>
				<div role="dialog" aria-labelledby="dialogtitle1">
					<div id="dialogtitle1">Popup</div>
					<Button>Text 7</Button>
				</div>
			</Region>

			<Region className={css.region} title="With aria-labelledby + aria-label" aria-labelledby="header4">
				<div id="header4" aria-label="The Panel">Header</div>
				<p>Focusing Text 8 should read "The Panel, Popup, Text 8, button"</p>
				<div role="dialog" aria-label="Popup">
					<p>Popup with aria-label="Popup"</p>
					<Button>Text 8</Button>
				</div>
			</Region>

			<Region className={css.region} title="Moving down a Level">
				<p>Focusing Text 9 should read "Moving down a Level, Text 9, button"</p>
				<Button>Text 9</Button>
				<p>Focusing Text 10 should read "Popup, Text 10, button"</p>
				<div role="dialog" aria-label="Popup">
					<p>Popup with aria-label="Popup"</p>
					<Button>Text 10</Button>
				</div>
			</Region>

			<Region title="Moving up a Level">
				<p>Focusing Text 11 should read "Moving up a Level, Popup, Text 11, button"</p>
				<div role="dialog" aria-label="Popup">
					<p>Popup with aria-label="Popup"</p>
					<Button>Text 11</Button>
				</div>
				<p>Focusing Text 12 should read "Moving up a Level, Text 12, button"</p>
				<Button>Text 12</Button>
			</Region>

			<h2 className={appCss.headerMarginTop}>Region within a region</h2>

			<Region className={css.region} title="Outside region">
				<Region title="Inside region">
					<p>Focusing Text 13 should read "Outside region, Inside region, Text 13, button"</p>
					<Button>Text 13</Button>
				</Region>
			</Region>

			<Region className={css.region} title="Outside region">
				<p>Focusing Text 14 should read "Outside region, Text 14, button"</p>
				<Button>Text 14</Button>
				<Region title="Inside region">
					<p>Focusing Text 15 should read "Inside region, Text 15, button"</p>
					<Button>Text 15</Button>
				</Region>
			</Region>
		</div>
	)
});

export default RegionView;
