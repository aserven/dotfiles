Handlebars.registerHelper('limitLineWidth', function (string, length, options) {
    return limitStringLineWidth(string, length);
});

Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
    switch (operator) {
        case '==':
        	return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
        	return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '<':
        	return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
        	return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
        	return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
        	return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        default:
        	return options.inverse(this);
    }
});

Handlebars.registerHelper('formatTime', function(time) {
    time = parseInt(time, 10);
    var d = new Date(time);
    var dateFormat = '{d} {Mon}, {h}:{mm}{TT}';
    return d.format(dateFormat);
});

function gapiIsLoaded() {

}


function isMethodWithBody(method) {
    var methodsWithBody = ["POST", "PUT", "PATCH", "DELETE", "LINK", "UNLINK", "LOCK", "PROPFIND", "VIEW"];
    method = method.toUpperCase();
    return $.inArray(method, methodsWithBody) >= 0;
}

function isConflictValueNull(val) {
    //if(val==="null" || !val || val==="undefined")/**/
}

function sortAscending(a, b) {
    if (a >= b) {
        return 1;
    }
    else {
        return -1;
    }
}

function sortById(a, b) {
    var aName = a.id;
    var bName = b.id;

    if (aName < bName) {
        return 1;
    }
    else if (aName === bName) {
        return 0;
    }
    else {
        return -1;
    }
}

function sortAlphabetical(a, b) {
    return sortAlphabeticalSelf(a.name, b.name);
}

function sortAlphabeticalSelf(a, b) {
    var counter;
    if(!a) {
        a = "";
    }
    if(!b) {
        b = "";
    }
    var defRet = 1;

    if (a.length > b.length)
        counter = b.length;
    else {
        counter = a.length;
        defRet = -1;
    }

    for (var i = 0; i < counter; i++) {
        if (a[i] == b[i]) {
            continue;
        } else if (a[i] > b[i]) {
            return 1;
        } else {
            return -1;
        }
    }
    return defRet;
}

$.widget("custom.catcomplete", $.ui.autocomplete, {
 _renderMenu:function (ul, items) {
     var that = this,
     currentCategory = "";
     $.each(items, function (index, item) {
         if (item.category != currentCategory) {
             ul.append("<li class='ui-autocomplete-category'>" + item.category + "</li>");
             currentCategory = item.category;
         }
         that._renderItemData(ul, item);
     });
 }
});

function findPosition(list, key, value) {
    var listLength = list.length;
    var pos = -1;
    for (var i = 0; i < listLength; i++) {
        var h = list[i];
        if (h['key'] === value) {
            pos = i;
            break;
        }
    }

    return pos;
}

function findHeaderPosition(list, key, value) {
    var listLength = list.length;
    var pos = -1;
    value = value.toLowerCase();
    for (var i = 0; i < listLength; i++) {
        var h = list[i];
        if (h['key'].toLowerCase() === value) {
            pos = i;
            break;
        }
    }

    return pos;
}

function findPositionCaseInsensitive(list, key, value) {
    if(!value) {
        return;
    }
    value = value.toLowerCase();
    var listLength = list.length;
    var pos = -1;
    for (var i = 0; i < listLength; i++) {
        var h = list[i];
        var key = h['key'];
        if (key && key.toLowerCase() === value) {
            pos = i;
            break;
        }
    }

    return pos;
}

function limitStringLineWidth(string, numChars) {
    string = string.replace("&", "&amp;");
    var remainingChars = string;
    var finalString = "";
    var numLeft = string.length;
    do {
        finalString += remainingChars.substr(0, numChars);
        remainingChars = remainingChars.substr(numChars);
        numLeft -= numChars;
        if (numLeft < 5) {
            numLeft -= numChars;
            finalString += remainingChars.substr(0, numChars)
        }
        else {
            finalString += "<br/>";
        }
    } while (numLeft > 0);

    return finalString;
}

function ensureProperUrl(url) {
    url = url.trim();
    var a = "http://";
    var b = "https://"

    if (url.indexOf(a) !== 0 && url.indexOf(b) !== 0) {
        url = "http://" + url;
    }

    return url.trim();
}

