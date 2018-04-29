var seleniumRunner = require('selenium-runner');

let  baseUrl = process.env.REACT_APP_GRAPHQL_URL || 'localhost:400'
baseUrl = `http://${baseUrl}`;
// tests to run
var tests = [{
  url: baseUrl,
  exec: require('./check-title.js')
}, {
  url: baseUrl,
  exec: require('./check-title.js')
}];

var config = require('./config.json');

// launch tests
seleniumRunner(config, tests, testCallback, endCallback);

// For each browser, you get the result of calling your test (check-title) here
// You always get the context: {url: 'http://', browser: {browserName: '', version: }}
function testCallback(err, context) {
  console.log('A test finished', arguments);
}

// Called when all tests have finished/or an error popped while connecting to the grid
// It will not get called when an error is emitted from a test
function endCallback(err) {
  console.log('All tests ended', arguments);
}
