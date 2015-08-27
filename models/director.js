var nohm = require('nohm').Nohm;
var md5  = require('MD5');

module.exports = nohm.model('Director', {

  properties: {
    full_name: {
      type: 'string',
      validations: [
        'notEmpty'
      ]
    },
    dob: {
      type: 'string',
      validations: [
        'notEmpty'
      ]
    },
    favorite_camera: {
      type: 'string',
      defaultValue: 'RED'
    },
    favorite_movies: {
      type: 'json',
      defaultValue: ["Terminator", "Kingsmen"]
    },
    livestream_id: {
      type: 'string',
      unique: true
    }
  },

  methods: {
    validToken: function(token) {
      return md5(this.allProperties().full_name) === token;
    }
  }

});
