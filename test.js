var assert = require('assert');
var should = require('should');
var RefResolver = require('../TESTSRC');


describe('refResolver', function() {

    it("should resolve reference in the object", function() {
        var testData = {
            data: [
                {
                config: {
                    option: {
                    description: "red color",
                    name: "Red",
                    type: "COLOR"
                    },
                },
                id: "5719b01ed966d76a183a79e4",
                state: "OPEN"
                },
                {
                config: {
                    "$ref": "$.data[0].config.option"
                },
                id: "5719b01ed966d76a183a79e5",
                state: "CLOSE"
                }
            ]
        };
        var result = new RefResolver.Resolver(testData).resolve();
        assert.equal('Red', result.data[1].config.name);
    });

    it("should resolve reference in the array", function() {
        var testData = [
            {
            config: {
                option: {
                description: "red color",
                name: "Red",
                type: "COLOR"
                },
            },
            id: "5719b01ed966d76a183a79e4",
            state: "OPEN"
            },
            {
            config: {
                "$ref": "$[0].config.option"
            },
            id: "5719b01ed966d76a183a79e5",
            state: "CLOSE"
            }
        ];
        var result = new RefResolver.Resolver(testData).resolve();
        assert.equal('Red', result[1].config.name);
    })
 });

 