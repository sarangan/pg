'use strict';

var utils = {

  generateUid : function() {

      const uuidV4 = require('uuid/v4');
      // Generate a v4 (random) id
      return uuidV4();

  }

}

module.exports = utils;
