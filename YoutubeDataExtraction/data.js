require('dotenv').config()
var azure = require('azure-storage');

var tableSvc = azure.createTableService('azurecredits', process.env.AZURE_STORAGE)

var data = require('./youtubeData')


data.items.forEach(
  v => {

    var like = parseInt(v.statistics.likeCount)
    var dislike = parseInt(v.statistics.dislikeCount)
    var percent = like / (like + dislike) * 100;

    UpdateTable(v, percent)
  }
)

function UpdateTable (video,percent) {
  var entGen = azure.TableUtilities.entityGenerator
  var task = {
    PartitionKey: entGen.String('Video'),
    RowKey: entGen.String(video.id), // must be unique
    Timestamp: entGen.DateTime(new Date(Date.now())),
    Title: entGen.String(video.snippet.title),
    Description: entGen.String(video.snippet.description),
    Rating: entGen.Double(percent),
  }

  tableSvc.insertEntity('HowFunny', task, function (error, result, response) {
    if (!error) {
      console.log('Video Added')
    } else {
      console.log(error)
    }
  })
}