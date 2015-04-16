"use strict"

const steps     = require('../')
const expect    = require('chai').expect
const webdriver = require('selenium-webdriver')
const By        = webdriver.By

let driver = new webdriver.Builder().forBrowser('firefox').build()

module.exports = steps()
.when('I visit my website', function*() {
  yield driver.get('http://dt.in.th')
})
.then('I see (\\d+) links below the heading', function*(n) {
  let array = yield driver.findElements(By.css('h1 + ul a'))
  expect(array).to.have.length(+n)
})
.then('I see a link to "..."', function*(text) {
  yield driver.findElement(By.css('a[href="' + text + '"]'))
})
.afterAll(function*() {
  yield driver.quit()
})
