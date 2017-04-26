// var YouTube = require('youtube-node')
var request = require('request')
var queryString = require('querystring')
var url = 'https://www.googleapis.com/youtube/v3/search?'

var makeRequest = function (url, callback) {
  request(url, function (error, response, body) {
    if (error) {
      callback(error)
    } else {
      var data = {}
      try {
        data = JSON.parse(body)
      } catch (e) {
        data = {}
      }

      if (response.statusCode == 200) {
        callback(null, data)
      } else {
        callback(data.error)
      }
    }
  })
}

module.exports = function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.')
  var category = 'comedy' // this is our default

  // Search YouTube for the category we're looking for
  if (req.query.name || (req.body && req.body.name)) {
    category = (req.query.name || req.body.name)
  }

  // Set up query parameters
  var params = {
    key: 'AIzaSyBO16-NgI5Lx8gPytGvsa2Hqb7rNftArCA',
    path: 'snippet,statistics,contentDetails',
    q: category,
    maxResults: 20
  }
  var reqUrl = url + queryString.stringify(params)

  makeRequest(reqUrl, function (error, result) {
    if (error) {
      context.log(error)
      context.done()
    } else {
      context.log(JSON.stringify(result, null, 2))
      context.done()
    }
  })

  // // Setup YouTube connection
  // var youtube = new YouTube()
  // youtube.setKey('AIzaSyBO16-NgI5Lx8gPytGvsa2Hqb7rNftArCA')

  // // Get video data from API
  // youtube.search(category, 50, function (error, result) {
  //   if (error) {
  //     context.log(error)
  //     context.done()
  //   } else {
  //     context.log(JSON.stringify(result, null, 2))
  //     context.done()
  //   }
  // })
}
