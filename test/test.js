var flatten = require('../index.js');
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
var shouldBe = '{\n\
  "name.legal": "Sam Fisher",\n\
  "name.given.first": "Samantha",\n\
  "name.given.last": "Fisherson",\n\
  "info.needless.nesting.check.it": "out",\n\
  "info.tags[0]": "person",\n\
  "info.tags[1]": "tagged",\n\
  "info.tags[2]": "arrays are cool"\n\
}';

if( JSON.stringify(flatObject, null, '  ') !== shouldBe ) {
  console.log(JSON.stringify(flatObject, null, '  '));
  console.log(shouldBe);
  throw Error('Values did not come out as expected!');
} else {
  console.log("Test passed!");
  process.exit(0);
}