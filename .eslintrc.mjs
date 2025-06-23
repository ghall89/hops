module.exports = {
	extends: [],
	env: {
		browser: true,
		node: true,
		es2021: true,
	},
	plugins: ['prettier', 'react', 'react-hooks'],
	rules: {},
	settings: {
		react: {
			version: 'detect',
		},
	},
};
