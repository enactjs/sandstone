// Moonstone Base App styles
//

// Core Rules
@import "~@enact/ui/styles/core.less";
@import "~@enact/ui/styles/mixins.less";

// Moonstone Internal Rules
@import "../styles/internal/fonts.less";

// Moonstone Rules
@import "../styles/mixins.less";
@import "../styles/skin.less";
@import "../styles/variables.less";

.applySkins({
	color: @sand-text-color;

	::selection {
		color: @sand-spotlight-text-color;
		background-color: lighten(@sand-spotlight-bg-color, 18%);
	}

	// Spotlight
	// This rule-set applies a generic spottable set of colors to anything with the spottable class
	// that is a child of a skin. It's a blanket rule for components that don't technically need to
	// be skinnable themselves, but still need to be focusable and inherit rules from their parent.
	// The rule below this, should look identical, with the exception of the absence of the `parent`
	// argument to the focus mixin. This allows that set of rules to prevail over this generic set.
	//// Inherited Spottable rules (for components that aren't directly skinned)
	.focus({
		background-color: @sand-spotlight-bg-color;
		color: @sand-spotlight-text-color;
	}, parent);
	//// Primary spottable rules (for any component with a skin applied to itself)
	.focus({
		background-color: @sand-spotlight-bg-color;
		color: @sand-spotlight-text-color;
	});

	// Spotlight Muted Components
	.muted({
		.focus({
			background-color: transparent;
			color: @sand-text-color;
		}, parent);
	}, parent);

	// Disabled Components
	.disabled({
		.vendor-opacity(@sand-disabled-opacity);

		// Focused and disabled, must restore their natural opacity, then assign the faded text/content color
		.focus({
			.vendor-opacity(1);
			color: @sand-spotlight-disabled-text-color;
		});

		cursor: default;

		// Disabled children of disabled components
		.disabled({
			.vendor-opacity(1);
		}, parent);
	});
});

.root {
	.moon-text-base(@sand-header-title-below-font-size, self);
	font-weight: normal;
	font-style: normal;
	letter-spacing: normal;

	&.bg,
	& > .bg {
		padding: @sand-app-keepout;
	}

	&:global(.enact-locale-right-to-left) {
		direction: rtl;
	}

	:focus {
		// Prevent Chrome's default focus treatment
		outline: none;
		// Prevent Android Chrome from highlighting tapped elements
		-webkit-tap-highlight-color: transparent;
	}

	// Skin colors
	.applySkins({
		&.bg,
		> .bg {
			background-color: @sand-bg-color;
		}
	});
}
