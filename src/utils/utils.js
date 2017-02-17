'use strict';

var utils = {

  generateUid : function(separator) {
      /// <summary>
      ///    Creates a unique id for identification purposes.
      /// </summary>
      /// <param name="separator" type="String" optional="true">
      /// The optional separator for grouping the generated segmants: default "-".
      /// </param>

      var delim = separator || "-";

      /*function S4() {
          return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }

      return (S4() + S4() + delim + S4() + delim + S4() + delim + S4() + delim + S4() + S4() + S4());*/

      // Generate a v4 (random) id
      return uuid.v4();

  };

}

module.exports = utils;
