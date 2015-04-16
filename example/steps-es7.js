
import steps              from '../'
import { expect }         from 'chai'
import { Builder, By }    from 'selenium-webdriver'

const { when, then, afterAll } = module.exports = steps()
let driver = new Builder().forBrowser('firefox').build()

when('I visit my website', async function() {
  await driver.get('http://dt.in.th')
})

then('I see (\\d+) links below the heading', async function(n) {
  let array = await driver.findElements(By.css('h1 + ul a'))
  expect(array).to.have.length(+n)
})

then('I see a link to "..."', async function(text) {
  await driver.findElement(By.css('a[href="' + text + '"]'))
})

afterAll(async function() {
  await driver.quit()
})
