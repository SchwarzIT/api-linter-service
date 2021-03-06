const {oas2, oas3} = require("@stoplight/spectral-formats");
const {length: length$0, pattern, truthy, xor} = require("@stoplight/spectral-functions");
const {oas} = require("@stoplight/spectral-rulesets");
module.exports = {
  "extends": [{
    "extends": [[oas, "recommended"]],
    "rules": {
      "operation-tag-defined": "off",
      "path-must-match-api-standards": {
        "description": "API Path must match company API uri standards",
        "message": "{{description}}; {{property}} incorrect. Example: /digital-twin/api/v1/products",
        "severity": "error",
        "resolved": false,
        "given": "$.paths[?(!@property.match(/well-known/ig))~]",
        "then": {
          "function": pattern,
          "functionOptions": {
            "match": "^\\/([a-z-]+)\\/api\\/(v[1-9])\\/([a-z]+(\\w+s\\b.*))"
          }
        }
      },
      "servers-must-match-api-standards": {
        "description": "Schema and host in URL must match company API standards",
        "message": "{{description}}; {{property}}:{{value}} incorrect. Example: https://live.api.schwarz/digital-twin/api/v1/products",
        "severity": "error",
        "resolved": false,
        "given": "$.servers..url",
        "then": {
          "function": pattern,
          "functionOptions": {
            "match": "^((http[s]?):\\/\\/)([a-z]+)([.+])api.schwarz"
          }
        }
      },
      "info-description": {
        "description": "Every API must have a global description",
        "message": "OpenAPI object info `description` must be present and at least 100 chars long.",
        "severity": "error",
        "given": "$.info",
        "then": [{
          "field": "description",
          "function": truthy
        }, {
          "field": "description",
          "function": length$0,
          "functionOptions": {
            "min": 100
          }
        }]
      },
      "contact-information": {
        "description": "Every API must have a contact containing name, email and a url",
        "message": "{{description}}; property {{property}} is missing",
        "severity": "error",
        "given": "$.info.contact",
        "then": [{
          "field": "name",
          "function": truthy
        }, {
          "field": "email",
          "function": truthy
        }, {
          "field": "url",
          "function": truthy
        }]
      },
      "path-dto-reference": {
        "description": "DTOs should be used to specify the schema(data types) of a request / response",
        "message": "{{description}}; property {{property}} is missing",
        "severity": "error",
        "given": "$.components.schemas",
        "then": [{
          "function": length$0,
          "functionOptions": {
            "min": 1
          }
        }]
      },
      "must-have-path": {
        "description": "Every API must have at least one path",
        "message": "{{description}}; property `paths` is empty",
        "severity": "error",
        "given": "$",
        "then": [{
          "field": "paths",
          "function": length$0,
          "functionOptions": {
            "min": 1
          }
        }]
      },
      "common-responses-unauthorized": {
        "description": "Responses should contain common response - 401 (unauthorized)",
        "message": "{{description}}. Missing {{property}}",
        "severity": "error",
        "given": "$.paths[?(!@property.match(/well-known/ig))]..responses",
        "then": [{
          "field": "401",
          "function": truthy
        }]
      },
      "http-verbs-should-be-used": {
        "description": "HTTP verbs should be used to express different actions or functions on a resource",
        "message": "{{description}}; The HTTP verb {{property}} is missing.",
        "severity": "error",
        "given": "$.paths[?(!@property.match(/well-known/ig))]",
        "then": [{
          "field": "get",
          "function": truthy
        }, {
          "field": "post",
          "function": truthy
        }, {
          "field": "put",
          "function": truthy
        }, {
          "field": "patch",
          "function": truthy
        }, {
          "field": "delete",
          "function": truthy
        }]
      },
      "no-http-verbs-in-resources": {
        "description": "The HTTP Verbs should not be used in the route path to define different actions on a resource",
        "message": "{{description}}; {{property}} Instead use HTTP verbs to define actions on a resource. Example: PUT - /digital-twin/api/v1/products/42",
        "severity": "error",
        "given": "$.paths[?(!@property.match(/well-known/ig))]~",
        "then": {
          "function": pattern,
          "functionOptions": {
            "notMatch": "\\/(get|post|put|patch|delete)(\\/|$)"
          }
        }
      },
      "path-description-is-mandatory": {
        "description": "Every route of an API should have a description",
        "message": "{{description}}; property: {{property}} is missing",
        "severity": "error",
        "given": "$.paths[?(!@property.match(/well-known/ig))]",
        "then": [{
          "field": "description",
          "function": truthy
        }]
      },
      "must-have-response-body": {
        "description": "Every route returning a http status code of 200 or 201 must have a response body defined",
        "message": "{{description}}; property {{property}} is missing at path: {{path}}",
        "severity": "error",
        "given": "$.paths[?(!@property.match(/well-known/ig))].[?(@property === 'get')].responses[200,201,\"200\",\"201\"]",
        "then": [{
          "field": "content",
          "function": truthy
        }, {
          "field": "description",
          "function": truthy
        }],
        "formats": [oas3]
      },
      "must-have-content-type": {
        "description": "Every response must specify its content type",
        "message": "{{description}}; property {{property}} is missing or not a valid content-type",
        "severity": "error",
        "given": "$.paths[?(!@property.match(/well-known/ig))]..content",
        "then": [{
          "field": "@key",
          "function": truthy
        }, {
          "field": "@key",
          "function": pattern,
          "functionOptions": {
            "match": "/"
          }
        }]
      },
      "must-define-example-schema": {
        "description": "Every DTO must define at least one example",
        "message": "{{description}}; DTO is lacking an example {{path}}",
        "severity": "error",
        "given": "$.paths[?(!@property.match(/well-known/ig))]..content.*",
        "then": [{
          "function": xor,
          "functionOptions": {
            "properties": ["example", "examples"]
          }
        }]
      },
      "path-must-specify-tags": {
        "description": "Every route must specify at least one tag it belongs to",
        "message": "{{description}}; property tags is missing at: {{path}}",
        "severity": "error",
        "given": "$.paths[?(!@property.match(/well-known/ig))].*",
        "then": [{
          "field": "tags",
          "function": truthy
        }, {
          "field": "tags",
          "function": length$0,
          "functionOptions": {
            "min": 1
          }
        }]
      },
      "oas2-must-have-response-body": {
        "description": "Every route returning a http status code of 200 or 201 must have a response body defined",
        "message": "{{description}}; property {{property}} is missing at path: {{path}}",
        "severity": "error",
        "formats": [oas2],
        "given": "$.paths[?(!@property.match(/well-known/ig))].[?(@property === 'get')].responses[200,201,\"200\",\"201\"]",
        "then": [{
          "field": "schema",
          "function": truthy
        }, {
          "field": "description",
          "function": truthy
        }]
      }
    }
  }],
  "rules": {
    "operation-tag-defined": "off",
    "path-must-match-api-standards": "off",
    "servers-must-match-api-standards": "off",
    "common-responses-unauthorized": "hint",
    "http-verbs-should-be-used": "info",
    "no-http-verbs-in-resources": "warn",
    "path-description-is-mandatory": "warn",
    "info-description": "warn",
    "contact-information": "warn",
    "path-dto-reference": "warn",
    "must-have-path": "warn",
    "must-have-response-body": "warn",
    "oas2-must-have-response-body": "warn",
    "must-have-content-type": "warn",
    "must-define-example-schema": "warn",
    "path-must-specify-tags": "warn",
    "operation-operationId-unique": "warn",
    "path-params": "warn",
    "no-$ref-siblings": "warn",
    "oas2-discriminator": "warn",
    "oas2-valid-schema-example": "warn",
    "oas2-valid-media-example": "warn",
    "oas2-schema": "off",
    "oas3-valid-media-example": "warn",
    "oas3-valid-schema-example": "warn",
    "oas3-schema": "off"
  }
};
