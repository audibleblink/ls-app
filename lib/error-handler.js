module.exports = {
  handle: handleError,
  throwUnauthorized: unauthorized
}

function sendError(status, msg, info) {
  this.status(status)
  this.json({error: msg, info: info})
}

function handleError(res, err, info) {
  switch (err) {
    case "not found":
      sendError.apply(res, [404, err, info])
      break
    case "invalid":
      sendError.apply(res, [400, err, info])
      break
    default:
      sendError.apply(res, [500, err, info])
  }
}

function unauthorized(res){
  return sendError.apply(res, [401, "Unauthorized"])
}
