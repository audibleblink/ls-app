var nohm  = require('nohm').Nohm;

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
  }

})
