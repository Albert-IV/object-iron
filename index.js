module.exports = function(originalObj) {
  var flattenedObj = {};

  // This takes advantage of JS's passing objects by reference
  iterate(originalObj, flattenedObj, '');

  return flattenedObj;
};

function iterate(obj, flat, path) {
  for( var key in obj ) {
    if (obj.hasOwnProperty(key)) {
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
  if (type === "function" || type === "xml") {
    throw new Error("Unsupported type passed!");
  }

  // If normal Key-Value, assign to flattened object
  if (type === "boolean" || type === "string" || type === "number") {
    var objKey = path || key;
    obj[objKey] = val;
    return;
  }

  // Otherwise if an object
  if (type === 'object') {

    // If value is an array, iterate again
    if (Array.isArray(val)) {
      arrIterate(val, obj, path);
    
    // Otherwise is an object, and iterates
    } else {
      var objPath = path + '.';
      return iterate(val, obj, objPath);
    }
  }

  // If value is an 'undefined' or otherwise falsy value,
  // don't add it to the flattened object
}