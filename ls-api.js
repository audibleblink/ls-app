var request = require('request')
var apiUrl = 'https://api.new.livestream.com/accounts/'

module.exports = {
  get: function(accountId, cb){
    request(apiUrl + accountId, function(err, res, body){
      if (!err && res.statusCode == 200) {
        cb(JSON.parse(body))
      } else {
        console.log(res, err)
      }
    })
  }
}
