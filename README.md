
Artstep
=======

Fluent, painless, and beautiful synchronous/asynchronous step definitions for [Cucumber.js](https://github.com/cucumber/cucumber-js).
Supports promises, generators, and async functions, powered by [co](https://www.npmjs.com/package/co).

Oh, and listen to some [nice chill trap and artstep](https://www.youtube.com/watch?v=eKJJqu6P4IQ).


Why?
----

When creating step definitions for [cucumber-js](https://github.com/cucumber/cucumber-js), I always feel like this:

![Y U NO...](http://i0.kym-cdn.com/photos/images/newsfeed/000/089/665/tumblr_l96b01l36p1qdhmifo1_500.jpg)

It simply sucks. As of v0.12:

- If you forget to call the `callback` function, the event queue is drained and Cucumber simply exits without reporting anything.
- No support for promises or generators.
- Having to use `this.` every time to define a single step.
- Regular expressions are ugly.

So I created some wrapper functions for them and then turn it into a library.


API
---

### var steps = require('artstep')

Returns a function that can be exported as a Cucumber steps definitions.

The returned function also has several methods,
which can be used to define steps.
These methods are all _fluent_,
meaning that they all return the same function.


### Synopsis

```js
var steps = require('artstep')
module.exports = steps()
.given(pattern, handler)
.when(pattern, handler)
.then(pattern, handler)
.before(...tags, handler)
.after(...tags, handler)
.beforeAll(handler)
.afterAll(handler)
.around(handler)
```

### Pattern

In addition to being a __RegExp__,
a pattern may be a __String__,
which will then be converted into a RegExp.
The conversion is done according to the following rules:

- `^` is added in front of the pattern.
- `$` is added after the pattern.
- `"..."` is turned into `"([^"]+)"`.


### Handler Function

A handler is:

- A synchronous function. Handler will finish running immediately:

    ```js
    .then('the title contains "..."', function(text) {
      expect(this.subject.title).to.contain(text)
    })
    ```

- A function that returns a Promise:

    ```js
    .when('I select the (\\d+)(?:st|nd|rd|th) song', function(n) {
      return driver.findElements(By.css('ul.music-list > li'))
      .then(function(items) {
        return items[n - 1].click()
      })
    })
    ```

- An ES6 generator function:

    ```js
    .when('I select the (\\d+)(?:st|nd|rd|th) song', function*(n) {
      var items = yield driver.findElements(By.css('ul.music-list > li'))
      yield items[n - 1].click()
    })
    ```

    You can yield promises, generators, thunks, arrays, or objects.
    Then the resolved value will be given back unto you.
    This is possible because of the amazing [co](https://www.npmjs.com/package/co) library.


- An ES7 asynchronous function:

    ```js
    .when('I select the (\\d+)(?:st|nd|rd|th) song', async function(n) {
      var items = await driver.findElements(By.css('ul.music-list > li'))
      await items[n - 1].click()
    })
    ```

- `null`, `false` or `undefined`. In this case, the steps will be marked as "pending."


### Around Hooks

The semantic of __around__ hooks changed a little bit.
It passes a function that, when called, runs the scenario,
and returns a Promise which will be resolved when the scenario
finishes executing.

That promise can be yielded.

- ES5 + Promises:

    ```js
    .around(function(run) {
      return stuffBefore()
      .then(run)
      .then(stuffAfter)
    })
    ```
- ES6 Generators:

    ```js
    .around(function*(run) {
      var start = Date.now()
      yield run()
      var finish = Date.now()
      console.log('It took', finish - start, 'ms')
    })
    ```

- ES7 Async Functions:

    ```js
    .around(async function(run) {
      var start = Date.now()
      await run()
      var finish = Date.now()
      console.log('It took', finish - start, 'ms')
    })
    ```
