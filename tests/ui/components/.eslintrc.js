module.exports = {
	"extends": ["enact/strict"],
	"root": true,
	// Disabling these because test app!
	"rules": {
		"react/jsx-no-bind": 0,
		"react/no-access-state-in-setstate": 0,
		"enact/display-name": 0,
		"enact/prop-types": 0
	}
};
