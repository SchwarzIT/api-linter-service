const {length: length$0, pattern, truthy} = require("@stoplight/spectral-functions");
const {oas} = require("@stoplight/spectral-rulesets");
module.exports = {
  "extends": [{
    "extends": [[oas, "recommended"]],
    "rules": {
      "operation-tag-defined": "off",
      "path-must-match-api-standards": {
        "description": "API Path must match company api uri standards",
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
        "description": "Servers must match company api standards",
        "message": "{{description}}; {{property}}:{{value}} incorrect. Example: https://live.api.schwarz/digital-twin/api/v1/products",
        "severity": "error",
        "resolved": false,
        "given": "$.servers..url",
        "then": {
          "function": pattern,
          "functionOptions": {
            "match": "^((http[s]?)://)([a-z]+)([.+])api.schwarz"
          }
        }
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
        "description": "The HTTP URL should not be used to define different actions on a resource",
        "message": "{{description}}; {{property}} Instead use HTTP verbs to define actions on a resource. Example: PUT - /digital-twin/api/v1/products/42",
        "severity": "error",
        "given": "$.paths[?(!@property.match(/well-known/ig))]~",
        "then": {
          "function": pattern,
          "functionOptions": {
            "notMatch": "/(get|post|put|patch|delete)(/|$)"
          }
        }
      },
      "description-is-mandatory": {
        "description": "Every route of an API should have a description",
        "message": "{{description}}; property: {{property}} is missing",
        "severity": "error",
        "given": "$.paths[?(!@property.match(/well-known/ig))]",
        "then": [{
          "field": "description",
          "function": truthy
        }]
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
      "path-description": {
        "description": "Each path of an API must have a description",
        "message": "{{description}}; property `description` is missing for path {{path}}",
        "severity": "error",
        "given": "$.paths[?(!@property.match(/well-known/ig))]",
        "then": [{
          "field": "description",
          "function": truthy
        }]
      },
      "path-dto-reference": {
        "description": "DTOs should be used to specify the schema of a request / response",
        "message": "{{description}}; property {{property}} is missing",
        "severity": "error",
        "given": "$.components.schemas",
        "then": [{
          "function": length$0,
          "functionOptions": {
            "min": 1
          }
        }]
      }
    }
  }],
  "rules": {
    "operation-tag-defined": "off",
    "path-must-match-api-standards": "off",
    "servers-must-match-api-standards": "off",
    "common-responses-unauthorized": "warn",
    "http-verbs-should-be-used": "warn",
    "no-http-verbs-in-resources": "warn",
    "description-is-mandatory": "warn",
    "info-description": "warn",
    "contact-information": "warn",
    "path-description": "warn",
    "path-dto-reference": "warn"
  }
};
