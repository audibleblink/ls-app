module.exports = {
  handle: handleError,
  throwUnauthorized: unauthorized
}

function sendError(status, msg, info) {
  this.status(status)
  this.json({error: msg, info: info})
}

function handleError(err, info) {
  var codes = {"not found": 404, "invalid": 400}
  var code  = codes[err] || 500
  sendError.apply(this, [code, err, info])
}

function unauthorized(res){
  return sendError.apply(res, [401, "Unauthorized"])
}