function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
function guid() {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

function getBodyVars(url, associative) {
    if (!url) {
        return [];
    }

    var equalLocation = url.indexOf('=');

    if (equalLocation < 0) {
        return [];
    }

    var vars = [], hash, varsAssoc = {};
    var hashes = url.split('&');
    var element;

    var queryParams = getUrlVars(url);
    var referrerObject = _.find(queryParams, function(v) {return v.key === "referrer"});
    var referrer = null;
    if(referrerObject) {
        referrer = referrerObject.value;
    }

    for (var i = 0; i < hashes.length; i++) {
        equalLocation = hashes[i].indexOf('=');

        if (equalLocation !== -1) {
            element = {
                "key":hashes[i].slice(0, equalLocation),
                "value":hashes[i].slice(equalLocation + 1)
            };
        }
        else {
            element = {
                "key":hashes[i].slice(0, hashes[i].length),
                "value":""
            };
        }


        (associative) ? (varsAssoc[element.key] = element.value) : (vars.push(element));
    }

    if (associative) {
        return varsAssoc;
    } else {
        return vars;
    }
}

function getUrlVars(url, associative) {
	if (!url) {
		return [];
	}

	var quesLocation = url.indexOf('?');
	var equalLocation = url.indexOf('=');

	if (quesLocation < 0) {
		quesLocation = -1;
		return [];
	}

	var vars = [], hash, varsAssoc = {};
	var hashes = url.slice(quesLocation + 1).split('&');
	var element;

	for (var i = 0; i < hashes.length; i++) {
		equalLocation = hashes[i].indexOf('=');

		if (equalLocation !== -1) {
			element = {
				"key":hashes[i].slice(0, equalLocation),
				"value":hashes[i].slice(equalLocation + 1),
				"equals": true
            };
        }
        else {
        	element = {
				"key":hashes[i].slice(0, hashes[i].length),
				"value":"",
				"equals": false
        	};
    	}

    	if(element.key.length===0 && equalLocation===-1) continue;

    	(associative) ? (varsAssoc[element.key] = element.value) : (vars.push(element));
	}

	if (associative) {
  		return varsAssoc;
	} else {
		return vars;
	}
}

function packHeaders(headers) {
    var headersLength = headers.length;
    var paramString = "";
    for (var i = 0; i < headersLength; i++) {
        var h = headers[i];
        if (h.name && h.name !== "") {
            paramString += h.name + ": " + h.value + "\n";
        }
    }

    return paramString;
}

function getHeaderVars(data) {
    if (data === null || data === "") {
        return [];
    }

    var vars = [], hash;
    var hashes = data.split('\n');
    var header;

    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split(":");
        header = {
            "key":jQuery.trim(hash[0]),
            "value":jQuery.trim(hash[1])
        };

        vars.push(header);
    }

    return vars;
}

function valuesFollowingInputValue(value) {
    return $('input[value="' + value + '"] + input').val()
}

// http://updates.html5rocks.com/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
}

function str2ab(str) {
    var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);

    for (var i=0, strLen=str.length; i<strLen; i++) {
       bufView[i] = str.charCodeAt(i);
   }

   return buf;
}

function find(collection, filter) {
    for (var i = 0; i < filter.length; i++) {
        if (filter(collection[i], i, collection)) {
            return i;
        }
    }
    return -1;
}

function copyToClipboard(text){
    var nextElem = document.body.getElementsByClassName("postman-navbar")[0];//getElementById("response-copy-container");
    var copyDiv = document.createElement('textarea');
    copyDiv.contentEditable = true;
    nextElem.parentNode.insertBefore(copyDiv, nextElem);
    if(text) {
        text=text.escapeHTML(); //to prevent escaping of &lt in the XML response
    }
    copyDiv.innerHTML = text;
    copyDiv.unselectable = "off";
    copyDiv.focus();
    document.execCommand('selectall');
    document.execCommand("copy", false, null);
    nextElem.parentNode.removeChild(copyDiv);
}

//Usage arrayObjectIndexOf(items, "Washington", "city");
function arrayObjectIndexOf(myArray, searchTerm, property) {
    for(var i = 0, len = myArray.length; i < len; i++) {
        if (myArray[i][property] === searchTerm) return i;
    }
    return -1;
}

