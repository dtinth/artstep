
Artstep
=======

When creating step definitions for [cucumber-js](https://github.com/cucumber/cucumber-js), I always feel like this:

![Y U NO...](http://i0.kym-cdn.com/photos/images/newsfeed/000/089/665/tumblr_l96b01l36p1qdhmifo1_500.jpg)

It simply sucks. As of v0.12:

- If you forget to call the `callback` function, the event queue is drained and Cucumber simply exits without reporting anything.
- No support for promises or generators.
- Having to use `this.` every time to define a single step.
- Regular expressions are ugly.

So I created some wrapper functions for them and then turn it into a library.

Please look at `steps.js` for example.

__TODO:__ Add more real world example


