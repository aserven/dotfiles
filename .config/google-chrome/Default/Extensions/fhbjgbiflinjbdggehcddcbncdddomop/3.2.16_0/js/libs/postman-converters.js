var curlConverter = require("curl-to-postman");
var wadlConverter = require("wadl-to-postman");
var swagger1_2Converter = require("swagger1-to-postman");
var ramlConverter = require("raml-to-postman");
var swagger2_0Converter = require("swagger2-to-postman");
var postmanValidator = require('postman_validator');

window.postmanConverters = {
	curlConverter: curlConverter,
	wadlConverter: wadlConverter,
	swagger1_2Converter: swagger1_2Converter,
	ramlConverter: ramlConverter,
    swagger2_0Converter: swagger2_0Converter
};

window.postmanvalidator = postmanValidator;
