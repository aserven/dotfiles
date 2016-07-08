var postmanTestSnippets = [
	{
		"id": 1,
		"name": "Set an environment variable",
		"description": "Sets an environment variable",
		"version": 1,
		"code": "postman.setEnvironmentVariable(\"variable_key\", \"variable_value\");"
	},
	{
		"id": 2,
		"name": "Set a global variable",
		"description": "Sets a global variable",
		"version": 1,
		"code": "postman.setGlobalVariable(\"variable_key\", \"variable_value\");"
	},
	{
		"id": 3,
		"name": "Status code: Code is 200",
		"description": "Write a basic status code check",
		"version": 1,
		"code": "tests[\"Status code is 200\"] = responseCode.code === 200;"
	},
	{
		"id": 4,
		"name": "Response body: Contains string",
		"version": 1,
		"code": "tests[\"Body matches string\"] = responseBody.has(\"string_you_want_to_search\");"
	},
	{
		"id": 5,
		"name": "Response body: JSON value check",
		"version": 1,
		"code": "var jsonData = JSON.parse(responseBody);\ntests[\"Your test name\"] = jsonData.value === 100;"
	},
	{
		"id": 6,
		"name": "Response body: Is equal to a string",
		"version": 1,
		"code": "tests[\"Body is correct\"] = responseBody === \"response_body_string\";"
	},
	{
		"id": 7,
		"name": "Response headers: Content-Type header check",
		"version": 1,
		"code": "tests[\"Content-Type is present\"] = postman.getResponseHeader(\"Content-Type\");"
	},
	{
		"id": 9,
		"name": "Response time is less than 200ms",
		"version": 1,
		"code": "tests[\"Response time is less than 200ms\"] = responseTime < 200;"
	},
	{
		"id": 10,
		"name": "Status code: Succesful POST request",
		"version": 1,
		"code": "tests[\"Successful POST request\"] = responseCode.code === 201 || responseCode.code === 202;"
	},
	{
		"id": 11,
		"name": "Status code: Code name has string",
		"version": 1,
		"code": "tests[\"Status code name has string\"] = responseCode.name.has(\"Created\");"
	},
	{
		"id": 13,
		"name": "Response body: Convert XML body to a JSON Object",
		"version": 1,
		"code": "var jsonObject = xml2Json(responseBody);"
	},
	{
		"id": 14,
		"name": "Use Tiny Validator for JSON data",
		"version": 1,
		"code": "var schema = {\n \"items\": {\n \"type\": \"boolean\"\n }\n};\nvar data1 = [true, false];\nvar data2 = [true, 123];\n\nconsole.log(tv4.error);\ntests[\"Valid Data1\"] = tv4.validate(data1, schema);\ntests[\"Valid Data2\"] = tv4.validate(data2, schema);"
	},
	{
		"id": 15,
		"name": "Clear an environment variable",
		"description": "Clears an environment variable if set",
		"version": 1,
		"code": "postman.clearEnvironmentVariable(\"variable_key\");"
	},
	{
		"id": 16,
		"name": "Clear a global variable",
		"description": "Clears a global variable if set",
		"version": 1,
		"code": "postman.clearGlobalVariable(\"variable_key\");"
	}
];
