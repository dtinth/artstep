
var steps = require('../')
var webdriver = require('selenium-webdriver')
var By = webdriver.By

var chai = require('chai')
var expect = chai.expect
chai.use(require('chai-as-promised'))

var driver = new webdriver.Builder().forBrowser('firefox').build()

module.exports = steps()
.when('I visit my website', function() {
  return driver.get('http://dt.in.th')
})
.then('I see (\\d+) links below the heading', function(n) {
  return expect(driver.findElements(By.css('h1 + ul a')))
               .to.eventually.have.length(+n)
})
.then('I see a link to "..."', function(text) {
  return driver.findElement(By.css('a[href="' + text + '"]'))
})
.afterAll(function() {
  return driver.quit()
})