//http://stackoverflow.com/questions/1219860/javascript-jquery-html-encoding
function htmlEncode(value){
  //create a in-memory div, set it's inner text(which jQuery automatically encodes)
  //then grab the encoded contents back out.  The div never exists on the page.
  return $('<div/>').text(value).html();
}

// http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
/**
 * Returns a random number between min and max
 */
 function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min and max
 * Using Math.round() will give you a non-uniform distribution!
 */
 function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function splitSyncableFilename(name) {
    var parts = name.split(".");
    return {
        "id": parts[0],
        "type": parts[1]
    };
}

/*
    Get path variables from the URL
    */

    function getURLPathVariables(url) {
        if (!url) {
            return [];
        }

        var quesLocation = url.indexOf('?');
        var strippedUrl;

        if (quesLocation > 0) {
            strippedUrl = url.substr(0, quesLocation);
        }
        else {
            strippedUrl = url;
        }

        var pattern = /\/:[0-9A-Za-z_-]*/ig;

        var matches = strippedUrl.match(pattern);
        var pairs = [];
        var i;
        var s;

        if (matches) {
            for(i = 0; i < matches.length; i++) {
                s = matches[i].substr(2);
                pairs.push(s);
            }
        }

        return pairs;
    }

/*
    Replace path variables with values
    */
    function replaceURLPathVariables(url, values) {
        if (!url) {
            return url;
        }

        var quesLocation = url.indexOf('?');
        var strippedUrl;

        if (quesLocation > 0) {
            strippedUrl = url.substr(0, quesLocation);
        }
        else {
            strippedUrl = url;
        }

        var pattern = /\/:[0-9A-Za-z_-]*/ig;

        var matches = strippedUrl.match(pattern);
        var pairs = [];
        var i;
        var key;
        var val;

        var finalUrl = url;

        if (matches) {
            for(i = 0; i < matches.length; i++) {
                key = matches[i].substr(2);

                if (key in values) {
                    val = '/' + values[key];
                    finalUrl = finalUrl.replace('/:' + key, val);
                }
            }
        }

        return finalUrl;
    }

    function stringToUint8Array(string) {
        var buffer = new ArrayBuffer(string.length);
        var view = new Uint8Array(buffer);
        for(var i = 0; i < string.length; i++) {
            view[i] = string.charCodeAt(i);
        }
        return view;
    };

    function arrayBufferToString(buffer) {
        var str = '';
        var uArrayVal = new Uint8Array(buffer);
        for(var s = 0; s < uArrayVal.length; s++) {
            str += String.fromCharCode(uArrayVal[s]);
        }

        return str;
    };

    function getFilenameFromFakePath(path) {
        var parts = path.split("\\");
        return parts[parts.length - 1];
    }

    function getKeyValPairsAsAssociativeArray(a) {
        var assoc = {};
        if(!a || !a.hasOwnProperty("length")) return assoc;

        for(var i = 0; i < a.length; i++) {
            assoc[a[i].key] = a[i].value;
        }

        return assoc;
    }

    function getResponseHeadersAsLowercaseArray(allHeaders) {
        var headers = [];
        allHeaders = allHeaders.split("\n");
        var numHeaders = allHeaders.length;
        for(var i=0;i<numHeaders;i++) {
            var parts = allHeaders[i].split(":");
            var key = parts.shift();
            var value = parts.join(":");
            headers.push({
                'key': key.toLowerCase(),
                'value': value
            });
        }
        return headers;
    }

    function arraysEqual(arr1, arr2) {
        if(! ((arr1 instanceof Array) && (arr2 instanceof Array))) return false;
        if(arr1.length !== arr2.length)
            return false;
        for(var i = arr1.length; i--;) {
            if(arr1[i] !== arr2[i])
                return false;
        }

        return true;
    }

    function getCaseInsensitiveHeader(key, headersArray) {
        var len = headersArray.length;
        for(var i=0; i<len; i++) {
            if(headersArray[i].key===key.toLowerCase()) {
                return headersArray[i].value;
            }
        }
        return null;
    }

    String.prototype.escape = function() {
        var tagsToReplace = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;'
        };
        return this.replace(/[&<>]/g, function(tag) {
            return tagsToReplace[tag] || tag;
        });
    };

