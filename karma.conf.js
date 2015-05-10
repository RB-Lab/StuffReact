module.exports = function (config) {
	config.set({
		plugins: [
			'karma-browserify',
			'karma-mocha',
			'karma-chai-as-promised',
			'karma-chai',
			'karma-sinon',
			'karma-phantomjs-launcher',
			'karma-mocha-reporter',
			'karma-coverage'
		],
		frameworks: [
			'browserify',
			'mocha',
			'chai-as-promised',
			'chai',
			'sinon'
		],
		browsers: ['PhantomJS'],
		files: [
			'node_modules/bindpolyfill/index.js', // include this file to run tests in PhantomJS which has no support for function.prototype.bind
			'src/js/**/*.test.js'
		],
		preprocessors: {
			'src/js/**/*.test.js': ['browserify']
		},
		browserify: {
			debug: true,
			transform: ['reactify', 'babelify']
		},
		reporters: [
			'mocha',
			'coverage'
		],
		coverageReporter: {
			dir: 'coverage/',
			reporters: [
				{type: 'html', subdir: 'report-html'},
				{type: 'lcov', subdir: 'report-lcov'}
			]
		}
	});
};
