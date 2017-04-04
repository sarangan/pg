'use strict';

var utils = {

  server_path : 'http://52.39.72.94:3000/images/',

  generateUid : function() {

      const uuidV4 = require('uuid/v4');
      // Generate a v4 (random) id
      return uuidV4();

  }

}

module.exports = utils;