// Take a number with or without "px" postfix and return rem value
function rem(pxValue) {
    var REM_BASELINE = parseFloat($("html").css("font-size"));
    return parseFloat(pxValue)/REM_BASELINE + "rem";
}

/* Returns abbreviated method name to show in compact UI */
function getAbbrvMethodName(method) {
    var abbrvHash = {
        "PROPFIND": "PROP",
        "DELETE"  : "DEL",
        "OPTIONS" : "OPT",
        "UNLINK" : "UNLNK",
        "UNLOCK" : "UNLCK"
    };

    if(abbrvHash[method]) {
        return abbrvHash[method];
    } else {
        return method;
    }
}

Handlebars.registerHelper('abbreviate', function(method) {
    return getAbbrvMethodName(method);
});

Handlebars.registerHelper('pluralize', function(number, single, plural) {
    return (number === 1) ? single : plural;
});

function cleanJSON(data) {
    var lastIndex = data.lastIndexOf("}")+1;
    return data.substring(data.indexOf('{'),lastIndex);
}

function cleanJSONArray(data) {
    var lastIndex = data.lastIndexOf("]")+1;
    return data.substring(data.indexOf('['),lastIndex);
}

function jv_processJSON(content) {
    //check for empty data
    if(content.length==0) {
        return null;
    }

    var jv_data = content;
    if(/^\<pre.*\>(.*)\<\/pre\>$/.test(jv_data)){
        // console.log("JSONView: data is wrapped in <pre>...</pre>, stripping HTML...");
        jv_data = jv_data.replace(/<(?:.|\s)*?>/g, ''); //Aggressively strip HTML.
    }

    //Test if what remains is JSON or JSONp
    var jv_json_regex = /^\s*([\[\{].*[\}\]])\s*$/; // Ghetto, but it works
    var jv_jsonp_regex = /^[\s\u200B\uFEFF]*([\w$\[\]\.]+)[\s\u200B\uFEFF]*\([\s\u200B\uFEFF]*([\[{][\s\S]*[\]}])[\s\u200B\uFEFF]*\);?[\s\u200B\uFEFF]*$/;
    var jv_is_json = jv_json_regex.test(jv_data);
    var jv_is_jsonp = jv_jsonp_regex.test(jv_data);
    // console.log("JSONView: is_json="+jv_is_json+" is_jsonp="+jv_is_jsonp);
    var jsonp_array;
    jv_is_json=true;
    try {
        JSONbig.parse(jv_data);
    }
    catch(e) {
        jv_is_json=true;
        var new_jv_data = cleanJSON(jv_data);
        try {
            JSONbig.parse(new_jv_data);
            jv_data = new_jv_data;
        }
        catch(e) {
            new_jv_data = cleanJSONArray(jv_data);
            try {
                JSONbig.parse(new_jv_data);
                jv_data = new_jv_data;
            }
            catch(e) {
                jv_is_json=false;
            }
        }
    }
    if(!jv_is_json) {
        //test for JSONP
        jsonp_array = jv_data.trim().match(/^([a-zA-Z_$][0-9a-zA-Z_$]*\()([\s\S]*)(\);?)$/)
        if(jsonp_array && jsonp_array.length===4) {
            jv_is_json=true;
            try {
                JSONbig.parse(jsonp_array[2])
            }
            catch(e) {
                jv_is_json=false;
            }
        }
    }
    if(jv_is_json) {
        var jv_cleanData = '',
        jv_callback = '';

        var jv_callback_results =jv_jsonp_regex.exec(jv_data);
        if(jsonp_array && jsonp_array.length===4) {
            // console.log("THIS IS JSONp");
            jv_callback = jsonp_array[1].substring(0,jsonp_array[1].length-1);
            jv_cleanData = jsonp_array[2];
        } else {
            // console.log("Vanilla JSON");
            jv_cleanData = jv_data;
        }

        // Covert, and catch exceptions on failure
        try {
            var jv_jsonObj = JSONbig.parse(jv_cleanData);
            if ( jv_jsonObj || jv_jsonObj===false) {
                return jv_cleanData;
            } else {
                throw "There was no object!";
            }
        } catch(e) {
            console.log(e);
            return jv_data;
        }
    }
    else {
        return null;
    }
}


