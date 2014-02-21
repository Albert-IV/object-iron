object-iron
===========

Flattens deeply nested object into a single level object.

    var flatten = require('object-iron');
    var nestedObject = {
      name : {
        legal : "Sam Fisher",
        given : {
          first : "Samantha",
          last : "Fisherson"
        }
      },
      info : {
        needless : {
          nesting : {
            check : {
              it: "out"
            }
          }
        },
        tags : [
          "person",
          "tagged",
          "arrays are cool"
        ]
      }
    };

    var flatObject = flatten(nestedObject);
    console.log(flatObject);

    // { 'name.legal': 'Sam Fisher',
    //   'name.given.first': 'Samantha',
    //   'name.given.last': 'Fisherson',
    //   'info.needless.nesting.check.it': 'out',
    //   'info.tags[0]': 'person',
    //   'info.tags[1]': 'tagged',
    //   'info.tags[2]': 'arrays are cool' }