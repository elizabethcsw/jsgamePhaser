// https://github.com/nightwatchjs/nightwatch-docs/blob/master/guide/using-nightwatch/write-tests.md
// module.exports = {
//   'Demo test Google' : function (client) {
//     client
//       .url('http://www.google.com')
//       .waitForElementVisible('body', 1000)
//       .assert.title('Google')
//       .assert.visible('input[type=text]')
//       .setValue('input[type=text]', 'rembrandt van rijn')
//       .waitForElementVisible('button[name=btnG]', 1000)
//       .click('button[name=btnG]')
//       .pause(1000)
//       .assert.containsText('ol#rso li:first-child',
//         'Rembrandt - Wikipedia')
//       .end()
//   }
// }
//
// module.exports = {
//   'Demo test Google' : function (client) {
//     client
//       .url('http://google.no')
//       .pause(1000);
// // expect element <body> to be present in 1000ms
// client.expect.element('body').to.be.present.before(1000);
//
// // expect element <#lst-ib> to have css property 'display'
// client.expect.element('#lst-ib').to.have.css('display');
//
// // expect element <body> to have attribute 'class' which contains text 'vasq'
// client.expect.element('body').to.have.attribute('class').which.contains('vasq');
//
// // expect element <#lst-ib> to be an input tag
// client.expect.element('#lst-ib').to.be.an('input');
//
// // expect element <#lst-ib> to be visible
// client.expect.element('#lst-ib').to.be.visible;
//
// client.end();
//
// }
// };

// Setup instructions
// npm init
// npm install -g nightwatch
// npm install phase-2-e --save-dev
// npm install chromedriver
// npm install selenium-standalone@latest -g
// OR
// download latest selenium-server-standalone-{VERSION}.jar file from http://selenium-release.storage.googleapis.com/index.html and save to ./bin
// setup .js file in page-objects dir

// In nightwatch.json:
// update paths for commands, assertions, page_objects, server_path and "webdriver.chrome.driver"
// update selenium "start_process" : true
  // if "start_process" : true , run "nightwatch" in one bash terminal to run the test
  // if "start_process" : false, run "selenium-standalone start" and "nightwatch" in two separate bash terminals to run the test

// update the test_settings, default, desiredCapabilities to the following:
  // "desiredCapabilities": {
  //   "browserName": "chrome",
  //   "javascriptEnabled": true,
  //   "acceptSslCerts": true,
  //   "handlesAlerts": true,
  //   "unexpectedAlertBehaviour": "accept"
  // }

// To run the test, run "nightwatch" in one bash or "selenium-standalone start" and "nightwatch" in two separate bash terminals

// useful links
// https://github.com/nightwatchjs/nightwatch-docs/tree/master/guide/using-nightwatch
// https://github.com/nightwatchjs/nightwatch-docs/tree/master/api/method
// https://github.com/hayesmaker/phase-2-e
// https://www.npmjs.com/package/phase-2-e
// http://nightwatchjs.org/gettingstarted/#selenium-settings
// http://nightwatchjs.org/guide
// http://nightwatchjs.org/api#click
// http://nightwatchjs.org/api/#keys
//*** https://www.w3.org/TR/webdriver/#keyboard-actions
// .sendKeys('t',client.Keys.ENTER) <not working
// .keys("\uE00D", function(done) {}) <working to hit the space bar
// https://stackoverflow.com/questions/34665151/how-to-send-keypress-in-nightwatch
