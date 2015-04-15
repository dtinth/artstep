
var steps = require('./')

module.exports = steps()
.given('Artstep is installed', function() {
  /* It is! And look, no callback! */
})
.when('I use it', function() {
  return new Promise(function(resolve, reject) {
    /* I am busy using it... */
    setTimeout(resolve, 300)
  })
})
.when('the function is not given')
.when('the function returns PENDING', function() {
  return this.PENDING
})
.then('I am "..."', function(x) {
  setTimeout(function() {
    console.log('\033[1;46;22;30m I\'M SO ' + x.toUpperCase() + '! \033[m')
  }, 100)
})
.before(function() {
  console.log('before')
})
.after(function() {
  console.log('after')
})
.around(function(run) {
  var start = Date.now()
  return run().then(function() {
    var finish = Date.now()
    console.log('takes', finish - start, 'ms')
  })
})

