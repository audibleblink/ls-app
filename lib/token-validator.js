module.exports = function badHeader(header) {
  var header = header.split(" ");
  return invalidMd5(header) || invalidLength(header) || invalidFormat(header);
};


function invalidMd5(number) {
  return !/[a-f0-9]{32}/.test(number);
}

function invalidLength(header) {
  return header.length !== 2;
}

function invalidFormat(header) {
  return header[0].toLowerCase() !== 'bearer';
}
