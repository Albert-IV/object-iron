var _filters;

module.exports = function(originalObj, filters) {
  var flattenedObj = {};
  _filters = filters || [];

  console.log(originalObj);

  // This takes advantage of JS's passing objects by reference
  iterate(originalObj, flattenedObj, '');

  return flattenedObj;
};

function iterate(obj, flat, path) {
  for( var key in obj ) {
    var hasProp = Object.hasOwnProperty.call(obj, key);

    if (hasProp) {
      var val = obj[key],
          keyPath = path + key;

      checkType(key, val, flat, keyPath);
    }
  }
}

function arrIterate(arr, flat, path) {
  for (var idx = 0, len = arr.length; idx < len; ++idx) {
    var arPath = path + '[' + idx + ']';
    checkType( arr[idx], arr[idx], flat, arPath);
  }
}

function checkType(key, val, obj, path) {
  var type = typeof val;

  // Throw error if unsupported values are passed
  // Really, just throwing an error because idk how JS XML works.
  if (type === "xml") {
    throw new Error("Unsupported type passed!");
  }

  // If normal Key-Value and not filtered, assign to flattened object
  if( (type === "boolean" || type === "string" || type === "number" || type === "function") &&
      _filters.indexOf(type) === -1 ) {
    var objKey = path || key;
    obj[objKey] = val;
    return;
  }

  // Otherwise is object-like

  if (type == "object") {

    // If value is an array and not filtered, iterate again
    if (Array.isArray(val) && _filters.indexOf("array") === -1) {
      return arrIterate(val, obj, path);
    }

    // Otherwise is an object, so iterate
    // Check is to ensure filtered arrays don't get included
    if (!Array.isArray(val)) {
      var objPath = path + '.';
      return iterate(val, obj, objPath);
    }
  }

  // If value 'undefined' or filtered,
  // don't add it to the flattened object
}