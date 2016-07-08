importScripts("libs/jsontree/default.js", "libs/jsontree/json-bigint.js", "libs/jsontree/jsonview.js")

onmessage = function (jsontext) {
	var retVal = JSON.stringify(JSON.parse(jsontext.data),null,2);
	if(retVal === -1) {
		postMessage("error");
	}
	else {
		postMessage(retVal);
	}
};