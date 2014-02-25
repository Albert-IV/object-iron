object-iron
===========

Flattens deeply nested object into a single level object with optional filtering.

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
          { "objects" : "work here too" }
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
    //   'info.tags[2].objects': 'work here too' }

# Filtering

This library also accepts an optional array of types to filter on.  Accepts all types from typeof, as well as `"array"`  [Check the MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#Description) for the full list.

Be careful with array filtering, as this could remove more than just array values (arrays of nested objects, for example).