function objectDiff(obj1, obj2, firstTime) {
    if(typeof firstTime === "undefined") {
        firstTime = true;
    }
    if(!obj1)
        obj1 = {};
    if(!obj2)
        obj2 = {};
    var result = {};
    var subDiff = null;
    for(key in obj1) {
        if(obj2[key] != obj1[key]) result[key] = obj2[key];
        if(typeof obj2[key] == 'array' && typeof obj1[key] == 'array') {
            result[key] = arguments.callee(obj1[key], obj2[key], false);
        }
        if(typeof obj2[key] == 'object' && typeof obj1[key] == 'object') {
            result[key] = arguments.callee(obj1[key], obj2[key], false);
        }
    }
    if(firstTime) {
        for(key in result) {
            if(_.isEqual(result[key], {})) {
                delete result[key];
            }
        }
    }
    return result;
}

 function backslashSpecial(str) {
    return str.replace(/([\!\"\#\$\%\&\'\(\)\*\+\,\.\/\:\;\<\=\>\?\@\[\\\]\^\`\{\|\}\~])/g,"\\$1");
 }

function isStatusCode200(code) {
    return (code>=200 && code<299);
}


function compareRequests(req1, req2) {
    var isUnchanged = true;
    var method = req1.method.toUpperCase();
    var isWithBody = pm.request.isMethodWithBody(method);
    var genericFieldsToIgnore = ["id", "version", "owner"];
    _.forIn(req1, function(value, key) {
        if(_.has(req2, key)) {
            var v1 = _.cloneDeep(req2[key]);
            var v2 = _.cloneDeep(value);

            if(key === "data" && (v2 === undefined || v1 === undefined || !isWithBody)) return isUnchanged;
            if(key === "dataMode" && (v2 === undefined || v1 === undefined || !isWithBody)) return isUnchanged;
            if(key === "currentHelper" && (v2 === "normal" || v1 === null)) return isUnchanged;
            if(key === "helperAttributes" && (v2 === undefined)) return isUnchanged;
            if(key === "write") return isUnchanged;
            if(v1==null && v2=="") return isUnchanged;
            if(v2==null && v1=="") return isUnchanged;
            if(genericFieldsToIgnore.indexOf(key) !== -1) return isUnchanged;

            if(key==="data" && req2.dataMode==="raw" && (typeof req2.data !== "string")) {
                return isUnchanged;
            }
            if(key==="rawModeData" && req2.dataMode!=="raw") {
                return isUnchanged;
            }
            if((key==="data" || key==="rawModeData") && !isMethodWithBody(req2.method)) {
                return isUnchanged;
            }
            if(key==="method") {
                if(typeof v1==="string") {
                    v1 = v1.toLowerCase();
                }
                if(typeof v2==="string") {
                    v2 = v2.toLowerCase();
                }
            }

            if(key==="helperAttributes") {
                if(typeof v2 === "object") {
                    v2 = JSON.stringify(v2);
                }

                if(typeof v1 === "object") {
                    v1 = JSON.stringify(v1);
                }
            }

            if(key==="helperAttributes" && (v1 && v1.id==="oAuth1") && (v2 && v2.id==="oAuth1")) {
                delete v1.nonce;
                delete v2.nonce;
                delete v1.timestamp;
                delete v2.timestamp;
                delete v1.time;
                delete v2.time;
            }

            if(typeof v1 === "string") v1 = v1.trim();
            if(typeof v2 === "string") v2 = v2.trim();

            //disable checking for disable fields
            if(key==="data" && (v1 instanceof Array)) {
                v1 = _.filter(v1, function(dataField) {if(dataField.enabled===true) return dataField});
                v2 = _.filter(v2, function(dataField) {if(dataField.enabled===true) return dataField});
            }

            if(!_.isEqual(v1,v2)) {
                isUnchanged = false;
                //console.log("mismatch", key, req2[key], v2);
            }
        }
    });

return isUnchanged;
}

function getAppId() {
  if(postman_electron) {
    return postman_electron_appid;
  }
  else {
    return chrome.runtime.id;
  }
}
