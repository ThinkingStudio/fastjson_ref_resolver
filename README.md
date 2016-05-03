# fastjson_ref_resolver
A Javascript library to resolve circular references in JSON exports by FastJson library

## Install

```
npm install fastjson_ref_resolver
```

## Usage

```javascript
var Resolver = require('fastjson_ref_resolver').Resolver;
var data = [
    {
    carConfig: {
        colorOption: {
            description: "red color",
            name: "Red"
        },
    },
    id: "5719b01ed966d76a183a79e4",
    state: "OPEN"
    },
    {
    carConfig: {
        colorOption: {
            "$ref": "$[0].carConfig.colorOption"
        }
    },
    id: "5719b01ed966d76a183a79e5",
    state: "CLOSE"
    }
];

var resolved = new Resolver(data).resolve();
console.log(resolved);
```

The above code will print out

```javascript
[
    {
    carConfig: {
        colorOption: {
            description: "red color",
            name: "Red"
        },
    },
    id: "5719b01ed966d76a183a79e4",
    state: "OPEN"
    },
    {
    carConfig: {
        colorOption: {
            description: "red color",
            name: "Red"
        }
    },
    id: "5719b01ed966d76a183a79e5",
    state: "CLOSE"
    }
];
```
