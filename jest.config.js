
module.exports = {
    'verbose': true,
    'collectCoverage': true,
    'coverageReporters': ['json', 'html'],
    'coverageDirectory': './tests/coverage_report',
    'testEnvironment': 'node',
    'roots': ['./tests'], // Set path to tests to save some scanning time
};
