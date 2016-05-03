'use strict';

function isObject(v) {
  return null != v && typeof v == 'object';
}

function RefResolver(o) {
    if (!isObject(o)) {
        throw "Only object or array can be resolved";
    }
    this.root = o;
}

RefResolver.prototype.resolve = function() {
    var root = this.root;
    function process(o, context, key) {
        // console.log(o);
        // console.log(context);
        // console.log(key);
        // console.log("---");
        for (var p in o) {
            if (o.hasOwnProperty(p)) {
                var v = o[p];
                if (isObject(v)) {
                    process(v, o, p);
                } else {
                    if ('$ref' == p) {
                        v = "root".concat(v.substring(1));
                        var v2 = eval(v);
                        context[key] = v2;
                    }
                }
            }
        }
    }
    try {
        process(root);
    } catch (e) {
        console.error(e);
    }
    return root;
}

module.exports = {
  Resolver: RefResolver
};