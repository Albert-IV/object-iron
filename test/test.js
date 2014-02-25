var assert = require('assert');
var flatten = require('../index.js');

var nestedObject = {
  name : {
    legal : "Sam Fisher",
    given : {
      first : "Samantha",
      last : "Fisherson"
    },
    isCool : false
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
      { "complex" : {
        "stuff" : [ 1, 2, 3, 4, 5, 6, 7, 8 ]
      } }
    ]
  }
};

// Test default flattening
var fullFlatObject = flatten(nestedObject);
var fullShouldBe = '{\n\
  "name.legal": "Sam Fisher",\n\
  "name.given.first": "Samantha",\n\
  "name.given.last": "Fisherson",\n\
  "name.isCool": false,\n\
  "info.needless.nesting.check.it": "out",\n\
  "info.tags[0]": "person",\n\
  "info.tags[1]": "tagged",\n\
  "info.tags[2].complex.stuff[0]": 1,\n\
  "info.tags[2].complex.stuff[1]": 2,\n\
  "info.tags[2].complex.stuff[2]": 3,\n\
  "info.tags[2].complex.stuff[3]": 4,\n\
  "info.tags[2].complex.stuff[4]": 5,\n\
  "info.tags[2].complex.stuff[5]": 6,\n\
  "info.tags[2].complex.stuff[6]": 7,\n\
  "info.tags[2].complex.stuff[7]": 8\n\
}';

assert.equal( JSON.stringify(fullFlatObject, null, '  '), fullShouldBe, "Non-filtered objects failed!" );

// Test single filtering support
var stringFilteredObject = flatten(nestedObject, ['string']);
var stringFilteredShouldBe = '{\n\
  "name.isCool": false,\n\
  "info.tags[2].complex.stuff[0]": 1,\n\
  "info.tags[2].complex.stuff[1]": 2,\n\
  "info.tags[2].complex.stuff[2]": 3,\n\
  "info.tags[2].complex.stuff[3]": 4,\n\
  "info.tags[2].complex.stuff[4]": 5,\n\
  "info.tags[2].complex.stuff[5]": 6,\n\
  "info.tags[2].complex.stuff[6]": 7,\n\
  "info.tags[2].complex.stuff[7]": 8\n\
}';

assert.equal( JSON.stringify(stringFilteredObject, null, '  '), stringFilteredShouldBe, "String-filtered objects failed!" );

// Test single filtering support
var numFilteredObject = flatten(nestedObject, ['number']);
var numFilteredShouldBe = '{\n\
  "name.legal": "Sam Fisher",\n\
  "name.given.first": "Samantha",\n\
  "name.given.last": "Fisherson",\n\
  "name.isCool": false,\n\
  "info.needless.nesting.check.it": "out",\n\
  "info.tags[0]": "person",\n\
  "info.tags[1]": "tagged"\n\
}';

assert.equal( JSON.stringify(numFilteredObject, null, '  '), numFilteredShouldBe, "Number-filtered objects failed!" );

// Test single filtering support
var boolFilteredObject = flatten(nestedObject, ['boolean']);
var boolFilteredShouldBe = '{\n\
  "name.legal": "Sam Fisher",\n\
  "name.given.first": "Samantha",\n\
  "name.given.last": "Fisherson",\n\
  "info.needless.nesting.check.it": "out",\n\
  "info.tags[0]": "person",\n\
  "info.tags[1]": "tagged",\n\
  "info.tags[2].complex.stuff[0]": 1,\n\
  "info.tags[2].complex.stuff[1]": 2,\n\
  "info.tags[2].complex.stuff[2]": 3,\n\
  "info.tags[2].complex.stuff[3]": 4,\n\
  "info.tags[2].complex.stuff[4]": 5,\n\
  "info.tags[2].complex.stuff[5]": 6,\n\
  "info.tags[2].complex.stuff[6]": 7,\n\
  "info.tags[2].complex.stuff[7]": 8\n\
}';

assert.equal( JSON.stringify(boolFilteredObject, null, '  '), boolFilteredShouldBe, "Boolean-filtered objects failed!" );

// Test single filtering support
var arrFilteredObject = flatten(nestedObject, ['array']);
var arrFilteredShouldBe = '{\n\
  "name.legal": "Sam Fisher",\n\
  "name.given.first": "Samantha",\n\
  "name.given.last": "Fisherson",\n\
  "name.isCool": false,\n\
  "info.needless.nesting.check.it": "out"\n\
}';

assert.equal( JSON.stringify(arrFilteredObject, null, '  '), arrFilteredShouldBe, "Array-filtered objects failed!" );

console.log("Tests Passed!");