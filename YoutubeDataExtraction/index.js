var YouTube = require('youtube-node')

module.exports = function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.')
  var category = 'comedy' // this is our default

  // Search YouTube for the category we're looking for
  if (req.query.name || (req.body && req.body.name)) {
    category = (req.query.name || req.body.name)
  }

  // Setup YouTube connection
  var youtube = new YouTube()
  youtube.setKey('AIzaSyBO16-NgI5Lx8gPytGvsa2Hqb7rNftArCA')

  // Get video data from API
  youtube.search(category, 50, {part: 'snippet, contentDetails, statistics'}, function (error, result) {
    if (error) {
      context.log(error)
      context.done()
    } else {
      context.log(JSON.stringify(result, null, 2))
      context.done()
    }
  })
}
