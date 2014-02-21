module.exports = (originalObj) ->
    flattenedObj = {}

    # This takes advantage of JS's passing object by reference
    iterate(originalObj, flattenedObj);

    return flattenedObj

iterate = (obj, flat, path="") ->
    for key, val of obj
        if obj.hasOwnProperty(key)
            keyPath = path + key
            checkType(key, val, flat, keyPath)

arrIterate = (arr, flat, path) ->
    for val, idx in arr
        arPath = path + '[' + idx + ']'
        checkType(val, arr[idx], flat, arPath)


checkType = (key, val, obj, path) ->
    type = typeof val

    # Throw error if unsupported values are passed
    if type is "function" or type is "xml"
        throw new Error("Unsupported type passed!")

    # If is normal value, just assign it to the flattened object
    if type is "boolean" or type is "string" or type is "number"
        objKey = path or key
        obj[objKey] = val
        return

    # else is an object.  We do this to not worry about 'undefined' or similar non-values.
    if type is 'object'
        # If Array
        if Array.isArray(val)
            arrIterate val, obj, path
            return

        # Else really is an object, so run it through iterate again.
        else
            objPath = path + '.'
            return iterate( val, obj, objPath)