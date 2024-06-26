const {oas3} = require("@stoplight/spectral-formats");
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
      "must-define-example-schema": {
        "description": "Every DTO must define at least one example",
        "message": "{{description}}; DTO is lacking an example {{path}}",
        "severity": "error",
        "given": "$.components.schemas.*",
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
        "given": "$.paths[?(!@property.match(/well-known/ig))][get,post,put,delete,patch,options,head,trace]",
        "then": [{
          "field": "tags",
          "function": truthy
        }, {
          "field": "tags",
          "function": length$0,
          "functionOptions": {
            "min": 1
          }
        }],
        "formats": [oas3]
      }
    }
  }],
  "rules": {
    "tag-description": "info",
    "operation-tag-defined": "off",
    "path-must-match-api-standards": "off",
    "servers-must-match-api-standards": "off",
    "common-responses-unauthorized": "hint",
    "no-http-verbs-in-resources": "warn",
    "info-description": "warn",
    "contact-information": "warn",
    "must-have-path": "warn",
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
    "oas3-schema": "off",
    "operation-description": "off"
  }
};
