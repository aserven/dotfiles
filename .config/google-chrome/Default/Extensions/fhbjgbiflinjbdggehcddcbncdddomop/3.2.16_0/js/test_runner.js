/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	window.pm = window.pm || {};

	var Tester = __webpack_require__(5);
	var PreRequestScripter = __webpack_require__(9);
	var PostmanAPI = __webpack_require__(15);
	var PmCollections = __webpack_require__(19);
	var History = __webpack_require__(222);
	var Globals = __webpack_require__(223);
	var Environments = __webpack_require__(224);
	var VariableProcessor = __webpack_require__(225);
	var AppState = __webpack_require__(229);
	var TestRunApp = __webpack_require__(350);
	var TestRunAppHeader = __webpack_require__(351);
	var BasicAuthProcessor = __webpack_require__(275);
	var HawkAuthProcessor = __webpack_require__(276);
	var DigestAuthProcessor = __webpack_require__(277);
	var AWSAuthProcessor = __webpack_require__(280);
	var OAuth1Processor = __webpack_require__(278);
	var OAuth2TokenFetcher = __webpack_require__(279);
	var Helpers = __webpack_require__(281);
	var InterceptorIntro = __webpack_require__(16);
	var HeaderPresets = __webpack_require__(234);
	var URLCache = __webpack_require__(237);
	var Storage = __webpack_require__(296);
	var BulkAnalytics = __webpack_require__(330);
	var RequestMethods = __webpack_require__(297);
	var User = __webpack_require__(321);
	var Tracker = __webpack_require__(309);
	var SyncLogger = __webpack_require__(211);
	var LocalChanges = __webpack_require__(214);
	var SyncManagerNew = __webpack_require__(215);
	var SubscriptionHandler = __webpack_require__(217);
	var SyncStatusNotif = __webpack_require__(218);
	var ConflictResolverModal = __webpack_require__(220);
	var TestRuns = __webpack_require__(6);
	var TestRunnerSidebarState = __webpack_require__(352);
	var TestRunnerSidebar = __webpack_require__(353);
	var TestRunnerState = __webpack_require__(355);
	var TestRunnerController = __webpack_require__(356);
	var Mediator = __webpack_require__(331);
	var AppWindow = __webpack_require__(332);
	var Settings = __webpack_require__(333);
	var ThemeManager = __webpack_require__(338);
	var Features = __webpack_require__(1).Features;
	var CrashReporter = __webpack_require__(212);

	//electron only
	if(postman_electron) {
	    var CookieManager = __webpack_require__(341);
	    var CookieModal = __webpack_require__(342);
	    var InterceptorInstaller = __webpack_require__(343);
	    var ElectronTCPReader = __webpack_require__(344);
	}

	pm.filesystem = __webpack_require__(346);
	pm.indexedDB = __webpack_require__(347);
	pm.broadcasts = __webpack_require__(348);
	pm.alerts = __webpack_require__(349);

	pm.targets = {
	    CHROME_LEGACY_APP: 0,
	    CHROME_PACKAGED_APP: 1,
	    NODE_WEBKIT_APP: 2,
	    MACGAP_APP: 3
	};

	pm.target = pm.targets.CHROME_PACKAGED_APP;
	if(postman_webkit) {
	    pm.target = pm.targets.NODE_WEBKIT_APP;
	}
	if(postman_macgap) {
	    pm.target = pm.targets.MACGAP_APP;
	}
	if(postman_electron) {
	    pm.target = pm.targets.ELECTRON_APP;
	    //require("remote").getCurrentWindow().toggleDevTools();
	}


	pm.isTesting = postman_flag_is_testing;
	pm.databaseName = postman_database_name;
	pm.webUrl = postman_web_url;
	pm.apiUrl = postman_api_url;

	pm.features = new Features();

	pm.syncSocket = null;
	pm.syncManager = null;
	pm.syncQueue = [];

	pm.debug = false;

	// pm.indexedDB = {};
	// pm.indexedDB.db = null;
	// pm.indexedDB.modes = {
	//     readwrite:"readwrite",
	//     readonly:"readonly"
	// };

	pm.testRunner = true;

	pm.fs = {};
	pm.hasPostmanInitialized = false;

	pm.globalPrScriptNotif = null;

	pm.isTestRunner = true;

	pm.bannedHeaders = [
	    'accept-charset',
	    'accept-encoding',
	    'access-control-request-headers',
	    'access-control-request-method',
	    'connection',
	    'content-length',
	    'cookie',
	    'cookie2',
	    'content-transfer-encoding',
	    'date',
	    'expect',
	    'host',
	    'keep-alive',
	    'origin',
	    'referer',
	    'te',
	    'trailer',
	    'transfer-encoding',
	    'upgrade',
	    'user-agent',
	    'via'
	];

	// IndexedDB implementations still use API prefixes
	var indexedDB = window.indexedDB || // Use the standard DB API
	    window.mozIndexedDB || // Or Firefox's early version of it
	    window.webkitIndexedDB;            // Or Chrome's early version
	// Firefox does not prefix these two:
	var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
	var IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;
	var IDBCursor = window.IDBCursor || window.webkitIDBCursor;

	window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

	pm.init = function () {
	    Handlebars.partials = Handlebars.templates;

	    function initializeTester() {
	        pm.tester = new Tester();
	    }

	    function initializePreRequestScripter() {
	        pm.preRequestScripter = new PreRequestScripter();
	    }

	    function initializePostmanAPI() {
	        pm.api = new PostmanAPI();
	    }

	    function initializeCollections() {
	        pm.collections = new PmCollections();
	    }

	    function initializeHistory() {
	        pm.history = new History();
	    }

	    function initializeEnvironments() {
	        var globals = new Globals();
	        var environments = new Environments();

	        var variableProcessor = new VariableProcessor({
	            "environments": environments,
	            "globals": globals
	        });

	        pm.envManager = variableProcessor;
	        pm.environments = environments;

	        var appState = new AppState({
	            "globals": globals,
	            "environments": environments,
	            "variableProcessor": variableProcessor
	        });

	        var appView = new TestRunApp({model: appState});
	        pm.app = appView;

	        var testRunAppHeader = new TestRunAppHeader({model: {}});
	    }

		function initializeHelpers() {
			var basicAuthProcessor = new BasicAuthProcessor();
			var digestAuthProcessor = new DigestAuthProcessor();
			var oAuth1Processor = new OAuth1Processor();
			var oAuth2TokenFetcher = new OAuth2TokenFetcher();
			var hawkAuthProcessor = new HawkAuthProcessor();
	        var awsAuthProcessor = new AWSAuthProcessor();

			var helpers = new Helpers({
				"basicAuth": basicAuthProcessor,
				"digestAuth": digestAuthProcessor,
				"oAuth1": oAuth1Processor,
				"oAuth2": oAuth2TokenFetcher,
				"hawkAuth": hawkAuthProcessor,
	            "awsSigV4": awsAuthProcessor
			});

			pm.helperModel = helpers;
		}

	    function initializeInterceptor() {
	        console.log("Initialize interceptor");
	        var interceptorIntro = new InterceptorIntro({model: {}});
	    }

	    function initializeHeaderPresets() {
	        pm.headerPresets = new HeaderPresets();
	    }

	    function initializeRequester() {
	        var urlCache = new URLCache();
	        pm.urlCache = urlCache;

	        initializeExtensionListener();
	    }

	    function initializeStorage() {
	        pm.storage = new Storage();
	    }

	    function initializeRequestMethods() {
	        pm.methods = new RequestMethods();
	    }

	    function initializeExtensionListener() {
	        if(!postman_webkit && !postman_macgap && !postman_electron) {
	            chrome.runtime.onMessageExternal.addListener(function (request, sender, sendResponse) {
	                pm.mediator.trigger("onMessageExternal", request, sender, sendResponse);
	            });
	        }
	    }

	    function initializeUser() {
	        pm.user = new User();
	        pm.bulkAnalytics = new BulkAnalytics();
	    }

	    function initializeTracker() {
	        pm.tracker = new Tracker();
	    }

	    function initializeSync() {
	        // pm.syncStatusManager = new SyncStatusManager();
	        // var syncStatusSidebar = new SyncStatusSidebar({model: pm.syncStatusManager});
	        pm.syncLogger = new SyncLogger();
	        var localChanges = new LocalChanges();
	        pm.syncManager = new SyncManagerNew();
	        pm.localChanges = localChanges;

	        pm.subscriptionManger = new SubscriptionHandler();

	        var syncStatusNotif = new SyncStatusNotif({model: pm.syncManager});

	        pm.conflictResolverModal = new ConflictResolverModal();
	    }

	    function initializeTestRunner() {
	    	var testRuns = new TestRuns();

	    	var o = {
	    		"collections": pm.collections,
	    		"envManager": pm.envManager,
	    		"testRuns": testRuns
	    	};

	        var testRunnerSidebarState = new TestRunnerSidebarState(o);
	        var testRunnerSidebar = new TestRunnerSidebar({model: testRunnerSidebarState});

	        var testRunnerState = new TestRunnerState(o);
	        var testRunnerController = new TestRunnerController({model: testRunnerState});

	    	pm.testRuns = testRuns;
	    }

	    pm.mediator = Mediator;
	    pm.appWindow = new AppWindow();

	    initializeStorage();

	    pm.settings = new Settings();

	    pm.methods = new RequestMethods(function() {
	        pm.settings.init(function() {
	            // Initialize theme here
	            pm.themeManager = new ThemeManager();

	            if(postman_electron) {
	                pm.cookieManager = new CookieManager();
	            }

	            pm.filesystem.init();
	            pm.indexedDB.open(function() {
	            	initializeTester();
	                initializePreRequestScripter();
	                initializeInterceptor();
	                initializePostmanAPI();
	                initializeRequester();
		            initializeHelpers();
	                initializeHistory();
	                initializeCollections();
	                initializeEnvironments();
	                initializeHeaderPresets();
	                initializeUser();
	                initializeTracker();

	                // Test runner specific initializations
	                initializeTestRunner();
	                initializeSync();
	                
	                pm.crashReporter = new CrashReporter();
	                pm.hasPostmanInitialized = true;
	            });
	        });
	    });
	};

	pm.codebaseVersion = "3.0.6.6";
	pm.electronVersion = "0.3";
	pm.getCodebaseVersion = function() {
	    if(postman_electron) {
	        return pm.codebaseVersion;
	    }
	    return chrome.runtime.getManifest()["version"];
	}
	pm.getVersion = function() {
	    if(postman_electron) {
	        return pm.electronVersion;
	    }
	    return chrome.runtime.getManifest()["version"];
	}


	$(document).ready(function () {
	    pm.init();
	});


/***/ },

/***/ 1:
/***/ function(module, exports) {

	var FEATURES = {
	  TESTER: "tester",
	  ACTIVITY_FEED: "activity_feed",
	  NOTIFICATIONS: "notifications",
	  ACCESS_CONTROL: "access_control"
	};

	var Features = Backbone.Model.extend({
	  defaults: function() {
	    var obj = {};
	    obj[FEATURES.TESTER] = true;
	    obj[FEATURES.ACTIVITY_FEED] = false;
	    obj[FEATURES.NOTIFICATIONS] = false;
	    obj[FEATURES.ACCESS_CONTROL] = false;

	    return obj;
	  },

	  isEnabled: function(feature) {
	    return this.get(feature);
	  },

	  enable: function(feature) {
	    if(this.get(feature)) {
	      return;
	    }
	    this.set(feature, true);
	    pm.mediator.trigger('feature:enabled:'+feature);
	  },

	  disable: function(feature) {
	    if(!this.get(feature)) {
	      return;
	    }
	    this.set(feature, false);
	    pm.mediator.trigger('feature:disabled:'+feature);
	  }
	})

	module.exports = {
	  Features: Features,
	  FEATURES: FEATURES
	}


/***/ },

/***/ 5:
/***/ function(module, exports) {

	var Tester = Backbone.Model.extend({
	    defaults: function() {
	        return {
	            "sandbox": null
	        };
	    },

	    runTest: function(request, data, iteration, callback) {
	        $("#test-error").hide();

	        var testCode = request.get("tests");

	        // Wrapper function
	        var baseCode = "(function(){var tests={};";
	        baseCode += testCode;
	        baseCode += "\nreturn tests;})()";

	        var response = request.get("response");

	        var selectedEnv = pm.envManager.get("selectedEnv");
	        var selectedEnvJson = {};
	        var globals = getKeyValPairsAsAssociativeArray(pm.envManager.get("globals").get("globals"));

	        if (selectedEnv) {
	            selectedEnvJson = getKeyValPairsAsAssociativeArray(selectedEnv.toJSON().values);
	        }

	        var environment = {
	            "request": request.getForTester(), // Get separately
	            "responseBody": response.get("text"),
	            "responseHeaders": response.getHeadersAsKvPairs(), // TODO Get key value pairs
	            "responseTime": response.get("time"),
	            "responseCookies": response.get("cookies"),
	            "responseCode": response.get("responseCode"),
	            "environment": selectedEnvJson,
	            "globals": globals,
	            "data": data,
	            "iteration": iteration
	        };

	        var fileList = request.get("sandboxFiles");
	        if(!postman_webkit && !postman_electron) {
	            fileList = null;
	        }

	        this.postCode(baseCode, environment, fileList);

	        this.listenToOnce(pm.mediator, "resultReceived", function(data) {
	            if (callback) {
	                callback(data, "result");
	            }
	        });

	        this.listenToOnce(pm.mediator, "resultError", function(data) {
	            if (callback) {
	                callback(data, "error");
	            }
	        });
	    },

	    postCode: function(code, environment, fileList) {
	        var sandbox = this.get("sandbox");
	        var message = {
	            command: "runtest",
	            code: code,
	            environment: environment,
	            fileList: fileList,
	            scriptType: "test"
	        };

	        sandbox.contentWindow.postMessage(message, '*');
	    },

	    initialize: function() {
	        var model = this;

	        var sandbox = document.getElementById("tester_sandbox");
	        this.set("sandbox", sandbox);

	        window.addEventListener('message', function(event) {
	            var type = event.data.type;

	            if (event.data.type === "test_result") {
	                pm.mediator.trigger("resultReceived", event.data.result);
	                var numTests = _.size(event.data.result);
	            }
	            if (event.data.type === "test_error" && event.data.scriptType=="test") {
	                pm.mediator.trigger("resultError", event.data.errorMessage);
	            }
	            else if (type === "set_environment_variable") {
	                pm.mediator.trigger("setEnvironmentVariable", event.data.variable);
	            }
	            else if (type === "set_global_variable") {
	                pm.mediator.trigger("setGlobalVariable", event.data.variable);
	            }
	            else if (type === "clear_environment_variables") {
	                pm.mediator.trigger("clearEnvironmentVariables");
	            }
	            else if (type === "clear_global_variables") {
	                pm.mediator.trigger("clearGlobalVariables");
	            }
	            else if (type === "clear_environment_variable") {
	                pm.mediator.trigger("clearEnvironmentVariable", event.data.variable);
	            }
	            else if (type === "clear_global_variable") {
	                pm.mediator.trigger("clearGlobalVariable", event.data.variable);
	            }
	            else if (type === "set_next_request") {
	                pm.mediator.trigger("set_next_request", event.data.requestName);
	            }
	        });

	        pm.mediator.on("resultError", this.showTestScriptError, this);
	        pm.mediator.on("runRequestTest", this.runTest, this);
	    },

	    showTestScriptError: function(msg) {
	        $("#test-error").show().text("There was an error evaluating the test script. " + msg).css('display','inline-block');
	    }
	});

	module.exports = Tester;


/***/ },

/***/ 6:
/***/ function(module, exports, __webpack_require__) {

	var Request = __webpack_require__(7).Request;
	var PmCollection = __webpack_require__(10);
	var Environment = __webpack_require__(11);

	var TestRun = Backbone.Model.extend({
		defaults: function() {
			return {
				"id": "",
				"name": "Default",
				"timestamp": 0,
				"collection_id": "",
				"folder_id": "",
				"target_type": "",
				"environment_id": "",
				"delay": 0,
				"count": 0,
				"collection": null,
				"folder": null,
				"environment": null,
				"globals": null,
				"results": null,
				"nextRequestName": null
			}
		},

		  initialize: function() {
					pm.mediator.on("set_next_request", this.setNextRequest, this);
	        pm.appWindow.trigger("registerInternalEvent", "allRunsDeleted", this.onAllRunsDeleted, this);
	    },

			setNextRequest: function(requestName) {
					this.set("nextRequestName", requestName);
			},

	    onAllRunsDeleted: function() {
	        this.deleteAllTestRuns();
	    },


	    getAsJSON: function() {
			var collection;

			var obj = {
				"id": this.get("id"),
				"name": this.get("name"),
				"timestamp": this.get("timestamp"),
				"collection_id": this.get("collection_id"),
				"folder_id": this.get("folder_id"),
				"target_type": this.get("target_type"),
				"environment_id": this.get("environment_id"),
				"count": this.get("count"),
				"collection": null,
				"folder": this.get("folder"),
				"globals": this.get("globals"),
				"results": this.get("results"),
				"environment": null
			};

			if (this.get("collection")) {
				obj["collection"] = this.get("collection").getAsJSON();
			}

			if (this.get("environment")) {
				obj["environment"] = this.get("environment").toJSON();
			}

			return obj;
		},

		getTestsAsArray: function(tests, counts) {
			var d = "";
			var success = 0;
			var failure = 0;
			var total = 0;

			var testsArray = [];
			var r;
			var obj;

			for (var key in tests) {
				if (tests.hasOwnProperty(key)) {

					if (tests[key] && counts[key]["fail"] == 0) {
						r = "pass";
					}
					else {
						r = "fail";
					}

					obj = {
						key: key,
						value: r
					}

					if (counts) {
						obj["passCount"] = counts[key]["pass"];
						obj["failCount"] = counts[key]["fail"];
					}

					testsArray.push(obj);
				}
			}

			return testsArray;
		},

		getTestKeysAsArray: function(tests) {
			var keys = [];
			for (var key in tests) {
				if (tests.hasOwnProperty(key)) {
					keys.push(key);
				}
			}

			return keys;
		},

		// Do not store external data
		start: function(data) {
			var collection = this.get("collection");
			var folder = this.get("folder");
			var target_type = this.get("target_type");
			var environment = this.get("environment");
			var globals = this.get("globals");

			if(!collection) {
				pm.alerts.error("Please select a collection or folder to run");
				return;
			}

			// Set up environment and globals
			if (environment) {
				// console.log("TESTRUNNER: Setting environment", environment);
				pm.envManager.setEnvironment(environment);
			}
			else {
				pm.envManager.disableEnvironment();
			}

			pm.envManager.setGlobals(globals);

			// Filter executable requests
			var allRequests;

			if (target_type === "folder") {
				allRequests = collection.getRequestsInFolder(folder);
			}
			else {
				allRequests = collection.getRequestsInCollection();
			}

			this.addToDataStore(this.getAsJSON());
			this.runRequests(allRequests, this.get("count"), data, this.get("delay"));
		},

		addToDataStore: function(testRun) {
			pm.indexedDB.testRuns.addTestRun(testRun, function(data) {
			});
		},

		updateInDataStore: function(testRun) {
			pm.indexedDB.testRuns.updateTestRun(testRun, function(data) {
			});
		},

		deleteFromDataStore: function(id) {
			pm.indexedDB.testRuns.deleteTestRun(id, function() {
			});
		},

		runRequests: function(requests, runCount, data, delay) {
			var externalData = data;

			var model = this;

			var currentRunCount = 0;
			pm.runCount = runCount;

			this.set("requests", requests);
			var requestCount = requests.length;
			var currentRequestIndex = 0;
			var testRequest;
			//var request;
			var response;

			var result;

			//var results = [];
			pm.results = [];


			//pm.results = [];
			this.set("results", pm.results);

			function setPassFailTestCounts(result, newResult) {
				for(key in newResult.tests) {
					if (newResult.tests.hasOwnProperty(key)) {
						if (result["testPassFailCounts"].hasOwnProperty(key)) {
							if (!!newResult.tests[key]) {
								passedCount = result["testPassFailCounts"][key]["pass"] + 1;
								failedCount = result["testPassFailCounts"][key]["fail"];
							}
							else {
								passedCount = result["testPassFailCounts"][key]["pass"];
								failedCount = result["testPassFailCounts"][key]["fail"] + 1;
							}

							result["testPassFailCounts"][key] = {
								"pass": passedCount,
								"fail": failedCount
							};
						}
						else {
							if (!!newResult.tests[key]) {
								passedCount = 1;
								failedCount = 0;
							}
							else {
								passedCount = 0;
								failedCount = 1;
							}

							result["testPassFailCounts"][key] = {
								"pass": passedCount,
								"fail": failedCount
							};
						}
					}
				}
			}

			function addResult(newResult, forcePurge) {
				var index = arrayObjectIndexOf(pm.results, newResult.id, "id");
				var r;
				var passedCount = 0;
				var failedCount = 0;

				if (index >= 0) {
					r = pm.results[index];
					r["responseCode"] = newResult.responseCode;
					r["totalTime"] += newResult.time;
					r["tests"] = newResult.tests;

					setPassFailTestCounts(r, newResult);

					result["showCount"] = true;

					r["times"].push(newResult.responseTime);
					r["allTests"].push(newResult.tests);

					// TODO through the tests array, calculate which counts of failures and successes of tests
					pm.mediator.trigger("updateResult", r, model);
				}
				else {
					result["times"] = [newResult.responseTime];

					if ("tests" in newResult) {
						result["allTests"] = [newResult.tests];
						setPassFailTestCounts(result, newResult);
					}
					else {
						// result["testPassFailCounts"] = [];
						result["allTests"] = [];
					}

					pm.results.push(result);
					pm.mediator.trigger("addResult", result, model);
				}
			}

			function onSentRequest(request) {
				result = {
					"id": request.get("id"),
					"name": request.get("name"),
					"url": request.get("url"),
					"totalTime": 0,
					"responseCode": {
						"code": 0,
						"name": "",
						"detail": ""
					},
					"tests": {},
					"testPassFailCounts": {},
					"times": [],
					"allTests": []
				}
				pm.lastResult = _.cloneDeep(result);
			}

			function onLoadResponse(response) {
				testRequest = pm.lastTestRequest;
				result["responseCode"] = response.get("responseCode");
				result["time"] = response.get("time");

				var tests = testRequest.get("tests");

				var externalDataVariables = {};
				if (externalData) {
					if (externalData.length > 0) {
						if (currentRunCount < externalData.length) {
							externalDataVariables = externalData[currentRunCount];
						}
					}
				}

				if (tests) {
					testRequest.set("response", response);
					pm.mediator.trigger("runRequestTest", testRequest, externalDataVariables, currentRunCount, onFinishTests);
				}
				else {
					finishRequestRun();
				}

			}


			function onFinishTests(data, testResultType) {
				if (testResultType === "result") {
					result["tests"] = data;
					finishRequestRun();
				}
				else if (testResultType === "error") {
					result["tests"] = {"Error": false};
					pm.alerts.error("Something is wrong with your test scripts. Please fix them in the editor first. Message: " + data, {
	          dedupeId: 'test-error'
	        });
					model.updateInDataStore(model.getAsJSON());
					pm.mediator.trigger("finishedTestRun", model);
				}
			}

			function finishRequestRun() {
				result.id = testRequest.get("id");
				result.url = testRequest.get("url");
				result.name = testRequest.get("name");
				addResult(result);
				var nextRequestName = model.get("nextRequestName");

				if (currentRequestIndex < requestCount - 1 && nextRequestName===null) {
					// console.log("TESTRUNS:finishRequestRun, Send another request");
					currentRequestIndex += 1;
					sendRequest(currentRequestIndex, currentRunCount);
				}
				else {
					currentRunCount += 1;

					if(nextRequestName === "none") {
						model.updateInDataStore(model.getAsJSON());
						pm.mediator.trigger("finishedTestRun", model);
						currentRunCount = 0;
						currentRequestIndex = 0;
					}
					else if(nextRequestName !== null) {
						//runMode=custom.
						var indexToRun = -1;
						indexToRun = _.findIndex(requests, function(req) {
							return req.name === nextRequestName;
						});
						if(indexToRun) {
							model.set("nextRequestName", null);
							sendRequest(indexToRun);
						}
					}
					else {
						if (currentRunCount >= pm.runCount) {
							// console.log("TESTRUNS:finishRequestRun, Finish run");
							model.updateInDataStore(model.getAsJSON());
							pm.mediator.trigger("finishedTestRun", model);
							currentRunCount = 0;
							currentRequestIndex = 0;
						}
						else {
							// console.log("TESTRUNS:finishRequestRun, Create another run");
							// Re-initiate run
							currentRequestIndex = 0;
							sendRequest(0, currentRunCount);
						}
					}
				}
			}
			function sendRequest(index, thisCount) {
				setTimeout(function() {
					// Set variables in envManager here
					var externalDataVariables = {};
					if (externalData) {
						if (externalData.length > 0) {
							if (currentRunCount < externalData.length) {
								externalDataVariables = externalData[currentRunCount];
								pm.envManager.setExternalDataVariables(externalData[currentRunCount]);
							}
						}
					}

					testRequest = new Request();
					testRequest.loadRequest(requests[index], true, false, true);
					if(testRequest.get("url") == "") {
						//NO URL for request
						pm.alerts.error("The URL for request " + testRequest.get("name") + " is blank.");
						$("a#new-test-run").click();
						return;
					}
					//request.disableHelpers(); // TODO Should get rid of this call later

					//add helper data
					var currentHelper = testRequest.get("currentHelper") || "normal";
					var helperAttributes = testRequest.get("helperAttributes");

					if(currentHelper!=="normal") {
						var helperModel = pm.helperModel.get(currentHelper);
						if(helperModel) {
							for (var property in helperAttributes) {
								if (helperAttributes.hasOwnProperty(property)) {
									helperModel.set(property,helperAttributes[property]);
								}
							}

							if(currentHelper === "oAuth1") {
								helperModel.generateHelper();
							}

							try {
								helperModel.processCustomRequest(testRequest);
							}
							catch(e) {
								console.error("Could not process helper for currentHelper: " , currentHelper);
							}
						}
					}

					// Attach listeners for request and response
					testRequest.on("sentRequest", onSentRequest);
					response = testRequest.get("response");

					response.on("loadResponse", onLoadResponse);
					pm.lastTestRequest = testRequest;

					//have a separate listener for test runner requests
					if(pm.settings.getSetting("useInterceptor")) {
						pm.mediator.once("onMessageExternal", function(request, sender, sendResponse) {
					        if(request.postmanMessage) {
					            if (request.postmanMessage.type === "xhrResponse") {
					                var xhrResponse = request.postmanMessage.response;
					                var xhrCookies = request.postmanMessage.cookies;
					                var messageGuid = request.postmanMessage.guid;
				                    response.set("cookies", xhrCookies);

				                    xhrResponse.getResponseHeader = function(header) {
				                        return xhrResponse.headers[header];
				                    }

				                    xhrResponse.getAllResponseHeaders = function() {
				                        return xhrResponse.rawHeaders;
				                    }

				                    xhrResponse.fromInterceptor = true;
				                    _.bind(response.load, testRequest)(xhrResponse, null);
					            }
					            else if (request.postmanMessage.type === "xhrError") {
					                var messageGuid = request.postmanMessage.guid;

					                if (messageGuid === testRequest.get("messageGuid")) {
					                    var xhrError = request.postmanMessage.error;
					                    var errorUrl = pm.envManager.getCurrentValue(testRequest.get("url"));
					                    response.trigger("failedRequest", errorUrl, null);
					                }
					            }
					        }
					    });
					}
					
	                var thisRequest = testRequest;
	                //add a callback to restore env vars
	                testRequest.get("prScripter").runPreRequestScript(testRequest, externalDataVariables, thisCount, function(data, result) {
		                thisRequest.get("body").setDataForXHR();
	                    thisRequest.send("text", "display", true);
	                });
				}, delay);
			}

			// Initiate request
			if (requestCount > 0) {
				sendRequest(0, 0);
			}
			else {
				model.updateInDataStore(model.getAsJSON());
				pm.mediator.trigger("finishedTestRun", model);
			}
		},

		getPassCount: function() {
			// Results for all requests
			var results = this.get("results");

			if (!results) {
				return {
					"passed": 0,
					"total": 0,
					"percentage": 0
				};
			}

			var count = results.length;

			var r;
			var allTests;
			var allTestCount;
			var tests;

			var passedTestCount = 0;
			var totalTestCount = 0;

			for(var i = 0; i < count; i++) {
				r = results[i];
				//because of my sync madness
				if(typeof r === "string") {
					try {
						r = JSON.parse(r);
					}
					catch(e) {
						throw e;
					}
				}
				allTests = r["allTests"];
				allTestCount = allTests.length;

				if (allTestCount > 0) {
					for(var k = 0; k < allTestCount; k++) {
						tests = allTests[k];

						for(var key in tests) {
							if (tests.hasOwnProperty(key)) {
								val = tests[key];
								totalTestCount++;

								if (!!val) {
									passedTestCount++;
								}
							}
						}
					}
				}
			}

			var percentage = Math.round(passedTestCount/totalTestCount * 100);

			return {
				"passed": passedTestCount,
				"failed": totalTestCount - passedTestCount,
				"total": totalTestCount,
				"percentage": percentage
			};
		},

		getAverageResponseTime: function() {
			var results = this.get("results");

			if (!results) {
				return 0;
			}

			var count = results.length;

			var r;
			var totalTime = 0;

			for(var i = 0; i < count; i++) {
				r = results[i];
				totalTime += r["time"];
			}

			var average = Math.round(totalTime/count, 2);

			return average;
		}
	});

	// TODO Reload collection data when something is updated in the requester window
	var TestRuns = Backbone.Collection.extend({
		model: TestRun,

		comparator: function(a, b) {
		    var counter;

		    var aTimestamp = a.get("timestamp");
		    var bTimestamp = b.get("timestamp");

		    return aTimestamp < bTimestamp;
		},

		initialize: function() {
			var model = this;

			var areEnvironmentsLoaded = false;
			var areCollectionsLoaded = false;

			pm.mediator.on("loadedEnvironments", function() {
				areEnvironmentsLoaded = true;

				if (areEnvironmentsLoaded === true && areCollectionsLoaded === true) {
					model.loadAllTestRuns();
				}
			});
			pm.mediator.on("loadedCollections", function() {
				areCollectionsLoaded = true;

				if (areEnvironmentsLoaded === true && areCollectionsLoaded === true) {
					model.loadAllTestRuns();
				}
			});

			pm.mediator.on("loadTestRunFromId", this.loadTestRunStats, this);
			pm.mediator.on("loadTestRunFromIdWithoutShowing", this.loadTestRunStatsWithoutShowing, this);
			pm.mediator.on("startTestRun", this.onStartTestRun, this);
			pm.mediator.on("showTestRun", this.onShowTestRun, this);
			pm.mediator.on("showTestRunWithoutShowing", this.onShowTestRunWithoutShowing, this);

	        pm.mediator.on("finishedTestRun", this.sendTestRunForSync, this);
	        pm.mediator.on("deleteTestRun", this.deleteTestRunForSync, this);
	        pm.appWindow.trigger("registerInternalEvent", "testRunAddedRemotely", this.onTestRunAddedRemotely, this);
	        pm.appWindow.trigger("registerInternalEvent", "testRunDeletedRemotely", this.onTestRunDeletedRemotely, this);
		},

	  sendTestRunForSync: function(model) {
	    	//also show the newman link
	    	$("#small-newman-message").show();

	        if(!model) {
	            return;
	        }
	        var testRun = model.toJSON();
	        var testRunToSend = {};
	        if(testRun.collection && testRun.folder) {
	            testRunToSend["name"] = testRun.collection.get("name")+"/"+testRun.folder.name;
	            testRunToSend["target_type"] = "folder";
	            testRunToSend["collection"] = testRun.collection_id;
	            testRunToSend["folder"] = testRun.folder_id;
	        }
	        else if(testRun.collection) {
	            testRunToSend["name"] = testRun.collection.get("name");
	            testRunToSend["target_type"] = "collection";
	            testRunToSend["collection"] = testRun.collection_id;
	        }
	        else {
	            testRunToSend["name"] = "Test run for collection " + testRun.collection_id;
	            testRunToSend["target_type"] = "collection";
	            testRunToSend["collection"] = testRun.collection_id;
	        }

	        testRunToSend["environment"] = testRun.environment_id;
	        if(testRunToSend.environment === "0") {
	            delete testRunToSend.environment;
	        }

	        testRunToSend.count = testRun.count;
	        testRunToSend.delay = testRun.delay;
	        testRunToSend.results = JSON.stringify(testRun.results);
	        testRunToSend.id = testRun.id;
	        testRunToSend.owner = pm.user.id;

	        var message = {
	            "id": "test_runner",
	            "event": "testRunAdded",
	            "object": testRunToSend
	        };

	        if(postman_electron) {
	        	return;
	        }
	        pm.appWindow.sendMessageWrapper(message);
	    },

	    deleteTestRunForSync: function(id) {
	        var message = {
	            "id": "test_runner",
	            "event": "testRunDeleted",
	            "object": {id: id}
	        };
	        if(postman_electron) {
	        	return;
	        }

	        pm.appWindow.sendMessageWrapper(message);
	    },

	    onTestRunAddedRemotely: function(runJson) {
	        this.importTestRunData(runJson);
	        //console.log("Run added remotely");
	    },

	    onTestRunDeletedRemotely: function(msg) {
	        this.deleteTestRun(msg.id);
	        //console.log("Run removed remotely")
	    },

		onShowTestRun: function(testRun) {
			pm.mediator.trigger("loadTestRun", testRun, this);
		},

		onShowTestRunWithoutShowing: function(testRun) {
			//pm.mediator.trigger("loadTestRunWithoutShowing", testRun, this);
		},

		getAsJSON: function() {
			var runs = [];

			for(var i = 0; i < this.models.length; i++) {
				runs.push(this.models[i].getAsJSON());
			}

			return runs;
		},

		loadTestRunStats: function(id) {
			var testRun = this.get(id);
			pm.mediator.trigger("showTestRun", testRun);
		},

		loadTestRunStatsWithoutShowing: function(id) {
			var testRun = this.get(id);
			//pm.mediator.trigger("showTestRunWithoutShowing", testRun);
		},

	    deleteAllTestRuns: function() {
	        this.reset();
	    },

	    deleteTestRun: function(id) {
	        var collection = this;

	        pm.indexedDB.testRuns.deleteTestRun(id, function() {
	            collection.remove(id);
	            pm.mediator.trigger("deleteTestRun", id);
	        });
	    },

	    deleteTestRunFromSync: function(id) {
	        var collection = this;
	        collection.remove(id);
	        pm.mediator.trigger("deleteTestRun", id);
	    },


	    importTestRunData: function(testRunParams) {
	        var existingRun = this.get(testRunParams.id);

	        if (!existingRun) {
	            var testRun = new TestRun(testRunParams);

	            this.add(testRun);

	            testRun.set("collection", new PmCollection(testRunParams.collection));
	            testRun.set("environment", new Environment(testRunParams.environment));

	            testRun.addToDataStore(testRunParams);

	            pm.mediator.trigger("importedTestRun", testRun);
	        }
	    },

	    importTestRunDataFromSync: function(testRunParams) {
	        var existingRun = this.get(testRunParams.id);

	        if (!existingRun) {
	            var testRun = new TestRun(testRunParams);

	            this.add(testRun);

	            testRun.set("collection", new PmCollection(testRunParams.collection));
	            testRun.set("environment", new Environment(testRunParams.environment));

	            pm.mediator.trigger("importedTestRun", testRun);
	        }
	    },

		importTestRuns: function(files) {
			console.log(files);

			var collection = this;

	        // Loop through the FileList
	        for (var i = 0, f; f = files[i]; i++) {
	            var reader = new FileReader();

	            // Closure to capture the file information.
	            reader.onload = (function (theFile) {
	                return function (e) {
	                    // Render thumbnail.
	                    var data = e.currentTarget.result;
	                    try {
	                        var testRun = JSON.parse(data);
	                        collection.importTestRunData(testRun);
	                    }
	                    catch(e) {
	                        pm.mediator.trigger("failedTestRunImport");
	                    }
	                };
	            })(f);

	            // Read in the image file as a data URL.
	            reader.readAsText(f);
	        }
		},

		downloadTestRun:function (id) {
		    var testRun = this.get(id);

		    testRun.set("synced", false);

		    var collectionName = testRun.get("collection").get("name");
		    var name = collectionName + ".postman_test_run";
		    var type = "application/json";
		    var filedata = JSON.stringify(testRun.toJSON(), null, '\t');
		    pm.filesystem.saveAndOpenFile(name, filedata, type, function () {
	        pm.alerts.success('Saved test run to disk');
		    });
		},

		loadAllTestRuns: function() {

			var collection = this;
			var testRun;
			var environment_id;

			pm.indexedDB.testRuns.getAllTestRuns(function(testRuns) {
				var filteredRuns = [];

				for (var i = 0; i < testRuns.length; i++) {
					testRun = testRuns[i];
					environment_id = testRun.environment_id;

					testRun.collection = pm.collections.get(testRun.collection_id);
					testRun.environment = pm.envManager.get("environments").get(environment_id);

					if(testRun.results instanceof Array) {
						if(testRun.results.length>0) {
							if(typeof testRun.results[0] === "string") {
								testRun.results = JSON.parse(testRun.results[0]);
							}
						}
					}

					if (testRun.collection) {
						filteredRuns.push(testRun);
					}
				}

				collection.add(filteredRuns, { merge: true });
				pm.mediator.trigger("loadedAllTestRuns");
			});
		},

		onStartTestRun: function(params) {
			var files = params.files;
			var model = this;

			if(pm.isTesting) {
				if(params.customFileData) {
					params.data = this.getDataObjectFromStringAndType(params.customFileData, params.customFileFormat);
				}
				else {
					params.data = [];
				}
				this.startTestRun(params);
				return;
			}
			if (files.length > 0) {
				// TODO Only one file
				this.importDataFile(files[0], params.fileDataType, function(data) {
					params.data = data;

					console.log("Data loaded from file", params.data);

					pm.mediator.trigger("loadedDataFile");
					model.startTestRun(params);
				});
			}
			else {
				params.data = [];
				this.startTestRun(params);
			}
		},

		startTestRun: function(params) {
			console.log(params);
			console.log(params.data);

			var data = [];
			if (params.hasOwnProperty("data")) {
				data = params.data;
			}

			var collection_id = params["collection_id"];
			var folder_id = params["folder_id"];
			var target_type = params["target_type"];
			var environment_id = params["environment_id"];
			var count = params["count"];
			var delay = params["delay"];

			var collection = pm.collections.get(collection_id);
			var folder;

			if (folder_id !== "0" && folder_id !== 0) {
				folder = collection.getFolderById(folder_id);
			}

			var environment;

			if (environment_id !== "0") {
				environment = pm.envManager.get("environments").get(environment_id);
			}

			var globals = pm.envManager.get("globals").get("globals");

			var testRunParams = {
				"id": guid(),
				"name": "Default",
				"timestamp": new Date().getTime(),
				"collection_id": collection_id,
				"folder_id": folder_id,
				"target_type": target_type,
				"environment_id": environment_id,
				"count": count,
				"delay": delay,
				"collection": collection,
				"folder": folder,
				"environment": environment,
				"globals": globals
			};

			var testRun = new TestRun(testRunParams);
			pm.mediator.trigger("startedTestRun", testRun);
			testRun.start(data);
			this.add(testRun);
		},

		getPreviousRuns: function(testRun) {
			var count = this.length;
			var run;

			var targetCollectionId = testRun.get("collection_id");
			var targetFolderId = testRun.get("folder_id");
			var targetEnvironmentId = testRun.get("environment_id");
			var targetId = testRun.get("id");

			var itemCollectionId;
			var itemFolderId;
			var itemEnvironmentId;

			var matchedRuns = [];

			for(var i = 0; i < count; i++) {
				run = this.models[i];

				itemEnvironmentId = run.get("environment_id");
				itemFolderId = run.get("folder_id");
				itemCollectionId = run.get("collection_id");
				itemId = run.get("id");

				if (itemCollectionId === targetCollectionId
					&& itemEnvironmentId === targetEnvironmentId
					&& itemFolderId == targetFolderId
					&& itemId !== targetId) {
					matchedRuns.push(run);
				}
			}

			return matchedRuns;
		},

		getDataObjectFromStringAndType: function(data, fileDataType) {
			if (fileDataType === "json") {
				var object = JSON.parse(data);
				if(!(object instanceof Array)) {
					throw "The JSON must be an array";
				}
				return object;
			}
			else if (fileDataType === "csv") {
				var object = [];
				var csvArray = CSV.csvToArray(data);

				console.log("DEBUG: Loaded CSV data", csvArray);

				if (csvArray.length > 0) {
					var keys = csvArray[0];
					var numKeys = keys.length;
					var count = csvArray.length;

					for (j = 0; j < numKeys; j++) {
						if(typeof keys[j] === "string") {
							keys[j] = keys[j].trim();
						}
					}

					for(i = 1; i < count; i++) {
						kvpair = {};
						if(csvArray[i].length!==numKeys) {
							throw "Each row must have an equal number of columns"
						}
						for (j = 0; j < numKeys; j++) {
							kvpair[keys[j]] = csvArray[i][j];
						}

						object.push(kvpair);
					}
				}

				return object;
			}
			else {
				throw "Invalid format"
			}
		},

		loadDataFromFile: function(data, fileDataType, callback, errorCallback) {
			if (callback) {
				var object;
				var kvpair;
				var i, j;

				try {

					if (fileDataType === "json" || fileDataType === "csv") {
						object = this.getDataObjectFromStringAndType(data, fileDataType);
						callback(object);
					}
					else {
						//Wrong format - not JSON or CSV
						pm.alerts.error("Unable to determine file format. Please select JSON or CSV");
						errorCallback();
					}
				}
				catch (e) {
					pm.alerts.error("Data file format is not right: " + e);
					errorCallback();
				}

			}
		},

		importDataFile: function(file, fileDataType, callback) {
			var model = this;

		    var reader = new FileReader();

		    // Closure to capture the file information.
		    reader.onload = (function (theFile) {
		        return function (e) {
		            model.loadDataFromFile(e.currentTarget.result, fileDataType, callback, function(){
						$("#test-data-file-remove-container").css("display", "block");
		            });
		        };
		    })(file);

		    // Read in the image file as a data URL.
		    reader.readAsText(file);
		}
	});

	module.exports = TestRuns;


/***/ },

/***/ 7:
/***/ function(module, exports, __webpack_require__) {

	var RequestBody = __webpack_require__(8);
	var PreRequestScripter = __webpack_require__(9);

	var Request = Backbone.Model.extend({
	    defaults: function() {
	        return {
	            id:"",
	            url:"",
				folderId: null,
	            pathVariables:{},
	            urlParams:{},
	            name:"",
	            description:"",
	            descriptionFormat:"markdown",
	            bodyParams:{},
	            headers:[],
	            method:"GET",
	            dataMode:"params",

	            transformedUrl:"",

	            isFromCollection:false,
	            collectionRequestId:"",
	            methodsWithBody:["POST", "PUT", "PATCH", "DELETE", "LINK", "UNLINK", "LOCK", "PROPFIND", "VIEW"],
	            areListenersAdded:false,
	            startTime:0,
	            endTime:0,
	            xhr:null,
	            editorMode:0,
	            responses:[],
	            body:null,
	            data:null,
	            previewHtml:"",
	            curlHtml:"",
	            preRequestScript:null,
	            tests:null,
	            sandboxFiles: "",
	            testResults:null,
	            testErrors:null,
	            areHelpersEnabled:true,
	            selectedHelper:null,
	            sendMethod: "xhr",

	            //FOR TABS:
	            uiState: {},

	            jsonIsCurrent: false,
	            xmlIsCurrent: false,
	            htmlIsCurrent: false,
	            jsonPreParse: "",
	            xmlPreParse: "",
	            htmlPreParse: "",
	            jsonSearchString: "",
	            xmlSearchString: "",
	            htmlSearchString: "",
	            inHtmlMode: false,
	            write: true,


	        };
	    },

	    // Fixed
	    initialize: function(firstRequest) {
	        if(typeof firstRequest === "undefined") {
	            firstRequest = false;
	        }

	        var requestBody = new RequestBody();
	        var preRequestScripter = new PreRequestScripter();
	        var response = new Response();

	        this.set("body", requestBody);
	        this.set("prScripter", preRequestScripter);
	        this.set("response", response);

	        this.set("uiState", {
	            areHeadersOpen: false,
	            areUrlParamsOpen: false,
	            areRequestMetaOpen: true,
	            activeRequestTab: "auth",
	            waitingForInterceptorResponse: false,
	            waitingForResponse: false
	        });

	        //map from interceptor messageId to tabId
	        this.set("interceptorTabMap", {});

	        this.on("cancelRequest", this.onCancelRequest, this);
	        this.on("startNew", this.onStartNew, this);
	        this.on("send", this.onSend, this);

	        response.on("finishedLoadResponse", this.onFinishedResponseLoaded, this);

	        pm.mediator.on("updateCollectionRequest", this.checkIfCurrentRequestIsUpdated, this);

	        if(!pm.hasRequestInitializedOnce) {
	            pm.mediator.on("addRequestURLParam", this.onAddRequestURLParam, this);
	            pm.mediator.on("addRequestHeader", this.onAddRequestHeader, this);
	            //add urlparams / header to the current request
	            pm.mediator.on("loadRequest", this.loadRequest, this);
	            if(!pm.testRunner) {
	                pm.mediator.on("onMessageExternal", this.onExternalExtensionMessage, this);
	            }

	            pm.hasRequestInitializedOnce = true;
	        }
	    },

	    trimUrl: function() {
	        var url = this.get("url");
	        if(url) {
	            var newUrl = url.trim();
	            if(newUrl != url) {
	                this.set("url", newUrl);
	            }
	        }
	    },

	    setBlankValues: function() {
	    },

	    setResponse: function(responseJSON) {
	        var response = new Response(responseJSON);
	        response.on("finishedLoadResponse", this.onFinishedResponseLoaded, this);
	        this.set("response", response);
	    },

	    destroy: function() {
	    },

	    // Used to communicate with the Postman Interceptor
	    onExternalExtensionMessage: function(request, sender, sendResponse) {
	        // console.log("onExternalExtensionMessage called", request);
	        //if(this.get("waitingForInterceptorResponse")!==true) {
	            //console.log("Not expecting interceptor response. Ignoring. Cancel request may have been hit.");
	          //  return;
	        //}
	        //this.set("waitingForInterceptorResponse", false);
	        if(request.postmanMessage) {
	            if (request.postmanMessage.type === "xhrResponse") {
	                var xhrResponse = request.postmanMessage.response;
	                var xhrCookies = request.postmanMessage.cookies;
	                var messageGuid = request.postmanMessage.guid;
	                //console.log("Received interceptor response for msgId: " + messageGuid);

	                //if (messageGuid === this.get("messageGuid")) {
	                    this.get("response").set("cookies", xhrCookies);

	                    xhrResponse.getResponseHeader = function(header) {
	                        return xhrResponse.headers[header];
	                    }

	                    xhrResponse.getAllResponseHeaders = function() {
	                        return xhrResponse.rawHeaders;
	                    }

	                    var oldITMap = this.get("interceptorTabMap");
	                    var tabId = oldITMap[messageGuid];
	                    delete oldITMap[messageGuid];
	                    this.set("interceptorTabMap", oldITMap);
	                    xhrResponse.fromInterceptor = true;
	                    _.bind(this.get("response").load, this)(xhrResponse, tabId);
	                /*}
	                else {

	                }*/
	            }
	            else if (request.postmanMessage.type === "xhrError") {
	                var messageGuid = request.postmanMessage.guid;

	                if (messageGuid === this.get("messageGuid")) {
	                    var xhrError = request.postmanMessage.error;
	                    var errorUrl = pm.envManager.getCurrentValue(this.get("url"));
	                    this.get("response").trigger("failedRequest", errorUrl, tabId);
	                }
	            }
	        }
	    },

	    onAddRequestURLParam: function(param) {
	        var urlParams = this.getUrlParams();
	        var index = arrayObjectIndexOf(urlParams, "access_token", "key");

	        if (index >= 0) {
	            urlParams.splice(index, 1);
	        }

	        urlParams.push(param);
	        this.setUrlParamString(urlParams);
	        this.trigger("customURLParamUpdate");
	    },

	    onAddRequestHeader: function(param) {
	        this.setHeader(param.key, param.value);
	        this.trigger("customHeaderUpdate");
	    },

	    onGetRequest: function(callback) {
	        callback(this);
	    },

	    onCancelRequest: function() {
	        this.cancel();
	    },

	    onStartNew: function() {
	        this.startNew();
	    },

	    onSend: function(type, action) {
	        var thisRequest = this;
	        //add a callback to restore env vars
	        thisRequest.send(type, action);
	    },

	    onFinishedResponseLoaded: function(runTests) {
	        if(typeof runTests === "undefined") {
	            runTests = true;
	        }
	        if(!runTests) {
	            return;
	        }

	        var request = this;
	        var tests = this.get("tests");

	        //only execute the tests here for the testRunner
	        if (tests !== null && pm.testRunner) {
	            pm.mediator.trigger("runRequestTest", this, {}, 1, function(data, result) {
	                if (result === "result") {
	                    request.set("testResults", data);
	                    request.set("testErrors", null);
	                }
	                else if (result === "error") {
	                    //console.log("Error message", data);
	                    request.set("testResults", null);
	                    request.set("testErrors", data);
	                }

	                //Hack for github https://github.com/a85/POSTMan-Chrome-Extension/issues/889
	                pm.envManager.get("globals").trigger("change");
	            });
	        }
	        else {
	            this.set("testResults", null);
	            this.set("testErrors", null);
	        }

	    },

	    isMethodWithBody:function (method) {
	        return pm.methods.isMethodWithBody(method);
	    },

		packHeaders:function (headers) {
			var headersLength = headers.length;
			var paramString = "";
			for (var i = 0; i < headersLength; i++) {
				var h = headers[i];
	            var prefix = "";
				if(h.enabled === false) {
					prefix = "//";
				}
				if (h.name && h.name !== "") {
					paramString += prefix + h.name + ": " + h.value + "\n";
				}
			}

			return paramString;
		},

	    getHeaderValue:function (key) {
	        var headers = this.get("headers");

	        key = key.toLowerCase();
	        for (var i = 0, count = headers.length; i < count; i++) {
	            var headerKey = headers[i].key.toLowerCase();

	            if (headerKey === key) {
	                return headers[i].value;
	            }
	        }

	        return false;
	    },

	    saveCurrentRequestToLocalStorage:function () {
	        pm.settings.setSetting("lastRequest", this.getAsJson());
	    },

	    clearCurrentRequestFromStorage: function() {
	        pm.settings.setSetting("lastRequest", null);
	    },

	    getTotalTime:function () {
	        var totalTime = this.get("endTime") - this.get("startTime");
	        this.set("totalTime", totalTime);
	        return totalTime;
	    },

	    getPackedHeaders:function () {
	        return this.packHeaders(this.get("headers"));
	    },

	    unpackHeaders:function (data) {
	        if(data instanceof Array) {
	            return data; //in a sample response, data is already an array. No need to unpack
	            //fix for github #1597
	        }
	        if ((!data) || typeof data !== "string") {
	            return [];
	        }
	        else {
	            var vars = [], hash;
	            var hashes = data.split('\n');
	            var header;

	            for (var i = 0; i < hashes.length; i++) {
	                hash = hashes[i];
	                if (!hash) {
	                    continue;
	                }

	                var loc = hash.search(':');

	                if (loc !== -1) {
	                    var name = $.trim(hash.substr(0, loc));
	                    var enabled=true;
	                    if(name.indexOf("//")==0) {
	                        enabled = false;
	                        name = name.substring(2);
	                    }
	                    var value = $.trim(hash.substr(loc + 1));
	                    header = {
	                        "name":$.trim(name),
	                        "key":$.trim(name),
	                        "value":$.trim(value),
	                        "enabled":enabled,
	                        "description":headerDetails[$.trim(name).toLowerCase()]
	                    };

	                    vars.push(header);
	                }
	            }

	            return vars;
	        }
	    },

	    // Add Github bug number
	    decodeLink:function (link) {
	        return $(document.createElement('div')).html(link).text();
	    },

	    setPathVariables: function(params) {
	        this.set("pathVariables", params);
	    },

	    getPathVariables: function() {
	        return this.get("pathVariables");
	    },

	    getUrlParams: function() {
	        var params = getUrlVars(this.get("url"));
	        return params;
	    },

	    setUrlParams: function(params) {
	        this.set("urlParams", params);
	    },

		setUrlParamStringWithOptBlankValRemoval: function(params, silent, removeBlankParams, url) {
			if(!url) {
				url = this.get("url");
			}
			var paramArr = [];

			var existingUrlParams = {};
			if(url.split("?").length>1) {
				_.each(url.split("?")[1].split("&"), function(param) {
				    existingUrlParams[param.split("=")[0]] = param;
				});
				//this is an object { key: key=value, key2: key2=value2)
			}

			for (var i = 0; i < params.length; i++) {
				var p = params[i];
				if (p.key && p.key !== "") {
					p.key = p.key.replace(/&/g, '%26');
	                if(!p.value) {
	                    p.value="";
	                }
					p.value = p.value.replace(/&/g, '%26');
					if(removeBlankParams == false || p.value !== "") {
						var equals = (p.value.length===0)?"":"=";
						if(_.keys(existingUrlParams).indexOf(p.key)!==-1 && existingUrlParams[p.key].indexOf("=")!==-1) {
							//if the URL bar has this param with an = sign, don't remove it
							equals = "=";
						}
						paramArr.push(p.key + equals + p.value);
					}
				}
			}

			var baseUrl = url.split("?")[0];
			if (paramArr.length > 0) {
				url = baseUrl + "?" + paramArr.join('&');
			}
			else {
				//Has key/val pair
				if (url.indexOf("?") > 0 && url.indexOf("=") > 0) {
					url = baseUrl;
				}
			}

			if (silent) {
				this.set("url", url, { "silent": true });
				this.trigger("updateURLInputText");
			}
			else {
				this.set("url", url);
			}

		},

	    setUrlParamString:function (params, silent, url) {
	        this.setUrlParamStringWithOptBlankValRemoval(params, silent, false, url);
	    },

	    encodeUrl:function (url) {
	        var quesLocation = url.indexOf('?');

	        if (quesLocation > 0) {
	            var urlVars = getUrlVars(url);
	            var baseUrl = url.substring(0, quesLocation);
	            var urlVarsCount = urlVars.length;
	            var newUrl = baseUrl + "?";
	            for (var i = 0; i < urlVarsCount; i++) {
	                newUrl += (urlVars[i].key) + "=" + (urlVars[i].value) + "&";
	            }

	            newUrl = newUrl.substr(0, newUrl.length - 1);
	            return url;
	        }
	        else {
	            return url;
	        }
	    },

	    getFinalRequestUrl: function(url) {
	        var finalUrl;

	        finalUrl = replaceURLPathVariables(url, this.get("pathVariables"));
	        finalUrl = this.encodeUrl(finalUrl);
	        finalUrl = pm.envManager.getCurrentValue(finalUrl);
	        finalUrl = ensureProperUrl(finalUrl);

	        return finalUrl.trim();
	    },

	    prepareHeadersForProxy:function (headers) {
	        var count = headers.length;
	        for (var i = 0; i < count; i++) {
	            var key = headers[i].key.toLowerCase();
	            if (_.indexOf(pm.bannedHeaders, key) >= 0) {
	                headers[i].key = "Postman-" + headers[i].key;
	                headers[i].name = "Postman-" + headers[i].name;
	            }
	        }

	        return headers;
	    },

	    processUrl:function (url) {
	        var finalUrl = pm.envManager.getCurrentValue(url);
	        finalUrl = ensureProperUrl(finalUrl);
	        return finalUrl;
	    },

		splitUrlIntoHostAndPath: function(url) {
			var path = "";
			var host;

			var parts = url.split('/');
			host = parts[2];
			var prefix=parts[0]+"/"+parts[1]+"/";
			var partsCount = parts.length;
			for(var i = 3; i < partsCount; i++) {
				path += "/" + parts[i];
			}

			var quesLocation = path.indexOf('?');
			var hasParams = quesLocation >= 0 ? true : false;

			if (hasParams) {
				parts = getUrlVars(path);
				var count = parts.length;
				var encodedPath = path.substr(0, quesLocation + 1);
				for (var j = 0; j < count; j++) {
					var value = parts[j].value;
					var key = parts[j].key;
	//				value = encodeURIComponent(value);
	//				key = encodeURIComponent(key);
					var equals = (parts[j].equals)?"=":"";
					encodedPath += key + equals + value + "&";
				}

	            //only do this to remove the trailing '&' if params are present
	            if(count>0) {
	                encodedPath = encodedPath.substr(0, encodedPath.length - 1);
	            }

				path = encodedPath;
			}

			return { host: host, path: path, prefix: prefix};
		},

	    getAsObject: function(saveHelperToRequest) {
	        if(typeof saveHelperToRequest === "undefined") {
	            saveHelperToRequest = false;
	        }

	        var body = this.get("body");

	        var request = {
	            name: this.get("name"),
	            description: this.get("description"),
	            url: this.get("url"),
	            pathVariables: this.get("pathVariables"),
	            data: body.get("dataAsObjects"),
	            headers: this.getPackedHeaders(),
	            dataMode: body.get("dataMode"),
	            method: this.get("method"),
	            tests: this.get("tests"),
	            sandboxFiles: this.get("sandboxFiles"),
	            sendMethod: this.get("sendMethod"),
	            preRequestScript: this.get("preRequestScript"),
	            isFromCollection: this.get("isFromCollection"),
	            write: this.get("write"),
	            version: 2
	        };

	        //add helper data as well
	         /* TODO: Move this to getAsObject() */
	        var currentHelper = pm.helpers.getActiveHelperType();
	        var helperData, helperAttributes, saveHelperToRequest;
	        if(currentHelper!=="normal") {
	            helperData = pm.helpers.getHelper(currentHelper).attributes;
	            helperAttributes = this.getHelperProperties(helperData);
	            saveHelperToRequest = $("#request-helper-"+currentHelper+"-saveHelper").is(":checked");
	        }

	        if(saveHelperToRequest===false) {
	            currentHelper = "normal";
	            helperAttributes = {};
	        }

	        if(request.isFromCollection) {
	            request.id = this.get("id");
	            request.collectionId = this.attributes.collectionId;
	        }

	        request.currentHelper = currentHelper;
	        request.helperAttributes = helperAttributes;
	        return request;
	    },

	    getAsObjectForResponse: function() {
	        var body = this.get("body");

	        var request = {
	            name: this.get("name"),
	            description: this.get("description"),
	            url: this.get("url"),
	            pathVariables: this.get("pathVariables"),
	            data: body.get("dataAsObjects"),
	            headers: this.getPackedHeaders(),
	            dataMode: body.get("dataMode"),
	            method: this.get("method"),
	            tests: this.get("tests"),
	            isFromCollection: this.get("isFromCollection"),
	            write: this.get("write"),
	            version: 2
	        };

	        if(request.isFromCollection) {
	            request.id = this.get("id");
	            request.collectionId = this.attributes.collectionId;
	        }
	        return request;
	    },

	    trimJsonForResponse: function(json) {
	        var retVal = {
	            name: json.name,
	            description: json.description,
	            url: json.url,
	            pathVariables: json.pathVariables,
	            data: json.data,
	            headers: json.headers,
	            dataMode: json.dataMode,
	            method: json.method,
	            tests: json.tests,
	            isFromCollection: json.isFromCollection,
	            write: json.write,
	            version: json.version
	        };

	        return retVal;

	    },

	    getAsObjectForTab: function(saveHelperToRequest) {
	        var request = this.getAsObject(saveHelperToRequest);
	        var thisUiState = this.get("uiState");
	        request.id = this.get("id");
	        request.testResults = this.get("testResults");
	        request.testErrors = this.get("testErrors");
	        request.responses = this.get("responses");
	        request.transformedUrl = this.get("transformedUrl");
	        request.body = this.get("body").toJSON();
	        request.headers = this.getPackedHeaders(this.get("headers"));
	        request.transformedHeaders = this.get("transformedHeaders");
	        request.uiState = {};
	        request.uiState.areUrlParamsOpen = (thisUiState)?thisUiState.areUrlParamsOpen : false;
	        request.uiState.areRequestMetaOpen = (thisUiState)?thisUiState.areRequestMetaOpen : true;
	        request.uiState.areHeadersOpen = (thisUiState)?thisUiState.areHeadersOpen : false;
	        request.uiState.activeRequestTab = (thisUiState)?thisUiState.activeRequestTab : "headers";
	        request.uiState.waitingForInterceptorResponse = (thisUiState)?thisUiState.waitingForInterceptorResponse : false;
	        request.uiState.waitingForResponse = (thisUiState)?thisUiState.waitingForResponse : false;
	        request.responses = this.get("responses");
	        return request;
	    },

	    getAsJson:function () {
	        var body = this.get("body");

	        var request = {
	            url: this.get("url"),
	            pathVariables: this.get("pathVariables"),
	            data: body.get("dataAsObjects"), //TODO This should be available in the model itself, asObjects = true
	            headers: this.getPackedHeaders(),
	            dataMode: body.get("dataMode"),
	            method: this.get("method"),
	            tests: this.get("tests"),
	            sandboxFiles: this.get("sandboxFiles"),
	            sendMethod: this.get("sendMethod"),
	            version: 2
	        };

	        return JSON.stringify(request);
	    },

	    getHeadersAsKvPairs: function() {
	        var headers = this.get("headers");
	        var count = headers.length;
	        var kvpairs = {};
	        for(var i = 0; i < count; i++) {
	            kvpairs[headers[i].key] = headers[i].value;
	        }

	        return kvpairs;
	    },

	    getTransformedHeadersAsKvPairs: function() {
	        var headers = this.get("transformedHeaders");
	        var count = headers.length;
	        var kvpairs = {};
	        for(var i = 0; i < count; i++) {
	            kvpairs[headers[i].key] = headers[i].value;
	        }

	        return kvpairs;
	    },

	    saveFinalRequest: function(url, method, headers, data, dataMode) {
	        // this.set("finalRequest", finalRequest);
	    },

	    getForTester:function () {
	        var body = this.get("body");
	        var data = this.get("data");
	        var dataMode = body.get("dataMode");

	        body.loadData(this.get("dataMode"), data, true);

	        // TODO
	        // URL should be transformed data after variable processing
	        // Because function parameters and scripts might transform
	        // the data. Headers already have the final value

	        var transformedData = body.get("transformedData");

	        if (dataMode === "params") {
	            data = body.getDataAsKvPairs(transformedData);
	        }
	        else if (dataMode === "urlencoded") {
	            data = body.getDataAsKvPairs(transformedData);
	        }
	        else if (dataMode === "raw") {
	            data = transformedData;
	        }
	        else if (dataMode === "binary") {
	            data = "";
	        }

	        var request = {
	            url: this.get("transformedUrl"), //transformedURL is blank
	            data: data,
	            headers: this.getHeadersAsKvPairs(),
	            dataMode: body.get("dataMode"),
	            method: this.get("method"),
	            name: this.get("name"),
	            description: this.get("description")
	        };

	        if(this.get("transformedHeaders")) {
	            request.headers = this.getTransformedHeadersAsKvPairs();
	        }

	        return request;
	    },

	    getForPrscript:function () {
	        var body = this.get("body");
	        var data;
	        var dataMode = body.get("dataMode");

	        // TODO
	        // URL should be transformed data after variable processing
	        // Because function parameters and scripts might transform
	        // the data. Headers already have the final value

	        var oldData = body.get("data");

	        if (dataMode === "params") {
	            data = body.getDataAsKvPairs(oldData);
	        }
	        else if (dataMode === "urlencoded") {
	            data = body.getDataAsKvPairs(oldData);
	        }
	        else if (dataMode === "raw") {
	            data = oldData;
	        }
	        else if (dataMode === "binary") {
	            data = "";
	        }

	        var request = {
	            url: this.get("url"),
	            data: data,
	            headers: this.getHeadersAsKvPairs(),
	            dataMode: body.get("dataMode"),
	            method: this.get("method"),
	            name: this.get("name"),
	            description: this.get("description")
	        };

	        return request;
	    },

	    startNew:function () {
	        if(pm.tabManager) {
	            pm.tabManager.disableDirtyCheck();
	        }
	        var body = this.get("body");
	        var response = this.get("response");

	        // TODO RequestEditor should be listening to this
	        // TODO Needs to be made clearer
	        this.set("editorMode", 0);

	        var xhr = this.get("xhr");

	        if (xhr) {
	            xhr.abort();
	            this.unset("xhr");
	        }

	        this.set("url", "");
	        this.set("urlParams", {});
	        this.set("bodyParams", {});
	        this.set("name", "");
	        this.set("description", "");
	        this.set("headers", []);
	        this.set("method", "GET");
	        this.set("dataMode", "");
	        this.set("isFromCollection", false);
	        this.set("collectionRequestId", "");
	        this.set("responses", []);
	        this.set("sandboxFiles","");
	        this.set("sendMethod", "xhr");

	        this.set("tests", "");
	        this.set("preRequestScript", "");

	        body.set("data", "");

	        this.trigger("loadRequest", this);
	        response.trigger("clearResponse");
	    },

	    cancel:function () {

	        var response = this.get("response");
	        var useInterceptor = pm.settings.getSetting("useInterceptor");
	        if(useInterceptor) {
	            if(pm.testRunner) {
	                this.set("waitingForInterceptorResponse", false);
	                this.set("waitingForResponse", false);
	            }
	            var errorUrl = pm.envManager.getCurrentValue(this.get("url"));
	            response.trigger("failedRequest", errorUrl);
	        }
	        else {
	            var xhr = this.get("xhr");
	            if (xhr !== null) {
	                xhr.abort();
	            }
	        }

	        if(!pm.testRunner) {
	            pm.tabManager.cancelRequest(pm.tabManager.currentTabId);
	        }
	        response.clear();
	    },

		deleteSampleResponseByIdWithOptSync: function(responseId, toSync, callback) {
			var collectionRequestId = this.get("collectionRequestId");

			if (collectionRequestId) {
				var responses = this.get("responses");
				var location = arrayObjectIndexOf(responses, responseId, "id");
				responses.splice(location, 1);
				this.trigger("change:responses");
				pm.mediator.trigger("updateResponsesForCollectionRequestWithOptSync", collectionRequestId, responses, false);

				if(toSync) {
	                var owner = pm.collections.getOwnerForCollection(this.get("collectionId"));
					pm.syncManager.addChangeset("response","destroy",{id:responseId, owner: owner}, null, true);
				}
			}

	        //call callback regardless of whether i could delete the response or not
	        //for DELETEs, it doesn't matter if the callback is sent before the actual delete happens
	        if(typeof callback === "function") {
	            callback();
	        }
		},

	    deleteSampleResponseById: function(responseId) {
			this.deleteSampleResponseByIdWithOptSync(responseId, true);
	    },

	    loadSampleResponse: function(response) {
	        var responseRequest = {};
	        var toUseSavedRequest = false;

	        if(response.requestObject) {
	            //this works if requestObject is a stringified object
	            if(typeof response.requestObject === "string") {
	                try {
	                    var parsed = JSON.parse(response.requestObject);
	                    if(parsed.hasOwnProperty("url")) {
	                        responseRequest = JSON.parse(response.requestObject);
	                        toUseSavedRequest = true;
	                    }
	                }
	                catch(e) {
	                }
	            }
	            else if(response.requestObject && response.requestObject.hasOwnProperty("url")) {
	                responseRequest = response.requestObject;
	            }
	        }
	        if(!responseRequest.hasOwnProperty("url")) {
	            if(typeof response.request === "string") {
	                try {
	                    var parsed = JSON.parse(response.request);
	                    if(parsed.hasOwnProperty("url")) {
	                        responseRequest = JSON.parse(response.request);
	                        toUseSavedRequest = true;
	                    }
	                }
	                catch(e) {
	                }
	            }
	            else if(response.request && response.request.hasOwnProperty("url")) {
	                responseRequest = response.request;
	                toUseSavedRequest = true;
	            }
	        }
	        if(!responseRequest) {
	            responseRequest = {}; //to allow the response text to be den
	        }


	        if(toUseSavedRequest) {
	            this.set("url", responseRequest.url);
	            this.set("method", responseRequest.method);

	            this.set("headers", this.unpackHeaders(responseRequest.headers));

	            // This should trigger change events in Backbone
	            this.set("data", responseRequest.data);
	            this.set("dataMode", responseRequest.dataMode);

	            var body = this.get("body");

	            if(this.isMethodWithBody(responseRequest.method)) {
	                body.set("dataMode", responseRequest.dataMode);
	                body.loadData(responseRequest.dataMode, responseRequest.data, true);
	            }
	        }

	        this.trigger("loadRequest", this);

	        var r = this.get("response");
	        r.loadSampleResponse(this, response);
	    },

	    loadRequest: function(request, isFromCollection, isFromSample, isFromTestRunner, isFromTab) {

	        if(pm.tabManager)
	            pm.tabManager.disableDirtyCheck();

	        var body = this.get("body");
	        var response = this.get("response");

	        this.set("id", request.id);

	        this.set("write", request.write);

	        this.set("editorMode", 0);

	        this.set("url", request.url);

	        this.set("uiState", request.uiState || {});
	        this.set("testResults", request.testResults);
	        this.set("testErrors", request.testErrors);

	        if ("pathVariables" in request) {
	            this.set("pathVariables", request.pathVariables);
	        }
	        else {
	            this.set("pathVariables", []);
	        }

	        if ("currentHelper" in request) {
	            this.set("currentHelper", request.currentHelper);
	            this.set("helperAttributes", request.helperAttributes);
	        }
	        else {
	            this.set("currentHelper", "normal");
	            this.set("helperAttributes", []);
	        }

	        this.set("isFromCollection", isFromCollection);
	        this.set("isFromSample", isFromSample);

	        if(!request.method) {
	            request.method = "get";
	        }
	        this.set("method", request.method.toUpperCase());
	        this.set("sandboxFiles", request.sandboxFiles);
	        this.set("sendMethod", request.sendMethod);

	        /*Set defaults for unsaved requests*/
	        this.set("collectionId", null);
	        this.set("collectionRequestId", null);
	        this.set("responses", []);

	        if (isFromCollection) {
	            this.set("collectionId", request.collectionId);
	            this.set("collectionRequestId", request.id);

	            var cWrite = true;
	            var parentC = pm.collections.get(request.collectionId);
	            if(parentC) {
	                cWrite = parentC.get("write");
	                if(cWrite === false && (parentC.get("owner") !== pm.user.id)) {
	                    this.set("write", false);
	                }
	            }

	            if (typeof request.name !== "undefined") {
	                this.set("name", request.name);
	            }
	            else {
	                this.set("name", "");
	            }

	            if (typeof request.description !== "undefined") {
	                this.set("description", request.description);
	            }
	            else {
	                this.set("description", "");
	            }



	            if ("responses" in request) {
	                this.set("responses", request.responses);
	                if (request.responses) {
	                }
	                else {
	                    this.set("responses", []);
	                }
	            }
	            else {
	                this.set("responses", []);
	            }
	        }
	        else if (isFromSample) {
	        }
	        else {
	            this.set("name", "");
	        }

	        if(!isFromTab || pm.testRunner) {
	            if (request.hasOwnProperty("tests")) {
	                this.set("tests", request.tests);
	                this.set("testResults", null);
	            }
	            else {
	                this.set("tests", null);
	                this.set("testResults", null);
	            }
	        }
	        else {
	            if (request.hasOwnProperty("tests")) {
	                this.set("tests", request.tests);
	            }
	            else {
	                this.set("tests", null);
	            }
	        }


	        if (request.hasOwnProperty("preRequestScript")) {
	            this.set("preRequestScript", request.preRequestScript);
	        }
	        else {
	            this.set("preRequestScript", null);
	        }

	        if (typeof request.headers !== "undefined") {
	            this.set("headers", this.unpackHeaders(request.headers));
	        }
	        else {
	            this.set("headers", []);
	        }

	        response.clear();

	        if (this.isMethodWithBody(this.get("method"))) {
	            body.set("dataMode", request.dataMode);

	            var dataAsArray = true;
	            if(typeof request.data === "string") {
	                dataAsArray = false;
	            }
	            body.loadData(request.dataMode, request.data, dataAsArray);
	            /*if("version" in request) {
	                if(!request.version|| (request.version === 2)) {
	                    body.loadData(request.dataMode, request.data, true);
	                }
	                else {
	                    //body.loadData(request.dataMode, request.data, false);
	                    body.loadData(request.dataMode, request.data, true);
	                    //data is never a string
	                }
	            }
	            else {
	                //data is never a string
	                //body.loadData(request.dataMode, request.data, false);
	                body.loadData(request.dataMode, request.data, true);
	            }*/

	        }
	        else {
	            if("version" in request) {
	                if(request.version === 2) {
	                    body.loadData("raw", "", true);
	                }
	                else {
	                    body.loadData("raw","", false);
	                }
	            }
	            else {
	                body.loadData("raw","", false);
	            }
	            body.set("dataMode", "params");
	        }

	        response.trigger("clearResponse");
	        this.trigger("loadRequest", this);
	    },

	    loadRequestFromLink:function (link, headers) {
	        var request = new Request();
	        request.set("url", link);  //this.decodeLink(link)); This was added for Github#301. But why?
	        request.set("method", "GET");
	        request.set("isFromCollection", false);
	        if (pm.settings.getSetting("retainLinkHeaders") === true) {
	            if (headers) {
	                request.set("headers", headers);
	            }
	        }

	        pm.mediator.trigger("loadRequestInNewTab", request.getAsObjectForTab());
	    },

	    disableHelpers: function() {
	        this.set("areHelpersEnabled", false);
	    },

	    prepareForSending: function() {
	        this.set("startTime", new Date().getTime());
	    },

	    removeHeader: function(key) {
	        var headers = _.clone(this.get("headers"));

	        var contentTypeHeaderKey = key;
	        var pos = findPosition(headers, "key", contentTypeHeaderKey);
	        if (pos >= 0) {
	            headers.splice(pos, 1);
	            this.set("headers", headers);
	        }
	    },

	    setHeaderInArray: function(headers, key, value) {
	        var contentTypeHeaderKey = key;
	        var pos = findPositionCaseInsensitive(headers, "key", contentTypeHeaderKey);

	        if (value === 'text') {
	            if (pos >= 0) {
	                headers.splice(pos, 1);
	            }
	        }
	        else {
	            if (pos >= 0) {
	                headers[pos] = {
	                    key: contentTypeHeaderKey,
	                    type: "text",
	                    name: contentTypeHeaderKey,
	                    value: value
	                };
	            }
	            else {
	                headers.push({key: contentTypeHeaderKey, name: contentTypeHeaderKey, value: value});
	            }
	        }

	        return headers;
	    },

	    setHeader: function(key, value) {
	        var headers = _.clone(this.get("headers"));
	        if(!(headers instanceof Array)) {
	            headers = [];
	        }

	        var contentTypeHeaderKey = key;
	        var pos = findHeaderPosition(headers, "key", contentTypeHeaderKey);

	        if (value === 'text') {
	            if (pos >= 0) {
	                headers.splice(pos, 1);
	            }
	        }
	        else {
	            if (pos >= 0) {
	                headers[pos] = {
	                    key: contentTypeHeaderKey,
	                    type: "text",
	                    name: contentTypeHeaderKey,
	                    value: value
	                };
	            }
	            else {
	                headers.push({key: contentTypeHeaderKey, name: contentTypeHeaderKey, value: value});
	            }
	        }

	        this.set("headers", headers);
	    },

		getXhrHeaders: function() {
			var body = this.get("body");

			var headers = _.clone(this.get("headers"));

			if(pm.settings.getSetting("sendNoCacheHeader") === true) {
				this.setHeaderInArray(headers, "Cache-Control", "no-cache");
			}

			if(pm.settings.getSetting("sendPostmanTokenHeader") === true) {
				this.setHeaderInArray(headers, "Postman-Token", guid());
			}

			if (this.isMethodWithBody(this.get("method"))) {
				if(body.get("dataMode") === "urlencoded") {
	                //only add the content-type header if it doesn't already exist
	                if(_.map(_.map(headers,"name"), function(name){if(name) {return name.toLowerCase()}}).indexOf("content-type")===-1) {
					    this.setHeaderInArray(headers, "Content-Type", "application/x-www-form-urlencoded");
	                }
				}
			}

			if (pm.settings.getSetting("usePostmanProxy") === true) {
				headers = this.prepareHeadersForProxy(headers);
			}

			var i;
			var finalHeaders = [];
			for (i = 0; i < headers.length; i++) {
				var header = _.clone(headers[i]);
				if (!_.isEmpty(header.value) && !_.isEmpty(header.key) && header.enabled!==false) {
	                header.key = pm.envManager.getCurrentValue(header.key);
					header.value = pm.envManager.getCurrentValue(header.value);
					finalHeaders.push(header);
				}
			}

	        this.set("transformedHeaders", finalHeaders);
			return finalHeaders;
		},

	    getRequestBodyPreview: function() {
	        var body = this.get("body");
	        return body.get("dataAsPreview");
	    },

	    getRequestBodyForCurl: function() {
	        var body = this.get("body");
	        return body.getBodyForCurl();
	    },

	    getRequestAfterResolution: function() {
	        var ret = {};
	        var oldVal = this.getAsObject();
	        //getFinalRequestUrl replaces URL params
	        ret.url = pm.envManager.getCurrentValue(this.getFinalRequestUrl(oldVal.url));
	        ret.headers = pm.envManager.getCurrentValue(this.packHeaders(this.getXhrHeaders()));
	        try {
	            ret.data = JSON.parse(pm.envManager.getCurrentValue(JSON.stringify(oldVal.data)));
	        }
	        catch(e) {
	            //problem parsing :s
	            console.error("Error resolving request body data.");
	            ret.data = oldVal.data;
	        }
	        ret.method = oldVal.method;
	        ret.dataMode = oldVal.dataMode;
	        return ret;
	    },

	    getSerializedFormData: function(formData) {
	        // console.log("FormData is", formData);
	    },

	    getHelperProperties: function(helperAttributes) {
	        var ret = {};
	        for (var property in helperAttributes) {
	            if (helperAttributes.hasOwnProperty(property)) {
	                if(property==="request") continue;
	                ret[property]=helperAttributes[property];
	            }
	        }
	        return ret;
	    },

	    send:function (responseRawDataType, action, disableHistory) {
	        this.set("action", action);

	        var model = this;
	        var body = this.get("body");
	        var dataMode = body.get("dataMode");
	        var response = this.get("response");

	        var finalRequest;

	        var xhrTimeout = pm.settings.getSetting("xhrTimeout");

	        var originalUrl = this.get("url"); //Store this for saving the request
	        if(originalUrl.trim()=="") {
	            $("#url").addClass("error-url");
	            setTimeout(function() {
	                $("#url").removeClass("error-url");
	            },2000);
	            return;
	        }
	        var url = this.getFinalRequestUrl(this.get("url"));
	        var parts = this.splitUrlIntoHostAndPath(url);
	        url = parts.prefix+parts.host+parts.path;

	        // Saving for request test scripts
	        this.set("transformedUrl", url);

	        var method = this.get("method");
	        if(!method) {
	            method="get";
	        }
	        method = method.toUpperCase();
	        
	        if(this.get("isFromCollection")) {
	            var crid = this.get("collectionId")+"#"+this.get("collectionRequestId");
	        }

	        //Response raw data type is used for fetching binary responses while generating PDFs
	        if (!responseRawDataType) {
	            responseRawDataType = "text";
	        }

	        var headers = this.getXhrHeaders();
	        var numHeaders = headers?headers.length:0;

	        var useInterceptor = pm.settings.getSetting("useInterceptor");
	        var isMethodWithBody = this.isMethodWithBody(method);

	        if(postman_electron && this.get("sendMethod")==="node") {
	            var RequestOptions = this.generateRequestObject_webkit();
	            var responseObject = response;
	            var xhrWebkitRequest = requestLib(RequestOptions, function(error, response, body) {
	                console.log("ERROR: "); console.log(error);
	                console.log("response: "); console.log(response);
	                console.log("body: "); console.log(body);
	                var xhrResponse = model.convertNodeResponseToXHRResponse(response);
	                _.bind(responseObject.load, model)(xhrResponse);
	            });
	            this.setFormDataIfParamsInRequet_webkit(xhrWebkitRequest, RequestOptions);
	        }
	        else if (useInterceptor) {
	            if(postman_electron) {
	                console.log("Interceptor cannot be used in webkit apps");
	                return;
	            }

	            var remoteRequest = {
	                "url": url,
	                "xhrTimeout": xhrTimeout,
	                "method": method,
	                "dataMode": this.get("dataMode"),
	                "responseType": responseRawDataType,
	                "headers": headers
	            };

	            if (isMethodWithBody) {
	                var dataToBeSent = body.get("dataToBeSent");
	                remoteRequest.dataMode = dataMode;
	                if (dataMode === "params") {
	                    //this gives the resolved data ONLY in the request builder
	                    // in the runner, use transformed data because file uploads are not supported
	                    if(pm.isTestRunner) {
	                        remoteRequest.body = body.get("transformedData");
	                    }
	                    else {
	                        remoteRequest.body = body.get("serializedData");
	                        //add .type attribute to any file element
	                        if(_.isArray(remoteRequest.body)) {
	                            var numRows = remoteRequest.body.length;
	                            for(var k=0; k<numRows; k++) {
	                                if(remoteRequest.body[k].type==="file") {
	                                    try{
	                                        remoteRequest.body[k].mimeType=body.attributes.transformedData[k].mimeType
	                                    }
	                                    catch(e) {
	                                        console.error("Could not set MIME type for file upload through Interceptor");
	                                    } //ignore if mime setting fails
	                                }
	                            }
	                        }
	                    }
	                }
	                else if (dataMode === "binary") {
	                    remoteRequest.body = ArrayBufferEncoderDecoder.encode(dataToBeSent);
	                }
	                else {
	                    remoteRequest.body = dataToBeSent;
	                }
	            }

	            var msgId = guid();
	            this.set("messageGuid", msgId);
	            var followRedirect = pm.settings.getSetting("interceptorRedirect");

	            var message = {
	                "postmanMessage": {
	                    "guid": msgId,
	                    "type": "xhrRequest",
	                    "request": remoteRequest,
	                    "autoRedirect": followRedirect,
	                    "postmanAppId": getAppId()
	                }
	            };


	            //add the message-tab association to the map
	            if(!pm.testRunner) {
	                var oldITMap = this.get("interceptorTabMap");
	                if(!oldITMap) {
	                    oldITMap = {};
	                }
	                oldITMap[msgId] = pm.tabManager.currentTabId;
	                this.set("interceptorTabMap", oldITMap);
	            }

	            //console.log("Sending request message", message.postmanMessage.guid);
	            this.prepareForSending();
	            if(pm.testRunner) {
	                this.set("waitingForInterceptorResponse", true);
	            }
	            else {
	                pm.tabManager.sentRequest(pm.tabManager.currentTabId, this);
	                pm.mediator.trigger("resetRequest");
	            }

	            //no electron specific code required. Interceptor is only for Chrome
	            chrome.runtime.sendMessage(postman_interceptor_id, message, function(extResponse) {
	            });
	        }
	        else {
	            if(responseRawDataType === "sails") {
	                var urlParts = this.splitUrlIntoHostAndPath(url);
	                //console.log("Sending request thru sails");
	                var tempSocket =  io.connect(urlParts.prefix + urlParts.host, {'force new connection':true });

	                var headersObj = {};
	                _.each(headers,function(header) {headersObj[header.key]=header.value});

	                this.prepareForSending();
	                var oldData = body.get("dataToBeSent");
	                var data;
	                try {
	                    data = JSON.parse(oldData);
	                }
	                catch(e) {
	                   data=oldData;
	                }
	                tempSocket.on('connect', function() {
	                    tempSocket.request(urlParts.path, data, function(data, jwr) {
	                        _.bind(response.socketResponseLoad, model)(jwr);
	                        tempSocket.disconnect();
	                    }, method.toLowerCase());
	                });
	            }
	            //normal xhr
	            else {
	                //Start setting up XHR
	                var xhr = new XMLHttpRequest();
	                try {
	                    xhr.open(method, url, true); //Open the XHR request. Will be sent later

	                    if (xhrTimeout !== 0) {
	                        xhr.timeout = xhrTimeout;
	                    }

	                    if(pm.testRunner) {
	                        xhr.onreadystatechange = function(event) {
	                            _.bind(response.load, model)(event.target);
	                        };
	                    }
	                    else {
	                        xhr.onreadystatechange = function(tabId) {
	                            return function(event) {
	                                 _.bind(response.load, model)(event.target, tabId);
	                            }
	                        }(pm.tabManager.currentTabId);
	                        pm.tabManager.setResponseInTab(pm.tabManager.currentTabId, null);
	                        //console.log("Associating request with " + pm.tabManager.currentTabId);
	                    }

	                    xhr.responseType = responseRawDataType;

	                    for (var i = 0; i < headers.length; i++) {
	                        if(headers[i].key.toLowerCase()==="cookie" && postman_electron) {
	                            //set cookie for domain
	                            pm.cookieManager.addCookies(url, headers[i].value);
	                        }
	                        else {
	                            xhr.setRequestHeader(headers[i].key, headers[i].value);
	                        }
	                    }

	                    // TODO Set getForTester params here

	                    this.prepareForSending();
	                    // Prepare body
	                    if (isMethodWithBody) {
	                        var data = body.get("dataToBeSent");
	                        // console.log("Data to be sent", data);
	                        if (data === false) {
	                            xhr.send();
	                        }
	                        else {
	                            xhr.send(data);
	                        }
	                    } else {
	                        xhr.send();
	                    }
	                    if(!pm.testRunner) {
	                        pm.tabManager.sentRequest(pm.tabManager.currentTabId, this);
	                        pm.mediator.trigger("resetRequest");
	                    }

	                    this.unset("xhr");
	                    this.set("xhr", xhr);
	                }
	                catch (e) {
	                    //console.log("Error while sending request: " + e.message);
	                    pm.alerts.error('Error while sending request: ' + e.message);
	                    return;
	                }
	            }
	        }

		    //set helper data
		    var currentHelper, helperData, helperAttributes;
		    if(pm.helpers) {
			    //this will only be executed in the main window, not in the collection runner
			    currentHelper = pm.helpers.getActiveHelperType();
			    if(currentHelper!=="normal") {
				    helperData = pm.helpers.getHelper(currentHelper).attributes;
				    helperAttributes = this.getHelperProperties(helperData);
			    }
		    }
			else {
				currentHelper = this.get("currentHelper");
			    if(currentHelper!=="normal") {
				    helperAttributes = this.get("helperAttributes");
			    }
		    }

	        //Save the request
	        if (pm.settings.getSetting("autoSaveRequest") && !disableHistory) {
	            pm.history.addRequest(originalUrl,
	                method,
	                this.getPackedHeaders(),
	                body.get("dataAsObjects"),
	                body.get("dataMode"),
	                this.get("tests"),
	                this.get("preRequestScript"),
	                this.get("pathVariables"),
	                currentHelper,
	                helperAttributes,
	                this.get("sandboxFiles"),
	                this.get("sendMethod")
	            );
	        }

	        var response = this.get("response");
	        this.saveCurrentRequestToLocalStorage();
	        response.trigger("sentRequest", this);
	        this.trigger("sentRequest", this);
	    },

	    setFormDataIfParamsInRequet_webkit: function(unireq, RequestOptions) {
	        var data = this.get("body").get("data");
	        if(this.isMethodWithBody(RequestOptions.method) && this.get("body").get("dataMode")==="params" && data.length > 0) {
	            var form = unireq.form();
	            _.each(data, function(dataObj) {
	                if (dataObj.type === 'text') {
	                    form.append(dataObj.key, dataObj.value);
	                } else if (dataObj.type === 'file') {
	                    var loc = node_path.resolve(dataObj.value);
	                    if(!node_fs.existsSync(loc)) {
	                        console.log("FATAL - file not found. Not adding");
	                    }
	                    else {
	                        form.append(dataObj.key, node_fs.createReadStream(loc));
	                    }
	                }
	            });
	        }
	    },

	    generateRequestObject_webkit: function() {
	        var RequestOptions = {
	            url: this.get("transformedUrl"),
	            method: this.get("method").toUpperCase(),
	            headers: this.generateHeaderObj_webkit(this.getXhrHeaders()),
	            followAllRedirecs: true,
	            jar: true,
	            timeout: pm.settings.getSetting("xhrTimeout")
	        };

	        if(this.get("dataMode") === "raw" && this.get("rawModeData")) {
	            if(this.get("rawModeData") !== undefined) {
	                this.set("data", this.get("rawModeData"));
	            }
	        }

	        if(this.isMethodWithBody(RequestOptions.method)) {
	            var dataMode = this.get("body").get("dataMode");
	            var data = this.get("body").get("transformedData");
	            if(dataMode === "raw") {
	                RequestOptions.body = data;
	            }
	            else if(dataMode === "urlencoded") {
	                RequestOptions.form = _.object(_.map(data, "key"), _.map(data, "value"));
	            }
	        }

	        RequestOptions.rejectUnauthorized=false;
	        RequestOptions.strictSSL = false;

	        return RequestOptions;
	    },

	    generateHeaderObj_webkit: function(headers) {
	        var retVal = {};
	        for (var i = 0; i < headers.length; i++) {
	            retVal[headers[i].key] = headers[i].value;
	        }
	        return retVal;
	    },

	    convertNodeResponseToXHRResponse: function(response, url) {
	        var xhrResponse = {};
	        xhrResponse.wholeResponse = response;
	        xhrResponse.statusText = response.statusMessage;
	        xhrResponse.status = response.statusCode;
	        xhrResponse.readyState = 4; //what do we set here? :S
	        xhrResponse.response = xhrResponse.responseText = response.body;
	        xhrResponse.responseType = "text";
	        xhrResponse.responseURL = pm.request.get("url"); //hope this works
	        xhrResponse.getAllResponseHeaders = function() {
	            var str = "";
	            for(var hKey in this.wholeResponse.headers) {
	                if(this.wholeResponse.headers.hasOwnProperty(hKey)) {
	                    str += hKey+":"+this.wholeResponse.headers[hKey]+"\n";
	                }
	            }
	            return str;
	        };
	        return xhrResponse;
	    },

	    generateCurl: function() {
	        var method = this.get("method");
	        if(!method) {
	            method="get";
	        }
	        method = method.toUpperCase();

	        var url = this.getFinalRequestUrl(this.get("url"));

	        var headers = this.getXhrHeaders();

	        var dataMode = this.get("body").get("dataMode");

	        var hasBody = this.isMethodWithBody(method);
	        var body;

	        if(hasBody) {
	            body = this.getRequestBodyForCurl();
	        }

	        if (this.isMethodWithBody(method)) {
	            if (dataMode === "params" && body && body.length>0) {
	                headers = this.setHeaderInArray(headers, "Content-Type", this.getDummyFormDataHeader());
	            }
	        }

	        var requestPreview;
	        requestPreview = "";
	        requestPreview += "curl -X " + method;
	        var headersCount = headers.length;

	        for(var i = 0; i < headersCount; i++) {
	            requestPreview += " -H \"" + headers[i].key + ": " + headers[i].value + "\"";
	        }

	        if(hasBody && body !== false) {
	            requestPreview += body;
	        }

	        requestPreview += " \"" + url + "\"";

	        this.set("curlHtml", requestPreview);
	    },

	    getDummyFormDataHeader: function() {
	        var boundary = "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW";
	        return boundary;
	    },

	    generateHTTPRequest:function() {
	        var method = this.get("method");
	        if(!method) {
	            method="get";
	        }
	        method = method.toUpperCase();

	        var httpVersion = "HTTP/1.1";

	        var url = this.getFinalRequestUrl(this.get("url"));

	        var hostAndPath = this.splitUrlIntoHostAndPath(url);

	        var path = hostAndPath.path;
	        var host = hostAndPath.host;

	        //to escape html escape sequences
	        path=path.replace(/&/g, "&amp;");

	        var headers = this.getXhrHeaders();

	        var dataMode = this.get("body").get("dataMode");

	        if (this.isMethodWithBody(method)) {
	            if (dataMode === "params") {
	                headers = this.setHeaderInArray(headers, "Content-Type", this.getDummyFormDataHeader());
	            }
	        }

	        var hasBody = this.isMethodWithBody(method);
	        var body;

	        if(hasBody) {
	            body = this.getRequestBodyPreview();
	        }
	        var requestPreview;

	        requestPreview = "";
	        requestPreview += method + " " + path + " " + httpVersion + "\n";
	        requestPreview += "Host: " + host + "\n";

	        var headersCount = headers.length;
	        for(var i = 0; i < headersCount; i++) {
	            requestPreview += headers[i].name + ": " + headers[i].value + "\n";
	        }

	        if(hasBody && body !== false) {
	            requestPreview += "\n" + body;
	        }

	        this.set("previewHtml", requestPreview);
	    },

	    generatePreview: function() {
	        this.generateCurl();
	        this.generateHTTPRequest();
	    },

	    stripScriptTag:function (text) {
	        if (!text) return text;

	        var re = /<script\b[^>]*>([\s\S]*?)<\/script>/gm;
	        text = text.replace(re, "");
	        return text;
	    },

	    checkIfCurrentRequestIsUpdated: function(request) {
	        var id = this.get("collectionRequestId");
	        if(id === request.id) {
	            this.set("name", request.name);
	            this.set("description", request.description);
	            this.set("tests", request.tests);
	            // TODO Why is this being set?
	            // this.set("testResults", request.testResults);
	        }
	    }
	});

	var Response = Backbone.Model.extend({
	    defaults: function() {
	        return {
	            status:"",
	            responseCode:{},
	            time:0,
	            headers:[],
	            cookies:[],
	            mime:"",
	            text:"",
	            language:"",
	            rawDataType:"",
	            state:{size:"normal"},
	            previewType:"parsed",
	            searchResultScrolledTo:-1,
	            forceNoPretty: false,
	            write: true,
	            empty: false,
	            failed: false
	        };
	    },

	    initialize: function() {
	    },

	    setResponseCode: function(response) {
	        var responseCodeName;
	        var responseCodeDetail;

	        if ("statusText" in response) {
	            responseCodeName = response.statusText;
	            responseCodeDetail = "";

	            if (response.status in httpStatusCodes) {
	                responseCodeDetail = httpStatusCodes[response.status]['detail'];
	            }
	        }
	        else {
	            if (response.status in httpStatusCodes) {
	                responseCodeName = httpStatusCodes[response.status]['name'];
	                responseCodeDetail = httpStatusCodes[response.status]['detail'];
	            }
	            else {
	                responseCodeName = "";
	                responseCodeDetail = "";
	            }
	        }

	        var responseCode = {
	            'code':response.status,
	            'name':responseCodeName,
	            'detail':responseCodeDetail
	        };

	        this.set("responseCode", responseCode);
	    },

	    setResponseTime: function(startTime) {
	        var endTime = Date.now();
	        var diff = endTime - startTime;
	        this.set("time", diff);
	    },

	    setResponseData: function(response) {
	        var responseData;

	        if (response.responseType === "arraybuffer") {
	            this.set("responseData", response.response);
	        }
	        else {
	            this.set("text", response.responseText);
	        }
	    },

	    // getAllResponseHeaders - Headers are separated by \n
	    setHeaders: function(response) {
	        //socket responses have a stringheader
	        var headers = this.unpackResponseHeaders(response.stringHeaders || response.getAllResponseHeaders());

	        if(pm.settings.getSetting("usePostmanProxy") === true) {
	            var count = headers.length;
	            for(var i = 0; i < count; i++) {
	                if(headers[i].key === "Postman-Location") {
	                    headers[i].key = "Location";
	                    headers[i].name = "Location";
	                    break;
	                }
	            }
	        }

	        // TODO Set this in the model
	        headers = _.sortBy(headers, function (header) {
	            return header.name;
	        });

	        this.set("headers", headers);
	    },

	    setCookies: function(url) {
	        var model = this;
	        /* TODO: Not available in Chrome packaged apps
	        chrome.cookies.getAll({url:url}, function (cookies) {
	            var count;
	            model.set("cookies", cookies);
	        });
	        */
	    },

	    getHeadersAsKvPairs: function() {
	        var headers = this.get("headers");
	        var count = headers.length;
	        var kvpairs = {};
	        for(var i = 0; i < count; i++) {
	            kvpairs[headers[i].key] = headers[i].value;
	        }

	        return kvpairs;
	    },

	    doesContentTypeExist: function(contentType) {
	        return (!_.isUndefined(contentType) && !_.isNull(contentType))
	    },

	    isContentTypeJavascript: function(contentType) {
	        return (contentType.search(/json/i) !== -1 || contentType.search(/javascript/i) !== -1 || pm.settings.getSetting("languageDetection") === 'javascript');
	    },

	    isContentTypeXML: function(contentType) {
	        return (contentType.search(/xml/i) !== -1);
	    },

	    isContentTypeImage: function(contentType) {
	        return (contentType.search(/image/i) >= 0);
	    },

	    isContentTypePDF: function(contentType) {
	        return (contentType.search(/pdf/i) >= 0);
	    },

	    saveAsSample: function(name) {
	        var response = this.toJSON();
	        response.state = {size: "normal"};
	        response.id = guid();
	        response.name = name;
	        pm.tracker.trackEvent("response", "create");
	        pm.mediator.trigger("saveSampleResponse", response);
	    },

	    loadSampleResponse: function(requestModel, response, runTests) {
	        if(!response) {
	            return;
	        }
	        if(typeof runTests === "undefined") {
	            runTests = false;
	        }

	        this.set("status", response.status);
	        this.set("responseCode", response.responseCode);
	        this.set("time", response.time);
	        this.set("headers", response.headers);
	        this.set("cookies", response.cookies);
	        this.set("mime", response.mime);
	        this.set("language", response.language);
	        this.set("text", response.text);
	        this.set("rawDataType", response.rawDataType);
	        this.set("state", response.state);
	        this.set("previewType", response.previewType);
	        this.set("empty", response.empty);
	        this.set("failed", response.failed);
	        this.set("uiState", response.uiState);
	        this.set("isSample", true);
	        this.set("scrollToResult", false);

	        //to prevent tests from being run on sample response load
	        if(runTests === false) {
	            this.set("runTests", false);
	        }
	        else {
	            this.set("scrollToResult", true);
	        }

	        this.trigger("loadResponse", requestModel);
	    },

	    runTestsForRequest: function(request, response) {
	        var tests = request.tests;
	        var requestModel = new Request(request);
	        var bodyModel = new RequestBody(request.body);
	        requestModel.set("body", bodyModel);
	        if (tests !== null) {
	            requestModel.setResponse(response.toJSON());
	            pm.mediator.trigger("runRequestTest", requestModel, {}, 1, function(data, result) {
	                if (result === "result") {
	                    request["testResults"] = data;
	                    request["testErrors"] = null;
	                }
	                else if (result === "error") {
	                    request["testResults"] = null;
	                    request["testErrors"] = data;
	                }

	                //Hack for github https://github.com/a85/POSTMan-Chrome-Extension/issues/889
	                pm.envManager.get("globals").trigger("change");
	                if(!pm.testRunner) {
	                    pm.tabManager.updateRequestTests(request);
	                }
	            });
	        }
	        else {
	            requestModel.set("testResults", null);
	            requestModel.set("testErrors", null);
	        }
	    },


	    socketResponseLoad: function(jwr) {
	        var request = this;
	        var model = request.get("response");
	        model.setResponseTime(request.get("startTime"));

	        var url = request.get("url");
	        var stringHeaders = "";
	        var headerObj = jwr.headers;
	        for(var hk in headerObj) {
	            if(headerObj.hasOwnProperty(hk)) {
	                stringHeaders+=hk+": " +headerObj[hk]+"\n";
	            }
	        }

	        var response = {
	            'status':jwr.statusCode || 400,
	            'responseText': JSON.stringify(jwr.body),
	            'stringHeaders': stringHeaders,
	            'responseType': 'text'
	        };

	        model.setResponseCode(response);
	        //time has been set earlier
	        model.setResponseData(response);
	        model.setHeaders(response);

	        var responseHeaders = getResponseHeadersAsLowercaseArray(stringHeaders);
	        var contentType = getCaseInsensitiveHeader("content-type", responseHeaders);
	        var language = 'html';

	        var responseLength = 0;
	        var contentLength = getCaseInsensitiveHeader("content-length", responseHeaders);
	        if(contentLength !== null) {
	            responseLength = parseInt(contentLength);
	        }

	        var JSON_SIZE_THRESHOLD = 10000000;
	        var XML_SIZE_THRESHOLD = 5000000;

	        var responsePreviewType = 'html';
	        model.set("forceNoPretty",false);
	        language="javascript";

	        model.set("language", language);
	        model.set("previewType", responsePreviewType);
	        model.set("rawDataType", response.responseType);
	        model.set("state", {size: "normal"});

	        if(pm.testRunner || !tabId || pm.tabManager.currentTabId==tabId) {
	            model.trigger("loadResponse", model);
	        }
	        else {
	            pm.tabManager.addReceivedResponseToTab(tabId, response);
	        }

	    },

	    // Renders the response from a request
	    // Called with this = request
	    load:function (response, tabId) {
	        var request = this;
	        var model = request.get("response");
	        var responseHeaders, contentType;

	        if(!response) {
	            var errorUrl = pm.envManager.getCurrentValue(request.get("url"));
	            model.trigger("failedRequest", errorUrl);
	            return;
	        }

	        // TODO These need to be renamed something else
	        var presetPreviewType = pm.settings.getSetting("previewType");
	        var languageDetection = pm.settings.getSetting("languageDetection");

	        if(response.readyState ===2) {
	            //when the headers have come in, check if it's an image
	            //if it is, save as array buffer directly, instead of making another request
	            //https://github.com/a85/POSTMan-Chrome-Extension/issues/615
	            responseHeaders = getResponseHeadersAsLowercaseArray(response.getAllResponseHeaders());
	            contentType = getCaseInsensitiveHeader("content-type", responseHeaders);
	            if (contentType && (typeof contentType === "string") && model.isContentTypeImage(contentType)) {
	                response.responseType = "arraybuffer";
	            }
	        }
	        else if (response.readyState === 4) {
	            var oldTime = model.get("time");
	            var oldFailed = model.get("failed"); //these two properties are set before we get a chance to set oldResponseModel
	            model.setResponseTime(request.get("startTime"));
	            model.set("failed", false);

	            //Something went wrong
	            if (response.status === 0) {
	                var errorUrl = pm.envManager.getCurrentValue(request.get("url"));
	                model.trigger("failedRequest", errorUrl);
	                model.set("failed", true);
	                model.set("empty", false);
	                if(!pm.testRunner) {
	                    pm.tabManager.addReceivedResponseToTab(tabId, model.toJSON());
	                }
	                else {
	                    model.trigger("loadResponse", model);
	                }
	                return;
	            }
	            else {
	                var url = request.get("url");
	                var oldResponseModel = null;
	                if(!pm.testRunner) {
	                    if(tabId != pm.tabManager.currentTabId) {
	                        //response has to be loaded into a different tab
	                        //preserve old response so it can be restored
	                        oldResponseModel = model.clone();
	                        oldResponseModel.set("time", oldTime);
	                        oldResponseModel.set("failed", oldFailed);
	                    }
	                }

	                model.setResponseCode(response);
	                //time has been set earlier
	                model.setResponseData(response);
	                model.setHeaders(response);

	                responseHeaders = getResponseHeadersAsLowercaseArray(response.getAllResponseHeaders());
	                contentType = getCaseInsensitiveHeader("content-type", responseHeaders);
	                var language = 'html';

	                var responseLength = 0;
	                var contentLength = getCaseInsensitiveHeader("content-length", responseHeaders);
	                if(contentLength !== null) {
	                    responseLength = parseInt(contentLength);
	                }

	                var PRETTY_SIZE_THRESHOLD = 5000000;

	                var responsePreviewType = 'html'; //why?
	                model.set("forceNoPretty",false);
	                if (model.doesContentTypeExist(contentType)) {
	                    if (model.isContentTypeJavascript(contentType)) {
	                        language = 'javascript';
	                    }
	                    else if (model.isContentTypeXML(contentType)) {
	                        language = 'xml';
	                    }

	                    if (model.isContentTypeImage(contentType)) {
	                        responsePreviewType = 'image';
	                    }
	                    else if (model.isContentTypePDF(contentType) && response.responseType === "arraybuffer") {
	                        responsePreviewType = 'pdf';
	                    }
	                    else if (model.isContentTypePDF(contentType) && response.responseType === "text") {
	                        responsePreviewType = 'pdf';
	                    }
	                    else if (responseLength>PRETTY_SIZE_THRESHOLD) {
	                       model.set("forceNoPretty",true);
	                    }
	                    else {
	                        responsePreviewType = "html";
	                    }

	                }
	                else {
	                    if (languageDetection === 'javascript') {
	                        language = 'javascript';
	                    }
	                    else {
	                        language = 'html';
	                    }
	                }

	                model.set("language", language);
	                model.set("previewType", responsePreviewType);
	                model.set("rawDataType", response.responseType);
	                model.set("state", {size: "normal"});
	                model.set("empty", false);

	                var responseJson = model.toJSON();

	                /*Slightly different handling for electron and chrome*/
	                /*Need to get domain cookies every time in electron*/
	                if(postman_electron) {
	                  pm.cookieManager.getCookiesForUrl(request.get("url"), function(cookies) {
	                    model.set("cookies", cookies);
	                    responseJson = model.toJSON();
	                    if(!pm.testRunner) {
	                      pm.tabManager.addReceivedResponseToTab(tabId, responseJson);
	                      if(tabId == pm.tabManager.currentTabId) {
	                        //reload response
	                        pm.request.get("response").trigger("finishedLoadCookies");
	                      }
	                    }
	                    else {
	                        model.trigger("loadResponse", model);
	                    }
	                  });
	                }
	                else {
	                    if(pm.testRunner) {
	                        model.trigger("loadResponse", model);
	                    }
	                    else {
	                        pm.tabManager.addReceivedResponseToTab(tabId, responseJson);
	                        //if the response was for a different tab
	                        if(tabId != pm.tabManager.currentTabId) {
	                            model.set(oldResponseModel.toJSON());
	                        }
	                    }
	                }
	            }
	        }
	    },

	    clear: function() {
	        this.set({
	            "status": "",
	            "responseCode": {},
	            "time": 0,
	            "headers": [],
	            "cookies": [],
	            "mime": "",
	            "text": "",
	            "language": "",
	            "rawDataType": "",
	            "state": {
	                "size": "normal"
	            },
	            "previewType": "parsed",
	            "searchResultScrolledTo": -1,
	            "forceNoPretty": false,
	            "write": true,
	            "empty": false
	        });
	        this.trigger("clearResponse");
	    },

	    unpackResponseHeaders: function(data) {
	        if (data === null || data === "") {
	            return [];
	        }
	        else {
	            var vars = [], hash;
	            var hashes = data.split('\n');
	            var header;

	            for (var i = 0; i < hashes.length; i++) {
	                hash = hashes[i];
	                var loc = hash.search(':');

	                if (loc !== -1) {
	                    var name = $.trim(hash.substr(0, loc));
	                    var value = $.trim(hash.substr(loc + 1));
	                    var description = headerDetails[name.toLowerCase()] || "Custom header";
	                    header = {
	                        "name":name,
	                        "key":name,
	                        "value":value,
	                        "description":description
	                    };

	                    if (name.toLowerCase() === "link") {
	                        header.isLink = true;
	                    }

	                    vars.push(header);
	                }
	            }

	            return vars;
	        }
	    }
	});

	module.exports = {
	  Request: Request,
	  Response: Response
	}


/***/ },

/***/ 8:
/***/ function(module, exports) {

	var RequestBody = Backbone.Model.extend({
	    defaults: function() {
	        return {
	            data: "",
	            transformedData: "",
	            dataToBeSent: "",
	            dataMode:"params",
	            isEditorInitialized:false,
	            codeMirror:false,
	            rawEditorType:"editor",
	            bodyParams: {},
	            editorMode:"html",
	            language:""
	        };
	    },

	    initialize: function() {

	    },

	    getFormDataForCurl: function() {
	        var dataAsObjects = this.get("dataAsObjects");
	        var kv;
	        var value;

	        var body = "";
	        for(var i = 0; i < dataAsObjects.length; i++) {
	            value = pm.envManager.getCurrentValue(dataAsObjects[i].value);
	            var optionalAtForFile = "";
	            if(dataAsObjects[i].type === "file") {
	                optionalAtForFile = "@";
	            }
	            body += " -F \"" + dataAsObjects[i].key + "=" + optionalAtForFile + value + "\"";
	        }

	        return body;
	    },

	    getBodyForCurl: function() {
	        var dataMode = this.get("dataMode");
	        var preview;

	        if (dataMode !== "params") {
	            preview = pm.envManager.getCurrentValue(this.get("dataAsPreview"));
	            return " -d '" + preview + "'";
	        }
	        else {
	            return this.getFormDataForCurl();
	        }
	    },

	    // Fixed
	    getBodyParamString:function (params) {
	        var paramsLength = params.length;
	        var paramArr = [];
	        for (var i = 0; i < paramsLength; i++) {
	            var p = params[i];
	            if (p.key && p.key !== "") {
	                paramArr.push(p.key + "=" + p.value);
	            }
	        }
	        return paramArr.join('&');
	    },

	    getDataMode:function () {
	        return this.get("dataMode");
	    },

	    loadData:function (mode, data, asObjects) {
	        // console.log("Load body data", mode, data, asObjects);
	        this.set("dataMode", mode);
	        this.set("asObjects", asObjects);

	        if (mode !== "raw") {
	            if (asObjects) {
	                var cData = _.clone(data);

	                if (mode === "params") {
	                    // Change made through an event in RequestBodyFormDataEditor
	                    this.set("data", cData);
	                    this.set("dataAsObjects", cData);
	                    this.set("dataToBeSent", cData);
	                    this.set("serializedData", cData);
	                }
	                else {
	                    this.set("data", cData);
	                    this.set("dataToBeSent", cData);
	                    this.set("dataAsObjects", cData);
	                }
	            }
	            else {
	                var params = getBodyVars(data, false);
	                var cParams = _.clone(params);
	                this.set("data", cParams);
	                this.set("dataToBeSent", cParams);
	                this.set("dataAsObjects", cParams);
	            }
	            this.trigger("change:dataAsObjects");
	        }
	        else {
	            //No need for objects
	            this.set("data", _.clone(data));
	            this.set("dataToBeSent", _.clone(data));
	        }

	        // console.log("loadData: dataToBeSent", this.get("dataToBeSent"));
	        this.trigger("dataLoaded", this);
	        this.trigger("change:data");
	    },

	    // TODO Store transformedData
	    getUrlEncodedBody: function() {
	        var rows, count, j;
	        var row, key, value;
	        var urlEncodedBodyData = "";
	        var transformedData = [];

	        rows = this.get("data");
	        count = rows.length;

	        if (count > 0) {
	            for (j = 0; j < count; j++) {
	                row = rows[j];
	                value = row.value;
	                key = row.key;
	                if(row.enabled===false) {
	                    //row is disabled. not adding
	                }
	                else {
	                    if (pm.settings.getSetting("trimKeysAndValues")) {
	                        value = $.trim(value);
	                    }

	                    value = pm.envManager.getCurrentValue(value);
	                    value = encodeURIComponent(value);
	                    value = value.replace(/%20/g, '+');

	                    key = pm.envManager.getCurrentValue(key);
	                    key = encodeURIComponent(key);
	                    key = key.replace(/%20/g, '+');

	                    if (pm.settings.getSetting("trimKeysAndValues")) {
	                        key = $.trim(key);
	                    }

	                    urlEncodedBodyData += key + "=" + value + "&";

	                    transformedData.push({
	                        "key": key,
	                        "value": value
	                    });
	                }
	            }

	            urlEncodedBodyData = urlEncodedBodyData.substr(0, urlEncodedBodyData.length - 1);

	            this.set("transformedData", transformedData);

	            return urlEncodedBodyData;
	        }
	        else {
	            return false;
	        }
	    },

	    // TODO Store transformedData
	    getFormDataBody: function() {
	        var rows, count, j;
	        var i;
	        var row, key, value;
	        var paramsBodyData = new FormData();
	        var transformedData = [];

	        rows = this.get("data");

	        if (rows) {
	            count = rows.length;
	        }
	        else {
	            count = 0;
	        }


	        if (count > 0) {
	            for (j = 0; j < count; j++) {
	                row = rows[j];
	                key = row.key;
	                if(row.enabled === false) {
	                    //this row is disabled. not adding
	                }
	                else {
	                    if (pm.settings.getSetting("trimKeysAndValues")) {
	                        key = $.trim(key);
	                    }

	                    key = pm.envManager.getCurrentValue(key);

	                    value = row.value;
	                    value = pm.envManager.getCurrentValue(value);

	                    if (pm.settings.getSetting("trimKeysAndValues")) {
	                        value = $.trim(value);
	                    }

	                    paramsBodyData.append(key, value);

	                    transformedData.push({
	                        "key": key,
	                        "value": value
	                    });
	                }
	            }

	            this.set("transformedData", transformedData);

	            return paramsBodyData;
	        }
	        else {
	            return false;
	        }
	    },

	    getDataAsKvPairs: function(dataPairs) {
	        var count = dataPairs.length;
	        var kvpairs = {};
	        for(var i = 0; i < count; i++) {
	            kvpairs[dataPairs[i].key] = dataPairs[i].value;
	        }

	        return kvpairs;
	    },

	    // Note: Used inside collection runner
	    // TODO Clean request body management first
	    // This is horribly wrong. Need to fix this properly
	    setDataForXHR: function() {
	        var mode = this.get("dataMode");
	        if (mode === "params") {
	            this.set("data", this.get("dataAsObjects"));
	            var formdata = this.getFormDataBody();
	            this.set("data", formdata);
	            this.set("dataToBeSent", formdata);
	        }
	        else if (mode === "urlencoded") {
	            var paramdata = this.getUrlEncodedBody();
	            // console.log("param data is", paramdata);
	            this.set("data", paramdata);
	            this.set("dataToBeSent", paramdata);
	        }
	        else if (mode === "raw") {
	            // TODO Store transformedData
	            var data = this.get("data"); //MUST be a string!
	            if(typeof data !== "string") {
	                data = "";
	            }

	            var transformedData = pm.envManager.getCurrentValue(data);
	            this.set("transformedData", transformedData);
	            this.set("dataToBeSent", transformedData);
	        }
	    }
	});

	module.exports = RequestBody;


/***/ },

/***/ 9:
/***/ function(module, exports) {

	var PreRequestScripter = Backbone.Model.extend({
		defaults: function() {
			return {
				"sandbox": null
			};
		},

		runPreRequestScript: function(request, data, iteration, callback) {
			$("#prscript-error").hide();

			var prCode = request.get("preRequestScript");

			// Wrapper function
			var baseCode = "(function(){";
			baseCode += prCode;
			baseCode += "\n})()";

			var selectedEnv = pm.envManager.get("selectedEnv");
			var selectedEnvJson = {};
			var globals = getKeyValPairsAsAssociativeArray(pm.envManager.get("globals").get("globals"));

			if (selectedEnv) {
				selectedEnvJson = getKeyValPairsAsAssociativeArray(selectedEnv.toJSON().values);
			}

			var environment = {
				"request": request.getForPrscript(), // Get separately
				"environment": selectedEnvJson,
				"globals": globals,
	            "data": data,
	            "iteration": iteration
			};

			var fileList = request.get("sandboxFiles");
			if(!postman_webkit && !postman_electron) {
				fileList = null;
			}

			this.postCode(baseCode, environment, fileList);

			this.listenToOnce(pm.mediator, "resultReceivedPrscript", function(data) {
				if (callback) {
					callback(data, "result");
				}
			});

			this.listenToOnce(pm.mediator, "resultErrorPrscript", function(data) {
				this.showPreRequestScriptError(data);
			});
		},

		postCode: function(code, environment, fileList) {
			var sandbox = this.get("sandbox");
			var message = {
				command: "runprscript",
				code: code,
				environment: environment,
				fileList: fileList,
				scriptType: "prscript"
			};

			sandbox.contentWindow.postMessage(message, '*');
		},

		initialize: function() {
			var model = this;
			model.sandboxWorking = false;

			var sandbox = document.getElementById("tester_sandbox");
			this.set("sandbox", sandbox);

			window.addEventListener('message', function(event) {
				var type = event.data.type;

				if (event.data.type === "resultReceivedPrscript") {
					pm.mediator.trigger("resultReceivedPrscript", event.data.result);
				}

				if (event.data.type === "resultErrorPrscript") {
					pm.mediator.trigger("resultErrorPrscript", event.data.errorMessage);
				}

				if (event.data.type === "sandboxEchoResponse") {
					model.sandboxWorking = true;
				}
				//All other events are handled in Tester.js
			});

			pm.mediator.on("runPreRequestScript", this.runPreRequestScript, this);

			pm.mediator.on("resultErrorPrscript", this.showPreRequestScriptError, this);
		},

		showPreRequestScriptError: function(msg) {
			//for collection runner
	        if(pm.isTestRunner) {
				clearTimeout(pm.globalPrScriptNotif);
				pm.globalPrScriptNotif = setTimeout(function() {
					pm.alerts.error("Something is wrong with your Pre-request scripts. Please fix them in the editor first. Message: " + msg, {
	          dedupeId: 'prscript-error'
	        });
					//hit new run directly :S
					$("a#new-test-run").click();
				}, 500);
			}
			else {
				$("#prscript-error").show().text("There was an error evaluating the Pre-request script. " + msg).css('display','inline-block');
			}
		}
	});

	module.exports = PreRequestScripter;


/***/ },

/***/ 10:
/***/ function(module, exports) {

	/****

	collectionRequest = {
	    id: guid(),
	    headers: request.getPackedHeaders(),
	    url: url,
	    method: request.get("method"),
	    preRequestScript: request.get("preRequestScript"),
	    data: body.get("dataAsObjects"),
	    dataMode: body.get("dataMode"),
	    name: newRequestName,
	    description: newRequestDescription,
	    descriptionFormat: "html",
	    time: new Date().getTime(),
	    version: 2,
	    responses: []
	};

	*****/
	var PmCollection = Backbone.Model.extend({
	    defaults: function() {
	        var createdAt = (new Date()).getTime();
	        return {
	            "id": "",
	            "name": "",
	            "description": "",
	            "order": [],
	            "folders": [],
	            "requests": [],
	            "timestamp": 0,
	            "synced": false,
	            "syncedFilename": "",
	            "remote_id": 0,
	            "remoteLink": "",
	            "public": false,
	            "owner": "",
	            "subscribed": false,
	            "createdAt": createdAt,
	            "updatedAt": null,
	            "write": true
	        };
	    },

	    toSyncableJSON: function() {
	        var j = this.getAsJSON();
	        j.synced = true;
	        return j;
	    },

	    setRequests: function(requests) {
	        this.set("requests", requests);
	    },

	    getRequestIndex: function(newRequest) {
	    	var requests = this.get("requests");
	    	var count = requests.length;
	    	var request;
	    	var found;
	    	var location;

	    	for(var i = 0; i < count; i++) {
	    		request = requests[i];
	    		if(request.id === newRequest.id) {
	    			found = true;
	    			location = i;
	    			break;
	    		}
	    	}

	    	if (found) {
	    		return location;
	    	}
	    	else {
	    		return -1;
	    	}
	    },

	    addRequest: function(newRequest) {
	        var location = this.getRequestIndex(newRequest);
	        var requests = this.get("requests");
	        if (location !== -1 && !(_.find(requests,newRequest))) {
	            //console.log("Request being added already exists. Not re-adding");
	            //requests.splice(location, 1, newRequest);
	        }
	        else {
	            requests.push(newRequest);
	        }
	    },

	    deleteRequest: function(requestId) {
	        var requests = _.clone(this.get("requests"));
	    	var location = arrayObjectIndexOf(requests, requestId, "id");
	    	if (location !== -1) {
	            this.removeRequestIdFromOrderOrFolder(requestId);
	    		requests.splice(location, 1);
	            this.set("requests", requests);
	    	}
	    },

	    updateRequest: function(newRequest) {
	    	var location = this.getRequestIndex(newRequest);
	    	var requests = this.get("requests");
	    	if (location !== -1) {
	    		requests.splice(location, 1, newRequest);
	    	}
	    },

	    getFolderById: function(folderId) {
	        var folders = _.clone(this.get("folders"));
	        var location = arrayObjectIndexOf(folders, folderId, "id");
	        return folders[location];
	    },

	    getFolders: function() {
	        var folders = _.clone(this.get("folders"));
	        return folders;
	    },


	    getRequestsInCollection: function() {
	        var requests = _.clone(this.get("requests"));
	        var order = _.clone(this.get("order"));
	        var orderedRequests = [];

	        var folders = this.get("folders");

	        //Always run folders in alphabetical order
	        if(folders) {
	            folders.sort(function(a,b) {
	                var name_a = a.name;
	                var name_b = b.name;
	                return sortAlphabeticalSelf(name_a, name_b);
	            });
	        }

	        var folderCount = folders.length;

	        if (folderCount > 0) {
	            for(var i = 0; i < folderCount; i++) {
	                folder = _.clone(folders[i]);
	                folderOrder = folder.order;
	                folderRequests = [];

	                for(var j = 0; j < folderOrder.length; j++) {
	                    id = folderOrder[j];

	                    var index = arrayObjectIndexOf(requests, id, "id");

	                    if(index >= 0) {
	                        folderRequests.push(requests[index]);
	                        requests.splice(index, 1);
	                    }
	                }

	                folderRequests = this.orderRequests(folderRequests, folderOrder);
	                orderedRequests = _.union(orderedRequests, folderRequests);
	            }

	            orderedRequests = _.union(orderedRequests, this.orderRequests(requests, order));
	        }
	        else {
	            orderedRequests = this.orderRequests(requests, order)
	        }

	        return orderedRequests;
	    },

	    getRequestsInFolder: function(folder) {
	        var folderOrder = folder.order;
	        var requests = _.clone(this.get("requests"));
	        var count = folderOrder.length;
	        var index;
	        var folderRequests = [];

	        for(var i = 0; i < count; i++) {
	            index = arrayObjectIndexOf(requests, folderOrder[i], "id");
	            if (index >= 0) {
	                folderRequests.push(requests[index]);
	            }
	        }

	        var orderedRequests = this.orderRequests(folderRequests, folder.order);

	        return orderedRequests;
	    },

	    addFolder: function(folder) {
	        var folders = _.clone(this.get("folders"));
	        folders.push(folder);
	        this.set("folders", folders);
	    },

	    hasFolderId: function(folderId) {
	        var folders = _.clone(this.get("folders"));
	        var index = arrayObjectIndexOf(folders, folderId, "id");
	        if(index===-1) return false;
	        return true;
	    },

	    editFolder: function(folder) {
	        function existingFolderFinder(f) {
	            return f.id === id;
	        }

	        var id = folder.id;
	        var folders = _.clone(this.get("folders"));
	        var index = arrayObjectIndexOf(folders, id, "id");

	        if (index !== -1) {
	            folders.splice(index, 1, folder);
	            this.set("folders", folders);
	        }
	    },

	    deleteFolder: function(id) {
	        var folders = _.clone(this.get("folders"));
	        var thisFolder = this.getFolderById(id);
	        var oldThis = this;
	        if(thisFolder && thisFolder.order) {
	            _.each(thisFolder.order, function(rid) {
	                oldThis.deleteRequest(rid);
	            });
	        }
	        //get request ids of folder
	        var index = arrayObjectIndexOf(folders, id, "id");
	        folders.splice(index, 1);
	        this.set("folders", folders);
	    },

	    getAsJSON: function() {
	        return {
	            "id": this.get("id"),
	            "name": this.get("name"),
	            "description": this.get("description"),
	            "order": this.get("order"),
	            "folders": this.get("folders"),
	            "timestamp": this.get("timestamp"),
	            "synced": this.get("synced"),
	            "remote_id": this.get("remote_id"),
	            "owner": this.get("owner"),
	            "sharedWithTeam": this.get("sharedWithTeam"),
	            "subscribed": this.get("subscribed"),
	            "remoteLink": this.get("remoteLink"),
	            "public": this.get("public"),
	            "createdAt": this.get("createdAt"),
	            "updatedAt": this.get("updatedAt"),
	            "write": this.get("write")
	        }
	    },

	    addRequestIdToFolder: function(id, requestId) {
	        //this.removeRequestIdFromOrderOrFolder(requestId);

	        var folders = _.clone(this.get("folders"));
	        var index = arrayObjectIndexOf(folders, id, "id");

	        var numFolders = folders.length;
	        for(var i=0;i<numFolders;i++) {
	            var requestIdInOrder = folders[i].order.indexOf(requestId);
	            if(folders[i].id===id) {
	                if(requestIdInOrder===-1) {
	                    folders[i].order.push(requestId);
	                }
	                //else the request already exists in the folder
	            }
	            //for all other folders, remove this request
	            else {
	                //same id exists in another folder
	                if(requestIdInOrder>=0) {
	                    folders[i].order.splice(requestIdInOrder, 1);
	                }
	            }
	        }

	        this.set("folders", folders);
	    },

	    removeRequestIdFromOrder: function(requestId) {
	        var order = this.get("order");
	        var idx = order.indexOf(requestId);
	        if(idx === -1) return -1;

	        order.splice(idx,1);
	        this.set("order", order);
	        return requestId;
	    },

	    requestExistsInCollectionRoot: function(requestId) {
	        var collectionOrder = this.get("order");
	        //only checks for root requests
	        if(collectionOrder.indexOf(requestId)!==-1) {
	            return true;
	        }

	        var collectionRequestIds = _.map(this.get("requests"), "id");
	        if(collectionRequestIds.indexOf(requestId)!==-1) {
	            return true;
	        }
	        return false;
	    },

	    requestExistsInCollectionFolders: function(requestId) {
	        var folders= this.get("folders");
	        //only checks for requests in folders
	        var numFolders = folders.length;

	        for(var i = 0; i < numFolders; i++) {
	            var indexInFolder = folders[i].order.indexOf(requestId);
	            if(indexInFolder >= 0) {
	                return folders[i].id;
	            }
	        }
	        return false;
	    },


	    addRequestIdToOrder: function(requestId) {
	        //this.removeRequestIdFromOrderOrFolder(requestId);

	        var order = _.clone(this.get("order"));
	        var requestIdInOrder = order.indexOf(requestId);
	        if(requestIdInOrder!==-1) {
	            return;
	        }
	        order.push(requestId);
	        this.set("order", order);
	    },

	    removeRequestIdFromOrderOrFolder: function(requestId) {
	        var order = _.clone(this.get("order"));
	        var indexInFolder;
	        var folders = _.clone(this.get("folders"));

	        var indexInOrder = order.indexOf(requestId);

	        if (indexInOrder >= 0) {
	            order.splice(indexInOrder, 1);
	            this.set("order", order);
	        }

	        for(var i = 0; i < folders.length; i++) {
	            indexInFolder = folders[i].order.indexOf(requestId);
	            if(indexInFolder >= 0) {
	                break;
	            }
	        }

	        if(indexInFolder >= 0) {
	            folders[i].order.splice(indexInFolder, 1);
	            this.set("folders", folders);
	        }
	    },

	    isUploaded: function() {
	        return this.get("remote_id") !== 0;
	    },

	    // Uses arrays
	    orderRequests: function() {

	        var folders = this.get("folders");
	        var requests = this.get("requests");

	        var folderCount = folders.length;
	        var folder;
	        var folderOrder;
	        var id;
	        var existsInOrder;
	        var folderRequests;

	        var newFolders = [];

	        for(var i = 0; i < folderCount; i++) {
	            folder = _.clone(folders[i]);
	            folderOrder = folder.order;
	            folderRequests = [];

	            for(var j = 0; j < folderOrder.length; j++) {
	                id = folderOrder[j];

	                var index = arrayObjectIndexOf(requests, id, "id");

	                if(index >= 0) {
	                    folderRequests.push(requests[index]);
	                    requests.splice(index, 1);
	                }
	            }

	            folder["requests"] = this.orderRequests(folderRequests, folderOrder);
	            newFolders.push(folder);
	        }

	        this.set("folders", newFolders);
	        this.set("requests", this.orderRequests(requests, this.get("order")));
	        return collection;
	    },

	    orderRequests: function(inRequests, order) {
	        var requests = _.clone(inRequests);

	        function requestFinder(request) {
	            return request.id === order[j];
	        }

	        if (order.length === 0) {
	            requests.sort(sortAlphabetical);
	        }
	        else {
	            var orderedRequests = [];
	            for (var j = 0, len = order.length; j < len; j++) {
	                var element = _.find(requests, requestFinder);
	                if(element) {
	                    orderedRequests.push(element);
	                }
	            }

	            requests = orderedRequests;
	        }

	        return requests;
	    }
	});

	module.exports = PmCollection;


/***/ },

/***/ 11:
/***/ function(module, exports) {

	var Environment = Backbone.Model.extend({
	    defaults: function() {
	        return {
	            "id": "",
	            "name": "",
	            "values": [],
	            "timestamp": 0,
	            "synced": false,
	            "syncedFilename": ""
	        };
	    },

	    toSyncableJSON: function() {
	        var j = this.toJSON();
	        j.synced = true;
	        return j;
	    },

	    getEnabledValues: function() {
	        var retVal = [];
	        var values = this.get("values");
	        if(values == null) {
	            values = [];
	        }
	        for(i=0;i<values.length;i++) {
	            if(!values[i].hasOwnProperty("enabled") || values[i].enabled==true) {
	                retVal.push(values[i]);
	            }
	        }
	        return retVal;
	    }
	});

	module.exports = Environment;


/***/ },

/***/ 15:
/***/ function(module, exports) {

	var PostmanAPI = Backbone.Model.extend({
		defaults: function() {
			return {
				"api_url": pm.apiUrl
			}
		},

		initialize: function() {
			// console.log("This is going to be the awesome postman API!");
		},

		exchangeRefreshToken: function(successCallback, tryCount) {
			var oldThis = this;
			if(typeof tryCount === "undefined") {
				tryCount = 0;
			}
			console.log("Trying to exchangeRefreshToken");

			if(pm.user.get("id") == "0") {
				//no ID
				//ask them to login
				return;
			}

			var postUrl = pm.apiUrl + "/client-oauth2-refresh";
			postUrl += "?user_id=" + pm.user.get("id");


			var oldRefreshToken = pm.user.get("refresh_token");

			var parameters = {
				"grant_type": "refresh_token",
				"refresh_token": pm.user.get("refresh_token"),
				"access_token": pm.user.get("access_token")
			};

			$.ajax({
				type: 'POST',
				url: postUrl,
				data: parameters,
				success: function(data) {
					// console.log("Received refresh_token", data);
					if(data.hasOwnProperty("access_token")) {
						pm.user.setAccessToken(data);

						if (successCallback) {
							try { 
								oldThis.renewedToken(oldRefreshToken); //make call to remove old token
							}
							catch(e) {
								console.log("renewedToken call failed for rToken: " + oldRefreshToken);
							}
							successCallback();
						}
					}
					else {
						pm.mediator.trigger("invalidRefreshToken");
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {
					if(textStatus === 'timeout') {
						//this will never be hit. jQuery has no timeout
						tryCount++;
						if(tryCount>3) {
							pm.mediator.trigger("invalidRefreshToken");
						} else {
							oldThis.exchangeRefreshToken(successCallback, tryCount);
						}
					} else {
						pm.mediator.trigger("invalidRefreshToken");
					}
				}
			})
		},

	  sendAppId: function(appId, userId, accessToken) {
			var postUrl = pm.apiUrl + '/app';
			postUrl += "?user_id=" + pm.user.get("id");
			postUrl += "&access_token=" + pm.user.get("access_token");

			var parameters = {
				"app_id": appId
			};

			$.ajax({
				type: 'PUT',
				url: postUrl,
				data: parameters
			});
		},

		renewedToken: function(oldRefreshToken) {
			var postUrl = pm.apiUrl + '/renewed-token';
			postUrl += "?user_id=" + pm.user.get("id");
			postUrl += "&access_token=" + pm.user.get("access_token");

			var parameters = {
				"old_refresh_token": oldRefreshToken
			};

			$.ajax({
				type: 'POST',
				url: postUrl,
				data: parameters,
				success: function() {
					console.log("Old rToken deleted");
				}
			});
		},

		logoutUser: function(userId, accessToken, successCallback) {
			var postUrl = pm.apiUrl + '/client-logout';
		    postUrl += "?user_id=" + userId;
		    postUrl += "&access_token=" + accessToken;

			$.ajax({
				type: 'POST',
				url: postUrl,
				success: function() {
					if (successCallback) {
						successCallback();
					}
				}
			})
		},

		getUsernameEmailForId: function(userId, successCallback) {
			var postUrl = pm.apiUrl + '/users/' + userId + '/username';
			if(userId == "0" || !userId) {
				//no valid ID to get username with
				return;
			}
			$.ajax({
				type: 'GET',
				url: postUrl,
				success: function(data) {
					if (successCallback) {
						successCallback(data);
					}
				},
				error: function() {
					if (successCallback) {
						successCallback({result: "fail"});
					}
				}
			})
		},

		recreateSyncUser: function(successCallback) {
			var uploadUrl = pm.apiUrl + '/sync-user-create?';
			if(pm.user.get("id") == "0") {
				return;
			}

			this.executeAuthenticatedRequest(function() {
				uploadUrl += "user_id=" + pm.user.get("id");
				uploadUrl += "&access_token=" + pm.user.get("access_token");

				$.ajax({
				    type:'POST',
				    url:uploadUrl,
				    success:function (data) {
				    	if (successCallback) {
				    		successCallback(data);
				    	}
				    },
				    error:function() {
				    	if (successCallback) {
				    		successCallback(null);
				    	}
				    }
				});
			});
		},

		/**
		 * Signs in with (username_email+password OR id+password)
		 * @param  {[type]} username_email  [username or email. Either this or ID is required]
		 * @param  {[type]} password        [required]
		 * @param  {[type]} id              [user id (numeric). Either this or username_password is requried]
		 */
		signInUser: function(username_email, password, id, successCallback) {
			var apiToUse = "/signin";
			if((!username_email || username_email == "") && id!=="") {
				apiToUse = "/signin_id";
			} 
			var postUrl = pm.apiUrl + apiToUse;
			var login_data = {
				"username" : username_email,
				"password" : password,
				"id": id
			}
			$.ajax({
				type: 'POST',
				url: postUrl,
				data: JSON.stringify(login_data),
				success: function(data) {
					if(!data.username_email && username_email) {
						data.username_email = username_email;
					}
					if (successCallback) {
						successCallback(data);
					}
				},
				error: function() {
					if (successCallback) {
						successCallback();
					}
				}
			})
		},

		signUpUser: function(name, email, username, password, syncEnabled, successCallback) {
			var postUrl = pm.apiUrl + '/signup';
			if(syncEnabled) {
				syncEnabled = "1";
			}
			else {
				syncEnabled = "0";
			}

			var signup_data = {
				"realname" : name,
				"email" : email,
				"username" : username,
				"password" : password,
				"sync_enabled": syncEnabled
			}

			$.ajax({
				type: 'POST',
				url: postUrl,
				data: JSON.stringify(signup_data),
				success: function(data) {
					if (successCallback) {
						successCallback(data);
					}
				},
				error: function() {
					if (successCallback) {
						successCallback();
					}
				}
			})
		},

	    isTokenValid: function() {
	    	//need not be coded in 2 places
	    	return pm.user.isTokenValid();
	    },

		executeAuthenticatedRequest: function(func) {
			var isTokenValid = this.isTokenValid();

			if (isTokenValid) {
				func();
			}
			else {
				this.exchangeRefreshToken(function() {
					func();
				});
			}
		},

		uploadCollection: function(collectionData, isPublic, successCallback) {
			var uploadUrl = pm.apiUrl + '/collections?is_public=' + isPublic;

			if (pm.user.isLoggedIn()) {
			    this.executeAuthenticatedRequest(function() {
			    	uploadUrl += "&user_id=" + pm.user.get("id");
			    	uploadUrl += "&access_token=" + pm.user.get("access_token");

			    	$.ajax({
			    	    type:'POST',
			    	    url:uploadUrl,
			    	    data:collectionData,
			    	    success:function (data) {
			    	    	if (successCallback) {
			    	    		successCallback(data);
			    	    	}
			    	    }
			    	});
			    });
			}
			else {
				$.ajax({
				    type:'POST',
				    url:uploadUrl,
				    data:collectionData,
				    success:function (data) {
				    	if (successCallback) {
				    		successCallback(data);
				    	}
				    }
				});
			}
		},

		getDirectoryCollections: function(startId, count, order, successCallback) {
			var getUrl = pm.apiUrl + "/collections";
			getUrl += "?user_id=" + pm.user.get("id");
			getUrl += "&access_token=" + pm.user.get("access_token");
			getUrl += "&start_id=" + startId;
			getUrl += "&count=" + count;
			getUrl += "&order=" + order;

			$.ajax({
			    type:'GET',
			    url:getUrl,
			    success:function (collections) {
			    	if (successCallback) {
			    		successCallback(collections);
			    	}
			    }
			});
		},

		disableSync: function(userId, access_token, successCallback, errorCallback) {
			if(!pm.user.isLoggedIn()) {
				return;
			}
			var uploadUrl = pm.apiUrl + "/disable-sync?";
			uploadUrl += "user_id=" + pm.user.get("id");
			uploadUrl += "&access_token=" + pm.user.get("access_token");
			$.ajax({
				type:'POST',
				url: uploadUrl,
				success:function (data) {
					if (successCallback) {
						successCallback(data);
					}
				},
				error: errorCallback
			});
		},

		sendUnsyncedChanges: function(userId, version, unsyncedChanges, successCallback, errorCallback) {
			if(!pm.user.isLoggedIn()) {
				return;
			}
			var uploadUrl = pm.apiUrl + "/save-unsynced-changes?";
			uploadUrl += "user_id=" + pm.user.get("id");
			uploadUrl += "&access_token=" + pm.user.get("access_token");
			$.ajax({
				type:'POST',
				url: uploadUrl,
				data: {
					version: version,
					unsynced_changes: unsyncedChanges
				},
				success:function (data) {
					if (successCallback) {
						successCallback(data);
					}
				},
				error: errorCallback
			});
		},

		getTeamCollections: function(userId, access_token, orgId, successCallback, failCallback) {
			if(!pm.user.isTeamMember()) return;

			/*var getUrl = pm.apiUrl + "/profile/team/collections";
			getUrl += "?user_id=" + pm.user.get("id");*/
			var newGetUrl = postman_syncserver_url + "/api/team/"+orgId;
			newGetUrl += "?user_id=" + pm.user.get("id") + "&access_token=" + access_token;

			$.ajax({
				url: newGetUrl,
				type: "GET",
				//headers: {"X-Access-Token": access_token},
				success: successCallback,
				error: failCallback
			});
		},

		getTeamUsers: function(userId, access_token, organization_id, successCallback) {
			if(!pm.user.isTeamMember()) return;

			var getUrl = pm.apiUrl + "/organizations/" + organization_id+" /users";
			getUrl += "?user_id=" + pm.user.get("id")+"&access_token=" + access_token;

			$.ajax({
				url: getUrl,
				type: "GET",
				success: successCallback
			});
		},

		subscribeToCollection: function(collectionId, userId, ownerId, successCallback) {
			if(!pm.user.isTeamMember()) return;

			var getUrl = postman_syncserver_url + "/api/collection/" + collectionId + "/subscribe";

			$.ajax({
				url: getUrl,
				type: "PUT",
				data: {"user_id": userId, "owner": ownerId},
				success: successCallback
			});
		},

		addCollectionToTeam: function(userId, access_token, collection_id, collection_name, collection_description, collection_owner_name, collection_owner_id, successCallback) {
			//this is not needed. using sync server to handle team dir
			return;
			if(!pm.user.isTeamMember()) return;

			var getUrl = pm.apiUrl + "/profile/team/collection";

			$.ajax({
				url: getUrl,
				type: "POST",
				data: {
					user_id: userId,
					collection_id: collection_id,
					collection_name: collection_name,
					collection_description: collection_description,
					collection_owner_name: collection_owner_name,
					collection_owner_id: collection_owner_id,
				},
				headers: {"X-Access-Token": access_token},
				success: successCallback
			});
		},

		updateCollectionToTeam: function(userId, access_token, collection_id, collection_name, collection_description, collection_owner_id, successCallback) {
			//this is not needed. using sync server to handle team dir
			return;
			if(!pm.user.isTeamMember()) return;

			var getUrl = pm.apiUrl + "/profile/team/collection-update/" + collection_id;

			$.ajax({
				url: getUrl,
				type: "POST",
				data: {
					user_id: userId,
					collection_id: collection_id,
					collection_name: collection_name,
					collection_description: collection_description,
					collection_owner_id: collection_owner_id
				},
				headers: {"X-Access-Token": access_token},
				success: successCallback
			});
		},

		deleteCollectionFromTeam: function(userId, access_token, collection_id, cb, cbf) {
			//this is not needed. using sync server to handle team dir
			return;
			if(!pm.user.isTeamMember()) return;

			var getUrl = pm.apiUrl + "/profile/team/collection/"+collection_id+"/"+userId;
			$.ajax({
				url: getUrl,
				type: "DELETE",
				headers: {"X-Access-Token": access_token},
				success: cb,
				failure: cbf
			});
		},

		downloadDirectoryCollection: function(link_id, successCallback) {
			var getUrl = pm.apiUrl + "/collections/" + link_id;
			getUrl += "?user_id=" + pm.user.get("id");
			getUrl += "&access_token=" + pm.user.get("access_token");

			var headers = { "X-Requested-With": null };
			if(postman_electron) {
				headers["X-Requested-With"] = "PostmanMac/"+pm.app.getVersion();
			}
			else {
				headers["X-Requested-With"] = "PostmanChrome/"+pm.app.getVersion();
			}

			$.ajax({
				url: getUrl,
				type: "GET",
				headers: headers,
				success: function (data) {
					if (successCallback) {
						successCallback(data);
					}
				}
			});
		},

		getUserPurchases: function(successCallback) {
			this.executeAuthenticatedRequest(function() {
				var user = pm.user;

				var getUrl = pm.apiUrl + "/users/" + user.get("id") + "/purchases";
				getUrl += "?user_id=" + user.get("id");
				getUrl += "&access_token=" + user.get("access_token");

				$.ajax({
				    type:'GET',
				    url:getUrl,
				    success:function (data) {
				    	if (successCallback) {
				    		successCallback(data);
				    	}
				    }
				});
			});
		},

		getUserCollections: function(successCallback, errorCb) {
			this.executeAuthenticatedRequest(function() {
				var user = pm.user;

				var getUrl = pm.apiUrl + "/users/" + user.get("id") + "/collections";
				getUrl += "?user_id=" + user.get("id");
				getUrl += "&access_token=" + user.get("access_token");

				$.ajax({
				    type:'GET',
				    url:getUrl,
				    success:function (data) {
				    	if (successCallback) {
				    		successCallback(data);
				    	}
				    },
				    error: function() {
				    	if(typeof errorCb === "function") {
				    		errorCb();
				    	}
				    }
				});
			});
		},

		getUserData: function(successCallback) {
			this.executeAuthenticatedRequest(function() {
				var user = pm.user;

				var getUrl = pm.apiUrl + "/users/" + user.get("id");
				getUrl += "?user_id=" + user.get("id");
				getUrl += "&access_token=" + user.get("access_token")
				try {
					getUrl += "&app_version=" + pm.app.getVersion();
				}
				catch(e) {
					//if manifest isnt loaded properly
					getUrl += "&app_version=unknown";
				}

				if(postman_electron) {
					getUrl += "&app_target=electron";
				}
				else {
					getUrl += "&app_target=chrome";
				}


				$.ajax({
				    type:'GET',
				    url:getUrl,
				    success:function (data) {
				    	if (successCallback) {
				    		successCallback(data);
				    	}
				    },
				    error: successCallback
				});
			});
		},

		getUserOrganizations: function(successCallback) {

			this.executeAuthenticatedRequest(function() {
				var user = pm.user;

				var getUrl = pm.apiUrl + "/users/" + user.get("id") + "/organizations";
				getUrl += "?user_id=" + user.get("id");
				getUrl += "&access_token=" + user.get("access_token");

				$.ajax({
					type:'GET',
					url:getUrl,
					success:function (data) {
						if (successCallback) {
							successCallback(data);
						}
					}
				});
			});
		},

		deleteSharedCollection: function(id, successCallback) {
			this.executeAuthenticatedRequest(function() {
				var user = pm.user;

				var deleteUrl = pm.apiUrl + "/users/" + user.get("id") + "/collections/" + id;
				deleteUrl += "?user_id=" + user.get("id");
				deleteUrl += "&access_token=" + user.get("access_token");

				$.ajax({
				    type:'DELETE',
				    url:deleteUrl,
				    success:function (data) {
				    	if (successCallback) {
				    		successCallback(data);
				    	}
				    }
				});
			});
		},

		getCollectionFromRemoteId: function(id, successCallback) {
			var getUrl = pm.apiUrl + "/collections/" + id;
			getUrl += "?id_type=remote&user_id=" + pm.user.get("id");
			getUrl += "&access_token=" + pm.user.get("access_token");

			$.get(getUrl, function (data) {
				if (successCallback) {
					successCallback(data);
				}
			});
		},

		postErrorToServer: function(msg, url, lineNumber, colNumber, stack, installationId, userId, currTime, version, accessToken) {
			var errorUrl = pm.apiUrl + "/app_error";
			if(userId=="0" || !userId) {
				return;
			}
			$.ajax({
				url: errorUrl,
				type: "POST",
				data: {
					msg: msg,
					url: url || "Custom message",
					line_number: lineNumber,
					col_number: colNumber,
					stack_trace: stack,
					installation_id: installationId,
					user_id: userId,
					timestamp: currTime + "",
					version: version
				},
				headers: {"X-Access-Token": accessToken},
				success: function() {
					console.log("Error message sent to server");
				}
			});
		},

		acceptSyncEula: function(userId, token, successCallback) {
			var getUrl = pm.apiUrl + "/sync-eula-accept";
			getUrl += "?user_id=" + userId;
			getUrl += "&access_token=" + token;

			$.post(getUrl, function (data) {
				if (successCallback) {
					successCallback(data);
				}
			});
		},

		//To be used when the base eula is shown
		//acceptBaseEula: function(userId, token, successCallback) {
		//	var getUrl = pm.apiUrl + "/base-eula-accept";
		//	getUrl += "?user_id=" + userId;
		//	getUrl += "&access_token=" + token;
		//
		//	$.post(getUrl, function (data) {
		//		if (successCallback) {
		//			successCallback(data);
		//		}
		//	});
		//},

		notifyServerOfVersionChange: function(newVersion) {
			var vUrl = pm.apiUrl + "/user_app_version";
			var user = pm.user;
			var id = user.get("id");
			if(id==0) return;
			var token = user.get("access_token");
			$.ajax({
				url: vUrl,
				type: "PUT",
				data: {
					version: newVersion,
					user_id: id
				},
				headers: {"X-Access-Token": token},
				success: function() {
				}
			});
		},

		getCollectionRevisions: function(collectionId, count, since_id, max_id, cb, cbf) {
	    var userId = pm.user.get("id");
	    var accessToken = pm.user.get("access_token");

	    if(!userId || !accessToken || !collectionId) {
	      cbf();
	    }

	    var getUrl = postman_syncserver_url +
	                '/api/collection/revisions/' + collectionId +
	                '?user_id=' + userId +
	                '&access_token=' + accessToken;

	    if(max_id) { getUrl += '&max_id=' + max_id; }
	    if(since_id) { getUrl += '&since_id=' + since_id; }
	    if(count) { getUrl += '&count=' + count; }

	    $.ajax({
	      url: getUrl,
	      type: 'GET',
	      success: cb,
	      error: cbf
	    });
	  },

	  getCollectionPermissions: function(collectionId, cb, cbf) {
	    var userId = pm.user.get("id");
	    var accessToken = pm.user.get("access_token");

	    if(!userId || !accessToken || !collectionId) {
	      cbf();
	    }

	    var getUrl = postman_syncserver_url +
	                '/api/collection/share/' + collectionId +
	                '?user_id=' + userId +
	                '&access_token=' + accessToken;

	    $.ajax({
	      url: getUrl,
	      type: 'GET',
	      success: cb,
	      error: cbf
	    });
	  }

	});

	module.exports = PostmanAPI;


/***/ },

/***/ 16:
/***/ function(module, exports) {

	var InterceptorIntro = Backbone.View.extend({
		initialize: function() {
			var model = this.model;
			var view = this;

			$("#modal-interceptor-intro").on("shown", function () {
	            $("#interceptor-intro-name").focus();
	            pm.app.trigger("modalOpen", "#modal-interceptor-intro");
	        });

	        $("#modal-interceptor-intro").on("hidden", function () {
	            pm.app.trigger("modalClose");
	        });

	        $("#modal-interceptor-install").on("click", function() {
	        	view.triggerInstall();
	        });

	        if(postman_electron) {
	        	$(".interceptor-opener").remove();
	        }
		},

		triggerInstall: function() {
			console.log("Trigger install");
			var url = "https://chrome.google.com/webstore/detail/" + postman_interceptor_id;
			window.open(url);
		}
	});

	module.exports = InterceptorIntro;


/***/ },

/***/ 19:
/***/ function(module, exports, __webpack_require__) {

	var PmCollection = __webpack_require__(10);

	var PmCollections = Backbone.Collection.extend({
	    model: PmCollection,

	    isLoaded: false,
	    initializedSyncing: false,
	    syncFileTypeCollection: "collection",
	    syncFileTypeCollectionRequest: "collection_request",

	    overwriteCollectionQueue: [],

	    sorters: {
	        lastModifiedAsc: function(a, b){
	            return (
	                new Date(a.get("updatedAt")).getTime() > (new Date(b.get("updatedAt"))).getTime()
	            )
	        },
	        lastModifiedDesc: function(a, b){return (new Date(b.get("updatedAt"))).getTime() > (new Date(a.get("updatedAt"))).getTime()},
	        nameAsc: function(a, b){return a.get("name").toLowerCase() > b.get("name").toLowerCase()},
	        nameDesc: function(a, b){return b.get("name").toLowerCase() > a.get("name").toLowerCase()}
	    },

	    comparator: function(a, b) {
	        var counter;

	        var aName = a.get("name");
	        var bName = b.get("name");

	        if(aName==null) return -1;
	        if(bName==null) return 1;

	        if (aName.length > bName.length)
	            counter = bName.length;
	        else
	            counter = aName.length;

	        for (var i = 0; i < counter; i++) {
	            if (aName[i] == bName[i]) {
	                continue;
	            } else if (aName[i] > bName[i]) {
	                return 1;
	            } else {
	                return -1;
	            }
	        }
	        return 1;
	    },

	    initialize: function() {
	        this.loadAllCollections();
	        this.collectionIdUserMap = {};
	        // TODO Add events for in-memory updates
	        pm.appWindow.trigger("registerInternalEvent", "addedCollection", this.onAddedCollection, this);
	        pm.appWindow.trigger("registerInternalEvent", "updatedCollection", this.onUpdatedCollection, this);
	        pm.appWindow.trigger("registerInternalEvent", "deletedCollection", this.onDeletedCollection, this);

	        pm.appWindow.trigger("registerInternalEvent", "addedCollectionRequest", this.onAddedCollectionRequest, this);
	        pm.appWindow.trigger("registerInternalEvent", "updatedCollectionRequest", this.onUpdatedCollectionRequest, this);
	        pm.appWindow.trigger("registerInternalEvent", "deletedCollectionRequest", this.onDeletedCollectionRequest, this);
	        pm.appWindow.trigger("registerInternalEvent", "moveRequestToCollection", this.onMoveRequestToCollectionFromWindow, this);
	        pm.appWindow.trigger("registerInternalEvent", "moveRequestToFolder", this.onMoveRequestToFolderFromWindow, this);

	        pm.appWindow.trigger("registerInternalEvent", "addedFolder", this.onAddedFolder, this);
	        pm.appWindow.trigger("registerInternalEvent", "updatedFolder", this.onUpdatedFolder, this);
	        pm.appWindow.trigger("registerInternalEvent", "deletedFolder", this.onDeletedFolder, this);

	        pm.mediator.on("addDirectoryCollection", this.onAddDirectoryCollection, this);
	        pm.mediator.on("addResponseToCollectionRequest", this.addResponseToCollectionRequest, this);
	        pm.mediator.on("updateResponsesForCollectionRequest", this.updateResponsesForCollectionRequest, this);
	        pm.mediator.on("updateResponsesForCollectionRequestWithOptSync", this.updateResponsesForCollectionRequestWithOptSync, this);
	        pm.mediator.on("deletedSharedCollection", this.onDeletedSharedCollection, this);
	        pm.mediator.on("overwriteCollection", this.onOverwriteCollection, this);
	        pm.mediator.on("uploadAllLocalCollections", this.onUploadAllLocalCollections, this);

	        pm.mediator.on("shareError", this.onShareError, this);



	        //--Sync listeners---
	        pm.mediator.on("syncChangeReceived", this.onSyncChangeReceived, this);
	        pm.mediator.on("syncErrorReceived", this.onSyncErrorReceived, this);

	        this.on("unsubscribeFromCollection", this.unsubscribeFromCollection, this);

	        this.missingCollectionTimeouts = {};
	    },

	    unsubscribeFromCollection: function(collectionMeta) {
	        console.error("Wrong event triggered");
	    },

	    onShareError: function(verb, collectionId) {
	        if(verb==="share") {
	            //error while sharing
	            var collection = this.get("collectionId");
	            if(collection) {
	                collection.set("sharedWithTeam", false);
	            }
	        }
	        else if(verb==="unshare"){
	            var collection = this.get("collectionId");
	            if(collection) {
	                collection.set("sharedWithTeam", false);
	            }
	        }
	    },

	    getOwnerForCollection: function(collectionId) {
	        var owner = this.collectionIdUserMap[collectionId];
	        return (!!owner)?owner:0;
	    },

	    onAddedCollection: function(collection) {
	        this.add(collection, { merge: true });
	    },

	    onUpdatedCollection: function(collection) {
	        this.add(collection, { merge: true });
	        this.trigger("updateCollection");
	        pm.mediator.trigger("refreshCollections");
	        //pm.syncManager.addChangeset("collection","update",collection, null, true);

	        var collectionModel = this.get(collection.id);
	        pm.collections.trigger('updateCollectionMeta',collectionModel);
	    },

	    onDeletedCollection: function(id) {
	        this.remove(id);
	        //pm.syncManager.addChangeset("collection","destroy",{id:'id'}, null, true);
	    },

	    onAddedCollectionRequest: function(request) {
	        var collection = this.get(request.collectionId);

	        if (collection) {
	            collection.addRequest(request);
	            if(request.folder) {
	                this.moveRequestToFolderWithOptSync(request.id, request.folder, false, function(){});
	            }
	            else {
	                collection.addRequestIdToOrder(request.id);
	            }
	        }

	        this.trigger("addCollectionRequest", request, false, false);
	    },

	    onUpdatedCollectionRequest: function(request) {
	        var collection = this.get(request.collectionId);

	        if (collection) {
	            collection.updateRequest(request);
	            this.trigger("updateCollectionRequest", request, true);
	            pm.mediator.trigger("updateCollectionRequest", request);
	            //pm.syncManager.addChangeset("request","update",request, null, true);
	        }
	    },

	    onDeletedCollectionRequest: function(id) {
	        var request = this.getRequestById(id);
	        var collection = this.get(request.collectionId);

	        if (collection) {
	            collection.deleteRequest(id);
	            this.trigger("removeCollectionRequest", id);
	            //pm.syncManager.addChangeset("request","destroy",id, null, true);
	        }
	    },

	    onMoveRequestToCollectionFromWindow: function(rid, cid) {
	        this.moveRequestToCollectionWithOptSync(rid, cid, false);
	    },

	    onMoveRequestToFolderFromWindow: function(rid, fid) {
	        this.moveRequestToFolderWithOptSync(rid, fid, false);
	    },

	    onAddedFolder: function(collectionSent, folder) {
	        var collection = this.get(collectionSent.id);
	        if(collection) {
	            collection.addFolder(folder);
	            this.trigger("addFolder", collection, folder);
	            //pm.syncManager.addChangeset("folder","create",folder, null, true);
	        }
	    },

	    onUpdatedFolder: function(collectionSent, folder) {
	        var collection = this.get(collectionSent.id);
	        if(collection) {
	            collection.editFolder(folder);
	            this.trigger("updateFolder", collection, folder);

	            if(folder.hasOwnProperty("order")) {
	                this.trigger("sortRequestContainer", "folder", folder.id, folder.order);
	            }
	            //pm.syncManager.addChangeset("folder","update",folder, null, true);
	        }
	    },

	    onDeletedFolder: function(collectionSent, folderId) {
	        var collection = this.get(collectionSent.id);
	        if(collection) {
	            collection.deleteFolder(folderId);
	            this.trigger("deleteFolder", collection, folderId);
	            //pm.syncManager.addChangeset("folder","destroy",folderId, null, true);
	        }
	    },

	    onUploadAllLocalCollections: function() {

	        var uploaded = 0;
	        var count = this.models.length;

	        function callback() {
	            uploaded++;

	            if (uploaded === count) {
	                pm.mediator.trigger("refreshSharedCollections");
	            }
	        }

	        for(var i = 0; i < this.models.length; i++) {
	            this.uploadCollection(this.models[i].get("id"), false, false, callback);
	        }
	    },

	    getCollectionById: function(id) {
	        for(var i = 0; i < this.models.length; i++) {
	            if(id===this.models[i].get("id")) {
	                return this.models[i];
	            }
	        }
	        return null;
	    },

	    getCollectionByName: function (name) {
	        for(var i = 0; i < this.models.length; i++) {
	            if(name===this.models[i].get("name")) {
	                return this.models[i];
	            }
	        }
	        return null;
	    },

	    getAllCollections: function() {
	        return this.models;
	    },

	    getAllOwnCollections: function() {
	        return _.filter(this.models, function(c) {
	            var owner = c.get("owner");
	            if(!owner || (owner+""=="0") || owner==pm.user.id) return true;
	        });
	    },

	    // TODO
	    // This needs to be refactored to allow
	    // smoother collection loading
	    // Load all collections
	    loadAllCollections:function () {
	        var pmCollection = this;

	        this.startListeningForFileSystemSyncEvents();

	        pm.indexedDB.getCollections(function (items) {
	            var itemsLength = items.length;
	            var loaded = 0;

	            function onGetAllRequestsInCollection(collection, requests) {
	                //remove nonsense fields from each request
	                _.each(requests, function(request) {
	                    delete request.folderId; //this is not supported at all!
	                    delete request.collectionRequestId; //this is not supported at all!
	                    delete request.collection; //this is not supported at all!

	                    //remove duplicate responses
	                    if(request.responses instanceof Array) {
	                        request.responses = _.uniq(request.responses, function(item) {
	                            return item.id;
	                        });
	                    }
	                });

	                var c = new PmCollection(collection);
	                c.setRequests(requests);
	                pmCollection.add(c, {merge: true});
	                pmCollection.sanitizeOrder(c);

	                pmCollection.collectionIdUserMap[collection.id] = collection.owner;

	                loaded++;

	                for(var i = 0; i < requests.length; i++) {
	                    pm.mediator.trigger("addToURLCache", requests[i].url);
	                }

	                if (loaded === itemsLength) {
	                    pmCollection.isLoaded = true;
	                    pmCollection.trigger("startSync");
	                    if(pm.syncManager) pm.syncManager.trigger("itemLoaded","collections");
	                    pm.mediator.trigger("refreshCollections");
	                    pm.mediator.trigger("loadedCollections");
	                    pm.mediator.trigger("loadedCollectionsFromDB");
	                    pm.mediator.trigger("modelsLoaded", "collection");

	                }
	            }

	            if (itemsLength === 0) {
	                pmCollection.isLoaded = true;
	                pmCollection.trigger("startSync");
	                pm.mediator.trigger("loadedCollectionsFromDB");
	                if(pm.syncManager) pm.syncManager.trigger("itemLoaded","collections");
	                pm.mediator.trigger("modelsLoaded", "collection");
	            }
	            else {
	                for (var i = 0; i < itemsLength; i++) {
	                    var collection = items[i];
	                    pm.indexedDB.getAllRequestsInCollection(collection, onGetAllRequestsInCollection);
	                }
	            }

	        });
	    },


	    startListeningForFileSystemSyncEvents: function() {
	        var pmCollection = this;
	        var isLoaded = pmCollection.isLoaded;
	        var initializedSyncing = pmCollection.initializedSyncing;

	        pm.mediator.on("initializedSyncableFileSystem", function() {
	            pmCollection.initializedSyncing = true;
	            pmCollection.trigger("startSync");
	        });

	        this.on("startSync", this.startSyncing, this);
	    },

	    startSyncing: function() {
	        var i;
	        var j;
	        var pmCollection = this;
	        var collection;
	        var requests;
	        var request;
	        var synced;
	        var syncableFile;

	        if (this.isLoaded && this.initializedSyncing) {

	            pm.mediator.on("addSyncableFileFromRemote", function(type, data) {
	                if (type === "collection") {
	                    pmCollection.onReceivingSyncableFileData(data);
	                }
	                else if (type === "collection_request") {
	                    pmCollection.onReceivingSyncableFileDataForRequests(data);
	                }
	            });

	            pm.mediator.on("updateSyncableFileFromRemote", function(type, data) {
	                if (type === "collection") {
	                    pmCollection.onReceivingSyncableFileData(data);
	                }
	                else if (type === "collection_request") {
	                    pmCollection.onReceivingSyncableFileDataForRequests(data);
	                }
	            });

	            pm.mediator.on("deleteSyncableFileFromRemote", function(type, id) {
	                if (type === "collection") {
	                    pmCollection.onRemoveSyncableFile(id);
	                }
	                else if (type === "collection_request") {
	                    pmCollection.onRemoveSyncableFileForRequests(id);
	                }
	            });

	            // And this
	            for(i = 0; i < this.models.length; i++) {
	                collection = this.models[i];
	                synced = collection.get("synced");

	                if (!synced) {
	                    this.addToSyncableFilesystem(collection.get("id"));
	                }

	                requests = collection.get("requests");

	                for(j = 0; j < requests.length; j++) {
	                    request = requests[j];

	                    if (request.hasOwnProperty("synced")) {
	                        if (!request.synced) {
	                            this.addRequestToSyncableFilesystem(request.id);
	                        }
	                    }
	                    else {
	                        this.addRequestToSyncableFilesystem(request.id);
	                    }
	                }
	            }
	        }
	        else {
	        }
	    },

	    onReceivingSyncableFileData: function(data) {
	        var collection = JSON.parse(data);
	        this.addCollectionFromSyncableFileSystem(collection);
	    },

	    onRemoveSyncableFile: function(id) {
	        this.deleteCollectionFromDataStore(id, false, function() {
	        });
	    },

	    onReceivingSyncableFileDataForRequests: function(data) {
	        var request = JSON.parse(data);
	        this.addRequestFromSyncableFileSystem(request);
	    },

	    onRemoveSyncableFileForRequests: function(id) {
	        this.deleteRequestFromDataStore(id, false, false, function() {
	        });
	    },

	    onOverwriteCollection: function(collection) {
	        this.overwriteCollection(collection);
	    },

	    onDeletedSharedCollection: function(collection) {
	        var c;
	        var pmCollection = this;

	        for(var i = 0; i < this.models.length; i++) {
	            var c = this.models[i];
	            if (c && (c.get("remote_id") === collection.remote_id)) {
	                var oldC = pmCollection.getJSONFromCollection(c);
	                c.set("remote_id", 0);
	                pmCollection.updateCollectionInDataStore(c.getAsJSON(), oldC, true, function (c) {
	                });
	                break;
	            }
	        }
	    },

	    sanitizeCollection: function(collectionJson) {
	        //make sure helper attributes is a string
	        if(collectionJson.requests) {
	            var numReq = collectionJson.requests.length;
	            for(i=0;i<numReq;i++) {
	                if(typeof collectionJson.requests[i].helperAttributes === "object") {
	                    collectionJson.requests[i].helperAttributes = JSON.stringify(collectionJson.requests[i].helperAttributes);
	                }

	                if(collectionJson.requests[i].responses && (collectionJson.requests[i].responses instanceof Array)) {
	                    var numResponse = collectionJson.requests[i].responses.length;
	                    for(j=0;j<numResponse;j++) {
	                        if(typeof collectionJson.requests[i].responses[j].request === "object") {
	                            collectionJson.requests[i].responses[j].requestObject = JSON.stringify(collectionJson.requests[i].responses[j].request);
	                            collectionJson.requests[i].responses[j].request = collectionJson.requests[i].id;
	                        }
	                    }
	                }
	            }
	        }

	        return collectionJson;
	    },

	    sanitizeOrder: function(cModel) {
	        var pmCollection = this;
	        try {
	            var oldOrder = cModel.get("order");
	            var folders = cModel.get("folders");
	            for (var i = 0; i < folders.length; i++) {
	                if (folders[i]) {
	                    oldOrder = oldOrder.concat(folders[i].order);
	                }
	            }

	            var requests = cModel.get("requests");
	            for (var j = 0; j < requests.length; j++) {
	                if(oldOrder.indexOf(requests[j].id) === -1) {
	                    //move this request to the collection
	                    pmCollection.moveRequestToCollection(requests[j].id, cModel.get("id"));
	                }
	            }
	        }
	        catch(e) {
	            console.error("Error sanitizing order for collection: " , e);
	            //not essential
	        }
	    },

	    getAsSyncableFile: function(id) {
	        var collection = this.get(id);
	        var name = id + ".collection";
	        var type = "collection";

	        var data = JSON.stringify(collection.toSyncableJSON());

	        return {
	            "name": name,
	            "type": type,
	            "data": data
	        };
	    },

	    getRequestAsSyncableFile: function(id) {
	        var request = this.getRequestById(id);
	        var name = id + ".collection_request";
	        var type = "collection_request";

	        if(request!=null) {
	            request.synced = true;
	        }

	        var data = JSON.stringify(request);

	        return {
	            "name": name,
	            "type": type,
	            "data": data
	        };
	    },

	    addToSyncableFilesystem: function(id) {
	        var pmCollection = this;

	        var syncableFile = this.getAsSyncableFile(id);
	        pm.mediator.trigger("addSyncableFile", syncableFile, function(result) {
	            if(result === "success") {
	                pmCollection.updateCollectionSyncStatus(id, true);
	            }
	        });
	    },

	    removeFromSyncableFilesystem: function(id) {
	        var name = id + ".collection";
	        pm.mediator.trigger("removeSyncableFile", name, function(result) {
	        });
	    },

	    addRequestToSyncableFilesystem: function(id) {
	        var pmCollection = this;

	        var syncableFile = this.getRequestAsSyncableFile(id);
	        pm.mediator.trigger("addSyncableFile", syncableFile, function(result) {
	            if(result === "success") {
	                pmCollection.updateCollectionRequestSyncStatus(id, true);
	            }
	        });
	    },

	    removeRequestFromSyncableFilesystem: function(id) {
	        var name = id + ".collection_request";
	        pm.mediator.trigger("removeSyncableFile", name, function(resfult) {
	        });
	    },

	    getMissingServerRequest: function(requestId, owner) {
	        pm.syncManager.getEntityFromId("request",requestId, owner, null, function(res,owo) {
	            if(!res.data) {
	                pm.syncLogger.error("No requestData received for requestId: " + requestId+", owner=" + ownerId);
	                return;
	            }
	            res["collectionId"]=res.data.collection;
	            if(res.data.dataMode==="raw" && res.data.rawModeData) {
	                res.data.data = res.rawModeData;
	                delete res.data.rawModeData;
	            }
	            pm.collections.addFullCollectionRequest(res.data, null);
	        });
	    },

	    getMissingServerCollection: function(collectionId, owner) {
	        pm.syncManager.getEntityFromId("collection",collectionId, owner, null, function(res,owo) {
	            if(!res.data) {
	                pm.syncLogger.error("No collectionData received for collectionId: " + collectionId+", owner=" + owner);
	                return;
	            }
	            pm.collections.addFullCollection(res.data, true, null);
	            pm.syncManager.getFoldersForObject(res.data, res.data.owner, false);
	            pm.syncManager.getRequestsForObject(res.data, res.data.owner, res.data.id, "collection");

	        });
	    },


	    correctFolderOrder: function(id, serverOrder, localOrder, owner) {
	        var localFolder = pm.collections.getFolderById(id);
	        if(!localFolder) {
	            console.log("Fatal - tried to update folder order but can't find the folder locally");
	            return true; //clearChange should be true - this cannot be updated
	        }

	        //iterate through server order
	        var serverLength = serverOrder.length;
	        for(var i=0;i<serverLength;i++) {
	            if(localOrder.indexOf(serverOrder[i])==-1) {
	                //this request doesnt exist locally - get it
	                this.getMissingServerRequest(serverOrder[i], owner);
	            }
	        }

	        for(var i=0;i<localOrder.length; i++) {
	            if(serverOrder.indexOf(localOrder[i])==-1) {
	                //this request doesn't exist on the server - send it
	                pm.collections.resyncRequestId(localOrder[i]);
	            }
	        }

	        return false; //can resync the original order update
	    },

	    correctCollectionOrder: function(id, serverOrder, localOrder, owner) {
	        var localCollection = pm.collections.getCollectionById(id);
	        if(!localCollection) {
	            console.log("Fatal - tried to update folder order but can't find the folder locally");
	            return true; //clearChange should be true - this cannot be updated
	        }

	        var serverLength = serverOrder.length;
	        for(var i=0;i<serverLength;i++) {
	            if(localOrder.indexOf(serverOrder[i])==-1) {
	                //this request doesnt exist locally - get it
	                this.getMissingServerRequest(serverOrder[i], owner);
	            }
	        }

	        for(var i=0;i<localOrder.length; i++) {
	            if(serverOrder.indexOf(localOrder[i])==-1) {
	                //this request doesn't exist on the server - send it
	                pm.collections.resyncRequestId(localOrder[i]);
	            }
	        }

	        return false; //can resync the original order update
	    },

	    /* Base data store functions*/
	    addCollectionToDataStore: function(collectionJSON, sync, terminateTransaction, callback) {
	        var pmCollection = this
	        var justSubscribed = collectionJSON.justSubscribed;
	        delete collectionJSON.justSubscribed;
	        if(this.get(collectionJSON.id)) {
	            //pm.syncLogger.error("Fatal - readding same collection. How is this happening?");
	        }
	        pm.indexedDB.addCollection(collectionJSON, function (c) {
	            var collection = new PmCollection(c);
	            collection.justSubscribed = justSubscribed;
	            pmCollection.add(collection);//, {merge: true}); //Why??
	            pm.appWindow.trigger("sendMessageObject", "addedCollection", collection);

	            if(!collection.attributes.synced) {
	                pm.syncManager.addChangeset("collection","create",c, null, terminateTransaction);
	                pm.bulkAnalytics.addCurrentEvent("collection", "create", "empty", "");
	                if(terminateTransaction==false && c.hasOwnProperty("folders") && c.folders instanceof Array) {
	                    var numFolders = c.folders.length;
	                    var i;
	                    for(i=0;i<numFolders;i++) {
	                        pm.syncManager.addChangeset("folder","create", c.folders[i], null, false);

	                        //if there are requests, the commit will be sent after the requests have been added
	                        //if not we'll send it now
	                        if(i === numFolders-1 && c.hasRequests!==true) {
	                            pm.mediator.trigger("commitTransaction", c.id);
	                        }
	                    }
	                }
	            }

	            if (sync) {
	                pmCollection.addToSyncableFilesystem(collection.get("id"));
	            }

	            if (callback) {
	                callback(c);
	            }

	            pm.mediator.trigger("databaseOperationComplete");

	            pm.mediator.trigger("refreshCollections");
	            pm.mediator.trigger('syncOperationDone');
	        });
	    },

	    updateCollectionInDataStoreWithOptSync: function(collectionJSON, oldCollection, sync, toSync, callback) {
	        var pmCollection = this;

	        if(toSync) {
	            collectionJSON.updatedAt = Date.now();
	        }
	        pm.indexedDB.updateCollection(collectionJSON, oldCollection, toSync, function (c) {
	            var collection = pmCollection.get(c.id);
	            pmCollection.add(collection, {merge: true});
	            if(toSync) {
	                pm.appWindow.trigger("sendMessageObject", "updatedCollection", collection);
	            }
	            pm.mediator.trigger("databaseOperationComplete");
	            pm.mediator.trigger("refreshCollections");

	            if(toSync) {
	                var objectToUpdate = pm.syncManager.mergeEntitiesForUpdate(c, oldCollection);
	                pm.syncManager.addChangeset("collection","update",objectToUpdate, null, true);
	            }

	            if (sync && collection!=null) {
	                pmCollection.addToSyncableFilesystem(collection.get("id"));
	            }

	            if (callback) {
	                callback(c);
	            }
	        });
	    },

	    updateCollectionInDataStore: function(collectionJSON, oldCollection, sync, callback) {
	        this.updateCollectionInDataStoreWithOptSync(collectionJSON, oldCollection, sync, true, callback);
	    },

	    updateCollectionInDataStoreWithoutSync: function(collectionJSON, oldCollection, sync, callback) {
	        this.updateCollectionInDataStoreWithOptSync(collectionJSON, oldCollection, sync, false, callback);
	    },

	    mergeEntitiesForUpdate: function (newO, oldO) {
	        var ret = {};
	        ret["id"] = newO.id;
	        ret["owner"] = newO.owner;
	        for (key in oldO) {
	            ret[key] = oldO[key];
	        }
	        for (key in newO) {
	            ret[key] = newO[key];
	        }
	        return ret;
	    },

	    /**
	     * This is called when the sync server sends an update collection event
	     * @param collectionJSON
	     * @param oldCollection
	     * @param sync
	     * @param callback
	     * @returns {number}
	     */
	    updateRemoteCollectionInDataStore: function(collectionJSON, oldCollection, sync, callback) {
	        var pmCollection = this;
	        try {
	            oldCollection = pm.collections.getCollectionById(collectionJSON.id);
	            if(!oldCollection) {
	                pm.syncLogger.error("Updating remote collection failed. Collection id " + collectionJSON.id + " doesn't exist on this machine");
	                throw "Local collection not found";
	            }
	            oldCollection = oldCollection.getAsJSON();
	            collectionJSON = this.mergeEntitiesForUpdate(collectionJSON, oldCollection);
	            if(collectionJSON.hasOwnProperty("shared")) {
	                collectionJSON.sharedWithTeam = collectionJSON.shared;
	            }

	            pm.indexedDB.updateCollection(collectionJSON, oldCollection, false, function (c) {
	                var collection = new PmCollection(collectionJSON);//pmCollection.get(c.id);
	                var oldRequests = pm.collections.getCollectionById(c.id).get("requests");
	                collection.setRequests(oldRequests);

	                pmCollection.add(collection, {merge: true});

	                pm.appWindow.trigger("sendMessageObject", "updatedCollection", collection);
	                pm.mediator.trigger("databaseOperationComplete");
	                pm.mediator.trigger("refreshCollections");
	                pm.collections.trigger('updateCollectionMeta',collection)
	                pm.mediator.trigger('syncOperationDone');

	                if (sync) {
	                    pmCollection.addToSyncableFilesystem(collection.get("id"));
	                }

	                if (typeof callback === "function") {
	                    callback(c);
	                }
	            });
	        }
	        catch(e) {
	            pm.syncLogger.error("Update collection failed: "+e);
	            if(typeof callback === "function") {
	                callback();
	            }
	            return -1;
	        }
	        return 0;
	    },

	    deleteCollectionFromDataStoreWithOptSync: function(id, sync, toSync, callback) {
	        var pmCollection = this;

	        pm.indexedDB.deleteCollectionWithOptSync(id, toSync, function () {
	            pmCollection.remove(id);
	            if(toSync) {
	                pm.appWindow.trigger("sendMessageObject", "deletedCollection", id);
	            }
	            pm.mediator.trigger("databaseOperationComplete");
	            pm.mediator.trigger('syncOperationDone');
	            if (sync) {
	                pmCollection.removeFromSyncableFilesystem(id);
	            }

	            if(toSync) {
	                pm.syncManager.addChangeset("collection","destroy",{id:id}, null, true);
	            }

	            pm.api.deleteCollectionFromTeam(pm.user.id,  pm.user.get("access_token"), id, function() {
	                //console.log("Deleted from team");
	            }, function() {
	                //console.log("Could not delete collection from team");
	            });

	            pm.indexedDB.getAllRequestsForCollectionId(id, function(requests) {
	                var deleted = 0;
	                var requestCount = requests.length;
	                var request;
	                var i;

	                if (requestCount > 0) {
	                    for(i = 0; i < requestCount; i++) {
	                        request = requests[i];

	                        pm.indexedDB.deleteCollectionRequestWithOptSync(request.id, false, function (requestId) {
	                            deleted++;

	                            pm.mediator.trigger("databaseOperationComplete");

	                            if (sync) {
	                                pmCollection.removeRequestFromSyncableFilesystem(requestId);
	                            }


	                            if (deleted === requestCount) {
	                                pm.mediator.trigger("refreshCollections");
	                                if (callback) {
	                                    callback();
	                                }
	                            }
	                        });
	                    }
	                }
	                else {
	                    if (callback) {
	                        callback();
	                    }
	                }
	            });
	        });
	    },

	    deleteCollectionFromDataStore: function(id, sync, callback) {
	        //Children shouldn't be deleted
	        this.deleteCollectionFromDataStoreWithOptSync(id, sync, false, callback);
	    },

	    getJSONFromCollection: function(collection) {
	        return {
	            "id": collection.attributes.id,
	            "name": collection.attributes.name,
	            "description": collection.attributes.description,
	            "order": collection.attributes.order,
	            "folders": collection.attributes.folders,
	            "timestamp": collection.attributes.timestamp,
	            "synced": collection.attributes.synced,
	            "owner": collection.attributes.owner,
	            "remote_id": collection.attributes.remote_id,
	            "remoteLink": collection.attributes.remoteLink,
	            "write": collection.attributes.write
	        }
	    },

	    getJSONFromRequest: function(collectionRequest) {
	        if(!collectionRequest) return null;

	        return {
	            "collectionId": collectionRequest["collectionId"],
	            "data": _.clone(collectionRequest["data"]),
	            "dataMode": collectionRequest["dataMode"],
	            "description": collectionRequest["description"],
	            "headers": collectionRequest["headers"],
	            "id": collectionRequest["id"],
	            "method": collectionRequest["method"],
	            "name": collectionRequest["name"],
	            "pathVariables": _.clone(collectionRequest["pathVariables"]),
	            "preRequestScript": collectionRequest["preRequestScript"],
	            "responses": _.clone(collectionRequest["responses"]),
	            "tests": collectionRequest["tests"],
	            "time": collectionRequest["time"],
	            "url": collectionRequest["url"],
	            "version": collectionRequest["version"]
	        }
	    },

	    addRequestToDataStoreWithOptSync: function(request, sync, toSync, syncImmediately, callback) {
	        var pmCollection = this;

	        //this property is only used for callback. to trigger CommitTransaction after the last request has been sent
	        var requestToSave = _.clone(request);
	        delete request.isLastRequest;

	        if(!request.collectionId) {
	            request.collectionId = request.collection;
	        }

	        pm.indexedDB.addCollectionRequest(request, toSync, function (req) {
	            pm.mediator.trigger("addToURLCache", request.url);

	            var collection = pmCollection.get(request.collectionId);

	            pm.mediator.trigger("databaseOperationComplete");

	            if (collection) {
	                var cRequestIds = _.map(collection.get("requests"),"id");
	                if(cRequestIds.indexOf(request.id)==-1) {
	                    collection.addRequest(request);
	                    if(toSync) {
	                        pm.appWindow.trigger("sendMessageObject", "addedCollectionRequest", request);
	                        collection.set("updatedAt", Date.now());
	                    }
	                }
	            }

	            if(toSync) {
	                pm.syncManager.addChangeset("request","create",req, null, syncImmediately);


	                //sync responses as well
	                var responses = req.responses || [];
	                for(var i=0;i<responses.length;i++) {
	                    var responseToSync = _.cloneDeep(responses[i]); //cloneDeep so that the .request object's headers and data props are also cloned

	                    responseToSync.owner = req.owner;
	                    if(typeof responseToSync.request === "object" && !responseToSync.requestObject) {
	                        responseToSync.requestObject = JSON.stringify(responseToSync.request);
	                    }
	                    responseToSync.request = req.id;
	                    responseToSync.collectionId = req.collectionId;
	                    responseToSync.folder = req.folder;
	                    if(syncImmediately == false) {
	                        pm.syncManager.addChangeset("response", "create", responseToSync, null, false);
	                    }
	                    else {
	                        setTimeout(function (response) {
	                            return function () {
	                                pm.syncManager.addChangeset("response", "create", response, null, true);
	                            }
	                        }(responseToSync), 500);
	                    }

	                }
	            }

	            if (sync) {
	                pmCollection.addRequestToSyncableFilesystem(request.id);
	            }

	            if (callback) {
	                callback(requestToSave);
	            }
	        });
	    },

	    /**
	     *
	     * @param request: the request JSON
	     * @param sync: sync param for google drive
	     * @param syncImmediately whether the request change is sent to the anakin server immediately, or added to a batch
	     * @param callback
	     */
	    addRequestToDataStore: function(request, sync, syncImmediately, callback) {
	        this.addRequestToDataStoreWithOptSync(request,sync,true, syncImmediately, callback);
	    },

	    addRemoteRequestToDataStore: function(request, sync, callback) {
	        this.addRequestToDataStoreWithOptSync(request, sync, false, true, callback);
	    },

	    updateRequestInDataStore: function(request, oldRequest, sync, callback, toSync) {
	        var pmCollection = this;

	        if (!request.name) {
	            request.name = request.url;
	        }

	        //save request in tab
	        if(!pm.testRunner && pm.tabManager.requestTabMap[request.id]) {
	            //the request is already open in a tab
	            var tabId = pm.tabManager.requestTabMap[request.id];
	            pm.tabManager.updateRequestForTab(request, tabId);
	        }

	        if(!request.collectionId && request.collection) {
	            request.collectionId = request.collection;
	        }


	        pm.indexedDB.updateCollectionRequest(request, oldRequest, toSync, function (req) {
	            var collection = pmCollection.get(request.collectionId);


	            if (collection) {
	                collection.updateRequest(request);
	                pm.appWindow.trigger("sendMessageObject", "updatedCollectionRequest", request);
	                if(toSync) {
	                    collection.set("updatedAt", Date.now());
	                }
	            }

	            pm.mediator.trigger("databaseOperationComplete");

	            if(toSync) {
	                var objectToUpdate = pm.syncManager.mergeEntitiesForUpdate(req, oldRequest);
	                //ensure dataMode is present
	                if(req.dataMode) objectToUpdate.dataMode = req.dataMode;
	                if(collection) {
	                    objectToUpdate.owner = collection.get("owner");
	                    objectToUpdate.collectionId = collection.id;
	                }
	                pm.syncManager.addChangeset("request","update",objectToUpdate, null, true);
	            }


	            if (sync) {
	                pmCollection.addRequestToSyncableFilesystem(request.id);
	            }

	            if (callback) {
	                callback(request);
	            }
	        });
	    },

	    deleteRequestFromDataStoreWithOptSync: function(id, sync, syncCollection, toSync, callback) {
	        var pmCollection = this;

	        var request = this.getRequestById(id);

	        var targetCollection;

	        if (request) {
	            targetCollection = this.get(request.collectionId);
	        }

	        pm.indexedDB.deleteCollectionRequestWithOptSync(id, toSync, function () {
	            if (targetCollection) {
	                if(toSync) {
	                    targetCollection.set("updatedAt", Date.now());
	                }
	                var oldCollection = targetCollection.getAsJSON();
	                targetCollection.deleteRequest(id);
	                collection = targetCollection.getAsJSON();
	                pm.mediator.trigger("databaseOperationComplete");
	                if (sync) {
	                    pmCollection.removeRequestFromSyncableFilesystem(id);
	                    if(toSync) {
	                        pm.appWindow.trigger("sendMessageObject", "deletedCollectionRequest", id);
	                    }
	                }

	                if(toSync) {
	                    pm.syncManager.addChangeset("request","destroy",{id:id, owner: collection.owner}, null, true);
	                }

	                if(callback) {
	                    callback();
	                }

	                // A request deletion should never cause a collection update in sync
	                pmCollection.updateCollectionInDataStoreWithoutSync(collection, oldCollection, syncCollection, function(c) {
	                });

	            }
	            else {
	                if (sync) {
	                    pmCollection.removeRequestFromSyncableFilesystem(id);
	                }

	                if(callback) {
	                    callback();
	                }
	            }
	        });
	    },

	    deleteRequestFromDataStore: function(id, sync, syncCollection, callback) {
	        this.deleteRequestFromDataStoreWithOptSync(id,sync,syncCollection, true, callback);
	    },

	    /* Finish base data store functions*/

	    // Get collection by folder ID
	    getCollectionForFolderId: function(id) {
	        function existingFolderFinder(r) {
	            return r.id === id;
	        }

	        for(var i = 0; i < this.length; i++) {
	            var collection = this.models[i];
	            var folders = collection.get("folders");
	            var folder = _.find(folders, existingFolderFinder);
	            if (folder) {
	                return collection;
	            }
	        }

	        return null;
	    },

	    // Add collection from modal
	    addCollection:function (name, description) {
	        var pmCollection = this;

	        var collection = {};

	        if (name) {
	            collection.id = guid();
	            collection.name = name;
	            collection.description = description;
	            collection.order = [];
	            collection.createdAt = collection.updatedAt = collection.timestamp = Date.now();
	            collection.owner = pm.user.id;
	            collection.sharedWithTeam = false;
	            pmCollection.collectionIdUserMap[collection.id] = pm.user.id;
	            pmCollection.addCollectionToDataStore(collection, true, true);
	        }
	    },

	    resyncCollectionId: function(collectionId, syncImmediately) {
	        var collectionModel = pm.collections.getCollectionById(collectionId);
	        if(!collectionModel) {
	            console.log("Could not find collection. Have to delete change :(");
	            return true;
	        }

	        var collection = collectionModel.getAsJSON();
	        if(collection.owner == 0 || collection.owner=="0") {
	            collection.owner = pm.user.id;
	        }
	        //Why? If the collection was not found, it's always this user's
	        /*if(collection.owner !== pm.user.id) {
	            console.log("Only the owner can recreate the lost objects. Updating collection..");
	            return this.updateCollectionToRemote(collectionId, syncImmediately);
	        }*/

	        pm.syncManager.addChangeset("collection","create",collection, null, syncImmediately, false);

	        //send all folders
	        var numFolders = collection.folders?collection.folders.length:0;
	        for(var i=0;i<numFolders;i++) {
	            var folder = collection.folders[i];
	            this.resyncWholeFolder(folder, false);
	        }

	        //send all requests
	        var order = collection.order || [];
	        for(var i=0;i<order.length;i++) {
	            this.resyncRequestId(collection.order[i], false);
	        }

	        //trigger the stream
	        //console.log("Manually begin stream: " + collectionId);
	        return true;
	        //no need for all these stupid hacks
	        pm.mediator.trigger("beginUnsyncedStream", false, collectionId, false);


	        //delete the importChange
	        var oldChanges = pm.localChanges.get("unsyncedChanges");
	        var newChanges = [];
	        var numChanges = oldChanges.length;
	        for(i=0;i<numChanges;i++) {
	            if(oldChanges[i].verb==="importCollection" && oldChanges[i].stream===collectionId) {

	            }
	            else {
	                newChanges.push(oldChanges[i]);
	            }
	        }
	        pm.localChanges.set("unsyncedChanges", newChanges);
	        return true;
	    },

	    resyncCollectionByUser: function(id) {
	        var collection = this.getCollectionById(id);
	        if(!collection) {
	            return;
	        }
	        else {
	            if (collection.get("subscribed") === true && collection.get("write")==false) {
	                //resync folders and requests ONLY
	                collection = collection.toJSON();
	                pm.syncManager.addChangeset("collection","update",collection, null, false, true);

	                var numFolders = collection.folders?collection.folders.length:0;
	                for(var i=0;i<numFolders;i++) {
	                    var folder = collection.folders[i];
	                    this.updateFolderToRemote(folder, false, false);
	                }

	                var order = collection.order || [];
	                for(var i=0;i<order.length;i++) {
	                    this.resyncRequestId(collection.order[i], false, true);
	                }

	                //pm.mediator.trigger("beginUnsyncedStream", false, id, false);
	            }
	            else {
	                //resync whole collection
	                this.updateCollectionToRemote(id, false);
	            }
	        }
	    },

	    /**
	     * This takes a local collection, and calls PUT /collection on the remote server to update the order
	     */
	    updateCollectionToRemote: function(collectionId, syncImmediately) {
	        var collectionModel = pm.collections.getCollectionById(collectionId);
	        if(!collectionModel) {
	            console.log("Could not find collection");
	            return true;
	        }

	        var collection = collectionModel.getAsJSON();

	        pm.syncManager.addChangeset("collection","update",collection, null, syncImmediately, false);

	        var numFolders = collection.folders?collection.folders.length:0;
	        for(var i=0;i<numFolders;i++) {
	            var folder = collection.folders[i];
	            this.updateFolderToRemote(folder, false, false);
	        }

	        var order = collection.order || [];
	        for(var i=0;i<order.length;i++) {
	            this.resyncRequestId(collection.order[i], syncImmediately, true);
	        }

	        //return true
	        //trigger the stream
	        pm.mediator.trigger("beginUnsyncedStream", false, collectionId, false);
	        return true;
	    },

	    resyncFolderId: function(fid, syncImmediately) {
	        var folder = pm.collections.getFolderById(fid);
	        if(!folder) {
	            return true;
	        }
	        if(folder.owner === "0" || folder.owner === 0) {
	             folder.owner = pm.user.id;
	        }
	        //never sync immediately if the queue 
	        this.resyncWholeFolder(folder, syncImmediately, false);
	    },

	    resyncWholeFolder: function(folder, syncImmediately) {
	        if(typeof syncImmediately === "undefined") {
	            syncImmediately = true;
	        }
	        if(!folder) {
	            //no folder id passed
	            return true;
	        }

	        if(folder.owner == 0 || folder.owner=="0" || !folder.owner) {
	            folder.owner = pm.user.id;
	        }

	        /*if(folder.owner !== pm.user.id) {
	            console.log("Only the owner can recreate the lost objects");
	            return this.updateFolderToRemote(folder.id, syncImmediately, true);
	        }*/

	        pm.syncManager.addChangeset("folder","create",folder, null, syncImmediately, false);
	        var order = folder.order || [];
	        for(var i=0;i<order.length;i++) {
	            //even if the folder is synced immediately, the request has to wait for the folder
	            this.resyncRequestId(folder.order[i], false, false); //why does this need to be true?
	        }

	        return true;
	    },

	    /**
	     * This takes a local collection, and calls PUT /collection on the remote server to update the order
	     */
	    updateFolderToRemote: function(fid, syncImmediately, startStream) {
	        if(typeof syncImmediately === "undefined") {
	            syncImmediately = true;
	        }
	        if(typeof startStream === "undefined") {
	            startStream = true;
	        }
	        var folder = fid;
	        if(typeof fid === "string") {
	            folder = pm.collections.getFolderById(fid);
	        }
	        if(!folder) {
	            return;
	        }
	        if(folder.owner === "0" || folder.owner === 0) {
	            folder.owner = pm.user.id;
	        }

	        /*if(folder.owner !== pm.user.id) {
	            console.log("Only the owner can recreate the lost objects");
	            return false;
	        }*/

	        pm.syncManager.addChangeset("folder","update",folder, null, syncImmediately, false);

	        var order = folder.order || [];
	        for(var i=0;i<order.length;i++) {
	            this.resyncRequestId(folder.order[i], syncImmediately, true);
	        }

	        /*if(startStream) {
	            pm.mediator.trigger("beginUnsyncedStream", false, folder.collectionId, false);
	        }*/
	        return true;
	    },

	    /**
	     *
	     * @param rid
	     * @param syncImmediately
	     * @param update - if true, the client sends update instead of create
	     * @returns {boolean}
	     */
	    resyncRequestId: function(rid, syncImmediately, update) {
	        if(typeof syncImmediately === "undefined") {
	            syncImmediately = true;
	        }
	        if(typeof update === "undefined") {
	            update = false;
	        }
	        var request = pm.collections.getRequestById(rid);
	        if(!request) {
	            //cannot find request. have to clear the change
	            //pm.syncLogger.error("Could not find request for rid = " + rid + ". Clearing change..");
	            return true;
	        }
	        if(!request.owner || request.owner === "0" || request.owner === 0) {
	            request.owner = pm.collections.getOwnerForCollection(request.collectionId);
	        }
	        if(request.owner == 0 || request.owner=="0") {
	            request.owner = pm.user.id;
	        }
	        /*if((request.owner !== pm.user.id) &&
	            !(pm.collections.getOwnerForCollection(request.collectionId) == pm.user.id)) {
	            console.log("Only the owner can recreate the lost objects. Updating instead..");
	            update = true;
	        }*/

	        //explicitly set folder to null to make sure the request moves to the collection
	        //WHY is this needed??
	        if(!request.hasOwnProperty("folder")) {
	            request["folder"] = null;
	            request["folderId"] = null;
	        }

	        var method = (update?"update":"create");
	        var numResponses = request.responses?request.responses.length:0;

	        pm.syncManager.addChangeset("request", method, request, null, syncImmediately, false);
	        for(var i=0;i<numResponses;i++) {
	            var responseToAdd = request.responses[i];
	            responseToAdd.requestObject = JSON.stringify(responseToAdd.request);
	            responseToAdd.request = request.id;
	            responseToAdd.collection = request.collection;
	            responseToAdd.collectionId = request.collectionId;
	            responseToAdd.owner = request.owner;
	            if(request.folder) {
	                responseToAdd.folder = request.folder;
	            }
	            pm.syncManager.addChangeset("response","create",request.responses[i], null, false, false);
	        }

	        return true;
	    },

	    addFullCollection: function (collection,sync, callback) {
	        var pmCollection = this;
	        pmCollection.collectionIdUserMap[collection.id] = collection.owner;
	        collection.synced=sync;
	        collection.sharedWithTeam = collection.shared;
	        if(collection.owner && collection.owner!==pm.user.id) {
	            collection.subscribed = true;
	        }

	        //Cascade the editable property in all requests and responses
	        //if(!collection.hasOwnProperty("editable") || (typeof collection.editable==="undefined")) {
	        //collection.write = (collection.write==true || pm.user.id==collection.owner);
	        //}

	        try {
	            pmCollection.addCollectionToDataStore(collection, true, true, callback);
	        }
	        catch(e) {
	            console.log("Adding collection failed: "+e);
	            return -1;
	        }
	        return 0;
	    },

	    addCollectionFromSyncableFileSystem:function (collection) {
	        var pmCollection = this;

	        pmCollection.addCollectionToDataStore(collection, false, false, function(c) {
	            pm.indexedDB.getAllRequestsInCollection(c, function(c, requests) {
	                var collectionModel = pmCollection.get(c.id);
	                collectionModel.set("synced", true);
	                collectionModel.setRequests(requests);
	                pmCollection.trigger("updateCollection", collectionModel);
	            });
	        });
	    },

	    addRequestFromSyncableFileSystem: function(request) {
	        var pmCollection = this;

	        pmCollection.addRequestToDataStore(request, false, true, function(r) {
	            var collectionModel = pmCollection.get(request.collectionId);
	            var folderId;
	            var folder;
	            var requestLocation;

	            if (collectionModel) {
	                requestLocation = pmCollection.getRequestLocation(request.id);

	                if (requestLocation.type === "collection") {
	                    pmCollection.trigger("moveRequestToCollection", null, collectionModel, request);
	                }
	                else if (requestLocation.type === "folder") {
	                    folder = pmCollection.getFolderById(requestLocation.folderId);
	                    pmCollection.trigger("moveRequestToFolder", null, collectionModel, folder, request);
	                }
	            }

	        });
	    },

	    // Deprecated
	    // Rename this
	    // Add collection data to the database with new IDs
	    addAsNewCollection:function(collection) {
	        var pmCollection = this;
	        var folders = [];
	        var folder;
	        var order;
	        var j, count;
	        var idHashTable = {};

	        var dbCollection = _.clone(collection);
	        dbCollection["requests"] = [];
	        dbCollection["sharedWithTeam"] = false;
	        dbCollection["subscribed"] = false;
	        dbCollection["remoteLink"] = "";
	        dbCollection["remote_id"] = 0;
	        dbCollection["public"] = false;
	        dbCollection["write"] = true;

	        pmCollection.addCollectionToDataStore(dbCollection, true, false, function(c) {
	            var collectionModel;
	            var requests;
	            var ordered;
	            var i;
	            var request;
	            var newId;
	            var currentId;
	            var loc;

	            collectionModel = pmCollection.get(c.id);
	            var oldCollection = _.clone(collectionModel);

	            // Shows successs message
	            pmCollection.trigger("importCollection", {
	                type: "collection",
	                name:collection.name,
	                action:"added"
	            });

	            requests = [];

	            ordered = false;

	            // Check against legacy collections which do not have an order
	            if ("order" in collection) {
	                ordered = true;
	            }
	            else {
	                ordered = false;
	                collection["order"] = [];
	                collection.requests.sort(sortAlphabetical);
	            }

	            // Change ID of request - Also need to change collection order
	            // and add request to indexedDB
	            for (i = 0; i < collection.requests.length; i++) {
	                request = collection.requests[i];
	                request.collectionId = collection.id;

	                if(request.hasOwnProperty("rawModeData")) {
	                    request.data = request.rawModeData;
	                    delete request.rawModeData;
	                }

	                var newId = guid();
	                idHashTable[request.id] = newId;

	                if (ordered) {
	                    currentId = request.id;
	                    loc = _.indexOf(collection["order"], currentId);
	                    collection["order"][loc] = newId;
	                }
	                else {
	                    collection["order"].push(newId);
	                }

	                request.id = newId;

	                if ("responses" in request) {
	                    for (j = 0, count = request["responses"].length; j < count; j++) {
	                        request["responses"][j].id = guid();
	                        request["responses"][j].collectionRequestId = newId;
	                    }
	                }

	                requests.push(request);
	            }

	            // Change order inside folders with new IDs
	            if ("folders" in collection) {
	                folders = collection["folders"];

	                for(i = 0; i < folders.length; i++) {
	                    folders[i].id = guid();
	                    order = folders[i].order;
	                    for(j = 0; j < order.length; j++) {
	                        order[j] = idHashTable[order[j]];
	                    }

	                }
	            }

	            collectionModel.setRequests(requests);
	            collectionModel.set("folders", folders);
	            collectionModel.set("order", collection["order"]);


	            // Check for remote_id

	            if (pm.user.isLoggedIn()) {
	                var remoteId = pm.user.getRemoteIdForCollection(c.id);
	                collectionModel.set("remote_id", remoteId);
	            }

	            // Add new collection to the database
	            pmCollection.updateCollectionInDataStoreWithOptSync(collectionModel.getAsJSON(), oldCollection, true, true, function() {
	                var i;
	                var request;

	                for (i = 0; i < requests.length; i++) {
	                    request = requests[i];
	                    var callback=function(r) {
	                        if(r.isLastRequest) {
	                            pm.mediator.trigger("commitTransaction", collectionModel.id);
	                        }
	                    }
	                    if(i==requests.length-1) {
	                        request.isLastRequest = true;
	                    }
	                    pmCollection.addRequestToDataStore(request, true, false, callback);
	                }

	                pmCollection.trigger("updateCollection", collectionModel);
	            });
	        });

	    },

	    updateCollectionOwnerWithoutSync: function(id, owner) {
	        var pmCollection = this;

	        var targetCollection = pmCollection.get(id);
	        if(!targetCollection) {
	            console.log("Could not find collection to update");
	            return;
	        }

	        var oldCollection = pmCollection.getJSONFromCollection(targetCollection);
	        targetCollection.set("owner", owner);

	        pmCollection.updateCollectionInDataStoreWithoutSync(targetCollection.getAsJSON(), oldCollection, true, function (collection) {
	        });
	    },

	    updateCollectionOrder: function(id, order) {
	        var pmCollection = this;

	        var targetCollection = pmCollection.get(id);
	        var oldCollection = pmCollection.getJSONFromCollection(targetCollection);
	        targetCollection.set("order", order);

	        pmCollection.updateCollectionInDataStore(targetCollection.getAsJSON(), oldCollection, true, function (collection) {
	        });
	    },

	    updateCollectionSyncStatus: function(id, status) {
	        var pmCollection = this;

	        var targetCollection = pmCollection.get(id);
	        var oldCollection = pmCollection.getJSONFromCollection(targetCollection);
	        targetCollection.set("synced", status);

	        pmCollection.updateCollectionInDataStore(targetCollection.getAsJSON(), oldCollection, false, function (collection) {
	        });
	    },

	    updateCollectionWrite: function(id, write, toSync) {
	        if(typeof toSync === "undefined") {
	            toSync = false;
	        }
	        var pmCollection = this;

	        var targetCollection = pmCollection.get(id);
	        var oldCollection = pmCollection.getJSONFromCollection(targetCollection);

	        targetCollection.set("write", write);
	        targetCollection.set("updatedAt", Date.now());

	        pmCollection.updateCollectionInDataStoreWithOptSync(targetCollection.getAsJSON(), oldCollection,true, toSync, function (collection) {
	            pmCollection.trigger("updateCollectionMeta", targetCollection);
	        });
	    },

	    updateCollectionShared: function(id, isSharedWithTeam, write) {
	      var pmCollection = this;

	      var targetCollection = pmCollection.get(id);
	      var oldCollection = pmCollection.getJSONFromCollection(targetCollection);

	      targetCollection.set("write", write);
	      targetCollection.set("updatedAt", Date.now());
	      targetCollection.set("sharedWithTeam", isSharedWithTeam);

	      pmCollection.updateCollectionInDataStoreWithOptSync(targetCollection.getAsJSON(), oldCollection, true, false, function (collection) {
	          pmCollection.trigger("updateCollection", targetCollection);
	          pm.appWindow.trigger("sendMessageObject", "updatedCollection", targetCollection);
	      });
	    },

	    updateCollectionMeta: function(id, name, description) {
	        var pmCollection = this;

	        var targetCollection = pmCollection.get(id);
	        var oldCollection = pmCollection.getJSONFromCollection(targetCollection);

	        if(name) targetCollection.set("name", name);
	        if(description!==null) targetCollection.set("description", description);

	        targetCollection.set("updatedAt", Date.now());

	        pmCollection.updateCollectionInDataStore(targetCollection.getAsJSON(), oldCollection,true, function (collection) {
	            pmCollection.trigger("updateCollectionMeta", targetCollection);
	            if(collection.sharedWithTeam === true) {
	                pm.api.updateCollectionToTeam(pm.user.id, pm.user.get("access_token"), id, targetCollection.get("name"), targetCollection.get("description"), targetCollection.get("owner"), function (result) {
	                    //try to update collection in team dir
	                });
	            }
	        });
	    },

	    deleteCollection:function (id, sync, callback) {
	        //called when the user pressed "yes" in the delete modal
	        this.deleteCollectionFromDataStoreWithOptSync(id, sync, true, callback);
	    },

	    // Get collection data for file
	    getCollectionDataForFile:function (id, callback) {
	        pm.indexedDB.getCollection(id, function (data) {
	            var c = data;
	            var i;
	            var name;
	            var type;
	            var filedata;

	            pm.indexedDB.getAllRequestsInCollection(c, function (collection, requests) {
	                var requestIdsAdded = [];
	                for (i = 0, count = requests.length; i < count; i++) {
	                    if(requestIdsAdded.indexOf(requests[i].id)!==-1) {
	                        //this request is already there
	                        continue;
	                    }

	                    requestIdsAdded.push(requests[i].id);
	                    requests[i]["synced"] = false;

	                    if(requests[i]["dataMode"]==="raw") {
	                        requests[i]["rawModeData"]=requests[i]["data"];
	                        requests[i]["data"]=[];
	                    }

	                    if(requests[i]["rawModeData"]) {
	                        //to prevent rawModeData being sent as ["text"] instead of "text"
	                        if((requests[i]["rawModeData"] instanceof Array) &&
	                            requests[i]["rawModeData"].length==1) {
	                            requests[i]["rawModeData"] = requests[i]["rawModeData"][0];
	                        }
	                        if(typeof requests[i]["rawModeData"] !== "string") {
	                            requests[i]["rawModeData"] = "";
	                        }
	                    }

	                    //delete duplicate responses while exporting
	                    if(requests[i].responses instanceof Array) {
	                        requests[i].responses = _.uniq(requests[i].responses, function(item) {
	                            return item.id;
	                        });
	                    }

	                    var propsToRemove = ['write','synced','collectionOwner','createdAt', 'updatedAt', 'owner', 'lastUpdatedBy', 'lastRevision', 'history', 'collection'];
	                    _.each(propsToRemove, function(prop) {
	                        delete requests[i][prop];
	                    });
	                }

	                var numFolders = (collection.folders && (collection.folders instanceof Array))?collection.folders.length:0;
	                for(i=0; i<numFolders;i++) {
	                    var propsToRemove = ['write','collection_owner','collection_name','collection', 'collection_id', 'createdAt', 'updatedAt'];
	                    _.each(propsToRemove, function(prop) {
	                        delete collection.folders[i][prop];
	                    });
	                }

	                var propsToRemove = ['remote_id','synced','createdAt','updatedAt', 'shared', 'sharedWithTeam', 'subscribed', 'justSubscribed', 'write'];
	                _.each(propsToRemove, function(prop) {
	                    delete collection[prop];
	                });

	                //Get all collection requests with one call
	                collection['requests'] = requests;

	                name = collection['name'] + ".json";
	                type = "application/json";

	                filedata = JSON.stringify(collection, null, '\t');
	                callback(name, type, filedata);
	            });
	        });
	    },

	    getCollectionDataForFileJson:function (id, callback) {
	        pm.indexedDB.getCollection(id, function (data) {
	            var c = data;
	            var i;
	            var name;
	            var type;
	            var filedata;

	            pm.indexedDB.getAllRequestsInCollection(c, function (collection, requests) {
	                for (i = 0, count = requests.length; i < count; i++) {
	                    requests[i]["synced"] = false;

	                    if(requests[i]["dataMode"]==="raw") {
	                        requests[i]["rawModeData"]=requests[i]["data"];
	                        requests[i]["data"]=[];
	                    }

	                    delete requests[i].write;
	                }

	                delete collection['remote_id'];
	                delete collection.synced;
	                delete collection.shared;
	                delete collection.sharedWithTeam;
	                delete collection.subscribed;
	                delete collection.justSubscribed;
	                delete collection.write;

	                //Get all collection requests with one call
	                collection['synced'] = false;
	                collection['requests'] = requests;

	                name = collection['name'] + ".json";
	                type = "application/json";

	                callback(name, type, collection);
	            });
	        });
	    },

	    // Save collection as a file
	    saveCollection:function (id) {
	        pm.tracker.trackEvent("collection", "download");
	        this.getCollectionDataForFile(id, function (name, type, filedata) {
	            var filename = name + ".postman_collection";
	            pm.filesystem.saveAndOpenFile(filename, filedata, type, function () {
	              pm.alerts.success('Saved');
	            });
	        });
	    },

	    uploadCollectionForLink: function(id, isPublic, refreshSharedCollections, callback) {
	        var pmCollection = this;

	        this.getCollectionDataForFile(id, function (name, type, filedata) {
	            pm.api.uploadCollection(filedata, isPublic, function (data) {
	                var link = data.link;

	                if (callback) {
	                    callback(link);
	                }

	                //to show the collection in the MyCollections modal
	                pm.mediator.trigger("refreshSharedCollections");

	                var collection = pmCollection.get(id);
	                var remote_id = parseInt(data.id, 10);
	                var oldCollection = pmCollection.getJSONFromCollection(collection)
	                collection.set("remote_id", remote_id);
	                collection.set("remoteLink", link);
	                collection.set("public", isPublic);

	                //the new remote_id and remoteLink fields also have to be sent!
	                pmCollection.updateCollectionInDataStoreWithOptSync(collection.getAsJSON(), oldCollection, true, true, function (c) {

	                });
	            });
	            pm.tracker.trackEvent("collection", "share", "link");
	        });
	    },

	    shareUnshareCollection: function (id, isPublic, isTeam, refreshSharedCollections, isWritable, callback) {
	        var pmCollection = this;

	        var thisCollection = pmCollection.get(id);

	        if(isTeam === true && thisCollection.get("sharedWithTeam")!==true) {
	            //share with team
	            pm.tracker.trackEvent("collection", "share", "team");

	            var oldCollection = pmCollection.getJSONFromCollection(thisCollection);
	            thisCollection.set("sharedWithTeam", true);

	            //writeable is set on checkbox change
	            //thisCollection.set("write", isWriteable);

	            var orgs = pm.user.get("organizations");
	            if(orgs.length > 0) {
	                var orgId = orgs[0].id;
	                pm.syncManager.addChangeset("collection", "share", {"team": orgId, "write": isWritable}, id, true);
	                pmCollection.updateCollectionInDataStoreWithOptSync(thisCollection.getAsJSON(), oldCollection, true, false, function (c) {
	                    pmCollection.trigger("updateCollection", thisCollection);
	                    pm.appWindow.trigger("sendMessageObject", "updatedCollection", thisCollection); //needed because the share update event has tosync=false
	                });
	            }
	            else {
	                console.log("Cannot share. You are not a member of a team.");
	            }
	        }
	        else if(isTeam === false && thisCollection.get("sharedWithTeam")===true) {
	            //unshare with team
	            var thisCollection = pmCollection.get(id);
	            var oldCollection = pmCollection.getJSONFromCollection(thisCollection);
	            thisCollection.set("sharedWithTeam", false);
	            pm.syncManager.addChangeset("collection", "unshare", null, id, true);
	            pmCollection.updateCollectionInDataStoreWithOptSync(thisCollection.getAsJSON(), oldCollection, true, false, function (c) {
	                pmCollection.trigger("updateCollection", thisCollection);
	                pm.api.deleteCollectionFromTeam(pm.user.id, pm.user.get("access_token"), id, function (result) {
	                    //console.log("Deleted collection from team: " + result);
	                }, function() {
	                    console.log("Could not unshare collection from team");
	                });
	            });
	        }
	    },

	    // Upload collection
	    uploadCollection:function (id, isPublic, isTeam, refreshSharedCollections, callback) {
	        var pmCollection = this;

	        //upload and get link
	        this.uploadCollectionForLink(id, isPublic, refreshSharedCollections, callback);

	        var thisCollection = pmCollection.get(id);

	        if(isTeam === true && thisCollection.get("sharedWithTeam")!==true) {
	            //share with team

	            var oldCollection = pmCollection.getJSONFromCollection(thisCollection);
	            thisCollection.set("sharedWithTeam", true);

	            //writeable is set on checkbox change
	            //thisCollection.set("write", isWriteable);

	            var orgs = pm.user.get("organizations");
	            if(orgs.length > 0) {
	                var orgId = orgs[0].id;
	                pm.syncManager.addChangeset("collection", "share", {"team": orgId}, id, true);
	                pmCollection.updateCollectionInDataStoreWithOptSync(thisCollection.getAsJSON(), oldCollection, true, false, function (c) {
	                    pmCollection.trigger("updateCollection", thisCollection);
	                });
	            }
	            else {
	                console.log("Cannot share. You are not a member of a team.");
	            }
	        }
	        else if(isTeam === false && thisCollection.get("sharedWithTeam")===true) {
	            //unshare with team
	            var thisCollection = pmCollection.get(id);
	            var oldCollection = pmCollection.getJSONFromCollection(thisCollection);
	            thisCollection.set("sharedWithTeam", false);
	            pm.syncManager.addChangeset("collection", "unshare", null, id, true);
	            pmCollection.updateCollectionInDataStoreWithOptSync(thisCollection.getAsJSON(), oldCollection, true, false, function (c) {
	                pmCollection.trigger("updateCollection", thisCollection);
	                pm.api.deleteCollectionFromTeam(pm.user.id, pm.user.get("access_token"), id, function (result) {
	                    //console.log("Deleted collection from team: " + result);
	                }, function() {
	                    console.log("Could not unshare collection from team");
	                });
	            });
	        }
	    },

	    unshareCollection: function(collectionId) {
	        pm.api.deleteCollectionFromTeam(pm.user.id,  pm.user.get("access_token"), collectionId, function() {
	            //console.log("Deleted from team");
	        }, function() {
	            console.log("Could not delete collection from team");
	        });
	    },

	    importWholeCollectionWithOptSync: function(collection, toSync, syncLater, newId, callback) {
	        if(typeof newId === "undefined") {
	            newId = true;
	        }
	        if(typeof toSync === "undefined") {
	            toSync = true;
	        }
	        if(typeof syncLater === "undefined") {
	            syncLater = false;
	        }
	        if(typeof callback === "undefined") {
	            callback = null;
	        }

	        var pmCollection = this;

	        //force change all IDs
	        if(newId) {
	            this.setNewCollectionId(collection);
	            this.changeFolderAndRequestIds(collection);
	        }

	        delete collection.remoteLink;

	        if (collection.hasOwnProperty("order")) {
	            ordered = true;
	        }
	        else {
	            //forcibly adding a requests array to the collection
	            if(!collection.hasOwnProperty("requests") || !(collection.requests instanceof Array)) {
	                collection.requests = [];
	            }

	            ordered = false;
	            collection["order"] = [];
	            for (var i = 0; i < collection["requests"].length; i++) {
	                collection["order"].push(collection.requests[i].id);
	            }

	        }

	        collection.subscribed = false;

	        var dbCollection = _.clone(collection);

	        // Do not save requests in the same IndexedDB table
	        if ("requests" in collection) {
	            delete dbCollection['requests'];
	            dbCollection.hasRequests = true;
	        }

	        var terminateTransaction = false;
	        //if there are no requests AND no folders
	        if((!dbCollection.order || dbCollection.order.length==0) && (!dbCollection.folders || dbCollection.folders.length===0)) {
	            terminateTransaction = true;
	        }

	        //to prevent immediate syncing
	        dbCollection.synced = true;

	        pmCollection.addCollectionToDataStore(dbCollection, true, terminateTransaction, function(c) {
	            var collectionModel;
	            var requests = collection.requests;
	            var i;
	            var request;

	            collectionModel = pmCollection.get(collection.id);

	            if (collection.hasOwnProperty("requests")) {
	                for (i = 0; i < requests.length; i++) {
	                    if(collection.requests[i].dataMode==="raw") {
	                        if(collection.requests[i].hasOwnProperty("rawModeData")) {
	                            collection.requests[i].data=collection.requests[i].rawModeData;
	                        }
	                    }
	                    if(!collection.requests[i].hasOwnProperty("preRequestScript")) {
	                        collection.requests[i]["preRequestScript"] = "";
	                    }
	                    if(!collection.requests[i].hasOwnProperty("tests")) {
	                        collection.requests[i]["tests"] = "";
	                    }
	                }

	                collectionModel.set("requests", collection.requests);

	                for (i = 0; i < requests.length; i++) {
	                    request = requests[i];

	                    if(i==requests.length-1) {
	                        request.isLastRequest = true;
	                    }

	                    pmCollection.setFolderIdForRequest(request, collection);
	                    pmCollection.addRequestToDataStoreWithOptSync(request, true, false, false, null);
	                    pm.appWindow.trigger("sendMessageObject", "addedCollectionRequest", request);

	                }
	            }
	            else {
	                collectionModel.set("requests", []);
	            }

	            pmCollection.trigger("updateCollection", collectionModel);

	            // Shows successs message
	            // NOT for demo collections
	            if(postman_predef_collections.indexOf(collection.id) === -1) {
	                pmCollection.trigger("importCollection", { type: "collection", name:collection.name, action:"added" });
	                pm.mediator.trigger("switchSidebarTab", "collections")
	                if(!postman_electron) {
	                    chrome.app.window.current().focus();
	                }
	            }

	            if(typeof callback === "function") {
	                callback();
	            }

	            var cJson = pmCollection.sanitizeCollection(collection);
	            if(toSync) {
	                if(!syncLater) {
	                    pm.syncManager.addChangeset("collection", "importCollection", cJson, null, true);
	                }
	                else {
	                    setTimeout(function(cJson){
	                        return function() {
	                            pm.syncManager.addChangeset("collection", "importCollection", cJson, null, true);
	                        }
	                    }(cJson), 2000);
	                }
	            }
	            //pm.mediator.trigger("beginUnsyncedStream", false, cJson.id, false);
	        });
	    },

	    // New version of overwrite collection
	    // called when importing a collection
	    overwriteCollection:function(collection, syncLater) {
	        if(typeof syncLater === "undefined") {
	            syncLater = false;
	        }
	        this.importWholeCollectionWithOptSync(collection, true, syncLater, true, null);
	    },

	    setFolderIdForRequest: function(r, c) {
	        if(c.order.indexOf(r.id) !== -1) {
	            //all is well, the request is in the collection
	            return;
	        }
	        else {
	            var folders = c.folders;
	            if(!folders || (!_.isArray(folders))) {
	                return; //collection has no folders. cannot add
	            }
	            var numFolders = folders.length;
	            var i;
	            for(i=0;i<numFolders;i++) {
	                if(folders[i].order.indexOf(r.id)!=-1) {
	                    r.folder = folders[i].id;
	                    return;
	                }
	            }
	        }

	        //console.log("Warning - This request ID is not present in the collection or any folder");
	    },

	    // Duplicate collection
	    duplicateCollection:function(collection) {
	        this.addAsNewCollection(collection);
	    },

	    // Merge collection
	    // Being used in IndexedDB bulk import
	    mergeCollection: function(collection) {
	        var validationResult = pm.collectionValidator.validateJSON('c', collection, {correctDuplicates: true, validateSchema: false});
	        if(validationResult.status == false) {
	          pm.alerts.warning('Invalid collection file: '+validationResult.message, {
	            timeout: 5000
	          });
	            return;
	        }
	        var pmCollection = this;

	        //Update local collection
	        var newCollection = {
	            id: collection.id,
	            name: collection.name,
	            timestamp: collection.timestamp
	        };

	        var targetCollection;
	        targetCollection = new PmCollection(newCollection);
	        var oldCollection = pmCollection.getJSONFromCollection(targetCollection);
	        targetCollection.set("name", collection.name);

	        targetCollection.set("requests", collection.requests);

	        if ("order" in collection) {
	            targetCollection.set("order", collection.order);
	        }
	        else {
	            var order = [];
	            var requests = targetCollection.get("requests");
	            for(var j = 0; j < requests.length; j++) {
	                order.push(requests[j].id);
	            }

	            targetCollection.set("order", order);
	        }

	        if ("folders" in collection) {
	            targetCollection.set("folders", collection.folders);
	        }

	        pmCollection.add(targetCollection, {merge: true});
	        pm.appWindow.trigger("sendMessageObject", "updatedCollection", targetCollection);

	        pmCollection.updateCollectionInDataStore(targetCollection.getAsJSON(), oldCollection, true, function (c) {
	            var driveCollectionRequests = collection.requests;

	            pm.indexedDB.getAllRequestsInCollection(collection, function(collection, oldCollectionRequests) {
	                var updatedRequests = [];
	                var deletedRequests = [];
	                var newRequests = [];
	                var finalRequests = [];
	                var i = 0;
	                var driveRequest;
	                var existingRequest;
	                var sizeOldRequests;
	                var loc;
	                var j;
	                var sizeUpdatedRequests;
	                var sizeNewRequests;
	                var sizeDeletedRequests;
	                var size = driveCollectionRequests.length;

	                function existingRequestFinder(r) {
	                    return driveRequest.id === r.id;
	                }

	                for (i = 0; i < size; i++) {
	                    driveRequest = driveCollectionRequests[i];

	                    existingRequest = _.find(oldCollectionRequests, existingRequestFinder);

	                    if (existingRequest) {
	                        updatedRequests.push(driveRequest);

	                        sizeOldRequests = oldCollectionRequests.length;
	                        loc = -1;
	                        for (j = 0; j < sizeOldRequests; j++) {
	                            if (oldCollectionRequests[j].id === existingRequest.id) {
	                                loc = j;
	                                break;
	                            }
	                        }

	                        if (loc >= 0) {
	                            oldCollectionRequests.splice(loc, 1);
	                        }
	                    }
	                    else {
	                        newRequests.push(driveRequest);
	                    }
	                }

	                deletedRequests = oldCollectionRequests;

	                sizeUpdatedRequests = updatedRequests.length;
	                for(i = 0; i < sizeUpdatedRequests; i++) {
	                    pmCollection.updateRequestInDataStore(updatedRequests[i], true);
	                }

	                sizeNewRequests = newRequests.length;
	                for(i = 0; i < sizeNewRequests; i++) {
	                    pmCollection.addRequestToDataStore(newRequests[i], true, true, function(){});
	                }

	                sizeDeletedRequests = deletedRequests.length;
	                for(i = 0; i < sizeDeletedRequests; i++) {
	                    pmCollection.deleteRequestFromDataStore(deletedRequests[i], true);
	                }

	                pmCollection.trigger("updateCollection", targetCollection);
	            });
	        });
	    },

	    // Merge multiple collections. Used in bulk data import
	    mergeCollections: function (collections) {
	        var pmCollection = this;

	        var size = collections.length;
	        for(var i = 0; i < size; i++) {
	            var collection = collections[i];
	            pmCollection.importCollectionData(collection, true);

	            //this method causes update of the new collections :S
	            //pmCollection.mergeCollection(collection, true);
	        }
	    },



	    setSelfOwnerForCollection: function(collection) {
	        try {
	            var newOwner = pm.user.id;
	            collection.owner = newOwner;
	            if (collection.folders) {
	                var numFolders = collection.folders.length;
	                for (var i = 0; i < numFolders; i++) {
	                    collection.folders[i].owner = newOwner;
	                }
	            }
	            if (collection.requests) {
	                var numRequests = collection.requests.length;
	                for (var i = 0; i < numRequests; i++) {
	                    collection.requests[i].owner = newOwner;
	                }
	            }
	        }
	        catch(e) {
	            console.log("Error setting collection owner to self");
	            return;
	        }
	    },

	    importCollectionData:function (collection, syncLater) {
	        if(typeof syncImmediately === "undefined") {
	            syncLater = false;
	        }
	        //Fix for legacy collections
	        if (!collection.hasOwnProperty("order") && collection.hasOwnProperty("requests")) {
	            collection.order = collection.requests.map(function (req) {
	                return req.id
	            });
	        }

	        if(!collection.name || collection.name.trim()=="") {
	            collection.name = "New Collection";
	        }

	        this.setSelfOwnerForCollection(collection);
	        
	        //this will be your new collection
	        collection.sharedWithTeam = false;
	        collection.synced = false;
	        collection.subscribed = false;


	        var validationResult = pm.collectionValidator.validateJSON('c', collection, {correctDuplicates: true, validateSchema: false});
	        if(validationResult.status == false) {
	          pm.alerts.warning('Invalid collection file: '+validationResult.message, {
	            timeout: 5000
	          });
	            return;
	        }
	        if((this.getCollectionById(collection.id)!==null) || (this.getCollectionByName(collection.name) !== null)) {
	            var cWithName = this.getCollectionByName(collection.name);
	            var newCollectionId = collection.id;
	            if(cWithName) {
	                newCollectionId = cWithName.get("id");
	            }
	            this.trigger("overwriteCollectionChoice", newCollectionId, collection);
	        }
	        else {
	            this.overwriteCollection(collection, syncLater);
	        }
	    },

	    setNewCollectionId: function(collection) {
	        var newId = guid();
	        var numFolders = (collection.folders)?collection.folders.length:0;
	        for(var i=0;i<numFolders;i++) {
	            collection.folders[i].collection_id = newId;

	        }

	        var numRequests = (collection.requests)?collection.requests.length:0;
	        for(var i=0;i<numRequests;i++) {
	            collection.requests[i].collectionId = newId;
	        }

	        collection.id = newId;
	    },

	    changeFolderAndRequestIds: function(collection) {
	        var numFolders = (collection.folders)?collection.folders.length:0;
	        var folderIdMap = {};
	        var requestIdMap = {};

	        //update request IDs
	        var numRequests = (collection.requests)?collection.requests.length:0;
	        for(var i=0;i<numRequests;i++) {
	            var newId = guid();
	            requestIdMap[collection.requests[i].id] = newId;

	            if(collection.requests[i].responses  && (collection.requests[i].responses instanceof Array)) {
	                var numResponses = collection.requests[i].responses.length;
	                for(var j=0;j<numResponses;j++) {
	                    collection.requests[i].responses[j].id = guid();
	                }
	            }
	            collection.requests[i].id = newId;
	        }

	        //update folder IDs and folder orders
	        for(var i=0;i<numFolders;i++) {
	            var newId = guid();
	            folderIdMap[collection.folders[i].id]=newId;
	            collection.folders[i].id = newId;

	            var oldOrder = collection.folders[i].order;
	            var newOrder = _.map(oldOrder, function(oldRequestId) {
	                return requestIdMap[oldRequestId];
	            });
	            collection.folders[i].order = newOrder;
	        }

	        //update root order
	        var oldOrder = collection.order;
	        var newOrder = _.map(oldOrder, function(oldRequestId) {
	            return requestIdMap[oldRequestId];
	        });
	        collection.order = newOrder;

	    },

	    onAddDirectoryCollection: function(collection) {
	        this.setNewCollectionId(collection);
	        this.changeFolderAndRequestIds(collection);
	        this.addAsNewCollection(collection);
	    },

	    guessFileFormat: function(data, alreadyJson) {
	        //check if it is JSON:
	        var jsonObj;
	        try {
	            if(alreadyJson===true) {
	                jsonObj = data;
	            }
	            else {
	                jsonObj = JSON.parse(data);
	            }
	            if(jsonObj.hasOwnProperty("swagger") && jsonObj["swagger"]==="2.0") return "SWAGGER2.0";
	            if(jsonObj.hasOwnProperty("swaggerVersion")) return "SWAGGER1.2";
	            if(jsonObj.hasOwnProperty("folders") || jsonObj.hasOwnProperty("requests") || jsonObj.hasOwnProperty("order")) return "COLLECTION";
	            if(jsonObj.hasOwnProperty("version") && jsonObj.hasOwnProperty("collections") && jsonObj.hasOwnProperty("environments")) return "DUMP";
	            if(jsonObj.hasOwnProperty("values") && jsonObj.hasOwnProperty("name")) return "ENVIRONMENT";

	            //Is JSON, but not collection or swagger
	            return 0;
	        }
	        catch(e) { // Not JSON
	            try {
	                data = data.trim();
	                var parsedYAMLData;
	                var firstLine = data.split("\n")[0];

	                // All YAML files are processed in this try block
	                try {
	                    parsedYAMLData = YAML.parse(data);
	                } catch(e) {
	                    //try
	                    if(firstLine.indexOf("#%RAML")===0) {
	                        return "RAML";  //check raml = first line is #%RAML
	                    }
	                    else {
	                        throw "Not parseable YAML";
	                    }
	                }
	                if(parsedYAMLData.hasOwnProperty("swagger") && parsedYAMLData["swagger"]==="2.0") return "SWAGGER2.0";
	                else if(parsedYAMLData.hasOwnProperty("swaggerVersion")) return "SWAGGER1.2";
	                // Still could be RAML :/
	                else if(firstLine.indexOf("#%RAML")===0) {
	                    return "RAML";  //check raml = first line is #%RAML
	                }
	                else {
	                    //cannot parse this yaml
	                    throw "Not parseable YAML";
	                }
	            }
	            catch (e) { // Not JSON, Not YAML
	                console.log(e);
	                if(data instanceof Node) {
	                    var xs = new XMLSerializer();
	                    data = xs.serializeToString(data);
	                }
	                data = data.trim();
	                var firstLine = data.split("\n")[0];
	                if(firstLine.toLowerCase().indexOf("curl")===0) return "CURL";
	                if(data.substring(0,5).indexOf("<")!==-1 && data.substring(0,400).indexOf("<application")!==-1) return "WADL";
	                if(data.substring(0,5).indexOf("<")!==-1 && data.substring(0,400).indexOf("<wadl:application")!==-1) {
	                    //might be wadl
	                    data = data.replace(/\wadl\:/g,"");
	                    if(data.substring(0,5).indexOf("<")!==-1 && data.substring(0,400).indexOf("<application")!==-1) return "WADL_NS";
	                }
	                //Not JSON, and not raml, curl, wadl
	                return 0;
	            }
	        }
	    },

	    showImportError: function(type, message) {
	      pm.alerts.error('Error while importing '+type+': '+message);
	    },

	    importData: function(data, format, alreadyJson) {
	        var pmCollection = this;
	        if(format==="SWAGGER1.2") {

	            // If the file is YAML, convert it to JSON
	            try {
	                data = YAML.parse(data);
	                alreadyJson = true;
	            }
	            catch (e) {
	                console.log('Data is not YAML.')
	            }

	            var swaggerJson = alreadyJson?data:JSON.parse(data);
	            postmanConverters.swagger1_2Converter.convertJSON(
	                swaggerJson,
	                {
	                    group: true,
	                    test: false
	                },
	                function(collection, env) {
	                    pm.tracker.trackEvent("collection", "create", "swagger1");
	                    pm.bulkAnalytics.addCurrentEvent("collection", "create", "swagger1");
	                    pm.collections.importCollectionData(collection);
	                }, function(errorMessage) {
	                    pm.collections.showImportError("Swagger", errorMessage);
	                }
	            );
	        }
	        else if(format === "SWAGGER2.0") {

	            // If the file is YAML, convert it to JSON
	            try {
	                data = YAML.parse(data);
	                alreadyJson = true;
	            }
	            catch (e) {
	                console.log('Data is not YAML.')
	            }

	            var swaggerJson = alreadyJson?data:JSON.parse(data);
	            var converter = new postmanConverters.swagger2_0Converter();
	            var result = converter.convert(swaggerJson);
	            if(!result || result["status"]==="failed") {
	                var msg = "Unknown error";
	                if(result["message"]) {
	                    msg = result["message"];
	                }
	                pm.collections.showImportError("Swagger 2.0", msg);
	                return;
	            }
	            else {
	                pm.tracker.trackEvent("collection", "create", "swagger2");
	                pm.bulkAnalytics.addCurrentEvent("collection", "create", "swagger2");
	                pm.collections.importCollectionData(result.collection);
	            }
	        }
	        else if(format === "COLLECTION") {
	            var collection = alreadyJson?data:JSON.parse(data);
	            // collection.id = guid();
	            pmCollection.importCollectionData(collection);
	            pm.tracker.trackEvent("collection", "create", "postman_collection");
	            pm.bulkAnalytics.addCurrentEvent("collection", "create", "postman_collection");
	        }
	        else if(format === "DUMP") {
	            var dumpJson = (typeof data==="object")?data:JSON.parse(data);
	            pm.indexedDB.importDataForVersion(1, dumpJson, function(){});
	        }
	        else if(format === "ENVIRONMENT") {
	            var dumpJson = (typeof data==="object")?data:JSON.parse(data);
	            pm.indexedDB.importDataForVersion(1, dumpJson, function(){});
	            pm.environments.importEnvironment(dumpJson, false);
	        }
	        else if(format==="RAML") {
	            postmanConverters.ramlConverter.parseString(data, function(op, env) {
	                pm.tracker.trackEvent("collection", "create", "raml");
	                pm.bulkAnalytics.addCurrentEvent("collection", "create", "raml");
	                pm.collections.importCollectionData(op);
	            }, function(errorMessage) {
	                if(errorMessage.indexOf("cannot fetch")!==-1) {
	                    errorMessage = "External references are not supported yet. " + errorMessage;
	                }
	                pm.collections.showImportError("RAML", errorMessage);
	            });
	        }
	        else if(format==="CURL") {
	            try {
	                var requestJSON = postmanConverters.curlConverter.convertCurlToRequest(data);
	                if (requestJSON.error) {
	                    pm.collections.showImportError("Curl", requestJSON.error);
	                }
	                else {
	                    var re = /\\n/gi
	                    requestJSON.headers = requestJSON.headers.replace(re, "\n");
	                    pm.mediator.trigger("loadRequest", requestJSON, true);
	                    pmCollection.trigger("importCollection", {
	                        type: "request",
	                        name: (requestJSON.name != "" && requestJSON.name != null) ? requestJSON.name : requestJSON.url,
	                        action: "added"
	                    });
	                }
	            }
	            catch(e) {
	                pm.collections.showImportError("Curl", e.message);
	            }
	        }
	        else if(format==="WADL") {
	            postmanConverters.wadlConverter.convertXMLString(data,{},function(collection) {
	                pm.tracker.trackEvent("collection", "create", "wadl");
	                pm.bulkAnalytics.addCurrentEvent("collection", "create", "wadl");
	                pm.collections.importCollectionData(collection);
	            }, function(error) {
	                pm.collections.showImportError("WADL", error);
	            });
	        }
	        else if(format==="WADL_NS") {
	            data = data.replace(/\wadl\:/g,"");
	            postmanConverters.wadlConverter.convertXMLString(data,{},function(collection) {
	                pm.tracker.trackEvent("collection", "create", "wadl");
	                pm.bulkAnalytics.addCurrentEvent("collection", "create", "wadl");
	                pm.collections.importCollectionData(collection);
	            }, function(error) {
	                pm.collections.showImportError("WADL", error);
	            });
	        }
	    },

	    /**
	     * This function handles the importing of folders. Allfiles is an Array of objects, where each element is of the
	     * form:
	     * {
	     *     content: "file contents...",
	     *     fileName: "something.raml",
	     *     isRoot: true // Set to true if this is a root RAML File.
	     * }
	     *
	     * @param allFiles {Object}
	     * @param rootPath {String} The root path of uploaded data, e.g: /Uber or /my-folder. The slash at the beginning is
	     *                          important
	     */
	    importFolder: function (allFiles, rootPath) {
	        var uploadedData = _.object(_.map(allFiles, 'fileName'), _.map(allFiles, 'content')),
	            rootFiles = _.filter(allFiles, { isRoot: true }),
	            reader,
	            pmCollection = this;
	        reader = new RAML.Parser.FileReader(function (path) {
	            return new Promise(function (resolve, reject) {
	                var decodedFullPath = decodeURIComponent(path);
	                if (uploadedData.hasOwnProperty(decodedFullPath)) {
	                    resolve(uploadedData[decodedFullPath]);
	                }
	                else if (uploadedData.hasOwnProperty(rootPath + path)) {
	                    resolve(uploadedData[rootPath + path]);
	                }
	                else {
	                    reject(new Error('Unable to find file ' + path + ' in uploaded data'));
	                }
	            });
	        });

	        // Import RAML files, if any
	        _.forEach(rootFiles, function (rootFile) {
	            RAML.Parser.loadFile(rootFile.fileName, { reader: reader })
	                .then(function (result) {
	                    postmanConverters.ramlConverter.parseRaw(result, function (op, env) {
	                        pm.tracker.trackEvent("collection", "create", "raml");
	                        pm.collections.importCollectionData(op);
	                    }, function (errorMessage) {
	                        pm.collections.showImportError("RAML", errorMessage);
	                    });
	                })
	                .catch(function (e) {
	                    console.error(e);
	                    pm.mediator.trigger("failedCollectionImport", "Error importing RAML API: " + e);
	                });
	        });

	        if (rootFiles.length === 0) {
	            // No RAML files were there, so import Postman collections, if any
	            _.forOwn(uploadedData, function (content, fileName) {
	                if (/^.*\.postman_collection$|^.*\.postman_environment$|^.*\.json$/ig.test(fileName)) {
	                    // May be worth importing
	                    content = content.trim();
	                    var fileFormat = pmCollection.guessFileFormat(content);
	                    if(fileFormat===0) {
	                        pm.mediator.trigger("failedCollectionImport", fileName + ": format not recognized");
	                        return;
	                    }
	                    pmCollection.importData(content, fileFormat);
	                }
	            });
	        }
	    },

	    importFiles: function(files) {
	        var pmCollection = this;
	        for (var i = 0, f; f = files[i]; i++) {
	            var reader = new FileReader();

	            // Closure to capture the file information.
	            reader.onload = (function (theFile) {
	                return function (e) {
	                    // Render thumbnail.
	                    var data = e.currentTarget.result;
	                    try {
	                        data = data.trim();
	                        var fileFormat = pmCollection.guessFileFormat(data);
	                        if(fileFormat===0) {
	                            throw "Could not parse";
	                        }
	                        pmCollection.importData(data, fileFormat);
	                    }
	                    catch(e) {
	                        pm.mediator.trigger("failedCollectionImport","format not recognized");
	                    }
	                };
	            })(f);

	            // Read in the image file as a data URL.
	            reader.readAsText(f);
	        }
	    },

	    // Import multiple collections
	    importCollections:function (files) {
	        var pmCollection = this;

	        // Loop through the FileList
	        for (var i = 0, f; f = files[i]; i++) {
	            var reader = new FileReader();

	            // Closure to capture the file information.
	            reader.onload = (function (theFile) {
	                return function (e) {
	                    // Render thumbnail.
	                    var data = e.currentTarget.result;
	                    try {
	                        data = data.trim();
	                        var collection = jsonlint.parse(data);
	                        // collection.id = guid();
	                        pmCollection.importCollectionData(collection);
	                    }
	                    catch(e) {
	                        pm.mediator.trigger("failedCollectionImport", "could not import collection - " + e.message);
	                    }
	                };
	            })(f);

	            // Read in the image file as a data URL.
	            reader.readAsText(f);
	        }
	    },

	    importFileFromUrl:function (url) {
	        var pmCollection = this;
	        var headers = { "X-Requested-With": null };
	        if(postman_electron) {
	            headers["X-Requested-With"] = "PostmanMac/"+pm.app.getVersion();
	        }
	        else {
	            headers["X-Requested-With"] = "PostmanChrome/"+pm.app.getVersion();
	        }

	        $.ajax({
	            type: 'GET',
	            url: url,
	            headers: headers,
	            success: function(data) {
	                try {
	                    if(typeof data === "object" && !(data instanceof Node)) {
	                        //already Json
	                        var fileFormat = pmCollection.guessFileFormat(data, true);
	                        if(fileFormat===0) {
	                            throw "Could not parse";
	                        }
	                        pmCollection.importData(data, fileFormat, true);
	                    }
	                    else if(data instanceof Node) {
	                        //it's an xml element. don't trim
	                        var fileFormat = pmCollection.guessFileFormat(data, false);
	                        if(fileFormat===0) {
	                            throw "Could not parse";
	                        }

	                        var xs = new XMLSerializer();
	                        data = xs.serializeToString(data);

	                        pmCollection.importData(data, fileFormat, false);
	                    }
	                    else {
	                        data = data.trim();
	                        var fileFormat = pmCollection.guessFileFormat(data, false);
	                        if(fileFormat===0) {
	                            throw "Could not parse";
	                        }
	                        pmCollection.importData(data, fileFormat, false);
	                    }
	                }
	                catch(e) {
	                    pm.mediator.trigger("failedCollectionImport", "format not recognized");
	                }
	            },
	            error: function(e) {
	                console.log("Error response while importing: ", e);
	                pm.mediator.trigger("failedCollectionImport", "Error response received from URL. Check the console for more.");
	            }
	        });
	    },

	    // Get request by ID
	    getRequestById: function(id) {
	        function existingRequestFinder(r) {
	            return r.id === id;
	        }

	        for(var i = 0; i < this.models.length; i++) {
	            var collection = this.models[i];

	            var requests = collection.get("requests");

	            var request = _.find(requests, existingRequestFinder);
	            if (request) {
	                return request;
	            }
	        }

	        return null;
	    },

	    getAllRequests: function() {
	        var retVal = [];
	        for(var i = 0; i < this.models.length; i++) {
	            var collection = this.models[i];

	            var requests = collection.get("requests");
	            retVal = retVal.concat(requests);
	        }
	        return retVal;
	    },

	    getRequestLocation: function(id) {
	        var i;
	        var collection;
	        var indexCollection;
	        var folders;
	        var indexFolder;

	        for(var i = 0; i < this.models.length; i++) {
	            collection = this.models[i];

	            indexCollection = _.indexOf(collection.get("order"), id);

	            if (indexCollection >= 0) {
	                return {
	                    "type": "collection",
	                    "collectionId": collection.get("id")
	                };
	            }
	            else {
	                folders = collection.get("folders");
	                for(j = 0; j < folders.length; j++) {
	                    indexFolder = _.indexOf(folders[j].order, id);

	                    if (indexFolder >= 0) {
	                        return {
	                            "type": "folder",
	                            "folderId": folders[j].id,
	                            "collectionId": collection.get("id")
	                        };
	                    }
	                }
	            }
	        }

	        return {
	            "type": "not_found"
	        };
	    },

	    // Load collection request in the editor
	    loadCollectionRequest:function (id) {
	        var pmCollection = this;

	        pm.indexedDB.getCollectionRequest(id, function (request) {
	            if(!request) {
	                //pm.syncLogger.error("Could not find request to load. Id: " + id);
	                return;
	            }
	            request.isFromCollection = true;
	            request.collectionRequestId = id;
	            if((pm.settings.getSetting("requestNewTab") ||
	                (pm.settings.getSetting("trackUnsavedRequests") && pm.tabManager.getCurrentTab().get("isTabDirty"))) && !pm.testRunner) {
	                pm.mediator.trigger("loadRequestInNewTab", request);
	            }
	            else {
	                pm.mediator.trigger("loadRequest", request, true);
	            }
	            pmCollection.trigger("selectedCollectionRequest", request);
	        });
	    },

	    // For the TCPReader. Not for the current request
	    addRequestToCollectionId: function(collectionRequest, collectionId) {
	        var pmCollection = this;

	        collectionRequest.collectionId = collectionId;

	        if(!collectionRequest.hasOwnProperty("id")) {
	            collectionRequest.id = guid();
	        }

	        var targetCollection = pmCollection.get(collectionId);
	        var oldCollection = pmCollection.getJSONFromCollection(targetCollection);
	        targetCollection.addRequestIdToOrder(collectionRequest.id);

	        pmCollection.addRequestToDataStore(collectionRequest, true, true, function(req) {
	            pmCollection.updateCollectionInDataStoreWithoutSync(targetCollection.getAsJSON(), oldCollection, true, function() {
	                pmCollection.trigger("addCollectionRequest", req, true, false);
	            });
	        });

	//        pmCollection.updateCollectionInDataStore(targetCollection.getAsJSON(), oldCollection, true, function() {
	//            pmCollection.addRequestToDataStore(collectionRequest, true, function(req) {
	//                pmCollection.trigger("addCollectionRequest", req);
	//            });
	//        });
	    },

	    addFullCollectionRequest: function(request, callback) {
	        var pmCollection = this;
	        var targetCollection;
	        try {
	            targetCollection = this.getCollectionById(request.collection);
	            if(!targetCollection) {
	                //add a timeout to get the request later
	                clearTimeout(pmCollection.missingCollectionTimeouts[request.collection]);
	                pmCollection.missingCollectionTimeouts[request.collection] = setTimeout(function() {
	                    pmCollection.getMissingServerCollection(request.collection, request.owner);
	                },2000);
	                if (typeof callback === "function") {
	                    callback();
	                }
	                return;
	            }
	            var alreadyInCollection = targetCollection.requestExistsInCollectionRoot(request.id);
	            var alreadyInFolderWithId = targetCollection.requestExistsInCollectionFolders(request.id);

	            if(!alreadyInCollection && !alreadyInFolderWithId) {
	                targetCollection.addRequestIdToOrder(request.id);
	            }

	            if(request.helperAttributes && request.helperAttributes=="null") {
	                request.helperAttributes = null;
	            }
	            if(typeof request.helperAttributes === "string") {
	                try {
	                    request.helperAttributes = JSON.parse(request.helperAttributes);
	                }catch(e) {

	                }
	            }
	            request.write = (targetCollection.get("write")==true || pm.user.id==targetCollection.get("owner"));

	            this.addRemoteRequestToDataStore(request, true, function(req) {
	                if(req.folder!=null && req.folder.length>0) {
	                    var status = pmCollection.moveRequestToFolderWithOptSync(req.id, req.folder, false, callback);
	                    if(status === -1) {
	                        //could not add to folder
	                        pmCollection.trigger("addCollectionRequest", req, false, false);
	                        pmCollection.trigger("updateCollectionMeta", targetCollection);
	                        if (typeof callback === "function") {
	                            callback();
	                        }
	                    }
	                }
	                else {
	                    pmCollection.trigger("addCollectionRequest", req, false, false);
	                    pmCollection.trigger("updateCollectionMeta", targetCollection);
	                    if (typeof callback === "function") {
	                        callback();
	                    }
	                }
	                pm.mediator.trigger('syncOperationDone');
	            });
	        }
	        catch(e) {
	            pm.syncLogger.error("Error while adding request: " + (e.stack || e));
	            //console.log("Adding remote request failed: "+e);
	            if(typeof callback === "function") callback();
	            return -1;
	        }
	        return 0;
	    },

	    //Add multiple requests to collection. Used when saving from history
	    addRequestsToCollection: function(requestsArray, collection, noNotif, syncImmediately) {
	        if(typeof(noNotif)==='undefined') noNotif = false;

	        var pmCollection = this;

	        var orderArray = [];
	        _.each(requestsArray, function(request) {
	            orderArray.push(request.id);
	        });

	        if (collection.name) {
	            collection.order = orderArray;
	            collection.timestamp = new Date().getTime();

	            var finalOrder = orderArray;
	            //create collection with no order
	            //create request
	            //update creation with order
	            pmCollection.addCollectionToDataStore(collection, true, false, function (requestsArray, syncImmediately, collection) {
	                return function (newCollection) {
	                    for (var i = 0; i < requestsArray.length; i++) {
	                        requestsArray[i].collectionId = collection.id;
	                        pmCollection.addRequestToDataStore(requestsArray[i], true, false, function (req) {
	                            pmCollection.trigger("addCollectionRequest", req, true, false);
	                            if (syncImmediately) {
	                                pm.syncManager.trigger("singleSyncDone");
	                                pm.mediator.trigger("commitTransaction", collection.id);
	                            }
	                        });
	                    }
	                }
	            }(requestsArray, syncImmediately, collection));
	        }
	        else {
	            //collection already exists
	            _.each(requestsArray, function(request) {
	                request.collectionId = collection.id;
	            });

	            var targetCollection = pmCollection.get(collection.id);
	            var oldCollection = pmCollection.getJSONFromCollection(targetCollection);

	            for (var i = 0; i < requestsArray.length; i++) {
	                var collectionRequest = requestsArray[i];
	                targetCollection.addRequestIdToOrder(collectionRequest.id);
	                pmCollection.addRequestToDataStore(collectionRequest, true, true, function(targetCollection, oldCollection) {
	                    return function(req) {
	                        pmCollection.updateCollectionInDataStoreWithoutSync(targetCollection.getAsJSON(), oldCollection, true, function() {
	                            pmCollection.trigger("addCollectionRequest", req, true);
	                        });
	                    }
	                } (targetCollection, oldCollection));
	            }
	        }
	    },

	    // Add request to collection. For the current request
	    addRequestToCollectionWithOptSync: function (collectionRequest, collection, noNotif, syncImmediately, openRequest, toSync) {
	        if(typeof(noNotif)==='undefined') noNotif = false;
	        if(typeof(openRequest)==='undefined') openRequest = true;

	        var pmCollection = this;

	        if (collection.name) {
	            collection.requests = [];
	            collection.order = [collectionRequest.id];
	            collection.timestamp = new Date().getTime();

	            var finalOrder = [collectionRequest.id];
	            //create collection with no order
	            //create request
	            //update creation with order
	            pmCollection.addCollectionToDataStore(collection, true, false, function(newCollection) {
	                pmCollection.addRequestToDataStoreWithOptSync(collectionRequest, true, toSync, false, function(req) {
	                    pmCollection.trigger("addCollectionRequest", req, true, openRequest);
	                    pmCollection.loadCollectionRequest(req.id);
	                    if(syncImmediately) {
	                        pm.syncManager.trigger("singleSyncDone");
	                        pm.mediator.trigger("commitTransaction", collection.id);
	                    }
	                });
	            });

	        }
	        else {
	            collectionRequest.collectionId = collection.id;

	            var targetCollection = pmCollection.get(collection.id);
	            var oldCollection = pmCollection.getJSONFromCollection(targetCollection);
	            targetCollection.addRequestIdToOrder(collectionRequest.id);


	            pmCollection.addRequestToDataStoreWithOptSync(collectionRequest, true, toSync, syncImmediately, function(req) {
	                pmCollection.updateCollectionInDataStoreWithoutSync(targetCollection.getAsJSON(), oldCollection, true, function() {
	                    pmCollection.trigger("addCollectionRequest", req, true, openRequest);
	                    if(openRequest) {
	                       pmCollection.loadCollectionRequest(req.id); //WHY?
	                    }
	                });
	            });
	        }

	        this.trigger("updateCollectionRequest", collectionRequest, noNotif);

	        pm.mediator.trigger("updateCollectionRequest", collectionRequest);
	    },


	    addRequestToCollection:function (collectionRequest, collection, noNotif, syncImmediately, openRequest) {
	        this.addRequestToCollectionWithOptSync(collectionRequest, collection, noNotif, syncImmediately, openRequest, true);
	    },

	    // Add multiple requests to folders (from history
	    addRequestsToFolder: function(requestArray, collectionId, folderId, noNotif, syncImmediately) {
	        if(typeof(noNotif)==='undefined') noNotif = false;

	        var pmCollection = this;

	        var collection = this.get(collectionId);
	        _.each(requestArray, function(collectionRequest) {
	            collectionRequest.collectionId = collectionId;
	            collectionRequest.folder = folderId;
	            collection.addRequestIdToOrder(collectionRequest.id);
	        });

	        var targetFolder = this.getFolderById(folderId);

	        for(var i=0;i<requestArray.length;i++) {
	            var collectionRequest = requestArray[i];
	            pmCollection.addRequestToDataStore(collectionRequest, true, syncImmediately, function(folderId) {
	                return function(req) {
	                    pmCollection.moveRequestToFolderWithOptSync(req.id, folderId, false);
	                };
	            } (folderId));
	        }

	        if(!noNotif) {
	            /*  noty(
	                {
	                    type:'success',
	                    text:'Saved request',
	                    layout:'topCenter',
	                    timeout:750
	                });*/
	            this.loadCollectionRequest(collectionRequest.id);
	        }
	    },

	    addRequestToFolderWithOptSync: function(collectionRequest, collectionId, folderId, noNotif, sync, syncImmediately) {
	        if(typeof(noNotif)==='undefined') noNotif = false;

	        var pmCollection = this;

	        var collection = this.get(collectionId);
	        collectionRequest.collectionId = collectionId;
	        collectionRequest.folder = folderId;
	        collection.addRequestIdToOrder(collectionRequest.id);
	        var targetFolder = this.getFolderById(folderId);
	        pmCollection.addRequestToDataStoreWithOptSync(collectionRequest, sync, sync, syncImmediately, function(folderId) {
	            return function(req) {
	                pmCollection.moveRequestToFolderWithOptSync(req.id, folderId, false);
	                //Why is this needed? //pmCollection.loadCollectionRequest(req.id);
	            };
	        } (folderId));


	        if(!noNotif) {
	           /* noty(
	                {
	                    type:'success',
	                    text:'Saved request',
	                    layout:'topCenter',
	                    timeout:750
	                });*/
	        }
	    },


	    // Add single request to folder
	    addRequestToFolder: function(collectionRequest, collectionId, folderId, noNotif, syncImmediately) {
	        this.addRequestToFolderWithOptSync(collectionRequest, collectionId, folderId, noNotif, true, syncImmediately);
	    },

	    //when the user is adding a response
	    addResponseToCollectionRequestWithOptSync: function(collectionRequestId, response, toSync, callback) {
	        var pmCollection = this;

	        pm.indexedDB.getCollectionRequest(collectionRequestId, function(callback, response, toSync) {
	            return function(collectionRequest) {
	                if(!collectionRequest) {
	                    //console.log("No such request found. Cannot add response to request.");
	                    if(typeof callback==="function") {
	                        callback();
	                    }
	                    return;
	                }
	                var oldRequest = pmCollection.getJSONFromRequest(collectionRequest);
	                var responses;

	                var collectionModel = pm.collections.getCollectionById(collectionRequest.collectionId);
	                response.write = collectionModel.get("write")==true || pm.user.id==collectionModel.get("owner");

	                if (collectionRequest.responses instanceof Array) {
	                    collectionRequest["responses"].push(response);
	                }
	                else {
	                    collectionRequest["responses"] = [response];
	                }


	                var responseToAdd = _.clone(response);

	                pmCollection.updateRequestInDataStore(collectionRequest, oldRequest, true, function(request) {
	                    pmCollection.trigger("updateCollectionRequest", request, true);
	                    pm.mediator.trigger("updateCollectionRequest", request);

	                    //sync the response
	                    if (toSync) {
	                        responseToAdd.requestObject = JSON.stringify(responseToAdd.request);
	                        responseToAdd.request = request.id;
	                        responseToAdd.collection = request.collection;
	                        responseToAdd.collectionId = request.collectionId;
	                        responseToAdd.owner = request.owner;
	                        if(request.folder) {
	                            responseToAdd.folder = request.folder;
	                        }
	                        pm.syncManager.addChangeset("response", "create", responseToAdd, null, true);
	                    }

	                    if(typeof callback==="function") {
	                        callback();
	                    }

	                }, false);
	            }
	        } (callback, response, toSync));
	        return 0;
	    },

	    //accepts an array of responses
	    //called when remote responses are added to a request
	    addResponsesToCollectionRequestWithoutSync: function(collectionRequestId, responses, callback) {
	        var pmCollection = this;
	        var allResponses = _.cloneDeep(responses);

	        pm.indexedDB.getCollectionRequest(collectionRequestId, function (collectionRequest) {
	            if(!collectionRequest) {
	                if(typeof callback === "function") callback();
	                return;
	            }

	            var oldRequest = pmCollection.getJSONFromRequest(collectionRequest);
	            var responses;
	            var collectionModel = pm.collections.getCollectionById(collectionRequest.collection);

	            var numResponses = allResponses.length;
	            for(i=0;i<numResponses;i++) {
	                if(allResponses[i].meta && allResponses[i].data) {//newAPI
	                    allResponses[i] = allResponses[i].data;
	                }
	                allResponses[i].write = collectionModel.get("write") || pm.user.id==collectionModel.get("owner");
	            }

	            if (collectionRequest.responses instanceof Array) {
	                collectionRequest["responses"] = collectionRequest["responses"].concat(allResponses);
	            }
	            else {
	                collectionRequest["responses"] = allResponses;
	            }

	            pmCollection.updateRequestInDataStore(collectionRequest, oldRequest, true, function(request) {
	                pmCollection.trigger("updateCollectionRequest", request, true);
	                pm.mediator.trigger("updateCollectionRequest", request);

	                if(callback) callback();

	            }, false);
	        });
	        return 0;
	    },


	    addResponseToCollectionRequest: function(collectionRequestId, response) {
	        this.addResponseToCollectionRequestWithOptSync(collectionRequestId, response, true);
	    },

	    updateResponsesForCollectionRequestWithOptSync: function(collectionRequestId, responses, toSync) {
	        var pmCollection = this;

	        pm.indexedDB.getCollectionRequest(collectionRequestId, function (collectionRequest) {
	            var oldRequest = pmCollection.getJSONFromRequest(collectionRequest);
	            collectionRequest.responses = responses;
	            pmCollection.updateRequestInDataStore(collectionRequest, oldRequest, true, function(request) {
	                pmCollection.trigger("updateCollectionRequest", request, true);
	                pm.mediator.trigger("updateCollectionRequest", request);
	            }, toSync);
	        });
	    },

	    updateResponsesForCollectionRequest: function(collectionRequestId, responses) {
	        this.updateResponsesForCollectionRequestWithOptSync(collectionRequestId, responses, true);
	    },

	    // Update collection request
	    updateCollectionRequest:function (collectionRequest) {
	        var pmCollection = this;

	        pm.indexedDB.getCollectionRequest(collectionRequest.id, function (req) {
	            var oldRequest = pmCollection.getJSONFromRequest(req);
	            if(!oldRequest) {
	                console.log("Request could not be found locally. Cannot update");
	                return;
	            }
	            collectionRequest.name = req.name;
	            collectionRequest.description = req.description;
	            collectionRequest.collectionId = req.collectionId;
	            collectionRequest.responses = req.responses;

	            pmCollection.updateRequestInDataStore(collectionRequest, oldRequest, true, function (request) {
	                pmCollection.trigger("updateCollectionRequest", request);
	                pm.mediator.trigger("updateCollectionRequest", request);
	            }, true);
	        });
	    },


	    updateRemoteCollectionRequest: function(request, callback) {
	        try  {
	            var pmCollection = this;
	            var oldRequest = pm.collections.getRequestById(request.id);
	            var newRequest = this.mergeEntitiesForUpdate(request, oldRequest);
	            pmCollection.updateRequestInDataStore(newRequest, oldRequest, true, function(request1) {
	                pmCollection.trigger("updateCollectionRequest", request1, true);
	                pm.mediator.trigger("updateCollectionRequest", request1);
	                pm.mediator.trigger('syncOperationDone');
	                if(callback) callback();
	            }, false);
	        }
	        catch(e) {
	            console.log("Updating collection request failed: "+e);
	            callback();
	            return -1;
	        }
	        return 0;
	    },

	    updateCollectionRequestMeta: function(id, name, description) {
	        var pmCollection = this;

	        pm.indexedDB.getCollectionRequest(id, function (req) {
	            var oldRequest = pmCollection.getJSONFromRequest(req);
	            if(name) req.name = name;
	            if(description!==null) req.description = description;

	            pmCollection.updateRequestInDataStore(req, oldRequest, true, function(request) {
	                pmCollection.trigger("updateCollectionRequest", request, true);
	                pm.mediator.trigger("updateCollectionRequest", request);
	            }, true);
	        });
	    },

	    updateCollectionRequestSyncStatus: function(id, status) {
	        var pmCollection = this;

	        pm.indexedDB.getCollectionRequest(id, function (req) {
	            var oldRequest = pmCollection.getJSONFromRequest(req);
	            req.synced = status;

	            pmCollection.updateRequestInDataStore(req, oldRequest, false, function(request) {
	            });
	        });
	    },

	    updateCollectionRequestTests: function(id, tests) {
	        var pmCollection = this;

	        pm.indexedDB.getCollectionRequest(id, function (req) {
	            var oldRequest = pmCollection.getJSONFromRequest(req);
	            req.tests = tests;

	            pmCollection.updateRequestInDataStore(req, oldRequest, true, function(request) {
	                pmCollection.trigger("updateCollectionRequest", request);
	                pm.mediator.trigger("updateCollectionRequest", request);
	            }, true);
	        });
	    },

	    deleteCollectionRequestWithOptSync: function(id, toSync, callback) {
	        var pmCollection = this;

	        pmCollection.deleteRequestFromDataStoreWithOptSync(id, true, true, toSync, function() {
	            pmCollection.trigger("removeCollectionRequest", id);
	            pm.mediator.trigger('syncOperationDone');
	            if (callback) {
	                callback();
	            }
	        });

	        return 0;
	    },

	    // Delete collection request
	    deleteCollectionRequest:function (id, callback) {
	        this.deleteCollectionRequestWithOptSync(id, true, callback);
	    },

	    //used when request is added to folder
	    addRequestToFolder_old: function(requestId, targetFolder, toSync) {
	        //Just update the folder
	        targetFolder.order.push(requestId);
	        if(toSync) {
	            pm.syncManager.addChangeset('folder','update',targetFolder, null, true);
	        }
	    },

	    getRemoteRequestIntoCollectionOrFolder: function(requestId, targetFolderId, targetCollectionId, ownerId, callback) {
	        var oldThis = this;
	        pm.syncManager.getEntityFromId("request", requestId, ownerId, null, function(request) {
	            if(request.hasOwnProperty("err")) {
	                pm.mediator.trigger('syncOperationFailed', request.err);
	                return;
	            }

	            request["collectionId"] = targetCollectionId;
	            if(targetFolderId) {
	                request.folder = targetFolderId;
	            }
	            ////pm.syncStatusManager.addNotification("request",request, "create");
	            //hack for rawModeData
	            if(request.dataMode==="raw" && request.rawModeData) {
	                request.data = request.rawModeData;
	                delete request.rawModeData;
	            }
	            oldThis.addFullCollectionRequest(request, callback);
	        });
	    },


	    moveRequestToFolderWithOptSync: function(requestId, targetFolderId, toSync, callback) {
	        //console.log("Request moved to folder");
	        pm.requestTransferInProgress = true;
	        setTimeout(function() {
	            pm.requestTransferInProgress = false;
	        },200);

	        var pmCollection = this;
	        var request = this.getRequestById(requestId); //will return a backbone object
	        if(!request) {
	            //request not found
	            if(typeof callback === "function") {
	                callback();
	            }
	            return;
	        }

	        targetFolderId = targetFolderId.substring(targetFolderId.indexOf("#")+1);

	        var folder = this.getFolderById(targetFolderId);

	        var targetCollection = this.getCollectionForFolderId(targetFolderId);

	        if(request == null && targetCollection!=null) {
	            //if request doesn't exist
	            var ownerOfCollection = targetCollection.get("owner");
	            this.getRemoteRequestIntoCollectionOrFolder(requestId, targetFolderId, targetCollection.get("id"), ownerOfCollection, callback);
	        }
	        else if(folder==null || targetCollection == null) {
	            //destination doesn't exist - delete request
	            targetCollection = this.getCollectionById(request.collection);
	            if(!targetCollection) {
	                this.deleteCollectionRequestWithOptSync(requestId, false, callback);
	                return;
	            }

	            return -1;
	        }
	        else {
	            //actual transfer action
	            var oldLocation = {};
	            if(request.folder!=null) {
	                oldLocation = {
	                    "model": "folder",
	                    "model_id": request.folder,
	                    "collection_id": request.collectionId,
	                    "owner": pm.collections.getOwnerForCollection(request.collectionId)
	                };
	            }
	            else {
	                oldLocation = {
	                    "model": "collection",
	                    "model_id": request.collectionId,
	                    "collection_id": request.collectionId,
	                    "owner": pm.collections.getOwnerForCollection(request.collectionId)
	                };
	            }


	            var oldCollection = pmCollection.getJSONFromCollection(targetCollection);
	            if(targetCollection.id === request.collectionId) {
	                //same collection - retain ID
	                if(toSync) {
	                    pm.appWindow.trigger("sendMessageObject", "moveRequestToFolder", request.id, folder.id);
	                }

	                targetCollection.addRequestIdToFolder(folder.id, request.id);

	                var oldRequest = _.clone(request);

	                request.folder = folder.id;
	                targetCollection.removeRequestIdFromOrder(request.id);

	                pmCollection.updateRequestInDataStore(request, oldRequest, true, function() {
	                    pmCollection.updateCollectionInDataStoreWithoutSync(targetCollection.getAsJSON(), oldCollection, true, function() {
	                        pmCollection.trigger("moveRequestToFolder", oldLocation, targetCollection, folder, request, toSync);
	                        pm.mediator.trigger('syncOperationDone');
	                        if(typeof callback === "function") {
	                            callback();
	                        }
	                    });
	                }, false);
	            }
	            else {
	                // Different collection - new request ID

	                var newRequestId = guid();
	                pmCollection.deleteCollectionRequestWithOptSync(requestId, true, function(request, newRequestId, targetCollection, folder, oldCollection, oldLocation, callback) {
	                    return function() {
	                        var oldRequestId = request.id;
	                        request.id = newRequestId;
	                        request.collection = request.collectionId = targetCollection.get("id");
	                        request.folder = folder.id;
	                        request.owner = targetCollection.get("owner");

	                        //targetCollection.addRequestIdToOrder(request.id); - WHY ARE WE DOING THIS?
	                        //pmCollection.trigger("removeCollectionRequest", requestId);

	                        //to avoid sending PUT /request
	                        pmCollection.addRequestToDataStoreWithOptSync(request, true, true, true, function(targetCollection, folder, oldCollection, callback) {
	                            return function(req) {
	                                targetCollection.addRequestIdToFolder(folder.id, req.id);
	                                var collection = targetCollection.getAsJSON();
	                                pmCollection.updateCollectionInDataStoreWithoutSync(collection, oldCollection, true, function(oldLocation, targetCollection, folder, request, callback, oldRequestId) {
	                                    return function(c) {
	                                        //don't sync the transfer request if the request is moved to a different collection - a delete and a create event will be sent
	                                        pmCollection.trigger("moveRequestToFolder", oldLocation, targetCollection, folder, request, false, oldRequestId);
	                                        //pmCollection.trigger("addCollectionRequest", request, false, false);

	                                        pm.mediator.trigger('syncOperationDone');
	                                        if(typeof callback === "function") callback();
	                                    }
	                                } (oldLocation, targetCollection, folder, request, callback, oldRequestId));
	                            }
	                        } (targetCollection, folder, oldCollection, callback));
	                    }
	                } (request, newRequestId, targetCollection, folder, oldCollection, oldLocation, callback));

	            }
	        }
	    },

	    moveRequestToFolder: function(requestId, targetFolderId) {
	        this.moveRequestToFolderWithOptSync(requestId, targetFolderId, true);
	    },

	    moveRequestToCollection: function(requestId, targetCollectionId) {
	        this.moveRequestToCollectionWithOptSync(requestId, targetCollectionId, true);
	    },

	    moveRequestToCollectionWithOptSync: function(requestId, targetCollectionId, toSync, callback) {
	        pm.requestTransferInProgress = true;
	        setTimeout(function() {
	            pm.requestTransferInProgress = false;
	        },200);
	        var pmCollection = this;
	        var targetCollection = this.get(targetCollectionId);
	        var request = _.clone(this.getRequestById(requestId));

	        if(request == null && targetCollection!=null) {
	            //if request doesn't exist
	            var ownerOfCollection = targetCollection.get("owner");
	            this.getRemoteRequestIntoCollectionOrFolder(requestId, null, targetCollection.get("id"), ownerOfCollection, callback);
	        }
	        else if(targetCollection == null) {
	            //destination doesn't exist - delete request
	            this.deleteCollectionRequestWithOptSync(requestId, false, callback);
	        }
	        else {
	            request.owner = pm.collections.getOwnerForCollection(request.collectionId);

	            var oldLocation = {};
	            if(request.folder!=null) {
	                oldLocation = {
	                    "model": "folder",
	                    "model_id": request.folder,
	                    "collection_id": request.collectionId,
	                    "owner": request.owner
	                };


	                //delete from folder order
	                pmCollection.deleteRequestFromFolderOrder(request.collectionId, request.folder, requestId);
	            }
	            else {
	                oldLocation = {
	                    "model": "collection",
	                    "model_id": request.collectionId,
	                    "collection_id": request.collectionId,
	                    "owner": request.owner
	                };
	            }

	            var oldCollection = pmCollection.getJSONFromCollection(targetCollection);
	            if (targetCollectionId === request.collectionId) {
	                //same collection - retain requestId
	                if(toSync) {
	                    pm.appWindow.trigger("sendMessageObject", "moveRequestToCollection", request.id, request.collectionId);
	                }
	                targetCollection.addRequestIdToOrder(request.id);

	                var oldRequest = _.clone(request);
	                delete request.folder;
	                pmCollection.updateRequestInDataStore(request, oldRequest, true, function(request){ //delete folder.request
	                    pmCollection.updateCollectionInDataStoreWithoutSync(targetCollection.getAsJSON(), oldCollection, true, function (c) { //add request to collection order
	                        pmCollection.trigger("moveRequestToCollection", oldLocation, targetCollection, request, toSync);
	                        pm.mediator.trigger('syncOperationDone');
	                        if (callback) callback();
	                    });
	                });
	            }
	            else {
	                //var oldCollection = pmCollection.get(request.collectionId); - don't know what this is for
	                var newRequestId = guid();
	                pmCollection.deleteCollectionRequestWithOptSync(requestId, true, function () {
	                    request.id = newRequestId;
	                    request.collectionId = targetCollectionId;
	                    request.collection = targetCollectionId;

	                    request.owner = targetCollection.get("owner");
	                    delete request.folder;

	                    pmCollection.trigger("removeCollectionRequest", requestId);

	                    targetCollection.addRequestIdToOrder(request.id);

	                    pmCollection.addRequestToDataStoreWithOptSync(request, true, true, true, function (req) {
	                        pmCollection.updateCollectionInDataStoreWithoutSync(targetCollection.getAsJSON(), oldCollection, true, function (c) {
	                            //don't sync the transfer request if the request is moved to a different collection - a delete and a create event will be sent
	                            pmCollection.trigger("addCollectionRequest", request, false, false);
	                            //pmCollection.trigger("moveRequestToCollection", oldLocation, targetCollection, request, false);
	                            pm.mediator.trigger('syncOperationDone');
	                            if (callback) callback();
	                        });
	                    });
	                });
	            }
	        }
	    },

	    deleteRequestFromFolderOrder: function(collectionId, folderId, requestId) {
	        var collection = this.get(collectionId);
	        if(collection) {
	            var folders = collection.get("folders");
	            if(folders) {
	                 for(var i = 0; i < folders.length; i++) {
	                    indexInFolder = folders[i].order.indexOf(requestId);
	                    if(indexInFolder >= 0) {
	                         folders[i].order.splice(indexInFolder, 1);
	                         collection.set("folders", folders);
	                         return;
	                    }
	                }
	            }
	        }
	    },

	    // Get folder by ID
	    getFolderById: function(id) {
	        function existingFolderFinder(r) {
	            return r.id === id;
	        }

	        for(var i = 0; i < this.length; i++) {
	            var collection = this.models[i];
	            var folders = collection.get("folders");
	            var folder = _.find(folders, existingFolderFinder);
	            if (folder) {
	                return folder;
	            }
	        }

	        return null;
	    },

	    getAllFolders: function() {
	        var retVal = [];
	        for(var i = 0; i < this.length; i++) {
	            var collection = this.models[i];
	            retVal = retVal.concat(collection.get("folders"));
	        }
	        return retVal;
	    },

	    addFolder: function(parentId, folderName, description) {
	        var collection = this.get(parentId);
	        var oldCollection = this.getJSONFromCollection(collection);

	        var newFolder = {
	            "id": guid(),
	            "name": folderName,
	            "description": description,
	            "write": (collection.get("write") || pm.user.id == collection.get("owner")),
	            "order": []
	        };

	        collection.addFolder(newFolder);
	        this.trigger("addFolder", collection, newFolder);
	        this.updateCollectionInDataStoreWithoutSync(collection.getAsJSON(), oldCollection, true);
	        newFolder["collection"] = parentId;
	        newFolder["owner"] = collection.get("owner");
	        this.trigger("folderAdded", collection);
	        pm.appWindow.trigger("sendMessageObject", "addedFolder", collection, newFolder);
	        pm.syncManager.addChangeset("folder","create",newFolder, null, true);
	    },

	    addExistingFolder: function(parentId, folder, syncImmediately, toSync) {
	        if(typeof toSync === "undefined") {
	            toSync = true;
	        }
	        var collection = this.get(parentId);
	        var oldCollection = this.getJSONFromCollection(collection);
	        if(collection.hasFolderId(folder.id)) {
	            //console.log("Error - The folderID already exists in the collection. Not re-adding.");
	            return;
	        }
	        collection.addFolder(folder);
	        this.trigger("addFolder", collection, folder);
	        this.updateCollectionInDataStoreWithoutSync(collection.getAsJSON(), oldCollection,true);
	        folder["collection"] = parentId;
	        pm.appWindow.trigger("sendMessageObject", "addedFolder", collection, folder);
	        if(toSync) {
	            pm.syncManager.addChangeset("folder","create",folder, null, syncImmediately);
	        }
	    },

	    addFolderFromRemote: function(folder, callback) {
	        var collection, oldCollection;
	        try {
	            collection = this.get(folder.collection);
	            if(!collection) {
	                throw "The parent collection no longer exists";
	            }
	            oldCollection = this.getJSONFromCollection(collection);
	            folder.write = collection.get("write") || pm.user.id==collection.get("owner");

	            folder.collection_id = folder.collection;
	            delete folder.collection;

	            if(collection.hasFolderId(folder.id)) {
	                throw "The folderID already exists in the collection. Not re-adding.";
	            }

	            collection.addFolder(folder);
	            this.trigger("addFolder", collection, folder);
	            pm.collections.trigger("updateCollectionMeta", collection);
	            pm.appWindow.trigger("sendMessageObject", "addedFolder", collection, folder);
	            this.updateCollectionInDataStoreWithoutSync(collection.getAsJSON(), oldCollection,true, callback);
	            pm.mediator.trigger('syncOperationDone');
	        }
	        catch(e) {
	            //console.log("Did not add remote folder: "+e);
	            if(typeof callback === "function") {
	                callback();
	            }
	        }
	        return 0;
	    },

	    updateFolderFromRemote: function(folder, callback) {
	        var collection, oldCollection;
	        try {
	            collection = this.get(folder.collection);
	            oldCollection = this.getJSONFromCollection(collection);

	            folder.collection_id = folder.collection;
	            delete folder.collection;

	            collection.editFolder(folder);
	            this.trigger("updateFolder", collection, folder);
	            var collectionJson = collection.toJSON();
	            pm.appWindow.trigger("sendMessageObject", "updatedFolder", collectionJson, folder);
	            this.updateCollectionInDataStoreWithoutSync(collection.getAsJSON(), oldCollection,true, callback);
	            pm.mediator.trigger('syncOperationDone');
	        }
	        catch(e) {
	            //console.log("Faced error while adding remote folder");
	            callback();
	            return -1;
	        }
	        return 0;
	    },

	    updateFolderOrder: function(collectionId, folderId, order, sync) {
	        var folder = this.getFolderById(folderId);
	        folder.order = order;
	        var collection = this.get(collectionId);
	        var oldCollection = this.getJSONFromCollection(collection);
	        collection.editFolder(folder);
	        var collectionJson = collection.getAsJSON();
	        this.updateCollectionInDataStoreWithoutSync(collection.getAsJSON(), oldCollection,true);
	        folder["collectionId"] = collectionId;
	        pm.appWindow.trigger("sendMessageObject", "updatedFolder", collectionJson, folder);
	        pm.syncManager.addChangeset("folder","update",folder, null, true);
	    },

	    updateFolderMeta: function(id, name, description) {
	        var folder = this.getFolderById(id);
	        if(name) folder.name = name;
	        if(description) folder.description = description;
	        var collection = this.getCollectionForFolderId(id);
	        var oldCollection = this.getJSONFromCollection(collection);
	        collection.editFolder(folder);
	        this.trigger("updateFolder", collection, folder);
	        var collectionJson = collection.getAsJSON();
	        this.updateCollectionInDataStoreWithoutSync(collectionJson, oldCollection, true);
	        folder["collectionId"] = collection.getAsJSON().id;
	        var folderToSend = _.clone(folder);
	        delete folderToSend.order;
	        pm.appWindow.trigger("sendMessageObject", "updatedFolder", collectionJson, folderToSend);
	        pm.syncManager.addChangeset("folder","update",folderToSend, null, true);
	    },

	    deleteFolderWithOptSync: function(id, toSync, callback) {
	        var folder = this.getFolderById(id);
	        if(!folder) {
	            pm.mediator.trigger('syncOperationDone');
	            if(callback) callback();
	            return;
	        }
	        var folderRequestsIds = _.clone(folder.order);
	        var i;
	        var collection;

	        for(i = 0; i < folderRequestsIds.length; i++) {
	            //only one delete folder request is sent to the sync server, individual request deletes aren't sent
	            this.deleteRequestFromDataStoreWithOptSync(folderRequestsIds[i], true, false, false, null);
	        }

	        collection = this.getCollectionForFolderId(id);
	        var oldCollection = this.getJSONFromCollection(collection);
	        collection.deleteFolder(id);
	        var collectionJson = collection.getAsJSON();

	        this.trigger("deleteFolder", collection, id);
	        if(toSync) {
	            pm.appWindow.trigger("sendMessageObject", "deletedFolder", collectionJson, id);
	        }
	        this.updateCollectionInDataStoreWithoutSync(collectionJson, oldCollection,true, function() {
	            if(toSync) {
	                pm.syncManager.addChangeset("folder","destroy",{"id":id, owner: collection.get("owner")}, null, true);
	            }
	            pm.mediator.trigger('syncOperationDone');
	            if(callback) callback();
	        });
	    },

	    deleteFolder: function(id) {
	        this.deleteFolderWithOptSync(id, true);
	    },

	    filter: function(term) {
	        term = term.toLowerCase();
	        var collections = this.toJSON();
	        var collectionCount = collections.length;
	        var filteredCollections = [];
	        var name;
	        var requests;
	        var requestsCount;
	        var i, j, k, c, r, f;
	        var folders;
	        var folderOrder;
	        var visibleRequestHash = {};

	        for(i = 0; i < collectionCount; i++) {
	            c = {
	                id: collections[i].id,
	                name: collections[i].name,
	                requests: [],
	                folders: [],
	                toShow: false,
	                toShowForCollection: false
	            };

	            if(collections[i].name) {
	                name = collections[i].name.toLowerCase();
	            }
	            else {
	                name = "";
	            }

	            if (name.search(term) >= 0) {
	                c.toShow = true;
	                c.toShowForCollection = true;
	            }

	            requests = collections[i].requests;

	            if (requests) {
	                requestsCount = requests.length;

	                for(j = 0; j < requestsCount; j++) {
	                    r = {
	                        id: requests[j].id,
	                        name: requests[j].name,
	                        toShow: false
	                    };

	                    if(requests[j].name) {
	                        name = requests[j].name.toLowerCase();
	                    }
	                    else {
	                        name = "";
	                    }

	                    if (c.toShowForCollection || name.search(term) >= 0) {
	                        r.toShow = true;
	                        c.toShow = true;
	                        visibleRequestHash[r.id] = true;
	                    }
	                    else {
	                        r.toShow = false;
	                        visibleRequestHash[r.id] = false;
	                    }

	                    c.requests.push(r);
	                }
	            }

	            if("folders" in collections[i]) {
	                folders = collections[i].folders;
	                for (j = 0; j < folders.length; j++) {
	                    f = {
	                        id: folders[j].id,
	                        name: folders[j].name,
	                        toShow: false
	                    };

	                    if(folders[j].name) {
	                        name = folders[j].name.toLowerCase();
	                    }
	                    else {
	                        name = "";
	                    }

	                    folderOrder = folders[j].order;

	                    if (c.toShowForCollection || name.search(term) >= 0) {
	                        f.toShow = true;
	                        c.toShow = true;

	                        //show all requests in this folder
	                        for(k = 0; k < folderOrder.length; k++) {
	                            var thisRequestId = folderOrder[k];
	                            _.map(c.requests, function(req) {
	                                if(req.id === thisRequestId) {
	                                    req.toShow = true;
	                                }
	                            });
	                        }
	                    }



	                    // Check if any requests are to be shown
	                    for(k = 0; k < folderOrder.length; k++) {
	                        if (visibleRequestHash[folderOrder[k]] === true) {
	                            f.toShow = true;
	                            c.toShow = true;
	                            break;
	                        }
	                    }

	                    c.folders.push(f);
	                }
	            }

	            filteredCollections.push(c);
	        }

	        this.trigger("filter", filteredCollections);
	        return filteredCollections;
	    },

	    revert: function() {
	        this.trigger("revertFilter");
	    },


	    //Sync handlers
	    onSyncChangeReceived: function(verb, message, callback) {
	        if(!message.model) message.model = message.type;

	        var allowedTypes = ["collection", "request", "response", "folder"];
	        if(allowedTypes.indexOf(message.model) === -1) {
	            return;
	        }

	        try {
	            if (verb === "create") {
	                this.createRemoteEntity(message, callback);
	            }
	            else if (verb === "update") {
	                this.updateRemoteEntity(message, callback);
	            }
	            else if (verb === "destroy" || verb === "delete") {
	                this.deleteRemoteEntity(message, callback);
	            }
	            else if (verb === "transfer") {
	                this.transferRemoteEntity(message, callback);
	            }
	            else if (verb === "import") {
	                //whole collection
	                if(message.meta.model === "collection") {
	                    this.importRemoteCollection(message.data, callback);
	                }
	                else if(message.meta.model === "folder") {
	                    this.importRemoteFolder(message.data, callback);
	                }
	                else {
	                    if(typeof callback === "function") {
	                        callback();
	                    }
	                }
	            }
	            else if(verb === "history" || verb === "subscribe" || verb === "unsubscribe") {
	                //dont fret.
	                //history/subscription model will take care of it
	                return;
	            }
	            else if (verb === "share") {
	                this.updateRemoteEntityPermission(message, true, callback);
	            }
	            else if (verb === "unshare") {
	                this.updateRemoteEntityPermission(message, false, callback);
	            }
	            else {
	                pm.syncLogger.error("Unknown action for collection/request/response/folder: " + verb);
	                if(typeof callback === "function") callback();
	            }
	        }
	        catch(e) {
	            pm.syncLogger.error("Problem saving change pmcollections: " + e.message +
	                " - verb:"+verb+",msg=  "+
	                JSON.stringify(message));
	            if(typeof callback === "function") callback();
	        }
	    },

	    createRemoteEntity: function(message, callback) {
	        if(message.model === "collection") {
	            message.data["requests"]=[];

	            if(message.hasOwnProperty('meta') && message.meta.hasOwnProperty('access') && message.meta.access === 'write') {
	              message.data.write = true;
	            }

	            var status = this.addFullCollection(message.data, true, callback);
	            pm.appWindow.trigger("sendMessageObject", "addedCollection", message.data);
	            if(status==-1) {
	                pm.mediator.trigger('syncOperationFailed', "Adding full collection failed");
	            }
	            else {
	                //TODO: Where do we put this? :S
	                pm.syncManager.updateSinceFromMessage(message);
	                if(message.data.order) {
	                    this.trigger("sortRequestContainer", "collection", message.data.id, message.data.order);
	                }
	            }
	            pm.syncLogger.log(new Error(),["Collection created: ",message.data]);
	        }
	        else if (message.model === "request") {
	            message.data["collectionId"]=message.data.collection;
	            //pm.syncStatusManager.addNotification("request",message.data, "create");
	            //hack for rawModeData
	            //hack for rawModeData
	            if(message.data.dataMode==="raw" && message.data.rawModeData) {
	                message.data.data = message.data.rawModeData;
	                delete message.data.rawModeData;
	            }
	            pm.appWindow.trigger("sendMessageObject", "addedCollectionRequest", message.data);
	            var status = this.addFullCollectionRequest(message.data, callback);
	            if(status==-1) {
	                pm.mediator.trigger('syncOperationFailed', "Adding full collection request failed");
	            }
	            else {
	                pm.syncManager.updateSinceFromMessage(message);
	            }
	            pm.syncLogger.log(new Error(),["Request created: ",message.data]);
	        }
	        else if (message.model === "response") {
	            //pm.syncStatusManager.addNotification("response",message.data, "create");
	            var requestId = message.data.request;
	            //here, requestId must be a uuid, not an object

	            var newline = new RegExp("\n",'g');
	            if(message.data.requestObject) {
	                message.data.requestObject = message.data.requestObject.replace(newline, "");
	            }

	            try {
	                message.data.request = JSON.parse(message.data.requestObject);
	            }
	            catch(e) {
	                //console.log("Could not parse response's request");
	                message.data.request = {};
	            }

	            var status = this.addResponseToCollectionRequestWithOptSync(requestId, message.data, false, callback);
	            if(status==-1) {
	                pm.mediator.trigger('syncOperationFailed', "Adding response to request failed");
	            }
	            else {
	                pm.syncManager.updateSinceFromMessage(message);
	            }
	            pm.syncLogger.log(new Error(),["Response added: ",message.data]);
	        }
	        else if (message.model === "folder") {
	            //pm.syncStatusManager.addNotification("folder",message.data, "create");
	            var status = pm.collections.addFolderFromRemote(message.data, callback);
	            //triggered in addFolderFromRemote
	            //pm.appWindow.trigger("sendMessageObject", "addedFolder", {id:message.data.collection}, message.data);
	            if(status==-1) {
	                pm.mediator.trigger('syncOperationFailed', "Add folder from remote failed");
	            }
	            else {
	                pm.syncManager.updateSinceFromMessage(message);
	                if(message.data.order) {
	                    this.trigger("sortRequestContainer", "folder", message.data.id, message.data.order);
	                }
	            }
	            pm.syncLogger.log(new Error(),["Folder added: ",message.data]);
	        }
	    },

	    getActiveUserPermission: function(permissions) {
	      var userId = pm.user.get('id');
	      if(!userId) {
	        return null;
	      }

	      var userPermission = _.find(permissions.users, function(userPermission) {
	        return userPermission.id === userId;
	      });

	      if(userPermission) {
	        return userPermission.access;
	      }

	      var teamPermission = permissions.team;

	      if(teamPermission) {
	        return teamPermission.access;
	      }

	      return null;
	    },

	    updateRemoteEntityPermission: function(message, share, callback) {
	      if(message.model === "collection") {
	        var collectionId;
	          if(message.meta && message.meta.instance && message.meta.instance.id) {
	            collectionId = message.meta.instance.id;
	          } else if(message.model_id) {
	            collectionId = message.model_id;
	          }
	          if(!collectionId) {
	            pm.syncLogger.log(new Error(), ["Permission update failed: ", message]);
	            return;
	          }
	          var collection = this.get(collectionId);
	          var userAccess = this.getActiveUserPermission(message.data); //always assume this to be true.
	          userAccess = true; //force set to true. not getting message.data.users anymore
	          if(collection && userAccess) {
	            var oldWrite = collection.get("write");
	            this.updateCollectionShared(collection.get('id'), share, oldWrite);
	            pm.syncLogger.log(new Error(), ["Permission updated: ", message]);
	          }
	      }
	    },

	    updateRemoteEntity: function(message, callback) {
	        if(message.model === "collection") {
	            //pm.syncStatusManager.addNotification("collection",message.data, "update");
	            //check for order update
	            var relParent = this.get(message.data.id);
	            if(relParent && message.data.order) {
	                if(message.resolved===true || (message.meta && message.meta.resolved==true)) {
	                    //dont force sync if this change is a resolved change
	                }
	                else {
	                    var currentOrder = relParent.get("order");
	                    var serverOrder = message.data.order;

	                    //do not remove elements from the currentOrder
	                    var clientOnly = _.difference(currentOrder, serverOrder); //send these
	                    var serverOnly = _.difference(serverOrder, currentOrder); //get these
	                    if(clientOnly.length>0 || serverOnly.length>0) {
	                        //force sync
	                        pm.syncManager.startForceSync(message.data.id);
	                        if(typeof callback === "function") {
	                            callback();
	                        }
	                        return;//??
	                    }
	                    //message.data.order = message.data.order.concat(clientOnly);
	                }
	            }

	            var status = pm.collections.updateRemoteCollectionInDataStore(message.data,null,true, callback);
	            pm.appWindow.trigger("sendMessageObject", "updatedCollection", message.data);
	            if(status==-1) {
	                pm.mediator.trigger('syncOperationFailed', "Updating collection failed");
	            }
	            else {
	                pm.syncManager.updateSinceFromMessage(message);
	                if(message.data.order) {
	                    this.trigger("sortRequestContainer", "collection", message.data.id, message.data.order);
	                }
	            }
	            pm.syncLogger.log(new Error(),["Collection updated: ",message.data]);
	        }
	        else if(message.model === "request") {
	            message.data["collectionId"]=message.data.collection;

	            //hack for rawModeData
	            if(message.data.dataMode==="raw" && message.data.rawModeData) {
	                message.data.data = message.data.rawModeData;
	                delete message.data.rawModeData;
	            }

	            //pm.syncStatusManager.addNotification("request",message.data, "update");
	            var status = pm.collections.updateRemoteCollectionRequest(message.data, callback);
	            pm.appWindow.trigger("sendMessageObject", "updatedCollectionRequest", message.data);
	            if(status==-1) {
	                pm.mediator.trigger('syncOperationFailed', "Updating collection request failed");
	            }
	            else {
	                pm.syncManager.updateSinceFromMessage(message);
	            }
	            pm.syncLogger.log(new Error(),["Request updated: ",message.data]);
	        }
	        else if(message.model === "folder") {
	            //pm.syncStatusManager.addNotification("folder",message.data, "update");

	            var relParent = this.getFolderById(message.data.id);
	            if(relParent && message.data.order) {
	                if(message.resolved===true || (message.meta && message.meta.resolved==true)) {
	                    //dont force sync if this change is a resolved change
	                }
	                else {
	                    var currentOrder = relParent.order;
	                    var serverOrder = message.data.order;

	                    var clientOnly = _.difference(currentOrder, serverOrder);
	                    var serverOnly = _.difference(serverOrder, currentOrder);
	                    if(clientOnly.length>0 || serverOnly.length>0) {
	                        //force sync
	                        pm.syncManager.startForceSync(message.data.collection);
	                        if(typeof callback === "function") {
	                            callback();
	                        }
	                        return;//??
	                    }
	                    //message.data.order = message.data.order.concat(clientOnly);
	                }
	            }

	            var status = pm.collections.updateFolderFromRemote(message.data, callback);
	            pm.appWindow.trigger("sendMessageObject", "updatedFolder", message.data);
	            if(status==-1) {
	                pm.mediator.trigger('syncOperationFailed', "Updating folder failed");
	            }
	            else {
	                pm.syncManager.updateSinceFromMessage(message);
	                if(message.data.order) {
	                    this.trigger("sortRequestContainer", "folder", message.data.id, message.data.order);
	                }
	            }
	            pm.syncLogger.log(new Error(),["Folder updated: ", message.data]);
	        }
	        else if(message.model==="response") {
	            //update response - no handler
	            if(typeof callback === "function") {
	                callback();
	            }
	        }
	    },

	    importRemoteCollection: function(message, callback) {
	        this.importWholeCollectionWithOptSync(message, false, false, false, callback);
	    },

	    importRemoteFolder: function(message, callback) {
	        //just add the folders and requests
	        var collectionId = message.collection;
	        var collection = this.get(collectionId);
	        var oldThis = this;
	        var newFolder = {
	            "id": message.id,
	            "name": message.name,
	            "description": message.description,
	            "write": (collection.get("write") || pm.user.id == collection.get("owner")),
	            "order": message.order
	        };

	        var oldCollection = collection.getAsJSON();
	        collection.addFolder(newFolder);
	        this.trigger("addFolder", collection, newFolder);


	        //add all the requests
	        _.each(message.requests, function(request) {
	            request["collectionId"]=request.collection;
	            if(request.dataMode==="raw" && request.rawModeData) {
	                request.data = request.rawModeData;
	                delete request.rawModeData;
	            }
	            pm.appWindow.trigger("sendMessageObject", "addedCollectionRequest", request);
	            oldThis.addFullCollectionRequest(request, callback);
	        }.bind(this));


	        this.updateCollectionInDataStoreWithoutSync(collection.getAsJSON(), oldCollection, true);

	    },

	    deleteRemoteEntity: function(message, callback) {
	        if(message.model === "collection") {
	            pm.syncLogger.log(new Error(),["Collection destroyed: ",message.data]);
	            //pm.syncStatusManager.addNotification("collection",message.data, "destroy");

	            //unsubscribe if subscribed
	            if(pm.subscriptionManger.isSubscribedTo(message.data.id)) {
	                message.data.model_id = message.data.id;
	                pm.mediator.trigger("unsubscribeFromCollection", message, false, function() {
	                    //console.log("Unsubscribed");
	                });
	            }
	            var status = pm.collections.deleteCollectionFromDataStoreWithOptSync(message.data.id, true, false, callback);

	            if(status==-1) {
	                pm.mediator.trigger('syncOperationFailed', "Deleting collection failed");
	            }
	            else {
	                pm.syncManager.updateSinceFromMessage(message);
	            }
	        }
	        else if(message.model === "request") {
	            pm.syncLogger.log(new Error(),["Request destroyed: ",message.data]);
	            //pm.syncStatusManager.addNotification("request",message.data, "destroy");
	            var status = pm.collections.deleteCollectionRequestWithOptSync(message.data.id, false, callback);
	            if(status==-1) {
	                pm.mediator.trigger('syncOperationFailed', "Deleting collection request failed");
	            }
	            else {
	                pm.syncManager.updateSinceFromMessage(message);
	            }
	        }
	        else if(message.model === "folder") {
	            //pm.syncStatusManager.addNotification("folder",message.data, "destroy");
	            pm.syncLogger.log(new Error(),["Folder destroyed: ",message.data]);
	            var status = pm.collections.deleteFolderWithOptSync(message.data.id, false, callback);
	            if(status==-1) {
	                pm.mediator.trigger('syncOperationFailed', "Deleting folder failed");
	            }
	            else {
	                pm.syncManager.updateSinceFromMessage(message);
	            }
	        }
	        else if(message.model === "response") {
	            pm.syncLogger.log(new Error(),["Response destroyed: ",message.data]);
	            //pm.syncStatusManager.addNotification("response",message.data, "destroy");
	            pm.request.deleteSampleResponseByIdWithOptSync(message.data.id, false, callback);
	            //call callback regardless
	            pm.syncManager.updateSinceFromMessage(message);
	        }
	    },

	    transferRemoteEntity: function(message, callback) {
	        var destType = message.data.to.model;
	        //pm.syncStatusManager.addNotification("request",message.data, "transfer");
	        if(destType === "folder") {
	            this.moveRequestToFolderWithOptSync(message.data.id, message.data.to.model_id, false, callback);
	        }
	        else if(destType === "collection") {
	            this.moveRequestToCollectionWithOptSync(message.data.id, message.data.to.model_id, false, callback);
	        }
	    },

	    onSyncErrorReceived: function(verb, message) {
	        var pmCollection = this;
	        //collection ID already shared in team
	        if(message.error.name === "collectionIdSharedError") {
	          pm.alerts.warning('This collection has already been shared in the team. You can share it if you duplicate it', {
	            timeout: 5000
	          });
	            //unshare it
	            var collection = pm.collections.getCollectionById(message.error.details.model_id);
	            collection.set("sharedWithTeam",false);

	            pmCollection.updateCollectionInDataStoreWithOptSync(collection.getAsJSON(), collection, true, false, function (c) {
	                pmCollection.trigger("updateCollection", collection);
	            });
	            //this.trigger("updateCollectionMeta", targetCollection);
	        }
	    },
	});
	module.exports = PmCollections;


/***/ },

/***/ 211:
/***/ function(module, exports) {

	var SyncLogger = Backbone.Model.extend({
	    debugLog: Function.prototype.bind.call(console.debug, console),

	    debug: function() {
	        if(postman_env==="sync_dev") { //or debug flag is true
	            this.debugLog.apply(console, arguments);
	        }
	    },

	    log: function(err, logString) {
	        if(!this.logging) {
	            return;
	        }
	        var currTime =  this.getLogDate();
	        if(logString instanceof Array) {
	            var len = logString.length;
	            console.groupCollapsed(currTime + " - " + logString.join(" - "));
	            console.dir(currTime + " - " + err.stack);
	            for(var i=0;i<len;i++) {
	                console.log(currTime + " - " + logString[i]);
	            }
	            console.groupEnd();

	        }
	        else {
	            console.groupCollapsed(currTime + " - " + logString);
	            console.dir(currTime + " - " + err.stack);
	            console.groupEnd();
	        }
	    },

	    //error
	    error: function(msg, url, linenumber, colNumber, stack, errorObject) {
	        var installationId = pm.settings.getSetting("installation_id");
	        var userId = pm.user.id;
	        var accessToken = pm.user.get("access_token");
	        var currTime = new Date();
	        var version = pm.getVersion();
	        //Custom errors are send only if sync is enabled
	        if(pm.syncManager.syncEnabled) {
	            if(msg.indexOf("sails")!==-1 ||
	              (url && url.indexOf("sails")!==-1) ||
	               msg.indexOf("SecurityError")!==-1) { 
	                //sails/iframe errors. do not sent
	            }
	            else {
	                // pm.api.postErrorToServer(msg || "", url, linenumber+"", colNumber+"", stack | "", installationId, userId, currTime, version, accessToken);
	                pm.crashReporter.report(errorObject);
	            }
	        }
	        console.error(this.getLogDate()+" - " +msg);
	    },

	    //This sends uncaught errors - irrespective of sync
	    errorForce: function(msg, url, linenumber, colNumber, stack, errorObject) {
	        //if it show up in testing mode, FAIL THE TEST
	        if(pm.isTesting) {
	            pm.COMPULSARY_TEST_FAIL = true;
	            return;
	        }
	        var installationId = pm.settings.getSetting("installation_id");
	        var userId = pm.user.id;
	        var accessToken = pm.user.get("access_token");
	        var currTime = new Date();
	        var version = pm.getVersion();
	        if(msg.indexOf("sails")==-1 && (!url || url.indexOf("sails")==-1) && msg.indexOf("SecurityError")==-1) {
	            // pm.api.postErrorToServer(("Uncaught - " + msg) || "Uncaught - ", url, linenumber+"", colNumber+"", stack | "", installationId, userId, currTime, version, accessToken);
	            pm.crashReporter.report(errorObject);
	        }
	        console.error(this.getLogDate()+" - " +msg);
	    },

	    initialize: function() {
	        //global errors are sent to the server irrespective of sync
	        window.onerror = function(msg, url, linenumber, colnumber, stackTrace) {
	            pm.syncLogger.errorForce(msg, url, linenumber, colnumber, stackTrace.stack);
	            return false;
	        };

	        //turn this on?
	        this.logging = false;
	    },

	    getLogDate: function() {
	        var a = new Date();
	        return a.getHours()+":"+a.getMinutes()+":"+a.getMinutes()+"."+a.getMilliseconds();
	    }
	});

	module.exports = SyncLogger;


/***/ },

/***/ 212:
/***/ function(module, exports, __webpack_require__) {

	var Raven = __webpack_require__(213);

	var CrashReporter = Backbone.Model.extend({

	  defaults: {
	    "enabled": false,
	  },

	  initialize: function() {

	    if(!ENABLE_CRASH_REPORTING) {
	      return;
	    }

	    this.setEnabled(pm.settings.getSetting('googleAnalytics'));

	    this.configure();

	    /* listen to settings change */
	    pm.mediator.on('settings:change:googleAnalytics', function(newEnabledSetting) {
	      this.setEnabled(newEnabledSetting);
	    }.bind(this));

	    pm.mediator.on('sendCustomError', function(error) {
	      this.report(error);
	    }.bind(this));

	    /* listen to uncaught error */
	    window.onerror = function(msg, url, linenumber, colnumber, error) {
	      this.report(error);
	    }.bind(this);

	    /* listen to user auth events to set/unset user context */
	    pm.user.on('login', this.setUserContext, this);
	    pm.user.on('logout', this.clearUserContext, this);
	    pm.user.on('onLogout', this.clearUserContext, this);

	    if(pm.user.id) {
	      this.setUserContext();
	    }
	  },

	  setEnabled: function(isEnabled) {
	    if(isEnabled !== undefined && isEnabled !== null) {
	      this.set('enabled', isEnabled);
	    }
	  },

	  setUserContext: function() {
	    var installationId = pm.settings.getSetting("installation_id");
	    Raven.setUserContext({
	      id: pm.user.id,
	      app_id: installationId
	    });
	  },

	  clearUserContext: function() {
	    Raven.setUserContext();
	  },

	  configure: function() {
	    var installationId = pm.settings.getSetting("installation_id");
	    var version = pm.getVersion();
	    var target = postman_electron ? "electron" : "chrome";
	    var sentryDsn = (postman_electron) ? MAC_PROD_SENTRY_DSN : CHROME_PROD_SENTRY_DSN;
	    Raven.config(sentryDsn, {
	      collectWindowErrors: false,
	      tags: {
	        target: target,
	        channel: postman_env,
	        version: version,
	        app_id: installationId
	      },
	      release: version,
	      transport: this._send
	    }).install();
	    Raven.debug = false;
	  },

	  _send: function(opts) {
	    opts.auth.sentry_data = JSON.stringify(opts.data);

	    function urlencode(o) {
	      var pairs = [];
	      _.each(o, function(value, key) {
	        pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
	      });
	      return pairs.join('&');
	    }

	    var src = opts.url + '?' + urlencode(opts.auth);

	    $.ajax({
	      url: src,
	      method: 'GET',
	      success: opts.onSuccess,
	      error: opts.onError,
	      crossDomain: true
	    });
	  },

	  report: function(error) {
	    if(!this.get('enabled')) {
	      return;
	    }

	    Raven.captureException(error);
	  }
	});

	module.exports = CrashReporter;


/***/ },

/***/ 213:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! Raven.js 1.3.0 (768fdca) | github.com/getsentry/raven-js */

	/*
	 * Includes TraceKit
	 * https://github.com/getsentry/TraceKit
	 *
	 * Copyright 2015 Matt Robenolt and other contributors
	 * Released under the BSD license
	 * https://github.com/getsentry/raven-js/blob/master/LICENSE
	 *
	 */
	;(function(window, undefined){
	'use strict';

	/*
	 TraceKit - Cross brower stack traces - github.com/occ/TraceKit
	 MIT license
	*/

	var TraceKit = {
	    remoteFetching: false,
	    collectWindowErrors: true,
	    // 3 lines before, the offending line, 3 lines after
	    linesOfContext: 7,
	    debug: false
	};

	// global reference to slice
	var _slice = [].slice;
	var UNKNOWN_FUNCTION = '?';


	function getLocationHref() {
	    if (typeof document === 'undefined')
	        return '';

	    return document.location.href;
	};

	/**
	 * TraceKit.report: cross-browser processing of unhandled exceptions
	 *
	 * Syntax:
	 *   TraceKit.report.subscribe(function(stackInfo) { ... })
	 *   TraceKit.report.unsubscribe(function(stackInfo) { ... })
	 *   TraceKit.report(exception)
	 *   try { ...code... } catch(ex) { TraceKit.report(ex); }
	 *
	 * Supports:
	 *   - Firefox: full stack trace with line numbers, plus column number
	 *              on top frame; column number is not guaranteed
	 *   - Opera:   full stack trace with line and column numbers
	 *   - Chrome:  full stack trace with line and column numbers
	 *   - Safari:  line and column number for the top frame only; some frames
	 *              may be missing, and column number is not guaranteed
	 *   - IE:      line and column number for the top frame only; some frames
	 *              may be missing, and column number is not guaranteed
	 *
	 * In theory, TraceKit should work on all of the following versions:
	 *   - IE5.5+ (only 8.0 tested)
	 *   - Firefox 0.9+ (only 3.5+ tested)
	 *   - Opera 7+ (only 10.50 tested; versions 9 and earlier may require
	 *     Exceptions Have Stacktrace to be enabled in opera:config)
	 *   - Safari 3+ (only 4+ tested)
	 *   - Chrome 1+ (only 5+ tested)
	 *   - Konqueror 3.5+ (untested)
	 *
	 * Requires TraceKit.computeStackTrace.
	 *
	 * Tries to catch all unhandled exceptions and report them to the
	 * subscribed handlers. Please note that TraceKit.report will rethrow the
	 * exception. This is REQUIRED in order to get a useful stack trace in IE.
	 * If the exception does not reach the top of the browser, you will only
	 * get a stack trace from the point where TraceKit.report was called.
	 *
	 * Handlers receive a stackInfo object as described in the
	 * TraceKit.computeStackTrace docs.
	 */
	TraceKit.report = (function reportModuleWrapper() {
	    var handlers = [],
	        lastArgs = null,
	        lastException = null,
	        lastExceptionStack = null;

	    /**
	     * Add a crash handler.
	     * @param {Function} handler
	     */
	    function subscribe(handler) {
	        installGlobalHandler();
	        handlers.push(handler);
	    }

	    /**
	     * Remove a crash handler.
	     * @param {Function} handler
	     */
	    function unsubscribe(handler) {
	        for (var i = handlers.length - 1; i >= 0; --i) {
	            if (handlers[i] === handler) {
	                handlers.splice(i, 1);
	            }
	        }
	    }

	    /**
	     * Remove all crash handlers.
	     */
	    function unsubscribeAll() {
	        uninstallGlobalHandler();
	        handlers = [];
	    }

	    /**
	     * Dispatch stack information to all handlers.
	     * @param {Object.<string, *>} stack
	     */
	    function notifyHandlers(stack, isWindowError) {
	        var exception = null;
	        if (isWindowError && !TraceKit.collectWindowErrors) {
	          return;
	        }
	        for (var i in handlers) {
	            if (hasKey(handlers, i)) {
	                try {
	                    handlers[i].apply(null, [stack].concat(_slice.call(arguments, 2)));
	                } catch (inner) {
	                    exception = inner;
	                }
	            }
	        }

	        if (exception) {
	            throw exception;
	        }
	    }

	    var _oldOnerrorHandler, _onErrorHandlerInstalled;

	    /**
	     * Ensures all global unhandled exceptions are recorded.
	     * Supported by Gecko and IE.
	     * @param {string} message Error message.
	     * @param {string} url URL of script that generated the exception.
	     * @param {(number|string)} lineNo The line number at which the error
	     * occurred.
	     * @param {?(number|string)} colNo The column number at which the error
	     * occurred.
	     * @param {?Error} ex The actual Error object.
	     */
	    function traceKitWindowOnError(message, url, lineNo, colNo, ex) {
	        var stack = null;

	        if (lastExceptionStack) {
	            TraceKit.computeStackTrace.augmentStackTraceWithInitialElement(lastExceptionStack, url, lineNo, message);
	            processLastException();
	        } else if (ex) {
	            // New chrome and blink send along a real error object
	            // Let's just report that like a normal error.
	            // See: https://mikewest.org/2013/08/debugging-runtime-errors-with-window-onerror
	            stack = TraceKit.computeStackTrace(ex);
	            notifyHandlers(stack, true);
	        } else {
	            var location = {
	                'url': url,
	                'line': lineNo,
	                'column': colNo
	            };
	            location.func = TraceKit.computeStackTrace.guessFunctionName(location.url, location.line);
	            location.context = TraceKit.computeStackTrace.gatherContext(location.url, location.line);
	            stack = {
	                'message': message,
	                'url': getLocationHref(),
	                'stack': [location]
	            };
	            notifyHandlers(stack, true);
	        }

	        if (_oldOnerrorHandler) {
	            return _oldOnerrorHandler.apply(this, arguments);
	        }

	        return false;
	    }

	    function installGlobalHandler ()
	    {
	        if (_onErrorHandlerInstalled) {
	            return;
	        }
	        _oldOnerrorHandler = window.onerror;
	        window.onerror = traceKitWindowOnError;
	        _onErrorHandlerInstalled = true;
	    }

	    function uninstallGlobalHandler ()
	    {
	        if (!_onErrorHandlerInstalled) {
	            return;
	        }
	        window.onerror = _oldOnerrorHandler;
	        _onErrorHandlerInstalled = false;
	        _oldOnerrorHandler = undefined;
	    }

	    function processLastException() {
	        var _lastExceptionStack = lastExceptionStack,
	            _lastArgs = lastArgs;
	        lastArgs = null;
	        lastExceptionStack = null;
	        lastException = null;
	        notifyHandlers.apply(null, [_lastExceptionStack, false].concat(_lastArgs));
	    }

	    /**
	     * Reports an unhandled Error to TraceKit.
	     * @param {Error} ex
	     * @param {?boolean} rethrow If false, do not re-throw the exception.
	     * Only used for window.onerror to not cause an infinite loop of
	     * rethrowing.
	     */
	    function report(ex, rethrow) {
	        var args = _slice.call(arguments, 1);
	        if (lastExceptionStack) {
	            if (lastException === ex) {
	                return; // already caught by an inner catch block, ignore
	            } else {
	              processLastException();
	            }
	        }

	        var stack = TraceKit.computeStackTrace(ex);
	        lastExceptionStack = stack;
	        lastException = ex;
	        lastArgs = args;

	        // If the stack trace is incomplete, wait for 2 seconds for
	        // slow slow IE to see if onerror occurs or not before reporting
	        // this exception; otherwise, we will end up with an incomplete
	        // stack trace
	        window.setTimeout(function () {
	            if (lastException === ex) {
	                processLastException();
	            }
	        }, (stack.incomplete ? 2000 : 0));

	        if (rethrow !== false) {
	            throw ex; // re-throw to propagate to the top level (and cause window.onerror)
	        }
	    }

	    report.subscribe = subscribe;
	    report.unsubscribe = unsubscribe;
	    report.uninstall = unsubscribeAll;
	    return report;
	}());

	/**
	 * TraceKit.computeStackTrace: cross-browser stack traces in JavaScript
	 *
	 * Syntax:
	 *   s = TraceKit.computeStackTrace(exception) // consider using TraceKit.report instead (see below)
	 * Returns:
	 *   s.name              - exception name
	 *   s.message           - exception message
	 *   s.stack[i].url      - JavaScript or HTML file URL
	 *   s.stack[i].func     - function name, or empty for anonymous functions (if guessing did not work)
	 *   s.stack[i].args     - arguments passed to the function, if known
	 *   s.stack[i].line     - line number, if known
	 *   s.stack[i].column   - column number, if known
	 *   s.stack[i].context  - an array of source code lines; the middle element corresponds to the correct line#
	 *
	 * Supports:
	 *   - Firefox:  full stack trace with line numbers and unreliable column
	 *               number on top frame
	 *   - Opera 10: full stack trace with line and column numbers
	 *   - Opera 9-: full stack trace with line numbers
	 *   - Chrome:   full stack trace with line and column numbers
	 *   - Safari:   line and column number for the topmost stacktrace element
	 *               only
	 *   - IE:       no line numbers whatsoever
	 *
	 * Tries to guess names of anonymous functions by looking for assignments
	 * in the source code. In IE and Safari, we have to guess source file names
	 * by searching for function bodies inside all page scripts. This will not
	 * work for scripts that are loaded cross-domain.
	 * Here be dragons: some function names may be guessed incorrectly, and
	 * duplicate functions may be mismatched.
	 *
	 * TraceKit.computeStackTrace should only be used for tracing purposes.
	 * Logging of unhandled exceptions should be done with TraceKit.report,
	 * which builds on top of TraceKit.computeStackTrace and provides better
	 * IE support by utilizing the window.onerror event to retrieve information
	 * about the top of the stack.
	 *
	 * Note: In IE and Safari, no stack trace is recorded on the Error object,
	 * so computeStackTrace instead walks its *own* chain of callers.
	 * This means that:
	 *  * in Safari, some methods may be missing from the stack trace;
	 *  * in IE, the topmost function in the stack trace will always be the
	 *    caller of computeStackTrace.
	 *
	 * This is okay for tracing (because you are likely to be calling
	 * computeStackTrace from the function you want to be the topmost element
	 * of the stack trace anyway), but not okay for logging unhandled
	 * exceptions (because your catch block will likely be far away from the
	 * inner function that actually caused the exception).
	 *
	 */
	TraceKit.computeStackTrace = (function computeStackTraceWrapper() {
	    var sourceCache = {};

	    /**
	     * Attempts to retrieve source code via XMLHttpRequest, which is used
	     * to look up anonymous function names.
	     * @param {string} url URL of source code.
	     * @return {string} Source contents.
	     */
	    function loadSource(url) {
	        if (!TraceKit.remoteFetching) { //Only attempt request if remoteFetching is on.
	            return '';
	        }
	        try {
	            var getXHR = function() {
	                try {
	                    return new window.XMLHttpRequest();
	                } catch (e) {
	                    // explicitly bubble up the exception if not found
	                    return new window.ActiveXObject('Microsoft.XMLHTTP');
	                }
	            };

	            var request = getXHR();
	            request.open('GET', url, false);
	            request.send('');
	            return request.responseText;
	        } catch (e) {
	            return '';
	        }
	    }

	    /**
	     * Retrieves source code from the source code cache.
	     * @param {string} url URL of source code.
	     * @return {Array.<string>} Source contents.
	     */
	    function getSource(url) {
	        if (!isString(url)) return [];
	        if (!hasKey(sourceCache, url)) {
	            // URL needs to be able to fetched within the acceptable domain.  Otherwise,
	            // cross-domain errors will be triggered.
	            var source = '';
	            var domain = '';
	            try { domain = document.domain; } catch (e) {}
	            if (url.indexOf(domain) !== -1) {
	                source = loadSource(url);
	            }
	            sourceCache[url] = source ? source.split('\n') : [];
	        }

	        return sourceCache[url];
	    }

	    /**
	     * Tries to use an externally loaded copy of source code to determine
	     * the name of a function by looking at the name of the variable it was
	     * assigned to, if any.
	     * @param {string} url URL of source code.
	     * @param {(string|number)} lineNo Line number in source code.
	     * @return {string} The function name, if discoverable.
	     */
	    function guessFunctionName(url, lineNo) {
	        var reFunctionArgNames = /function ([^(]*)\(([^)]*)\)/,
	            reGuessFunction = /['"]?([0-9A-Za-z$_]+)['"]?\s*[:=]\s*(function|eval|new Function)/,
	            line = '',
	            maxLines = 10,
	            source = getSource(url),
	            m;

	        if (!source.length) {
	            return UNKNOWN_FUNCTION;
	        }

	        // Walk backwards from the first line in the function until we find the line which
	        // matches the pattern above, which is the function definition
	        for (var i = 0; i < maxLines; ++i) {
	            line = source[lineNo - i] + line;

	            if (!isUndefined(line)) {
	                if ((m = reGuessFunction.exec(line))) {
	                    return m[1];
	                } else if ((m = reFunctionArgNames.exec(line))) {
	                    return m[1];
	                }
	            }
	        }

	        return UNKNOWN_FUNCTION;
	    }

	    /**
	     * Retrieves the surrounding lines from where an exception occurred.
	     * @param {string} url URL of source code.
	     * @param {(string|number)} line Line number in source code to centre
	     * around for context.
	     * @return {?Array.<string>} Lines of source code.
	     */
	    function gatherContext(url, line) {
	        var source = getSource(url);

	        if (!source.length) {
	            return null;
	        }

	        var context = [],
	            // linesBefore & linesAfter are inclusive with the offending line.
	            // if linesOfContext is even, there will be one extra line
	            //   *before* the offending line.
	            linesBefore = Math.floor(TraceKit.linesOfContext / 2),
	            // Add one extra line if linesOfContext is odd
	            linesAfter = linesBefore + (TraceKit.linesOfContext % 2),
	            start = Math.max(0, line - linesBefore - 1),
	            end = Math.min(source.length, line + linesAfter - 1);

	        line -= 1; // convert to 0-based index

	        for (var i = start; i < end; ++i) {
	            if (!isUndefined(source[i])) {
	                context.push(source[i]);
	            }
	        }

	        return context.length > 0 ? context : null;
	    }

	    /**
	     * Escapes special characters, except for whitespace, in a string to be
	     * used inside a regular expression as a string literal.
	     * @param {string} text The string.
	     * @return {string} The escaped string literal.
	     */
	    function escapeRegExp(text) {
	        return text.replace(/[\-\[\]{}()*+?.,\\\^$|#]/g, '\\$&');
	    }

	    /**
	     * Escapes special characters in a string to be used inside a regular
	     * expression as a string literal. Also ensures that HTML entities will
	     * be matched the same as their literal friends.
	     * @param {string} body The string.
	     * @return {string} The escaped string.
	     */
	    function escapeCodeAsRegExpForMatchingInsideHTML(body) {
	        return escapeRegExp(body).replace('<', '(?:<|&lt;)').replace('>', '(?:>|&gt;)').replace('&', '(?:&|&amp;)').replace('"', '(?:"|&quot;)').replace(/\s+/g, '\\s+');
	    }

	    /**
	     * Determines where a code fragment occurs in the source code.
	     * @param {RegExp} re The function definition.
	     * @param {Array.<string>} urls A list of URLs to search.
	     * @return {?Object.<string, (string|number)>} An object containing
	     * the url, line, and column number of the defined function.
	     */
	    function findSourceInUrls(re, urls) {
	        var source, m;
	        for (var i = 0, j = urls.length; i < j; ++i) {
	            // console.log('searching', urls[i]);
	            if ((source = getSource(urls[i])).length) {
	                source = source.join('\n');
	                if ((m = re.exec(source))) {
	                    // console.log('Found function in ' + urls[i]);

	                    return {
	                        'url': urls[i],
	                        'line': source.substring(0, m.index).split('\n').length,
	                        'column': m.index - source.lastIndexOf('\n', m.index) - 1
	                    };
	                }
	            }
	        }

	        // console.log('no match');

	        return null;
	    }

	    /**
	     * Determines at which column a code fragment occurs on a line of the
	     * source code.
	     * @param {string} fragment The code fragment.
	     * @param {string} url The URL to search.
	     * @param {(string|number)} line The line number to examine.
	     * @return {?number} The column number.
	     */
	    function findSourceInLine(fragment, url, line) {
	        var source = getSource(url),
	            re = new RegExp('\\b' + escapeRegExp(fragment) + '\\b'),
	            m;

	        line -= 1;

	        if (source && source.length > line && (m = re.exec(source[line]))) {
	            return m.index;
	        }

	        return null;
	    }

	    /**
	     * Determines where a function was defined within the source code.
	     * @param {(Function|string)} func A function reference or serialized
	     * function definition.
	     * @return {?Object.<string, (string|number)>} An object containing
	     * the url, line, and column number of the defined function.
	     */
	    function findSourceByFunctionBody(func) {
	        if (typeof document === 'undefined')
	            return;

	        var urls = [window.location.href],
	            scripts = document.getElementsByTagName('script'),
	            body,
	            code = '' + func,
	            codeRE = /^function(?:\s+([\w$]+))?\s*\(([\w\s,]*)\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/,
	            eventRE = /^function on([\w$]+)\s*\(event\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/,
	            re,
	            parts,
	            result;

	        for (var i = 0; i < scripts.length; ++i) {
	            var script = scripts[i];
	            if (script.src) {
	                urls.push(script.src);
	            }
	        }

	        if (!(parts = codeRE.exec(code))) {
	            re = new RegExp(escapeRegExp(code).replace(/\s+/g, '\\s+'));
	        }

	        // not sure if this is really necessary, but I don’t have a test
	        // corpus large enough to confirm that and it was in the original.
	        else {
	            var name = parts[1] ? '\\s+' + parts[1] : '',
	                args = parts[2].split(',').join('\\s*,\\s*');

	            body = escapeRegExp(parts[3]).replace(/;$/, ';?'); // semicolon is inserted if the function ends with a comment.replace(/\s+/g, '\\s+');
	            re = new RegExp('function' + name + '\\s*\\(\\s*' + args + '\\s*\\)\\s*{\\s*' + body + '\\s*}');
	        }

	        // look for a normal function definition
	        if ((result = findSourceInUrls(re, urls))) {
	            return result;
	        }

	        // look for an old-school event handler function
	        if ((parts = eventRE.exec(code))) {
	            var event = parts[1];
	            body = escapeCodeAsRegExpForMatchingInsideHTML(parts[2]);

	            // look for a function defined in HTML as an onXXX handler
	            re = new RegExp('on' + event + '=[\\\'"]\\s*' + body + '\\s*[\\\'"]', 'i');

	            if ((result = findSourceInUrls(re, urls[0]))) {
	                return result;
	            }

	            // look for ???
	            re = new RegExp(body);

	            if ((result = findSourceInUrls(re, urls))) {
	                return result;
	            }
	        }

	        return null;
	    }

	    // Contents of Exception in various browsers.
	    //
	    // SAFARI:
	    // ex.message = Can't find variable: qq
	    // ex.line = 59
	    // ex.sourceId = 580238192
	    // ex.sourceURL = http://...
	    // ex.expressionBeginOffset = 96
	    // ex.expressionCaretOffset = 98
	    // ex.expressionEndOffset = 98
	    // ex.name = ReferenceError
	    //
	    // FIREFOX:
	    // ex.message = qq is not defined
	    // ex.fileName = http://...
	    // ex.lineNumber = 59
	    // ex.columnNumber = 69
	    // ex.stack = ...stack trace... (see the example below)
	    // ex.name = ReferenceError
	    //
	    // CHROME:
	    // ex.message = qq is not defined
	    // ex.name = ReferenceError
	    // ex.type = not_defined
	    // ex.arguments = ['aa']
	    // ex.stack = ...stack trace...
	    //
	    // INTERNET EXPLORER:
	    // ex.message = ...
	    // ex.name = ReferenceError
	    //
	    // OPERA:
	    // ex.message = ...message... (see the example below)
	    // ex.name = ReferenceError
	    // ex.opera#sourceloc = 11  (pretty much useless, duplicates the info in ex.message)
	    // ex.stacktrace = n/a; see 'opera:config#UserPrefs|Exceptions Have Stacktrace'

	    /**
	     * Computes stack trace information from the stack property.
	     * Chrome and Gecko use this property.
	     * @param {Error} ex
	     * @return {?Object.<string, *>} Stack trace information.
	     */
	    function computeStackTraceFromStackProp(ex) {
	        if (isUndefined(ex.stack) || !ex.stack) return;

	        var chrome = /^\s*at (.*?) ?\(?((?:(?:file|https?|chrome-extension):.*?)|<anonymous>):(\d+)(?::(\d+))?\)?\s*$/i,
	            gecko = /^\s*(.*?)(?:\((.*?)\))?@((?:file|https?|chrome).*?):(\d+)(?::(\d+))?\s*$/i,
	            winjs = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:ms-appx|http|https):.*?):(\d+)(?::(\d+))?\)?\s*$/i,
	            lines = ex.stack.split('\n'),
	            stack = [],
	            parts,
	            element,
	            reference = /^(.*) is undefined$/.exec(ex.message);

	        for (var i = 0, j = lines.length; i < j; ++i) {
	            if ((parts = gecko.exec(lines[i]))) {
	                element = {
	                    'url': parts[3],
	                    'func': parts[1] || UNKNOWN_FUNCTION,
	                    'args': parts[2] ? parts[2].split(',') : '',
	                    'line': +parts[4],
	                    'column': parts[5] ? +parts[5] : null
	                };
	            } else if ((parts = chrome.exec(lines[i]))) {
	                element = {
	                    'url': parts[2],
	                    'func': parts[1] || UNKNOWN_FUNCTION,
	                    'line': +parts[3],
	                    'column': parts[4] ? +parts[4] : null
	                };
	            } else if ((parts = winjs.exec(lines[i]))) {
	                element = {
	                    'url': parts[2],
	                    'func': parts[1] || UNKNOWN_FUNCTION,
	                    'line': +parts[3],
	                    'column': parts[4] ? +parts[4] : null
	                };
	            } else {
	                continue;
	            }

	            if (!element.func && element.line) {
	                element.func = guessFunctionName(element.url, element.line);
	            }

	            if (element.line) {
	                element.context = gatherContext(element.url, element.line);
	            }

	            stack.push(element);
	        }

	        if (!stack.length) {
	            return null;
	        }

	        if (stack[0].line && !stack[0].column && reference) {
	            stack[0].column = findSourceInLine(reference[1], stack[0].url, stack[0].line);
	        } else if (!stack[0].column && !isUndefined(ex.columnNumber)) {
	            // FireFox uses this awesome columnNumber property for its top frame
	            // Also note, Firefox's column number is 0-based and everything else expects 1-based,
	            // so adding 1
	            stack[0].column = ex.columnNumber + 1;
	        }

	        return {
	            'name': ex.name,
	            'message': ex.message,
	            'url': getLocationHref(),
	            'stack': stack
	        };
	    }

	    /**
	     * Computes stack trace information from the stacktrace property.
	     * Opera 10 uses this property.
	     * @param {Error} ex
	     * @return {?Object.<string, *>} Stack trace information.
	     */
	    function computeStackTraceFromStacktraceProp(ex) {
	        // Access and store the stacktrace property before doing ANYTHING
	        // else to it because Opera is not very good at providing it
	        // reliably in other circumstances.
	        var stacktrace = ex.stacktrace;
	        if (isUndefined(ex.stacktrace) || !ex.stacktrace) return;

	        var testRE = / line (\d+), column (\d+) in (?:<anonymous function: ([^>]+)>|([^\)]+))\((.*)\) in (.*):\s*$/i,
	            lines = stacktrace.split('\n'),
	            stack = [],
	            parts;

	        for (var i = 0, j = lines.length; i < j; i += 2) {
	            if ((parts = testRE.exec(lines[i]))) {
	                var element = {
	                    'line': +parts[1],
	                    'column': +parts[2],
	                    'func': parts[3] || parts[4],
	                    'args': parts[5] ? parts[5].split(',') : [],
	                    'url': parts[6]
	                };

	                if (!element.func && element.line) {
	                    element.func = guessFunctionName(element.url, element.line);
	                }
	                if (element.line) {
	                    try {
	                        element.context = gatherContext(element.url, element.line);
	                    } catch (exc) {}
	                }

	                if (!element.context) {
	                    element.context = [lines[i + 1]];
	                }

	                stack.push(element);
	            }
	        }

	        if (!stack.length) {
	            return null;
	        }

	        return {
	            'name': ex.name,
	            'message': ex.message,
	            'url': getLocationHref(),
	            'stack': stack
	        };
	    }

	    /**
	     * NOT TESTED.
	     * Computes stack trace information from an error message that includes
	     * the stack trace.
	     * Opera 9 and earlier use this method if the option to show stack
	     * traces is turned on in opera:config.
	     * @param {Error} ex
	     * @return {?Object.<string, *>} Stack information.
	     */
	    function computeStackTraceFromOperaMultiLineMessage(ex) {
	        // Opera includes a stack trace into the exception message. An example is:
	        //
	        // Statement on line 3: Undefined variable: undefinedFunc
	        // Backtrace:
	        //   Line 3 of linked script file://localhost/Users/andreyvit/Projects/TraceKit/javascript-client/sample.js: In function zzz
	        //         undefinedFunc(a);
	        //   Line 7 of inline#1 script in file://localhost/Users/andreyvit/Projects/TraceKit/javascript-client/sample.html: In function yyy
	        //           zzz(x, y, z);
	        //   Line 3 of inline#1 script in file://localhost/Users/andreyvit/Projects/TraceKit/javascript-client/sample.html: In function xxx
	        //           yyy(a, a, a);
	        //   Line 1 of function script
	        //     try { xxx('hi'); return false; } catch(ex) { TraceKit.report(ex); }
	        //   ...

	        var lines = ex.message.split('\n');
	        if (lines.length < 4) {
	            return null;
	        }

	        var lineRE1 = /^\s*Line (\d+) of linked script ((?:file|https?)\S+)(?:: in function (\S+))?\s*$/i,
	            lineRE2 = /^\s*Line (\d+) of inline#(\d+) script in ((?:file|https?)\S+)(?:: in function (\S+))?\s*$/i,
	            lineRE3 = /^\s*Line (\d+) of function script\s*$/i,
	            stack = [],
	            scripts = document.getElementsByTagName('script'),
	            inlineScriptBlocks = [],
	            parts,
	            i,
	            len,
	            source;

	        for (i in scripts) {
	            if (hasKey(scripts, i) && !scripts[i].src) {
	                inlineScriptBlocks.push(scripts[i]);
	            }
	        }

	        for (i = 2, len = lines.length; i < len; i += 2) {
	            var item = null;
	            if ((parts = lineRE1.exec(lines[i]))) {
	                item = {
	                    'url': parts[2],
	                    'func': parts[3],
	                    'line': +parts[1]
	                };
	            } else if ((parts = lineRE2.exec(lines[i]))) {
	                item = {
	                    'url': parts[3],
	                    'func': parts[4]
	                };
	                var relativeLine = (+parts[1]); // relative to the start of the <SCRIPT> block
	                var script = inlineScriptBlocks[parts[2] - 1];
	                if (script) {
	                    source = getSource(item.url);
	                    if (source) {
	                        source = source.join('\n');
	                        var pos = source.indexOf(script.innerText);
	                        if (pos >= 0) {
	                            item.line = relativeLine + source.substring(0, pos).split('\n').length;
	                        }
	                    }
	                }
	            } else if ((parts = lineRE3.exec(lines[i]))) {
	                var url = window.location.href.replace(/#.*$/, ''),
	                    line = parts[1];
	                var re = new RegExp(escapeCodeAsRegExpForMatchingInsideHTML(lines[i + 1]));
	                source = findSourceInUrls(re, [url]);
	                item = {
	                    'url': url,
	                    'line': source ? source.line : line,
	                    'func': ''
	                };
	            }

	            if (item) {
	                if (!item.func) {
	                    item.func = guessFunctionName(item.url, item.line);
	                }
	                var context = gatherContext(item.url, item.line);
	                var midline = (context ? context[Math.floor(context.length / 2)] : null);
	                if (context && midline.replace(/^\s*/, '') === lines[i + 1].replace(/^\s*/, '')) {
	                    item.context = context;
	                } else {
	                    // if (context) alert("Context mismatch. Correct midline:\n" + lines[i+1] + "\n\nMidline:\n" + midline + "\n\nContext:\n" + context.join("\n") + "\n\nURL:\n" + item.url);
	                    item.context = [lines[i + 1]];
	                }
	                stack.push(item);
	            }
	        }
	        if (!stack.length) {
	            return null; // could not parse multiline exception message as Opera stack trace
	        }

	        return {
	            'name': ex.name,
	            'message': lines[0],
	            'url': getLocationHref(),
	            'stack': stack
	        };
	    }

	    /**
	     * Adds information about the first frame to incomplete stack traces.
	     * Safari and IE require this to get complete data on the first frame.
	     * @param {Object.<string, *>} stackInfo Stack trace information from
	     * one of the compute* methods.
	     * @param {string} url The URL of the script that caused an error.
	     * @param {(number|string)} lineNo The line number of the script that
	     * caused an error.
	     * @param {string=} message The error generated by the browser, which
	     * hopefully contains the name of the object that caused the error.
	     * @return {boolean} Whether or not the stack information was
	     * augmented.
	     */
	    function augmentStackTraceWithInitialElement(stackInfo, url, lineNo, message) {
	        var initial = {
	            'url': url,
	            'line': lineNo
	        };

	        if (initial.url && initial.line) {
	            stackInfo.incomplete = false;

	            if (!initial.func) {
	                initial.func = guessFunctionName(initial.url, initial.line);
	            }

	            if (!initial.context) {
	                initial.context = gatherContext(initial.url, initial.line);
	            }

	            var reference = / '([^']+)' /.exec(message);
	            if (reference) {
	                initial.column = findSourceInLine(reference[1], initial.url, initial.line);
	            }

	            if (stackInfo.stack.length > 0) {
	                if (stackInfo.stack[0].url === initial.url) {
	                    if (stackInfo.stack[0].line === initial.line) {
	                        return false; // already in stack trace
	                    } else if (!stackInfo.stack[0].line && stackInfo.stack[0].func === initial.func) {
	                        stackInfo.stack[0].line = initial.line;
	                        stackInfo.stack[0].context = initial.context;
	                        return false;
	                    }
	                }
	            }

	            stackInfo.stack.unshift(initial);
	            stackInfo.partial = true;
	            return true;
	        } else {
	            stackInfo.incomplete = true;
	        }

	        return false;
	    }

	    /**
	     * Computes stack trace information by walking the arguments.caller
	     * chain at the time the exception occurred. This will cause earlier
	     * frames to be missed but is the only way to get any stack trace in
	     * Safari and IE. The top frame is restored by
	     * {@link augmentStackTraceWithInitialElement}.
	     * @param {Error} ex
	     * @return {?Object.<string, *>} Stack trace information.
	     */
	    function computeStackTraceByWalkingCallerChain(ex, depth) {
	        var functionName = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i,
	            stack = [],
	            funcs = {},
	            recursion = false,
	            parts,
	            item,
	            source;

	        for (var curr = computeStackTraceByWalkingCallerChain.caller; curr && !recursion; curr = curr.caller) {
	            if (curr === computeStackTrace || curr === TraceKit.report) {
	                // console.log('skipping internal function');
	                continue;
	            }

	            item = {
	                'url': null,
	                'func': UNKNOWN_FUNCTION,
	                'line': null,
	                'column': null
	            };

	            if (curr.name) {
	                item.func = curr.name;
	            } else if ((parts = functionName.exec(curr.toString()))) {
	                item.func = parts[1];
	            }

	            if (typeof item.func === 'undefined') {
	              try {
	                item.func = parts.input.substring(0, parts.input.indexOf('{'));
	              } catch (e) { }
	            }

	            if ((source = findSourceByFunctionBody(curr))) {
	                item.url = source.url;
	                item.line = source.line;

	                if (item.func === UNKNOWN_FUNCTION) {
	                    item.func = guessFunctionName(item.url, item.line);
	                }

	                var reference = / '([^']+)' /.exec(ex.message || ex.description);
	                if (reference) {
	                    item.column = findSourceInLine(reference[1], source.url, source.line);
	                }
	            }

	            if (funcs['' + curr]) {
	                recursion = true;
	            }else{
	                funcs['' + curr] = true;
	            }

	            stack.push(item);
	        }

	        if (depth) {
	            // console.log('depth is ' + depth);
	            // console.log('stack is ' + stack.length);
	            stack.splice(0, depth);
	        }

	        var result = {
	            'name': ex.name,
	            'message': ex.message,
	            'url': getLocationHref(),
	            'stack': stack
	        };
	        augmentStackTraceWithInitialElement(result, ex.sourceURL || ex.fileName, ex.line || ex.lineNumber, ex.message || ex.description);
	        return result;
	    }

	    /**
	     * Computes a stack trace for an exception.
	     * @param {Error} ex
	     * @param {(string|number)=} depth
	     */
	    function computeStackTrace(ex, depth) {
	        var stack = null;
	        depth = (depth == null ? 0 : +depth);

	        try {
	            // This must be tried first because Opera 10 *destroys*
	            // its stacktrace property if you try to access the stack
	            // property first!!
	            stack = computeStackTraceFromStacktraceProp(ex);
	            if (stack) {
	                return stack;
	            }
	        } catch (e) {
	            if (TraceKit.debug) {
	                throw e;
	            }
	        }

	        try {
	            stack = computeStackTraceFromStackProp(ex);
	            if (stack) {
	                return stack;
	            }
	        } catch (e) {
	            if (TraceKit.debug) {
	                throw e;
	            }
	        }

	        try {
	            stack = computeStackTraceFromOperaMultiLineMessage(ex);
	            if (stack) {
	                return stack;
	            }
	        } catch (e) {
	            if (TraceKit.debug) {
	                throw e;
	            }
	        }

	        try {
	            stack = computeStackTraceByWalkingCallerChain(ex, depth + 1);
	            if (stack) {
	                return stack;
	            }
	        } catch (e) {
	            if (TraceKit.debug) {
	                throw e;
	            }
	        }

	        return {
	            'name': ex.name,
	            'message': ex.message,
	            'url': getLocationHref()
	        };
	    }

	    computeStackTrace.augmentStackTraceWithInitialElement = augmentStackTraceWithInitialElement;
	    computeStackTrace.computeStackTraceFromStackProp = computeStackTraceFromStackProp;
	    computeStackTrace.guessFunctionName = guessFunctionName;
	    computeStackTrace.gatherContext = gatherContext;

	    return computeStackTrace;
	}());

	'use strict';

	// First, check for JSON support
	// If there is no JSON, we no-op the core features of Raven
	// since JSON is required to encode the payload
	var _Raven = window.Raven,
	    hasJSON = !!(typeof JSON === 'object' && JSON.stringify),
	    // Raven can run in contexts where there's no document (react-native)
	    hasDocument = typeof document !== 'undefined',
	    lastCapturedException,
	    lastEventId,
	    globalServer,
	    globalKey,
	    globalProject,
	    globalContext = {},
	    globalOptions = {
	        logger: 'javascript',
	        ignoreErrors: [],
	        ignoreUrls: [],
	        whitelistUrls: [],
	        includePaths: [],
	        crossOrigin: 'anonymous',
	        collectWindowErrors: true,
	        maxMessageLength: 100
	    },
	    isRavenInstalled = false,
	    objectPrototype = Object.prototype,
	    // capture references to window.console *and* all its methods first
	    // before the console plugin has a chance to monkey patch
	    originalConsole = window.console || {},
	    originalConsoleMethods = {},
	    plugins = [],
	    startTime = now();

	for (var method in originalConsole) {
	  originalConsoleMethods[method] = originalConsole[method];
	}
	/*
	 * The core Raven singleton
	 *
	 * @this {Raven}
	 */
	var Raven = {
	    VERSION: '1.3.0',

	    debug: false,

	    /*
	     * Allow multiple versions of Raven to be installed.
	     * Strip Raven from the global context and returns the instance.
	     *
	     * @return {Raven}
	     */
	    noConflict: function() {
	        window.Raven = _Raven;
	        return Raven;
	    },

	    /*
	     * Configure Raven with a DSN and extra options
	     *
	     * @param {string} dsn The public Sentry DSN
	     * @param {object} options Optional set of of global options [optional]
	     * @return {Raven}
	     */
	    config: function(dsn, options) {
	        if (globalServer) {
	            logDebug('error', 'Error: Raven has already been configured');
	            return Raven;
	        }
	        if (!dsn) return Raven;

	        var uri = parseDSN(dsn),
	            lastSlash = uri.path.lastIndexOf('/'),
	            path = uri.path.substr(1, lastSlash);

	        // merge in options
	        if (options) {
	            each(options, function(key, value){
	                // tags and extra are special and need to be put into context
	                if (key == 'tags' || key == 'extra') {
	                    globalContext[key] = value;
	                } else {
	                    globalOptions[key] = value;
	                }
	            });
	        }

	        // "Script error." is hard coded into browsers for errors that it can't read.
	        // this is the result of a script being pulled in from an external domain and CORS.
	        globalOptions.ignoreErrors.push(/^Script error\.?$/);
	        globalOptions.ignoreErrors.push(/^Javascript error: Script error\.? on line 0$/);

	        // join regexp rules into one big rule
	        globalOptions.ignoreErrors = joinRegExp(globalOptions.ignoreErrors);
	        globalOptions.ignoreUrls = globalOptions.ignoreUrls.length ? joinRegExp(globalOptions.ignoreUrls) : false;
	        globalOptions.whitelistUrls = globalOptions.whitelistUrls.length ? joinRegExp(globalOptions.whitelistUrls) : false;
	        globalOptions.includePaths = joinRegExp(globalOptions.includePaths);

	        globalKey = uri.user;
	        globalProject = uri.path.substr(lastSlash + 1);

	        // assemble the endpoint from the uri pieces
	        globalServer = '//' + uri.host +
	                      (uri.port ? ':' + uri.port : '') +
	                      '/' + path + 'api/' + globalProject + '/store/';

	        if (uri.protocol) {
	            globalServer = uri.protocol + ':' + globalServer;
	        }

	        if (globalOptions.fetchContext) {
	            TraceKit.remoteFetching = true;
	        }

	        if (globalOptions.linesOfContext) {
	            TraceKit.linesOfContext = globalOptions.linesOfContext;
	        }

	        TraceKit.collectWindowErrors = !!globalOptions.collectWindowErrors;

	        // return for chaining
	        return Raven;
	    },

	    /*
	     * Installs a global window.onerror error handler
	     * to capture and report uncaught exceptions.
	     * At this point, install() is required to be called due
	     * to the way TraceKit is set up.
	     *
	     * @return {Raven}
	     */
	    install: function() {
	        if (isSetup() && !isRavenInstalled) {
	            TraceKit.report.subscribe(handleStackInfo);

	            // Install all of the plugins
	            each(plugins, function(_, plugin) {
	                plugin();
	            });

	            isRavenInstalled = true;
	        }

	        return Raven;
	    },

	    /*
	     * Wrap code within a context so Raven can capture errors
	     * reliably across domains that is executed immediately.
	     *
	     * @param {object} options A specific set of options for this context [optional]
	     * @param {function} func The callback to be immediately executed within the context
	     * @param {array} args An array of arguments to be called with the callback [optional]
	     */
	    context: function(options, func, args) {
	        if (isFunction(options)) {
	            args = func || [];
	            func = options;
	            options = undefined;
	        }

	        return Raven.wrap(options, func).apply(this, args);
	    },

	    /*
	     * Wrap code within a context and returns back a new function to be executed
	     *
	     * @param {object} options A specific set of options for this context [optional]
	     * @param {function} func The function to be wrapped in a new context
	     * @return {function} The newly wrapped functions with a context
	     */
	    wrap: function(options, func) {
	        // 1 argument has been passed, and it's not a function
	        // so just return it
	        if (isUndefined(func) && !isFunction(options)) {
	            return options;
	        }

	        // options is optional
	        if (isFunction(options)) {
	            func = options;
	            options = undefined;
	        }

	        // At this point, we've passed along 2 arguments, and the second one
	        // is not a function either, so we'll just return the second argument.
	        if (!isFunction(func)) {
	            return func;
	        }

	        // We don't wanna wrap it twice!
	        if (func.__raven__) {
	            return func;
	        }

	        function wrapped() {
	            var args = [], i = arguments.length,
	                deep = !options || options && options.deep !== false;
	            // Recursively wrap all of a function's arguments that are
	            // functions themselves.

	            while(i--) args[i] = deep ? Raven.wrap(options, arguments[i]) : arguments[i];

	            try {
	                /*jshint -W040*/
	                return func.apply(this, args);
	            } catch(e) {
	                Raven.captureException(e, options);
	                throw e;
	            }
	        }

	        // copy over properties of the old function
	        for (var property in func) {
	            if (hasKey(func, property)) {
	                wrapped[property] = func[property];
	            }
	        }
	        wrapped.prototype = func.prototype;

	        // Signal that this function has been wrapped already
	        // for both debugging and to prevent it to being wrapped twice
	        wrapped.__raven__ = true;
	        wrapped.__inner__ = func;

	        return wrapped;
	    },

	    /*
	     * Uninstalls the global error handler.
	     *
	     * @return {Raven}
	     */
	    uninstall: function() {
	        TraceKit.report.uninstall();
	        isRavenInstalled = false;

	        return Raven;
	    },

	    /*
	     * Manually capture an exception and send it over to Sentry
	     *
	     * @param {error} ex An exception to be logged
	     * @param {object} options A specific set of options for this error [optional]
	     * @return {Raven}
	     */
	    captureException: function(ex, options) {
	        // If not an Error is passed through, recall as a message instead
	        if (!isError(ex)) return Raven.captureMessage(ex, options);

	        // Store the raw exception object for potential debugging and introspection
	        lastCapturedException = ex;

	        // TraceKit.report will re-raise any exception passed to it,
	        // which means you have to wrap it in try/catch. Instead, we
	        // can wrap it here and only re-raise if TraceKit.report
	        // raises an exception different from the one we asked to
	        // report on.
	        try {
	            var stack = TraceKit.computeStackTrace(ex);
	            handleStackInfo(stack, options);
	        } catch(ex1) {
	            if(ex !== ex1) {
	                throw ex1;
	            }
	        }

	        return Raven;
	    },

	    /*
	     * Manually send a message to Sentry
	     *
	     * @param {string} msg A plain message to be captured in Sentry
	     * @param {object} options A specific set of options for this message [optional]
	     * @return {Raven}
	     */
	    captureMessage: function(msg, options) {
	        // config() automagically converts ignoreErrors from a list to a RegExp so we need to test for an
	        // early call; we'll error on the side of logging anything called before configuration since it's
	        // probably something you should see:
	        if (!!globalOptions.ignoreErrors.test && globalOptions.ignoreErrors.test(msg)) {
	            return;
	        }

	        // Fire away!
	        send(
	            objectMerge({
	                message: msg + ''  // Make sure it's actually a string
	            }, options)
	        );

	        return Raven;
	    },

	    addPlugin: function(plugin) {
	        plugins.push(plugin);
	        if (isRavenInstalled) plugin();
	        return Raven;
	    },

	    /*
	     * Set/clear a user to be sent along with the payload.
	     *
	     * @param {object} user An object representing user data [optional]
	     * @return {Raven}
	     */
	    setUserContext: function(user) {
	        // Intentionally do not merge here since that's an unexpected behavior.
	        globalContext.user = user;

	        return Raven;
	    },

	    /*
	     * Merge extra attributes to be sent along with the payload.
	     *
	     * @param {object} extra An object representing extra data [optional]
	     * @return {Raven}
	     */
	    setExtraContext: function(extra) {
	        mergeContext('extra', extra);

	        return Raven;
	    },

	    /*
	     * Merge tags to be sent along with the payload.
	     *
	     * @param {object} tags An object representing tags [optional]
	     * @return {Raven}
	     */
	    setTagsContext: function(tags) {
	        mergeContext('tags', tags);

	        return Raven;
	    },

	    /*
	     * Clear all of the context.
	     *
	     * @return {Raven}
	     */
	    clearContext: function() {
	        globalContext = {};

	        return Raven;
	    },

	    /*
	     * Get a copy of the current context. This cannot be mutated.
	     *
	     * @return {object} copy of context
	     */
	    getContext: function() {
	        // lol javascript
	        return JSON.parse(JSON.stringify(globalContext));
	    },

	    /*
	     * Set release version of application
	     *
	     * @param {string} release Typically something like a git SHA to identify version
	     * @return {Raven}
	     */
	    setRelease: function(release) {
	        globalOptions.release = release;

	        return Raven;
	    },

	    /*
	     * Set the dataCallback option
	     *
	     * @param {function} callback The callback to run which allows the
	     *                            data blob to be mutated before sending
	     * @return {Raven}
	     */
	    setDataCallback: function(callback) {
	        globalOptions.dataCallback = callback;

	        return Raven;
	    },

	    /*
	     * Set the shouldSendCallback option
	     *
	     * @param {function} callback The callback to run which allows
	     *                            introspecting the blob before sending
	     * @return {Raven}
	     */
	    setShouldSendCallback: function(callback) {
	        globalOptions.shouldSendCallback = callback;

	        return Raven;
	    },

	    /**
	     * Override the default HTTP transport mechanism that transmits data
	     * to the Sentry server.
	     *
	     * @param {function} transport Function invoked instead of the default
	     *                             `makeRequest` handler.
	     *
	     * @return {Raven}
	     */
	    setTransport: function(transport) {
	        globalOptions.transport = transport;

	        return Raven;
	    },

	    /*
	     * Get the latest raw exception that was captured by Raven.
	     *
	     * @return {error}
	     */
	    lastException: function() {
	        return lastCapturedException;
	    },

	    /*
	     * Get the last event id
	     *
	     * @return {string}
	     */
	    lastEventId: function() {
	        return lastEventId;
	    },

	    /*
	     * Determine if Raven is setup and ready to go.
	     *
	     * @return {boolean}
	     */
	    isSetup: function() {
	        return isSetup();
	    }
	};

	// Deprecations
	Raven.setUser = Raven.setUserContext;
	Raven.setReleaseContext = Raven.setRelease;

	function triggerEvent(eventType, options) {
	    // NOTE: `event` is a native browser thing, so let's avoid conflicting wiht it
	    var evt, key;

	    if (!hasDocument)
	        return;

	    options = options || {};

	    eventType = 'raven' + eventType.substr(0,1).toUpperCase() + eventType.substr(1);

	    if (document.createEvent) {
	        evt = document.createEvent('HTMLEvents');
	        evt.initEvent(eventType, true, true);
	    } else {
	        evt = document.createEventObject();
	        evt.eventType = eventType;
	    }

	    for (key in options) if (hasKey(options, key)) {
	        evt[key] = options[key];
	    }

	    if (document.createEvent) {
	        // IE9 if standards
	        document.dispatchEvent(evt);
	    } else {
	        // IE8 regardless of Quirks or Standards
	        // IE9 if quirks
	        try {
	            document.fireEvent('on' + evt.eventType.toLowerCase(), evt);
	        } catch(e) {}
	    }
	}

	var dsnKeys = 'source protocol user pass host port path'.split(' '),
	    dsnPattern = /^(?:(\w+):)?\/\/(?:(\w+)(:\w+)?@)?([\w\.-]+)(?::(\d+))?(\/.*)/;

	function RavenConfigError(message) {
	    this.name = 'RavenConfigError';
	    this.message = message;
	}
	RavenConfigError.prototype = new Error();
	RavenConfigError.prototype.constructor = RavenConfigError;

	/**** Private functions ****/
	function parseDSN(str) {
	    var m = dsnPattern.exec(str),
	        dsn = {},
	        i = 7;

	    try {
	        while (i--) dsn[dsnKeys[i]] = m[i] || '';
	    } catch(e) {
	        throw new RavenConfigError('Invalid DSN: ' + str);
	    }

	    if (dsn.pass)
	        throw new RavenConfigError('Do not specify your private key in the DSN!');

	    return dsn;
	}

	function isUndefined(what) {
	    return what === void 0;
	}

	function isFunction(what) {
	    return typeof what === 'function';
	}

	function isString(what) {
	    return objectPrototype.toString.call(what) === '[object String]';
	}

	function isObject(what) {
	    return typeof what === 'object' && what !== null;
	}

	function isEmptyObject(what) {
	    for (var k in what) return false;
	    return true;
	}

	// Sorta yanked from https://github.com/joyent/node/blob/aa3b4b4/lib/util.js#L560
	// with some tiny modifications
	function isError(what) {
	    return isObject(what) &&
	        objectPrototype.toString.call(what) === '[object Error]' ||
	        what instanceof Error;
	}

	/**
	 * hasKey, a better form of hasOwnProperty
	 * Example: hasKey(MainHostObject, property) === true/false
	 *
	 * @param {Object} host object to check property
	 * @param {string} key to check
	 */
	function hasKey(object, key) {
	    return objectPrototype.hasOwnProperty.call(object, key);
	}

	function each(obj, callback) {
	    var i, j;

	    if (isUndefined(obj.length)) {
	        for (i in obj) {
	            if (hasKey(obj, i)) {
	                callback.call(null, i, obj[i]);
	            }
	        }
	    } else {
	        j = obj.length;
	        if (j) {
	            for (i = 0; i < j; i++) {
	                callback.call(null, i, obj[i]);
	            }
	        }
	    }
	}

	function handleStackInfo(stackInfo, options) {
	    var frames = [];

	    if (stackInfo.stack && stackInfo.stack.length) {
	        each(stackInfo.stack, function(i, stack) {
	            var frame = normalizeFrame(stack);
	            if (frame) {
	                frames.push(frame);
	            }
	        });
	    }

	    triggerEvent('handle', {
	        stackInfo: stackInfo,
	        options: options
	    });

	    processException(
	        stackInfo.name,
	        stackInfo.message,
	        stackInfo.url,
	        stackInfo.lineno,
	        frames,
	        options
	    );
	}

	function normalizeFrame(frame) {
	    if (!frame.url) return;

	    // normalize the frames data
	    var normalized = {
	        filename:   frame.url,
	        lineno:     frame.line,
	        colno:      frame.column,
	        'function': frame.func || '?'
	    }, context = extractContextFromFrame(frame), i;

	    if (context) {
	        var keys = ['pre_context', 'context_line', 'post_context'];
	        i = 3;
	        while (i--) normalized[keys[i]] = context[i];
	    }

	    normalized.in_app = !( // determine if an exception came from outside of our app
	        // first we check the global includePaths list.
	        (!!globalOptions.includePaths.test && !globalOptions.includePaths.test(normalized.filename)) ||
	        // Now we check for fun, if the function name is Raven or TraceKit
	        /(Raven|TraceKit)\./.test(normalized['function']) ||
	        // finally, we do a last ditch effort and check for raven.min.js
	        /raven\.(min\.)?js$/.test(normalized.filename)
	    );

	    return normalized;
	}

	function extractContextFromFrame(frame) {
	    // immediately check if we should even attempt to parse a context
	    if (!frame.context || !globalOptions.fetchContext) return;

	    var context = frame.context,
	        pivot = ~~(context.length / 2),
	        i = context.length, isMinified = false;

	    while (i--) {
	        // We're making a guess to see if the source is minified or not.
	        // To do that, we make the assumption if *any* of the lines passed
	        // in are greater than 300 characters long, we bail.
	        // Sentry will see that there isn't a context
	        if (context[i].length > 300) {
	            isMinified = true;
	            break;
	        }
	    }

	    if (isMinified) {
	        // The source is minified and we don't know which column. Fuck it.
	        if (isUndefined(frame.column)) return;

	        // If the source is minified and has a frame column
	        // we take a chunk of the offending line to hopefully shed some light
	        return [
	            [],  // no pre_context
	            context[pivot].substr(frame.column, 50), // grab 50 characters, starting at the offending column
	            []   // no post_context
	        ];
	    }

	    return [
	        context.slice(0, pivot),    // pre_context
	        context[pivot],             // context_line
	        context.slice(pivot + 1)    // post_context
	    ];
	}

	function processException(type, message, fileurl, lineno, frames, options) {
	    var stacktrace, i, fullMessage;

	    if (!!globalOptions.ignoreErrors.test && globalOptions.ignoreErrors.test(message)) return;

	    message += '';
	    fullMessage = type + ': ' + message;

	    if (frames && frames.length) {
	        fileurl = frames[0].filename || fileurl;
	        // Sentry expects frames oldest to newest
	        // and JS sends them as newest to oldest
	        frames.reverse();
	        stacktrace = {frames: frames};
	    } else if (fileurl) {
	        stacktrace = {
	            frames: [{
	                filename: fileurl,
	                lineno: lineno,
	                in_app: true
	            }]
	        };
	    }

	    if (!!globalOptions.ignoreUrls.test && globalOptions.ignoreUrls.test(fileurl)) return;
	    if (!!globalOptions.whitelistUrls.test && !globalOptions.whitelistUrls.test(fileurl)) return;

	    // Fire away!
	    send(
	        objectMerge({
	            // sentry.interfaces.Exception
	            exception: {
	                values: [{
	                    type: type,
	                    value: message,
	                    stacktrace: stacktrace
	                }]
	            },
	            culprit: fileurl,
	            message: fullMessage
	        }, options)
	    );
	}

	function objectMerge(obj1, obj2) {
	    if (!obj2) {
	        return obj1;
	    }
	    each(obj2, function(key, value){
	        obj1[key] = value;
	    });
	    return obj1;
	}

	function truncate(str, max) {
	    return str.length <= max ? str : str.substr(0, max) + '\u2026';
	}

	function trimPacket(data) {
	    // For now, we only want to truncate the two different messages
	    // but this could/should be expanded to just trim everything
	    var max = globalOptions.maxMessageLength;
	    data.message = truncate(data.message, max);
	    if (data.exception) {
	        var exception = data.exception.values[0];
	        exception.value = truncate(exception.value, max);
	    }

	    return data;
	}

	function now() {
	    return +new Date();
	}

	function getHttpData() {
	    if (!hasDocument || !document.location || !document.location.href) {
	        return;
	    }

	    var httpData = {
	        headers: {
	            'User-Agent': navigator.userAgent
	        }
	    };

	    httpData.url = document.location.href;

	    if (document.referrer) {
	        httpData.headers.Referer = document.referrer;
	    }

	    return httpData;
	}

	function send(data) {
	    var baseData = {
	        project: globalProject,
	        logger: globalOptions.logger,
	        platform: 'javascript'
	    }, httpData = getHttpData();

	    if (httpData) {
	        baseData.request = httpData;
	    }

	    data = objectMerge(baseData, data);

	    // Merge in the tags and extra separately since objectMerge doesn't handle a deep merge
	    data.tags = objectMerge(objectMerge({}, globalContext.tags), data.tags);
	    data.extra = objectMerge(objectMerge({}, globalContext.extra), data.extra);

	    // Send along our own collected metadata with extra
	    data.extra['session:duration'] = now() - startTime;

	    // If there are no tags/extra, strip the key from the payload alltogther.
	    if (isEmptyObject(data.tags)) delete data.tags;

	    if (globalContext.user) {
	        // sentry.interfaces.User
	        data.user = globalContext.user;
	    }

	    // Include the release if it's defined in globalOptions
	    if (globalOptions.release) data.release = globalOptions.release;
	    // Include server_name if it's defined in globalOptions
	    if (globalOptions.serverName) data.server_name = globalOptions.serverName;

	    if (isFunction(globalOptions.dataCallback)) {
	        data = globalOptions.dataCallback(data) || data;
	    }

	    // Why??????????
	    if (!data || isEmptyObject(data)) {
	        return;
	    }

	    // Check if the request should be filtered or not
	    if (isFunction(globalOptions.shouldSendCallback) && !globalOptions.shouldSendCallback(data)) {
	        return;
	    }

	    // Send along an event_id if not explicitly passed.
	    // This event_id can be used to reference the error within Sentry itself.
	    // Set lastEventId after we know the error should actually be sent
	    lastEventId = data.event_id || (data.event_id = uuid4());

	    // Try and clean up the packet before sending by truncating long values
	    data = trimPacket(data);

	    logDebug('debug', 'Raven about to send:', data);

	    if (!isSetup()) return;

	    (globalOptions.transport || makeRequest)({
	        url: globalServer,
	        auth: {
	            sentry_version: '7',
	            sentry_client: 'raven-js/' + Raven.VERSION,
	            sentry_key: globalKey
	        },
	        data: data,
	        options: globalOptions,
	        onSuccess: function success() {
	            triggerEvent('success', {
	                data: data,
	                src: globalServer
	            });
	        },
	        onError: function failure() {
	            triggerEvent('failure', {
	                data: data,
	                src: globalServer
	            });
	        }
	    });
	}

	function makeRequest(opts) {
	    // Tack on sentry_data to auth options, which get urlencoded
	    opts.auth.sentry_data = JSON.stringify(opts.data);

	    var img = newImage(),
	        src = opts.url + '?' + urlencode(opts.auth),
	        crossOrigin = opts.options.crossOrigin;

	    if (crossOrigin || crossOrigin === '') {
	        img.crossOrigin = crossOrigin;
	    }
	    img.onload = opts.onSuccess;
	    img.onerror = img.onabort = opts.onError;
	    img.src = src;
	}

	// Note: this is shitty, but I can't figure out how to get
	// sinon to stub document.createElement without breaking everything
	// so this wrapper is just so I can stub it for tests.
	function newImage() {
	    return document.createElement('img');
	}

	var ravenNotConfiguredError;

	function isSetup() {
	    if (!hasJSON) return false;  // needs JSON support
	    if (!globalServer) {
	        if (!ravenNotConfiguredError)
	          logDebug('error', 'Error: Raven has not been configured.');
	        ravenNotConfiguredError = true;
	        return false;
	    }
	    return true;
	}

	function joinRegExp(patterns) {
	    // Combine an array of regular expressions and strings into one large regexp
	    // Be mad.
	    var sources = [],
	        i = 0, len = patterns.length,
	        pattern;

	    for (; i < len; i++) {
	        pattern = patterns[i];
	        if (isString(pattern)) {
	            // If it's a string, we need to escape it
	            // Taken from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
	            sources.push(pattern.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"));
	        } else if (pattern && pattern.source) {
	            // If it's a regexp already, we want to extract the source
	            sources.push(pattern.source);
	        }
	        // Intentionally skip other cases
	    }
	    return new RegExp(sources.join('|'), 'i');
	}

	function uuid4() {
	    var crypto = window.crypto || window.msCrypto;

	    if (!isUndefined(crypto) && crypto.getRandomValues) {
	        // Use window.crypto API if available
	        var arr = new Uint16Array(8);
	        crypto.getRandomValues(arr);

	        // set 4 in byte 7
	        arr[3] = arr[3] & 0xFFF | 0x4000;
	        // set 2 most significant bits of byte 9 to '10'
	        arr[4] = arr[4] & 0x3FFF | 0x8000;

	        var pad = function(num) {
	            var v = num.toString(16);
	            while (v.length < 4) {
	                v = '0' + v;
	            }
	            return v;
	        };

	        return (pad(arr[0]) + pad(arr[1]) + pad(arr[2]) + pad(arr[3]) + pad(arr[4]) +
	        pad(arr[5]) + pad(arr[6]) + pad(arr[7]));
	    } else {
	        // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
	        return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	            var r = Math.random()*16|0,
	                v = c == 'x' ? r : (r&0x3|0x8);
	            return v.toString(16);
	        });
	    }
	}

	function logDebug(level) {
	    if (originalConsoleMethods[level] && Raven.debug) {
	        // _slice is coming from vendor/TraceKit/tracekit.js
	        // so it's accessible globally
	        originalConsoleMethods[level].apply(originalConsole, _slice.call(arguments, 1));
	    }
	}

	function afterLoad() {
	    // Attempt to initialize Raven on load
	    var RavenConfig = window.RavenConfig;
	    if (RavenConfig) {
	        Raven.config(RavenConfig.dsn, RavenConfig.config).install();
	    }
	}

	function urlencode(o) {
	    var pairs = [];
	    each(o, function(key, value) {
	        pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
	    });
	    return pairs.join('&');
	}

	function mergeContext(key, context) {
	    if (isUndefined(context)) {
	        delete globalContext[key];
	    } else {
	        globalContext[key] = objectMerge(globalContext[key] || {}, context);
	    }
	}

	afterLoad();

	// This is being exposed no matter what because there are too many weird
	// usecases for how people use Raven. If this is really a problem, I'm sorry.
	window.Raven = Raven;

	// Expose Raven to the world
	if (true) {
	    // AMD
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return Raven;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof module === 'object') {
	    // browserify
	    module.exports = Raven;
	} else if (typeof exports === 'object') {
	    // CommonJS
	    exports = Raven;
	}

	})(typeof window !== 'undefined' ? window : this);


/***/ },

/***/ 214:
/***/ function(module, exports) {

	var LocalChanges = Backbone.Model.extend({
	    /**
	     * Functions:
	     * add an unsynced change
	     * check for conflicts - this will show a modal even if a single server change has a conflict. if not, callback
	     */

	    defaults: function() {
	        return {
	            syncEnabled: true
	        }
	    },

	    initialize: function() {
	        pm.mediator.on("setSync", this.setSync, this);
	        this.currentUnsynced = [];

	        this.serverChangesReadyToBeSaved = [];

	        pm.mediator.on("addUnsyncedChange", this.onAddUnsyncedChange, this);
	        pm.mediator.on("resolveConflicts", this.onResolveConflicts, this);
	        pm.mediator.on("singleUnsyncedChangeSynced", this.onUnsyncedChangeSynced, this);
	        pm.mediator.on("beginUnsyncedStream", this.onBeginStream, this);

	        pm.mediator.on("conflictsResolved", this.onConflictsResolved, this);
	        pm.mediator.on("commitTransaction", this.onCommitTransaction, this);
	        pm.mediator.on("singleClientChangeSent", this.onSingleClientChangeSent, this);
	        pm.mediator.on("deleteSyncedData", this.deleteSyncedData, this);
	        pm.mediator.on("deleteUnsyncedData", this.onDeleteUnsyncedData, this);
	        pm.mediator.on("syncAllObjects", this.syncAllObjects, this);
	        pm.mediator.on("syncAllRequestsFix", this.syncAllRequestsFix, this);
	        this.syncEnabled = this.get("syncEnabled");
	        this.loadUnsyncedChanges();
	    },

	    setSync: function(syncEnabled) {
	        this.syncEnabled = syncEnabled;
	    },

	    onDeleteUnsyncedData: function() {
	        pm.indexedDB.clearUnsyncedChanges();
	        this.currentUnsynced = [];
	    },


	    deleteSyncedData: function() {
	        //delete all unsynced changes -
	        pm.indexedDB.clearUnsyncedChanges();
	        this.currentUnsynced = [];

	        //clear all synced changes
	        //all collections, envs, requests, responses, systemValues
	        pm.indexedDB.deleteAllCollections(function() {
	            pm.collections.reset();
	        });

	        pm.indexedDB.deleteEachCollectionRequest();

	        pm.indexedDB.environments.deleteAllEnvironments(function() {
	            pm.environments.reset();
	        });
	        pm.indexedDB.deleteAllHistoryRequests(function() {
	            pm.history.reset();
	        });

	        pm.indexedDB.subscriptions.deleteAllSubscriptions(function() {
	            pm.subscriptionManger.clearSubscriptions();
	        });

	        pm.indexedDB.headerPresets.deleteAllHeaderPresets(function() {
	            pm.headerPresets.reset()
	        });

	        pm.indexedDB.testRuns.deleteAllTestRuns(function() {
	            var message = {
	                "id": "test_runner",
	                "event": "allRunsDeleted",
	                "object": {}
	            };

	            pm.appWindow.sendMessageWrapper(message);
	        });

	        pm.indexedDB.tabs.deleteAllTabs();

	        //delete globals
	        var blankGlobals = {
	            'globals': JSON.stringify([])
	        };
	        pm.storage.setValue(blankGlobals, function() {
	            pm.globals.set({
	                "globals": []
	            });
	            pm.appWindow.trigger("sendMessageObject", "updatedGlobals", []);
	        });

	        pm.indexedDB.deleteAllSince(function() {});

	        pm.indexedDB.updateLastSynced(1, function() {});

	        pm.syncManager.retrySentChangesInterval = null;

	        pm.mediator.trigger("clearSystemValues");
	    },

	    //load unsynced changes from DB
	    loadUnsyncedChanges: function() {
	        if (!this.syncEnabled) return;
	        var oldThis = this;
	        pm.syncLogger.log(new Error(), "Loading unsynced changes from DB...");
	        pm.indexedDB.getUnsyncedChanges(function(changes) {
	            pm.syncLogger.log(new Error(), "DB returned " + changes.length + " unsynced changes.");
	            oldThis.currentUnsynced = changes;
	        });
	    },

	    onBeginStream: function(realtime, stream, deleteFirstChange, forceAllChanges) {
	        pm.syncManager.inBulkOperation = true;
	        this.onUnsyncedChangeSynced(null, realtime, stream, deleteFirstChange, forceAllChanges);
	    },

	    /**
	     * Is triggered when the server responds to a request. If the request came from the unsynced queue, the next one must be triggered
	     * unsyncedKey is the change that triggered this
	     * realtime=true if the change DID NOT come from the unsynced queue
	     * stream is the stream of the change that triggered this
	     */
	    onUnsyncedChangeSynced: function(unsyncedKey, realtime, stream, deleteFirstChange, forceAllChanges) {
	        if (typeof deleteFirstChange === "undefined") {
	            deleteFirstChange = true;
	        }

	        if (typeof forceAllChanges === "undefined") {
	            forceAllChanges = false;
	        }

	        //res is the change that caused this

	        //if this is true, set clearChange = true for all changes
	        pm.syncManager.forceAllChanges = forceAllChanges;
	        setTimeout(function() {
	            pm.syncManager.forceAllChanges = false;
	        }, 200000);

	        var oldThis = this;

	        if (realtime === true) {
	            //do not delete the change - nothing to be deleted
	        } else {
	            var currentUnsynced = this.currentUnsynced;
	            var idxToRemove = -1;
	            var isChangesetForStream = false;

	            if (!currentUnsynced || currentUnsynced.length == 0) {
	                pm.syncManager.forceAllChanges = false;
	                pm.syncManager.sendingAllClientData = false;
	                pm.syncManager.inBulkOperation = false;
	                pm.syncManager.trigger("syncFinished");

	                if (pm.syncManager.doIntegrityCheck) {
	                    setTimeout(function() {
	                        pm.syncManager.startIntegrityCheck();
	                        pm.syncManager.doIntegrityCheck = false;
	                    }, 500);
	                }
	                //nothing else do do. Nothing in unsynced changes
	                pm.mediator.trigger("syncClientChanges", currentUnsynced, null);
	                return;

	            }

	            if (deleteFirstChange) {
	                var changeToDelete = null;

	                //get index (in the currentUnsynced array) of the change to be deleted
	                for (var i = 0; i < currentUnsynced.length; i++) {
	                    if ((!unsyncedKey || currentUnsynced[i].id == unsyncedKey)) {
	                        idxToRemove = i;
	                        isChangesetForStream = true;
	                        break;
	                    }
	                }
	                if (idxToRemove !== -1) {
	                    changeToDelete = currentUnsynced[idxToRemove];
	                    oldThis.deleteUnsyncedChange(changeToDelete.id);
	                    currentUnsynced = this.currentUnsynced;
	                }

	                if (currentUnsynced.length == 0) {
	                    pm.syncManager.forceAllChanges = false;
	                    pm.syncManager.sendingAllClientData = false;
	                    pm.syncManager.inBulkOperation = false;
	                    pm.syncManager.trigger("syncFinished");
	                }

	                oldThis.currentUnsynced = currentUnsynced;
	                pm.mediator.trigger("syncClientChanges", currentUnsynced, stream);
	            } else {
	                pm.mediator.trigger("syncClientChanges", currentUnsynced, stream);
	            }
	        }
	    },

	    //This is called when all changesets of a collection have been added - not commited when offline
	    onCommitTransaction: function(stream) {
	        if (!this.syncEnabled) return;

	        //if a stream is already being processed
	        if (pm.syncManager.inBulkOperation) return;


	        if (pm.syncManager.get("loggedIn") === true && pm.syncManager.get("allClientChangesSynced") === true) {
	            //console.log(pm.syncLogger.getLogDate() + " - " +"Committing...");
	            pm.syncManager.inBulkOperation = true;
	            pm.mediator.trigger("syncClientChanges", this.currentUnsynced, stream);
	        }
	    },

	    getUnsyncedChangeId: function(entity, verb, data, meta) {
	        var entityKey;
	        var stream;

	        //for transfer changes, there won't be any data. The meta field will hold the request's id
	        if (verb === "transfer" || verb === "unsubscribe") {
	            entityKey = entity + ":" + meta;
	            stream = meta;
	        } else {
	            if (!data.id && verb === "subscribe") {
	                data.id = data.collectionId;
	            }
	            entityKey = entity + ":" + data.id;
	            stream = data.id;
	        }

	        if (verb === "history") {
	            stream = null;
	        }

	        //user's don't need an ID - it's determined by the socket on the server side
	        if (entity === "user") {
	            entityKey = "user:NOID";
	            stream = null;
	        }

	        if (verb === "transfer") {
	            entityKey += ":transfer";
	            data["id"] = meta;
	            stream = meta;
	        }

	        if (verb === "unsubscribe") {
	            entityKey += ":unsubscribe";
	            data["id"] = meta;
	            stream = meta;
	        }

	        if (verb === "importCollection" || verb==="importFolder") {
	            entityKey += ":import";
	            //stream += ":import";
	        }

	        if (!stream && data.collectionId) {
	            stream = data.collectionId;
	        }

	        return {
	            stream: stream,
	            entityKey: entityKey
	        };
	    },

	    /**
		* @description Called when the syncManager is not connected to the socket, and the change must be saved locally
		* @param entity
		* @param verb
		* @param data
		* @param meta
		* @param addToTop - if explicitly true, the new change is added to the top of the queue
		*/
	    onAddUnsyncedChange: function(entity, verb, data, meta, sentOnce, addToTop) {
	        if (typeof addToTop === "undefined") {
	            addToTop = false;
	        }
	        var timestamp = (new Date().getTime());
	        var entityKey = this.getUnsyncedChangeId(entity, verb, data, meta).entityKey;
	        var currentUnsynced = this.currentUnsynced;
	        var oldThis = this;

	        if (verb === "transfer") {
	            data["id"] = meta;
	        }
	        if (verb === "unsubscribe") {
	            data["id"] = meta;
	        }

	        var changeset = {
	            id: entityKey,
	            entity: entity,
	            verb: verb,
	            data: data,
	            timestamp: timestamp,
	            sentOnce: sentOnce
	        };


	        var mergeChanges = true;

	        if (verb == "transfer" && this._checkForTransferAfterCreate(entityKey, data) == -2) {
	            pm.syncLogger.log(new Error(), "Transfer merged with create...no further action required");
	            return;
	        }

	        if (verb == "destroy" && this._checkForDeleteAfterTransfer(entityKey, data) == -2) {
	            pm.syncLogger.log(new Error(), "Delete after transfer. Transfer change deleted...the delete change will be added now");
	        }

	        var changeIndex = this._findIndex(currentUnsynced, function(change) {
	            return (change != undefined && change.id === entityKey)
	        });


	        //no change with same entityId
	        if (changeIndex == -1) {
	            var unsyncedChange = changeset;
	            currentUnsynced.push(unsyncedChange);
	            pm.indexedDB.addUnsyncedChange(unsyncedChange, function() {
	            });
	            oldThis.currentUnsynced = currentUnsynced;
	        } else {
	            //go through the data properties of the existing changeset and merge data
	            var currentObj = currentUnsynced[changeIndex];
	            var newVerb = this._getNewVerbAndResolveConflicts(verb, currentObj.verb, entityKey, currentUnsynced, currentObj, changeset);
	            if (newVerb == -1) {
	                pm.syncLogger.log(new Error(), "Changeset deleted");
	                return;
	            }
	            _.extend(currentObj.data, changeset.data);

	            currentObj.verb = newVerb;
	            currentUnsynced[changeIndex] = currentObj;
	            changeset.data = currentObj.data;
	            changeset.verb = currentObj.verb;
	            changeset.sentOnce = currentObj.sentOnce || sentOnce;

	            if (sentOnce) {
	                pm.syncLogger.error("Failed Unsynced changed READDED");
	                //this change was already sent once and failed
	                var userId = pm.user.id;
	                var version = pm.getVersion();
	                pm.api.sendUnsyncedChanges(userId, version, JSON.stringify(changeset), function() {
	                    console.log("Failed unsyncedchange sent to godserver");
	                });
	            }

	            var unsyncedChange = changeset;
	            pm.indexedDB.updateUnsyncedChange(unsyncedChange, function() {
	            });
	            oldThis.currentUnsynced = currentUnsynced;
	        }
	    },

	    _checkForTransferAfterCreate: function(entityKey, data) {
	        var parts = entityKey.split(":");
	        var currentUnsynced = this.currentUnsynced;
	        var oldThis = this;
	        parts.pop();
	        var oldKey = parts.join(":");
	        var changeIndex = this._findIndex(currentUnsynced, function(change) {
	            return (change != undefined && change.verb == "create" && change.id === oldKey)
	        });

	        if (changeIndex !== -1) {
	            var createChange = currentUnsynced[changeIndex];
	            //copy the transfer object into the create object
	            var transferObject = {};
	            var newTimestamp = (new Date().getTime());
	            if (data.to.model == "collection") {
	                transferObject["collection"] = data.to.model_id;
	                transferObject["folder"] = null;
	            } else if (data.to.model == "folder") {
	                transferObject["folder"] = data.to.model_id;
	            } else {
	                pm.syncLogger.error("Fatal Error: has to transfer to a collection or folder. Tried to transfer to: " + data.to.model);
	            }
	            _.extend(createChange.data, transferObject);
	            var changeset = {
	                id: oldKey,
	                entity: "request",
	                verb: "create",
	                data: createChange.data,
	                timestamp: newTimestamp
	            };

	            oldThis._updateUnsyncedChange(createChange.id, changeset);
	            return -2;
	        }
	    },

	    _checkForDeleteAfterTransfer: function(entityKey, data) {
	        var oldKey = entityKey + ":transfer";
	        var currentUnsynced = this.currentUnsynced;
	        var oldThis = this;

	        var changeIndex = this._findIndex(currentUnsynced, function(change) {
	            return (change != undefined && change.verb == "transfer" && change.id === oldKey)
	        });
	        if (changeIndex != -1) {
	            var transferChange = currentUnsynced[changeIndex];
	            //copy the transfer object into the create object
	            this.deleteUnsyncedChange(oldKey);
	            //-2 means the transfer request was deleted
	            return -2;
	        }
	    },

	    getUnsyncedChangesetIdsForCollection: function(cid) {
	        return _.map(pm.localChanges.currentUnsynced, function(changeset) {
	            if(changeset.data &&
	                (changeset.data.collection==cid || changeset.data.collectionId==cid)
	            ) {
	                return changeset.id
	            }
	        });
	    },

	    getUnsyncedChangesetIdsForFolder: function(fid) {
	        return _.map(pm.localChanges.currentUnsynced, function(changeset) {
	            if(changeset.data &&
	                (changeset.data.folder==fid ||
	                changeset.data.folderId==fid)
	            ) {
	                return changeset.id
	            }
	        });
	    },

	    deleteChangesForCollection: function(cid) {
	        var changes = this.getUnsyncedChangesetIdsForCollection(cid);
	        var oldThis = this;
	        _.each(changes, function(changeId) {
	            oldThis.deleteUnsyncedChange(changeId);
	        });
	    },

	    deleteChangesForFolder: function(fid) {
	        var changes = this.getUnsyncedChangesetIdsForFolder(fid);
	        var oldThis = this;
	        _.each(changes, function(changeId) {
	            oldThis.deleteUnsyncedChange(changeId);
	        });
	    },

	    _findIndex: function(arr, cond) {
	        var i, x;
	        var len = arr.length;
	        for (var i = 0; i < len; i++) {
	            x = arr[i];
	            if (cond(x)) return parseInt(i);
	        }
	        return -1;
	    },

	    _getNewVerbAndResolveConflicts: function(newVerb, oldVerb, id, currentUnsynced, changeset, newObject) {
	        //created/updated/destroyed
	        var oldThis = this;
	        if (newVerb === "create") {
	            return "create";
	        }
	        if (newVerb === "destroy") {
	            if (oldVerb === "create") {
	                //The old entry SHOULD BE REMOVED FROM UNSYNCED TABLE
	                //new entry should be discarded
	                this.deleteUnsyncedChange(id);

	                //if there are entries in the unsynced change table with the same folderId or collectionId as id, they should be deleted too
	                var actualId = (id.indexOf(":") === -1) ? id : id.split(":")[1];
	                if (changeset.entity === "collection") //or model
	                {
	                    for (var i = 0; i < currentUnsynced.length; i++) {
	                        if (currentUnsynced[i].data.collection === actualId) {
	                            this.deleteUnsyncedChange(currentUnsynced[i].id);
	                            currentUnsynced = pm.localChanges.currentUnsynced;
	                            i--;
	                        }
	                    }
	                } else if (changeset.entity === "folder") //or model
	                {
	                    for (var i = 0; i < currentUnsynced.length; i++) {
	                        if (currentUnsynced[i].data.folder === actualId) {
	                            this.deleteUnsyncedChange(currentUnsynced[i].id);
	                            currentUnsynced = pm.localChanges.currentUnsynced;
	                            i--;
	                        }
	                    }
	                }

	                return -1;
	            }
	            if (oldVerb === "update" || oldVerb === "transfer") {
	                return newVerb;
	            }
	        }
	        if (newVerb === "update") {
	            if (oldVerb === "create") {
	                return "create";
	            }
	            if (oldVerb === "update") {
	                return "update";
	            }
	            if (oldVerb === "destroy") {
	                pm.syncLogger.error("Fatal Error: Cannot update deleted object");
	                return;
	            }
	        }
	        if (newVerb === "transfer") {
	            if (oldVerb !== "transfer") {
	                pm.syncLogger.error("FATAL error - One transfer, and one create/update entry cannot have the same id");
	                return;
	            }
	            return newVerb;
	        }
	    },

	    /**
	     * Called when server changes are queued, and have to be conflict-resolved with current unsynced changes
	     */
	    onResolveConflicts: function(serverChanges) {
	        if (!this.syncEnabled) return;

	        //here, server queue represents all server changes
	        //for each change, add it to an array, setting conflict=true if there is a conflict
	        if (serverChanges.length === 0) {
	            //no more server changes to process
	            pm.mediator.trigger("syncClientChanges", this.currentUnsynced, null);
	            return;
	        }

	        var anyConflict = false;
	        var firstChange;
	        while (serverChanges.length !== 0 && (firstChange = serverChanges.shift())) {
	            pm.syncLogger.log(new Error(), "Server change to process: ");
	            pm.syncLogger.log(new Error(), firstChange);


	            if (firstChange.meta.model === "user") {
	                firstChange.model_id = "NOID";
	            }
	            var changesetId = firstChange.meta.model + ":" + firstChange.model_id;
	            if (firstChange.meta.action === "transfer") {
	                changesetId += ":transfer";
	            }



	            if(firstChange.meta.action==="create" && firstChange.meta.model==="collection") {
	                var numUnsynced = this.currentUnsynced.length;
	                for(var i=0;i<numUnsynced;i++) {
	                    var cc = this.currentUnsynced[i];
	                    if(cc && cc.verb==="importCollection" && cc.data.id===firstChange.model_id) {
	                        pm.syncManager.addCollectionsToForceSync(cc.data.id);
	                        this.deleteUnsyncedChange(this.currentUnsynced[i].id);
	                        numUnsynced--;
	                        i--;
	                    }
	                }
	            }


	            //check for conflicts
	            var conflictingChange = this._findConflictingLocalChange(changesetId);

	            if(conflictingChange) {
	                /* -- FOR POSTMAN DEMO COLLECTION CONFLICTS, DELETE LOCAL CHANGES AND DON'T SHOW CONFLICTS--*/

	                if((postman_predef_collections.indexOf(conflictingChange.data.collection) !== -1)) { //for conflicts in the folders, requests, or responses
	                    this.deleteUnsyncedChange(conflictingChange.id);
	                    this.deleteChangesForCollection(conflictingChange.data.collection);
	                    pm.collections.deleteCollectionFromDataStoreWithOptSync(conflictingChange.data.collection, false, false, function() {});
	                    conflictingChange = null;
	                }

	                else if((postman_predef_collections.indexOf(conflictingChange.data.id) !== -1)) { //for conflicts in the collection itself
	                    this.deleteUnsyncedChange(conflictingChange.id);
	                    this.deleteChangesForCollection(conflictingChange.data.id);
	                    pm.collections.deleteCollectionFromDataStoreWithOptSync(conflictingChange.data.id, false, false, function() {});
	                    conflictingChange = null;
	                }
	            }

	            if (conflictingChange === null) {
	                pm.syncLogger.log(new Error(), "No conflict for this server change - adding change to processable changes");
	                this.serverChangesReadyToBeSaved.push(firstChange);
	            } else {
	                var conflictRows = this._getConflictRows(conflictingChange, firstChange);
	                //getConflictRows returns an array of rows to be displayed in the conflict resolver table

	                if (conflictRows !== null && conflictRows.length > 0) {
	                    anyConflict = true;

	                    //make sure there's a row with showRow==true
	                    var rowToShow = false;
	                    for (i = 0; i < conflictRows.length; i++) {
	                        if (conflictRows[i].showRow) {
	                            rowToShow = true;
	                        }
	                    }
	                    if (rowToShow) {
	                        var numRows = this._addConflictRows(conflictRows);
	                    } else {
	                        anyConflict = false;
	                    }
	                }
	            }
	        }

	        //if there is a conflict, saveServerChanges() will be called when the conflicts are resolved
	        if (!anyConflict) {
	            this._saveProcessedServerChange();
	        } else {
	            pm.conflictResolverModal.showModal();
	        }
	    },

	    _findConflictingLocalChange: function(id) {
	        var currentUnsynced = this.currentUnsynced;
	        var numChanges = currentUnsynced.length;
	        for (var i = 0; i < numChanges; i++) {
	            if (currentUnsynced[i].id === id) {
	                return currentUnsynced[i];
	            }
	        }
	        return null;
	    },

	    /**
	    * Given two changes, one local (from unsynced), one remote (from server queue), generates a set of conflict rows
	    * that the user must choose from, and deletes unsynced changes that were used to generate the conflict
	    */
	    _getConflictRows: function(localChange, remoteChange) {
	        //these fields are not filled by the user / are redundant. Don't need to be shown in the conflict screen
	        var fieldsToIgnore = {
	            'response': ['responseCode', 'state', 'headers', 'write', 'requestId', 'collection', 'collectionId', 'collectonId', 'time', 'searchResultScrolledTo', 'forceNoPretty', 'runTests', 'request', 'requestObject'],
	            'request': ['write', 'responses', 'collectionOwner'],
	            'folder': ['write', 'collection_name', 'collection_owner', 'order'],
	            'collection': ['folders', 'subscribed', 'public', 'remote_id', 'remoteLink', 'write', 'shared', 'order'],
	            'environment': ['syncedFilename']
	        };
	        var genericFieldsToIgnore = ['owner', 'timestamp', 'synced', 'createdAt', 'updatedAt', 'time', 'lastRevision', 'lastUpdatedBy', 'version'];

	        pm.syncLogger.log(new Error(), "Getting conflictRow for: localChange=");
	        pm.syncLogger.log(new Error(), localChange);
	        pm.syncLogger.log(new Error(), " and remoteChange=");
	        pm.syncLogger.log(new Error(), remoteChange);

	        var idParts = localChange.id.split(":");
	        var model = idParts[0];
	        var model_id = idParts[1];
	        var localAction; //string
	        var remoteAction; //string

	        if (remoteChange.meta) {
	            remoteChange.action = remoteChange.meta.action;
	            remoteChange.model = remoteChange.meta.model;
	        }

	        var remoteNameOrId = remoteChange.data.name;
	        if (remoteNameOrId == null) {
	            remoteNameOrId = remoteChange.data.id;
	        }

	        var localNameOrId = localChange.data.name;
	        if (localNameOrId == null) {
	            localNameOrId = localChange.data.id;
	        }

	        var ret = [];
	        var ret_template = {};

	        ret_template.localChange = _.cloneDeep(localChange);
	        ret_template.remoteChange = _.cloneDeep(remoteChange);
	        ret_template.model = model;
	        ret_template.model_id = model_id;
	        ret_template.nameOrId = localNameOrId;
	        ret_template.id = model_id;
	        ret_template.conflictId = localChange.id;
	        ret_template.key = "";
	        ret_template.revision = remoteChange.revision;
	        ret_template.showRow = true;

	        if (localChange.verb === "destroy" && remoteChange.action === "destroy") {
	            this.deleteUnsyncedChange(localChange.id);
	            return null;
	        }
	        if (localChange.verb === "create" && remoteChange.action === "create") {
	            //two creates should still be merged
	            localAction = "Created";
	            remoteAction = "Created";
	            var ret_template_temp = _.clone(ret_template);

	            ret_template_temp.localAction = localAction;
	            ret_template_temp.remoteAction = remoteAction;

	            //get changed keys
	            var localUpdates = localChange.data;
	            var subRevision = 0.001;
	            var anyRowConflicting = false;
	            if (!localUpdates.hasOwnProperty("folder") && !localUpdates.hasOwnProperty("folderId") && remoteChange.data.folder) {
	                localUpdates["folder"] = null;
	            }
	            for (var pKey in localUpdates) {
	                if (localUpdates.hasOwnProperty(pKey)) {
	                    ret_template_temp.showRow = true;
	                    if (pKey === "sharedWithTeam") {
	                        pKey = "shared";
	                        localUpdates["shared"] = localUpdates["sharedWithTeam"];
	                    }
	                    if (pKey === "owner" || genericFieldsToIgnore.indexOf(pKey) !== -1) {
	                        ret_template_temp.key = pKey;
	                        ret_template_temp.revision = remoteChange.revision + subRevision;
	                        ret_template_temp.showRow = false;
	                        //ret.push(_.clone(ret_template_temp));
	                    } else if (model === "user" && pKey !== "globals") {
	                        //nothing to do here
	                    } else if (fieldsToIgnore[model] && fieldsToIgnore[model].indexOf(pKey) !== -1) {
	                        //else if(model==="folder" && pKey==="collection") {
	                        ret_template_temp.key = pKey;
	                        ret_template_temp.revision = remoteChange.revision + subRevision;
	                        ret_template_temp.showRow = false;
	                        //ret.push(_.clone(ret_template_temp));
	                    } else if (pKey !== "folder" && ((remoteChange.data[pKey] == "null" && localUpdates[pKey] == null) || (remoteChange.data[pKey] == null && localUpdates[pKey] == "null"))) {
	                        //do nothing
	                    } else if(model === "request" &&
	                        (pKey==="data" && remoteChange.data["dataMode"]==="raw")) {
	                        //data field only matters if dataMode!=raw
	                    } else if(model === "request" &&
	                        (pKey==="rawModeData" && remoteChange.data["dataMode"]!=="raw")) {
	                        //rawModeData field only matters if dataMode==raw
	                    } else if (remoteChange.data.hasOwnProperty(pKey) &&
	                        localUpdates.hasOwnProperty(pKey) &&
	                        JSON.stringify(remoteChange.data[pKey]) !== JSON.stringify(localUpdates[pKey]) &&
	                        !arraysEqual(remoteChange.data[pKey], localUpdates[pKey])) {
	                        anyRowConflicting = true;
	                        ret_template_temp.key = pKey;
	                        var localChangeToShow = localUpdates[pKey];
	                        var remoteChangeToShow = remoteChange.data[pKey];
	                        if (pKey == "data" && remoteChange.data["dataMode"] == "raw") {
	                            //change
	                            localChangeToShow = localUpdates["rawModeData"];
	                            remoteChangeToShow = remoteChangeToShow[0];
	                            remoteChange.data[pKey] = remoteChangeToShow;
	                            localUpdates[pKey] = localChangeToShow;
	                        }
	                        var oldLocalChange = _.cloneDeep(localChangeToShow);
	                        if (typeof localChangeToShow === "object" || remoteChangeToShow instanceof Array) {

	                            localChangeToShow = JSON.stringify(objectDiff(remoteChangeToShow, localChangeToShow)).replace(/":"/g, '": "').replace(/","/g, '", "');
	                        }

	                        if (typeof remoteChangeToShow === "object" || remoteChangeToShow instanceof Array) {
	                            remoteChangeToShow = JSON.stringify(objectDiff(oldLocalChange, remoteChangeToShow)).replace(/":"/g, '": "').replace(/","/g, '", "');
	                        }

	                        ret_template_temp.serverValue = "Set to: " + remoteChangeToShow;
	                        ret_template_temp.localValue = "Set to: " + localChangeToShow;

	                        ret_template_temp.revision = remoteChange.revision + subRevision;
	                        subRevision += 0.001;

	                        //Hack if the key is globals
	                        if (pKey === "globals" && model === "user") {
	                            this._setGlobalConflictMessage(ret_template_temp, JSON.stringify(localUpdates["globals"]), JSON.stringify(remoteChange.data["globals"]));
	                        }

	                        //remove all unnessecary keys from the change
	                        /*for(var key1 in ret_template_temp.localChange.data) {
	                            if(key1!=="id" && key1!==pKey && !(model=="folder" && key1==="collection")) {
	                                delete ret_template_temp.localChange.data[key1];
	                                delete ret_template_temp.remoteChange.data[key1];
	                            }
	                        }*/

	                        ret.push(_.clone(ret_template_temp));
	                    }
	                }
	            }
	            //if there's no row conflicting with this change
	            if (anyRowConflicting === false) {
	                this.deleteUnsyncedChange(localChange.id);
	                return null;
	            }
	        }

	        if (localChange.verb === "update" && remoteChange.action === "update") {
	            localAction = "Updated";
	            remoteAction = "Updated";

	            var localUpdates = _.cloneDeep(localChange.data);

	            var pKeys = [];
	            for (var pKeysIterator in localUpdates) {
	                if (localUpdates.hasOwnProperty(pKeysIterator)) {
	                    pKeys.push(pKeysIterator);
	                }
	            }
	            var numKeys = pKeys.length;

	            //get changed keys

	            var subRevision = 0.001;
	            //for(var pKey in localUpdates) {
	            for (var i = 0; i < numKeys; i++) {
	                var ret_template_temp = _.cloneDeep(ret_template);
	                ret_template_temp.localAction = localAction;
	                ret_template_temp.remoteAction = remoteAction;

	                var pKey = pKeys[i];
	                if (localUpdates.hasOwnProperty(pKey)) {

	                    ret_template_temp.showRow = true;
	                    if (pKey === "owner" || genericFieldsToIgnore.indexOf(pKey) !== -1) {
	                        ret_template_temp.key = pKey;
	                        ret_template_temp.revision = remoteChange.revision + subRevision;
	                        ret_template_temp.showRow = false;
	                        //ret.push(_.clone(ret_template_temp));
	                    } else if (fieldsToIgnore[model] && fieldsToIgnore[model].indexOf(pKey) !== -1) {
	                        ret_template_temp.key = pKey;
	                        ret_template_temp.revision = remoteChange.revision + subRevision;
	                        ret_template_temp.showRow = false;
	                        //ret.push(_.clone(ret_template_temp));
	                    } else if ((remoteChange.data[pKey] == "null" && localUpdates[pKey] == null) || (remoteChange.data[pKey] == null && localUpdates[pKey] == "null")) {
	                        //do nothing
	                    } else if(model === "request" &&
	                        (pKey==="data" && remoteChange.data["dataMode"]==="raw")) {
	                        //data field only matters if dataMode!=raw
	                    } else if(model === "request" &&
	                        (pKey==="rawModeData" && remoteChange.data["dataMode"]!=="raw")) {
	                        //rawModeData field only matters if dataMode==raw
	                    } else if (remoteChange.data.hasOwnProperty(pKey) &&
	                        localUpdates.hasOwnProperty(pKey) &&
	                        JSON.stringify(remoteChange.data[pKey]) !== JSON.stringify(localUpdates[pKey]) &&
	                        !arraysEqual(remoteChange.data[pKey], localUpdates[pKey])) {
	                        ret_template_temp.key = pKey;

	                        //Replace so that word-break works correctly
	                        var localChangeToShow = localUpdates[pKey];
	                        var remoteChangeToShow = remoteChange.data[pKey];

	                        if (pKey == "data" && remoteChange.data["dataMode"] == "raw") {
	                            //change
	                            localChangeToShow = localUpdates["rawModeData"];
	                            remoteChangeToShow = remoteChangeToShow[0];
	                        }

	                        var oldLocalChange = _.cloneDeep(localChangeToShow);
	                        if (typeof localChangeToShow === "object" || remoteChangeToShow instanceof Array) {

	                            localChangeToShow = JSON.stringify(objectDiff(remoteChangeToShow, localChangeToShow)).replace(/":"/g, '": "').replace(/","/g, '", "');
	                        }

	                        if (typeof remoteChangeToShow === "object" || remoteChangeToShow instanceof Array) {
	                            remoteChangeToShow = JSON.stringify(objectDiff(oldLocalChange, remoteChangeToShow)).replace(/":"/g, '": "').replace(/","/g, '", "');
	                        }


	                        ret_template_temp.serverValue = "Updated to: " + remoteChangeToShow;
	                        ret_template_temp.localValue = "Updated to: " + localChangeToShow;

	                        ret_template_temp.revision = remoteChange.revision + subRevision;
	                        subRevision += 0.001;

	                        //Hack if the key is globals
	                        if (pKey === "globals" && model === "user") {
	                            this._setGlobalConflictMessage(ret_template_temp, localUpdates["globals"], remoteChange.data["globals"]);
	                        }

	                        //remove all unnessecary keys from the change
	                        /*for(var key1 in ret_template_temp.localChange.data) {
						if(key1!=="id" && key1!==pKey && !(model=="folder" && key1==="collection")) {
							delete ret_template_temp.localChange.data[key1];
							delete ret_template_temp.remoteChange.data[key1];
						}
					}*/

	                        ret.push(_.clone(ret_template_temp));
	                    }
	                }
	            }
	        } else if (localChange.verb === "destroy" && remoteChange.action === "update") {
	            localAction = "Deleted";
	            remoteAction = "Updated";
	            var ret_template_temp = _.clone(ret_template);
	            ret_template_temp.localAction = localAction;
	            ret_template_temp.serverValue = "Updated to: " + remoteChange.data;
	            ret_template_temp.localValue = "Deleted";
	            ret_template_temp.remoteAction = remoteAction;
	            ret.push(ret_template_temp);
	        } else if (localChange.verb === "update" && remoteChange.action === "destroy") {
	            localAction = "Updated";
	            remoteAction = "Deleted";
	            var ret_template_temp = _.clone(ret_template);
	            ret_template_temp.localAction = localAction;
	            ret_template_temp.remoteAction = remoteAction;
	            ret_template_temp.serverValue = "Deleted";
	            ret_template_temp.localValue = "Updated to: " + localChange.data;
	            ret.push(ret_template_temp);
	        } else if (localChange.verb === "transfer" && remoteChange.action === "transfer") {
	            localAction = "Moved";
	            remoteAction = "Moved";
	            var ret_template_temp = _.clone(ret_template);
	            ret_template_temp.key = "Destination";

	            ret_template_temp.localAction = localAction;
	            ret_template_temp.remoteAction = remoteAction;
	            ret_template_temp.serverValue = "Moved to: " + remoteChange.data.to.model + ":" + remoteChange.data.to.model_id;
	            ret_template_temp.localValue = "Moved to: " + localChange.data.to.model + ":" + localChange.data.to.model_id;
	            ret.push(ret_template_temp);
	        }

	        pm.syncLogger.log(new Error(), ["Conflict row generated: ", ret]);
	        return ret;
	    },


	    _updateUnsyncedChange: function(changeId, newChange) {
	        pm.syncLogger.log(new Error(), ["Updating changeId: ", changeId, " with change: ", newChange]);
	        if(newChange.verb==="transfer" && newChange.id.indexOf(":transfer")===-1) {
	            newChange.id += ":transfer";
	        }
	        pm.indexedDB.updateUnsyncedChange(newChange);


	        var currentUnsynced = this.currentUnsynced;
	        var numUnsynced = currentUnsynced.length;

	        var found = 0;
	        if(newChange.verb!=="transfer") {
	            for (var i = 0; i < numUnsynced; i++) {
	                if (currentUnsynced[i].id === changeId) {
	                    currentUnsynced[i] = newChange;
	                    this.currentUnsynced = currentUnsynced;
	                    found = 1;
	                }
	            }
	        }
	        if (found == 0) {
	            this.currentUnsynced.push(newChange);
	        }
	        return 0;
	    },

	    _updateUnsyncedChangeProp: function(changeId, key, value, changeset) {
	        var currentUnsynced = this.currentUnsynced;
	        var numUnsynced = currentUnsynced.length;
	        var modified = 0;
	        if(changeset.verb!=="transfer") {
	            for (var i = 0; i < numUnsynced; i++) {
	                if (currentUnsynced[i].id === changeId &&
	                    currentUnsynced[i].hasOwnProperty("data") &&
	                    currentUnsynced[i].verb!=="transfer") {
	                    currentUnsynced[i].data[key] = value;
	                    //for transfer conflicts, keep the verb as transfer
	                    if(key!=="folder") {
	                        currentUnsynced[i].verb = "update";
	                    }
	                    this.currentUnsynced = currentUnsynced;
	                    console.log("Updating local change ("+changeId+") with "+key+" = " + value);
	                    console.log(currentUnsynced[i]);
	                    modified = 1;
	                    return;
	                }
	            }
	        }
	        if(modified===0) {
	            this._updateUnsyncedChange(changeId, changeset);
	        }
	    },

	    deleteUnsyncedChange: function(changeId) {
	        var currentUnsynced = this.currentUnsynced;
	        var numUnsynced = currentUnsynced.length;
	        var oldThis = this;
	        var newUnsynced = [];
	        var retVal = -1;
	        for (var i = 0; i < numUnsynced; i++) {
	            if (currentUnsynced[i].id === changeId) {
	                pm.indexedDB.deleteUnsyncedChange(changeId, function() {
	                });
	                retVal = changeId;
	            }
	            else {
	                newUnsynced.push(currentUnsynced[i]);
	            }
	        }

	        this.currentUnsynced = newUnsynced;
	        return retVal;
	    },

	    _getJsonStringFromGlobal: function(global) {
	        if (!(global instanceof Array)) {
	            return [];
	        }
	        var numGlobals = global.length;
	        var obj = [];
	        for (var i = 0; i < numGlobals; i++) {
	            var thisObj = {};
	            thisObj[global[i].key] = global[i].value;
	            obj.push(thisObj);
	        }
	        return obj;
	    },

	    _setGlobalConflictMessage: function(ret_template_temp, localGlobals, remoteGlobals) {
	        var localValue = "Updated to " + JSON.stringify(this._getJsonStringFromGlobal(localGlobals), null, 2);
	        var serverValue = "Updated to " + JSON.stringify(this._getJsonStringFromGlobal(remoteGlobals), null, 2);
	        ret_template_temp.serverValue = serverValue;
	        ret_template_temp.localValue = localValue;
	    },

	    _addConflictRows: function(rowObject) {
	        var numRows = rowObject.length;
	        for (var i = 0; i < numRows; i++) {
	            pm.conflictResolverModal.addRow(rowObject[i]);
	        }
	    },

	    _saveProcessedServerChange: function() {
	        //dequeue the first server change, and execute, passing this function again in the callback

	        if (this.serverChangesReadyToBeSaved.length === 0) {
	            //stream = null because any change can go
	            pm.localChanges.isProcessingServerChange = false;
	            pm.mediator.trigger("beginUnsyncedStream", false, null, false);
	            return;
	        }

	        //if a collection sync triggers this while another change is being processed,
	        //don't start the collection stream
	        if(pm.localChanges.isProcessingServerChange) {
	            return;
	        }

	        //this is coming from the /sync response or the /collection?changeset response
	        var changeToSave = this.serverChangesReadyToBeSaved.shift();
	        this._saveServerChange(changeToSave, function() {
	            pm.localChanges.isProcessingServerChange = false;
	            _.bind(pm.localChanges._saveProcessedServerChange, pm.localChanges)();
	        });
	    },

	    _saveServerChange: function(message, callback) {
	        if (!this.syncEnabled) return;

	        if (!message) {
	            if (typeof callback == "function") {
	                callback();
	            }
	            return;
	        }

	        var model = message.meta.model;
	        var model_id = message.model_id;
	        var action = message.meta.action;
	        var data = message.data;

	        pm.syncManager.executeOrAddFunctionToQueue(function() {
	            //Accounting for API Change
	            message.model = message.meta.model;
	            message.action = message.meta.action;
	            pm.localChanges.isProcessingServerChange = true;
	            pm.mediator.trigger("syncChangeReceived", action, message, callback);
	        });
	    },

	    _syncFirstClientChange: function() {
	        if (!this.syncEnabled) return;
	        //check connectivity

	        //check serverChanges.length===0
	        pm.syncLogger.log(new Error(), "Syncing client change to sever...");

	        var currentUnsynced = this.currentUnsynced;
	        if (currentUnsynced.length === 0) {
	            pm.syncLogger.log(new Error(), "All client side changes have been resolved and synced");
	            this.set("allClientChangesSynced", true);
	            if (pm.syncManager.get("loggedIn") === true) {
	                this.set("syncFinished", true);
	                this.trigger("syncFinished");
	            }
	            return;
	        } else {
	            pm.syncLogger.log(new Error(), "Change so sync: ");
	            pm.syncLogger.log(new Error(), changeToSync);
	            var changeToSync = currentUnsynced[0];
	            var verb = changeToSync.verb;
	            var entity = changeToSync.entity;
	            var data = changeToSync.data;
	            var meta = changeToSync.meta;
	            if (verb === "transfer" && data && data.id != null) {
	                meta = data.id;
	            }
	            this._syncClientChangeToServer(verb, entity, data, meta, false);
	        }
	    },

	    onConflictsResolved: function(radioArray) {
	        var numValues = radioArray.length;
	        pm.syncLogger.log(new Error(), "Resolving " + numValues + " conflicts...");
	        for (var i = 0; i < numValues; i++) {
	            var thisRadio = $(radioArray[i]);
	            var model = thisRadio.attr('data-model');
	            var model_id = thisRadio.attr('data-model-id');
	            var key = thisRadio.attr('data-key');
	            var value = thisRadio.attr('value');
	            var changeToSync = thisRadio.data("change");
	            var remoteAction = thisRadio.attr('data-remote-action');
	            var localAction = thisRadio.attr('data-local-action');
	            var conflictID = thisRadio.attr('data-conflict-id');

	            if (remoteAction === "Updated" && localAction === "Updated") {
	                var objToUpdate = {};
	                objToUpdate['id'] = model_id;
	                objToUpdate[key] = value;

	                //id enetity verb data timestamp
	                if (thisRadio.attr('data-which-change') === "local") {
	                    //this._updateUnsyncedChange(conflictID, changeToSync);
	                    this._updateUnsyncedChangeProp(conflictID, key, changeToSync.data[key], changeToSync);
	                    //UPDATE the prop in the server change

	                    /*var serverChange = _.cloneDeep(changeToSync);
	                    serverChange[key] = value;
	                    //this.serverChangesReadyToBeSaved.push(serverChange);
	                    console.log("SERVER CHANGE SHOULD BE: ");
	                    console.log(serverChange);*/
	                    this.createOrUpdateServerChange(changeToSync, key, changeToSync.data[key]);
	                } else {
	                    //Add changeToSync to the serverChangesReadyToBeProcessedQueue
	                    //this should contain a revision!
	                    //this.serverChangesReadyToBeSaved.push(changeToSync);
	                    this.createOrUpdateServerChange(changeToSync, key, changeToSync.data[key]);

	                    //this.deleteUnsyncedChange(conflictID)
	                    //don't delete the local change
	                    console.log("Updating local change ("+conflictID+") with "+key+" = " + changeToSync.data[key]);
	                    this._updateUnsyncedChangeProp(conflictID, key, changeToSync.data[key], changeToSync);
	                }
	            } else if (remoteAction === "Created" && localAction === "Created") {
	                if (thisRadio.attr('data-which-change') === "local") {
	                    //change update to create. (the entity needs to be recreated on the server)
	                    //if the local change is selected, only the update needs to be sent to the server
	                    changeToSync.verb = "update";

	                    //to indicate to the order difference check in PmCollections.updateRemoteEntity that
	                    //an order update does not need to cause another collection force sync
	                    changeToSync.resolved = true;

	                    if (key === "folder" && model === "request") {
	                        //transfer to folder
	                        var destFolder = changeToSync.data.folder;
	                        var owner = changeToSync.data.owner;
	                        var rid = changeToSync.data.id;
	                        var rCollection = changeToSync.data.collection;
	                        changeToSync.action = "transfer";
	                        if (destFolder) {
	                            //transferring to a folder
	                            changeToSync.verb = "transfer";
	                            changeToSync.data = {
	                                to: {
	                                    model: "folder",
	                                    model_id: destFolder,
	                                    owner: owner
	                                },
	                                id: rid,
	                                owner: owner
	                            };
	                        } else {
	                            //transfer to the collection
	                            changeToSync.verb = "transfer";
	                            changeToSync.data = {
	                                to: {
	                                    model: "collection",
	                                    model_id: rCollection,
	                                    owner: owner
	                                },
	                                collectonId: rCollection,
	                                id: rid,
	                                owner: owner
	                            };
	                        }
	                        this._updateUnsyncedChange(conflictID, changeToSync);
	                    }
	                    else if (key == "shared") {
	                        if (value.has("true")) {
	                            changeToSync.verb = "share";
	                        } else {
	                            changeToSync.verb = "unshare";
	                        }
	                        this._updateUnsyncedChange(conflictID, changeToSync);
	                    }
	                    else {
	                        this._updateUnsyncedChangeProp(conflictID, key, changeToSync.data[key], changeToSync);
	                    }
	                    //this._updateUnsyncedChange(conflictID, changeToSync);

	                    /*var serverChange = _.cloneDeep(changeToSync);
	                    serverChange[key] = value;
	                    this.serverChangesReadyToBeSaved.push(serverChange);
	                    console.log("SERVER CHANGE SHOULD BE: ");
	                    console.log(serverChange);*/
	                    this.createOrUpdateServerChange(changeToSync, key, changeToSync.data[key]);
	                } else {
	                    //you choose the server. In this case, no need to send the local change.
	                    if (changeToSync.meta) {
	                        changeToSync.meta.action = "update";
	                        //to indicate to the order difference check in PmCollections.updateRemoteEntity that
	                        //an order update does not need to cause another collection force sync
	                        changeToSync.meta.resolved = true;
	                    }
	                    changeToSync.action = "update";
	                    changeToSync.model = model;
	                    changeToSync.model_id = model_id;

	                    //handle transfer conflicts
	                    if (key === "folder" && model === "request") {
	                        //transfer to folder
	                        var destFolder = changeToSync.data.folder;
	                        var owner = changeToSync.data.owner;
	                        var rid = changeToSync.data.id;
	                        var rCollection = changeToSync.data.collection;
	                        changeToSync.action = "transfer";
	                        if (destFolder) {
	                            //transferring to a folder
	                            changeToSync.verb = "transfer";
	                            changeToSync.data = {
	                                to: {
	                                    model: "folder",
	                                    model_id: destFolder,
	                                    owner: owner
	                                },
	                                from: {
	                                    model: "collection",
	                                    model_id: rCollection,
	                                    owner: owner
	                                },
	                                id: rid,
	                                collectionId: rCollection,
	                                owner: owner
	                            };
	                        } else {
	                            //transfer to the collection
	                            changeToSync.verb = "transfer";
	                            changeToSync.data = {
	                                to: {
	                                    model: "collection",
	                                    model_id: rCollection,
	                                    owner: owner
	                                },
	                                id: rid,
	                                collectionId: rCollection,
	                                owner: owner
	                            };
	                        }

	                        if (changeToSync.meta) {
	                            changeToSync.meta.action = "transfer";
	                        }
	                    }

	                    console.log("Pushing server change: ");
	                    //console.log(changeToSync);
	                    this.createOrUpdateServerChange(changeToSync, key, changeToSync.data[key]);

	                    //this.deleteUnsyncedChange(conflictID);
	                    console.log("Trying to update local change with server value");
	                    this._updateUnsyncedChangeProp(conflictID, key, changeToSync.data[key], changeToSync);
	                }
	            } else if (remoteAction === "Deleted" && localAction === "Updated") {
	                if (thisRadio.attr('data-which-change') === "local") {
	                    //change update to create. (the entity needs to be recreated on the server)
	                    changeToSync.verb = "create";
	                    this._updateUnsyncedChange(conflictID, changeToSync);
	                } else {
	                    //you choose the server. In this case, no need to send the local change.
	                    this.serverChangesReadyToBeSaved.push(changeToSync);

	                    this.deleteUnsyncedChange(conflictID);
	                }
	            } else if (remoteAction === "Updated" && localAction === "Deleted") {
	                if (thisRadio.attr('data-which-change') === "local") {
	                    //don't do anything - the local unsyncedChange is still there
	                } else {
	                    this.serverChangesReadyToBeSaved.push(changeToSync);
	                    this.deleteUnsyncedChange(conflictID);
	                }
	            } else if (remoteAction === "Moved" && localAction === "Moved") {
	                if (thisRadio.attr('data-which-change') === "local") {
	                    this._updateUnsyncedChange(conflictID, changeToSync);
	                } else {
	                    this.serverChangesReadyToBeSaved.push(changeToSync);
	                    this.deleteUnsyncedChange(conflictID);
	                }
	            } else {
	                pm.syncLogger.log(new Error(), "ERROR");
	            }
	        }
	        //all conflicts have been resolved
	        pm.conflictResolverModal.clearTable();

	        //to save first processes change from the queue
	        console.log("Saving first server change - ");
	        pm.localChanges.isProcessingServerChange = false;
	        this._saveProcessedServerChange();
	    },

	    createOrUpdateServerChange: function(changeToSync, key, value) {
	        if(!changeToSync.action) {
	            changeToSync.action = "update";
	        }
	        if(!changeToSync.id) {
	            changeToSync.id = changeToSync.model + ":" + changeToSync.model_id;
	        }
	        if(!changeToSync.meta) {
	            if(changeToSync.entity) {
	                changeToSync.meta = {
	                    model: changeToSync.entity,
	                    action: changeToSync.verb
	                }
	            }
	            else {
	                changeToSync.meta = {
	                    model: changeToSync.model,
	                    action: changeToSync.action
	                }
	            }
	        }
	        /*console.log("Trying to create/update server change. ChangeToSync: ");
	        console.log(changeToSync);
	        console.log("Setting " + key +" = " + value);
	        console.log("Curr serverChangesReadyToBeSaved:");
	        console.log(this.serverChangesReadyToBeSaved);*/
	        var currLen = this.serverChangesReadyToBeSaved.length;
	        var found = 0;
	        for(var i=0;i<currLen;i++) {
	            var thisId = this.serverChangesReadyToBeSaved[i].id;
	            if(!thisId) {
	                thisId = this.serverChangesReadyToBeSaved[i].model + ":" +
	                    this.serverChangesReadyToBeSaved[i].model_id;
	            }
	            if(thisId===changeToSync.id) {
	                console.log("Updating server change " + changeToSync.id);
	                console.log("Setting " + key +" = " + value);
	                this.serverChangesReadyToBeSaved[i].data[key]=value;
	                found = 1;
	            }
	        }
	        if(found==0) {
	            console.log("Adding change to server queue: ");
	            console.log(changeToSync);
	            this.serverChangesReadyToBeSaved.push(changeToSync);
	        }
	    },

	    syncAllRequestsFix: function() {
	        if (!this.syncEnabled) return;
	        var collModels = pm.collections.getAllCollections();
	        var collRequests = _.flatten(collModels.map(function(a) {
	            return a.get("requests")
	        })); //to sync
	        collRequests.map(function(obj) {
	            pm.syncManager.addChangeset("request", "create", obj, null, true);
	        });
	    },

	    isCollectionMine: function(cModel) {
	        return (cModel.get("owner") === pm.user.id || cModel.get("owner") == 0 || cModel.get("owner") == "0");
	    },

	    /**
	     if collection dump is true, all the user's collections are sent as /importCollection requests, not as separate changesets
	    */
	    syncAllObjects: function(syncImmediately, collectionDump, collectionId) {
	        var oldThis = this;

	        if (typeof syncImmediately === "undefined") {
	            syncImmediately = true;
	        }

	        if (typeof collectionDump === "undefined") {
	            collectionDump = true;
	        }


	        //Only use the /importCollection API for the first-ever SYNC
	        //NOT if sync is re-enabled
	        if (pm.settings.getSetting("syncedEver")) {
	            collectionDump = false;
	        } else {
	            pm.settings.setSetting("syncedEver", true);
	        }

	        if (!this.syncEnabled) return;

	        var allCollModels = pm.collections.getAllCollections(); //for folder/request creates
	        if (collectionId) {
	            allCollModels = [pm.collections.get(collectionId)];
	        }
	        var collModels = _.filter(allCollModels.map(function(c) {
	            if (c && oldThis.isCollectionMine(c)) {
	                return c;
	            }
	        }), function(maybeUndef) {
	            return maybeUndef;
	        });

	        var subscribedCollections = _.filter(pm.collections.getAllCollections().map(function(c) {
	            if (c && !oldThis.isCollectionMine(c)) {
	                return c;
	            }
	        }), function(maybeUndef) {
	            return maybeUndef;
	        });

	        var cForReqs = allCollModels;
	        if (collectionDump) {
	            cForReqs = subscribedCollections;
	        }

	        var collJsons = collModels.map(function(a) {
	            return a.getAsJSON()
	        }); //to sync

	        var folderArrays = [];

	        //forcibly adding folderIds to requests
	        var collRequests = _.flatten(cForReqs.map(
	            function(a) {
	                if(!a) {
	                    return null;
	                }
	                //get requests
	                var allRequests = a.get("requests");
	                //create map from requestId to folderId
	                var rfMap = {};
	                var thisFolders = a.get("folders");

	                if (!oldThis.isCollectionMine(a)) {
	                    //it is a subscribed collection
	                    //don't add folders, don't return requests
	                    return [];
	                }

	                _.map(thisFolders, function(folder) {
	                    for (var i = 0; i < folder.order.length; i++) {
	                        rfMap[folder.order[i]] = folder.id;
	                    }
	                });

	                var reqsToSend = _.map(allRequests, function(thisReq) {
	                    if (rfMap.hasOwnProperty(thisReq.id)) {
	                        thisReq.folder = rfMap[thisReq.id];
	                    } else {
	                        delete thisReq.folder;
	                    }
	                    thisReq.owner = a.get("owner");
	                    return thisReq;
	                });

	                folderArrays.push(thisFolders);
	                return reqsToSend;
	            }
	        )); //to sync

	        var folderJsons = _.flatten(folderArrays); //to sync

	        var responses = _.flatten(
	            collRequests.map(function(a) {
	                if(!a) {
	                    return null;
	                }
	                _.map(a["responses"], function(res) {
	                    res.collectionId = a.collectionId;
	                    res.requestId = a.id;
	                    res.owner = a.owner;
	                });
	                return a["responses"];
	            })
	        ); //to sync

	        var envModels = pm.environments.models;
	        var envJsons = envModels.map(function(a) {
	            return a.toJSON()
	        }); //to sync

	        //NOT syncing initial history
	        var historyModels = pm.history.models;
	        var historyJsons = historyModels.map(function(a) {
	            return a.toJSON()
	        }); //to sync

	        var headerPresetModels = pm.headerPresets.models;
	        var headerPresetJsons = headerPresetModels.map(function(a) {
	            return a.toJSON()
	        }); //to sync

	        var collIds = [];

	        collJsons.map(function(obj) {
	            if (!collectionDump) {
	                pm.syncManager.addChangeset("collection", "create", obj, null, syncImmediately);
	            } else {
	                //dump whole collection
	                pm.collections.getCollectionDataForFileJson(obj.id, function(name, type, filedata) {
	                    var cJson = pm.collections.sanitizeCollection(filedata);
	                    pm.syncManager.addChangeset("collection", "importCollection", cJson, null, syncImmediately);
	                });
	            }
	        });


	        //if collectionDump==true these are only called for subscribed collections
	        folderJsons.map(function(obj) {
	            //this shouldnt be needed!
	            pm.syncManager.addChangeset("folder", "create", obj, null, false);
	        });

	        collRequests.map(function(obj) {
	            //this shouldnt be needed either
	            pm.syncManager.addChangeset("request", "create", obj, null, false);
	        });


	        responses.map(function(obj) {
	            if (!obj) return;
	            if (!obj.hasOwnProperty("request")) return;

	            obj.request = obj.requestId;
	            obj.collection = obj.collectionId;
	            obj.collectionId = obj.collectionId;
	            pm.syncManager.addChangeset("response", "create", obj, null, syncImmediately);
	        });

	        if (syncImmediately) { //only send history requests for the very first sync, not a force sync
	            historyJsons = _.takeRight(historyJsons, 100);
	            historyJsons.map(function(obj) {
	                pm.syncManager.addChangeset("request", "history", obj, null, syncImmediately);
	            });
	        }

	        if (!collectionId) {
	            envJsons.map(function(obj) {
	                if (obj && obj.id) {
	                    //don't add the default empty env
	                    pm.syncManager.addChangeset("environment", "create", obj, null, syncImmediately);
	                }
	            });

	            headerPresetJsons.map(function(obj) {
	                pm.syncManager.addChangeset("headerpreset", "create", obj, null, syncImmediately);
	            });


	            //Globals updating is done in Globals.js after all the values have come
	            pm.globals.syncAllGlobalsOnce = true;
	        }

	        console.log(pm.syncLogger.getLogDate() + " - " + "All data exported");
	    }
	});

	module.exports = LocalChanges;


/***/ },

/***/ 215:
/***/ function(module, exports) {

	var SyncManagerNew = Backbone.Model.extend({
	    defaults: function() {
	        return {
	            unsyncedChanges: [],
	            syncConflicts: null,
	            loggedIn: false,
	            socketConnected: false,
	            sinceId: 0,
	            syncFinished: false,
	            finishedLoading: {
	                environments: false,
	                collections: false,
	                history: false,
	                globals: false
	            },
	            connectingToSocket: false,
	            syncEnabled: false
	        };
	    },

	    attachSyncStatusTriggers: function() {
	        this.on("change:loggedIn", function(m,v,o) {
	            pm.appWindow.trigger("sendMessageObject", "sync.changeLoggedIn", o);
	        });
	        this.on("change:lastTimestamp", function(m,v,o) {
	            pm.appWindow.trigger("sendMessageObject", "sync.changeLastTimestamp", o);
	        });
	        this.on("syncFinished", function() {
	            pm.appWindow.trigger("sendMessageObject", "sync.syncFinished");
	            pm.syncManager.set("currentSyncStatus", "syncFinished");
	        });
	        this.on("syncStarting", function() {
	            pm.appWindow.trigger("sendMessageObject", "sync.syncStarting");
	            pm.syncManager.set("currentSyncStatus", "syncStarting");
	        });
	        this.on("makeConnecting", function() {
	            pm.appWindow.trigger("sendMessageObject", "sync.makeConnecting");
	            pm.syncManager.set("currentSyncStatus", "makeConnecting");
	        });
	        this.on("makeNotConnected", function() {
	            pm.appWindow.trigger("sendMessageObject", "sync.makeNotConnected");
	            pm.syncManager.set("currentSyncStatus", "makeNotConnected");
	        });
	        this.on("disabledSync", function() {
	            pm.appWindow.trigger("sendMessageObject", "sync.disabledSync");
	            pm.syncManager.set("currentSyncStatus", "disabledSync");
	        });
	    },


	    // Fixed
	    initialize: function() {
	        var syncManager = this;

	        if(!pm.syncMediatorInitialized) {
	            pm.syncMediatorInitialized = true;


	            //GLOBAL SYNC FLAG
	            pm.mediator.on("setSync", this.setSync, this);
	            pm.mediator.on("syncOperationFailed", function(err) {
	                pm.syncLogger.error("Sync Operation Failed. Reason: " + JSON.stringify(err));
	                pm.syncLogger.debug("Sync operation failed");
	                //take the first item, add it to the end
	                if(pm.syncQueue.length===0) {
	                    return;
	                }
	                var failedItem = pm.syncQueue.shift();
	                //pm.syncQueue.push(failedItem);
	                if(pm.syncQueue.length===0) {
	                    return;
	                }
	                var funcToExecute = pm.syncQueue[0];
	                funcToExecute();
	            });

	            pm.mediator.on("syncClientChanges", this.onSyncClientChanges, this);

	            pm.mediator.on("clearSystemValues", this.onClearSystemValues, this);
	            pm.mediator.on("startCollectionForceSyncs", this.startCollectionForceSyncs, this);
	            pm.mediator.on("appOnline",this.onAppOnline, this);
	            pm.mediator.on("appOffline",this.onAppOffline, this);


	            pm.mediator.on("syncOperationDone", function() {
	                return;
	                if(pm.syncManager.get("loggedIn") === true) {
	                    //pm.syncManager._processNextServerChange();
	                    //pm.syncManager._saveNextServerChange();
	                }
	            });

	            pm.mediator.on("isTeamMember", function(isTeamSync) {
	                if(isTeamSync) {
	                    $(".team-sync-disabled").removeClass("team-sync-disabled");
	                }
	                else {
	                    $(".team-sync-only").addClass("team-sync-disabled");
	                }
	            }, this);

	            this.on("itemLoaded", this.itemLoaded, this);

	            this.on("singleSyncDone", this._syncFirstClientChange, this);
	            this.on("syncFinishedWithDelay", function() {
	                this.set("lastTimestamp", parseInt(Date.now()/1000));
	            }, this);

	            //this sends all unsynced changes to the serverDB
	            this.on("sendUnsyncedReport", this.sendUnsyncedReport, this);

	            if(this.isPrimaryWindow() && !pm.isTestRunner) {
	                this.attachSyncStatusTriggers();
	            }

	            if(!pm.isTestRunner) {
	                pm.appWindow.trigger("registerInternalEvent", "sync.changeLoggedIn", function(newLogin) {
	                    this.set("loggedIn", newLogin);
	                }, this);
	                pm.appWindow.trigger("registerInternalEvent", "sync.changeLastTimestamp", function(newTimestamp) {
	                    this.set("lastTimestamp", newTimestamp);
	                }, this);
	                pm.appWindow.trigger("registerInternalEvent", "sync.syncFinished", function() {
	                    this.trigger("syncFinished");
	                }, this);
	                pm.appWindow.trigger("registerInternalEvent", "sync.syncStarting", function() {
	                    this.trigger("syncStarting");
	                }, this);
	                pm.appWindow.trigger("registerInternalEvent", "sync.makeConnecting", function() {
	                    this.trigger("makeConnecting");
	                }, this);
	                pm.appWindow.trigger("registerInternalEvent", "sync.makeNotConnected", function() {
	                    this.trigger("makeNotConnected");
	                }, this);
	                pm.appWindow.trigger("registerInternalEvent", "sync.disabledSync", function() {
	                    this.trigger("disabledSync");
	                }, this);
	                pm.appWindow.trigger("registerInternalEvent", "sync.clickSyncIcon", function() {
	                    this.trigger("clickSyncIcon");
	                }, this);
	            }
	        }


	        this.showServerErrors = false;
	        this.retriedChanges = [];

	        this.sentChanges = [];
	        this.retrySentChangesInterval = null;
	        this.lastKeyTried = null;
	        this.lastKeyCount = 0;
	        this.sendingAllClientData = false;
	        this.secondsTillReconnect = 0;
	        this.secondsTillReconnectLabel = "Trying now...";
	        this.collectionsToForceSync = [];
	        this.foldersToForceSync = [];
	        this.collectionsRecentlyForceSynced = {};
	        this.socketCount = 0;
	        this.authErrorForSync = false;
	        this.authErrorForSyncTimer = null;
	        this.retryChangesTime = 20000;
	        if(postman_electron) {
	            this.clientUserAgent = navigator.userAgent + " " + "PostmanClient/"+pm.getCodebaseVersion()+" (AppId=" + pm.settings.getSetting("installation_id") + ")";
	        }
	        else {
	            this.clientUserAgent = navigator.userAgent + " " + "PostmanClient/" + pm.getVersion() + " (AppId=" + pm.settings.getSetting("installation_id") + ")";
	        }

	        this.changesetErrorCounts = {};
	        this.changesetErrorTimeouts = {};
	        this.changesetAttemptCounts = {};
	        this.changesetAttemptTimeouts = {};

	        this.renewCount = 0;

	        this.serverChanges = [];

	        //only initilize for the main window - not the runner
	        if(pm.isTestRunner || !this.isPrimaryWindow()) {
	            return;
	        }

	        pm.appWindow.trigger("registerInternalEvent", "syncFromMainWindow", this.onChangesetFromOtherWindow, this);

	        this.set("lastSyncedAt", pm.settings.getSetting("lastSyncedAt"));


	        this.clientChangesReadyToBeSent = [];
	        this.set("loginAttempts", 0);
	        this.set("reconnectTimeout", 1000*(Math.floor(Math.random()*10) + 10)); //set random value b/w 10 and 20 seconds

	        this.syncStartingTimer = null;
	        this.on("syncStartingWithDelay", function() {
	            if(!syncManager.syncFinishedTimer) {
	                clearTimeout(syncManager.syncStartingTimer);
	                syncManager.syncStartingTimer = null;
	                syncManager.syncStartingTimer = setTimeout(function() {
	                    syncManager.trigger("syncStarting");
	                },500);
	            }
	        });

	        this.syncFinishedTimer = null;
	        this.on("syncFinishedWithDelay", function() {
	            if(!syncManager.inBulkOperation) {
	                clearTimeout(syncManager.syncFinishedTimer);
	                syncManager.syncFinishedTimer = setTimeout(function() {
	                    clearTimeout(syncManager.syncStartingTimer);
	                    clearTimeout(syncManager.syncFinishedTimer);
	                    syncManager.syncFinishedTimer = null;
	                    syncManager.syncStartingTimer = null;

	                    syncManager.trigger("syncFinished");
	                },500);
	            }
	        });

	        this.inBulkOperation = false;

	        pm.mediator.on("databaseOperationComplete", function() {
	            pm.syncLogger.log(new Error(),"Database operation complete...checking for next item in sync queue");
	            if(pm.syncQueue.length===0) {
	                pm.syncLogger.log(new Error(),"Sync queue is empty");
	                return;
	            }
	            pm.syncQueue.shift();
	            if(pm.syncQueue.length===0) {
	                pm.syncLogger.log(new Error(),"Sync queue had one operation, which was already completed");
	                return;
	            }

	            pm.syncLogger.log(new Error(),"Executing next function...");
	            var funcToExecute = pm.syncQueue[0];
	            funcToExecute();
	        });

	        pm.indexedDB.getLastSynced(function(changes) {
	            syncManager.set("lastTimestamp", changes[0].value);
	        });

	        this.updateSince(); //should stay in this file
	        this.set("loggedIn",false);
	        this.set("finalRevisionNumber",-1);
	        this.set("csrfToken","");
	        this.createSocket();

	        this.set("allClientChangesSynced", false);
	    },

	    onAppOnline: function() {
	        this.set("connectingToSocket", false);
	        this.createSocket();
	    },

	    onAppOffline: function() {
	        if(pm.syncSocket) {
	            pm.syncSocket.disconnect();
	        }
	    },

	    updateStateToAllWindows: function() {
	        var state = this.get("currentSyncStatus");
	        this.trigger(state);
	    },

	    isPrimaryWindow: function() {
	        if(window.pmPrimaryWindowId === undefined) {
	            return true;
	        }
	        if(pm.appWindow.get("id") == window.pmPrimaryWindowId) {
	            return true;
	        }
	        else {
	            if(window.pmWindowsOpenList.length==1) {
	                //only one window open
	                //this has to be made primary
	                window.pmPrimaryWindowId = pm.appWindow.get("id");
	                pm.appWindow.trigger("sendMessageObject", "pmWindowPrimaryChanged", window.pmPrimaryWindowId);
	                return true;
	            }
	        }
	        return false;
	    },

	    setSync: function(syncEnabled) {
	        if(pm.syncManager.isPrimaryWindow()) {
	            pm.appWindow.trigger("sendMessageObject", "sync.setSync", syncEnabled);
	        }

	        this.syncEnabled = syncEnabled;
	        if(!this.isPrimaryWindow()) {
	            return;
	        }
	        if(syncEnabled == true) {
	            //this.set("loggingIn", false);
	            this.signIn();
	        }
	        pm.syncLogger.debug("Sync set to: " + syncEnabled);
	    },

	    onClearSystemValues: function() {
	        this.set("since",{own:0});
	        this.set("sinceId",0);
	        this.set("lastTimestamp",null);
	        pm.indexedDB.deleteAllSyncValues(function() {
	            //pm.syncStatusManager.clearNotifs();
	        });
	        pm.syncLogger.debug("System values cleared (since, lastTimestamp)");
	    },

	    itemLoaded: function(item) {
	        var currentLoaded = this.get("finishedLoading");
	        currentLoaded[item]=true;
	        this.set("finishedLoading", currentLoaded);
	        this.signIn();
	    },

	    hasDatabaseLoaded: function() {
	        var currentLoaded = this.get("finishedLoading");
	        for(var prop in currentLoaded) {
	            if(currentLoaded.hasOwnProperty(prop)) {
	                if(currentLoaded[prop]===false) {
	                    return false;
	                }
	            }
	        }
	        return true;
	    },

	    createSocket: function() {
	        if(!this.syncEnabled) {
	            console.log("SYNC: SyncEnabled is false. returning from createSocket");
	            return;
	        }
	        if(!this.isPrimaryWindow()) {
	            console.log("SYNC: Not the primary window. Returning from createSocket");
	            return;
	        }

	        if(this.get("connectingToSocket")==true) {
	            console.log("Already connecting to socket. Not restarting connection");
	            return;
	        }

	        if(this.get("socketConnected")==true) {
	            console.log("Already connected to socket. Not restarting connection");
	            return;
	        }

	        pm.syncLogger.debug("Create socket invoked");

	        pm.syncLogger.log(new Error(),"Trying to connect to socket: " + postman_syncserver_url);
	        io.sails.transports = ["websocket"];
	        io.sails.autoConnect = false;
	        /*io.socket.socket.options["try multiple transports"] = false;
	        io.socket.socket.options["reconnection delay"] = 3000;*/
	        //io.sails.useCORSRouteToGetCookie = true;
	        
	        if(pm.syncSocket && pm.syncSocket.hasOwnProperty("removeAllListeners")) {
	            pm.syncSocket.removeAllListeners();
	        }
	        this.set("loggingIn", false);
	        io.sails.url = postman_syncserver_url;
	        console.log("Setting url to " + postman_syncserver_url + "and connecting");
	        console.trace();
	        pm.syncSocket = io.sails.connect(postman_syncserver_url, {forceNew: true});
	        this.set("connectingToSocket", true);
	        this.trigger("makeConnecting");
	        console.log("SYNC: Calling attachListeners");
	        this.attachListeners();
	    },

	    tickReconnect: function() {
	        if(this.secondsTillReconnect>0) {
	            this.secondsTillReconnect--;
	        }
	        $("#sync-reconnect-timer").text(this.secondsTillReconnect);
	        this.secondsTillReconnectLabel = "Trying again ..."
	    },

	    tryToReconnect: function() {
	        return; //dont need to call this manually
	        //socket1.2 takes care of it
	        console.log("SYNC: Invoked tryToReconnect");
	        //pm.syncSocket.socket.reconnect();
	        var oldThis = this;
	        clearTimeout(this.reconnectTimeoutId);
	        var oldTimeout = this.get("reconnectTimeout");
	        if(!oldTimeout) {
	            this.set("reconnectTimeout", 5000);
	        }
	        reconnectTimeoutId = setTimeout(function() {
	            if(pm.syncManager.get("loggingIn") && !pm.syncManager.get("syncActive")) {
	                //still not logged in
	                var loginsAttempted = oldThis.get("loginAttempts");
	                pm.syncLogger.debug("Trying to reconnect..", "Login attempts: " + loginsAttempted);
	                if(loginsAttempted > 1) {
	                  pm.alerts.warning('Oops. We\'re having trouble connecting you to the Sync service. Please try restarting the app after some time.', {
	                    timeout: 30000,
	                    dedupeId: "sync-connection-error"
	                  });
	                    oldThis.signOut(false);
	                    oldThis.set("loginAttempts", 0);
	                    oldThis.trigger("makeNotConnected");
	                    clearInterval(oldThis.get("tickInterval"));
	                    return;
	                }
	                oldThis.set("loginAttempts", loginsAttempted+1);
	                pm.syncManager.set("loggingIn", false);

	                //confirm this is working
	                if(oldThis.get("csrfReceived")==false) {
	                   oldThis.createSocket();
	                }
	                else {
	                    pm.syncManager.signIn();
	                }

	                var newTimeout = oldThis.get("reconnectTimeout")*2;
	                oldThis.set("reconnectTimeout", newTimeout);
	            }
	        },this.get("reconnectTimeout"));
	        this.secondsTillReconnect = parseInt(this.get("reconnectTimeout")/1000);
	        clearInterval(this.get("tickInterval"));
	        this.set("tickInterval", setInterval(function() {
	            oldThis.tickReconnect();
	        }, 1000));
	        this.trigger("makeConnecting");
	        this.set("loggingIn", true);
	    },

	    //call when and how - pass the model to some view.
	    //or include this code there directly
	    signIn: function() {
	        console.log("SYNC: Invoking signin");

	        if(!this.syncEnabled) {
	            pm.syncLogger.log(new Error(),"Sync is not enabled...cannot proceed with sign in");
	            pm.syncLogger.debug("Sign in stopped because syncEnabled=false");
	            console.log("SYNC: Syncenabled is false. Returning from sign in");
	            return;
	        }

	        if(pm.isTestRunner) {
	            //cannot enable syncManager in the test runner
	            return;
	        }

	        if(!this.isPrimaryWindow()) {
	            console.log("SYNC: Not primary window. Returning from sign in");
	            return;
	        }

	        if(pm.isTesting===true && (pm["hasStartedSyncTest"] !== true)) {
	            return;
	        }

	        pm.syncLogger.log(new Error(),"Attempting to sign in...");
	        //if you are already logged in to the socket
	        /*if(this.get("loggedIn")===true) {
	            pm.syncLogger.log(new Error(),"The user is already logged in to anakin...cannot sign in again");
	            return;
	        }*/

	        //if you're not logged in to postman
	        if(pm.user.isLoggedIn()===false && pm.isTesting===false) {
	            pm.syncLogger.log(new Error(),"The user isn't logged in to Postman...cannot sign in to anakin");
	            pm.syncLogger.debug("Sign in stopped because the user isn't logged in");
	            console.log("SYNC: User not logged in. Returning from sign in");
	            return;
	        }

	        //if all object have not been loaded
	        if(this.hasDatabaseLoaded()===false) {
	            pm.syncLogger.log(new Error(),"Database hasn't loaded yet...cannot sign in to anakin");
	            return;
	        }

	        //if the socket object doesn't exist
	        if(pm.syncSocket==null) {
	            pm.syncLogger.log(new Error(),"Socket doesn't exist - will try after connection is established");
	            pm.syncLogger.debug("Sign in stopped because socket doesnt exists...creating socket");
	            console.log("SYNC: Socket not created. Returning from sign in");
	            this.createSocket();
	            return;
	        }

	        //if the socket hasn't been connected yet
	        if(this.get("socketConnected")===false) {
	            pm.syncLogger.log(new Error(),"Socket connection is not established yet...you will be signed in to sync as soon as the socket is connected");
	            pm.syncLogger.debug("Sign in stopped because socket is not connected");
	            console.log("SYNC: Socket not connected. Returning from sign in");

	            if(this.get("connectingToSocket")===false && pm.syncSocket===null) {
	                this.createSocket();
	            }
	            else if(this.get("connectingToSocket")===false) {
	                console.log("SYNC: Recreating socket. Returning from sign in");
	                if(pm.syncSocket && pm.syncSocket.hasOwnProperty("removeAllListeners")) {
	                    pm.syncSocket.removeAllListeners();
	                }
	                delete pm.syncSocket;
	                this.createSocket();
	            }
	            return;
	        }

	        if(this.get("loggingIn")===true) {
	            pm.syncLogger.log(new Error(),"Sync login is already in progress");
	            pm.syncLogger.debug("Sync stopped because Login is in progess");
	            console.log("SYNC: Already logging in. Returning from sign in");
	            setTimeout(function() {
	                if(pm.syncManager.get("loggingIn")) {
	                    pm.syncManager.set("loggingIn", false);
	                    pm.syncManager.signIn();
	                }
	            },3000);
	            return;
	        }

	        if(this.get("csrfReceived")==true) {
	            console.log("SYNC: CSRF token already received.");
	            return;
	        }


	        var oldThis=this;

	        var testUserId = (pm.isTesting===true)?'test':'1';
	        var testAccessToken = (pm.isTesting===true)?'test':'xyz';

	        var userId = (postman_env==="local")?testUserId:pm.user.id;
	        var accessToken = (postman_env==="local")?testAccessToken:pm.user.get("access_token");

	        this.set("loggingIn",true);

	        this.tryToReconnect();

	        pm.syncLogger.log(new Error(),"Sending login request with user_id="+userId+", access_token="+accessToken);
	        this.set("csrfReceived", false);
	        var headers = {};
	        this.addUserAgent(headers);
	        console.log("SYNC: Sending CSRF token request");
	        pm.syncManager.makeRequest('get','/csrfToken', null, headers, function(res) {
	            if(!res) {
	                res = {};
	            }
	            oldThis.set("csrfToken", (res["_csrf"]));
	            oldThis.set("csrfReceived", true);
	            clearInterval(oldThis.get("reconnectTimeInterval"));
	            oldThis.set("waitingForSyncResponse", true);
	            console.log("SYNC: Recd csrf response. Making create call");
	            pm.syncLogger.debug("Sending session create");
	            var sessionCreateObject = {
	                user_id: userId,
	                access_token: accessToken,
	                 _csrf: res["_csrf"]
	            };

	            oldThis.addUserAgent(sessionCreateObject);

	            //This is to avoid the cookie problem
	            $.get(postman_syncserver_url + "/__getcookie").always(function() {
	                oldThis.makeRequest('post', '/'+postman_sync_api_version+'/session/create', sessionCreateObject, null, function (resData) {
	                    $(".sync-connection-error").remove();
	                    oldThis.set("reconnectTimeout", 5000);
	                    oldThis.set("syncActive", true);

	                    if(resData.error && resData.error.name=="tokenAuthError") {
	                        pm.syncLogger.debug("Token auth error");
	                        oldThis.renewCount++;
	                        if(oldThis.renewCount>2) {
	                            pm.alerts.warning('There was a problem logging in to Sync. Please restart the app without logging out.', {
	                                dedupeId: 'sync-connection-error',
	                                persist: true
	                            });
	                            return;
	                        }
	                        pm.syncSocket.disconnect();
	                        pm.syncSocket.removeAllListeners();
	                        delete pm.syncSocket;
	                        //pm.user.renewToken();
	                        //new API to recreate token on Anakin
	                        pm.api.recreateSyncUser(function(result) {
	                            pm.user.getSyncData();
	                        });
	                        return;
	                    }

	                    pm.mediator.trigger("socketConnected");
	                    oldThis.renewCount = 0;
	                    if(resData.minVersion) {
	                        var currentVersion = pm.getVersion();
	                        if(resData.minVersion.supportedVersions.indexOf(currentVersion) === -1) {
	                            //this version is not supported. Must update
	                            pm.mediator.trigger("minVersionModal", resData.minVersion.message);
	                            return;
	                        }
	                    }
	                    oldThis.set("syncFinished", false);
	                    oldThis.set("loginAttempts", 0);
	                    if(resData.error) {
	                        pm.syncLogger.debug("Error in session create", resData.error);
	                        pm.syncLogger.log(new Error(),"Login failure - " + resData.error.description);
	                        oldThis.set("loggingIn",false);
	                        oldThis.set("loggedIn",false);
	                    }
	                    else {
	                        pm.mediator.trigger('socket:connected');
	                        pm.syncLogger.debug("Making sync call");
	                        //oldThis.checkAllSync();
	                        oldThis.set("loggedIn",true);
	                        oldThis.set("loggingIn",false);
	                        if(oldThis.get("waitingForSyncResponse")) {
	                            oldThis.requestInitialSync();
	                        }
	                        oldThis.set("waitingForSyncResponse", false);
	                    }
	                });
	            });

	        });
	    },

	    checkAllSync: function() {
	        if(!pm.settings.getSetting("syncedOnce")) {
	            pm.mediator.trigger("syncAllObjects", true);
	            pm.settings.setSetting("syncedOnce", true);
	            this.sendingAllClientData = true;
	        }
	    },

	    signOut: function(resetSyncProperties) {
	        pm.syncLogger.debug("Triggered socket signOut", resetSyncProperties);
	        if(typeof resetSyncProperties === "undefined") {
	            resetSyncProperties = true;
	        }


	        var oldThis = this;

	        this.set("syncActive", false);
	        this.set("csrfReceived", false);
	        pm.localChanges.isProcessingServerChange = false;

	        if(!this.syncEnabled || this.get("connectingToSocket")===true || this.get("loggedIn")===false || !pm.syncSocket) {
	            this.set("loggedIn",false);
	            this.set("socketConnected", false);
	            this.set("connectingToSocket", false);


	            clearTimeout(this.reconnectTimeoutId);

	            if(resetSyncProperties) {
	                this.syncEnabled = false;
	                pm.indexedDB.deleteAllSince(function() {});
	                pm.indexedDB.updateLastSynced(1, function(){});
	                pm.mediator.trigger("clearSystemValues");
	                this.trigger("disabledSync");
	            }

	            pm.syncManager.retrySentChangesInterval = null;

	            if(pm.syncSocket) {
	                oldThis.explicitLogout = resetSyncProperties;
	                pm.syncSocket.removeAllListeners();
	                pm.syncSocket.disconnect();
	            }
	            return;
	        }

	        var headers = {};
	        this.addUserAgent(headers);
	        pm.syncManager.makeRequest('get',
	            '/'+postman_sync_api_version+'/session/destroy', null, headers, function (resData) {
	            pm.syncLogger.log(new Error(),"Logged out: ");
	            pm.syncLogger.log(new Error(),resData);
	            oldThis.set("loggedIn",false);
	            oldThis.set("socketConnected", false);
	            oldThis.set("connectingToSocket", false);
	            clearTimeout(oldThis.reconnectTimeoutId);
	            if(pm.syncSocket) {
	                oldThis.explicitLogout = resetSyncProperties;
	                pm.syncSocket.removeAllListeners();
	                pm.syncSocket.disconnect();
	            }
	            if(resetSyncProperties) {
	                oldThis.syncEnabled = false;
	                pm.indexedDB.deleteAllSince(function() {});
	                pm.indexedDB.updateLastSynced(1, function(){});
	            }
	            pm.syncManager.retrySentChangesInterval = null;
	            pm.mediator.trigger("clearSystemValues");
	        });
	    },

	    getTeamCollections: function(userId, access_token, orgId, successCallback, failCallback) {
	        if(!pm.user.isTeamMember()) return;

	        /*var getUrl = pm.webUrl + "/profile/team/collections";
	        getUrl += "?user_id=" + pm.user.get("id");*/
	        var newGetUrl = postman_syncserver_url + "/api/team/"+orgId;

	        pm.syncManager.makeRequest('get',"/"+postman_sync_api_version+"/team/" + orgId, null, null, function(res) {
	            if(res.hasOwnProperty("data")) {
	                successCallback(res);
	            }
	            else {
	                failCallback(res);
	            }
	        });
	    },


	    /**
	     * Sends all unsynced changes in the DB to the database
	     * @param successCallback
	     * @param errorCallback
	     */
	    sendUnsyncedReport: function(successCallback, errorCallback) {
	        var syncManager = this;
	        syncManager.forceAllChanges = false;

	        if(!pm.user.isLoggedIn()) {
	            return;
	        }

	        if(this.sentInitialSyncRequest === true) {
	            //the response for the initial sync request was not received
	            //ask to reload the app
	            pm.alerts.warning('Oops! There was a problem communicating with the Sync server. Try restarting the app.', {
	              persist: true,
	              dedupeId: 'sync-connection-error'
	            });
	            this.sentInitialSyncRequest = false;
	            return;
	        }

	        var userId = pm.user.id;
	        var accessToken = pm.user.get("access_token");
	        var version = chrome.runtime.getManifest().version;
	        var changes = pm.localChanges.get("unsyncedChanges");
	        if(changes.length == 0) {
	            syncManager.trigger("syncFinished");
	            syncManager.set("allClientChangesSynced", true);
	            successCallback();
	        }
	        else {
	            changes = _.filter(changes,function(change) {return change.verb!=='history'});
	            copyToClipboard(JSON.stringify(changes));
	            pm.api.sendUnsyncedChanges(userId, version, JSON.stringify(changes), function() {
	                pm.indexedDB.clearUnsyncedChanges();
	                pm.localChanges.currentUnsynced = [];
	                syncManager.trigger("syncFinished");
	                syncManager.set("allClientChangesSynced", true);
	                pm.alerts.warning('Oops! There was a problem syncing some of your changes. Your changes have been stored in the app, and they\'ll be applied as soon as possible', {
	                  dedupeId: 'could-not-send-changes',
	                  persist: true
	                });
	                successCallback();
	            }, errorCallback);
	        };
	    },

	    updateSinceFromMessage: function(message) {
	        if(!message) {
	            console.log("Could not update sinceId. message is null");
	            return;
	        }
	        if(message.revision && (typeof message.revision === "number")) {
	            var currentTimestamp = (new Date()).getTime();
	            pm.indexedDB.updateSince(message.revision,currentTimestamp, function() {
	                pm.syncLogger.log(new Error(),"SinceId updated to "+message.revision+", timestamp updated to " + currentTimestamp);
	                pm.syncManager.set("sinceId", message.revision);
	                pm.syncManager.set("since", {own: message.revision});
	            });
	        }
	        else {
	            if(message.action==="subscribe" || message.action==="unsubscribe") {
	                //console.log(pm.syncLogger.getLogDate() + " - " +"No revisionId received for subscribe/unsubscribe");
	            }
	            else if(message.meta && message.meta.model === "environment") {
	                //console.log("envs are not versioned");
	            }
	            else if(message.hasOwnProperty("model_id") && message.hasOwnProperty("owner")) {
	                //console.log(pm.syncLogger.getLogDate() + " - " +"No revisionId received for subscribe/unsubscribe");
	            }
	            else {
	                if(!message.error || !(message.error.name==="instanceFoundError" || !message.error.name==="instanceNotFoundError")) {
	                    //dont throw errors for duplication
	                    if(message.error === "CSRF mismatch") {
	                        var headers = {};
	                        this.addUserAgent(headers);
	                        pm.syncManager.makeRequest('get','/csrfToken', null, headers, function(res) {
	                            if(!res) {
	                                res = {};
	                            }
	                            pm.syncManager.set("csrfToken", (res["_csrf"]));
	                        });
	                    }
	                    //pm.syncLogger.error("Invalid sinceId received. Message: " + JSON.stringify(message));
	                    //pm.syncLogger.log(new Error(), "Invalid sinceId received. Message: ");
	                    //pm.syncLogger.log(new Error(), message);
	                }

	                //if it is instanceNotFound, ask them to duplicate it
	                if(message.error && message.error.name=="instanceNotFoundError" && message.error.details && message.error.details.model) {
	                    var modelName = message.error.details.model;
	                    var additionalInfoForRequest = (modelName=="folder" || modelName=="collection")
	                        ?"If you were working on a request, duplicate the parent folder or collection.":"";

	                    var errorMsg = "The " + modelName + " was not found. Try duplicating it. " + additionalInfoForRequest;
	                    //pm.syncLogger.error("Notifying the user to duplicate the " + modelName);
	                    if(pm.syncManager.showServerErrors) {
	                      pm.alerts.error(errorMsg);
	                    }
	                }
	                else {
	                    if(pm.syncManager.showServerErrors) {
	                        var error_msg = (message.err && message.err.error) ? message.err.error : ((message.error) ? message.error.message : "Unknown error");
	                        pm.alerts.error(error_msg);
	                    }
	                }
	            }
	        }
	    },

	    updateSince: function() {
	        var oldThis=this;
	        pm.indexedDB.getSince(function(a) {
	            //a will be an array (own: 2, u1:c1: 4...)
	            if(a==null || (typeof a === "undefined")) {
	                pm.syncLogger.log(new Error(),"sinceId not updated. Obj from db: ");
	                pm.syncLogger.log(new Error(),a);
	            }
	            var sinceObject = {};
	            _.map(a, function(elem) {
	                sinceObject[elem.id] = elem.value;
	            });
	            oldThis.set("since", sinceObject);
	            pm.syncLogger.debug("Updating since", sinceObject);
	        });
	    },


	    /**
	     * This is called when the server requests a force sync
	     */
	    startForceSync: function(collectionId, folderId) {
	        if(typeof collectionId === "undefined") {
	            collectionId = null;
	        }
	        if(typeof folderId === "undefined") {
	            folderId = null;
	        }
	        pm.syncLogger.debug("Starting force sync", collectionId);
	        var oldThis = this;
	        var sinceId;
	        if(folderId) {
	             //only sync a folder
	            pm.collections.resyncFolderId(folderId, true);
	            return;
	        }
	        if(collectionId) {
	            //only sync for a collection
	            sinceId = this.get("since").own || 0;
	            //create collection changesets only
	            pm.mediator.trigger("syncAllObjects", false, false, collectionId);
	        }
	        else {
	           //clear local unsynced changes
	            pm.localChanges.onDeleteUnsyncedData();

	            //create all local entities as 'CREATE' unsynced changes
	            pm.mediator.trigger("syncAllObjects", false, false);
	            sinceId = 0;
	        }

	        var lastTimestamp = this.get("lastTimestamp");
	        this._sendSyncRequest(sinceId, lastTimestamp, 40000, -1, collectionId);

	        //this should automatically cause conflictsss
	    },

	    /**
	     * @description called ONLY when signIn is successful
	     */
	    requestInitialSync: function() {
	        if(!this.syncEnabled) return;

	        //this will have to go
	        if(pm.user.freshSignIn === true) {
	            pm.user.freshSignIn = false;
	            if(typeof collectionId === "undefined") {
	                collectionId = null;
	            }
	            if(typeof folderId === "undefined") {
	                folderId = null;
	            }
	            pm.syncLogger.debug("Starting force sync", collectionId);
	            var oldThis = this;
	            var sinceId;

	           //clear local unsynced changes
	            pm.localChanges.onDeleteUnsyncedData();

	            //create all local entities as 'CREATE' unsynced changes
	            pm.mediator.trigger("syncAllObjects", false, true);
	            sinceId = 0;

	            var lastTimestamp = this.get("lastTimestamp");
	            this._sendSyncRequest(sinceId, lastTimestamp, 40000, -1, collectionId);
	            return;
	        }

	        pm.syncLogger.log(new Error(),"Making initial since request");
	        pm.syncLogger.debug("Making initial sync request");
	        var storedSince = this.get("since");
	        var sinceId = 0;
	        if(storedSince && storedSince.own) {
	            sinceId = storedSince.own;
	        }
	        var lastTimestamp = this.get("lastTimestamp");
	        this._sendSyncRequest(sinceId, lastTimestamp, 40000, -1);
	    },

	    startIntegrityCheck: function() {
	        if(pm.syncManager.didIntegrityCheckRecently) {
	            return;
	        }
	        //yay
	        pm.syncManager.didIntegrityCheckRecently = true;
	        setTimeout(function() {
	            pm.syncManager.didIntegrityCheckRecently = false;
	        }, 10000);
	        pm.syncLogger.debug("Starting integrity check");
	        pm.syncManager.makeRequest('get',"/"+postman_sync_api_version+"/collection?populate=true&ids=true", null, null, function(res) {
	            //could result in a throttle error
	            if(!(res instanceof Array)) {
	                //error
	                return;
	            }
	            var collections = _.map(res,"data"),
	                collectionIds = _.map(res,"model_id");

	            var folders = [], requests = [];
	            _.each(collections, function(c) {
	                if(c) {
	                    if(c.folders) {
	                        folders = folders.concat(c.folders);
	                    }
	                    if(c.requests) {
	                        requests = requests.concat(c.requests);
	                    }
	                }
	            });

	            var folderIds = _.map(folders, "id");

	            var requestIds = _.map(requests, "id");

	            var localCollections = pm.collections.getAllOwnCollections(),
	                localFolders = [],
	                localRequests = [];

	            _.each(localCollections, function(c) {
	                localFolders = localFolders.concat(c.get("folders"));
	                localRequests = localRequests.concat(c.get("requests"));
	            });

	            var localCollectionIds = _.map(localCollections,"id"),
	                localFolderIds = _.map(localFolders,"id"),
	                localRequestIds = _.map(localRequests,"id");

	            var extraLocalCollections = _.difference(localCollectionIds, collectionIds),
	                extraLocalFolders = _.difference(localFolderIds, folderIds),
	                extraLocalRequests = _.difference(localRequestIds, requestIds);

	            pm.syncLogger.debug("Extra local collections", extraLocalCollections);
	            _.each(extraLocalCollections, function(cid) {
	                pm.collections.resyncCollectionId(cid, false);
	                var thisCollection = pm.collections.get(cid);
	                var thisFolders = _.map(thisCollection.get("folders"),"id");
	                var thisRequests = _.map(thisCollection.get("requests"),"id");
	                extraLocalFolders = _.difference(extraLocalFolders, thisFolders);
	                extraLocalRequests = _.difference(extraLocalRequests, thisRequests);
	            });

	            pm.syncLogger.debug("Extra local folders", extraLocalFolders);
	            _.each(extraLocalFolders, function(fid) {
	                pm.collections.resyncFolderId(fid, false);
	                var thisFolder = pm.collections.getFolderById(fid);
	                var thisRequests = thisFolder.order;
	                extraLocalRequests = _.difference(extraLocalRequests, thisRequests);
	            });

	            pm.syncLogger.debug("Extra local requests", extraLocalRequests);
	            _.each(extraLocalRequests, function(rid) {
	                pm.collections.resyncRequestId(rid, false);
	            });

	            pm.mediator.trigger("beginUnsyncedStream", false, null, false);
	        });
	    },

	    /**
	     * @description This sends the initial sync request to POST /sync, which gets a paginated list of server-side changes (S). Will be called after sign in
	     * @param lastRevisionNumber
	     * @param lastTimestamp
	     * @param maxEntries
	     * @param finalRevisionNumber
	     * @private
	     */
	    _sendSyncRequest: function(lastRevisionNumber, lastTimestamp, maxEntries, finalRevisionNumber, collectionId) {
	        if(!this.syncEnabled) return;

	        var syncRequestObject = {};

	        if(collectionId) {

	        }
	        else {
	            syncRequestObject["since_id"] = lastRevisionNumber
	            syncRequestObject["since_timestamp"] = lastTimestamp;
	            syncRequestObject["count"] = maxEntries;
	            syncRequestObject["_csrf"] = this.get("csrfToken");
	            pm.syncLogger.log(new Error(),"Making /sync request with obj: ...");
	            pm.syncLogger.log(new Error(),syncRequestObject);
	            if(finalRevisionNumber!==-1) {
	                //syncRequestObject["max_id"] = finalRevisionNumber;
	            }
	        }

	        var oldThis = this;
	        this.sentInitialSyncRequest = true;
	        this.trigger("syncStarting");

	        if(collectionId) {
	            pm.syncManager.makeRequest('get',"/"+postman_sync_api_version+"/collection/"+collectionId+"?populate=true&changeset=true", null, null, function(msg) {
	                if(!oldThis.syncEnabled) {
	                    return;
	                }
	                oldThis.sentInitialSyncRequest = false;
	                pm.syncLogger.log(new Error(),"Sync response received: ");
	                pm.syncLogger.log(new Error(),msg);
	                oldThis._handleNewSyncResponse(msg);
	                if(lastRevisionNumber!==0) {
	                    //integrity check for all data
	                    /*setTimeout(function() {
	                        pm.syncManager.startIntegrityCheck();
	                    },10000);*/
	                }
	            });
	        }
	        else {
	            var urlParams = $.param(syncRequestObject);
	            pm.syncManager.makeRequest('get',"/"+postman_sync_api_version+"/session/sync?" + urlParams, null, null, function(msg) {
	                if(!oldThis.syncEnabled) {
	                    return;
	                }
	                oldThis.sentInitialSyncRequest = false;
	                pm.syncLogger.log(new Error(),"Sync response received: ");
	                pm.syncLogger.log(new Error(),msg);
	                oldThis._handleNewSyncResponse(msg);
	                clearTimeout(oldThis.get("socketConnectTimeout"));
	                clearInterval(oldThis.get("tickInterval"));
	                if(lastRevisionNumber!==0) {
	                    //integrity check for all data
	                    pm.syncManager.doIntegrityCheck = true;
	                }
	            });
	        }
	    },

	    /**
	     * @description This adds all server changes to the server queue, makes an additional sync call if needed, and starts processing
	     * @param message
	     * @private
	     */
	    _handleNewSyncResponse: function(message) {
	        pm.syncLogger.log(new Error(),"Handling sync response: ");
	        pm.syncLogger.log(new Error(),message);
	        var oldThis = this;
	        if(!pm.user.isLoggedIn()) {
	            console.log("User logged out");
	            return;
	        }

	        //changesets for a single collection only (called during collection resync)
	        if(message.meta && message.data && message.meta.model==="collection") {
	            var changes = message.data;
	            var numChanges = changes.length;
	            var currentMaxRevision = 0;
	            for(var i=0;i<numChanges;i++) {
	                //this change will have a revisionNumber and a changeset
	                if(!changes[i].hasOwnProperty("meta")) {
	                    pm.syncLogger.log(new Error(),"Server change did not have meta field. " + JSON.stringify(changes[i]));
	                    continue;
	                }

	                /* user permission */
	                if(message.hasOwnProperty("meta") && message.meta.hasOwnProperty("access")) {
	                  changes[i].meta.access = message.meta.access;
	                }

	                this.serverChanges.push(changes[i]);
	                if(changes[i].revision > currentMaxRevision) {
	                    currentMaxRevision = changes[i].revision;
	                }
	            }
	            this.set("initialSyncComplete",true); //this means that the S changes have been received
	            pm.mediator.trigger('resolveConflicts',this.serverChanges);
	        }

	        //all changesets
	        else if(message.own) {
	            var finalRevisionNumberToExpect = message.own.max_id;
	            var lastSinceId = message.own.last_since_id;
	            if(lastSinceId!==-1) {
	                var messageForSinceUpdate = {"revision":lastSinceId};
	            }

	            this.set("finalRevisionNumber", finalRevisionNumberToExpect);

	            var oldTimestamp = this.get("lastTimestamp");
	            if(message.reset_timestamp && oldTimestamp < message.reset_timestamp) {
	                this.startForceSync();
	                this.set("lastTimestamp", message.sync_timestamp);
	                return;
	            }
	            this.set("lastTimestamp", message.sync_timestamp);

	            pm.indexedDB.updateLastSynced(message.sync_timestamp, function(){});

	            var changes = _.filter(message.own.entities, function(entity) {
	                return !(entity["action"]==="subscribe");
	            });
	            changes = changes.concat(_.map(message.subscribe.entities, function(entity) {
	                entity["subscribe"]=true;
	                return entity;
	            }));

	            var numChanges = changes.length;
	            var currentMaxRevision = 0;
	            for(var i=0;i<numChanges;i++) {
	                //this change will have a revisionNumber and a changeset
	                if(!changes[i].hasOwnProperty("meta")) {
	                    pm.syncLogger.log(new Error(),"Server change did not have meta field. " + JSON.stringify(changes[i]));
	                    continue;
	                }

	                this.serverChanges.push(changes[i]);
	                if(changes[i].revision > currentMaxRevision) {
	                    currentMaxRevision = changes[i].revision;
	                }
	            }

	            this.set("initialSyncComplete",true); //this means that the S changes have been received
	            pm.mediator.trigger('resolveConflicts',this.serverChanges);
	        }
	        //if theres a instancenotfounderror, resync the whole collection
	        else if(message.error && message.error.name==="instanceNotFoundError") {
	            pm.mediator.trigger('resolveConflicts',this.serverChanges);
	        }
	        else if(message.error && message.error.name=="authenticationError") {
	            //if this happens very often
	            if(this.authErrorForSync) {
	                if(postman_electron) {
	                    //TODO: Test in electron
	                    pm.cookieManager.deleteDomain("getpostman.com");
	                }
	                else {
	                    //TODO: figure out some other way for chrome
	                }
	            }
	            this.authErrorForSyncTimer = setTimeout(function() {
	                oldThis.authErrorForSync = false;
	            }, 1000);
	            this.authErrorForSync = true;
	            
	            pm.syncSocket.disconnect();
	            pm.syncSocket.removeAllListeners();
	            delete pm.syncSocket;
	            pm.api.recreateSyncUser(function(result) {
	                pm.user.getSyncData();
	            });
	        }
	        else {
	            console.error("Failure to sync.");
	            pm.alerts.error('There was an error while syncing. Please force sync after some time (<i>Settings > Sync > Force Sync</i>).', {
	              timeout: 5000,
	              dedupeId: 'failure-to-sync',
	              showAsHtml: true
	            });
	            pm.syncLogger.error("Sync operation returned malformed message (no message.own): " + JSON.stringify(message));
	        }

	    },

	    //is called during the initial sync operation
	    //is called whenever the next unsynced change needs to be processed
	    onSyncClientChanges: function(unsyncedChanges, stream) {
	        var numChanges = unsyncedChanges.length;

	        if(unsyncedChanges.length === 0) {
	            //all client changes have been synced
	            this.trigger("syncFinished");
	            this.set("allClientChangesSynced", true);
	            pm.mediator.trigger("startCollectionForceSyncs");
	            //nothing else to do
	        }
	        else {
	            var changeToSync = unsyncedChanges[0];
	            if(!stream) {
	                stream = changeToSync.stream;
	            }
	            this._syncClientChange(changeToSync, stream);
	        }
	    },

		_syncClientChange: function(changeToSync, stream) {
	        if(!this.syncEnabled) return;

	        //check serverChanges.length===0
	        pm.syncLogger.log(new Error(),"Syncing client change to sever...");
	        pm.syncLogger.log(new Error(),"Change so sync: ");
	        pm.syncLogger.log(new Error(),changeToSync);
	        var verb = changeToSync.verb;
	        var entity = changeToSync.entity;
	        if(!entity) {
	            entity = changeToSync.model;
	        }
	        var data = changeToSync.data;
	        var meta = changeToSync.meta;
	        if(verb==="transfer" && data && data.id!=null) {
	            meta = data.id;
	        }
	        if(verb==="unsubscribe" && data && data.id!=null) {
	            meta = data.id;
	        }

	        //set the right owner
	        //for folders
	        if(!data.hasOwnProperty("owner")) {
	            if (data.hasOwnProperty("collection")) {
	                var collection = pm.collections.getCollectionById(data.collection);
	                if(collection) {
	                    data.owner = pm.collections.getCollectionById(data.collection).get("owner");
	                }
	            }
	            //for collections
	            if (entity === "collection") {
	                var collection = pm.collections.getCollectionById(data.id);
	                if(collection) {
	                    data.owner = pm.collections.getCollectionById(data.id).get("owner");
	                }
	            }
	            //for requests
	            if (entity === "request") {
	                var request = pm.collections.getRequestById(data.id);
	                if(request) {
	                    data.owner = pm.collections.getRequestById(data.id).owner;
	                }
	            }
	        }

	        var unsyncedChangeKey = pm.localChanges.getUnsyncedChangeId(entity, verb, data, meta);
	        var unsyncedKey = unsyncedChangeKey.entityKey;
	        this._syncClientChangeToServer(verb, entity, data, meta, false, stream, unsyncedKey);
	    },

	    _getInitSynObject: function(since, changes) {
	        var ret = {};
	        ret["since_id"]=since;
	        var clientData = [];
	        var numChanges = changes.length;
	        for(var i=0;i<numChanges;i++) {
	            var change = changes[i];
	            var model = change.entity;
	            var model_id = change.data.id;
	            var action = change.verb;
	            var data = change.data;
	            clientData.push({
	                "model": model,
	                "model_id": model_id,
	                "action": action,
	                "data": data
	            });
	        }
	        ret["client_data"] = clientData;
	        return ret;
	    },

	    executeOrAddFunctionToQueue: function(func) {
			pm.syncQueue.push(func);
	        if(pm.syncQueue.length==1) {
	        	var funcToExec = pm.syncQueue.shift();
				funcToExec();
	        }
	    },

	    //Since the serverhas now moved action and model to the meta property.
	    handleNewMessageFormat: function(message) {
	        if(!message.hasOwnProperty("meta")) {
	            return;
	        }

	        message.model = message.meta.model;
	        message.action = message.meta.action;

	        this.set("lastTimestamp", Date.now());
	    },

	    attachListeners: function() {
	        console.log("SYNC: Invoking attachListeners");
	        if(!this.syncEnabled) {
	            console.log("SYNC: Syncenabled is false. Returning attachListeners");
	            return;
	        }

	        if(pm.syncSocket==null) {
	            console.log("SYNC: socket is null. Returning attachListeners");
	            return;
	        }
	        pm.syncLogger.log(new Error(),"Attaching listeners to socket.");
	        console.log("SYNC: Attaching listeners");
	        var syncManager = this;
	        pm.syncSocket.on('connect', function socketConnected() {
	                console.log("SYNC: Socket.connect listener fired");
	                syncManager.socketCount++;

	                clearTimeout(syncManager.get("socketConnectTimeout"));

	                pm.syncManager.set("connectingToSocket", false);
	                pm.syncManager.set("socketConnected",true);
	                pm.syncSocket.on('user', function (message) {
						//console.log(pm.syncLogger.getLogDate() + " - " +"Not listening to user events");
	                });

	                pm.syncSocket.on('subscribe',function(message) {
	                    if(!syncManager.isPrimaryWindow()) {
	                        return;
	                    }
	                    syncManager.handleNewMessageFormat(message);
	                    //console.log(pm.syncLogger.getLogDate() + " - " +"subscribe_collection: ",message);
	                    pm.syncManager.executeOrAddFunctionToQueue(function() {
	                        //TODO: check for errors here
	                        pm.mediator.trigger("syncChangeReceived","subscribe",message);
	                    });
	                });

	                pm.syncSocket.on('unsubscribe',function(message) {
	                    if(!syncManager.isPrimaryWindow()) {
	                        return;
	                    }
	                    syncManager.handleNewMessageFormat(message);
	                    //console.log(pm.syncLogger.getLogDate() + " - " +"unsubscribe_collection: ",message);
	                    pm.syncManager.executeOrAddFunctionToQueue(function() {
	                        pm.mediator.trigger("syncChangeReceived","unsubscribe",message);
	                    });
	                });

	                pm.syncSocket.on('create',function(message) {
	                    if(!syncManager.isPrimaryWindow()) {
	                        return;
	                    }
	                    syncManager.handleNewMessageFormat(message);
	                    //console.log(pm.syncLogger.getLogDate() + " - " +"Created: ",message);
	                    pm.syncManager.executeOrAddFunctionToQueue(function() {
	                        pm.mediator.trigger("syncChangeReceived","create",message);
	                    });
	                });

	                pm.syncSocket.on('import',function(message) {
	                    if(!syncManager.isPrimaryWindow()) {
	                        return;
	                    }
	                    syncManager.handleNewMessageFormat(message);
	                    //console.log(pm.syncLogger.getLogDate() + " - " +"Created: ",message);
	                    pm.syncManager.executeOrAddFunctionToQueue(function() {
	                        pm.mediator.trigger("syncChangeReceived","import",message);
	                    });
	                });

	                pm.syncSocket.on('update',function(message) {
	                    if(!syncManager.isPrimaryWindow()) {
	                        return;
	                    }
	                    syncManager.handleNewMessageFormat(message);
	                    //console.log(pm.syncLogger.getLogDate() + " - " +"Updated: ",message);
		                pm.syncManager.executeOrAddFunctionToQueue(function() {
			                pm.mediator.trigger("syncChangeReceived","update",message);
		                });
	                });

	                pm.syncSocket.on('destroy',function(message) {
	                    if(!syncManager.isPrimaryWindow()) {
	                        return;
	                    }
	                    syncManager.handleNewMessageFormat(message);
	                    //console.log(pm.syncLogger.getLogDate() + " - " +"Destroyed: "+message);
		                pm.syncManager.executeOrAddFunctionToQueue(function() {
			                pm.mediator.trigger("syncChangeReceived","destroy",message);
		                });
	                });

	                pm.syncSocket.on('history',function(message) {
	                    if(!syncManager.isPrimaryWindow()) {
	                        return;
	                    }
	                    syncManager.handleNewMessageFormat(message);
	                    pm.syncLogger.log(new Error(),["History: ", message]);
		                pm.syncManager.executeOrAddFunctionToQueue(function() {
			                pm.mediator.trigger("syncChangeReceived","history",message);
		                });
	                });

	                pm.syncSocket.on('transfer', function(message) {
	                    if(!syncManager.isPrimaryWindow()) {
	                        return;
	                    }
	                    syncManager.handleNewMessageFormat(message);
	                    pm.syncLogger.log(new Error(),"Transfer notif received");
	                    if(message.revision!=null) {
	                        pm.syncManager.updateSinceFromMessage(message);
	                    }
		                pm.syncManager.executeOrAddFunctionToQueue(function() {
			                pm.mediator.trigger("syncChangeReceived","transfer",message);
		                });
	                });

	                pm.syncSocket.on('disconnect', function (logout) {
	                    var logout = pm.syncManager.explicitLogout;
	                    if(typeof logout==="undefined") {
	                        logout = false;
	                    }
	                    pm.syncManager.set("connectingToSocket", false);
	                    pm.syncManager.set("socketConnected", false);
	                    pm.syncManager.explicitLogout = false;
	                    pm.syncManager.set("csrfReceived", false);
	                    pm.syncManager.socketCount--;
	                    //if(!syncManager.syncEnabled) {
	                        //move all retry changes to unsynced
	                        syncManager.addAllRetryChangesToUnsynced();
	                        pm.syncLogger.log(new Error(),'Socket is now disconnected!');
	                        syncManager.set("socketConnected", false)
	                        syncManager.set("syncActive", false);
	                        if(logout) {
	                            syncManager.trigger("disabledSync");
	                        }
	                        else {
	                            syncManager.trigger("makeNotConnected");
	                        }
	                        if(syncManager.get("loggedIn")==true) {
	                            syncManager.tryToReconnect();
	                        }
	                        if(logout) {
	                            syncManager.set("loggedIn",false);
	                            syncManager.socketCount = 0;
	                        }
	                        if(!logout) {
	                            syncManager.set("loggingIn", true);
	                        }
	                    //}
	                });

	                pm.syncSocket.on('share', function (message) {
	                  if(!syncManager.isPrimaryWindow()) {
	                    return;
	                  }

	                  syncManager.handleNewMessageFormat(message);
	                  pm.syncLogger.log(new Error(), ["Share: ", message]);

	                  pm.syncManager.executeOrAddFunctionToQueue(function() {
	                    pm.mediator.trigger("syncChangeReceived", "share", message);
	                  });
	                  pm.mediator.trigger('socket:share', message);
	                });

	                pm.syncSocket.on('unshare', function (message) {
	                  if(!syncManager.isPrimaryWindow()) {
	                    return;
	                  }

	                  syncManager.handleNewMessageFormat(message);
	                  pm.syncLogger.log(new Error(), ["Unshare:: ", message]);

	                  pm.syncManager.executeOrAddFunctionToQueue(function() {
	                    pm.mediator.trigger("syncChangeReceived", "unshare", message);
	                  });
	                  pm.mediator.trigger('socket:unshare', message);
	                });

	                if(pm.user.isLoggedIn()===true) {
	                    pm.syncManager.signIn();
	                }
	        });

	        clearTimeout(this.get("socketConnectTimeout"));
	        this.set("socketConnectTimeout", setTimeout(function() {
	            pm.syncManager.trigger("makeNotConnected");
	        },20000));
	    },

	    /**
	     * @description - invoked after a single client->server message's response has been received. may be a realtime event,
	     * or one sent after the user has logged in (as part of the sync flow). In the latter case, unsyncedChange[0] will be deleted
	     * @param realtime
	     * @param callback
	     * @private
	     */
	    _clearClientChangeIfNeeded: function(unsyncedKey, realtime, stream, callback) {
		    //only delete the unsynced change IF the change is not a realtime change
		    pm.mediator.trigger("singleUnsyncedChangeSynced", unsyncedKey, realtime, stream);
	        //console.log(pm.syncLogger.getLogDate() + " - " +"Successfully sent client change to server");
		    callback();
	    },

	    getEntityFromId: function (entity, id, ownerId, secondArgument, callback) {
	        if(!this.syncEnabled) return;
	        var oldThis = this;
	        pm.syncManager.makeRequest('get',"/"+postman_sync_api_version+"/"+entity+"/"+id+"?owner="+ownerId, null, null, function(res) {
	            //console.log(pm.syncLogger.getLogDate() + " - " +"GET complete", res);
	            if(res.hasOwnProperty("error")) {
	                oldThis.handleErrorObject(res, entity, {}, "GET",null, id);
	            }
	            else {
	                callback(res, secondArgument);
	            }
	        });
	    },

	    getEntityForCollection: function(entity, ownerId, collectionId, callback) {
	        if(!this.syncEnabled) return;
	        pm.syncManager.makeRequest("get","/"+postman_sync_api_version+"/"+entity+"?collection="+collectionId+"&owner="+ownerId, null, null, function(res) {
	            //console.log(pm.syncLogger.getLogDate() + " - " +"GET complete", res);
	            callback(res);
	        });
	    },


	    getFoldersForObject: function(objectWithFolders, ownerId, subscribeOnly) {
	        if(typeof subscribeOnly === "undefined") {
	            subscribeOnly = false;
	        }
	        var folderIds = objectWithFolders.folders_ids;
	        var oldThis = this;
	        if(!folderIds) {
	            //get folder ids
	            if(ownerId == "0") {
	                ownerId = pm.user.id;
	            }
	            pm.syncManager.getEntityForCollection("folder", ownerId, objectWithFolders.id, function(results) {
	                _.map(results, function (res) {
	                    if(res.meta && res.data) {
	                        //New API
	                        res = res.data;
	                    }

	                    if (subscribeOnly && pm.subscriptionManger.subscribedTo.indexOf(res.collection) === -1) {
	                        console.log("the collection was unsubscribed to before this folder was received");
	                        return;
	                    }

	                    pm.collections.addFolderFromRemote(res, null);

	                    //for nested folders
	                    if (res.folders_ids) {
	                        pm.syncManager.getFoldersForObject(res, ownerId, subscribeOnly);
	                    }
	                    pm.syncManager.getRequestsForObject(res, ownerId, res.id, "folder");
	                });
	            });
	        }
	        else {
	            _.map(folderIds, function (fid) {
	                pm.syncManager.getEntityFromId("folder", fid, ownerId, null, function (res) {
	                    //res will be a folder
	                    //if (oldThis.subscribedTo.indexOf(res.collection) === -1) {
	                    //    console.log("the collection was unsubscribed to before this folder was received");
	                    //    return;
	                    //}
	                    if(res.meta && res.data) {
	                        //New API
	                        res = res.data;
	                    }

	                    pm.collections.addFolderFromRemote(res, null);

	                    //for nested folders
	                    if (res.folders_ids) {
	                        pm.syncManager.getFoldersForObject(res, ownerId, subscribeOnly);
	                    }
	                    pm.syncManager.getRequestsForObject(res, ownerId, fid, "folder");
	                });
	            });
	        }

	    },

	    getRequestsForObject: function(objectWithOrder, ownerId, parentId, parentType) {
	        var oldThis = this;
	        var numRequestsAdded = 0;
	        _.map(objectWithOrder.order, function(requestId) {
	            if(ownerId == "0") {
	                ownerId = pm.user.id;
	            }
	            pm.syncManager.getEntityFromId("request",requestId, ownerId, objectWithOrder, function(res,owo) {
	                if(res.meta && res.data) {
	                    //New API
	                    res = res.data;
	                }

	                if(!res) {
	                    //probably send an invalid requestId
	                    pm.syncLogger.error("No requestData received for requestId: " + requestId+", owner=" + ownerId);
	                    return;
	                }

	                if(pm.collections.getRequestById(res.id)) {
	                    //we already have the request
	                    return;
	                }

	                res["collectionId"]=res.collection;
	                if(res.dataMode==="raw" && res.rawModeData) {
	                    res.data = res.rawModeData;
	                    delete res.rawModeData;
	                }
	                pm.collections.addFullCollectionRequest(res, null);

	                oldThis.getResponsesForRequest(res.id, ownerId);
	                numRequestsAdded++;
	                //Change objectWithOrder to owo if order becomes a problem
	                if(numRequestsAdded === objectWithOrder.order.length) {

	                    setTimeout(function(pt, pi, oo) {
	                        return function() {
	                            pm.collections.trigger("sortRequestContainer", pt, pi, oo);
	                        }
	                    }(parentType, parentId, objectWithOrder.order), 1000);

	                }
	            });
	        });
	    },

	    //TODO: Change
	    getResponsesForRequest: function(requestId, ownerId) {
	        if(ownerId == "0") {
	            ownerId = pm.user.id;
	        }
	        pm.syncManager.makeRequest('get',"/"+postman_sync_api_version+"/response?request="+requestId+"&owner="+ownerId, null, null, function(res) {
	            if(res.error && res.error.message) {
	                console.log(pm.syncLogger.getLogDate() + "Error getting responses for request: " + requestId + ". Reason:" + res.error.message);
	                return;
	            }
	            if(res.length==0) {
	                //console.log("No responses for this request");
	                return;
	            }
	            pm.collections.addResponsesToCollectionRequestWithoutSync(requestId, res, function() {});
	        });
	    },

	    isErrorResponse: function(res, jwr) {
	        if(!res) {
	            //TODO: Have to log this separately.
	            //this points to a server error
	            return true;
	        }

	        if(res.hasOwnProperty("error")) {
	            return true;
	        }

	        if(jwr && jwr.hasOwnProperty("statusCode") && !isStatusCode200(jwr.statusCode) && jwr.statusCode!==304) {
	            return true;
	        }

	        if(res.hasOwnProperty("statusCode") && !isStatusCode200(res.statusCode) && res.statusCode!==304) {
	            return true;
	        }

	        return false;
	    },

	    //called when all other unsynced changes have been processed
	    //goes throught the list of IDs of collections to force sync
	    startCollectionForceSyncs: function() {
	        var ids = this.collectionsToForceSync;
	        if(ids.length>0) {
	            var id = this.collectionsToForceSync.splice(0,1);
	            this.startForceSync(id[0]);
	            return;
	        }
	        var fids = this.foldersToForceSync;
	        if(fids.length>0) {
	            var id = this.foldersToForceSync.splice(0,1);
	            this.startForceSync(null, id[0]);
	        }
	    },


	    /**
	     * @description handle custom error names as sent by anakin
	     * @param res
	     * @param verb is the verb that caused the original error. if it's transfer, we need to resend
	     */
	    handleErrorObject: function(res, entity, data, verb, unsyncedKey, meta) {
	        var oldThis = this;
	        var clearChange = true;

	        if(verb!=="subscribe") {
	            if(this.changesetErrorCounts.hasOwnProperty(verb+":"+unsyncedKey)) {
	                this.changesetErrorCounts[verb+":"+unsyncedKey]++;
	            }
	            else {
	                this.changesetErrorCounts[verb+":"+unsyncedKey] = 1;
	            }
	            clearTimeout(this.changesetErrorTimeouts[verb+":"+unsyncedKey]);
	            this.changesetErrorTimeouts[verb+":"+unsyncedKey] = setTimeout(function(v,u) {
	                return function() {
	                    delete oldThis.changesetErrorCounts[v+":"+u];
	                }
	            }(verb,unsyncedKey), 2000);
	        }

	        //prevent any change from being sent twice. Why is this needed??
	        /*var retriedIndex = this.retriedChanges.indexOf(unsyncedKey);
	        if(retriedIndex !== -1) {
	            this.retriedChanges.splice(retriedIndex, 1);
	            return true;
	        }*/

	        if(!res) {
	            //no error object :s
	            //dunno what to 
	            pm.mediator.trigger("sendCustomError", new Error("No res object received for entity = " + entity + " verb = " + verb));
	            return true;
	        }

	        if(verb==="share") {
	            if(res.error.name!="isSharedError") {
	                pm.mediator.trigger("shareError", "share", meta);
	            }
	            return true;
	        }
	        else if(verb==="unshare") {
	            //only throw error to the UI if the error is not isNotSharedError
	            if(res.error.name!=="isNotSharedError") {
	                pm.mediator.trigger("shareError", "unshare", meta);
	            }
	            return true;
	        }
	        else if(verb==="importCollection") {
	            //if the server already has the collection that you're duplicating, don't do anything
	            if(res && res.error && (res.error.name==="throttleError" || res.error.name==="instanceFoundError")) {
	                return true;
	            }
	            else {
	                pm.syncManager.addCollectionsToForceSync(data.id);
	                return true;
	            }
	        }
	        else if(verb==="importFolder") {
	            if(res.error && res.error.name==="throttleError") {
	                return true;
	            }
	            else {
	                pm.syncManager.foldersToForceSync.push(data.id);
	                return true;
	            }
	        }

	        if(verb==="subscribe" && res.error.name==="isSubscribedError") {
	            //already subscribed. get from server
	            if(!pm.collections.get(data.collectionId)) {
	                pm.collections.getMissingServerCollection(data.collectionId, data.owner);
	            }
	            pm.mediator.trigger("alreadySubscribed", data.collectionId);
	            return true;
	        }

	        if(verb==="subscribe" && res.error.name==="serverError") {
	            //no-one knows - server is incapable of handling 2 subscribe/unsubscribes quickly
	            //retry after a while
	            pm.mediator.trigger("tempSubscribeError", data.collectionId);
	            return false;
	        }

	        if(verb==="unsubscribe" && res.error.name==="serverError") {
	            //no-one knows - server is incapable of handling 2 subscribe/unsubscribes quickly
	            //retry after a while
	            return false;
	        }

	        if(!res.error) {
	            //non-anakin error (sent via socket/sails)
	            return false;
	        }

	        //occurs during an update
	        if(res.error.name === "changeParentError") {
	            //collection to folder:
	            var details = res.error.details;
	            if(details.request.model === "folder") {
	                var oldLocation = {};
	                if(details.server.model === "folder" && details.server.model_id == "") {
	                    //trying to move from collection to folder
	                    oldLocation.model = "collection";
	                    oldLocation.model_id = data.collection;
	                    oldLocation.owner = data.owner;
	                }
	                else {
	                    //trying to move from folder to folder
	                    oldLocation.model = "folder";
	                    oldLocation.model_id = details.server.model_id;
	                    oldLocation.owner = data.owner;
	                }
	                var toLocation = {
	                    model:"folder",
	                    model_id: details.request.model_id,
	                    owner: data.owner
	                };
	                pm.syncManager.addChangeset("request","transfer",
	                    {
	                        "to": toLocation,
	                        "from": oldLocation,
	                        "owner": data.owner
	                    }
	                    , data.id, true);
	                clearChange = true;
	            }
	            else { //folder to collection
	                //we don't know what to do
	                clearChange = true;
	            }
	        }
	        else if (res.error.name === "orderUpdateError") {
	            if (entity === "collection") {
	                pm.syncManager.addCollectionsToForceSync(data.id);
	                clearChange = true;
	            }
	            else if(entity === "folder") {
	                pm.syncManager.addCollectionsToForceSync(data.collection);
	                clearChange = true;
	            }
	        }
	        else if(res.error.name === "instanceFoundError") {
	            clearChange = true;
	            if(verb==="history") {
	                clearChange = true;
	            }
	            else {
	                //start force sync for the collection here
	                if(entity==="collection") {
	                    pm.syncManager.addCollectionsToForceSync(data.id);
	                }
	                else if(entity==="folder") {
	                    pm.syncManager.addCollectionsToForceSync(data.collection);
	                    //pm.collections.updateFolderToRemote(data.id, true);
	                }
	                else if(entity==="request") {
	                    //to prevent the error-causing change from deleting this change
	                    setTimeout(function(dataObject){
	                        return function() {
	                            pm.collections.resyncRequestId(dataObject.id, true, true);
	                        }
	                    }(data), 1000);
	                }
	            }
	        }
	        else if (res.error.name === "instanceNotFoundError") {
	            if(verb === "history" || verb === "destroy") {
	                clearChange = true;
	            }
	            else {
	                oldThis.deleteChangesForEntity(res.error.details.model, res.error.details.model_id);
	                setTimeout(function(details){
	                    return function() {
	                        oldThis.handleInstanceNotFound(details);
	                    }
	                }(res.error.details), 5);
	                if (verb === "transfer") {
	                    clearChange = false;
	                }
	                else {
	                    clearChange = true;
	                }
	                //always clear. everything will be recreated anyway. for transfer, the transfer change needs to be replayed
	            }
	        }
	        else if(res.error.name==="throttleError") {
	            clearChange = false;
	        }
	        else if(res.error.name==="authenticationError") {
	            pm.syncSocket.disconnect();
	            pm.syncSocket.removeAllListeners();
	            delete pm.syncSocket;
	            pm.api.recreateSyncUser(function(result) {
	                pm.user.getSyncData();
	            });
	            clearChange = false;
	        }
	        else if(res.error === "CSRF mismatch") {
	            clearChange = false;
	        }
	        else if(res.error.name === "forbiddenError" && verb==="update") {
	            if(!pm.user.isTeamMember()) {
	                pm.alerts.warning('Oops... something went wrong. Try duplicating the collection.', {
	                dedupeId: 'forbiddenError',
	                timeout: 10000
	              });
	            }
	            else {
	              pm.alerts.warning('Oops...something went wrong. If this object was in your collection, try duplicating the collection. Otherwise, try resubscribing to it', {
	                dedupeId: 'forbiddenError',
	                timeout: 10000
	              });
	            }
	            clearChange = true;

	        }
	        else {
	            //all serverError / new errors
	            clearChange = false;
	            pm.syncLogger.error("Unknown error while sending data to the server. Error: " + JSON.stringify(res.error));
	            pm.syncLogger.error("Data that was sent("+entity+","+verb+"): " + JSON.stringify(data));
	            //start force sync if verb!=history
	        }

	        //if you're not clearing the change
	        if(clearChange == false) {
	            this.retriedChanges.push(unsyncedKey);
	        }
	        else {
	            var retriedIndex = this.retriedChanges.indexOf(unsyncedKey);
	            if(retriedIndex !== -1) {
	                this.retriedChanges.splice(retriedIndex, 1);
	            }
	        }
	        return clearChange;
	    },

	    //Deletes all unsynced changes for entity#id
	    deleteChangesForEntity: function(entity, id) {
	        switch(entity) {
	            case "collection":
	                pm.localChanges.deleteChangesForCollection(id);
	                break;
	            case "folder":
	                pm.localChanges.deleteChangesForFolder(id);
	                break;
	            default:
	                break;
	        }
	    },

	    handleInstanceNotFound: function(details) {
	        if(!details) {
	            pm.syncLogger.error("Sobti - No details received for instanceNotFound");
	            return;
	        }
	        var status = true;
	        this.deleteChangesForEntity(details.model, details.model_id);
	        switch(details.model) {
	            case "collection":
	                status = pm.collections.resyncCollectionId(details.model_id, true);
	                break;
	            case "folder":
	                status = pm.collections.resyncFolderId(details.model_id, true);
	                break;
	            case "request":
	                status = pm.collections.resyncRequestId(details.model_id, true);
	                break;
	            case "environment":
	                status = pm.environments.resyncEnvironmentId(details.model_id, true);
	                break;
	            default:
	                pm.syncLogger.error("instanceNotFound recd for model: " + details.model);
	                break;
	        }
	        return status;
	    },

	    addCollectionsToForceSync: function(cid) {
	        if(pm.syncManager.collectionsRecentlyForceSynced[cid]) {
	            //do nothing
	            return null;
	        }
	        else {
	            pm.localChanges.deleteChangesForCollection(cid);
	            pm.syncManager.collectionsRecentlyForceSynced[cid] = true;
	            setTimeout(function(cid) {
	                return function() {
	                    delete pm.syncManager.collectionsRecentlyForceSynced[cid];
	                }
	            }(cid), 5000);
	            if(this.collectionsToForceSync.indexOf(cid)===-1) {
	                this.collectionsToForceSync.push(cid);
	            }

	            //no need to do this. this function is always called from within a response handler, so will be invoked once the "syncnextrequest" func is called
	            /*
	            if(pm.localChanges.currentUnsynced.length==0) {
	                this.startCollectionForceSyncs();
	            }*/
	            return true;
	        }
	    },

	    addUserAgent: function(data) {
	        if(!data) {
	            data = {};
	        }
	        data["user-agent"] = this.clientUserAgent;
	    },

	    handleAttemptObject: function(verb, unsyncedKey) {
	        var oldThis = this;
	        if(this.changesetAttemptCounts.hasOwnProperty(verb+":"+unsyncedKey)) {
	            this.changesetAttemptCounts[verb+":"+unsyncedKey]++;
	        }
	        else {
	            this.changesetAttemptCounts[verb+":"+unsyncedKey] = 1;
	        }
	        clearTimeout(this.changesetAttemptTimeouts[verb+":"+unsyncedKey]);
	        this.changesetAttemptTimeouts[verb+":"+unsyncedKey] = setTimeout(function(v,u) {
	            return function() {
	                delete oldThis.changesetAttemptCounts[v+":"+u];
	            }
	        }(verb,unsyncedKey), 500);
	    },

	    cleanseUpdateObject: function(entity, data) {
	        if(entity==="collection" || entity==="folder") {
	            delete data.timestamp;
	            delete data.synced;
	            delete data.remote_id;
	            delete data.requests;
	            delete data.createdAt;
	            delete data.subscribed;
	            delete data.updatedAt;
	            delete data.sharedWithTeam;
	        }

	        if(entity==="collection") {
	            delete data.folders;
	        }

	        delete data.collectionId;
	        delete data.collection_id;
	        delete data.folder_id;
	    },

	    _syncClientChangeToServer: function (verb, entity, data, meta, realtime, stream, unsyncedKey) {
	        if(!this.isPrimaryWindow()) {
	            //only sync for the fist window
	            return;
	        }
	        var oldThis = this;

	        var testUserId = (pm.isTesting===true)?'test':'1';
	        var userId = (postman_env==="local")?testUserId:pm.user.id;

	        if(data) {
	            data["_csrf"] = this.get("csrfToken");
	        }

	        if(verb==="update") {
	            this.cleanseUpdateObject(entity, data);
	        }

	        if(!unsyncedKey || unsyncedKey=="") {
	            var unsyncedChangeKey = pm.localChanges.getUnsyncedChangeId(entity, verb, data, meta);
	            unsyncedKey = unsyncedChangeKey.entityKey;
	        }
	        if(this.changesetAttemptCounts[verb+":"+unsyncedKey]>2) {
	            //console.log("Not syncing same change again");

	            clearTimeout(this.changesetAttemptTimeouts[verb+":"+unsyncedKey]);
	            this.changesetAttemptTimeouts[verb+":"+unsyncedKey] = setTimeout(function(v,u) {
	                return function() {
	                    delete oldThis.changesetAttemptCounts[v+":"+u];
	                }
	            }(verb,unsyncedKey), 500);
	            return;
	        }

	        this.handleAttemptObject(verb, unsyncedKey);

	        switch (verb) {
	            case 'share':
	                this.trigger("syncStartingWithDelay");
	                if(!meta) {
	                    meta = data.id;
	                }
	                if(data && !data.hasOwnProperty('team')) {
	                    var orgs = pm.user.get("organizations");
	                    if(orgs.length > 0) {
	                        data.team = orgs[0].id;
	                    }
	                }
	                pm.syncManager.makeRequest('put',"/"+postman_sync_api_version+"/collection/share/"+meta, data, null, function(realtime, stream, data, unsyncedKey, meta) {
	                  return function(res) {
	                      oldThis.trigger("syncFinishedWithDelay");
	                      var clearChange = true;
	                      if(oldThis.isErrorResponse(res, arguments[1])) {
	                          clearChange = _.bind(oldThis.handleErrorObject, oldThis)(res, entity, data, verb, unsyncedKey, meta);
	                          pm.mediator.trigger("syncErrorReceived", "share", res);
	                      }

	                      if(clearChange || pm.syncManager.forceAllChanges) {
	                          pm.syncManager._handleServerResponseAfterSendingClientChange(unsyncedKey, res, realtime, stream);
	                          oldThis.sentChanges = _.reject(oldThis.sentChanges, function (obj) {
	                              return obj.key === unsyncedKey
	                          });
	                      }
	                  }
	                }(realtime, stream, data, unsyncedKey, meta));
	                break;
	            case 'unshare':
	                this.trigger("syncStartingWithDelay");
	                if(!meta) {
	                    meta = data.id;
	                }
	                pm.syncManager.makeRequest('put',"/"+postman_sync_api_version+"/collection/unshare/"+meta, {_csrf: oldThis.get("csrfToken")}, null, function(realtime, stream, data, meta, unsyncedKey) {
	                    return function(res) {
	                        oldThis.trigger("syncFinishedWithDelay");
	                        var clearChange = true;
	                        if(oldThis.isErrorResponse(res, arguments[1])) {
	                            clearChange =_.bind(oldThis.handleErrorObject, oldThis)(res, entity, data, verb, unsyncedKey, meta);
	                        }

	                        if(clearChange || pm.syncManager.forceAllChanges) {
	                            pm.syncManager._handleServerResponseAfterSendingClientChange(unsyncedKey, res, realtime, stream);
	                            oldThis.sentChanges = _.reject(oldThis.sentChanges, function (obj) {
	                                return obj.key === unsyncedKey
	                            });
	                        }
	                    }
	                }(realtime, stream, data, meta, unsyncedKey));
	                break;
	            case 'create':
	                //for folders and collections, add the correct order
	                if(entity==="collection") {
	                    pm.collections.updateCollectionOwnerWithoutSync(data.id, userId);
	                    data.owner = userId;

	                    var collectionJson = pm.collections.get(data.id);
	                    if(collectionJson) {
	                        data.order = pm.collections.get(data.id).get("order");
	                    }
	                }
	                else if(entity==="folder") {
	                    var folderJson = pm.collections.getFolderById(data.id);
	                    if(folderJson) {
	                        data.order = folderJson.order;
	                    }
	                }

	                //always set the correct owner. But this should be set corerctly anyway :(
	                if((entity==="folder" || entity==="request" || entity==="response")) {
	                    //ONLY TILL TEAM SYNC
	                    //after team sync is introduced, use the else clause
	                    if(!pm.user.isTeamMember()) {
	                        data.owner = pm.user.id;
	                    }
	                    else if(data.collection) {
	                        data.owner = pm.collections.getOwnerForCollection(data.collection);
	                    }
	                }

	                var optOwner = "";
	                if(data.owner) optOwner = "?owner="+data.owner;
	                this.trigger("syncStartingWithDelay");
	                pm.syncManager.makeRequest('post', '/'+postman_sync_api_version+'/' + entity + optOwner, data, null, function(realtime, stream, data) {
	                    return function(res) {
	                        oldThis.trigger("syncFinishedWithDelay");
	                        var clearChange = true;
	                        if(oldThis.isErrorResponse(res, arguments[1])) {
	                            clearChange =_.bind(oldThis.handleErrorObject, oldThis)(res, entity, data, verb, unsyncedKey);
	                        }

	                        if(clearChange || pm.syncManager.forceAllChanges) {
	                            pm.syncManager._handleServerResponseAfterSendingClientChange(unsyncedKey, res, realtime, stream);
	                            oldThis.sentChanges = _.reject(oldThis.sentChanges, function (obj) {
	                                return obj.key === unsyncedKey
	                            });
	                        }
	                    }
	                }(realtime, stream, data, unsyncedKey));

	                break;
	            case 'importCollection':
	                var optOwner = "";
	                if(data.owner) optOwner = "?owner="+data.owner;
	                this.trigger("syncStartingWithDelay");
	                pm.syncManager.makeRequest('post', '/'+postman_sync_api_version+'/collection/import', data, null, function(realtime, stream, data) {
	                    return function(res) {
	                        //oldThis.set("allClientChangesSynced", true); //hail mary
	                        oldThis.trigger("syncFinishedWithDelay");
	                        var clearChange = true;
	                        if(oldThis.isErrorResponse(res, arguments[1])) {
	                            clearChange =_.bind(oldThis.handleErrorObject, oldThis)(res, entity, data, verb, unsyncedKey);
	                        }

	                        if(clearChange) {
	                            pm.syncManager._handleServerResponseAfterSendingClientChange(unsyncedKey, res, realtime, stream);
	                            oldThis.sentChanges = _.reject(oldThis.sentChanges, function (obj) {
	                                return obj.key === unsyncedKey
	                            });
	                        }
	                    }
	                }(realtime, stream, data, unsyncedKey));
	                break;
	            case 'importFolder':
	                var optOwner = "";
	                if(data.owner) optOwner = "?owner="+data.owner;
	                this.trigger("syncStartingWithDelay");
	                pm.syncSocket.post('/'+postman_sync_api_version+'/folder/import', data, function(realtime, stream, data) {
	                    return function(res) {
	                        //oldThis.set("allClientChangesSynced", true); //hail mary
	                        oldThis.trigger("syncFinishedWithDelay");
	                        var clearChange = true;
	                        if(oldThis.isErrorResponse(res, arguments[1])) {
	                            clearChange =_.bind(oldThis.handleErrorObject, oldThis)(res, entity, data, verb, unsyncedKey);
	                        }

	                        if(clearChange) {
	                            pm.syncManager._handleServerResponseAfterSendingClientChange(unsyncedKey, res, realtime, stream);
	                            oldThis.sentChanges = _.reject(oldThis.sentChanges, function (obj) {
	                                return obj.key === unsyncedKey
	                            });
	                        }
	                    }
	                }(realtime, stream, data, unsyncedKey));
	                break;
	            case 'update':
	                if (entity == "user") {
	                    data.id = userId;
	                }
	               /* if (entity == "folder") {
	                    delete data.collection;
	                    delete data.collectionId;
	                }*/
	                if(entity==="request") {
	                    delete data.folder;
	                }

	                //always set the correct owner. But this should be set corerctly anyway :(
	                if((entity==="folder" || entity==="request" || entity==="response")) {
	                    if(!pm.user.isTeamMember()) {
	                        data.owner = pm.user.id;
	                    }
	                    else if(data.collection) {
	                        data.owner = pm.collections.getOwnerForCollection(data.collection);
	                    }
	                }

	                this.trigger("syncStartingWithDelay");
	                pm.syncManager.makeRequest('put', '/'+postman_sync_api_version+'/' + entity + '/' + data.id, data, null, function(realtime, stream, data) {
	                    return function(res) {
	                        oldThis.trigger("syncFinishedWithDelay");
	                        var clearChange = true;
	                        if(oldThis.isErrorResponse(res, arguments[1])) {
	                            clearChange =_.bind(oldThis.handleErrorObject, oldThis)(res, entity, data, verb, unsyncedKey);
	                        }

	                        if(clearChange || pm.syncManager.forceAllChanges) {
	                            pm.syncManager._handleServerResponseAfterSendingClientChange(unsyncedKey, res, realtime, stream);
	                            oldThis.sentChanges = _.reject(oldThis.sentChanges, function (obj) {
	                                return obj.key === unsyncedKey
	                            });
	                        }
	                    }
	                }(realtime, stream, data, unsyncedKey));
	                break;
	            case 'destroy':
	                var optOwner = "?";
	                if(data.owner) optOwner = "?owner="+data.owner;
	                this.trigger("syncStartingWithDelay");
	                pm.syncManager.makeRequest('delete', '/'+postman_sync_api_version+'/' + entity + '/' + data.id + optOwner,{_csrf: oldThis.get("csrfToken")}, null, function(realtime, stream, data) {
	                    return function(res) {
	                        oldThis.trigger("syncFinishedWithDelay");
	                        var clearChange = true;
	                        if(oldThis.isErrorResponse(res, arguments[1])) {
	                            clearChange =_.bind(oldThis.handleErrorObject, oldThis)(res, entity, data, verb, unsyncedKey);
	                        }

	                        if(clearChange || pm.syncManager.forceAllChanges) {
	                            pm.syncManager._handleServerResponseAfterSendingClientChange(unsyncedKey, res, realtime, stream);
	                            oldThis.sentChanges = _.reject(oldThis.sentChanges, function (obj) {
	                                return obj.key === unsyncedKey
	                            });
	                        }
	                    }
	                }(realtime, stream, data, unsyncedKey));
	                break;
	            case 'history':
	                //Disable syncing... for history
	                //this.trigger("syncStartingWithDelay");
	                pm.syncManager.makeRequest('post', '/'+postman_sync_api_version+'/user/history', data, null, function(realtime, stream, data) {
	                    return function(res) {
	                        oldThis.trigger("syncFinishedWithDelay");
	                        var clearChange = true;
	                        if(oldThis.isErrorResponse(res, arguments[1])) {
	                            clearChange =_.bind(oldThis.handleErrorObject, oldThis)(res, entity, data, verb, unsyncedKey);
	                        }

	                        if(clearChange || pm.syncManager.forceAllChanges) {
	                            pm.syncManager._handleServerResponseAfterSendingClientChange(unsyncedKey, res, realtime, stream);
	                            oldThis.sentChanges = _.reject(oldThis.sentChanges, function (obj) {
	                                return obj.key === unsyncedKey
	                            });
	                        }
	                    }
	                }(realtime, stream, data, unsyncedKey));
	                break;
	            case 'transfer':
	                this.trigger("syncStartingWithDelay");
	                pm.syncManager.makeRequest('put', '/'+postman_sync_api_version+'/request/transfer/'+meta, data, null, function(realtime, stream, data) {
	                    return function(res) {
	                        oldThis.trigger("syncFinishedWithDelay");
	                        var clearChange = true;
	                        if(oldThis.isErrorResponse(res, arguments[1])) {
	                            clearChange =_.bind(oldThis.handleErrorObject, oldThis)(res, entity, data, verb, unsyncedKey);
	                        }

	                        if(clearChange || pm.syncManager.forceAllChanges) {
	                            pm.syncManager._handleServerResponseAfterSendingClientChange(unsyncedKey, res, realtime, stream);
	                            oldThis.sentChanges = _.reject(oldThis.sentChanges, function (obj) {
	                                return obj.key === unsyncedKey
	                            });
	                        }
	                    }
	                }(realtime, stream, data, unsyncedKey));
	                break;
	            case 'subscribe':
	                this.trigger("syncStartingWithDelay");
	                pm.syncManager.makeRequest('put', '/'+postman_sync_api_version+'/' + entity + '/subscribe/'+meta, data, null, function(realtime, stream, data) {
	                    return function(res) {
	                        oldThis.trigger("syncFinishedWithDelay");
	                        var clearChange = true;
	                        if(oldThis.isErrorResponse(res, arguments[1])) {
	                            clearChange =_.bind(oldThis.handleErrorObject, oldThis)(res, entity, data, verb, unsyncedKey);
	                        }

	                        if(clearChange || pm.syncManager.forceAllChanges) {
	                            pm.mediator.trigger("successfulSubscribe", res);
	                            pm.syncManager._handleServerResponseAfterSendingClientChange(unsyncedKey, res, realtime, stream);
	                            oldThis.sentChanges = _.reject(oldThis.sentChanges, function (obj) {
	                                return obj.key === unsyncedKey
	                            });
	                        }
	                    }
	                }(realtime, stream, data, unsyncedKey));
	                break;
	            case 'unsubscribe':
	                this.trigger("syncStartingWithDelay");
	                pm.syncManager.makeRequest('put','/'+postman_sync_api_version+'/' + entity + '/unsubscribe/' + meta, data, null, function(realtime, stream, data, unsyncedKey, meta) {
	                    return function(res) {
	                        oldThis.trigger("syncFinishedWithDelay");
	                        var clearChange = true;
	                        //always unsubscribe
	                        clearChange = true;
	                        if(oldThis.isErrorResponse(res)) {
	                            pm.mediator.trigger("unsuccessfulUnsubscribe", data.id);
	                        }

	                        if(clearChange || pm.syncManager.forceAllChanges) {
	                            pm.mediator.trigger("successfulUnsubscribe", res);
	                            pm.syncManager._handleServerResponseAfterSendingClientChange(unsyncedKey, res, realtime, stream);
	                            oldThis.sentChanges = _.reject(oldThis.sentChanges, function (obj) {
	                                return obj.key === unsyncedKey
	                            });
	                        }
	                    }
	                }(realtime, stream, data, unsyncedKey, meta));
	                break;
	            default:
	                pm.syncLogger.log(new Error(),"Invalid action: " + verb);
	                pm.syncManager._handleServerResponseAfterSendingClientChange(null, null, null, stream);
	                oldThis.sentChanges = _.reject(oldThis.sentChanges, function (obj) {
	                    return obj.key === unsyncedKey
	                });
	                break;
	        }
	    },

	    _handleServerResponseAfterSendingClientChange: function(unsyncedKey, res, realtime, stream) {
	        pm.syncLogger.log(new Error(),["Response after sending data to server: ", res]);
	        pm.syncManager._clearClientChangeIfNeeded(unsyncedKey, realtime, stream, function() {
	            pm.syncManager.updateSinceFromMessage(res);
	        });
	    },

		checkSizeOfFields: function(entity, verb, data) {
			if(entity === "response" && verb==="create") {
				if(data.text && data.text.length > postman_sync_rawtext_limit) {
	        pm.alerts.warning('Response too large. The response body for "'+data.name+'" cannot be synced. The maximum length for the response text is ' + postman_sync_rawtext_limit + ' characters', {
	          timeout: 10000
	        });
	        data.text = "";
					return false;
				}
			}
	        //request fields are not subject to size checks
	        /*
			else if(entity==="request") {
				if(data.rawModeData && data.rawModeData.length > postman_sync_rawtext_limit) {
					noty(
						{
							type:'warning',
							text:'Request data too large. The raw data for "'+data.name+'" cannot be synced. The maximum length for the raw data is ' + postman_sync_rawtext_limit + ' characters',
							layout:'topCenter',
							timeout:5000
						});
	                data.rawModeData = "";
					return false;
				}

				if(data.preRequestScript && data.preRequestScript.length > postman_sync_rawtext_limit) {
					noty(
						{
							type:'warning',
							text:'Request data too large. The pre-request script for "'+data.name+'" cannot be synced. The maximum length for the pre-request script is ' + postman_sync_rawtext_limit + ' characters',
							layout:'topCenter',
							timeout:5000
						});
	                data.preRequestScript = "";
					return false;
				}

				if(data.tests && data.tests.length > postman_sync_rawtext_limit) {
					noty(
						{
							type:'warning',
							text:'Request data too large. The tests for "'+data.name+'" cannot be synced. The maximum length for the test script is ' + postman_sync_rawtext_limit + ' characters',
							layout:'topCenter',
							timeout:5000
						});
	                data.tests = "";
					return false;
				}
			}
	        */

			return true;
		},

	    onChangesetFromOtherWindow: function(entity, verb, data_orig, meta, syncImmediately, addToTop) {
	        if(this.isPrimaryWindow()) {
	            this.addChangeset(entity, verb, data_orig, meta, syncImmediately, addToTop);
	        }
	    },

	    addChangeset: function(entity, verb, data_orig, meta, syncImmediately, addToTop) {
	        if(!this.syncEnabled) return;

	        if(!this.isPrimaryWindow() || pm.isTestRunner) {
	            pm.appWindow.trigger("sendMessageObject", "syncFromMainWindow",
	                entity, verb, data_orig, meta, syncImmediately, addToTop);
	            return;
	        }

	        if(!pm.user.isTeamMember()) {
	            if(verb==="share" || verb==="unshare") {
	                return;
	            }
	        }

	        var data = _.clone(data_orig);
	        //data.timestamp=(new Date()).getTime();
	        if(data!=null) {
	            data.timestamp=new Date(data.timestamp);
	        }

	        var testUserId = (pm.isTesting===true)?'test':'1';
	        var userId = (postman_env==="local")?testUserId:pm.user.id;

	        pm.syncLogger.log(new Error(),["Changeset recorder - entity:",entity," verb:",verb," data:",data]);

	        //Set owner in request and response
	        if((entity==="request" || entity==="response") && !data.owner) {
	            data.owner = pm.collections.getOwnerForCollection(data.collectionId);
	            if(!data.owner || postman_env==="local") {
	                data.owner = userId;
	            }
	        }

	        //Set owner for folder
	        else if((entity==="folder") && !data.owner) {
	            data.owner = pm.collections.getOwnerForCollection(data.collection_id);
	            if(!data.owner || postman_env==="local") {
	                data.owner = userId;
	            }
	        }
	        else if(verb === "create" && !data.owner && postman_env==="local") {
	            data.owner = userId;
	        }

		    //To preserve type of request.data
		    if(entity==="request") {
			    if(data["dataMode"]==="raw" && (typeof data["data"] === "string")) {
				    data["rawModeData"] = data["data"];
				    data["data"] = [];
			    }
	            delete data.responses;
		    }

		    //remove useless header descriptions
	        if(entity==="response") {
	            if(verb==="create") {
	                var numHeaders = (data.headers)?data.headers.length:0;
	                for(var i=0;i<numHeaders;i++) {
	                    data.headers[i].description="";
	                }

	                if(data.responseCode && data.responseCode.detail) {
	                    delete data.responseCode.detail;
	                }
	            }

	            if(data.request && (typeof data.request==="object")) {
	                data.request = data.request.id;

	                //add a reference to the parent folder for a response.
	                //this way, this change will be deleted by deleteChangesetsForFolder()
	                var request = pm.collections.getRequestById(data.request);
	                if(request) {
	                    data.folderId = request.folder;
	                }
	            }

	            if(typeof data.requestObject === "object") {
	                data.requestObject = JSON.stringify(data.requestObject);
	            }
	        }

	        //ensure a method for requests
	        if(entity==="request" && verb==="create") {
	            if(!data.method) {
	                data.method = "GET";
	            }
	        }

		    //set correct collectionid in child entities
	        if((entity==="request" || entity==="response") && verb==="create" && data.hasOwnProperty("collectionId")) {
	            data["collection"]=data["collectionId"];
	            delete data["collectionId"];
	        }

	        if(entity==="request" && data.hasOwnProperty("helperAttributes") && (typeof data.helperAttributes === 'object')) {
	            data.helperAttributes = JSON.stringify(data.helperAttributes);
	        }

	        //if(entity==="request" && data.hasOwnProperty("folder") && !data.folder) {
	        //    delete data.folder;
	        //}

		    if(entity==="request" && verb==="create" && data.hasOwnProperty("folderId") && !data.folder) {
			    data.folder = data.folderId;
		    }

		    //Adding check for SIZE
	        //TODO: Add size check sometime
		    if(this.checkSizeOfFields(entity, verb, data) === false) {
			    console.log("One of the size checks failed. Not syncing");
			    return;
		    }

	        //if((entity==="request" || entity==="response") && verb==="create") {
	        //    data["owner"] = pm.collections.getOwnerForCollection(data_orig.collectionId);
	        //}
	        //---END HACKS

	        //To preserve type of request.data
	        if(entity==="request") {
	            if(data["dataMode"]==="raw" && (typeof data["data"] === "string")) {
	                data["rawModeData"] = data["data"];
	                data["data"] = [];
	            }
	        }

	        if(entity==="folder" && (verb==="create" || verb==="update") && data.hasOwnProperty("collection_id")) {
	            data["collection"]=data["collection_id"];
	            delete data["collection_id"];
	        }

	        if(entity==="collection" && verb==="create") {
	            data["folders"] = [];
	        }


	        if(pm.localChanges.currentUnsynced.length>0 || this.get("syncActive")===false ||
	            syncImmediately===false || this.get("allClientChangesSynced")===false ||
	            verb==="importCollection" || verb==="importFolder") {

	            if(data === null) {
	                data={'id':meta};
	            }
	            //pm.mediator.trigger("addUnsyncedChange",entity, verb, data, meta, false, addToTop);
	            pm.localChanges.onAddUnsyncedChange(entity, verb, data, meta, false, addToTop);

	            //only trigger the timeout if the is the first change in the queue. otherwise it'll automatically be triggered
	            if(verb==="importCollection" ||
	            verb==="importFolder" ||
	            (verb==="create" && (entity==="environment" || entity==="headerpreset")) //entities that have no dependencies
	            ) {
	                setTimeout(function() {
	                    if(pm.localChanges.currentUnsynced.length <= 2) {
	                        pm.mediator.trigger("commitTransaction", data.id);
	                    }
	                }, 500);
	            }

	        }
	        else {
	            if(data==null) {
	                data={'id':meta};
	            }

	            var oldThis = this;

	            try {
	                //NOT adding to unsynced...screw it
	                var unsyncedChangeKey = pm.localChanges.getUnsyncedChangeId(entity, verb, data, meta);
	                var unsyncedKey = unsyncedChangeKey.entityKey;
	                if(this.changesetErrorCounts[verb+":"+unsyncedKey]>2) {
	                    //console.log("Not syncing same change again");
	                    //do not send the same changeset consecutively
	                    clearTimeout(this.changesetErrorTimeouts[verb+":"+unsyncedKey]);
	                    this.changesetErrorTimeouts[verb+":"+unsyncedKey] = setTimeout(function(v,u) {
	                        return function() {
	                            delete oldThis.changesetErrorCounts[v+":"+u];
	                        }
	                    }(verb,unsyncedKey), 1500);
	                    pm.syncLogger.debug("Throttling client change ", verb+":"+unsyncedKey);
	                    return;
	                }

	                if(this.changesetAttemptCounts[verb+":"+unsyncedKey]>2) {
	                    //console.log("Not syncing same change again");

	                    clearTimeout(this.changesetAttemptTimeouts[verb+":"+unsyncedKey]);
	                    this.changesetAttemptTimeouts[verb+":"+unsyncedKey] = setTimeout(function(v,u) {
	                        return function() {
	                            delete oldThis.changesetAttemptCounts[v+":"+u];
	                        }
	                    }(verb,unsyncedKey), 500);
	                    pm.syncLogger.debug("Throttling client change ", verb+":"+unsyncedKey);
	                    return;
	                }

	                if(verb!=="importCollection" && verb!=="importFolder") {
	                    this.sentChanges.push({
	                        key: unsyncedChangeKey.entityKey,
	                        changeset: {
	                            entity: entity,
	                            verb: verb,
	                            data: data,
	                            meta: meta
	                        }
	                    });
	                }

	                //this will never be hit
	                if(verb==="importCollection" || verb==="importFolder") {
	                    pm.mediator.trigger("addUnsyncedChange",entity, verb, data, meta, false, addToTop);
	                    this.set("allClientChangesSynced", false); //hail mary
	                }

	                clearInterval(this.retrySentChangesInterval);
	                var oldThis = this;
	                this.retrySentChangesInterval = setInterval(function() {
	                    oldThis.retrySentChanges();
	                },this.retryChangesTime);

	                this._syncClientChangeToServer(verb, entity, data, meta, false, unsyncedChangeKey.stream, unsyncedChangeKey.entityKey);
	            }
	            catch(e) {
	                pm.syncLogger.error("SyncClientChangeToServer threw error. That means the socket wasnt connected properly. Adding to unsynced");
	                //will be synced when connection is reestablished
	            }
	        }
	    },

	    addAllRetryChangesToUnsynced: function() {
	        while(this.sentChanges.length>0) {
	            var thisChange = this.sentChanges[0].changeset;
	            pm.mediator.trigger("addUnsyncedChange",thisChange.entity, thisChange.verb, thisChange.data, thisChange.meta, true);
	            this.sentChanges.splice(0,1);
	        }
	    },

	    retrySentChanges: function() {
	        var oldThis = this;
	        if(this.lastKeyCount > 3) {
	            //add each to unsynced and clear timeout
	            var numChanges = this.sentChanges.length;
	            if(this.sentChanges.length > 0) {
	                var thisChange = this.sentChanges[0].changeset;
	                pm.mediator.trigger("addUnsyncedChange",thisChange.entity, thisChange.verb, thisChange.data, thisChange.meta, true);
	                //pm.mediator.trigger("beginUnsyncedStream", false, null, false);
	                //force sync here
	                pm.alerts.error('Oops. We\'re having trouble syncing your changes. Try a force sync (<i>Settings > Sync > Force Sync</i>).', {
	                  dedupeId: "sync-force-error",
	                  showAsHtml: true
	                });
	                this.sentChanges.splice(0,1);
	                console.log("Tried to send a changset 3 times..adding to unsynced changes");
	            }
	            this.lastKeyCount = 0;
	            clearInterval(this.retrySentChangesInterval);
	            this.retrySentChangesInterval = setInterval(function() {
	                oldThis.retrySentChanges();
	            },this.retryChangesTime);
	        }
	        else if(this.sentChanges.length > 0) {
	            var changeKey = this.sentChanges[0].key;
	            var thisChange = this.sentChanges[0].changeset;
	            console.log("Resending: " + changeKey);
	            if(this.lastKeyTried === changeKey) {
	                this.lastKeyCount++;
	            }
	            else {
	                this.lastKeyCount = 0;
	            }
	            this.lastKeyTried = changeKey;

	            this._syncClientChangeToServer(thisChange.verb, thisChange.entity, thisChange.data, thisChange.meta, true, null, changeKey);
	            clearInterval(this.retrySentChangesInterval);
	            this.retrySentChangesInterval = setInterval(function() {
	                oldThis.retrySentChanges();
	            },20000);
	            return;
	        }
	        else {
	            clearInterval(this.retrySentChangesInterval);
	        }
	    },

	    saveGlobals: function(newGlobals) {
	        pm.globals.saveGlobals(newGlobals, false);
	    },

	    mergeEntitiesForUpdate: function (newO, oldO) {
	        var ret = {};
	        ret["id"]=newO.id;
	        ret["owner"]=newO.owner;
	        for(key in oldO) {
	            if((newO[key]!=oldO[key]) && (JSON.stringify(newO[key])!=JSON.stringify(oldO[key]))) {
	                ret[key]=newO[key];
	            }
	        }
	        //add all new keys. Like helperAttributes!!
	        for(key in newO) {
	            if(!oldO.hasOwnProperty(key)) {
	                ret[key] = newO[key];
	            }
	        }

	        return ret;
	    },

	    makeRequest: function(method, url, data, headers, callback) {
	        if(!method) {
	            throw "Method must be defined";
	        }
	        method = method.toLowerCase();
	        var validMethods = ['get','post','put','delete'];
	        if(validMethods.indexOf(method)===-1) {
	            throw "Method must be one of get/post/put/delete";
	        }

	        if(!headers) {
	            headers = {};
	        }
	        this.addUserAgent(headers);

	        pm.syncSocket.request({
	            method: method,
	            url: url,
	            data: data,
	            headers: headers
	        }, function(res) {
	            callback(res);
	        });
	    }
	});

	module.exports = SyncManagerNew;


/***/ },

/***/ 217:
/***/ function(module, exports) {

	var SubscriptionHandler = Backbone.Model.extend({
		initialize: function() {
			//--Sync listeners---
			this.loadSubscriptions();
			this.subscribedTo = [];
			this.collectionSidebarTimeouts = {};
			pm.mediator.on("syncChangeReceived", this.onSyncChangeReceived, this);
			pm.mediator.on("unsubscribeFromCollection", this.unsubscribeFromCollectionWithOptSync, this);
			pm.mediator.on("unsuccessfulUnsubscribe", this.onUnsuccessfulUnsubscribe, this);
			pm.mediator.on("alreadySubscribed", this.onAlreadySubscribed, this);
		},

		isSubscribedTo: function(subsId) {
			var inCollectionList = (_.map(pm.collections.models, "id").indexOf(subsId)!==-1);
			var index = this.subscribedTo.indexOf(subsId);
			if(index===-1) {
				return false;
			}
			if(!inCollectionList) {
				this.subscribedTo.splice(index, 1);
				this.trigger('change');
				return false;
			}
			return true;
		},

		onAlreadySubscribed: function(id) {
			if(this.subscribedTo.indexOf(id)===-1) {
				this.subscribedTo.push(id);
				this.trigger('change');
			}
		},

		clearSubscriptions: function() {
			this.subscribedTo = [];
			this.trigger('change');
		},

		loadSubscriptions: function() {
			var oldThis = this;
			pm.indexedDB.subscriptions.getAllSubscriptions(function(subs) {
				_.map(subs, function(sub) {
					oldThis.subscribedTo.push(sub.id);
					oldThis.trigger('change');
				});
			});
		},

		//Sync handlers
		onSyncChangeReceived: function(verb, message, callback) {
			if(verb !== "subscribe" && verb !== "unsubscribe") {
				return;
			}

			if(message.data.owner === pm.user.id) {
				//someone else subscribed to this collection. No action needed here
				if(typeof callback === "function") {
					callback();
				}
				return;
			}

			var orgs = pm.user.get("organizations");
			if(!orgs || orgs.length <= 0) {
				//Teams are not enabled
				if(typeof callback === "function") {
					callback();
				}
				return;
			}
			try {
				var oldThis = this;
				if (verb === "subscribe") {
					if (message.data && message.data.hasOwnProperty("user") && message.data.user != pm.user.id) {
						//someone else subscribed to my collection
						//do nothing
						if (typeof callback === "function") {
							callback();
						}
					} else {
						this.subscribeToCollectionWithOptSync(message, false, function (alreadySubscribed) {
							//pm.mediator.trigger("subscribedToCollection", message.data.model_id);
							// if (alreadySubscribed !== true) {
								//not required - we get the whole collection in one call
								//pm.syncManager.getFoldersForObject(message.data, message.data.owner, true);
								//pm.syncManager.getRequestsForObject(message.data, message.data.owner, message.data.id, "collection");
							// }
							if (typeof callback === "function") {
								callback();
							}
						});
					}
				} else if (verb === "unsubscribe") {
					if (message.data && message.data.hasOwnProperty("user") && message.data.user != pm.user.id) {
						//someone else subscribed to my collection
						//do nothing
						//console.log(pm.syncLogger.getLogDate() + " - " +"Someone unsubscribed from my collection");
						if (typeof callback === "function") {
							callback();
						}
					} else {
						this.unsubscribeFromCollectionWithOptSync(message, false, function () {
							//pm.mediator.trigger("unsubscribedFromCollection", message.data.model_id);
							if (typeof callback === "function") {
								callback();
							}
						});
					}
				} else {
					pm.syncLogger.error("Unknown Subs change: " + verb);
					if(typeof callback === "function") {
						callback();
					}
				}
			} catch(e) {
				pm.syncLogger.error("Error in saving Subs change: " + e.message);
				if(typeof callback === "function") {
					callback();
				}
			}
		},

		onUnsuccessfulUnsubscribe: function(res) {
			var id = res;
			if (res.data && res.data.model_id) {
				id = res.data.model_id;
			}
	        pm.collections.deleteCollectionFromDataStoreWithOptSync(id, true, false, function() {});
	        pm.indexedDB.subscriptions.deleteSubscription(id, function(){});

	        var subsIdx = this.subscribedTo.indexOf(id);
			if (subsIdx !== -1) {
				this.subscribedTo.splice(subsIdx, 1);
				this.trigger('change');
			}
		},

		unsubscribeFromCollectionWithOptSync: function(message, toSync, callback) {
			//var subsId = message.owner + ":" + message.collectionId;
			var subsId = message.data.model_id || message.model_id

			var oldThis = this;
			if(this.isSubscribedTo(subsId)) {
				pm.indexedDB.subscriptions.deleteSubscription(subsId, function () {

					if (toSync) {
						//if the notif has come due to an action from this app, message.owner won't be there. but that's ok because toSync = false
						pm.syncManager.addChangeset("collection", "unsubscribe", {owner: message.owner}, subsId, true);
					}

					var subsIdx = oldThis.subscribedTo.indexOf(subsId);
					if (subsIdx !== -1) {
						oldThis.subscribedTo.splice(subsIdx, 1);
						oldThis.trigger('change');
					}

					var status = pm.collections.deleteCollectionFromDataStoreWithOptSync(subsId, true, false, function() {});

					if(typeof callback === "function") {
						callback();
					}
				});
			} else {
				//not subscribed - just delete
				var status = pm.collections.deleteCollectionFromDataStoreWithOptSync(subsId, true, false, function() {});

				if(typeof callback === "function") {
					callback();
				}
			}

			//call callback regardless
			pm.syncManager.updateSinceFromMessage(message);
		},

		subscribeToCollectionWithOptSync: function(wholeMessage, toSync, callback) {
			var message = wholeMessage.data;
			var oldThis = this;
			//add subscription data to DB
			var subscription = {
				//id: message.owner+":"+message.id,
				id: (message.id || message.model_id),
				userId: wholeMessage.meta.owner || message.owner,
				collectionId: (message.id || message.model_id)
			};
			//console.log("Subscribing to collection: " + message.name);
			if(this.isSubscribedTo(subscription.id)) {
				console.log(pm.syncLogger.getLogDate() + " - " +"Already subscribed to collection with id: " + subscription.id);
				pm.mediator.trigger("databaseOperationComplete");
				pm.mediator.trigger('syncOperationDone');
				if(typeof callback === "function") {
					callback(true);
				}
				pm.syncManager.updateSinceFromMessage(wholeMessage);
				return;
			}
			var status = pm.indexedDB.subscriptions.addSubscription(subscription, function(subscription) {
				//create a collection from the message, and add it
				//once it's added, look the the folder field and order field, and get requests
				setTimeout(function() {
					pm.syncManager.makeRequest('get',
					 "/"+postman_sync_api_version+"/collection/"+subscription.id+"?owner="+subscription.userId+"&populate=true&changeset=true",
					 null, null, function(msg) {
		                pm.syncManager._handleNewSyncResponse(msg, true);
		            });
				}, 1000);


				//Old API. Now we get the whole collection at once
				/*var newCollection = {
					id: message.id,
					name: message.name,
					description: message.description,
					owner: message.owner,
					order: message.order || [],
					write: message.write,
					subscribed: true,
					justSubscribed: true,
					createdAt: message.createdAt,
					updatedAt: message.updatedAt
				};

				pm.collections.addFullCollection(newCollection, true, callback);*/

				if(typeof callback === "function") {
					callback();
				}

				if(toSync) {
					pm.syncManager.addChangeset("collection", "subscribe", {owner: message.owner}, message.id, true);
				}

				pm.mediator.trigger("addedSubscription"); //TODO: This should add a sinceId of 0 for this subscription
				oldThis.subscribedTo.push(subscription.id);
				oldThis.trigger('change');
			});

			if(status===-1) {
				pm.mediator.trigger('syncOperationFailed', 'Adding db subscription failed');
			} else {
				pm.syncManager.updateSinceFromMessage(wholeMessage);
			}
		},

		subscribeToCollection: function(collectionId, ownerId) {
			pm.syncManager.addChangeset("collection", "subscribe", {
				collectionId: collectionId,
				owner: ownerId
			}, collectionId, true);
		}
	});

	module.exports = SubscriptionHandler;


/***/ },

/***/ 218:
/***/ function(module, exports) {

	var SyncStatusNotif = Backbone.View.extend({

		initialize: function() {
			var model = this.model;
			var view = this;
	        this.syncErrorTimer = null;
	        this.syncError2Timer = null;
	        this.iconClickTimer = null;

	        this.tooltipText = {
	            "offline": "You appear to be offline. Make sure you are logged in and check your internet connection.",
	            "connecting": "Connecting to the Postman server.... If you are not able to connect, try restaring the app.",
	            "syncing": "Syncing your data",
	            "insync": "In Sync"
	        };

			model.on("change:loggedIn", this.onChangeStatus, this);
	        model.on("syncFinished", this.makeInSync, this);
	        model.on("syncStarting", this.makeSyncing, this);
	        model.on("makeConnecting", this.makeConnecting, this);
	        model.on("makeNotConnected", this.makeNotConnected, this);
	        model.on("disabledSync", this.makeDisabled, this);

	        model.on("change:lastTimestamp", this.updateInsyncTooltip, this);
	        model.on("clickSyncIcon", this.onIconClick, this);

			pm.mediator.on("setSync", this.setSync, this);

	        pm.mediator.on("showStatus:notConnected", function() {
	            this.makeNotConnected(true);
	        }, this);

			this.$icon = $("#sync-status-icon");
			this.$text = $("#sync-status-text");

	        $("#sync-status-dropdown").css('visibility', 'hidden');

	        this.defaultStateTimeout = setTimeout(function() {
	            if(pm.user.get("syncEnabled")) {
	                view.makeNotConnected(true);
	            }
	            else {
	                view.makeDisabled();
	            }
	        }, 400);

	        $("#force-sync-by-user").click(function() {
	            pm.tracker.trackEvent("sync", "force");
	            model.startForceSync();
	        });

	        $("#open-sync-settings").click(function() {
	            $('#modal-settings').modal('show');
	            $('#modal-settings a[href="#settings-sync"]').tab('show');
	        });

	        $("#retry-sync-connection").click(function() {
	            model.set("loggingIn",false);
	            model.set("reconnectTimeout", 5000);
	            model.signIn();
	        });

	        $("#sync-status-icon").click(function() {
	            view.onIconClick();
	        });

	/*        $("#sync-status-dropdowner").tooltip({
	            title: view.getSyncTooltip
	        });*/
		},

	    onIconClick: function() {
	        var oldThis = this;
	        if(oldThis.iconClickTimer) {
	            return;
	        }
	        //only if disabled is not shown
	        if(pm.syncManager.isPrimaryWindow()) {
	            if($("#sync-status-dropdown").css('visibility')!=='visible') {
	                /*$('#modal-settings').modal('show');
	                $('#modal-settings a[href="#settings-sync"]').tab('show');*/
	                //if in sync, sync again
	                if(oldThis.currentStatus==="insync") {
	                    pm.syncManager.requestInitialSync();
	                }
	                else if(!pm.syncManager.get("connectingToSocket")) {// if(oldThis.currentStatus==="not-connected") {
	                    clearTimeout(oldThis.defaultStateTimeout);
	                    oldThis.makeNotConnected();
	                    pm.syncManager.set("csrfReceived", false);
	                    pm.syncManager.createSocket();
	                }
	                //else: already connecting. do nothing
	            }
	        }
	        else {
	            pm.appWindow.trigger("sendMessageObject", "sync.clickSyncIcon");
	        }

	        oldThis.iconClickTimer = setTimeout(function() {
	            clearTimeout(oldThis.iconClickTimer);
	            oldThis.iconClickTimer = null;
	        }, 5000);
	    },

	    getSyncTooltip: function() {
	        var date = new Date(pm.syncManager.get("lastTimestamp")*1000);
	        var dateFormat = '{Weekday}, {12hr}:{mm}{TT}'; //Monday, 5:30PM
	        var dateLabel = date.relative(function(value, unit, ms, loc) {
	            if (ms.abs() > (2).day()) {
	                // Returns an absolute date, but only if the offset is greater than 2 dayS.
	                return "Last synced: " + dateFormat;
	            }
	            else if (ms.abs() > (1).day()) {
	                return 'Last synced yesterday';
	            }
	            else if(ms.abs() > (6).hours()) {
	                return "Last synced: " + date.hoursAgo() + " hours ago";
	            }
	            else if(ms.abs() > (1).hours()) {
	                return "Last synced over an hour ago";
	            }
	            else if(ms.abs() > (1).minute()) {
	                return "Last synced: " + date.minutesAgo() + " minutes ago";
	            }
	            else {
	                return 'Last synced less than a minute ago';
	            }
	        });
	        return dateLabel;
	    },

	    getConnectingTooltip: function() {
	        return this.tooltipText["connecting"] + pm.syncManager.secondsTillReconnectLabel;
	    },

		setSync: function(syncEnabled) {
	        var model = this.model;
			if(syncEnabled) {
				$("#sync-status").show();
				//this.onIconClick();
			}
			else {
	            //model.trigger("disabledSync");
			}
		},

		onChangeStatus: function() {
			if(this.model.get("loggedIn")===true) {
	            if(this.model.get("syncFinished")===true) {
				    this.makeInSync();
	            }
	            else {
	                this.makeSyncing();
	            }
	            //show force sync section
	            $("#force-sync-section").show();
			}
			else {
				this.makeDisabled();
	            //hide force sync section
	            $("#force-sync-section").hide();
			}
		},

		makeInSync: function() {
			this.$icon.removeClass("notInSync").removeClass("syncDisabled").removeClass("syncing").addClass("inSync");
			this.$text.addClass("in-sync").text("In Sync");
	        clearTimeout(this.syncErrorTimer);
	        clearTimeout(this.syncError2Timer);
	        clearTimeout(pm.syncManager.syncStartingTimer);
	        clearTimeout(pm.syncManager.syncFinishedTimer);
	        $(".sync-connection-error").remove(); //to remove the noty notifs
	        pm.syncManager.syncStartingTimer = null;
	        pm.syncManager.syncFinishedTimer = null;
	        var view = this;
	        $("#sync-status-dropdown").css('visibility','hidden');
	        $("#sync-status-dropdowner").tooltip('destroy').removeAttr('data-original-title').tooltip({
	            title: _.bind(view.getSyncTooltip, view)
	        });
	        this.currentStatus = "insync";
	        //$(".ss-always,.ss-insync").show();
		},

	    makeConnecting: function() {
	        var view  = this;
	        this.$icon.removeClass("inSync").removeClass("syncDisabled").addClass("syncing").removeClass("notInSync");
	        this.$text.removeClass("in-sync").text("Connecting");
	        $("#sync-status-dropdown").css('visibility','hidden');
	        $("#sync-status-dropdowner").tooltip('destroy').removeAttr('data-original-title').tooltip({
	            title: _.bind(view.getConnectingTooltip, view)
	        });
	        this.currentStatus = "connecting";
	        //$(".ss-always,.ss-connecting").show();
	    },

	    makeNotConnected: function(viewOnly) {
	        if(typeof viewOnly === "undefined") {
	            viewOnly = false;
	        }

	        var view  = this;
	        this.$icon.removeClass("inSync").removeClass("syncDisabled").removeClass("syncing").addClass("notInSync");
	        this.$text.addClass("in-sync").text("Offline");
	        $("#sync-status-dropdown").css('visibility','hidden');
	        $("#sync-status-dropdowner").tooltip('destroy').removeAttr('data-original-title').tooltip({
	            title: 'Click to reconnect'
	        });
	        this.currentStatus = "not-connected";
	        if(!viewOnly) {
	            pm.syncManager.set("connectingToSocket", false);
	            pm.syncManager.set("socketConnected", false);
	        }
	    },

	    makeNotInSync: function() {
	        this.$icon.removeClass("inSync").removeClass("syncDisabled").removeClass("syncing").addClass("notInSync");
	        this.$text.addClass("in-sync").text("Not in sync");
	        clearTimeout(this.syncErrorTimer);
	        clearTimeout(this.syncError2Timer);
	        $("#sync-status-dropdown").css('visibility','hidden');
	        $("#sync-status-dropdowner").attr('data-original-title', this.tooltipText["offline"]).tooltip();
	        this.currentStatus = "offline";
	        //$(".ss-always,.ss-offline").show();
	    },

	    makeSyncing: function() {
	        var view  = this;
	        this.$icon.removeClass("inSync").removeClass("syncDisabled").addClass("syncing").removeClass("notInSync");
	        this.$text.removeClass("in-sync").text("Syncing");
	        clearTimeout(this.syncErrorTimer);
	        clearTimeout(this.syncError2Timer);
	        $("#sync-status-dropdown").css('visibility','hidden');
	        $("#sync-status-dropdowner").attr('data-original-title', this.tooltipText["syncing"]).tooltip();
	        view.currentStatus = "sycning";

	        $(".sync-connection-error").remove(); //to remove the noty notifs
	        //$(".ss-always,.ss-syncing").show();

	        if(pm.syncManager.sendingAllClientData == false) {
	            this.syncError2Timer = setTimeout(function() {
	                if(!($("#modal-conflict-resolver").css('display')=="block")) {
	                    if(pm.syncManager.sentInitialSyncRequest === true) {
	                        //the response for the initial sync request was not received
	                        //ask to reload the app
	                        pm.alerts.warning('Oops! There was a problem communicating with the Sync server. Try restarting the app.', {
	                          persist: true,
	                          dedupeId: 'sync-connection-error'
	                        });
	                        pm.syncManager.sentInitialSyncRequest = false;
	                        return;
	                    }
	                    pm.mediator.trigger("beginUnsyncedStream", false, null, true, true);
	                }
	            },100000);
	            this.syncErrorTimer = setTimeout(function() {
	                view.handleOverdueUnsyncedChanges();
	            },300000);
	        }
	    },

	    makeDisabled: function() {
	        this.$icon.removeClass("inSync").removeClass("syncing").addClass("syncDisabled");
	        this.$text.addClass("in-sync").text("Sync Off");
	        clearTimeout(this.syncErrorTimer);
	        clearTimeout(this.syncError2Timer);
	        $("#sync-status-dropdown").css('visibility','visible');
	        $("#sync-status-dropdowner").attr('data-original-title', "").tooltip('destroy');
	        this.currentStatus = "disabled";
	        $(".ss-disabled").show();
	        var error = new Error();
	        if(postman_env==="sync_dev") {
	            console.log("Status changed to disabled: " + error.stack.toString());
	        }
	    },

	    handleOverdueUnsyncedChanges: function() {
	        //if it takes too long, we call force sync
	        this.model.startForceSync();
	    }
	});

	module.exports = SyncStatusNotif;


/***/ },

/***/ 220:
/***/ function(module, exports) {

	var ConflictResolverModal = Backbone.View.extend({
	    initialize: function() {
	        var oldThis = this;
	        var model = this.model;
	        var view = this;
	        this.clearTable();
	        this.rowsShownCount = 0;

	        $("#re-sync-conflicts").click(function() {
	            var radiosToUse = $("#confictResolverTable input[type='radio']:checked");
	            //pm.syncManager.resolveConflicts(radiosToUse);
		        pm.mediator.trigger("conflictsResolved", radiosToUse);
	            $("#modal-conflict-resolver").modal('hide');
	            oldThis.rowsShownCount = 0;
	        });

	        $(".check-all-conflict").change(function() {
	            var val = $(this).val();
	            if(val==="server") {
	                $(".conflictRow[data-showrow=true] input[type=radio][data-which-change=server]").click();
	            }
	            else {
	                $(".conflictRow[data-showrow=true] input[type=radio][data-which-change=local]").click();   
	            }
	        });

	    },

	    clearTable: function() {
	        $("#confictResolverTable>tbody").empty();
	        this.rowsShownCount = 0;
	    },

	    addRow: function(conflictRow) {
	        //delete all old rows with the same id
	        $("tr#conflictRow-"+conflictRow.model+"-"+conflictRow.model_id+"-"+conflictRow.key).remove();

	        $("#confictResolverTable>tbody").append(Handlebars.templates.conflict_resolver_row(conflictRow));
	        $("#"+conflictRow.model+"-"+conflictRow.model_id+"-"+conflictRow.key+"-server").data("change", _.cloneDeep(conflictRow.remoteChange));
	        $("#"+conflictRow.model+"-"+conflictRow.model_id+"-"+conflictRow.key+"-local").data("change", _.cloneDeep(conflictRow.localChange));
	        this.rowsShownCount++;

	        if(conflictRow.showRow === false) {
	            $("tr#conflictRow-"+conflictRow.model+"-"+conflictRow.model_id+"-"+conflictRow.key).hide();
	            this.rowsShownCount--;
	        }
	    },

	    getCount: function() {
	        return $("tr.conflictRow").length;
	    },

	    showModal: function() {
	        $("#modal-conflict-resolver").modal();
	        var numRows = this.rowsShownCount
	        pm.tracker.trackEvent("sync", "conflict");
	    },

	    initializeEditor: function() {
	        if (this.editor) {
	            return;
	        }
	    }
	});

	module.exports = ConflictResolverModal;


/***/ },

/***/ 222:
/***/ function(module, exports) {

	var HistoryRequest = Backbone.Model.extend({
	    defaults: function() {
	        return {
	        };
	    }
	});

	var History = Backbone.Collection.extend({
	    model: HistoryRequest,

	    initialize: function() {
	        var model = this;

	        pm.indexedDB.getAllRequestItems(function (historyRequests) {
	            var outAr = [];
	            var count = historyRequests.length;

	            if (count === 0) {
	                historyRequests = [];
	            }
	            else {
	                for (var i = 0; i < count; i++) {
	                    var r = historyRequests[i];
	                    pm.mediator.trigger("addToURLCache", r.url);

	                    var request = r;
	                    request.position = "top";

	                    outAr.push(request);
	                }
	            }

	            model.add(outAr, {merge: true});
	            if(pm.syncManager) {
	                pm.syncManager.trigger("itemLoaded","history");
	            }
	            pm.mediator.trigger("modelsLoaded", "history");
	        });

		    //--Sync listeners---
		    pm.mediator.on("syncChangeReceived", this.onSyncChangeReceived, this);
	    },

	    requestExists:function (request) {
	        var index = -1;
	        var method = request.method.toLowerCase();

	        if (isMethodWithBody(method)) {
	            return -1;
	        }

	        var requests = this.toJSON();
	        var len = requests.length;

	        for (var i = 0; i < len; i++) {
	            var r = requests[i];
	            if (r.url.length !== request.url.length ||
	                r.headers.length !== request.headers.length ||
	                r.method !== request.method) {
	                index = -1;
	            }
	            else {
	                if (r.url === request.url) {
	                    if (r.headers === request.headers) {
	                        index = i;
	                    }
	                }
	            }

	            if (index >= 0) {
	                break;
	            }
	        }

	        return index;
	    },

	    loadRequest:function (id) {
	        var request = this.get(id).toJSON();
	        // console.log("Load request: ", request);
	        if((pm.settings.getSetting("requestNewTab") ||
	            (pm.settings.getSetting("trackUnsavedRequests") && pm.tabManager.getCurrentTab().get("isTabDirty"))) && !pm.testRunner) {
	            request.id = id;
	            pm.mediator.trigger("loadRequestInNewTab", request);
	        }
	        else {
	            pm.mediator.trigger("loadRequest", request, false, false);
	        }

	        this.trigger("loadRequest");
	    },

	    addSelectedIdsToCollection: function(listOfIds) {
	        var requestArray = [];
	        var history = this;

	        /*Convert History request to collection request*/
	        _.each(listOfIds, function(id) {
	            var request = history.get(id);
	            if(request) {
	                request = request.toJSON();
	                request.helperAttributes = JSON.stringify(request.helperAttributes);
	                request.id = guid(); //New request ID
	                delete request.position;
	                delete request.timestamp;
	                request.name = request.url;
	                request.description = "";
	                request.descriptionFormat = "html";
	                requestArray.push(request);
	            }
	        });

	        pm.mediator.trigger("addRequestsToCollection", requestArray);
	        console.log("Array generated :)");
	    },

	    addRequestFromJSON: function(requestJSON) {
	        var request = JSON.parse(requestJSON);
	        this.addRequestFromRemote(request.url, request.method, request.headers, request.data, request.dataMode, request.preRequestScript, request.pathVariables, request.currentHelper, request.helperAttributes, null, null);
	    },

	    addRequestFromObject: function(request) {
	        return this.addRequest(request.url, request.method, request.headers, request.data, request.dataMode, request.preRequestScript, request.pathVariables, request.currentHelper, request.helperAttributes, null, null);
	    },

	    addRequestFromRemote: function(request) {
	        var id = guid();
	        this.addRequestWithId(
	            id,
	            request.url,
	            request.method,
	            request.headers,
	            request.data,
	            request.dataMode,
	            request.tests,
	            request.prScript,
	            request.pathVariables,
	            request.currentHelper,
	            request.helperAttributes,
	            true,
	            null,
	            null
	        );
	        return id;
	    },

		addRequestWithId: function(id, url, method, headers, data, dataMode, tests, prScript, pathVariables, currentHelper, helperAttributes, fromRemote, timestamp, callback) {
			var maxHistoryCount = pm.settings.getSetting("historyCount");

	    //force infinite history
	    maxHistoryCount = 0;

			var requests = this.toJSON();
			var requestsCount = requests.length;

			var collection = this;

			if(maxHistoryCount > 0) {
				if (requestsCount >= maxHistoryCount) {

					//Delete the last request
					var lastRequest = requests[0];
					this.deleteRequest(lastRequest.id);
				}
			}

	        if(!dataMode) {
	            dataMode = "params";
	        }

			var historyRequest = {
				"id":id,
				"url":url.toString(),
				"method":method.toString(),
				"headers":headers.toString(),
				"data":data,
				"dataMode":dataMode.toString(),
				"tests": tests,
				"preRequestScript": prScript,
	            "currentHelper": currentHelper,
	            "helperAttributes": helperAttributes,
	            "pathVariables": pathVariables,
				"timestamp":timestamp || new Date().getTime(),
				"version": 2
			};

	    var index = this.requestExists(historyRequest);

	    if (index >= 0) {
	        var deletedId = requests[index].id;
	        this.deleteRequest(deletedId);
	    }

			pm.indexedDB.addRequest(historyRequest, function (request) {
					pm.mediator.trigger("addToURLCache", request.url);
	        pm.mediator.trigger("databaseOperationComplete");
					var historyRequestModel = new HistoryRequest(request);
					if(fromRemote===false) {
	            pm.tracker.trackEvent("history", "create");
	            pm.bulkAnalytics.addCurrentEvent("history", "create");
					    pm.syncManager.addChangeset("request","history",historyRequest, null, true);
					}
					historyRequestModel.set("position", "top");
					collection.add(historyRequestModel);
	        if(typeof callback === 'function') {
	            callback();
	        }
			});

	    return 0;

		},

	    addRequest:function (url, method, headers, data, dataMode, tests, prScript, pathVariables, currentHelper, helperAttributes, timestamp, callback) {
		    var id = guid();
		    this.addRequestWithId(id, url, method, headers, data, dataMode, tests, prScript, pathVariables, currentHelper, helperAttributes, false, timestamp, callback);
	      return id;
	    },


	    deleteRequest:function (id) {
	        var collection = this;

	        pm.indexedDB.deleteRequest(id, function (request_id) {
	            collection.remove(request_id);
	            pm.mediator.trigger("databaseOperationComplete");
	        });
	    },

	    clear:function () {
	        var collection = this;
	        pm.indexedDB.deleteHistory(function () {
	            collection.reset([]);
	            pm.mediator.trigger("databaseOperationComplete");
	        });
	    },

	    clearSelected: function(idsToDelete) {
	      for(var i=0;i<idsToDelete.length;i++) {
	          this.deleteRequest(idsToDelete[i]);
	      }
	    },

	    filter: function(term) {
	        var requests = this.toJSON();

	        var count = requests.length;
	        var filteredItems = [];
	        for (var i = 0; i < count; i++) {
	            var id = requests[i].id;
	            var url = requests[i].url;

	            var filteredItem = {
	                id: id,
	                url: url,
	                toShow: false
	            };
	            url = url.toLowerCase();
	            if (url.indexOf(term) >= 0) {
	                filteredItem.toShow = true;
	            }
	            else {
	                filteredItem.toShow = false;
	            }

	            filteredItems.push(filteredItem);
	        }

	        this.trigger("filter", filteredItems);

	        return filteredItems;
	    },

	    revert: function() {
	        this.trigger("revertFilter");
	    },

	    //---Sync----
	    onSyncChangeReceived: function(verb, message, callback) {
	        if(!message.model) message.model = message.type;

	        var allowedTypes = ["history", "request"];
	        if(allowedTypes.indexOf(message.model) === -1) {
	            return;
	        }

	        if(message.model === "request" && verb === "history") {
	            //came from a sails10 app
	            message.model = "history";
	            verb = "create";
	        }
	        else if(message.model === "request" && verb !== "history") {
	            //collections model will handle this
	            return;
	        }

	        try {
	            if (verb === "create") {
	                //pm.syncStatusManager.addNotification("history", message.data, "create");
	                if (message.data.dataMode === "raw") {
	                    message.data.data = message.data.rawModeData;
	                    message.data.rawModeData = "";
	                }
	                if(!message.data.preRequestScript) {
	                    message.data.preRequestScript = "";
	                }
	                if(!message.data.tests) {
	                    message.data.tests = "";
	                }
	                var status = pm.history.addRequestWithId(message.data.id, message.data.url, message.data.method,
	                    message.data.headers, message.data.data, message.data.dataMode,
	                    message.data.tests, message.data.preRequestScript, message.data.pathVariables, message.data.currentHelper, message.data.helperAttributes, true, message.data.updatedAt, callback);
	                if (status == -1) {
	                    pm.mediator.trigger('syncOperationFailed', 'Adding history request failed');
	                }
	                else {
	                    pm.syncManager.updateSinceFromMessage(message);
	                }
	            }
	            else {
	                pm.syncLogger.error("Unknown history verb: " + verb);
	                if(typeof callback === "function") callback();
	            }
	        }
	        catch(e) {
	            pm.syncLogger.error("Error in saving History change: " + e.message);
	            if(typeof callback === "function") callback();
	        }
		}
	});

	module.exports = History;


/***/ },

/***/ 223:
/***/ function(module, exports) {

	var Globals = Backbone.Model.extend({
	    isLoaded: false,
	    initializedSyncing: false,

	    defaults: function() {
	        return {
	            "globals": [],
	            "syncFileID": "postman_globals",
	            "synced": false
	        };
	    },

	    initialize:function () {
	        this.set({"globals": []});
	        this.syncAllGlobalsOnce = true;

	        var model = this;

	        pm.appWindow.trigger("registerInternalEvent", "updatedGlobals", this.onUpdatedGlobals, this);

	        pm.mediator.on("downloadGlobals", this.downloadGlobals, this);

	        this.startListeningForFileSystemSyncEvents();

	        pm.storage.getValue('globals', function(s) {
	            if (s) {
	                model.set({"globals": JSON.parse(s)});
	            }
	            else {
	                model.set({"globals": []});
	            }

	            model.isLoaded = true;
	            model.trigger("startSync");
	            if(pm.syncManager) pm.syncManager.trigger("itemLoaded","globals");
	        });

		    //--Sync listeners---
		    pm.mediator.on("syncChangeReceived", this.onSyncChangeReceived, this);

	        this.set("glbUpdateTimeout", null);
	    },

	    getEnabledValues: function() {
	        var retVal = [];
	        var values = this.get("globals");
	        if(!values) {
	            values = [];
	        }
	        for(i=0;i<values.length;i++) {
	            if(!values[i].hasOwnProperty("enabled") || values[i].enabled==true) {
	                retVal.push(values[i]);
	            }
	        }
	        return retVal;
	    },

	    startListeningForFileSystemSyncEvents: function() {
	        var model = this;
	        var isLoaded = model.isLoaded;
	        var initializedSyncing = model.initializedSyncing;

	        pm.mediator.on("initializedSyncableFileSystem", function() {
	            model.initializedSyncing = true;
	            model.trigger("startSync");
	        });

	        this.on("startSync", this.startSyncing, this);
	    },

	    startSyncing: function() {
	        var i = 0;
	        var model = this;
	        var globals;
	        var syncableFile;

	        if (this.isLoaded && this.initializedSyncing) {
	            pm.mediator.on("addSyncableFileFromRemote", function(type, data) {
	                if (type === "globals") {
	                    model.onReceivingSyncableFileData(data);
	                }
	            });

	            pm.mediator.on("updateSyncableFileFromRemote", function(type, data) {
	                if (type === "globals") {
	                    model.onReceivingSyncableFileData(data);
	                }
	            });

	            pm.mediator.on("deleteSyncableFileFromRemote", function(type, id) {
	                if (type === "globals") {
	                    model.onRemoveSyncableFile(id);
	                }
	            });
	        }
	    },

	    onReceivingSyncableFileData: function(data) {
	        var globals = JSON.parse(data);
	        this.mergeGlobals(globals, false, true, function() {});
	    },

	    onRemoveSyncableFile: function(id) {
	        // console.log("Do nothing");
	        // this.deleteEnvironment(id, true);
	    },

	    getAsSyncableFile: function(id) {
	        var name = id + ".globals";
	        var type = "globals";
	        var data = JSON.stringify(this.get("globals"));

	        return {
	            "name": name,
	            "type": type,
	            "data": data
	        };
	    },

	    addToSyncableFilesystem: function(id) {
	        var model = this;

	        var syncableFile = this.getAsSyncableFile(id);

	        pm.mediator.trigger("addSyncableFile", syncableFile, function(result) {
	            if(result === "success") {
	                // model.updateGlobalSyncStatus(id, true);
	            }
	        });
	    },

	    removeFromSyncableFilesystem: function(id) {
	        var name = id + ".globals";
	        pm.mediator.trigger("removeSyncableFile", name, function(result) {
	            model.saveGlobals([], false);
	        });
	    },

	    onUpdatedGlobals: function(globals) {
	        // console.log("Globals: This is ", this);
	        // console.log("Globals are now", globals);
	        this.set({"globals": globals});
	        var model = this;

	        clearTimeout(this.get("glbUpdateTimeout"));
	        this.set("glbUpdateTimeout", setTimeout(function(globals) {
	            return function() {
	                var o = {'globals': JSON.stringify(globals)};
	                pm.storage.setValue(o, function() {
	                    model.addToSyncableFilesystem(model.get("syncFileID"));
	                });
	            }
	        } (globals),1000));
	    },

	    downloadGlobals: function() {
	        var name = "globals.postman_globals";
	        var type = "application/json";

	        globalsJSON = this.get("globals");

	        var filedata = JSON.stringify(globalsJSON, null, '\t');

	        pm.filesystem.saveAndOpenFile(name, filedata, type, function () {
	          pm.alerts.success('Saved');
	        });
	    },

	    mergeGlobals:function (globals, syncToRemote, syncImmediately, callback) {
	        if(!globals) {
	            globals = [];
	        }

	        var model = this;

	        var currentGlobals = this.get("globals");
	        var globalsToSave = [];
	        //this will be an array of kv pairs
	        var numGlobals = currentGlobals.length;
	        for(var i=0;i<numGlobals;i++) {
	            var thisKey = currentGlobals[i].key;
	            //if the same key exists in the current globals array, use this one
	            var elem = _.find(globals, function(globalVar){ return globalVar.key === thisKey});
	            if(elem) {
	                globalsToSave.push(elem);
	            }
	            else {
	                globalsToSave.push(currentGlobals[i]);
	            }
	        }

	        //add the remaining new globals
	        var numNewGlobals = globals.length;
	        for(i=0;i<numNewGlobals;i++) {
	            var elem = _.find(globalsToSave, function(globalVar){return globalVar.key === globals[i].key});
	            if(!elem) {
	                globalsToSave.push(globals[i]);
	            }
	        }

	        this.set({"globals": globalsToSave});

	        var o = {'globals': JSON.stringify(globalsToSave)};

	        if(syncToRemote) {
	            var objectToUpdate = {"globals":globalsToSave};
	            pm.syncManager.addChangeset("user","update",objectToUpdate, null, syncImmediately);
	        }

	        pm.storage.setValue(o, function() {
	            pm.appWindow.trigger("sendMessageObject", "updatedGlobals", globalsToSave);
	            model.addToSyncableFilesystem(model.get("syncFileID"));
		        if(callback) callback();
	        });
	    },

	    clearGlobals: function () {
	        var model = this;

	        this.set({"globals": []});

	        var o = {'globals': JSON.stringify([])};

	        pm.storage.setValue(o, function() {
	            pm.appWindow.trigger("sendMessageObject", "clearedGlobals", []);
	            model.addToSyncableFilesystem(model.get("syncFileID"));
	        });
	    },

	    saveGlobals: function(oldGlobals, syncToRemote) {
	        var numGlobals = oldGlobals.length;
	        var globals = [];
	        var keys = [];
	        var duplicatesFound = false;
	        for(i=0;i<numGlobals;i++) {
	            if(keys.indexOf(oldGlobals[i].key)!==-1) {
	                //key exists. ignore this value, show error
	                duplicatesFound = true;
	            }
	            else {
	                keys.push(oldGlobals[i].key)
	                globals.push(oldGlobals[i]);
	            }
	        }

	        if(duplicatesFound) {
	          pm.alerts.warning('Some duplicate keys were found while saving global variables. These will not be saved.', {
	            timeout: 5000
	          });
	        }


	        this.set({"globals": globals});
	        var o = {'globals': JSON.stringify(globals)};

	        if(syncToRemote && !pm.isTestRunner) {
	            var objectToUpdate = {"globals":globals};
	            if(this.globalSyncTimeout) {
	                clearTimeout(this.globalSyncTimeout);
	            }
	            this.globalSyncTimeout = setTimeout(function() {
	                pm.syncManager.addChangeset("user","update",objectToUpdate, null, true);
	            }, 1000);
	        }


	        pm.storage.setValue(o, function() {
	            pm.appWindow.trigger("sendMessageObject", "updatedGlobals", globals);
	        });
	    },


		//Sync
		onSyncChangeReceived: function(verb, message, callback) {
			var allowedTypes = ["user"];
			if(!message.model) message.model = message.type;
			if(allowedTypes.indexOf(message.model) === -1) {
				return;
			}
	        try {
	            if (verb === "update") {
	                if (message.data.hasOwnProperty("globals")) {
	                    this.mergeGlobals(message.data.globals, false, false, callback);

	                    //to update global values. only done during the first sync
	                    if(this.syncAllGlobalsOnce === true) {
	                        this.syncAllGlobalsOnce = false;
	                        setTimeout(function () {
	                            pm.storage.getValue('globals', function (gs) {
	                                var objectToUpdate = {"globals": JSON.parse(gs)};
	                                pm.syncManager.addChangeset("user", "update", objectToUpdate, null, true);
	                            });
	                        }, 4000);
	                    }
	                }
	                pm.syncLogger.log(new Error(), ["User updated: (name=updated) ", message.data]);
	            }
	            else {
	                pm.syncLogger.error("Unknown action for user: " + verb);
	                if(typeof callback === "function") callback();
	            }
	        }
	        catch(e) {
	            pm.syncLogger.error("Error in Saving user change: " + e.message);
	            if(typeof callback === "function") callback();
	        }
	    }
	});

	module.exports = Globals;


/***/ },

/***/ 224:
/***/ function(module, exports, __webpack_require__) {

	var Environment = __webpack_require__(11);

	var Environments = Backbone.Collection.extend({
	    model: Environment,

	    isLoaded: false,
	    initializedSyncing: false,

	    comparator: function(a, b) {
	        var counter;

	        var aName = a.get("name");
	        var bName = b.get("name");

	        if(!aName) {
	            aName = "";
	            a.set("name", "");
	        }

	        if(!bName) {
	            bName = "";
	            b.set("name", "");
	        }

	        if (aName.length > bName.length)
	            counter = bName.length;
	        else
	            counter = aName.length;

	        for (var i = 0; i < counter; i++) {
	            if (aName[i] == bName[i]) {
	                continue;
	            } else if (aName[i] > bName[i]) {
	                return 1;
	            } else {
	                return -1;
	            }
	        }
	        return 1;
	    },

	    initialize:function () {
	        var collection = this;

	        // TODO Events for in-memory updates
	        pm.appWindow.trigger("registerInternalEvent", "addedEnvironment", this.onAddedEnvironment, this);
	        pm.appWindow.trigger("registerInternalEvent", "updatedEnvironment", this.onUpdatedEnvironment, this);
	        pm.appWindow.trigger("registerInternalEvent", "deletedEnvironment", this.onDeletedEnvironment, this);

	        this.startListeningForFileSystemSyncEvents();

	        pm.indexedDB.environments.getAllEnvironments(function (environments) {
	            environments.sort(sortAlphabetical);
	            collection.add(environments, {merge: true});

	            collection.isLoaded = true;
	            collection.trigger("startSync");
	            if(pm.syncManager) pm.syncManager.trigger("itemLoaded","environments");
	            pm.mediator.trigger("modelsLoaded", "environment");
	            collection.trigger("loadedEnvironments");
	            pm.mediator.trigger("loadedEnvironments");
	        });

		    //--Sync listeners---
		    pm.mediator.on("syncChangeReceived", this.onSyncChangeReceived, this);

	        this["envUpdateTimeout"] = null;
	    },

	    // Functions for internal app window messaging
	    onAddedEnvironment: function(environment) {
	        this.add(environment, { merge: true });
	    },

	    onUpdatedEnvironment: function(environment) {
	        this.add(environment, { merge: true });
	        clearTimeout(this["envUpdateTimeout"]);
	        this["envUpdateTimeout"] = setTimeout(function(environment) {
	            return function() {
	                pm.indexedDB.environments.updateEnvironment(environment, function () {
	                    pm.mediator.trigger("databaseOperationComplete");
	                    //pm.syncManager.addChangeset("environment","update",environment, null, true);
	                });
	            }
	        } (environment), 1000);
	    },

	    onDeletedEnvironment: function(id) {
	        this.remove(id);
	    },

	    startListeningForFileSystemSyncEvents: function() {
	        var collection = this;
	        var isLoaded = collection.isLoaded;
	        var initializedSyncing = collection.initializedSyncing;

	        pm.mediator.on("initializedSyncableFileSystem", function() {
	            collection.initializedSyncing = true;
	            collection.trigger("startSync");
	        });

	        this.on("startSync", this.startSyncing, this);
	    },

	    startSyncing: function() {
	        var i = 0;
	        var collection = this;
	        var environment;
	        var synced;
	        var syncableFile;

	        if (this.isLoaded && this.initializedSyncing) {
	            pm.mediator.on("addSyncableFileFromRemote", function(type, data) {
	                if (type === "environment") {
	                    collection.onReceivingSyncableFileData(data);
	                }
	            });

	            pm.mediator.on("updateSyncableFileFromRemote", function(type, data) {
	                if (type === "environment") {
	                    collection.onReceivingSyncableFileData(data);
	                }
	            });

	            pm.mediator.on("deleteSyncableFileFromRemote", function(type, id) {
	                if (type === "environment") {
	                    collection.onRemoveSyncableFile(id);
	                }
	            });

	            // And this
	            for(i = 0; i < this.models.length; i++) {
	                environment = this.models[i];
	                synced = environment.get("synced");

	                if (!synced) {
	                    this.addToSyncableFilesystem(environment.get("id"));
	                }
	            }
	        }
	        else {
	        }
	    },

	    onReceivingSyncableFileData: function(data) {
	        this.importEnvironment(data, true);
	    },

	    onRemoveSyncableFile: function(id) {
	        this.deleteEnvironment(id, true);
	    },

	    getAsSyncableFile: function(id) {
	        var environment = this.get(id);
	        var name = id + ".environment";
	        var type = "environment";
	        var data = JSON.stringify(environment.toSyncableJSON());

	        return {
	            "name": name,
	            "type": type,
	            "data": data
	        };
	    },

	    addToSyncableFilesystem: function(id) {
	        var collection = this;

	        var syncableFile = this.getAsSyncableFile(id);
	        pm.mediator.trigger("addSyncableFile", syncableFile, function(result) {
	            if(result === "success") {
	                collection.updateEnvironmentSyncStatus(id, true);
	            }
	        });
	    },

	    removeFromSyncableFilesystem: function(id) {
	        var name = id + ".environment";
	        pm.mediator.trigger("removeSyncableFile", name, function(result) {
	        });
	    },

	    //this will be called in the syncmanager, when an event is received from the server
	    addFullEnvironment: function(env, callback) {
	        var name = env.name;
	        var values = env.values;
	        try {
	            this.addEnvironment(env.id, name, values, true, callback);
	        }
	        catch(e) {
	            console.log("Adding environment failed: "+e);
	            return -1;
	        }
	        return 0;
	    },

	    addEnvironmentWithoutId: function(name, values, doNotSync) {
	        var id = guid();
	        this.addEnvironment(id, name, values, doNotSync);
	    },

	    addEnvironment:function (id, name, values, doNotSync, callback) {
	        var collection = this;

	        if(!name || name.trim()=="") {
	            name = "New Environment";
	        }

	        var environment = {
	            id:id,
	            name:name,
	            values:values,
	            timestamp:new Date().getTime(),
	            synced: false
	        };

	        var envModel = new Environment(environment);
	        collection.add(envModel);

	        if(!doNotSync) {
	            pm.appWindow.trigger("sendMessageObject", "addedEnvironment", environment);
	        }

	        pm.indexedDB.environments.addEnvironment(environment, function () {
	            pm.mediator.trigger("databaseOperationComplete");
		        pm.mediator.trigger('syncOperationDone');
	            if (doNotSync) {
	                //console.log("Do not sync this change");
	            }
	            else {
	                pm.tracker.trackEvent("environment", "create", "new");
	                pm.syncManager.addChangeset("environment","create",environment, null, true);
	                pm.bulkAnalytics.addCurrentEvent("environment", "create", "new");
	                collection.addToSyncableFilesystem(environment.id);
	            }

		        if(callback) callback();

	        });
	    },

	    updateRemoteEnvironment: function(newEnv, callback) {
	        try {
	          this.updateEnvironment(newEnv.id, newEnv.name, newEnv.values, true, callback);
	        }
	        catch(e) {
	            console.log("Updating environment failed: "+e);
	            return -1;
	        }
	        return 0;
	    },

	    updateEnvironment:function (id, name, values, doNotSync, callback) {
	        var collection = this;

	        var environment = {
	            id:id,
	            name:name,
	            values:values,
	            timestamp:new Date().getTime()
	        };

	        var envModel = new Environment(environment);
	        collection.add(envModel, {merge: true});

	        pm.indexedDB.environments.updateEnvironment(environment, function () {
		        pm.mediator.trigger('syncOperationDone');
	            pm.mediator.trigger("databaseOperationComplete");
	            if (doNotSync || pm.isTestRunner) {
	                // console.log("Do not sync this change");
	            }
	            else {
	                pm.appWindow.trigger("sendMessageObject", "updatedEnvironment", environment);
	                if(collection.envSyncTimeout) {
	                    clearTimeout(collection.envSyncTimeout);
	                }
	                collection.envSyncTimeout = setTimeout(function() {
	                    pm.syncManager.addChangeset("environment","update",environment, null, true);
	                }, 500);
	                collection.addToSyncableFilesystem(environment.id);
	            }

		        if(callback) callback();
	        });
	    },

	    clearEnvironment: function(id, name) {
	        var collection = this;
	        var environment = {
	            id:id,
	            name:name,
	            values:[],
	            timestamp:new Date().getTime()
	        };
	        var envModel = new Environment(environment);
	        collection.add(envModel, {merge: true});

	        pm.indexedDB.environments.updateEnvironment(environment, function () {
	            pm.appWindow.trigger("sendMessageObject", "clearedEnvironment", environment);
	        });
	    },

	    updateEnvironmentSyncStatus: function(id, status) {
	        var collection = this;

	        var environment = this.get(id);
	        environment.set("synced", status);
	        collection.add(environment, {merge: true});
	        pm.appWindow.trigger("sendMessageObject", "updatedEnvironment", environment);

	        pm.indexedDB.environments.updateEnvironment(environment.toJSON(), function () {
	            pm.mediator.trigger("databaseOperationComplete");
	        });
	    },

	    deleteRemoteEnvironment: function(environmentId, callback) {
	        try {
	            this.deleteEnvironment(environmentId, true, callback);
	        }
	        catch(e) {
	            console.log("Deleting environment failed: "+e);
	            return -1;
	        }
	        return 0;
	    },

	    deleteEnvironment:function (id, doNotSync, callback) {
	        var collection = this;

	        pm.indexedDB.environments.deleteEnvironment(id, function () {
	            collection.remove(id);
	            pm.mediator.trigger("databaseOperationComplete");
		        pm.mediator.trigger('syncOperationDone');

	            if (doNotSync) {
	                // console.log("Do not sync this");
	            }
	            else {
	                pm.appWindow.trigger("sendMessageObject", "deletedEnvironment", id);
	                pm.syncManager.addChangeset("environment","destroy",null, id, true);
	                collection.removeFromSyncableFilesystem(id);
	            }

		        if(callback) callback();
	        });
	    },



	    downloadEnvironment:function (id) {
	        var environment = this.get(id);

	        environment.set("synced", false);

	        var name = environment.get("name") + ".postman_environment";
	        pm.tracker.trackEvent("environment", "download");
	        var type = "application/json";
	        var filedata = JSON.stringify(environment.toJSON(), null, '\t');
	        pm.filesystem.saveAndOpenFile(name, filedata, type, function () {
	          pm.alerts.success('Saved');
	        });
	    },

	    duplicateEnvironment:function (id) {
	        var oldEnvironment = this.get(id).toJSON();
	        var environment = _.clone(oldEnvironment);
	        environment.name = environment.name + " " + "copy";
	        environment.id = guid();

	        var collection = this;
	        pm.tracker.trackEvent("environment", "create", "duplicate");

	        pm.indexedDB.environments.addEnvironment(environment, function () {
	            var envModel = new Environment(environment);
	            collection.add(envModel);
	            pm.mediator.trigger("databaseOperationComplete");
	            pm.syncManager.addChangeset("environment","create",environment, null, true);
	            pm.bulkAnalytics.addCurrentEvent("environment", "create", "duplicate");
	            pm.appWindow.trigger("sendMessageObject", "addedEnvironment", environment);
	            collection.addToSyncableFilesystem(environment.id);
	        });
	    },

	    importEnvironment: function(data, doNotSync) {
	        var collection = this;
			    var environment = data;
		    try {
	            //could be a parsed object as well
	            if(typeof data === "string") {
	                environment = JSON.parse(data);
	            }
	        }
	        catch(err) {
	            pm.alerts.error('Could not import. File is not a valid JSON file.');
	        }

	        if(!environment.id || environment.id.trim() === "") {
	            environment.id = guid();
	        }

	        if(!environment.name || environment.name.trim() === "") {
	            environment.name = "New Environment";
	        }

	        pm.indexedDB.environments.addEnvironment(environment, function () {
	            var envModel = new Environment(environment);
	            collection.add(envModel, {merge: true});

	            pm.syncManager.addChangeset("environment", "create", environment, null, false);
	            pm.bulkAnalytics.addCurrentEvent("environment", "create", "new");
	            pm.mediator.trigger("databaseOperationComplete");
	            if (!doNotSync) {
	                pm.appWindow.trigger("sendMessageObject", "updatedEnvironment", environment);
	                collection.trigger("importedEnvironment", environment);
	                collection.addToSyncableFilesystem(environment.id);
	            }

	        });
	    },

	    importEnvironments:function (files) {
	        var collection = this;

	        // Loop through the FileList
	        for (var i = 0, f; f = files[i]; i++) {
	            var reader = new FileReader();

	            // Closure to capture the file information.
	            reader.onload = (function (theFile) {
	                return function (e) {
	                    // Render thumbnail.
	                    collection.importEnvironment(e.currentTarget.result);
	                };
	            })(f);

	            // Read in the image file as a data URL.
	            reader.readAsText(f);
	        }
	    },

	    mergeEnvironments: function(environments) {
	        var size = environments.length;
	        var collection = this;

	        function onUpdateEnvironment(environment) {
	            var envModel = new Environment(environment);
	            collection.add(envModel, {merge: true});
	            pm.mediator.trigger("sendMessageObject", "updatedEnvironment", environment);
	            pm.syncManager.addChangeset("environment","update",environment, null, true);
	            pm.mediator.trigger("databaseOperationComplete");
	            collection.addToSyncableFilesystem(environment.id);
	        }

	        for(var i = 0; i < size; i++) {
	            var environment = environments[i];
	            collection.importEnvironment(environment);
	            //Why is this updating??
	            //pm.indexedDB.environments.updateEnvironment(environment, onUpdateEnvironment);
	        }
	    },

	    resyncEnvironmentId: function(id, syncImmediately) {
	        if(typeof syncImmediately === "undefined") {
	            syncImmediately = true;
	        }
	        var collection = this;
	        var env = collection.get(id);
	        if(!env) {
	            return false;
	        }

	        env = env.toJSON();

	        pm.syncManager.addChangeset("environment","create",env, null, syncImmediately, true);
	        return true;
	    },


		//---Sync----
		onSyncChangeReceived: function(verb, message, callback) {
			if(!message.model) message.model = message.type;

			var allowedTypes = ["environment"];
			if(allowedTypes.indexOf(message.model) === -1) {
				return;
			}
	        try {
	            if (verb === "create") {
	                if (this.get(message.data.id)) {
	                    this.updateRemoteEntity(message, callback);
	                }
	                else {
	                    this.createRemoteEntity(message, callback);
	                }
	            }
	            else if (verb === "update") {
	                this.updateRemoteEntity(message, callback);
	            }
	            else if (verb === "destroy" || verb === "delete") {
	                this.deleteRemoteEntity(message, callback);
	            }
	            else {
	                pm.syncLogger.error("Unknown action for env: " + verb);
	                if(typeof callback === "function") callback();
	            }
	        }
	        catch(e) {
	            pm.syncLogger.error("Error in Saving env change: " + e.message);
	            if(typeof callback === "function") callback();
	        }
			//else if()
		},

		createRemoteEntity: function(message, callback) {
			if(message.model === "environment") {
				//pm.syncStatusManager.addNotification("environment",message.data, "create");
				var status = pm.environments.addFullEnvironment(message.data, callback);
				if(status==-1) {
					pm.mediator.trigger('syncOperationFailed', "Adding full environment failed");
				}
				else {
					pm.syncManager.updateSinceFromMessage(message);
				}
				pm.syncLogger.log(new Error(),["Environment created: ",message.data]);
			}
		},

		updateRemoteEntity: function(message, callback) {
			if(message.model === "environment") {
				//pm.syncStatusManager.addNotification("environment",message.data, "update");
				var status = pm.environments.updateRemoteEnvironment(message.data, callback);
				if(status==-1) {
					pm.mediator.trigger('syncOperationFailed', "Updating remote environment failed");
				}
				else {
					pm.syncManager.updateSinceFromMessage(message);
				}
				pm.syncLogger.log(new Error(),["Environment updated: ", message.data]);
			}
		},

		deleteRemoteEntity: function(message, callback) {
			if(message.model === "environment") {
				pm.syncLogger.log(new Error(),["Environment destroyed: ",message.data]);
				var status = pm.environments.deleteRemoteEnvironment(message.data.id, callback);
				if(status==-1) {
					pm.mediator.trigger('syncOperationFailed', "Deleting remote env failed");
				}
				else {
					pm.syncManager.updateSinceFromMessage(message);
				}
			}
		}
	});

	module.exports = Environments;


/***/ },

/***/ 225:
/***/ function(module, exports) {

	var VariableProcessor = Backbone.Model.extend({
	    defaults: function() {
	        return {
	            environments: null,
	            globals: null,
	            externalDataVariables: [],
	            functions: {},
	            selectedEnv:null,
	            selectedEnvironmentId:""
	        };
	    },

	    initialize: function() {
	        this.get("environments").on("reset", this.setCurrentEnvironment, this);
	        this.get("environments").on("change", this.setCurrentEnvironment, this);
	        this.get("environments").on("add", this.setCurrentEnvironment, this);
	        this.get("environments").on("remove", this.setCurrentEnvironment, this);

	        this.set("selectedEnvironmentId", pm.settings.getSetting("selectedEnvironmentId"));
	        this.set("selectedEnv", this.get("environments").get(pm.settings.getSetting("selectedEnvironmentId")));

	        pm.mediator.on("setEnvironmentVariable", this.setEnvironmentVariable, this);
	        pm.mediator.on("setGlobalVariable", this.setGlobalVariable, this);
	        pm.mediator.on("clearEnvironmentVariables", this.clearEnvironmentVariables, this);
	        pm.mediator.on("clearGlobalVariables", this.clearGlobalVariables, this);
	        pm.mediator.on("clearEnvironmentVariable", this.clearEnvironmentVariable, this);
	        pm.mediator.on("clearGlobalVariable", this.clearGlobalVariable, this);

	        this.initializeFunctions();
	    },

	    setGlobalVariable: function(v) {
	        var targetKey = v.key;
	        var targetValue = v.value + '';

	        var variableProcessor = this.get("variableProcessor");
	        var globals = this.get("globals");
	        var globalValues = _.clone(globals.get("globals"));
	        if(!globalValues) globalValues = [];

	        var count = globalValues.length;
	        var value;

	        var found = false;

	        for(var i = 0; i < count; i++) {
	            value = globalValues[i];
	            if (value.key === targetKey) {
	                found = true;
	                value.value = targetValue;
	                break;
	            }
	        }

	        if (!found) {
	            globalValues.push({
	                "key": targetKey,
	                "type": "text",
	                "value": targetValue
	            });
	        }

	        globals.saveGlobals(globalValues, true);

	        if(this.get("setGlobalsTimeout")) {
	            clearTimeout(this.get("setGlobalsTimeout"));
	        }
	        this.set("setGlobalsTimeout",setTimeout(function() {
	            globals.trigger("change:globals");
	        },100));
	    },

	    setEnvironmentVariable: function(v) {
	        var targetKey = v.key;
	        var targetValue = v.value + '';

	        var variableProcessor = this;
	        var environments = this.get("environments");
	        var selectedEnv = this.get("selectedEnv");
	        var found = false;

	        if (selectedEnv) {
	            var values = _.clone(selectedEnv.get("values"));
	            if(!values) values = [];

	            var count = values.length;
	            for(var i = 0; i < count; i++) {
	                value = values[i];
	                if (value.key === targetKey) {
	                    found = true;
	                    value.value = targetValue;
	                    break;
	                }
	            }

	            if (!found) {
	                values.push({
	                    "key": targetKey,
	                    "type": "text",
	                    "value": targetValue
	                });
	            }

	            var id = selectedEnv.get("id");
	            var name = selectedEnv.get("name");

	            environments.updateEnvironment(id, name, values);

	            // TODO For random reasons, selectedEnv is getting updated
	            var newEnvironment = environments.get(id);
	            this.setEnvironment(newEnvironment);
	        }
	    },

	    clearEnvironmentVariables: function() {
	        var variableProcessor = this;
	        var environments = this.get("environments");
	        var selectedEnv = this.get("selectedEnv");
	        var found = false;

	        if (selectedEnv) {
	            var id = selectedEnv.get("id");
	            var name = selectedEnv.get("name");

	            environments.clearEnvironment(id, name);

	            // TODO For random reasons, selectedEnv is getting updated
	            var newEnvironment = environments.get(id);
	            this.setEnvironment(newEnvironment);
	        }
	    },

	    clearEnvironmentVariable: function(targetKey) {
	        var variableProcessor = this;
	        var environments = this.get("environments");
	        var selectedEnv = this.get("selectedEnv");
	        var found = false;

	        if (selectedEnv) {
	            var values = _.clone(selectedEnv.get("values"));
	            if(!values) values = [];
	            var newValues = [];

	            var count = values.length;
	            for(var i = 0; i < count; i++) {
	                value = values[i];
	                if (value.key !== targetKey.key) {
	                    newValues.push(value);
	                }
	            }

	            var id = selectedEnv.get("id");
	            var name = selectedEnv.get("name");

	            environments.updateEnvironment(id, name, newValues);

	            // TODO For random reasons, selectedEnv is getting updated
	            var newEnvironment = environments.get(id);
	            this.setEnvironment(newEnvironment);
	        }
	    },

	    clearGlobalVariables: function() {
	        var variableProcessor = this.get("variableProcessor");
	        var globals = this.get("globals");
	        var globalValues = [];
	        globals.saveGlobals(globalValues);
	        globals.trigger("change:globals");
	    },

	    clearGlobalVariable: function(targetKey) {
	        var variableProcessor = this.get("variableProcessor");
	        var globals = this.get("globals");
	        var globalValues = _.clone(globals.get("globals"));
	        if(!globalValues) globalValues = [];

	        var count = globalValues.length;
	        var value;
	        var newValues = [];

	        var found = false;

	        for(var i = 0; i < count; i++) {
	            value = globalValues[i];
	            if (value.key !== targetKey.key) {
	                newValues.push(value);
	            }
	        }

	        globals.saveGlobals(newValues, true);

	        if(this.get("setGlobalsTimeout")) {
	            clearTimeout(this.get("setGlobalsTimeout"));
	        }
	        this.set("setGlobalsTimeout",setTimeout(function() {
	            globals.trigger("change:globals");
	        },100));
	    },

	    setExternalDataVariables: function(kvpairs) {
	        var vars = [];
	        for(key in kvpairs) {
	            if (kvpairs.hasOwnProperty(key)) {
	                vars.push({
	                    "key": key,
	                    "value": kvpairs[key],
	                    "type": "text"
	                });
	            }
	        }

	        this.set("externalDataVariables", vars);
	    },

	    initializeFunctions: function() {
	        var functions = {
	            "\\$guid": {
	                key: "$guid",
	                run: function() {
	                    return guid();
	                }
	            },

	            "\\$timestamp": {
	                key: "$timestamp",
	                run: function() {
	                    return Math.round(new Date().getTime() / 1000);
	                }
	            },

	            "\\$randomInt": {
	                key: "$randomInt",
	                run: function(min, max) {
	                    if (!min) min = 0;
	                    if (!max) max = 1000;
	                    return getRandomInt(min, max);
	                }
	            },

	            "\\$random [0-9]+,[0-9]+": {
	                key: "$randomInt",
	                run: function(min, max) {
	                    if (!min) min = 0;
	                    if (!max) max = 1000;

	                    return getRandomArbitrary(min, max);
	                }
	            }
	        };

	        this.set("functions", functions);
	    },

	    setCurrentEnvironment: function() {
	        this.set("selectedEnvironmentId", pm.settings.getSetting("selectedEnvironmentId"));
	        this.set("selectedEnv", this.get("environments").get(pm.settings.getSetting("selectedEnvironmentId")));
	    },

	    setEnvironment: function(environment) {
	        this.set("selectedEnvironmentId", environment.get("id"));
	        this.set("selectedEnv", environment);
	    },

	    disableEnvironment: function() {
	        this.set("selectedEnvironmentId", "");
	        this.set("selectedEnv", null);
	    },

	    setGlobals: function(globalsArray) {
	        var globals = this.get("globals");
	        globals.set("globals", globalsArray);
	    },

	    containsVariable:function (string, values) {
	        var variableDelimiter = pm.settings.getSetting("variableDelimiter");
	        var startDelimiter = variableDelimiter.substring(0, 2);
	        var endDelimiter = variableDelimiter.substring(variableDelimiter.length - 2);
	        var patString = startDelimiter + "[^\r\n]*" + endDelimiter;

	        var pattern = new RegExp(patString, 'g');
	        var matches = string.match(pattern);
	        var count = values.length;
	        var variable;

	        if(matches === null) {
	            return false;
	        }

	        for(var i = 0; i < count; i++) {

	            if (values[i].type === "function") {
	                variable = startDelimiter + values[i].matcher + endDelimiter;
	            }
	            else if(values[i].type === "text") {
	                variable = startDelimiter + values[i].key + endDelimiter;
	            }
	            //to account for the kveditor bug - saving globals w/o type
	            else if(!values[i].hasOwnProperty("type") && values[i].hasOwnProperty("key")) {
	                variable = startDelimiter + values[i].key + endDelimiter;
	            }

	            //what does this do?
	            //matches is an array
	            if(_.indexOf(matches, variable) >= 0) {
	                return true;
	            }

	            if(matches instanceof Array) {
	                if(matches[0].indexOf(variable) >=0 ) {
	                    return true;
	                }
	            }
	        }

	        return false;
	    },

		processString:function (string, values, iterationCount) {
	        if (!values) return string;
	        if(typeof iterationCount === "undefined") {
	            iterationCount = 0;
	        }
	        if(iterationCount > 20) { //to prevent infinite recursion
	            return string;
	        }

	        var count = values.length;
	        var finalString = _.clone(string);
	        var patString;
	        var pattern;


	        var variableDelimiter = pm.settings.getSetting("variableDelimiter");
	        var startDelimiter = variableDelimiter.substring(0, 2);
	        var endDelimiter = variableDelimiter.substring(variableDelimiter.length - 2);
	        try {
	            for (var i = 0; i < count; i++) {
	                patString = startDelimiter + values[i].key + endDelimiter;
	                pattern = new RegExp(patString, 'g');
	                var valToUse = _.clone(values[i].value);
	                //TODO: required because of zendesk ticket #163
	                if(valToUse === null) {
	                    //error condition
	                    //console.log("For this variable (key="+values[i].key+"), value is null. Not substituting...");
	                    valToUse = "";
	                }

	                if(typeof valToUse === "object") {
	                    if(typeof valToUse["run"] !== "function") {
	                        //valToUse is an object, but doesn't have a .run field
	                        //not substituting
	                        continue;
	                    }
	                    else {
	                        var result = valToUse.run();
	                        finalString = finalString.replace(pattern, result);
	                    }
	                }
	                else {
	                    valToUse += ""; //force to string
	                    var ampersandPattern = new RegExp("\\$",'g');
	                    valToUse = valToUse.replace(ampersandPattern, "$$$$");
	                    finalString = finalString.replace(pattern,valToUse);
	                }
	            }
	        }
	        catch(e) {
	            console.log(e);
	            finalString = string;
	        }

	        if (this.containsVariable(finalString, values)) {
	            finalString = this.processString(finalString, values, iterationCount+1);
	            return finalString;
	        }
	        else {
	            return finalString;
	        }
	    },

	    getCurrentValue: function(string) {
	        if (typeof string === "number") {
	            return string;
	        }

	        if(string == null) {
	            return "";
	        }

	        var envModel = this.get("selectedEnv");
	        var envValues = [];

	        if (envModel) {
	            envValues = envModel.getEnabledValues();
	        }

	        var globals = this.get("globals").getEnabledValues();
	        var values = [];

	        var valueMap = {};

	        if (globals) {
	            for(var i=0;i<globals.length;i++) {
	                if(globals[i].hasOwnProperty("enabled") && globals[i].enabled==false) {
	                    //reject this value
	                }
	                else {
	                    valueMap[globals[i].key] = globals[i];
	                }
	            }
	        }

	        for(i=0;i<envValues.length;i++) {
	            valueMap[envValues[i].key] = envValues[i];
	        }

	        var externalDataVariables = this.get("externalDataVariables");

	        if (externalDataVariables) {
	            for (i = 0; i < externalDataVariables.length; i++) {
	                valueMap[externalDataVariables[i].key] = externalDataVariables[i];
	            }
	        }


	        var functions = this.get("functions");
	        var fs = [];
	        for(f in functions) {
	            if(functions.hasOwnProperty(f)) {
	                var kvpair = {
	                    "key": f,
	                    "matcher": functions[f].key,
	                    "value": functions[f],
	                    "type": "function"
	                };

	                valueMap[f] = kvpair;
	            }
	        }

	        values = _.values(valueMap);

	        if (string) {
	            var finalString = _.clone(this.processString(string, values, 0));

	            return finalString;
	        }
	        else {
	            return string;
	        }

	    }
	});

	module.exports = VariableProcessor;


/***/ },

/***/ 229:
/***/ function(module, exports) {

	var AppState = Backbone.Model.extend({
	    defaults: function() {
	        return {
	        	variableProcessor:null,
	            isModalOpen:false,
	            activeModal: ""
	        };
	    }
	});

	module.exports = AppState;


/***/ },

/***/ 231:
/***/ function(module, exports) {

	module.exports = require("ipc");

/***/ },

/***/ 233:
/***/ function(module, exports) {

	module.exports = require("remote");

/***/ },

/***/ 234:
/***/ function(module, exports) {

	var HeaderPreset = Backbone.Model.extend({
	    defaults: function() {
	        return {
	            "id": "",
	            "name": "",
	            "headers": [],
	            "timestamp": 0,
	            "synced": false
	        };
	    },

	    toSyncableJSON: function() {
	        var j = this.toJSON();
	        j.synced = true;
	        return j;
	    }
	});

	var HeaderPresets = Backbone.Collection.extend({
	    model: HeaderPreset,

	    isLoaded: false,
	    initializedSyncing: false,
	    syncFileType: "header_preset",

	    comparator: function(a, b) {
	        var counter;

	        var aName = a.get("name");
	        var bName = b.get("name");

	        if (aName.length > bName.length)
	            counter = bName.length;
	        else
	            counter = aName.length;

	        for (var i = 0; i < counter; i++) {
	            if (aName[i] == bName[i]) {
	                continue;
	            } else if (aName[i] > bName[i]) {
	                return 1;
	            } else {
	                return -1;
	            }
	        }
	        return 1;
	    },

	    presetsForAutoComplete:[],

	    initialize:function () {
	        this.on("change", this.refreshAutoCompleteList, this);
	        this.loadPresets();

	        //--Sync listeners---
	        pm.mediator.on("syncChangeReceived", this.onSyncChangeReceived, this);

	        pm.appWindow.trigger("registerInternalEvent", "addedHeaderPreset", this.onAddedPreset, this);
	        pm.appWindow.trigger("registerInternalEvent", "updatedHeaderPreset", this.onUpdatedPreset, this);
	        pm.appWindow.trigger("registerInternalEvent", "deletedHeaderPreset", this.onDeletedPreset, this);
	    },

	    // Initialize all models
	    loadPresets:function () {
	        var collection = this;

	        this.startListeningForFileSystemSyncEvents();

	        pm.indexedDB.headerPresets.getAllHeaderPresets(function (items) {
	            collection.add(items, {merge: true});
	            collection.refreshAutoCompleteList();

	            collection.isLoaded = true;
	            collection.trigger("startSync");
	        });
	    },

	    onAddedPreset: function(preset) {
	        this.add(preset, {merge: true});
	    },

	    onUpdatedPreset: function(preset) {
	        this.add(preset, {merge: true});
	    },

	    onDeletedPreset: function(id) {
	        this.remove(id);
	    },

	    startListeningForFileSystemSyncEvents: function() {
	        var collection = this;
	        var isLoaded = collection.isLoaded;
	        var initializedSyncing = collection.initializedSyncing;

	        pm.mediator.on("initializedSyncableFileSystem", function() {
	            collection.initializedSyncing = true;
	            collection.trigger("startSync");
	        });

	        this.on("startSync", this.startSyncing, this);
	    },

	    startSyncing: function() {
	        var i = 0;
	        var collection = this;
	        var headerPreset;
	        var synced;
	        var syncableFile;

	        if (this.isLoaded && this.initializedSyncing) {
	            pm.mediator.on("addSyncableFileFromRemote", function(type, data) {
	                if (type === collection.syncFileType) {
	                    collection.onReceivingSyncableFileData(data);
	                }
	            });

	            pm.mediator.on("updateSyncableFileFromRemote", function(type, data) {
	                if (type === collection.syncFileType) {
	                    collection.onReceivingSyncableFileData(data);
	                }
	            });

	            pm.mediator.on("deleteSyncableFileFromRemote", function(type, id) {
	                if (type === collection.syncFileType) {
	                    collection.onRemoveSyncableFile(id);
	                }
	            });

	            // And this
	            for(i = 0; i < this.models.length; i++) {
	                headerPreset = this.models[i];
	                synced = headerPreset.get("synced");

	                if (!synced) {
	                    this.addToSyncableFilesystem(headerPreset.get("id"));
	                }
	            }
	        }
	        else {
	        }
	    },

	    onReceivingSyncableFileData: function(data) {
	        this.mergeHeaderPreset(JSON.parse(data), true);
	    },

	    onRemoveSyncableFile: function(id) {
	        this.deleteHeaderPreset(id, true);
	    },

	    getAsSyncableFile: function(id) {
	        var collection = this;
	        var headerPreset = this.get(id);
	        var name = id + "." + collection.syncFileType;
	        var type = collection.syncFileType;
	        var data = JSON.stringify(headerPreset.toSyncableJSON());

	        return {
	            "name": name,
	            "type": type,
	            "data": data
	        };
	    },

	    addToSyncableFilesystem: function(id) {
	        var collection = this;

	        var syncableFile = this.getAsSyncableFile(id);
	        pm.mediator.trigger("addSyncableFile", syncableFile, function(result) {
	            if(result === "success") {
	                collection.updateHeaderPresetSyncStatus(id, true);
	            }
	        });
	    },

	    removeFromSyncableFilesystem: function(id) {
	        var collection = this;

	        var name = id + "." + collection.syncFileType;
	        pm.mediator.trigger("removeSyncableFile", name, function(result) {
	        });
	    },

	    // Iterate through models
	    getHeaderPreset:function (id) {
	        var presets = this.models;
	        var preset;
	        for (var i = 0, count = presets.length; i < count; i++) {
	            preset = presets[i];
	            if (preset.get("id") === id) {
	                break;
	            }
	        }

	        return preset;
	    },

	    // Add to models
	    addHeaderPreset:function (id, name, headers, doNotSync) {
	        this.addHeaderPresetWithOptSync(id, name, headers, doNotSync, true);
	    },

	    addHeaderPresetWithOptSync: function (id, name, headers, doNotSync, toSync) {
	        if(id===0) id = guid();

	        var headerPreset = {
	            "id":id,
	            "name":name,
	            "headers":headers,
	            "timestamp":new Date().getTime()
	        };

	        var headerPresets = this;

	        pm.indexedDB.headerPresets.addHeaderPreset(headerPreset, function () {
	            headerPresets.add(headerPreset, {merge: true});
	            pm.mediator.trigger("databaseOperationComplete");
	            if (!doNotSync) {
	                headerPresets.addToSyncableFilesystem(id);
	            }
	            if(toSync) {
	                pm.tracker.trackEvent("headerpreset", "create");
	                pm.syncManager.addChangeset("headerpreset","create",headerPreset, null, true);
	                pm.appWindow.trigger("sendMessageObject", "addedHeaderPreset", headerPreset);
	            }
	        });
	    },

	    // Update local model
	    editHeaderPreset:function (id, name, headers, doNotSync) {
	       this.editHeaderPresetWithOptSync(id, name, headers, doNotSync, true);
	    },

	    editHeaderPresetWithOptSync:function (id, name, headers, doNotSync, toSync) {
	        var collection = this;

	        pm.indexedDB.headerPresets.getHeaderPreset(id, function (preset) {
	            var headerPreset = {
	                "id":id,
	                "name":name,
	                "headers":headers,
	                "timestamp":preset.timestamp
	            };

	            pm.indexedDB.headerPresets.updateHeaderPreset(headerPreset, function () {
	                collection.add(headerPreset, {merge: true});
	                pm.mediator.trigger("databaseOperationComplete");
	                if (!doNotSync) {
	                    collection.addToSyncableFilesystem(id);
	                }
	                if(toSync) {
	                    pm.syncManager.addChangeset("headerpreset","update",headerPreset, null, true);
	                    pm.appWindow.trigger("sendMessageObject", "updatedHeaderPreset", headerPreset);
	                }
	            });
	        });
	    },

	    updateHeaderPresetSyncStatus: function(id, status) {
	        var collection = this;

	        var headerPreset = this.get(id);
	        headerPreset.set("synced", status);
	        collection.add(headerPreset, {merge: true});

	        pm.indexedDB.headerPresets.updateHeaderPreset(headerPreset.toJSON(), function () {
	            pm.mediator.trigger("databaseOperationComplete");
	        });
	    },

	    // Remove from local model
	    deleteHeaderPreset:function (id, doNotSync) {
	        this.deleteHeaderPresetWithOptSync(id, doNotSync, true);
	    },

	    deleteHeaderPresetWithOptSync:function (id, doNotSync, toSync) {
	        var collection = this;

	        pm.indexedDB.headerPresets.deleteHeaderPreset(id, function () {
	            collection.remove(id);

	            if (!doNotSync) {
	                collection.removeFromSyncableFilesystem(id);
	            }

	            if(toSync) {
	                pm.syncManager.addChangeset("headerpreset","destroy",null, id, true);
	                pm.appWindow.trigger("sendMessageObject", "deletedHeaderPreset", id);
	            }
	        });
	    },

	    getPresetsForAutoComplete:function () {
	        var list = [];
	        var presets = this.toJSON();

	        for (var i = 0, count = presets.length; i < count; i++) {
	            var preset = presets[i];
	            var item = {
	                "id":preset.id,
	                "type":"preset",
	                "label":preset.name,
	                "category":"Header presets"
	            };

	            list.push(item);
	        }

	        list = _.union(list, allowedChromeHeaders);
	        list = _.union(list, restrictedChromeHeaders);

	        return list;
	    },

	    refreshAutoCompleteList:function () {
	        var presets = this.getPresetsForAutoComplete();
	        this.presetsForAutoComplete = presets;
	    },

	    mergeHeaderPreset: function(preset, doNotSync) {
	        var collection = this;

	        pm.indexedDB.headerPresets.addHeaderPreset(preset, function(headerPreset) {
	            collection.add(headerPreset, {merge: true});
	            pm.mediator.trigger("databaseOperationComplete");
	            pm.syncManager.addChangeset("headerpreset", "create", headerPreset, null, false);
	            if (!doNotSync) {
	                collection.addToSyncableFilesystem(headerPreset.id);
	            }
	        });

	    },

	    mergeHeaderPresets: function(hp) {
	        var size = hp.length;
	        var collection = this;
	        var headerPreset;

	        for(var i = 0; i < size; i++) {
	            headerPreset = hp[i];
	            collection.mergeHeaderPreset(headerPreset);
	        }
	    },

	    //---Sync----
	    onSyncChangeReceived: function(verb, message, callback) {
	        if(!message.model) message.model = message.type;

	        var allowedTypes = ["headerpreset"];
	        if(allowedTypes.indexOf(message.model) === -1) {
	            return;
	        }
	        try {
	            if (verb === "create") {
	                this.createRemoteEntity(message, callback);
	            }
	            else if (verb === "update") {
	                this.updateRemoteEntity(message, callback);
	            }
	            else if (verb === "destroy" || verb === "delete") {
	                this.deleteRemoteEntity(message, callback);
	            }
	            else {
	                pm.syncLogger.error("unknown headerPreset change: " + verb);
	                if(typeof callback === "function") callback();
	            }
	        }
	        catch(e) {
	            pm.syncLogger.error("Error in Saving headerPreset change: " + e.message);
	            if(typeof callback === "function") callback();
	        }
	        //else if()
	    },

	    createRemoteEntity: function(message, callback) {
	        if(message.model === "headerpreset") {
	            //pm.syncStatusManager.addNotification("HeaderPreset",message.data, "create");
	            var status = pm.headerPresets.addHeaderPresetWithOptSync(message.data.id, message.data.name, message.data.headers, true, false);
	            if(typeof callback === 'function') callback();
	            if(status==-1) {
	                pm.mediator.trigger('syncOperationFailed', 'Adding header preset failed');
	            }
	            else {
	                pm.syncManager.updateSinceFromMessage(message);
	            }
	            pm.syncLogger.log(new Error(),["HeaderPreset created: ",message.data]);
	        }
	    },

	    updateRemoteEntity: function(message, callback) {
	        if(message.model === "headerpreset") {
	            //pm.syncStatusManager.addNotification("environment",message.data, "update");
	            var status = pm.headerPresets.editHeaderPresetWithOptSync(message.data.id, message.data.name, message.data.headers, true, false);

	            //as nothing depends on header presets :P
	            if(typeof callback === 'function') callback();

	            if(status==-1) {
	                pm.mediator.trigger('syncOperationFailed', "Editing header preset failed");
	            }
	            else {
	                pm.syncManager.updateSinceFromMessage(message);
	            }
	            pm.syncLogger.log(new Error(),["HeaderPreset updated: ", message.data]);
	        }
	    },

	    deleteRemoteEntity: function(message, callback) {
	        if(message.model === "headerpreset") {
	            pm.syncLogger.log(new Error(),["HeaderPreset destroyed: ",message.data]);
	            var status = pm.headerPresets.deleteHeaderPresetWithOptSync(message.data.id, true, false);

	            if(typeof callback === 'function') callback();

	            if(status==-1) {
	                pm.mediator.trigger('syncOperationFailed', "Deleting header preset failed");
	            }
	            else {
	                pm.syncManager.updateSinceFromMessage(message);
	            }
	        }
	    }
	});

	module.exports = HeaderPresets;


/***/ },

/***/ 237:
/***/ function(module, exports) {

	var URLCache = Backbone.Model.extend({
	    defaults: function() {
	        return {
	            "urls": []
	        }
	    },

	    initialize: function() {
	        var model = this;

	        pm.mediator.on("addToURLCache", function(url) {
	            model.addUrl(url);
	        });
	    },

	    addUrl:function (url) {
	        var urls = this.get("urls");

	        if ($.inArray(url, urls) === -1) {
	            urls.push(url);
	        }
	    },

	    getUrls: function() {
	        return this.get("urls");
	    }
	});

	module.exports = URLCache;


/***/ },

/***/ 275:
/***/ function(module, exports) {

	var BasicAuthProcessor = Backbone.Model.extend({
	    defaults: function() {
	        return {
	            "username": null,
	            "password": null,
	            "request": null,
	            "saveToRequest": false
	        };
	    },

	    initialize: function() {
	        this.on("change", this.updateDB, this);

	        var model = this;

	        pm.indexedDB.helpers.getHelper("basic", function(helper) {
	            if (helper) {
	                model.set(helper);
	            }
	        });
	    },

	    process: function() {
	        this.processCustomRequest(this.get("request"));
	    },

		processCustomRequest: function(request) {
			request.trigger("updateModel");

			var headers = request.get("headers");
			var authHeaderKey = "Authorization";
			var pos = findPosition(headers, "key", authHeaderKey);

			var username = this.get("username");
			var password = this.get("password");

			username = pm.envManager.getCurrentValue(username);
			password = pm.envManager.getCurrentValue(password);

			var rawString = username + ":" + password;
			var encodedString = "Basic " + window.btoa(unescape(encodeURIComponent(rawString)));

			request.setHeader(authHeaderKey, encodedString);
			request.trigger("customHeaderUpdate");
		},

	    updateDB: function() {
	        var helper = {
	            id: "basic",
	            username: this.get("username"),
	            password: this.get("password"),
	            timestamp: new Date().getTime(),
	            saveToRequest: this.get("saveToRequest")
	        };

	        pm.indexedDB.helpers.addHelper(helper, function(helper) {
	        });
	    }
	});

	module.exports = BasicAuthProcessor;


/***/ },

/***/ 276:
/***/ function(module, exports) {

	var HawkAuthProcessor = Backbone.Model.extend({
	    defaults: function () {
	        return {
	            "hawk_id": null,
	            "hawk_key": null,
	            "algorithm": 'sha256',
	            "user": null,
	            "saveToRequest": false,
	            "nonce": null,
	            "ext": null,
	            "app": null,
	            "dlg": null,
	            "timestamp": null
	        };
	    },

	    initialize: function () {
	        this.on("change", this.updateDB, this);

	        var model = this;

	        pm.indexedDB.helpers.getHelper("hawk", function (helper) {
	            if (helper) {
	                model.set(helper);
	            }
	        });
	    },

	    generateHelper: function () {
	        this.set("nonce", hawk.utils.randomString(6));
	    },

	    process: function () {
	        this.processCustomRequest(this.get("request"));
	        this.generateHelper();
	    },

	    processCustomRequest: function (request) {
	        request.trigger("updateModel");

	        var credentials = {};

	        var headers = request.get("headers");
	        var authHeaderKey = "Authorization";

	        var user = this.get("user");
	        var hawk_id = this.get("hawk_id");
	        var hawk_key = this.get("hawk_key");
	        var algorithm = this.get("algorithm");
	        var nonce = this.get("nonce");
	        var ext = this.get("ext");
	        var app = this.get("app");
	        var dlg = this.get("dlg");
	        var timestamp = this.get("timestamp");

	        user = pm.envManager.getCurrentValue(user);
	        hawk_id = pm.envManager.getCurrentValue(hawk_id);
	        hawk_key = pm.envManager.getCurrentValue(hawk_key);
	        algorithm = pm.envManager.getCurrentValue(algorithm);
	        nonce = pm.envManager.getCurrentValue(nonce);
	        ext = pm.envManager.getCurrentValue(ext);
	        app = pm.envManager.getCurrentValue(app);
	        dlg = pm.envManager.getCurrentValue(dlg);

	        credentials.id = hawk_id;
	        credentials.key = hawk_key;
	        credentials.algorithm = algorithm;

	        var url = pm.envManager.getCurrentValue(request.attributes.url);
	        var options = {
	            credentials: credentials,
	            nonce: nonce,
	            ext: ext,
	            app: app,
	            dlg: dlg,
	            timestamp: timestamp
	        };


	        var res = hawk.client.header(url, request.attributes.method, options);

	        if (res.err) {
	            pm.alerts.error('Hawk auth error: ' + res.err);
	            return;
	        }

	        request.setHeader(authHeaderKey, res.field);
	        request.trigger("customHeaderUpdate");
	    },

	    updateDB: function () {
	        var helper = {
	            id: "hawk",
	            user: this.get("user"),
	            hawk_id: this.get("hawk_id"),
	            hawk_key: this.get("hawk_key"),
	            algorithm: this.get("algorithm"),
	            nonce: this.get("nonce"),
	            ext: this.get("ext"),
	            app: this.get("app"),
	            dlg: this.get("dlg"),
	            timestamp: this.get("timestamp"),
	            saveToRequest: this.get("saveToRequest")
	        };

	        pm.indexedDB.helpers.addHelper(helper, function (helper) {
	        });
	    }
	});

	module.exports = HawkAuthProcessor;


/***/ },

/***/ 277:
/***/ function(module, exports) {

	var DigestAuthProcessor = Backbone.Model.extend({
	    defaults: function() {
	        return {
	            "id": "",
	            "time": 0,
	            "algorithm": "",
	            "username": "",
	            "realm": "",
	            "password": "",
	            "nonce": "",
	            "nonceCount": "",
	            "clientNonce": "",
	            "opaque": "",
	            "qop": "",
	            "request": null,
	            "saveToRequest": false
	        };
	    },

	    initialize: function() {
	        this.on("change", this.updateDB, this);

	        var model = this;

	        pm.indexedDB.helpers.getHelper("digest", function(helper) {
	            if (helper) {
	                model.set(helper);
	            }
	        });
	    },

	    getHeader: function (request) {
	        //var request = this.get("request");
	        request.trigger("updateModel");
	        
	        var algorithm = pm.envManager.getCurrentValue(this.get("algorithm"));

	        var username = pm.envManager.getCurrentValue(this.get("username"));
	        var realm = pm.envManager.getCurrentValue(this.get("realm"));
	        var password = pm.envManager.getCurrentValue(this.get("password"));

	        var method = request.get("method");

	        var nonce = pm.envManager.getCurrentValue(this.get("nonce"));
	        var nonceCount = pm.envManager.getCurrentValue(this.get("nonceCount"));
	        var clientNonce = pm.envManager.getCurrentValue(this.get("clientNonce"));

	        var opaque = pm.envManager.getCurrentValue(this.get("opaque"));
	        var qop = pm.envManager.getCurrentValue(this.get("qop"));
	        var body = request.getRequestBodyPreview();        
	        var url = request.processUrl(request.get("url"));

	        var urlParts = request.splitUrlIntoHostAndPath(url);

	        var digestUri = urlParts.path;

	        var a1;

	        if(algorithm === "MD5-sess") {
	            var a0 = CryptoJS.MD5(username + ":" + realm + ":" + password);
	            a1 = a0 + ":" + nonce + ":" + clientNonce;
	        }
	        else {
	            a1 = username + ":" + realm + ":" + password;
	        }

	        var a2;

	        if(qop === "auth-int") {
	            a2 = method + ":" + digestUri + ":" + body;
	        }
	        else {
	            a2 = method + ":" + digestUri;
	        }


	        var ha1 = CryptoJS.MD5(a1);
	        var ha2 = CryptoJS.MD5(a2);

	        var response;

	        if(qop === "auth-int" || qop === "auth") {
	            response = CryptoJS.MD5(ha1 + ":"
	                + nonce + ":"
	                + nonceCount + ":"
	                + clientNonce + ":"
	                + qop + ":"
	                + ha2);
	        }
	        else {
	            response = CryptoJS.MD5(ha1 + ":" + nonce + ":" + ha2);
	        }

	        var headerVal = " ";
	        headerVal += "username=\"" + username + "\", ";
	        headerVal += "realm=\"" + realm + "\", ";
	        headerVal += "nonce=\"" + nonce + "\", ";
	        headerVal += "uri=\"" + digestUri + "\", ";

	        if(qop === "auth" || qop === "auth-int") {
	            headerVal += "qop=" + qop + ", ";
	        }

	        if(qop === "auth" || qop === "auth-int" || algorithm === "MD5-sess") {
	            headerVal += "nc=" + nonceCount + ", ";
	            headerVal += "cnonce=\"" + clientNonce + "\", ";
	        }

	        headerVal += "response=\"" + response + "\", ";
	        headerVal += "opaque=\"" + opaque + "\"";

	        return headerVal;
	    },

		process: function() {
			var request = this.get("request");
			this.processCustomRequest(request);
		},

	    processCustomRequest: function (request) {
	        var headers = request.get("headers");
	        var authHeaderKey = "Authorization";

	        //Generate digest header here
	        var algorithm = $("#request-helper-digestAuth-realm").val();
	        var headerVal = this.getHeader(request);
	        headerVal = "Digest" + headerVal;

	        request.setHeader(authHeaderKey, headerVal);
	        request.trigger("customHeaderUpdate");
	    },

	    updateDB: function() {
	        var h = {
	            id: "digest",
	            time: new Date().getTime(),
	            realm: this.get("realm"),
	            username: this.get("username"),
	            password: this.get("password"),
	            nonce: this.get("nonce"),
	            algorithm: this.get("algorithm"),
	            nonceCount: this.get("nonceCount"),
	            clientNonce: this.get("clientNonce"),
	            opaque: this.get("opaque"),
	            qop: this.get("qop"),
	            saveToRequest: this.get("saveToRequest")
	        };

	        pm.indexedDB.helpers.addHelper(h, function(h) {
	        });
	    }
	});

	module.exports = DigestAuthProcessor;


/***/ },

/***/ 278:
/***/ function(module, exports) {

	var OAuth1Processor = Backbone.Model.extend({
	    defaults: function() {
	        return {
	            "id": "oAuth1",
	            "time": 0,
	            "consumerKey": "",
	            "consumerSecret": "",
	            "token": "",
	            "tokenSecret": "",
	            "signatureMethod": "HMAC-SHA1",
	            "timestamp": "",
	            "nonce": "",
	            "version": "",
	            "realm": "",
	            "header": "",
	            "auto": "",
	            "encodeSignature": false,
	            "includeEmpty": false,
	            "request": null,
	            "saveToRequest": false
	        };
	    },

	    initialize: function() {
	        var model = this;

	        this.on("change", this.updateDB, this);

	        pm.indexedDB.helpers.getHelper("oAuth1", function(helper) {
	            if (helper) {
	                model.set(helper);
	                model.generateHelper()
	            }
	        });
	    },

	    updateDB: function() {
	        var helper = {
	            id: "oAuth1",
	            time: new Date().getTime(),
	            consumerKey: this.get("consumerKey"),
	            consumerSecret: this.get("consumerSecret"),
	            token: this.get("token"),
	            tokenSecret: this.get("tokenSecret"),
	            signatureMethod: this.get("signatureMethod"),
	            timestamp: this.get("timestamp"),
	            nonce: this.get("nonce"),
	            version: this.get("version"),
	            realm: this.get("realm"),
	            header: this.get("header"),
	            auto: this.get("auto"),
	            encodeSignature: this.get("encodeSignature"),
	            includeEmpty: this.get("includeEmpty"),
	            saveToRequest: this.get("saveToRequest"),
	        };

	        pm.indexedDB.helpers.addHelper(helper, function(helper) {
	        });
	    },

	    generateHelper: function () {
	        if(this.get("version") === "") {
	            this.set("version", "1.0");
	        }

	        if(this.get("signatureMethod" === "")) {
	            this.set("signatureMethod", "HMAC-SHA1");
	        }

	        this.set("timestamp", OAuth.timestamp() + "");
	        this.set("nonce", OAuth.nonce(6));
	    },

	    generateSignature: function (request) {
	        //Make sure the URL is urlencoded properly
	        //Set the URL keyval editor as well. Other get params disappear when you click on URL params again
	        //var request = this.get("request");
	        var i;
	        var url = request.get("url");
	        if (url === '') {
	          pm.alerts.warning('Please enter a URL first');
	            return null;
	        }

	        var processedUrl;

	        var realm = this.get("realm");
	        var method = request.get("method");
	        var requestBody = request.get("body");

	        processedUrl = pm.envManager.getCurrentValue(url).trim();
	        processedUrl = ensureProperUrl(processedUrl);

	        if (processedUrl.indexOf('?') > 0) {
	            processedUrl = processedUrl.split("?")[0];
	        }

	        var message = {
	            action: processedUrl,
	            method: method,
	            parameters: []
	        };

	        var signatureParams = [
	            {key: "oauth_consumer_key", value: this.get("consumerKey")},
	            {key: "oauth_token", value: this.get("token")},
	            {key: "oauth_signature_method", value: this.get("signatureMethod")},
	            {key: "oauth_timestamp", value: this.get("timestamp")},
	            {key: "oauth_nonce", value: this.get("nonce")},
	            {key: "oauth_version", value: this.get("version")}
	        ];

	        for(i = 0; i < signatureParams.length; i++) {
	            var param = signatureParams[i];
	            param.value = pm.envManager.getCurrentValue(param.value);
	            if(param.value!="" || this.get("includeEmpty")===true) {
	                message.parameters.push([param.key, param.value]);
	            }
	        }

	        //Get parameters
	        var urlParams = request.getUrlParams();

	        var bodyParams;

	        if (pm.methods.isMethodWithBody(method)) {
	            bodyParams = requestBody.get("dataAsObjects");

	            if (typeof bodyParams === "undefined") {
	                bodyParams = [];
	            }
	        }
	        else {
	            bodyParams = [];
	        }

	        var params = _.union(urlParams, bodyParams);
	        var param;
	        var existingOAuthParams = _.union(signatureParams, [{key: "oauth_signature", value: ""}]);
	        var pos;

	        for (i = 0; i < params.length; i++) {
	            param = params[i];
	            if (param.key) {
	                pos = findPosition(existingOAuthParams, "key", param.key);
	                if (pos < 0) {
	                    param.value = pm.envManager.getCurrentValue(param.value);
	                    if(param.value != "" || this.get("includeEmpty")===true) {
	                        message.parameters.push([param.key, param.value]);
	                    }
	                }
	            }
	        }

	        var accessor = {};
	        if (this.get("consumerSecret") !=='') {
	            accessor.consumerSecret = this.get("consumerSecret");
	            accessor.consumerSecret = pm.envManager.getCurrentValue(accessor.consumerSecret);
	        }
	        if (this.get("tokenSecret") !=='') {
	            accessor.tokenSecret = this.get("tokenSecret");
	            accessor.tokenSecret = pm.envManager.getCurrentValue(accessor.tokenSecret);
	        }

	        return OAuth.SignatureMethod.sign(message, accessor);
	    },

	    removeOAuthKeys: function (params) {
	        var i, count;
	        var oauthParams = [
	            "oauth_consumer_key",
	            "oauth_token",
	            "oauth_signature_method",
	            "oauth_timestamp",
	            "oauth_nonce",
	            "oauth_version",
	            "oauth_signature"
	        ];

	        var newParams = [];
	        var oauthIndexes = [];

	        for (i = 0, count = params.length; i < count; i++) {
	            var index = _.indexOf(oauthParams, params[i].key);
	            if (index < 0) {
	                newParams.push(params[i]);
	            }
	        }

	        return newParams;
	    },

		process: function() {
			var request = this.get("request");
			this.processCustomRequest(request);
	        this.generateHelper();
		},

		processCustomRequest: function (request) {
	        request.trigger("updateModel");

	        var i, j, count, length;
	        var params = [];

	        var urlParams = request.getUrlParams();
	        var bodyParams = [];

	        var url = request.get("url");
	        var body = request.get("body");
	        var dataMode = body.get("dataMode");
	        var method = request.get("method");

	        var bodyParams = body.get("dataAsObjects");

	        params = params.concat(urlParams);

	        if (typeof bodyParams !== "undefined") {
	            params = params.concat(bodyParams);
	        }

	        params = this.removeOAuthKeys(params);

	        var signatureKey = "oauth_signature";

	        var oAuthParams = [];

	        var signatureParams = [
	            {key: "oauth_consumer_key", value: this.get("consumerKey")},
	            {key: "oauth_token", value: this.get("token")},
	            {key: "oauth_signature_method", value: this.get("signatureMethod")},
	            {key: "oauth_timestamp", value: this.get("timestamp")},
	            {key: "oauth_nonce", value: this.get("nonce")},
	            {key: "oauth_version", value: this.get("version")}
	        ];

	        for(i = 0; i < signatureParams.length; i++) {
	            var param = signatureParams[i];
	            param.value = pm.envManager.getCurrentValue(param.value);
	            oAuthParams.push(param);
	        }

	        //Convert environment values
	        for (i = 0, length = params.length; i < length; i++) {
	            params[i].value = pm.envManager.getCurrentValue(params[i].value);
	        }

	        var signature = this.generateSignature(request);

	        if (signature === null) {
	            return;
	        }

	        if(this.get("encodeSignature") === true) {
	            signature = encodeURIComponent(signature);
	        }

	        oAuthParams.push({key: signatureKey, value: signature});

	        var addToHeader = this.get("header");

	        if (addToHeader) {
	            var realm = this.get("realm");
	            var authHeaderKey = "Authorization";
	            var rawString = "OAuth ";
		        if(realm!=null && realm.trim()!=="") {
			        rawString += "realm=\"" + encodeURIComponent(realm) + "\",";
		        }
	            var len = oAuthParams.length;

	            for (i = 0; i < len; i++) {
		            if(oAuthParams[i].value==null || oAuthParams[i].value.trim()=="") {
			            continue;
		            }
	                rawString += encodeURIComponent(oAuthParams[i].key) + "=\"" + encodeURIComponent(oAuthParams[i].value) + "\",";
	            }

	            rawString = rawString.substring(0, rawString.length - 1);
	            request.setHeader(authHeaderKey, rawString);
	            request.trigger("customHeaderUpdate");
	        } else {
	            params = params.concat(oAuthParams);

	            if (!request.isMethodWithBody(method)) {
	                // console.log("Setting URL params", params);

	                request.setUrlParamStringWithOptBlankValRemoval(params, null, true);
	                request.trigger("customURLParamUpdate");
	            } else {
	                if (dataMode === 'urlencoded') {
	                    body.loadData("urlencoded", params, true);
	                }
	                else if (dataMode === 'params') {
	                    body.loadData("params", params, true);
	                }
	                else if (dataMode === 'raw') {
	                    request.setUrlParamString(params);
	                    request.trigger("customURLParamUpdate");
	                }
	            }
	        }
	    }
	});

	module.exports = OAuth1Processor;


/***/ },

/***/ 279:
/***/ function(module, exports) {

	var OAuth2TokenFetcher = Backbone.Model.extend({
	    defaults: function() {
	        return {
	            "id": "oAuth2",
	            "authorization_url": "",
	            "access_token_url": "",
	            "client_id": "",
	            "client_secret": "",
	            "grant_type": "authorisation_code",
	            "scope": ""
	        };
	    },

	    initialize: function() {
	        var model = this;

	        this.on("startAuthorization", this.startAuthorization);

	        this.on("change", this.updateDB, this);

	        pm.indexedDB.helpers.getHelper("oAuth2", function(helper) {
	            if (helper) {
	                model.set(helper);
	            }
	        });
	    },

	    updateDB: function() {
	        var helper = {
	            "id": this.get("id"),
	            "authorization_url": this.get("authorization_url"),
	            "access_token_url": this.get("access_token_url"),
	            "client_id": this.get("client_id"),
	            "client_secret": this.get("client_secret"),
	            "scope": this.get("scope"),
	            "grant_type": this.get("grant_type"),
	            "timestamp": new Date().getTime()
	        };

	        pm.indexedDB.helpers.addHelper(helper, function(h) {
	        });
	    },

	    startAuthorization: function(params) {
	        var oldThis = this;
	        var authParams = {
	            "authorization_url": pm.envManager.getCurrentValue(_.clone(params["authorization_url"])).trim(),
	            "access_token_url": pm.envManager.getCurrentValue(_.clone(params["access_token_url"])).trim(),
	            "client_id": pm.envManager.getCurrentValue(_.clone(params["client_id"])),
	            "client_secret": pm.envManager.getCurrentValue(_.clone(params["client_secret"])),
	            "scope": pm.envManager.getCurrentValue(_.clone(params["scope"])),
	            "local_access_token": params["local_access_token"],
	        };

	        this.set(params);

	        if(params.grant_type === "authorisation_code") {
	          var postmanAuthUrl = pm.webUrl + "/oauth2/start";
	          postmanAuthUrl += "?authorization_url=" + encodeURIComponent(authParams["authorization_url"]);
	          postmanAuthUrl += "&access_token_url=" + encodeURIComponent(authParams["access_token_url"]);
	          postmanAuthUrl += "&client_id=" + encodeURIComponent(authParams["client_id"]);
	          postmanAuthUrl += "&client_secret=" + encodeURIComponent(authParams["client_secret"]);
	          postmanAuthUrl += "&scope=" + encodeURIComponent(authParams["scope"]);
	          postmanAuthUrl += "&local_access_token=" + encodeURIComponent(authParams["local_access_token"]);

	          postmanAuthUrl += "&app_id=" + getAppId();
	          // console.log(postmanAuthUrl);

	          pm.browserLogin.openLoginFlow(postmanAuthUrl, function(redirect_url) {
	                if (!postman_electron && chrome.runtime.error) {
	                  pm.alerts.error("Could not initiate OAuth 2 flow. Check debug URL.");
	                  $("#oauth2-debug-url-group .controls").html('<a class="selectable" target="_blank" href="'+postmanAuthUrl+'">'+postmanAuthUrl+'</a>');
	                  $("#oauth2-debug-url-group").show();
	                }
	                else if(!redirect_url) {
	                  pm.alerts.error("Could not complete OAuth2.0 login");
	                }
	                else {
	                  var params = getUrlVars(redirect_url);
	                  var paramsObject = {};
	                  _.each(params, function(param) {
	                    if(param.key) {
	                      paramsObject[param.key] = param.value;
	                    }
	                  });
	                  if(paramsObject["getTokenFromPostman"]==="true") {
	                    //postman needs to request the access token
	                    try {
	                      var dataObject = JSON.parse(decodeURI(paramsObject.data));
	                      var url = paramsObject.access_token_url;
	                      oldThis.requestToken(url, dataObject);
	                    }
	                    catch(e) {
	                      console.log("Error while requesting access token locally:");
	                      console.log(e);
	                      pm.alerts.error("Error requesting access token locally: " + e);
	                    }
	                  }
	                  else {
	                    //access token received from godserver
	                    //console.log("Show form", params);
	                    pm.mediator.trigger("addOAuth2Token", params);
	                  }
	                }
	              }
	          );
	        }
	        else {
	          //POST to access token URL
	          var tokenURL = authParams["access_token_url"];
	          var cid = encodeURIComponent(authParams["client_id"]);
	          var csecret = encodeURIComponent(authParams["client_secret"]);
	          var scope = encodeURIComponent(authParams["scope"]);

	          var rawString = cid + ":" + csecret;
	          var encodedString = "Basic " + window.btoa(unescape(encodeURIComponent(rawString)));

	          $.ajax({
	            url: tokenURL,
	            method: "POST",
	            data: "grant_type=client_credentials&scope=" + scope,
	            headers: {
	              "Authorization": encodedString
	            },
	            success: function(data) {
	              try {
	                if (_.isString(data)) {
	                  data = JSON.parse(data);
	                }
	                var access_token = data.access_token || data.token;
	                if(!access_token) {
	                  throw "Token not returned";
	                }
	                pm.mediator.trigger("addOAuth2Token", data);
	              }
	              catch(e) {
	                pm.alerts.error("Error getting access token from client_credentials flow: " + e);
	                return;
	              }
	            },
	            error: function() {
	              pm.alerts.error("Error getting access token from client_credentials flow. Could not send request");
	              return;
	            }
	          });
	        }
	    },

	    requestToken: function(url, dataObject) {
	        $.post(url, dataObject, function(data) {
	            console.log("Access token through Postman");
	            console.log(data);
	            var params = data;
	            if(typeof data === "string") {
	                params = getUrlVars("?"+data);
	            }
	            pm.mediator.trigger("addOAuth2Token", params);
	        });
	    }
	});

	module.exports = OAuth2TokenFetcher;


/***/ },

/***/ 280:
/***/ function(module, exports) {

	/**
	 * Create a query string from object.
	 *
	 * @param object
	 * @returns {string}
	 */
	var makeParams = function (object) {
	    var encodedString = '';
	    for (var prop in object) {
	        if (object.hasOwnProperty(prop)) {
	            if (encodedString.length > 0) {
	                encodedString += '&';
	            }
	            encodedString += encodeURI(prop + '=' + object[prop]);
	        }
	    }
	    return encodedString;
	};

	var AWSAuthProcessor = Backbone.Model.extend({
	    defaults: function() {
	        return {
	            "id": "",
	            "time": 0,
	            "accessKey": "",
	            "secretKey": "",
	            "region": "",
	            "service": "",
	            "auto": false,
	            "saveHelper": false,
	        };
	    },

	    initialize: function() {
	        this.on("change", this.updateDB, this);

	        var model = this;

	        this.signer = window.postmanConverters.awsSigner;

	        pm.indexedDB.helpers.getHelper("awsSigV4", function(helper) {
	            if (helper) {
	                model.set(helper);
	            }
	        });
	    },

	    getSignature: function (request) {
	        //var request = this.get("request");
	        request.trigger("updateModel");
	        
	        var accessKey = pm.envManager.getCurrentValue(this.get("accessKey"));
	        var secretKey = pm.envManager.getCurrentValue(this.get("secretKey"));
	        var region = pm.envManager.getCurrentValue(this.get("region"));
	        var serviceName = pm.envManager.getCurrentValue(this.get("service"));

	        var method = request.get("method");
	        var body = request.getRequestBodyPreview();        
	        var url = request.processUrl(request.get("url"));


	        var headers = request.get("headers");

	        //we need method, pathname, query, headers, payload
	        var urlParts = URI(url);
	        var queryObject = urlParts.query(true);
	        var path = urlParts.path() + (Object.keys(queryObject).length ? '?' + makeParams(queryObject) : '');

	        // Make an object from the headers, doing variable substitution and skipping unnecessary headers
	        headers = _.reduce(headers, function (accumulator, header) {
	            var headerKey = pm.envManager.getCurrentValue(header.key),
	                headerVal = pm.envManager.getCurrentValue(header.value);
	            if (headerKey.toLowerCase() !== 'authorization' && headerKey.toLowerCase() !== 'date' &&
	                    headerKey.toLowerCase() !== 'x-amz-date') {
	                // Only add header if it's not authorization and date header.
	                accumulator[headerKey] = headerVal;
	            }
	            return accumulator;
	        }, {});

	        var hostname = urlParts.hostname();
	        var credentials = {
	            accessKeyId: accessKey,
	            secretAccessKey: secretKey
	        };

	        var signedParams = this.signer.sign({
	            host: hostname,
	            path: path,
	            service: serviceName || 'execute-api',
	            region: region,
	            method: method,
	            body: body,
	            headers: headers
	        }, credentials);

	        var retVal = {
	            'Authorization': signedParams.headers["Authorization"],
	            'X-Amz-Date': signedParams.headers["X-Amz-Date"],
	            'Content-Type': signedParams.headers["Content-Type"]
	        };
	        return retVal;
	    },

		process: function() {
			var request = this.get("request");
	        this.trigger("updateAwsHelper");
			this.processCustomRequest(request);
		},

	    processCustomRequest: function (request) {
	        var headers = request.get("headers");
	        var cTypeHeader = _.find(headers, function(header) { return (header.key.toLowerCase()=="content-type") });
	        if(!cTypeHeader) {
	            request.setHeader("Content-Type", "application/x-www-form-urlencoded");
	        }

	        var headerVal = this.getSignature(request);

	        request.setHeader("Authorization", headerVal['Authorization']);
	        request.setHeader("X-Amz-Date", headerVal['X-Amz-Date']);
	        request.trigger("customHeaderUpdate");
	    },

	    updateDB: function() {
	        var h = {
	            id: "awsSigV4",
	            time: new Date().getTime(),
	            accessKey: this.get("accessKey"),
	            secretKey: this.get("secretKey"),
	            region: this.get("region"),
	            service: this.get("service"),
	            auto: this.get("auto"),
	            saveHelper: this.get("saveHelper"),
	        };

	        pm.indexedDB.helpers.addHelper(h, function(h) {
	        });
	    }
	});

	module.exports = AWSAuthProcessor;



/***/ },

/***/ 281:
/***/ function(module, exports) {

	var Helpers = Backbone.Model.extend({
	    defaults: function() {
	        return {
	            "activeHelper": "normal",
	            "basicAuth": null,
	            "digestAuth": null,
	            "oAuth1": null,
	            "oAuth2": null,
	            "hawkAuth": null
	        };
	    }
	});

	module.exports = Helpers;


/***/ },

/***/ 296:
/***/ function(module, exports) {

	var Storage = Backbone.Model.extend({
	    defaults: function() {
	    },

	    initialize: function() {
	        //set syncServer and web URL
	        if(postman_env==="sync_dev") {
	            this.getValue('sync_url', function(sync_url) {
	                if(sync_url && sync_url!=="") {
	                    postman_syncserver_url = sync_url;
	                    $("#settings-postman-sync").val(sync_url);
	                }
	            });

	            this.getValue('web_url', function(web_url) {
	                if(web_url && web_url!=="") {
	                    postman_web_url = web_url;
	                    $("#settings-postman-web").val(web_url);
	                }
	            });
	        }        
	    },

	    getValue: function(key, callback) {
	        if (pm.target === pm.targets.CHROME_LEGACY_APP || postman_electron) {
	            callback(localStorage[key]);
	        }
	        else if (pm.target === pm.targets.CHROME_PACKAGED_APP) {
	            var obj = {};
	            obj[key] = null;
	            chrome.storage.local.get(obj, function(result) {
	                callback(result[key]);
	            });
	        }
	    },

	    setValue: function(kvpair, callback) {
	        if (pm.target === pm.targets.CHROME_LEGACY_APP  || postman_electron) {
	            //Implementation here
	            // console.log("Set value for legacy app");
	            for(key in kvpair) {
	                if (kvpair.hasOwnProperty(key)) {
	                    localStorage[key] = kvpair[key];                    
	                }
	            }

	            if (callback) {
	                callback();    
	            }            
	        }
	        else if (pm.target === pm.targets.CHROME_PACKAGED_APP) {
	            chrome.storage.local.set(kvpair, function() {
	                if (callback) {
	                    callback();
	                }                
	            });
	        }
	    }
	});

	module.exports = Storage;


/***/ },

/***/ 297:
/***/ function(module, exports) {

	var RequestMethods = Backbone.Model.extend({
	    defaults: function() {
	    	var defaultMethods = [
	    		{"verb": "GET", "hasBody": false},
	    		{"verb": "POST", "hasBody": true},
	    		{"verb": "PUT", "hasBody": true},
	    		{"verb": "PATCH", "hasBody": true},
	    		{"verb": "DELETE", "hasBody": true},
	    		{"verb": "COPY", "hasBody": false},
	    		{"verb": "HEAD", "hasBody": false},
	    		{"verb": "OPTIONS", "hasBody": true},
	    		{"verb": "LINK", "hasBody": true},
	    		{"verb": "UNLINK", "hasBody": true},
	    		{"verb": "PURGE", "hasBody": false},
	            {"verb": "LOCK", "hasBody": true},
	            {"verb": "UNLOCK", "hasBody": false},
	            {"verb": "PROPFIND", "hasBody": true},
	            {"verb": "VIEW", "hasBody": false}
	    	];

	        return {
	            methods: defaultMethods
	        };
	    },

	    initialize: function(callback) {
	    	var model = this;

	    	pm.storage.getValue("requestMethods", function(requestMethods) {
	    		if (requestMethods !== null) {
	    			// model.set("methods", requestMethods);

	    			if (callback) {
	    				callback();
	    			}
	    		}
	    		else {
	    			var o = {"requestMethods": model.get("methods")};
	    			pm.storage.setValue(o, function() {
	    				if (callback) {
	    					callback();
	    				}
	    			});
	    		}

	    	});
		},

	    isMethodWithBody: function(verb) {
	    	var methods = this.get("methods");
	    	var index = arrayObjectIndexOf(methods, verb, "verb");

	    	if (index >= 0) {
	    		return methods[index].hasBody;
	    	}
	    	else {
	    		return false;
	    	}
	    },

	    saveMethods: function() {
	    	var o = {"requestMethods": this.get("methods")};
	    	pm.storage.setValue(o, function() {
	    		if (callback) {
	    			callback();
	    		}
	    	});
	    },

	    addMethod: function(method) {
	    	var index = arrayObjectIndexOf(this.get("methods"), method.verb, "verb");
	    	if (index === -1) {
	    		this.get("methods").push(method);
	    		this.saveMethods();
	    	}
	    },

	    updateMethod: function(method) {
	    	var index = arrayObjectIndexOf(this.get("methods"), method.verb, "verb");
	    	if (index >= 0) {
	    		var methods = this.get("methods");
	    		methods[index] = method;
	    		this.set("methods", methods);
	    		this.saveMethods();
	    	}
	    },

	    deleteMethod: function(verb) {
	    	var index = arrayObjectIndexOf(this.get("methods"), method.verb, "verb");
	    	if (index >= 0) {
	    		var methods = this.get("methods");
	    		methods.splice(index, 1);
	    		this.set("methods", methods);
	    		this.saveMethods();
	    	}
	    }
	});

	module.exports = RequestMethods;


/***/ },

/***/ 309:
/***/ function(module, exports) {

	var Tracker = Backbone.Model.extend({
		defaults: function() {
			return {
			}
		},

		initialize: function() {
			pm.mediator.once("onTrialStart", this.onTrialStart, this);
			pm.mediator.once("onTrialEnd", this.onTrialEnd, this);
			pm.mediator.on("onStartPurchase", this.onStartPurchase, this);

			//for collection_runner events
			pm.appWindow.trigger("registerInternalEvent", "test_runner_event", this.onAddTestRunnerEvent, this);
		},

		onAddTestRunnerEvent: function(event) {
			this.trackEvent(event.category, event.action, event.label, event.value);
		},

		onStartPurchase: function() {
			if (tracker) {
				this.trackEvent('test_runner', 'collection_runner', 'buy');
			}
		},

		onTrialStart: function() {
			if (tracker) {
				this.trackEvent('test_runner', 'collection_runner', 'trial_start');
			}
		},

		onTrialEnd: function() {
			if (tracker) {
				console.log("trial_end event fired");
				this.trackEvent('test_runner', 'collection_runner', 'trial_end');
			}
		},

		sendAppView: function(url) {
			var analyticsEnabled = pm.settings.getSetting("googleAnalytics");
			if (analyticsEnabled) {
				if(window.hasOwnProperty("tracker")) {
					//chrome
					tracker.sendAppView(url);
				}
				else if(window.hasOwnProperty("electronTracker")) {
					//electron
					electronTracker.screenView(url);
				}
			}
		},

		trackEvent: function(category, action, label, value) {
			//if this is the collection runner
			if(!pm["syncManager"]) {
				pm.appWindow.sendMessageWrapper({
					id: pm.appWindow.get("id"),
					event: "test_runner_event",
					object: {
						category: category,
						action: action,
						label: label,
						value: value
					}
				});
				return;
			}

			this.forceTrackEvent(category, action, label, value);
		},

		forceTrackEvent: function(category, action, label, value) {
			var analyticsEnabled = pm.settings.getSetting("googleAnalytics");
			if (analyticsEnabled) {
				if(window.tracker) {
					if(value) {
						tracker.sendEvent(category, action, label, value);
					}
					else if(label) {
						tracker.sendEvent(category, action, label);
					}
					else {
						tracker.sendEvent(category, action);
					}
				}
				else if(window.electronTracker) {
					if(value) {
						electronTracker.event(category, action, label, value);
					}
					else if(label) {
						electronTracker.event(category, action, label);
					}
					else {
						electronTracker.event(category, action);
					}
				}
			}
		}
	});

	module.exports = Tracker;


/***/ },

/***/ 321:
/***/ function(module, exports) {

	var User = Backbone.Model.extend({
		defaults: function() {
			return {
				"id": 0,
				"name": "",
				"username_email": "",
				"access_token": "",
				"refresh_token": "",
				"expires_in": 0,
				"logged_in_at": 0,
				"link": "",
				"retrievedData": false,
				"expiredToken": true,
				"collections": [],
				"organizations": [],
				"teamSyncEnabled": false,
				"syncEnabled": false,
				"syncInvited": false,
				"baseEulaAccepted": false,
				"syncserver_url": null
			};
		},

		setDefaults: function() {
			this.set("id", 0);
			this.set("name", "");
			this.set("username_email", "");
			this.set("access_token", "");
			this.set("refresh_token", "");
			this.set("expires_in", 0);
			this.set("link", "");
			this.set("retrievedData", false);

			var defaultSync = false;
			if(postman_env === "sync_dev") {
					defaultSync = true;
			}

			this.set("baseEulaAccepted", defaultSync);
			this.set("syncEnabled", defaultSync);
			this.set("syncInvited", defaultSync);
			this.set("teamSyncEnabled", false);
			this.set("syncserver_url", null);

			this.saveUserObject(this.toJSON());
		},

		//not used
		renewToken: function() {
			var model = this;
			pm.api.exchangeRefreshToken(function() {
				model.set("expiredToken",false);
				model.fetchUserData();
				model.setupSync();
			});
		},

		checkSendAppId: function() {
			if(!pm.settings.getSetting("hasSentAppId")) {
				pm.api.sendAppId(pm.settings.getSetting("installation_id"), this.get("id"), this.get("access_token"));
				pm.settings.setSetting("hasSentAppId", true);
			}
		},

		initialize: function() {
			var model = this;
			this.freshSignIn = false; //used to determine whether to force sync or not
			if(!pm.hasOwnProperty("user")) {
				pm.user = model;
			}
			pm.storage.getValue("user", function(ustring) {
				if (ustring) {
					var u = {};
					if(postman_electron || (typeof ustring === "string")) {
						try {
							u = JSON.parse(ustring);
						}
						catch (e) {
							console.log("Could not parse user data");
							return;
						}
					}
					else {
						u = ustring;
					}

					model.set("id", u.id);
					model.set("name", u.name);
					model.set("access_token", u.access_token);
					model.set("refresh_token", u.refresh_token);
					model.set("retrievedData", false);

					//never take syncserver URL from settings. always wait for godserver to return the correct URL
					//model.set("syncserver_url", u.syncserver_url);

					/*if(model.get("syncserver_url") && model.get("syncserver_url").indexOf("http")==0) {
	            		postman_syncserver_url = model.get("syncserver_url");
	        		}*/

					if(u.hasOwnProperty("username_email")) {
						model.set("username_email", u.username_email);
					}
					else {
						model.set("username_email", "");
					}

	        if(postman_env === "sync_dev" || postman_env === "sync_stage") {
	            model.set("syncInvited", true);
	            model.set("syncEnabled", true);
	            model.set("baseEulaAccepted", true);
	        }
	        else {
	            model.set("syncInvited", u.syncInvited);
	            model.set("syncEnabled", u.syncEnabled);
	            model.set("baseEulaAccepted", u.baseEulaAccepted);
	        }

	        model.set("teamSyncEnabled", u.teamSyncEnabled);
	        if(u.teamSyncEnabled) {
	            pm.mediator.trigger("teamSyncEnabled");
	        }

	        pm.mediator.trigger("isTeamMember", model.get("teamSyncEnabled") && model.get("syncEnabled"));

					var expires_in = parseInt(u.expires_in, 10);

					model.set("expires_in", expires_in);
					model.set("logged_in_at", u.logged_in_at);

					var isTokenValid = model.isTokenValid();

					if(!isTokenValid) {
						model.set("expiredToken",true);
					}
					else {
						model.set("expiredToken",false);
					}

					//if sync was enabled, set status to offline instead of sync off
					//but don't start to sync
					if(model.get("syncEnabled")) {
						pm.mediator.trigger("showStatus:notConnected");
					} 

					if (u.id !== 0) {
						//always refresh token on login (to check for sync)
						if(!isTokenValid) {
							pm.api.exchangeRefreshToken(function() {
								model.set("expiredToken",false);
								model.fetchUserData();
							});
						}
						else {
							model.fetchUserData();
						}
					}
					else {
						//user id is 0
						model.logoutFromGoogle();
						pm.mediator.trigger("cloudTrialNotif");
					}
				}
				else {
					//no user object found
					model.logoutFromGoogle();
					pm.mediator.trigger("cloudTrialNotif");
				}
				pm.mediator.trigger("showPostman3Splash", false);
				pm.mediator.trigger("sendBulkAnalytics", false);
				model.checkSendAppId();
			});

			pm.mediator.on("receiveTokenFromPurchaseFlow", this.receiveTokenFromPurchaseFlow, this);
			pm.mediator.on("refreshSharedCollections", this.getCollections, this);
			pm.mediator.on("downloadSharedCollection", this.onDownloadSharedCollection, this);
			pm.mediator.on("deleteSharedCollection", this.onDeleteSharedCollection, this);
			pm.mediator.on("invalidAccessToken", this.onTokenNotValid, this);
			pm.mediator.on("invalidRefreshToken", this.onTokenNotValid, this);
			pm.mediator.on("downloadAllSharedCollections", this.onDownloadAllSharedCollections, this);
			pm.mediator.on("reenteredPassword", this.useNewPassword, this);
			pm.mediator.on("appOnline",this.onAppOnline, this);

			pm.appWindow.trigger("registerInternalEvent", "loggedIn", this.onLoginFromNewWindow, this);
			pm.appWindow.trigger("registerInternalEvent", "loggedOut", this.onLogoutFromNewWindow, this);

			this.on("startGoogleLogin", this.loginWithGoogle, this);
			this.on("signinSuccess", this.handleSuccessfulLogin, this);

			pm.mediator.on("onMessageExternal", function(request, sender, sendResponse) {
				if (request) {
					if (request.postmanMessage) {
						if (request.postmanMessage.type === "token") {
							pm.mediator.trigger("receiveTokenFromPurchaseFlow", request.postmanMessage.token);
							sendResponse({"result":"success"});
						}
					}
				}
			});
		},

		onAppOnline: function() {
			if(this.get("retrievedData") == false) {
				this.fetchUserData();
			}
		},

		saveUserObject: function(tojson) {
			if(postman_electron) {
				var strToSave;
				strToSave = JSON.stringify(tojson);

				var user = {
					"user": strToSave
				};

				pm.storage.setValue(user, function() {
					console.log("User saved");
				})
			}
			else {
				var user = {
					"user": tojson
				};
				pm.storage.setValue(user, function() {
					console.log("User saved");
				})
			}
		},
		onLoginFromNewWindow: function() {
			this.initialize();
		},

		onLogoutFromNewWindow: function() {
			this.logout(false);
		},

		isTokenValid: function() {
			var expiresIn = this.get("expires_in"); //this is in seconds!
			var loggedInAt = this.get("logged_in_at");

			var now = new Date().getTime();

			//convert to millis
			expiresIn *= 1000;

			if (loggedInAt + expiresIn > now) {
				return true;
			}
			else {
				console.log("Old access token not valid.");
				console.log("Expires_in: " + expiresIn);
				console.log("LoggedInAt: " + loggedInAt);
				console.log("Now: " + now);
				return false;
			}
		},

		onTokenNotValid: function() {
			// Indicate error
			var oldThis = this;
			if(pm.user.id != "0") {
				pm.api.getUsernameEmailForId(pm.user.id, function(data) {
					if(data && data.result !== "fail") {
						oldThis.trigger("startReenterPassword", data.id, data.username);
					}
				});
			}
			pm.tracker.forceTrackEvent("account", "signed_out_unintentional", pm.user.id);
		},

		isLoggedIn: function() {
			return (this.get("id") !== 0 && this.get("expiredToken") !== true);
		},

		useNewPassword: function(username, password, id) {
			var model = this;

			pm.api.signInUser(username, password, id, function(data) {
				model.set("id", data.user_id);
				model.set("name", data.name);
				model.set("access_token", data.access_token);
				if(data.refresh_token) {
					model.set("refresh_token", data.refresh_token);
				}

				if(data.username_email) {
					//the username or email used to sign in
					model.set("username_email", data.username_email);
				}

				model.set("expires_in", data.expires_in);
				model.set("logged_in_at", new Date().getTime());
				model.set("expiredToken", false);

				if(postman_env==="sync_stage" || postman_env=="sync_dev") {
					data.sync_invited="1";
					data.sync_enabled="1";
				}
				model.set("syncInvited", (data.sync_invited+"")=="1");
				model.set("syncEnabled", (data.sync_enabled+"")=="1");
				model.set("baseEulaAccepted", data.base_eula_accepted=="1");
				pm.mediator.trigger("setSync",model.get("syncEnabled"));

				model.saveUserObject(model.toJSON());

				model.fetchUserData();

				pm.appWindow.trigger("sendMessageObject", "loggedIn");
			});
		},

		setAccessToken: function(data) {
			var model = this;

			var expires_in = parseInt(data.expires_in, 10);

			model.set("access_token", data.access_token);
			if(data.refresh_token) {
				model.set("refresh_token", data.refresh_token);
			}
			model.set("expires_in", expires_in);
			model.set("logged_in_at", new Date().getTime());
			model.set("expiredToken",false);

			if(postman_env=="sync_stage" || postman_env=="sync_dev") {
				data.syncEnabled = 1;
				data.syncInvited = 1;
			}
			model.set("syncInvited", data.syncInvited=="1");
			model.set("syncEnabled", data.syncEnabled=="1");
			pm.mediator.trigger("setSync",model.get("syncEnabled"));

			model.set("baseEulaAccepted", data.baseEulaAccepted=="1");

			this.saveUserObject(model.toJSON());
		},

		setSyncEnabled: function(syncEnabled) {
			var model = this;
			model.set("syncEnabled", syncEnabled);
			this.saveUserObject(model.toJSON());
		},

		setBaseEulaAccepted: function(bea) {
			var model = this;
			model.set("baseEulaAccepted", bea);
			this.saveUserObject(model.toJSON());
		},

		getRemoteIdForCollection: function(id) {
			var collections = this.get("collections");
			var index = arrayObjectIndexOf(collections, id, "id");

			if (index >= 0) {
				return collections[index].remote_id;
			}
			else {
				return 0;
			}
		},

		fetchUserData: function() {
			var model = this;
			model.set("retrievedData", false);
			model.getCollections();
			model.getPurchases();
			model.getSyncData();
			model.getOrganizations();
			model.checkBaseEula();
			model.trigger("login", model);
		},

		/**
		* ONLY called when the user enters his password and signs in
		*/
		handleSuccessfulLogin: function(data) {
			var model = this;
			this.freshSignIn = true;
			model.set("id", data.user_id);
			model.set("name", data.name);
			model.set("access_token", data.access_token);
			if(data.refresh_token) {
				model.set("refresh_token", data.refresh_token);
			}

			if(data.username_email) {
				//the username or email used to sign in
				model.set("username_email", data.username_email);
			}

			//reset sync to 0
			pm.indexedDB.deleteAllSince(function() {});
			pm.indexedDB.updateLastSynced(1, function(){});
			pm.settings.setSetting("enableSync", false);
			pm.settings.setSetting("syncedOnce", false);
			pm.settings.setSetting("syncedEver", false);

			model.set("expires_in", data.expires_in);
			model.set("logged_in_at", new Date().getTime());
			model.set("expiredToken", false);

			if(postman_env==="sync_stage" || postman_env=="sync_dev") {
				data.sync_invited="1";
				data.sync_enabled="1";
			}
			model.set("syncInvited", (data.sync_invited+"")=="1");
			model.set("syncEnabled", (data.sync_enabled+"")=="1");
			model.set("baseEulaAccepted", data.base_eula_accepted=="1");


			model.saveUserObject(model.toJSON());
			model.fetchUserData();

			pm.appWindow.trigger("sendMessageObject", "loggedIn");
		},

		loginWithURL: function(url) {
			var model = this;
			var appId = getAppId();
			pm.browserLogin.openLoginFlow(url, function(redirect_url) {
					model.trigger("revertGoogleButtonText");
					if (window.chrome && window.chrome.runtime && window.chrome.runtime.error) {
						model.trigger("logout", model);
						pm.alerts.error("Could not complete login flow. Please ensure network connectivity.");
					}
					else if(!redirect_url) {
						pm.alerts.error("Could not complete OAuth2.0 sign in.");
					}
					else {
						//reset sync to 0
						model.freshSignIn = true;
						pm.indexedDB.deleteAllSince(function() {});
						pm.indexedDB.updateLastSynced(1, function(){});
						pm.settings.setSetting("enableSync", false);
						pm.settings.setSetting("syncedOnce", false);
						pm.settings.setSetting("syncedEver", false);

						model.trigger("closeSignInModal");
						var params = getUrlVars(redirect_url, true);

						model.set("syncEnabled", pm.settings.getSetting("enableSync"));
						pm.mediator.trigger("setSync", model.get("syncEnabled"));


						model.set("id", params.user_id);
						model.set("name", decodeURIComponent(params.name));
						model.set("access_token", decodeURIComponent(params.access_token));
						if(params.refresh_token) {
							model.set("refresh_token", decodeURIComponent(params.refresh_token));
						}
						model.set("expires_in", parseInt(params.expires_in, 10));
						model.set("logged_in_at", new Date().getTime());
						model.set("expiredToken", false);
						model.set("syncInvited", params.sync_invited=="1");
						model.set("syncEnabled", params.sync_enabled=="1");
						model.set("baseEulaAccepted", params.base_eula_accepted=="1");

						if(params.new_user === "1") {
							//show enable sync modal
							//user created an account through google
							pm.mediator.trigger("showSyncInvitePopup");
						}

						pm.mediator.trigger("setSync",model.get("syncEnabled"));

						model.saveUserObject(model.toJSON());

						model.fetchUserData();

						pm.appWindow.trigger("sendMessageObject", "loggedIn");
						
						/* Extract token from redirect_url */
					}
				}
			);
		},

		//Call this to login with Google directly
		loginWithGoogle: function() {
			try {
				this.loginWithURL(pm.webUrl + '/client-login-appid?app_id=' + getAppId());
			}
			catch(e) {
				//user auth required. can ignore
			}
		},

		logoutFromGoogle: function() {
			try {
				chrome.identity.launchWebAuthFlow({'url': 'https://accounts.google.com/Logout?continue=http://google.com', 'interactive': false}, function(){
					if (chrome.runtime.lastError) {
						console.log("Google logout");
					}
				});
			}
			catch(e) {
				//now what?
			}
		},

		//Call this to show the old sign in page
		login: function() {
			var appId = getAppId();
			this.loginWithURL(pm.webUrl + '/signup?appId=' + appId);
		},

		receiveTokenFromPurchaseFlow: function(params) {
			var model = this;

			model.set("id", params.user_id);
			model.set("name", params.name);
			model.set("access_token", params.access_token);
			if(params.refresh_token) {
				model.set("refresh_token", params.refresh_token);
			}
			model.set("syncInvited", (params.syncInvited+"")==1);
			model.set("syncEnabled", (params.syncEnabled+"")==1);
			pm.mediator.trigger("setSync",model.get("syncEnabled"));

			model.set("expires_in", parseInt(params.expires_in, 10));
			model.set("logged_in_at", new Date().getTime());
			model.set("baseEulaAccepted", params.baseEulaAccepted=="1");

			this.saveUserObject(model.toJSON());

			model.fetchUserData();
		},

		/**
		 *
		 * @param fromThisWindow - true if the user logged out by a UI action in this window. will send a message to other windows if true
		 * if false, it means that the logout came through another window
	     */
		logout: function(fromThisWindow) {
			var model = this;

			//Need to check if there are unsynced changes
			pm.api.logoutUser(this.get("id"), this.get("access_token"), function() {
				model.setDefaults();
				model.logoutFromGoogle();

				//Delete all sync-settings
				pm.settings.setSetting("syncInviteEnabled", false);
				pm.settings.setSetting("syncInviteShown", false);
				pm.settings.setSetting("enableSync", false);
				pm.settings.setSetting("syncedOnce", false);
				pm.settings.setSetting("syncedEver", false);

				pm.mediator.trigger("showEnableSyncButton");

				//model.trigger("logout", {message: "Manual logout"});
				$("#user-status-not-logged-in").text("Log in");
				$("#sync-settings-form").hide();

				model.trigger("onLogout");
				if(fromThisWindow) {
					pm.appWindow.trigger("sendMessageObject", "loggedOut");
				}
				pm.syncManager.signOut();
				pm.mediator.trigger("isTeamMember", false);
				pm.indexedDB.tabs.deleteAllTabs();
				pm.settings.setSetting("lastRequest", null);
			});
		},

		getUserDataForSync: function(callback) {
			var model = this;
			pm.api.getUserData(function(data) {
				if(data.result == "fail" && pm.user.id != "0") {
					//user login failed
					//ask to re-enter password or sign out
					//show modal
					pm.api.getUsernameEmailForId(pm.user.id, function(newData) {
						if(newData && newData.result !== "fail") {
							model.trigger("startReenterPassword", newData.id, newData.username);
						}
					});
					return;
				}
				model.set("syncInvited", (data.syncInvited+"")==="1");
				model.set("syncEnabled", (data.syncEnabled+"")==="1");
				model.set("baseEulaAccepted", (data.baseEulaAccepted+"")==="1");

				if(postman_env === "sync_dev" || postman_env === "sync_stage") {
					model.set("syncInvited", true);
					model.set("syncEnabled", true);
					model.set("baseEulaAccepted", true);
					if(data.adminMigrateLink) {
						pm.mediator.trigger('banner:show:beta_sync_launched', {
				            isAdmin: true,
				            link: data.adminMigrateLink
		          		});
					}
					else {
			          	pm.mediator.trigger('banner:show:beta_sync_launched', {
				            isAdmin: false,
				            link: "http://www.getpostman.com/plans/cloud-basic?source=beta_app"
				        });
					}
				}

				if(!model.get("syncEnabled")) {
					//show sync off
					$(".disable-sync-message").hide();
	                pm.settings.setSetting("enableSync", false);
	                pm.settings.setSetting("syncedOnce", false);
	                pm.mediator.trigger("setSync",false);
	                pm.user.setSyncEnabled(false);
	                $("#disable-sync-settings").hide();
	                $(".enable-sync-settings").show();
				}
				else {
	                $("#disable-sync-settings").show();
	                $(".enable-sync-settings").hide();
				}

				if(data.hasOwnProperty("syncserver_url") && postman_env!=="sync_dev") {
					postman_syncserver_url = data.syncserver_url;
					model.set("syncserver_url", postman_syncserver_url);
					model.saveUserObject(model.toJSON());
					if(model.get("syncEnabled")) {
						pm.mediator.trigger("setSync", true);
					}
				}

				callback();
			});
		},

		getCollections: function(callback) {
			var model = this;

			if (this.isLoggedIn()) {
				pm.api.getUserCollections(function(data) {
					model.set("retrievedData", true);
					if (data.hasOwnProperty("collections")) {
						for(var i = 0; i < data.collections.length; i++) {
							c = data.collections[i];
							c.is_public = c.is_public === "1" ? true : false;
							c.updated_at_formatted = new Date(c.updated_at).toDateString();
						}

						model.set("collections", data.collections);
						model.trigger("change:collections");
						if (typeof(callback) == "function") {
							callback();
						}
					}
				}, function() {
					console.log("Could not get collections");
					model.set("retrievedData", false);
					if (typeof(callback) == "function") {
						callback();
					}
				});
			}
		},

		getPurchases: function() {
			var model = this;

			if (this.isLoggedIn()) {
				pm.api.getUserPurchases(function(data) {
					if (data.hasOwnProperty("purchases")) {
						pm.mediator.trigger("loadedPurchasesFromServer", data);
					}
				});
			}
		},

		getOrganizations: function() {
			var model = this;

			if (this.isLoggedIn()) {
				pm.api.getUserOrganizations(function(data) {
					if (data.hasOwnProperty("organizations") && data.organizations.length>0) {
						model.set("organizations", data.organizations);
						var teamSync = false;
						for(i=0;i<data.organizations.length;i++) {
							if(data.organizations[i].sync_enabled === true) {
								teamSync = true;
								break;
							}
						}
						if(postman_env === "sync_stage" || postman_env === "sync_dev") {
							teamSync = true;
						}

						model.set("teamSyncEnabled", teamSync);
						if(teamSync) {
							pm.mediator.trigger("teamSyncEnabled");
						}

						if(!teamSync) {
							if (data.adminTrialLink) {
								pm.mediator.trigger('banner:show:jp_cloud_trial_launched', {
									isAdmin: true,
									link: data.adminTrialLink
								});
							}
							else if(data.adminTrialLinkBeta) {
								pm.mediator.trigger('banner:show:jp_cloud_trial_launched', {
									isAdmin: false,
									link: data.adminTrialLinkBeta
								});
							}
						}

						var teamSyncEnabled = model.get("teamSyncEnabled") && model.get("syncEnabled");
						pm.mediator.trigger("isTeamMember", teamSyncEnabled);
						if(!model.get("teamSyncEnabled")) {
							pm.mediator.trigger("cloudTrialNotif");
						}
					}
					else {
						model.set("organizations", []);
						model.set("teamSyncEnabled", false);
						pm.mediator.trigger("isTeamMember", false);
						pm.mediator.trigger("cloudTrialNotif");
					}

					model.saveUserObject(model.toJSON());
				});
			}
		},

		isTeamMember: function() {
			var teamSync = this.get("teamSyncEnabled");
			return teamSync;
		},

		onDeleteSharedCollection: function(id) {
			var model = this;
			pm.api.deleteSharedCollection(id, function(data) {
				var collections = model.get("collections");
				var index = arrayObjectIndexOf(collections, id, "id");
				var collection = _.clone(collections[index]);

				if (index >= 0) {
					collections.splice(index, 1);
				}

				pm.mediator.trigger("deletedSharedCollection", collection);

				model.trigger("change:collections");
			});
		},

		downloadSharedCollection: function(id, callback) {
			pm.api.getCollectionFromRemoteId(id, function(data) {
				pm.mediator.trigger("overwriteCollection", data);
				pm.alerts.success("Download successful");

				if (callback) {
					callback();
				}
			});
		},

		onDownloadSharedCollection: function(id) {
			this.downloadSharedCollection(id);
			pm.tracker.trackEvent("collection", "import", "download");
		},

		onDownloadAllSharedCollections: function() {
			var collections = this.get("collections");

			for(var i = 0; i < collections.length; i++) {
				this.downloadSharedCollection(collections[i].remote_id);
			}

			pm.tracker.trackEvent("collection", "import", "download_all", collections.length);
		},

		getRemoteIdForLinkId: function(linkId) {
			var link = pm.webUrl + "/collections/" + linkId;

			var collections = this.get("collections");
			var index = arrayObjectIndexOf(collections, link, "link");

			if (index >= 0) {
				return collections[index].remote_id;
			}
			else {
				return 0;
			}
		},

		getSyncData: function() {
			var model = this;
			model.getUserDataForSync(_.bind(model.setupSync, model));
		},

		setupSync: function() {
			var model = this;
			pm.mediator.trigger("notifyVersionUpdate");
			$("#sync-settings-form").show();
			if(!model.get("syncInvited") && !model.get("syncEnabled")) {
				$("#sync-settings-form").hide();
			}

			//if syncEnabled is true
			if(model.get("syncEnabled")) {
				pm.settings.setSetting("enableSync", true);
				pm.mediator.trigger("setSync", true);
				return;
			}
			else {
				pm.mediator.trigger("setSync", false);
			}

			//if syncInvited is true and syncInviteShown is false, nuffink..he can enable it later
			if(model.get("syncInvited") && !model.get("syncEnabled") && !pm.settings.getSetting("syncInviteShown")) {
				//pm.mediator.trigger("showSyncInvitePopup");
				//pm.settings.setSetting("syncInviteShown", true);
				//pm.tracker.trackEvent("sync", "view", "launch_modal");
				//transfer control to Legal
				//end of story
				//if he accepts, enableSync will be set to true, and an API call will be made to set eulaAccepted to true
				return;
			}

			else if(model.get("syncInvited") && !pm.settings.getSetting("enableSync")) {
				//dont do anything. The "Enable Sync" button will show in the navbar
				pm.mediator.trigger("showEnableSyncButton");
				return;
			}
		},

		checkBaseEula: function() {
			//no base eula-ing
			return;
			var model = this;
			if(model.get("baseEulaAccepted")!==true) {
				//Either the user as
				//pm.mediator.trigger("showBaseEula");
				return;
			}
			else {
				//pm.settings.setSetting("baseEulaAccepted", true);
			}
		}
	});

	module.exports = User;


/***/ },

/***/ 330:
/***/ function(module, exports) {

	var BulkAnalytics = Backbone.Model.extend({
		initialize: function() {

			this.modelsToLoad = ["history", "collection", "environment"];
			this.modelsLoaded = false;
			this.toRunBa = false;
			this.payloads = [];

			pm.mediator.on("modelsLoaded", function(modelName) {
				return; //NOT SENDING bulk analytics events right now
				_.remove(this.modelsToLoad, function(thisModel) {
					return thisModel === modelName
				});

				if(this.modelsToLoad.length === 0) {
					this.modelsLoaded = true;
				}

				if(this.modelsLoaded && this.toRunBa) {
					this.run();
				}
			}.bind(this));

			//to update baseObject on login/logout so userID changes
			pm.user.on("login onLogout", function() {
				this.setBaseObject();
			}.bind(this));
			//to update baseObject on login/logout so team sync flag changes
			pm.mediator.on("isTeamMember", function() {
				this.setBaseObject();
			}.bind(this));

			setInterval(function() {
				this.sendPayloads();
			}.bind(this), 60000);

			//this model shows the sign up screen instead of the splash screen
			pm.mediator.on("sendBulkAnalytics", function(force) {
				return; //NOT SENDING bulk analytics events right now
				var analyticsEnabled = pm.settings.getSetting("googleAnalytics");
				if(!analyticsEnabled || pm.isTesting) return;

				this.setBaseObject();

				var alreadySent = pm.settings.getSetting("sentBulkAnalytics");

				if((!alreadySent || force)) {
					this.toRunBa = true;
					if(this.modelsLoaded && this.toRunBa) {
						this.run();
					}
				}
			}.bind(this));
		},

		setBaseObject: function() {
			var isSignedIn = pm.user.id!==0;
			var isSyncEnabled = pm.user.get("syncEnabled");
			var isTeamSyncEnabled = pm.user.get("teamSyncEnabled");
			var isInJetpacksTeam = false;
			var isInTeam = false;
			var teamId = "";
			var appId = pm.settings.getSetting("installation_id");

			var teams = pm.user.get("organizations");
			if(teams && teams.length>0) {
				isInTeam = true;
				var team = teams[0];
				teamId = team.id;
				if(!team.sync_enabled) {
					isInJetpacksTeam = true;
				}
			}

			if(isTeamSyncEnabled) {
				isInTeam = true;
				isInJetpacksTeam = false;
			}

			var app = "chrome";
			if(postman_electron) {
				app = "mac";
			}

			var appVersion = pm.app.getVersion();

			this.baseObject = {
				"type": "events-general",
				"indexType": "client-events",
				"env": postman_env,
				"propertyVersion": appVersion,
				"propertyId": appId,
				"userId": pm.user.id
			};

			if(!_.isEmpty(teamId)) {
				this.baseObject.teamId = teamId;
			}

			if(postman_electron) {
				this.baseObject.property = "mac_app";
			}
			else {
				this.baseObject.property = "chrome_app";
			}
		},

		run: function() {
			var analyticsEnabled = pm.settings.getSetting("googleAnalytics");
			if(!analyticsEnabled || pm.isTesting) return;


			var changesetArray = [];
			changesetArray = changesetArray.concat(this.addHistoryChangesets(this.baseObject));
			changesetArray = changesetArray.concat(this.addCollectionChangesets(this.baseObject));
			changesetArray = changesetArray.concat(this.addEnvironmentChangesets(this.baseObject));
			var payload = "";
			_.each(changesetArray, function(ca) {
				ca.indexType = "app-events-initial"; //only for bulk changes
				payload += JSON.stringify(ca) + "\n";
			});

			this.sendRequest(payload);
			pm.settings.setSetting("sentBulkAnalytics", true);
			this.toRunBa = false;
			this.modelsLoaded = false;
		},

		addHistoryChangesets: function(baseObject) {
			var retVal = [];
			_.each(pm.history.models, function(model) {
				try {
					var date = model.get("timestamp"),
							timestamp = null;
					if (typeof date === "number") {
						timestamp = (new Date(date)).toISOString();
					}
					else if (typeof date === "string") {
						date = new Date(date);
						timestamp = date.toISOString();
					}
					var thisObject = _.extend(_.clone(baseObject), {'event': 'history_create', 'timestamp': timestamp});
					if(timestamp) {
						retVal.push(thisObject);
					}
				}
				catch(e) {
					console.error("Could not add bulk analytics changeset: " , e);
				}
			});
			return retVal;
		},

		addEnvironmentChangesets: function(baseObject) {
			var retVal = [];
			_.each(pm.environments.models, function(model) {
				try {
					var date = model.get("timestamp"),
							timestamp = null;
					if (typeof date === "number") {
						timestamp = (new Date(date)).toISOString();
					}
					else if (typeof date === "string") {
						date = new Date(date);
						timestamp = date.toISOString();
					}
					if(timestamp) {
						retVal.push(_.extend(_.clone(baseObject), {'event': 'environment_create', 'timestamp': timestamp}));
					}
				}
				catch(e) {
					console.error("Could not add bulk analytics changeset: " , e);
				}
			});
			return retVal;
		},

		addCollectionChangesets: function(baseObject) {
			var retVal = [];
			_.each(pm.collections.models, function(model) {
				try {
					var date = model.get("createdAt"),
							timestamp = null;
					if (typeof date === "number") {
						timestamp = new Date(date).toISOString();
					}
					else if (typeof date === "string") {
						date = new Date(date);
						timestamp = date.toISOString();
					}

					if (!timestamp) {
						date = model.get("updatedAt");
						timestamp = null;
						if (typeof date === "number") {
							timestamp = (new Date(date)).toISOString();
						}
						else if (typeof date === "string") {
							date = new Date(date);
							timestamp = date.toISOString();
						}
					}

					if (timestamp) {
						retVal.push(_.extend(_.clone(baseObject), {'event': 'collection_create', 'timestamp': timestamp}));
					}
				}
				catch(e) {
					console.error("Could not add bulk analytics changeset: " , e);
				}
			});
			return retVal;
		},

		addCurrentEvent: function(category, action, label, value) {
			if(pm.testRunner || pm.isTesting) {
				return;
			}
			var analyticsEnabled = pm.settings.getSetting("googleAnalytics");
			if(!analyticsEnabled) return;

			if(!this.baseObject) {
				this.setBaseObject();
			}

			var timestamp = (new Date()).toISOString();
			var newObject = _.extend(_.clone(this.baseObject), {
				category: category,
				timestamp: timestamp
			});

			if(action) {
				newObject.action = action;
			}
			if(label) {
				newObject.label = label;
			}
			if(value) {
				newObject.value = value;
			}


			this.queuePayload(newObject);
		},

		queuePayload: function(payload) {
			this.payloads.push(payload);
		},

		sendPayloads: function() {
			var analyticsEnabled = pm.settings.getSetting("googleAnalytics");
			if(!analyticsEnabled || pm.isTesting) {
				this.payloads = [];
				return;
			}

			if(this.payloads.length > 0) {
				var payload = "";
				_.each(this.payloads, function(ca) {
					payload += JSON.stringify(ca) + "\n";
				});
				this.sendRequest(payload);
				this.payloads = [];
			}
		},

		sendRequest: function(payload) {
			var url = "https://analytics.getpostman.com/events";
			payload = btoa(payload); //Base-64 encoding for obfuscation
			$.ajax({
				type: 'POST',
				url: url,
				headers: {"Content-Type": "text/plain"},
				data: payload,
				success: function () {
					console.log("Sent /events analytics data");
				}
			});
		}
	});

	module.exports = BulkAnalytics;


/***/ },

/***/ 331:
/***/ function(module, exports) {

	var Mediator = _.extend({}, Backbone.Events);
	module.exports = Mediator;


/***/ },

/***/ 332:
/***/ function(module, exports, __webpack_require__) {

	var AppWindow = Backbone.Model.extend({
	    defaults: function() {
	        return {
	        	id:0,
	            internalEvents: {}
	        };
	    },

	    //throws exception
	    setWindowCloseHandler: function() {
	        if(postman_electron) {
	            this.set("id", this.id)
	        }
	        var oldThis = this;
	        var currWin = chrome.app.window.current();
	        if(currWin) {
	            this.set("id", currWin.id);
	            this.currWin = currWin;
	            currWin.onClosed.addListener(function () {
	                pm.appWindow.trigger("sendMessageObject", "pmWindowClosed", oldThis.get("id"));
	            });
	        }
	        else {
	            throw "Window not initialized";
	        }
	    },

	    initialize: function(options) {
	        var oldThis = this;

	        if(postman_electron) {
	            this.ipc = __webpack_require__(231);
	        }

	        if(typeof pmThisWindowId !== "undefined") {
	            this.set("id", pmThisWindowId);
	        }

	    	this.initializeInternalMessaging();
	        this.trigger("registerInternalEvent", "pmWindowOpened", this.onPmWindowOpened, this);
	        this.trigger("registerInternalEvent", "pmWindowClosed", this.onPmWindowClosed, this);
	        this.trigger("registerInternalEvent", "pmWindowPrimaryChanged", this.onPmWindowPrimaryChanged, this);
	        this.trigger("registerInternalEvent", "forceOtherWindowClose", this.onForceWindowClose, this);
	        this.trigger("registerInternalEvent", "protocolEvent", this.onProtocolEvent, this);

	        var tryLater = false;
	        var oldThis = this;

	        if(!postman_electron) {
	            try {
	                this.setWindowCloseHandler();
	            } catch(e) {
	                tryLater = true;
	            }

	            if(tryLater) {
	                setTimeout(function() {
	                    try {
	                        oldThis.setWindowCloseHandler();
	                    } catch(e) {
	                        console.error("Could not attach handler for window.close()")
	                    }
	                }, 1000);
	            }
	        }
	    },

	    onProtocolEvent: function() {
	        console.log("RECD PROTOCOL: " , arguments);
	    },

	    isPrimaryWindow: function() {
	        if(window.pmPrimaryWindowId === undefined) {
	            return true;
	        }
	        return (window.pmPrimaryWindowId === this.get("id"));
	    },

	    closeAllOtherWindows: function() {
	        window.pmWindowsOpenList = [window.pmPrimaryWindowId];
	        window.pmWindowsOpen = 1;
	        pm.appWindow.trigger("sendMessageObject", "forceOtherWindowClose");
	    },

	    onPmWindowPrimaryChanged: function(newPrimaryId) {
	        window.pmPrimaryWindowId = newPrimaryId;
	        if(newPrimaryId === this.get("id")) {
	            pm.syncManager.initialize();
	        }
	    },

	    onForceWindowClose: function() {
	        //close this window
	        //no questions asked
	        //not needed - main process can close
	        chrome.app.window.current().close();
	    },

	    onPmWindowOpened: function(id) {
	        if(window.pmWindowsOpenList.indexOf(id)==-1) {
	            window.pmWindowsOpen++;
	            window.pmWindowsOpenList.push(id);
	            console.log("New window opened");
	        }

	        //if this is the main window, update sync state
	        var currentId = this.get("id");
	        if(window.pmPrimaryWindowId === currentId) {
	            setTimeout(function() {
	                pm.syncManager.updateStateToAllWindows();
	            },10000);
	        }
	    },

	    onPmWindowClosed: function(id) {
	        var x = window.pmWindowsOpenList.indexOf(id);
	        if(x!==-1) {
	            window.pmWindowsOpenList.splice(x,1);
	            window.pmWindowsOpen--;
	            var currentId = this.get("id");
	            if(window.pmPrimaryWindowId!==currentId && window.pmWindowsOpenList[0]==currentId) {
	                //change this to the primary window
	                window.pmPrimaryWindowId = currentId;
	                pm.appWindow.trigger("sendMessageObject", "pmWindowPrimaryChanged", window.pmPrimaryWindowId);
	                pm.syncManager.attachSyncStatusTriggers();
	                pm.syncManager.initialize();
	            }
	        }
	    },

	    onRegisterInternalEvent: function(e, func, context) {
	        var internalEvents = this.get("internalEvents");
	        internalEvents[e] = {
	            "handler": func,
	            "context": context
	        }
	    },

	    sendToElectron: function(message) {
	        if(postman_electron) {
	            this.ipc.send("messageToElectron",message);
	        }
	    },

	    sendSyncMessage: function(message, arg1) {
	        if(postman_electron) {
	            return this.ipc.sendSync(message,arg1);
	        }
	    },

	    sendMessageObject: function(e, object, object2, object3,
	        object4, object5, object6, object7) {

	        if(postman_electron) {
	            if(object && (typeof object["toJSON"] === "function")) object = object.toJSON();
	            if(object2 && (typeof object2["toJSON"] === "function")) object2 = object2.toJSON();
	            if(object3 && (typeof object3["toJSON"] === "function")) object3 = object3.toJSON();
	            if(object4 && (typeof object4["toJSON"] === "function")) object4 = object4.toJSON();
	            if(object5 && (typeof object5["toJSON"] === "function")) object5 = object5.toJSON();
	            if(object6 && (typeof object6["toJSON"] === "function")) object6 = object6.toJSON();
	            if(object7 && (typeof object7["toJSON"] === "function")) object7 = object7.toJSON();
	        }

	        /*if(window.pmWindowsOpen === 1) {
	            return;
	        }*/
	        var message = {
	            "id": this.get("id"),
	            "event": e,
	            "object": object,
	            "object2": object2,
	            "object3": object3,
	            "object4": object4,
	            "object5": object5,
	            "object6": object6,
	            "object7": object7,
	        };

	        if(postman_electron) {
	            this.ipc.send("sendToAllWindows",JSON.stringify(message));
	        }
	        else {
	            chrome.runtime.sendMessage(message);
	        }
	    },

	    sendMessageWrapper: function(message) {
	      if(postman_electron) {
	        this.ipc.send("sendToAllWindows",JSON.stringify(message));
	      }
	      else {
	        chrome.runtime.sendMessage(message);
	      }
	    },

	    initializeInternalMessaging: function() {
	    	var model = this;
	      this.on("registerInternalEvent", this.onRegisterInternalEvent, this);
	    	this.on("sendMessageObject", this.sendMessageObject, this);

	        if(postman_electron) {
	            model.ipc.on('electronWindowMessage', function(message) {
	                model.handleElectronMessage(message);
	            });

	            if(pm.isTestRunner) {
	                model.ipc.on("setTestRunnerAttrs", function(msg) {
	                    try {
	                        msg = JSON.parse(msg);
	                        window.collectionId = msg.collectionId;
	                        window.folderId = msg.folderId;
	                        window.environmentId = msg.environmentId;
	                    } catch(e) {

	                    }
	                });
	            }

	            //received as confirmation of a new window opening
	            //Why?
	            /*model.ipc.on("openNewWindowConfirmation", function(message) {
	                var newWindowId = message.id;
	                model.trigger("sendMessageObject", "pmWindowOpened", newWindowId);
	            });*/
	        }
	        else {
	        	chrome.runtime.onMessage.addListener(function(message) {
	                model.handleInternalMessage(message);
	        	});
	        }
	    },

	    handleInternalMessage: function(message) {
	        var model = this;
	        if (model.get("id") !== message.id) {
	            var internalEvents = model.get("internalEvents");
	            if (message.event in internalEvents) {
	                var e = message.event;
	                var object = message.object,
	                object2 = message.object2,
	                object3 = message.object3,
	                object4 = message.object4,
	                object5 = message.object5,
	                object6 = message.object6,
	                object7 = message.object7;
	                _.bind(internalEvents[e].handler, internalEvents[e].context)(object, object2, object3, object4, object5, object6, object7);
	            }
	        }
	    },

	    handleElectronMessage: function(message) {
	        var mName = message.name;
	        if(mName === "setWindowIds") {
	            var thisId = message.data.thisId;
	            var primaryId = message.data.primaryId;
	            var allIds = message.data.allIds;
	            pm.electronVersion = message.data.thisVersion;
	            this.set("id", thisId);
	            pmWindowsOpenList = allIds;
	            pmPrimaryWindowId = primaryId;
	            pmWindowsOpen = pmWindowsOpenList.length;
	        }
	        else if(mName==="otherWindowClosed") {
	            var id = message.data.id;
	            this.onPmWindowClosed(id);
	        }
	        else if(mName==="internalEvent") {
	            this.handleInternalMessage(message.data);
	        }
	        else if(mName==="capturedInterceptorRequest") {
	            pm.mediator.trigger("onMessageExternal", message.data);
	        }
	        else if(mName==="protocolEventOnInit") {
	            pm.protocolHandler.onProtocolEvent(message.data);
	        }
	    }
	});

	module.exports = AppWindow;


/***/ },

/***/ 333:
/***/ function(module, exports) {

	var Settings = Backbone.Model.extend({
	    defaults: function() {
	        return {
	            lastRequest:"",
	            autoSaveRequest:true,
	            selectedEnvironmentId:"",
	            type: "chromeStorageArea",
	            items: {}
	        };
	    },

	    resetSettings: function() {
	        this.setSetting("historyCount", 100);
	        this.setSetting("autoSaveRequest", true);
	        this.setSetting("selectedEnvironmentId", true);
	        this.setSetting("lineWrapping", true);
	        this.setSetting("previewType", "parsed");
	        this.setSetting("trimKeysAndValues", false);
	        this.setSetting("retainLinkHeaders", false);
	        this.setSetting("sendNoCacheHeader", true);
	        this.setSetting("sendPostmanTokenHeader", true);
	        this.setSetting("usePostmanProxy", false);
	        this.setSetting("useInterceptor", false);
	        this.setSetting("proxyURL", "");
	        this.setSetting("lastRequest", "");
	        this.setSetting("launcherNotificationCount", 0);
	        this.setSetting("xhrTimeout", 0);
	        this.setSetting("variableDelimiter", "{{...}}");
	        this.setSetting("languageDetection", "auto");
	        this.setSetting("haveDonated", false);
	        this.setSetting("instantModals",true);
	        this.setSetting("responseFontSize",12);

	        //Sync Settings
	        this.setSetting("enableSync", false);
	        this.setSetting("syncInviteShown", false);
	        this.setSetting("baseEulaAccepted", false);
	        //---Sync Settings

	        this.setSetting("postmanTheme", "light");
	        this.setSetting("postmanCodeMirrorTheme", "eclipse");

	        this.setSetting("responsePreviewDataSection", "body");
	        this.setSetting("requestBodyEditorContainerType", "editor");

	        this.setSetting("hideSnippets", false);
	        this.setSetting("hidePrscriptSnippets", false);

	        this.setSetting("historyDateFormat", "{Month} {d}, {yyyy}");
	        this.setSetting("interceptorRedirect", true);

	        /*tabs*/
	        this.setSetting("saveTabs", true);
	        this.setSetting("requestNewTab", false);
	        this.setSetting("trackUnsavedRequests", true);

	        /*googleanalytics*/
	        this.setSetting("googleAnalytics", true);

	        this.setSetting("uiScale", 0);
	    },

	    initValues: function(callback) {
	        this.set({"items": {}});

	        var func = function(settingsJson) {
	            if (settingsJson !== null) {
	                try {
	                    this.set({"items": JSON.parse(settingsJson)});
	                }
	                catch (e) {
	                    console.log("Couldnt parse settings to JSON. String: "+settingsJson);
	                }
	            }

	            if(pm.isTesting) {
	                this.setSetting("requestNewTab", false);
	                this.setSetting("trackUnsavedRequests", false);
	            }

	            this.create("historyCount", 100);
	            this.create("autoSaveRequest", true);
	            this.create("selectedEnvironmentId", true);
	            this.create("lineWrapping", true);
	            this.create("previewType", "parsed");
	            this.create("trimKeysAndValues", false);
	            this.create("retainLinkHeaders", false);
	            this.create("sendNoCacheHeader", true);
	            this.create("sendPostmanTokenHeader", true);
	            this.create("usePostmanProxy", false);
	            this.create("useInterceptor", false);
	            this.create("proxyURL", "");
	            this.create("lastRequest", "");
	            this.create("xhrTimeout", 0);
	            this.create("launcherNotificationCount", 0);
	            this.create("variableDelimiter", "{{...}}");
	            this.create("languageDetection", "auto");
	            this.create("haveDonated", false);
	            this.create("instantModals",true);

	            this.create("postmanTheme", "light");
	            this.create("postmanCodeMirrorTheme", "eclipse");

	            this.create("responsePreviewDataSection", "body");
	            this.create("requestBodyEditorContainerType", "editor");

	            this.create("responseFontSize", 13)
	            this.create("syncedHeaderPresets", false);

	            this.create("hideSnippets", false);
	            this.create("hidePrscriptSnippets", false);

	            this.create("historyDateFormat", "{yyyy}-{MM}-{dd}");

	            this.create("interceptorRedirect", true);
	            this.create("saveTabs", true);
	            this.create("requestNewTab", false);
	            this.create("trackUnsavedRequests", true);
	            this.create("googleAnalytics", true);

	            this.create("uiScale", 0);

	            if (pm.isTesting) {
	                this.resetSettings();
	            }

	            callback();
	        };

	        func = _.bind(func, this);
	        pm.storage.getValue("settings", func);

	        if(!pm.testRunner) {
	            pm.appWindow.trigger("registerInternalEvent", "setSettingFromRunner", this.setSetting, this);
	        }
	    },

	    //This moves to the view initialize script?
	    initListeners: function() {
	    },

	    test: function() {
	        // console.log("Testing the function");
	    },

	    init:function (callback) {
	        this.initValues(callback);
	    },

	    create:function (key, defaultVal) {
	        if (!(key in this.get("items"))) {
	            if (defaultVal !== "undefined") {
	                this.setSetting(key, defaultVal);
	            }
	        }
	    },

	    setSetting:function (key, value) {
	        if(pm.testRunner) {
	            //also send setting to main window so it's persisted
	            pm.appWindow.trigger("sendMessageObject", "setSettingFromRunner", key, value);
	        }

	        //Need to clone otherwise Backbone will not fire the correct event
	        var newItems = _.clone(this.get("items"));
	        newItems[key] = value;
	        this.set({items: newItems});

	        var o = {'settings': JSON.stringify(this.get("items"))};
	        pm.storage.setValue(o, function () {
	        });

	    },

	    getSetting:function (key) {
	        var val = this.get("items")[key];

	        if (val === "true") {
	            return true;
	        }
	        else if (val === "false") {
	            return false;
	        }
	        else {
	            return val;
	        }
	    },

	    update: function(settings) {
	        this.setSetting("historyCount", settings.historyCount, false);
	        this.setSetting("autoSaveRequest", settings.autoSaveRequest, false);
	        this.setSetting("retainLinkHeaders", settings.retainLinkHeaders, false);
	        this.setSetting("sendNoCacheHeader", settings.sendNoCacheHeader, false);
	        this.setSetting("variableDelimiter", settings.variableDelimiter, false);
	        this.setSetting("languageDetection", settings.languageDetection, false);
	        this.setSetting("haveDonated", settings.haveDonated, false);
	        this.setSetting("instantModals",settings.instantModals, false);

	        this.setSetting("enableSync", settings.enableSync, false);
	        this.setSetting("baseEulaAccepted", settings.baseEulaAccepted, false);

	        this.setSetting("responseFontSize", settings.responseFontSize, false);
	        this.setSetting("interceptorRedirect", settings.interceptorRedirect, true);
	        this.setSetting("saveTabs", settings.saveTabs, true);
	        this.setSetting("requestNewTab", settings.requestNewTab, false);
	        this.setSetting("trackUnsavedRequests", settings.trackUnsavedRequests, true);
	        this.setSetting("googleAnalytics", settings.googleAnalytics, true);
	        this.setSetting("uiScale", settings.uiScale, 0);

	        this.initValues();
	        this.initListeners();
	    },

	    getAsJson: function() {
	        var settings = {
	            historyCount: this.getSetting("historyCount"),
	            autoSaveRequest: this.getSetting("autoSaveRequest"),
	            retainLinkHeaders: this.getSetting("retainLinkHeaders"),
	            sendNoCacheHeader: this.getSetting("sendNoCacheHeader"),
	            variableDelimiter: this.getSetting("variableDelimiter"),
	            languageDetection: this.getSetting("languageDetection"),
	            haveDonated: this.getSetting("haveDonated"),
	            instantModals: this.getSetting("instantModals"),
	            responseFontSize: this.getSetting("responseFontSize"),
	            enableSync: this.getSetting("enableSync"),
	            historyDateFormat: this.getSetting("historyDateFormat"),
	            interceptorRedirect: this.getSetting("interceptorRedirect"),
	            saveTabs: this.getSetting("saveTabs"),
	            requestNewTab: this.getSetting("requestNewTab"),
	            trackUnsavedRequests: this.getSetting("trackUnsavedRequests"),
	            googleAnalytics: this.getSetting("googleAnalytics"),
	            uiScale: this.getSetting("uiScale")
	        };

	        return settings;
	    }
	});

	module.exports = Settings;


/***/ },

/***/ 338:
/***/ function(module, exports) {

	var ThemeManager = Backbone.Model.extend({
		defaults: function() {
			return {
				"theme": "light",
				"bootstrap_theme": "default",
				"codemirror_theme": "eclipse"
			}
		},

		initialize: function() {
			console.log("Initialized ThemeManager");

			pm.mediator.on("switchTheme", this.onSwitchTheme, this);

			this.initializeTheme();
		},

		initializeTheme: function() {
			var theme = pm.settings.getSetting("postmanTheme");
			this.switchTheme(theme);
		},

		getCodeMirrorTheme: function() {
			return this.get("codemirror_theme");
		},

		addStylesheet: function(id, file) {
			var head  = document.getElementsByTagName('head')[0];
		    var link  = document.createElement('link');
		    link.setAttribute('id', id);
		    link.setAttribute('rel', 'stylesheet');
		    link.setAttribute('type', 'text/css');
		    link.setAttribute('href', file);
		    link.setAttribute('media', 'all');
		    head.appendChild(link);
		},

		onSwitchTheme: function(theme) {
			this.switchTheme(theme);
		},

		switchTheme: function(theme) {
			$("#container").hide();
			$("#loader").show();

			if (theme === 'light') {
				this.set("theme", theme);
				this.set("bootstrap_theme", "default");
				this.set("codemirror_theme", "eclipse");

				$('link[rel=stylesheet][href~="css/requester/styles.css"]').remove();
				$('link[rel=stylesheet][href~="css/test_runner/styles.css"]').remove();
				$('link[rel=stylesheet][href~="css/requester/styles.dark.css"]').remove();
				$('link[rel=stylesheet][href~="css/test_runner/styles.dark.css"]').remove();
				$('link[rel=stylesheet][href~="css/bootstrap-modal.css"]').remove();

				this.addStylesheet("bootstrap-modal", "css/bootstrap-modal.css");
				this.addStylesheet("postman-theme-light", "css/requester/styles.css");
				if(pm.testRunner) {
					this.addStylesheet("postman-theme-light-test", "css/test_runner/styles.css");
				}

				pm.settings.setSetting("postmanTheme", "light");
				pm.settings.setSetting("postmanCodeMirrorTheme", "clouds");
			}
			else {
				this.set("theme", theme);
				this.set("bootstrap_theme", "slate");
				this.set("codemirror_theme", "dark");

				$('link[rel=stylesheet][href~="css/requester/styles.css"]').remove();
				$('link[rel=stylesheet][href~="css/test_runner/styles.css"]').remove();
				$('link[rel=stylesheet][href~="css/requester/styles.dark.css"]').remove();
				$('link[rel=stylesheet][href~="css/test_runner/styles.dark.css"]').remove();
				$('link[rel=stylesheet][href~="css/bootstrap-modal.css"]').remove();

				this.addStylesheet("bootstrap-modal", "css/bootstrap-modal.css");
				this.addStylesheet("postman-theme-dark", "css/requester/styles.dark.css");

				if(pm.testRunner) {
					this.addStylesheet("postman-theme-dark-test-runner", "css/test_runner/styles.dark.css");
				}

				pm.mediator.trigger("switchCodeMirrorTheme", "monokai");
				pm.settings.setSetting("postmanTheme", "dark");
				pm.settings.setSetting("postmanCodeMirrorTheme", "monokai");
			}

			setTimeout(function() {
				$("#container").velocity("fadeIn", { duration: 500 });
				$("#loader").velocity("fadeOut", { duration: 500 });

				if (theme === 'light') {
					pm.mediator.trigger("switchCodeMirrorTheme", "eclipse");
				}
				else {
					pm.mediator.trigger("switchCodeMirrorTheme", "monokai");
				}

				/* Set overridden scale value on load */
	        	pm.mediator.trigger("updateUIScale", pm.settings.getSetting("uiScale"), 0);
			}, 1000);
		}
	});

	module.exports = ThemeManager;


/***/ },

/***/ 341:
/***/ function(module, exports, __webpack_require__) {

	var CookieManager = Backbone.Model.extend({
		initialize: function() {
			this.cookies = {};
			this.win = __webpack_require__(233).getCurrentWindow();
			this.loadCookies();
		},

		//when the app loads
		//load all session cookies into this.cookies

		//when a request is being sent
		//if the cookies header is present > (call webContent.cookies.set)
		//and add to this.cookies

		//when a response is received
		//for each set cookie header, parse the Set-Cookie header and add it to .set and the store > NOTE- this might never be called
		//also get the cookies for the request's domain, and re-add to this.cookies (if electron parses response headers on it's own)

		loadCookies: function() {
			var oldThis = this;
			this.win.webContents.session.cookies.get({},
			    function(error, cookies) {
			    if (error) throw error;
			    _.each(cookies, function(cookie) {
			    	var domain = cookie.domain;
			    	if(domain[0]=='.') {
			    		domain = domain.substring(1);
			    	}
			    	if(!oldThis.cookies.hasOwnProperty(domain)) {
			    		oldThis.cookies[domain] = {};
			    	}
			    	oldThis.cookies[domain][cookie.name] = cookie;
			    });
			    /*console.log("Loaded cookies: ");
		    	console.log(oldThis.cookies);*/
			    oldThis.trigger("loadedCookies", oldThis.getDomainList());
			});
		},

		/**
		* requestUrl must start with http[s]://
		*/
		reloadCookiesForUrl: function(requestUrl, callback) {
			var oldThis = this;
			this.win.webContents.session.cookies.get({url: requestUrl},
			    function(error, cookies) {
			    if (error) throw error;
			    _.each(cookies, function(cookie) {
			    	if(!oldThis.cookies.hasOwnProperty(cookie.domain)) {
			    		oldThis.cookies[cookie.domain] = {};
			    	}
			    	oldThis.cookies[cookie.domain][cookie.name] = cookie;
			    });
			    //console.log("Loaded cookies: ");
		    	//console.log(oldThis.cookies);
				callback();
			});
		},

		getCookiesForDomain: function(domain) {
			return this.cookies[domain];
		},

		getDomainList: function() {
			var retVal = [];
			for(var domain in this.cookies) {
				if(this.cookies.hasOwnProperty(domain)) {
					retVal.push(domain);
				}
			}
			return retVal;
		},

		getCookiesForUrl: function(url, callback) {
			if(!url) {
				callback([]);
			}
			var cookieManager = this;
			url = ensureProperUrl(url);
			try {
				var urlObject = new URL(url);
				var host  = urlObject.host;
				this.reloadCookiesForUrl(url, function() {
					callback(_.values(cookieManager.getCookiesForDomain(host)));
				});
			} catch(e) {
				//invalid URL
				callback([]);
			}
		},

		/*
		* cookie string is the value of the Cookies header
		* add these cookies to URL
		*/
		addCookies: function(url, cookieString) {
			var oldThis = this;
			try {
				var urlObject = new URL(url);
				var host  = urlObject.host;
				var cookies = this._parseCookieHeader(host, cookieString);
				_.each(cookies, function(cookie) {
					oldThis.addSingleCookie(url, host, cookie);
				});
			}
			catch(e) {
				console.error("Could not add cookies for invalid URL");
				console.error(e);
			}
		},

		addSingleCookie: function(url, host, cookie) {
			var oldThis = this;
			var urlKey = host;
			if(!oldThis.cookies.hasOwnProperty(urlKey)) {
				oldThis.cookies[urlKey] = {};
			}
			//cookie will be loaded once the callback is successful
			//oldThis.cookies[urlKey][cookie.name] = cookie;
			console.log("Setting cookie with url="+cookie.url+", name="+cookie.name+", domain="+host);
			if(cookie.url.indexOf("http://")!==0 && cookie.url.indexOf("https://")!==0) {
				cookie.url = "http://" + cookie.url;
			}

			if(!cookie.domain) {
				cookie.domain = host;
			}
			if(!cookie.path) {
				cookie.path = '/';
			}

			oldThis.win.webContents.session.cookies.set({
				url: cookie.url,
				name: cookie.name,
				value: cookie.value,
				domain: host,
				//session: cookie.HttpOnly,
				secure: cookie.Secure,
				expirationDate: cookie.expires,
				//expirationDate: 2497736186
			},
			function(error) {
				if(error)
					throw error;
				console.log("Cookie set");
				oldThis.loadCookies();
				oldThis.trigger("loadedCookies", oldThis.getDomainList());
			});
		},

		/**
		* Called when a New domain is added from the Cookie Modal
		*/
		addNewDomain: function(domainName) {
			domainName = domainName.toLowerCase();
			if(!this.cookies.hasOwnProperty(domainName)) {
				this.cookies[domainName] = {};
			}
		},

		deleteDomain: function(domain) {
			var cookiesForDomain = this.cookies[domain];
			var oldThis = this;
			delete this.cookies[domain];
			var url = domain;
			for(var cookieName in cookiesForDomain) {
				if(url.indexOf("http://")!==0 && url.indexOf("https://")!==0) {
					url = "http://" + url;
				}
				oldThis.win.webContents.session.cookies.remove({url: url, name: cookieName}, function(error) {
					if(error)
						throw error;
					console.log("Cookie removed");
					oldThis.trigger("loadedCookies", oldThis.getDomainList());
				});
			}

		},

		deleteCookie: function(url, cookieName) {
			var oldThis = this;
			var urlKey = url;
			delete oldThis.cookies[urlKey][cookieName];
			if(url[0]==='.') {
				url = "www" + url;
			}
			if(url.indexOf("http:")!==0 && url.indexOf("https:")!==0) {
				url = "http://" + url;
			}
			oldThis.win.webContents.session.cookies.remove({url: url, name: cookieName}, function(error) {
				if(error)
					throw error;
				console.log("Cookie removed");
				oldThis.trigger("loadedCookies", oldThis.getDomainList());
			});
		},

		/**
		* returns array of cookie objects comaptible with electron
		*/
		_parseCookieHeader: function(host, cookieString) {
			if(!cookieString) return [];

			var cookies = cookieString.split(";");
			var numCookies = cookies.length;
			var retVal = [];
			for(var i=0;i<numCookies;i++) {
				retVal.push(this._parseSingleCookieString(host, cookies[i]));
			}
			return retVal;
		},

		_parseSingleCookieString: function(host, cookieString) {
			//if this was set using the cookie manager, it might have path and domain too
			var thisCookieParts = cookieString.split(";");
			var len = thisCookieParts.length;
			var retVal = {};
			var i=0;


			var thisCookie = thisCookieParts[i].trim().split("=");
			if(thisCookie.length>=1) {
				//Added this to allow cookie values to have '='
				//Zendesk 1344
				try {
					var cName = thisCookie.splice(0,1)[0]; //this is the part before the first =
					var cValue = thisCookie.join("="); //part after the first =
					retVal.url = host;
					retVal.name = cName;
					retVal.value = cValue;
				}
				catch(e) {
					console.log("Error setting cookie: " + e);
				}
			}

			//process all the other parts
			retVal.secure = false;
			retVal.HttpOnly = false;
			i++;
			for(;i<len;i++) {
				//session: cookie.HttpOnly,
				//secure: cookie.Secure,
				//expirationDate: cookie.Expiry,
				//handle special cases for httponly/secure
				var thisParts = thisCookieParts[i].trim().split("=");
				var propName = thisParts.splice(0,1)[0];
				var propVal = thisParts.join("=");

				if(propName==="Secure") {
					retVal.secure = true;
					continue;
				}
				if(propName==="HttpOnly") {
					retVal.session = true;
					continue;
				}
				if(propName==="Expires") {
					var date = new Date(propVal);
					if(date) {
						retVal.expirationDate = date.getTime()/1000;
					}
					continue;
				}

				retVal[propName] = propVal;
			}

			return retVal;
		}
	});

	module.exports = CookieManager;


/***/ },

/***/ 342:
/***/ function(module, exports) {

	var CookieModal = Backbone.View.extend({
	    initialize: function() {
	        var model = this.model;
	        var view = this;
	        $("#cookie-domain-list").on("change", function() {
	            view.selectDomain($(this).val());
	        });

	        $("#cookie-list").on("change", function() {
	            var cookieName = $(this).val();
	            var cookieValue = $("#cookie-list option[value="+cookieName+"]").text();
	            view.selectCookie(cookieName, cookieValue);
	        });

	        $("#add-new-domain").on("click", function() {
	            var domainName = $("#new-domain-name").val();
	            view.addDomain(domainName);
	            $("#new-domain-name").val("");
	        });

	        $("#remove-domain").click(function() {
	            var selectedDomain = $("#cookie-domain-list").val();
	            if(selectedDomain) {
	                model.deleteDomain(selectedDomain);
	            }
	        });

	        $("#add-new-cookie").on("click", function() {
	            var cookieString = $("#new-cookie").val();
	            view.saveCookie(cookieString);
	        });

	        $("#delete-cookie").on("click", function() {
	            var cookieName = $("#cookie-list").val();
	            if(_.isEmpty($("#new-cookie").val())) {
	                return;
	            }
	            $("#new-cookie").val("");
	            view.deleteCookie(cookieName);
	        });


	        model.on("loadedCookies", _.bind(this.loadDomainList, this));

	        $("#modal-cookies").on("shown", function () {
	            pm.app.trigger("modalOpen", "#modal-cookies");
	            model.loadCookies();
	            //view.loadDomainList(model.cookies);
	            //var currDomain = $("#cookie-domain-list").val();
	            //view.selectDomain(currDomain);
	        });

	        $("#modal-cookies").on("hidden", function () {
	            pm.app.trigger("modalClose");
	        });
	    },

	    clearCookieEditor: function() {
	        $("#cookie-list").text("");
	    },

	    loadDomainList: function(list) {
	        if(!(list instanceof Array)) {
	            return
	        }
	        var htmlString = "";
	        var dLen = list.length;
	        for(var i=0;i<dLen;i++) {
	            htmlString += "<option data-domain=\""+list[i]+"\" value=\""+list[i]+"\">"+escape(list[i])+"</option>";
	        }
	        $("#cookie-domain-list").html(htmlString).attr("size", Math.max(dLen,20)); 
	        /*console.log("Loaded domain list: ");
	        console.log(list);*/
	        this.clearCookieEditor();
	    },

	    addDomain: function(domain) {
	        if(domain=="") {
	            return;
	        }
	        domain = domain.toLowerCase();
	        this.model.addNewDomain(domain);
	        $("#cookie-domain-list").append("<option data-domain=\""+domain+"\" value=\""+domain+"\">"+escape(domain)+"</option>");
	    },

	    //called when a domain is selected. this should fetch the relevant cookies from the model and loadCookiesIntoEditor()
	    selectDomain: function(domain) {
	        var cookieList = this.model.getCookiesForDomain(domain);
	        this.loadCookiesIntoEditor(cookieList);
	        var domainToUse = backslashSpecial(domain);
	        $("#cookie-domain-list option[data-domain="+domainToUse+"]").attr('selected', 'selected');
	    },

	    loadCookiesIntoEditor: function(cookieList) {
	        //cookieList is an object
	        //each key is cookie name
	        //each value is an object. needs to be converted to string
	        var view = this;
	        view.clearCookieEditor();
	        var numCookies = 0;
	        for(var cookieName in cookieList) {
	            if(cookieList.hasOwnProperty(cookieName)) {
	                var thisCookie = cookieList[cookieName];
	                if(!_.isEmpty(cookieName)) {
	                    view.addCookieToEditor(thisCookie, view.stringifyCookieObject(thisCookie));
	                    numCookies++;
	                }
	            }
	        }
	        $("#cookie-list").attr("size", Math.max(numCookies,20));
	    },

	    addCookieToEditor: function(cookie, string) {
	        var cookieNameToAdd = backslashSpecial(cookie.name);
	        $("#cookie-list option[data-cookiename="+cookieNameToAdd + "]").remove();
	        $("#cookie-list").append('<option data-cookiename="'+cookieNameToAdd+'" value="'+cookie.name+'">'+string+'</option>');
	    },

	    stringifyCookieObject: function(co) {
	        var retVal = co.name+"="+co.value+"; path="+co.path+"; domain="+co.domain+";";
	        if(co.secure) {
	            retVal += " Secure;";
	        }
	        /*if(co.session)  {
	            retVal += " HttpOnly;";
	        }*/
	        return retVal;
	    },

	    selectCookie: function(cookieName, cookieValue) {
	        $("#new-cookie").val(cookieValue);
	    },

	    saveCookie: function(cookieString) {
	        var oldThis = this;
	        var domain = $("#cookie-domain-list").val();
	        var selectedCookieName = $("#cookie-list").val();

	        //if the name of the old cookie=selectedCookieName, update. Else, add

	        //parse cookieString
	        var cookieObject = this.model._parseSingleCookieString(domain, cookieString);
	        this.model.addSingleCookie(domain, cookieObject.url, cookieObject);
	        setTimeout(function() {
	            oldThis.selectDomain(domain);
	        }, 200);
	    },

	    deleteCookie: function(cookieName) {
	        var oldThis = this;
	        var domain = $("#cookie-domain-list").val();
	        this.model.deleteCookie(domain, cookieName);
	        setTimeout(function() {
	            oldThis.selectDomain(domain);
	        }, 200);
	    }

	});

	module.exports = CookieModal;

/***/ },

/***/ 343:
/***/ function(module, exports) {

	var InterceptorInstaller = Backbone.Model.extend({
		initialize: function() {
			return;
			var installed = pm.settings.getSetting("interceptorManifestInstalled");
			if(!installed || installed=="false") {
				this.installManifest();
				pm.settings.setSetting("interceptorManifestInstalled", true)
			}
		},

		installManifest: function() {
			//copy the interceptor manifest file to the correct location
			//send message to main
			pm.appWindow.sendToElectron({
	            event: "installInterceptorManifest"
	        });
		}
	});

	module.exports = InterceptorInstaller;

/***/ },

/***/ 344:
/***/ function(module, exports) {

	var ElectronTCPReader = Backbone.Model.extend({
		defaults: function() {
			return {
				"socketId": null,
				"socketInfo": null,
				"port": "5005",
				"target_type": "history",
				"target_id": "",
				"status": "disconnected",
				"filters": {
					"url": "",
					"url_disabled": "",
					"methods": "",
					"status_codes": "",
					"content_type": ""
				}
			}
		},

		initialize: function() {
			var model = this;
			$("#modal-tcp-manager").remove();
			pm.storage.getValue("readerSettings", function(settings) {
				if (settings) {
					if(typeof settings === "string") {
						settings = JSON.parse(settings);
					}
					model.set("port", settings.port);
					model.set("target_type", settings.target_type);
					model.set("target_id", settings.target_id);

					model.set("filters", settings.filters);
				}
			});

			pm.appWindow.trigger("registerInternalEvent", "proxyRequestCaptured", this.onProxyRequestCaptured, this);
			pm.appWindow.trigger("registerInternalEvent", "proxyClosed", this.onProxyClosed, this);
			pm.appWindow.trigger("registerInternalEvent", "proxyStarted", this.onProxyStarted, this);
		},

		save: function() {
			var readerSettings = {
				"readerSettings": JSON.stringify({
					"port": this.get("port"),
					"target_type": this.get("target_type"),
					"target_id": this.get("target_id"),
					"filters": this.get("filters")
				})
			};

			pm.storage.setValue(readerSettings, function() {
			});

		},

		onProxyClosed: function() {
			this.stopListening();
			this.set("status", "disconnected");
		},

		onProxyStarted: function(ret) {
			if(ret == "0") {
				this.set("status", "connected");
			}
		},

	    onProxyRequestCaptured: function(requestObject) {
	        var url = requestObject.url,
	            method = requestObject.method,
	            headers = requestObject.headers,
	            data = requestObject.data;

	    	var requestObject = {
	    		url: url, method: method, headers: headers, data: data, name: url
	    	};

	        console.log("Recd request from proxy: " + url + ", " + method);
	        this.addRequestObject(requestObject);
	    },


		isAllowed: function(request) {
			var filters = this.get("filters");
			var methods = filters.methods.split(",");

			function trim(s) {
				return s.trim().toUpperCase();
			}

			var filterMethods = _.each(methods, trim);

			var flagUrlContains = true;
			var flagUrlDisabled = true;
			var flagUrlMethods = true;

			var result;

			// console.log("Filters are", filters);

			if (filters.url === "") {
				flagUrlContains = true;
			}
			else {
				if (request.url.search(filters.url) >= 0) {
					flagUrlContains = true;
				}
				else {
					flagUrlContains = false;
				}
			}

			if (filters.url_disabled === "") {
				flagUrlDisabled = true;
			}
			else {
				if (request.url.search(filters.url_disabled) < 0) {
					flagUrlDisabled = true;
				}
				else {
					flagUrlDisabled = false;
				}
			}

			if (filterMethods.length > 0) {
				flagUrlMethods = _.indexOf(filterMethods, request.method.toUpperCase());
			}
			else {
				flagUrlMethods = true;
			}

			result = flagUrlMethods && flagUrlDisabled && flagUrlContains;
			return result;
		},

		addRequestObject: function(request) {
			var target_type = this.get("target_type");
			var collection;
			var target_id;

			// console.log("Settings are", this.toJSON());

			if (this.isAllowed(request)) {
				//modify request for sync
				request.headers = pm.request.packHeaders(request.headers);
				if (target_type === "history") {
					pm.history.addRequestFromObject(request);
				}
				else {
					target_id = this.get("target_id");
					pm.collections.addRequestToCollectionId(request, target_id);
				}
			}
		},

		startListening: function() {
			var model = this;

			var portToUse = this.get("port");

			pm.appWindow.sendToElectron({
	            event: "startProxy",
	            data: {
	                port: portToUse
	            }
	        });
	        model.set("status", "connected");
		},

		stopListening: function() {
			pm.appWindow.sendToElectron({
	            event: "stopProxy",
	            data: {}
	        });
			this.set("status", "disconnected");
		},

		connect: function() {
			this.startListening();
			this.set("status", "connected");
		},

		disconnect: function() {
			this.stopListening();
			this.set("status", "disconnected");
			if(!pm.settings.getSetting("useInterceptor")) {
				$(".icon-navbar-interceptor").removeClass("active");
			}
		}
	});

	module.exports = ElectronTCPReader;


/***/ },

/***/ 346:
/***/ function(module, exports, __webpack_require__) {

	filesystem = {
	    fs:{},

	    onInitFs:function (filesystem) {
	        pm.filesystem.fs = filesystem;
	    },

	    errorHandler:function (e) {
	        var msg = '';

	        switch (e.code) {
	        case FileError.QUOTA_EXCEEDED_ERR:
	            msg = 'QUOTA_EXCEEDED_ERR';
	            break;
	        case FileError.NOT_FOUND_ERR:
	            msg = 'NOT_FOUND_ERR';
	            break;
	        case FileError.SECURITY_ERR:
	            msg = 'SECURITY_ERR';
	            break;
	        case FileError.INVALID_MODIFICATION_ERR:
	            msg = 'INVALID_MODIFICATION_ERR';
	            break;
	        case FileError.INVALID_STATE_ERR:
	            msg = 'INVALID_STATE_ERR';
	            break;
	        default:
	            msg = 'Unknown Error';
	            break;
	        }

	        console.log('Error: ' + msg);
	    },

	    init:function () {
	        window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, this.onInitFs, this.errorHandler);
	    },

	    //electron
	    removeFileIfExists:function (name, callback) {
	        try {
	            if(postman_electron) {
	                var fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	                fs.unlink(name, function (err) {
	                  callback();
	                });
	            }
	            else {
	                pm.filesystem.fs.root.getFile(name,
	                    {create:false}, function (fileEntry) {
	                        fileEntry.remove(function () {
	                            callback();
	                        }, function () {
	                            callback();
	                        });
	                    }, function () {
	                        callback();
	                    });
	                }
	            }
	        catch(e) {
	            callback();
	        }
	    },

	    renderResponsePreview:function (name, data, type, callback) {
	        name = encodeURI(name);
	        name = name.replace("/", "_");
	        pm.filesystem.removeFileIfExists(name, function () {
	            if(postman_electron) {
	                //write to the file
	                var fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	                var pathForElectron = pm.mainProcessApp.getPath("appData")+"/"+name;
	                fs.writeFile(pathForElectron, data, function(err) {
	                    if(err) {
	                      pm.filesystem.errorHandler(err);
	                    }
	                    else {
	                        callback(pathForElectron);
	                    }
	                });
	            }
	            else {
	                pm.filesystem.fs.root.getFile(name,
	                    {create:true},
	                    function (fileEntry) {
	                        fileEntry.createWriter(function (fileWriter) {

	                            fileWriter.onwriteend = function (e) {
	                                var properties = {
	                                    url:fileEntry.toURL()
	                                };

	                                callback(properties.url);
	                            };

	                            fileWriter.onerror = function (e) {
	                                callback(false);
	                            };

	                            var blob;
	                            if (type === "pdf") {
	                                blob = new Blob([data], {type:'application/pdf'});
	                            }
	                            else {
	                                blob = new Blob([data], {type:'text/plain'});
	                            }
	                            fileWriter.write(blob);


	                        }, pm.filesystem.errorHandler);


	                    }, pm.filesystem.errorHandler
	                );
	            }
	        });
	    },

	    //works with electron
	    saveAndOpenFile:function (name, data, type, callback) {
	        name = encodeURIComponent(name);

	        if(postman_electron) {
	            var fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	            var path = pm.appWindow.sendSyncMessage("getSaveTarget");
	            if(!path) {
	                console.log("Save aborted");
	            }
	            else {
	                console.log("Saving file to " + path);
	                fs.writeFile(path, data, function(err) {
	                    if(err) pm.filesystem.errorHandler(err);
	                    else {
	                        callback();
	                    }
	                });
	            }
	            return;
	        }


	        chrome.fileSystem.chooseEntry({type: 'saveFile', suggestedName: name}, function(writableFileEntry) {
	            if (!writableFileEntry) {
	                return;
	            }

	            writableFileEntry.createWriter(function(writer) {
	                var truncated = false;

	                writer.onerror = function (e) {
	                    callback();
	                };

	                writer.onwriteend = function(e) {
	                    if (!truncated) {
	                        truncated = true;
	                        this.truncate(this.position);
	                        return;
	                    }

	                    // console.log('write complete');
	                    callback();
	                };

	                var blob;
	                if (type === "pdf") {
	                    blob = new Blob([data], {type:'application/pdf'});
	                }
	                else {
	                    blob = new Blob([data], {type:'text/plain'});
	                }

	                writer.write(blob);
	            }, pm.filesystem.errorHandler);
	        });
	    }
	};

	module.exports = filesystem;


/***/ },

/***/ 347:
/***/ function(module, exports) {

	PMindexedDB = {
	    TABLE_HEADER_PRESETS: "header_presets",
	    TABLE_HELPERS: "helpers",
	    TABLE_DRIVE_FILES: "drive_files",
	    TABLE_DRIVE_CHANGES: "drive_changes",
	    TABLE_OAUTH2_ACCESS_TOKENS: "oauth2_access_tokens",
	    TABLE_TEST_RUNS: "test_runs",

	    onTransactionComplete: function(callback) {
	        if (pm.isTesting) {
	            pm.indexedDB.clearAllObjectStores(function() {
	                callback();
	            });
	        }
	        else {
	            callback();
	        }
	    },

	    onerror:function (event, callback) {
	        console.log("Could not load DB", event);
	        pm.alerts.error('Could not load DB');
	    },

	    open_v21:function (callback) {
	        var request = indexedDB.open(pm.databaseName, "POSTman request history");
	        request.onsuccess = function (e) {
	            var v = "0.7.10";
	            pm.indexedDB.db = e.target.result;
	            var db = pm.indexedDB.db;

	            //We can only create Object stores in a setVersion transaction
	            if (v !== db.version) {
	                var setVrequest = db.setVersion(v);

	                setVrequest.onfailure = function (e) {
	                    console.log(e);
	                };

	                setVrequest.onsuccess = function (event) {
	                    //Only create if does not already exist
		                if (!db.objectStoreNames.contains("requests")) {
			                var requestStore = db.createObjectStore("requests", {keyPath:"id"});
			                requestStore.createIndex("timestamp", "timestamp", { unique:false});
		                }

		                if (!db.objectStoreNames.contains("systemValues")) {
			                var requestStore = db.createObjectStore("systemValues", {keyPath:"name"});
			                requestStore.createIndex("name", "name", { unique:true});
		                }

	                    if (!db.objectStoreNames.contains("collections")) {
	                        var collectionsStore = db.createObjectStore("collections", {keyPath:"id"});
	                        collectionsStore.createIndex("timestamp", "timestamp", { unique:false});
	                    }

	                    if (!db.objectStoreNames.contains("collection_requests")) {
	                        var collectionRequestsStore = db.createObjectStore("collection_requests", {keyPath:"id"});
	                        collectionRequestsStore.createIndex("timestamp", "timestamp", { unique:false});
	                        collectionRequestsStore.createIndex("collectionId", "collectionId", { unique:false});
	                    }

		                if (!db.objectStoreNames.contains("unsynced_changes")) {
			                var unsyncedChanges = db.createObjectStore("unsynced_changes", {keyPath:"id"});
			                unsyncedChanges.createIndex("timestamp", "timestamp", { unique:false});
		                }


		                if (db.objectStoreNames.contains("collection_responses")) {
	                        db.deleteObjectStore("collection_responses");
	                    }

	                    if (!db.objectStoreNames.contains("environments")) {
	                        var environmentsStore = db.createObjectStore("environments", {keyPath:"id"});
	                        environmentsStore.createIndex("timestamp", "timestamp", { unique:false});
	                        environmentsStore.createIndex("id", "id", { unique:false});
	                    }

	                    if (!db.objectStoreNames.contains("header_presets")) {
	                        var headerPresetsStore = db.createObjectStore("header_presets", {keyPath:"id"});
	                        headerPresetsStore.createIndex("timestamp", "timestamp", { unique:false});
	                    }

	                    if (!db.objectStoreNames.contains(pm.indexedDB.TABLE_HELPERS)) {
	                        var helpersStore = db.createObjectStore(pm.indexedDB.TABLE_HELPERS, {keyPath:"id"});
	                        helpersStore.createIndex("timestamp", "timestamp", { unique:false});
	                    }

	                    if (!db.objectStoreNames.contains(pm.indexedDB.TABLE_DRIVE_FILES)) {
	                        var driveFilesStore = db.createObjectStore(pm.indexedDB.TABLE_DRIVE_FILES, {keyPath:"id"});
	                        driveFilesStore.createIndex("timestamp", "timestamp", { unique:false});
	                        driveFilesStore.createIndex("fileId", "fileId", { unique:false});
	                    }
	                    else {
	                        var driveFilesStoreForIndex = request.transaction.objectStore(pm.indexedDB.TABLE_DRIVE_FILES);
	                        driveFilesStoreForIndex.createIndex("fileId", "fileId", { unique:false});
	                    }

	                    if (!db.objectStoreNames.contains(pm.indexedDB.TABLE_DRIVE_CHANGES)) {
	                        var driveChangesStore = db.createObjectStore(pm.indexedDB.TABLE_DRIVE_CHANGES, {keyPath:"id"});
	                        driveChangesStore.createIndex("timestamp", "timestamp", { unique:false});
	                    }

	                    if (!db.objectStoreNames.contains(pm.indexedDB.TABLE_OAUTH2_ACCESS_TOKENS)) {
	                        var accessTokenStore = db.createObjectStore(pm.indexedDB.TABLE_OAUTH2_ACCESS_TOKENS, {keyPath:"id"});
	                        accessTokenStore.createIndex("timestamp", "timestamp", { unique:false});
	                    }

	                    if (!db.objectStoreNames.contains(pm.indexedDB.TABLE_TEST_RUNS)) {
	                        var environmentsStore = db.createObjectStore(pm.indexedDB.TABLE_TEST_RUNS, {keyPath:"id"});
	                        environmentsStore.createIndex("timestamp", "timestamp", { unique:false});
	                    }

	                    if (!db.objectStoreNames.contains("client_notifications")) {
	                        var notificationsStore = db.createObjectStore("client_notifications", {keyPath:"id"});
	                        notificationsStore.createIndex("timestamp", "timestamp", { unique:false});
	                    }

	                    var transaction = event.target.result;
	                    transaction.oncomplete = pm.indexedDB.onTransactionComplete;
	                };

	                setVrequest.onupgradeneeded = function (evt) {
	                };
	            }
	        };

	        request.onfailure = pm.indexedDB.onerror;
	    },

	    open_latest:function (callback) {
	        var v = 43;
	        var request = indexedDB.open(pm.databaseName, v);
	        request.onupgradeneeded = function (e) {
	            console.log("Upgrade DB");
	            var db = e.target.result;
	            pm.indexedDB.db = db;

	            if (!db.objectStoreNames.contains("requests")) {
	                var requestStore = db.createObjectStore("requests", {keyPath:"id"});
	                requestStore.createIndex("timestamp", "timestamp", { unique:false});
	            }

	            if (!db.objectStoreNames.contains("systemValues")) {
	                var requestStore = db.createObjectStore("systemValues", {keyPath:"name"});
	                requestStore.createIndex("name", "name", { unique:true});
	            }

	            if (!db.objectStoreNames.contains("sinceIds")) {
	                var requestStore = db.createObjectStore("sinceIds", {keyPath:"id"});
	                requestStore.createIndex("id", "id", { unique:true});
	            }

	            if (!db.objectStoreNames.contains("requestTabs")) {
	                var requestStore = db.createObjectStore("requestTabs", {keyPath:"id"});
	                requestStore.createIndex("id", "id", { unique:true});
	                requestStore.createIndex("timestamp", "timestamp", { unique:false});
	            }

	            if (!db.objectStoreNames.contains("domainCookies")) {
	                var requestStore = db.createObjectStore("domainCookies", {keyPath:"domain"});
	                requestStore.createIndex("domain", "domain", { unique:false});
	                //requestStore.createIndex("timestamp", "timestamp", { unique:false});
	            }

	            //this table will have userId:collectionId values. That's it
	            if (!db.objectStoreNames.contains("subscriptions")) {
	                var requestStore = db.createObjectStore("subscriptions", {keyPath:"id"});
	                requestStore.createIndex("id", "id", { unique:true});
	            }

	            if (!db.objectStoreNames.contains("collections")) {
	                var collectionsStore = db.createObjectStore("collections", {keyPath:"id"});
	                collectionsStore.createIndex("timestamp", "timestamp", { unique:false});
	            }

				if (!db.objectStoreNames.contains("unsynced_changes")) {
					var unsyncedChanges = db.createObjectStore("unsynced_changes", {keyPath:"id"});
					unsyncedChanges.createIndex("timestamp", "timestamp", { unique:false});
				}

	            if (!db.objectStoreNames.contains("sync_conflicts")) {
	                //here, id will be request:<request_id>[:transfer]
	                var unsyncedChanges = db.createObjectStore("sync_conflicts", {keyPath:"id"});
	                unsyncedChanges.createIndex("id", "id", { unique:true});
	            }

	            if (!db.objectStoreNames.contains("collection_requests")) {
	                var collectionRequestsStore = db.createObjectStore("collection_requests", {keyPath:"id"});
	                collectionRequestsStore.createIndex("timestamp", "timestamp", { unique:false});
	                collectionRequestsStore.createIndex("collectionId", "collectionId", { unique:false});
					collectionRequestsStore.createIndex("folderId", "folderId", { unique:false});
	            }

	            if (!db.objectStoreNames.contains("environments")) {
	                var environmentsStore = db.createObjectStore("environments", {keyPath:"id"});
	                environmentsStore.createIndex("timestamp", "timestamp", { unique:false});
	                environmentsStore.createIndex("id", "id", { unique:false});
	            }

	            if (!db.objectStoreNames.contains("header_presets")) {
	                var headerPresetsStore = db.createObjectStore("header_presets", {keyPath:"id"});
	                headerPresetsStore.createIndex("timestamp", "timestamp", { unique:false});
	            }

	            if (!db.objectStoreNames.contains(pm.indexedDB.TABLE_HELPERS)) {
	                var helpersStore = db.createObjectStore(pm.indexedDB.TABLE_HELPERS, {keyPath:"id"});
	                helpersStore.createIndex("timestamp", "timestamp", { unique:false});
	            }

	            if (!db.objectStoreNames.contains(pm.indexedDB.TABLE_DRIVE_FILES)) {
	                var driveFilesStore = db.createObjectStore(pm.indexedDB.TABLE_DRIVE_FILES, {keyPath:"id"});
	                driveFilesStore.createIndex("timestamp", "timestamp", { unique:false});
	                driveFilesStore.createIndex("fileId", "fileId", { unique:false});
	            }

	            if (!db.objectStoreNames.contains(pm.indexedDB.TABLE_DRIVE_CHANGES)) {
	                var driveChangesStore = db.createObjectStore(pm.indexedDB.TABLE_DRIVE_CHANGES, {keyPath:"id"});
	                driveChangesStore.createIndex("timestamp", "timestamp", { unique:false});
	            }

	            if (!db.objectStoreNames.contains(pm.indexedDB.TABLE_OAUTH2_ACCESS_TOKENS)) {
	                var accessTokenStore = db.createObjectStore(pm.indexedDB.TABLE_OAUTH2_ACCESS_TOKENS, {keyPath:"id"});
	                accessTokenStore.createIndex("timestamp", "timestamp", { unique:false});
	            }

	            if (!db.objectStoreNames.contains(pm.indexedDB.TABLE_TEST_RUNS)) {
	                var environmentsStore = db.createObjectStore(pm.indexedDB.TABLE_TEST_RUNS, {keyPath:"id"});
	                environmentsStore.createIndex("timestamp", "timestamp", { unique:false});
	            }

	            if (!db.objectStoreNames.contains("client_notifications")) {
	                var notificationStore = db.createObjectStore("client_notifications", {keyPath:"id"});
	                notificationStore.createIndex("timestamp", "timestamp", { unique:false});
	            }
	        };


	        request.onsuccess = function (e) {
	                setTimeout(function() {
	                    pm.indexedDB.db = e.target.result;
	                    pm.indexedDB.onTransactionComplete(callback);
	                },200);
	        };

	        request.onerror = pm.indexedDB.onerror;
	    },

	    open:function (callback) {
	        if (parseInt(navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)[2]) < 23) {
	            pm.indexedDB.open_v21(callback);
	        }
	        else {
	            console.log("Open latest DB");
	            pm.indexedDB.open_latest(callback);
	        }

	        pm.mediator.on("initiateBackup", pm.indexedDB.downloadAllData);
	    },



		getSince: function(callback) {
	        //will return an array
	        //[{own:0},{"u1:c1":2}...]
			var db = pm.indexedDB.db;
			var trans = db.transaction(["sinceIds"], "readwrite");
			var store = trans.objectStore("sinceIds");


	        var keyRange = IDBKeyRange.only("own");
	        var index = store.index("id");
	        var cursorRequest = index.openCursor(keyRange);
	        var sinces = [];

	        cursorRequest.onsuccess = function (e) {
	            var result = e.target.result;

	            if (!result) {
	                if(sinces.length === 0) {
	                    console.log("Since not found...resetting to 0");
	                    var request2 = store.put({"id": "own", "value": 0});
	                    sinces = [{"id": "own", "value": 0}];
	                }
	                if (callback) {
	                    callback(sinces);
	                }

	                return;
	            }

	            var change = result.value;
	            sinces.push(change);

	            //This wil call onsuccess again and again until no more request is left
	            result['continue']();
	        };

	        cursorRequest.onerror = pm.indexedDB.onerror;
		},

	    getLastSynced: function(callback) {
	        //will return an array
	        //[{own:0},{"u1:c1":2}...]

	        var db = pm.indexedDB.db;
	        var trans = db.transaction(["sinceIds"], "readwrite");
	        var store = trans.objectStore("sinceIds");


	        var keyRange = IDBKeyRange.only("ownLastSynced");
	        var index = store.index("id");
	        var cursorRequest = index.openCursor(keyRange);
	        var sinces = [];

	        cursorRequest.onsuccess = function (e) {
	            var result = e.target.result;

	            if (!result) {
	                if(sinces.length === 0) {
	                    console.log("LastSynced not found...resetting to 0");
	                    var request2 = store.put({"id": "ownLastSynced", "value": 1});
	                    sinces = [{"id": "ownLastSynced", "value": 1}];
	                }
	                if (callback) {
	                    callback(sinces);
	                }

	                return;
	            }

	            var change = result.value;
	            if(!change.value) {
	                store.put({"id": "ownLastSynced", "value": 1});
	                change.value = -1;
	            }
	            sinces.push(change);

	            //This wil call onsuccess again and again until no more request is left
	            result['continue']();
	        };

	        cursorRequest.onerror = pm.indexedDB.onerror;
	    },

	    updateSince: function(value, timestamp, callback) {
	        var db = pm.indexedDB.db;
	        var trans = db.transaction(["sinceIds"], "readwrite");
	        var store = trans.objectStore("sinceIds");

	        var boundKeyRange = IDBKeyRange.only("own");
	        var request = store.put({id:"own", value:value});

	        request.onsuccess = function (e) {
	            callback(value);
	        };

	        request.onerror = function (e) {
	            callback(value);
	        };
	    },

	     updateLastSynced: function(value, callback) {
	        var db = pm.indexedDB.db;
	        var trans = db.transaction(["sinceIds"], "readwrite");
	        var store = trans.objectStore("sinceIds");

	        var boundKeyRange = IDBKeyRange.only("ownLastSynced");
	        var request = store.put({id:"ownLastSynced", value:value});

	        request.onsuccess = function (e) {
	            callback(value);
	        };

	        request.onerror = function (e) {
	            callback(value);
	        };
	    },


	    deleteAllSince: function(callback) {
	        var db = pm.indexedDB.db;
	        var trans = db.transaction(["sinceIds"], "readwrite");
	        var store = trans.objectStore("sinceIds");
	        var request = store.clear();
	    },

	    updateLocalSince: function(value, timestamp, callback) {
	        var db = pm.indexedDB.db;
	        var trans = db.transaction(["sinceIds"], "readwrite");
	        var store = trans.objectStore("sinceIds");

	        var boundKeyRange = IDBKeyRange.only("own");
	        var request = store.put({id:"own", value:value});

	        request.onsuccess = function (e) {
	            callback(value);
	        };

	        request.onerror = function (e) {
	            console.log(e.value);
	        };
	    },

	    updateSubscribedSince: function(subscriptionId, value, timestamp, callback) {
	        var db = pm.indexedDB.db;
	        var trans = db.transaction(["sinceIds"], "readwrite");
	        var store = trans.objectStore("sinceIds");

	        var boundKeyRange = IDBKeyRange.only(subscriptionId);
	        var request = store.put({"id":"subscriptionId",value: value});

	        request.onsuccess = function (e) {
	            callback(value);
	        };

	        request.onerror = function (e) {
	            console.log(e.value);
	        };
	    },

	    deleteAllSyncValues: function(callback) {
	        var db = pm.indexedDB.db;
	        var trans = db.transaction(["systemValues"], "readwrite");
	        var store = trans.objectStore("systemValues");
	        var request = store.clear();
	        request.onsuccess = function () {
	            callback();

	        };
	    },

	    addSyncConflict: function(conflict, callback) {
	        var db = pm.indexedDB.db;
	        var trans = db.transaction(["sync_conflicts"], "readwrite");
	        var store = trans.objectStore("sync_conflicts");

	        var request;

	        request = store.put(conflict);

	        request.onsuccess = function () {
	            callback(conflict);

	        };

	        request.onerror = function (e) {
	            console.log(e.value);
	        };
	    },

	    getAllConflicts: function(callback) {
	        var db = pm.indexedDB.db;
	        if (db === null) {
	            return;
	        }

	        var trans = db.transaction(["sync_conflicts"], "readwrite");
	        var store = trans.objectStore("sync_conflicts");

	        //Get everything in the store
	        var keyRange = IDBKeyRange.lowerBound(0);
	        var index = store.index("id");
	        var cursorRequest = index.openCursor(keyRange);
	        var changes = [];

	        cursorRequest.onsuccess = function (e) {
	            var result = e.target.result;

	            if (!result) {
	                if (callback) {
	                    callback(changes);
	                }

	                return;
	            }

	            var change = result.value;
	            changes.push(change);

	            //This wil call onsuccess again and again until no more request is left
	            result['continue']();
	        };

	        cursorRequest.onerror = pm.indexedDB.onerror;
	    },

	    updateSyncConflict:function (conflict, callback) {
	        try {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction(["sync_conflicts"], "readwrite");
	            var store = trans.objectStore(["sync_conflicts"]);

	            var boundKeyRange = IDBKeyRange.only(conflict.id);
	            var request = store.put(conflict);

	            request.onsuccess = function () {
	                callback(changeset);
	            };

	            request.onerror = function (e) {
	                console.log(e);
	            };
	        }
	        catch (e) {
	            console.log(e);
	        }
	    },

	    clearSyncConflicts: function() {
	        var db = pm.indexedDB.db;
	        if (db === null) {
	            return;
	        }

	        var trans = db.transaction(["sync_conflicts"], "readwrite");
	        var store = trans.objectStore("sync_conflicts");

	        store.clear();
	    },

		addUnsyncedChange: function(unsyncedChange, callback) {
			var db = pm.indexedDB.db;
			var trans = db.transaction(["unsynced_changes"], "readwrite");
			var store = trans.objectStore("unsynced_changes");

			var request;

			request = store.put(unsyncedChange);
	        //console.log("Adding unsynced change to DB: " + unsyncedChange.id);

			request.onsuccess = function () {
				callback(unsyncedChange);
			};

			request.onerror = function (e) {
				console.log(e.value);
			};
		},

	    addUnsyncedChanges: function(changeArray, callback) {
	        var db = pm.indexedDB.db;
	        var trans = db.transaction(["unsynced_changes"], "readwrite");
	        var store = trans.objectStore("unsynced_changes");

	        var request;
	        var numChanges = changeArray.length;
	        for(var i=0;i<numChanges;i++) {
	            var unsyncedChange = changeArray[i];
	            request = store.put(unsyncedChange);
	            //console.log("Adding unsynced change to DB: " + unsyncedChange.id);
	        }
	        request.onsuccess = function () {
	            if(typeof callback === "function") {
	                callback();
	            }
	        };
	        request.onerror = function (e) {
	            console.log(e.value);
	        };
	    },

		getUnsyncedChanges:function (callback) {
			var db = pm.indexedDB.db;
			if (db === null) {
				return;
			}

			var trans = db.transaction(["unsynced_changes"], "readwrite");
			var store = trans.objectStore("unsynced_changes");

			//Get everything in the store
			var keyRange = IDBKeyRange.lowerBound(0);
			var index = store.index("timestamp");
			var cursorRequest = index.openCursor(keyRange);
			var changes = [];

			cursorRequest.onsuccess = function (e) {
				var result = e.target.result;

				if (!result) {
					if (callback) {
						callback(changes);
					}

					return;
				}

				var change = result.value;
				changes.push(change);

				//This wil call onsuccess again and again until no more request is left
				result['continue']();
			};

			cursorRequest.onerror = pm.indexedDB.onerror;
		},

		updateUnsyncedChange:function (changeset, callback) {
			try {
				var db = pm.indexedDB.db;
				var trans = db.transaction(["unsynced_changes"], "readwrite");
				var store = trans.objectStore(["unsynced_changes"]);

				var boundKeyRange = IDBKeyRange.only(changeset.id);
				var request = store.put(changeset);
	            //console.log("Updating unsynced change to DB: " + changeset.id);

				request.onsuccess = function () {
	                if(callback) {
	                    callback(changeset);
	                }
				};

				request.onerror = function (e) {
					console.log(e);
				};
			}
			catch (e) {
				console.log(e);
			}
		},

	    deleteUnsyncedChange:function (id, callback) {
	        try {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction(["unsynced_changes"], "readwrite");
	            var store = trans.objectStore(["unsynced_changes"]);

	            var request = store['delete'](id);
	            //console.log("Deleting unsynced change from DB: " + id);

	            request.onsuccess = function () {
	                if(typeof callback === "function") {
	                    callback(id);
	                }
	            };

	            request.onerror = function (e) {
	                console.log(e);
	            };
	        }
	        catch (e) {
	            console.log(e);
	        }
	    },

		clearUnsyncedChanges: function() {
			var db = pm.indexedDB.db;
			if (db === null) {
				return;
			}

			var trans = db.transaction(["unsynced_changes"], "readwrite");
			var store = trans.objectStore("unsynced_changes");

			store.clear();
		},

		getAllSyncNotifs:function (callback) {
			var db = pm.indexedDB.db;
			if (db === null) {
				return;
			}

			var trans = db.transaction(["systemValues"], "readwrite");
			var store = trans.objectStore("systemValues");

			var cursorRequest = store.get("syncNotifs");

			cursorRequest.onsuccess = function (e) {
				if(e===undefined || e.target.result===undefined) {
					console.log("No notifs found");
					var boundKeyRange = IDBKeyRange.only("syncNotifs");
					var request2 = store.put({"name":"syncNotifs",value: []});
					callback({name: "syncNotifs", value: []});
				}
				else {
					var result = e.target.result;
					callback(result);
				}
			};
		},

	    updateSyncNotifs: function(syncNotifs, callback) {

	        var db = pm.indexedDB.db;
	        var trans = db.transaction(["systemValues"], "readwrite");
	        var store = trans.objectStore("systemValues");

	        var boundKeyRange = IDBKeyRange.only("syncNotifs");
	        var objToStore = {
	            "name": "syncNotifs",
	            "value": syncNotifs
	        };
	        var request = store.put(objToStore);

	        request.onsuccess = function (e) {
	            callback(syncNotifs);
	        };

	        request.onerror = function (e) {
	            console.log(e.value);
	        };
	    },

	    addCollection:function (collection, callback) {
	        var db = pm.indexedDB.db;
	        var trans = db.transaction(["collections"], "readwrite");
	        var store = trans.objectStore("collections");

	        var request;

	        try {
	            request = store.put(collection);
	        }
	        catch(e) {
	            pm.syncLogger.error("Error adding collection to DB - " + e.value + ". CollectionJSON: " + JSON.stringify(collection));
	            console.error("Error adding collection to DB: " + e.value);
	        }

	        request.onsuccess = function () {
	            callback(collection);
	        };

	        request.onerror = function (e) {
	            pm.syncLogger.error("Error adding collection to DB - " + e.value + ". CollectionJSON: " + JSON.stringify(collection));
	            console.error("Error adding collection to DB: " + e.value);
	        };
	    },

	    updateCollection:function (collection, oldCollection, toSync, callback) {
	        var db = pm.indexedDB.db;
	        var trans = db.transaction(["collections"], "readwrite");
	        var store = trans.objectStore("collections");

	        var boundKeyRange = IDBKeyRange.only(collection.id);
	        var request = store.put(collection);
	        request.onsuccess = function (e) {
	            callback(collection);

	        };

	        request.onerror = function (e) {
	            console.error("Error: ", e.value);
	            callback(collection);
	        };
	    },

	    addCollectionRequest:function (req, toSync, callback) {
	        var db = pm.indexedDB.db;
	        var trans = db.transaction(["collection_requests"], "readwrite");
	        var store = trans.objectStore("collection_requests");


	        var collectionRequest = store.put(req);
		    var oldThis=this;
	        collectionRequest.onsuccess = function () {
	            callback(req);
	        };

	        collectionRequest.onerror = function (e) {
	            console.error(e.value);
	        };
	    },

	    updateCollectionRequest:function (req, oldRequest, toSync, callback) {
	        var db = pm.indexedDB.db;
	        var trans = db.transaction(["collection_requests"], "readwrite");
	        var store = trans.objectStore("collection_requests");

	        var boundKeyRange = IDBKeyRange.only(req.id);
	        var request = store.put(req);
	        request.onsuccess = function (e) {
	            callback(req);
	        };

	        request.onerror = function (e) {
	            console.log("Error: ", e.value);
	            callback(req);
	        };
	    },

	    getCollection:function (id, callback) {
	        var db = pm.indexedDB.db;
	        var trans = db.transaction(["collections"], "readwrite");
	        var store = trans.objectStore("collections");

	        //Get everything in the store
	        var cursorRequest = store.get(id);

	        cursorRequest.onsuccess = function (e) {
	            var result = e.target.result;
	            callback(result);
	        };
	        cursorRequest.onerror = pm.indexedDB.onerror;
	    },

	    getCollections:function (callback) {
	        var db = pm.indexedDB.db;

	        if (db === null) {
	            return;
	        }

	        var trans = db.transaction(["collections"], "readwrite");
	        var store = trans.objectStore("collections");

	        //Get everything in the store
	        var keyRange = IDBKeyRange.lowerBound(0);
	        var cursorRequest = store.openCursor(keyRange);
	        var numCollections = 0;
	        var items = [];
	        cursorRequest.onsuccess = function (e) {
	            var result = e.target.result;
	            if (!result) {
	                callback(items);
	                return;
	            }

	            var collection = result.value;
	            numCollections++;

	            items.push(collection);

	            result['continue']();
	        };

	        cursorRequest.onerror = function (e) {
	            console.log(e);
	        };
	    },

	    deleteAllCollections: function(cb) {
	        var db = pm.indexedDB.db;
	        var trans = db.transaction(["collections"], "readwrite");
	        var store = trans.objectStore("collections");
	        var request = store.clear();
	        request.onsuccess = function() {
	            cb();
	        }
	    },

	    getAllCollectionRequests:function (callback) {
	        var db = pm.indexedDB.db;
	        if (db === null) {
	            return;
	        }

	        var trans = db.transaction(["collection_requests"], "readwrite");
	        var store = trans.objectStore("collection_requests");

	        //Get everything in the store
	        var keyRange = IDBKeyRange.lowerBound(0);
	        var index = store.index("timestamp");
	        var cursorRequest = index.openCursor(keyRange);
	        var collectionRequests = [];

	        cursorRequest.onsuccess = function (e) {
	            var result = e.target.result;

	            if (!result) {
	                if (callback) {
	                    callback(collectionRequests);
	                }

	                return;
	            }

	            var request = result.val
	            collectionRequests.push(request);

	            //This wil call onsuccess again and again until no more request is left
	            result['continue']();
	        };

	        cursorRequest.onerror = pm.indexedDB.onerror;
	    },

	    getAllRequestsForCollectionId:function (id, callback) {
	        var db = pm.indexedDB.db;
	        var trans = db.transaction(["collection_requests"], "readwrite");

	        //Get everything in the store
	        var keyRange = IDBKeyRange.only(id);
	        var store = trans.objectStore("collection_requests");

	        var index = store.index("collectionId");
	        var cursorRequest = index.openCursor(keyRange);

	        var requests = [];

	        cursorRequest.onsuccess = function (e) {
	            var result = e.target.result;

	            if (!result) {
	                callback(requests);
	                return;
	            }

	            var request = result.value;
	            requests.push(request);

	            //This wil call onsuccess again and again until no more request is left
	            result['continue']();
	        };
	        cursorRequest.onerror = pm.indexedDB.onerror;
	    },

	    getAllRequestsInCollection:function (collection, callback) {
	        var db = pm.indexedDB.db;
	        var trans = db.transaction(["collection_requests"], "readwrite");

	        //Get everything in the store
	        var keyRange = IDBKeyRange.only(collection.id);
	        var store = trans.objectStore("collection_requests");

	        var index = store.index("collectionId");
	        var cursorRequest = index.openCursor(keyRange);

	        var requests = [];

	        cursorRequest.onsuccess = function (e) {
	            var result = e.target.result;

	            if (!result) {
	                callback(collection, requests);
	                return;
	            }

	            var request = result.value;
	            requests.push(request);

	            //This wil call onsuccess again and again until no more request is left
	            result['continue']();
	        };
	        cursorRequest.onerror = pm.indexedDB.onerror;
	    },

	    addRequest:function (historyRequest, callback) {
	        var db = pm.indexedDB.db;
	        var trans = db.transaction(["requests"], "readwrite");
	        var store = trans.objectStore("requests");
	        var request = store.put(historyRequest);

	        request.onsuccess = function (e) {
	            callback(historyRequest);
	        };

	        request.onerror = function (e) {
	            console.log(e.value);
	        };
	    },

	    getRequest:function (id, callback) {
	        var db = pm.indexedDB.db;
	        var trans = db.transaction(["requests"], "readwrite");
	        var store = trans.objectStore("requests");

	        //Get everything in the store
	        var cursorRequest = store.get(id);

	        cursorRequest.onsuccess = function (e) {
	            var result = e.target.result;
	            if (!result) {
	                return;
	            }

	            callback(result);
	        };
	        cursorRequest.onerror = pm.indexedDB.onerror;
	    },

	    deleteAllHistoryRequests: function(cb) {
	        var db = pm.indexedDB.db;
	        var trans = db.transaction(["requests"], "readwrite");
	        var store = trans.objectStore("requests");
	        var request = store.clear();
	        request.onsuccess = cb;
	    },

	    getCollectionRequest:function (id, callback) {
	        var db = pm.indexedDB.db;
	        var trans = db.transaction(["collection_requests"], "readwrite");
	        var store = trans.objectStore("collection_requests");

	        if(typeof id !== "string") {
	            //incorrect input passed
	            var error = new Error();
	            pm.syncLogger.error("Bad request id = " +JSON.stringify(id) +"  . Stack: " + error.stack);
	            callback(null);
	            return null;
	        }

	        //Get everything in the store
	        var cursorRequest = store.get(id);

	        cursorRequest.onsuccess = function (e) {
	            var result = e.target.result;
	            if (!result) {
	                //pm.syncLogger.error("Could not find a request with this ID: " + id);
	                callback(null);
	                return;
	            }

	            callback(result);
	            return result;
	        };
	        cursorRequest.onerror = function(e) {
	            //pm.syncLogger.error("Could not find a request with this ID: " + id);
	            callback(null);
	        }
	    },


	    getAllRequestItems:function (callback) {
	        var db = pm.indexedDB.db;
	        if (db === null) {
	            return;
	        }

	        var trans = db.transaction(["requests"], "readwrite");
	        var store = trans.objectStore("requests");

	        //Get everything in the store
	        var keyRange = IDBKeyRange.lowerBound(0);
	        var index = store.index("timestamp");
	        var cursorRequest = index.openCursor(keyRange);
	        var historyRequests = [];

	        cursorRequest.onsuccess = function (e) {
	            var result = e.target.result;

	            if (!result) {
	                callback(historyRequests);
	                return;
	            }

	            var request = result.value;
	            historyRequests.push(request);

	            //This wil call onsuccess again and again until no more request is left
	            result['continue']();
	        };

	        cursorRequest.onerror = pm.indexedDB.onerror;
	    },

		deleteRequest:function (id, callback) {
			try {
				var db = pm.indexedDB.db;
				var trans = db.transaction(["requests"], "readwrite");
				var store = trans.objectStore(["requests"]);

				var request = store['delete'](id);

				request.onsuccess = function () {
					callback(id);
				};

				request.onerror = function (e) {
					console.log(e);
				};
			}
			catch (e) {
				console.log(e);
			}
		},

	    deleteHistory:function (callback) {
	        var db = pm.indexedDB.db;
	        var clearTransaction = db.transaction(["requests"], "readwrite");
	        var clearRequest = clearTransaction.objectStore(["requests"]).clear();
	        clearRequest.onsuccess = function (event) {
	            callback();
	        };
	    },

	    deleteCollectionRequestWithOptSync: function(id, toSync, callback) {
	        //pm.indexedDB.getCollectionRequest(id, function(collectionRequest) {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction(["collection_requests"], "readwrite");
	            var store = trans.objectStore(["collection_requests"]);

	            var request = store['delete'](id);

	            request.onsuccess = function (e) {
	                callback(id);
	            };

	            request.onerror = function (e) {
	                console.log("Error: ",e);
	                callback(id);
	            };
	        //});
	    },

	    deleteCollectionRequest:function (id, callback) {
	        this.deleteCollectionRequestWithOptSync(id,true,callback);
	    },

	    //in a collection
	    deleteAllCollectionRequests:function (id) {
	        var db = pm.indexedDB.db;
	        var trans = db.transaction(["collection_requests"], "readwrite");

	        //Get everything in the store
	        var keyRange = IDBKeyRange.only(id);
	        var store = trans.objectStore("collection_requests");

	        var index = store.index("collectionId");
	        var cursorRequest = index.openCursor(keyRange);

	        cursorRequest.onsuccess = function (e) {
	            var result = e.target.result;

	            if (!result) {
	                return;
	            }

	            var request = result.value;
	            pm.indexedDB.deleteCollectionRequest(request.id, function() {
	            });
	            result['continue']();
	        };
	        cursorRequest.onerror = pm.indexedDB.onerror;
	    },

	    deleteEachCollectionRequest: function() {
	        var db = pm.indexedDB.db;
	        var trans = db.transaction(["collection_requests"], "readwrite");
	        var store = trans.objectStore("collection_requests");
	        var request = store.clear();
	    },

	    deleteCollectionWithOptSync:function (id, toSync, callback) {
	        var db = pm.indexedDB.db;
	        var trans = db.transaction(["collections"], "readwrite");
	        var store = trans.objectStore(["collections"]);

	        var request = store['delete'](id);


	        request.onsuccess = function () {
	            // pm.indexedDB.deleteAllCollectionRequests(id);
	            callback(id);
	        };

	        request.onerror = function (e) {
	            console.log("Error: ", e);
	            callback(id);
	        };
	    },

	    subscriptions: {
	        addSubscription: function(subscription, callback) {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction(["subscriptions"], "readwrite");
	            var store = trans.objectStore("subscriptions");
	            var request = store.put(subscription);

	            request.onsuccess = function (e) {
	                callback(subscription);
	            };

	            request.onerror = function (e) {
	                console.log(e);
	            };
	        },

	        deleteSubscription:function (id, callback) {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction(["subscriptions"], "readwrite");
	            var store = trans.objectStore(["subscriptions"]);

	            var request = store['delete'](id);

	            request.onsuccess = function () {
	                callback(id);
	            };

	            request.onerror = function (e) {
	                console.log("Error: ", e);
	                callback(id);
	            };
	        },

	        deleteAllSubscriptions: function(cb) {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction(["subscriptions"], "readwrite");
	            var store = trans.objectStore("subscriptions");
	            var request = store.clear();
	            request.onsuccess = function () {
	                cb();
	            };
	        },

	        getAllSubscriptions: function(cb) {
	            var db = pm.indexedDB.db;
	            if (db === null) {
	                return;
	            }

	            var trans = db.transaction(["subscriptions"], "readwrite");
	            var store = trans.objectStore("subscriptions");

	            //Get everything in the store
	            var keyRange = IDBKeyRange.lowerBound(0);
	            var index = store.index("id");
	            var cursorRequest = index.openCursor(keyRange);
	            var subscriptions = [];

	            cursorRequest.onsuccess = function (e) {
	                var result = e.target.result;

	                if (!result) {
	                    cb(subscriptions);
	                    return;
	                }

	                var request = result.value;
	                subscriptions.push(request);

	                //This wil call onsuccess again and again until no more request is left
	                result['continue']();
	            };

	            cursorRequest.onerror = pm.indexedDB.onerror;
	        },

	        isSubscribedTo: function(subscriptionId) {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction(["subscriptions"], "readwrite");
	            var store = trans.objectStore("subscriptions");

	            //Get everything in the store
	            var cursorRequest = store.get(subscriptionId);

	            cursorRequest.onsuccess = function (e) {
	                var result = e.target.result;
	                if (!result) {
	                    return;
	                }

	                callback(result);
	                return result;
	            };
	            cursorRequest.onerror = pm.indexedDB.onerror;
	        }
	    },

	    environments:{
	        addEnvironment:function (environment, callback) {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction(["environments"], "readwrite");
	            var store = trans.objectStore("environments");
	            var request = store.put(environment);

	            request.onsuccess = function (e) {
	                callback(environment);
	            };

	            request.onerror = function (e) {
	                console.log(e);
	            };
	        },

	        getEnvironment:function (id, callback) {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction(["environments"], "readwrite");
	            var store = trans.objectStore("environments");

	            //Get everything in the store
	            var cursorRequest = store.get(id);

	            cursorRequest.onsuccess = function (e) {
	                var result = e.target.result;
	                callback(result);
	            };
	            cursorRequest.onerror = pm.indexedDB.onerror;
	        },

	        deleteEnvironment:function (id, callback) {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction(["environments"], "readwrite");
	            var store = trans.objectStore(["environments"]);

	            var request = store['delete'](id);

	            request.onsuccess = function () {
	                callback(id);
	            };

	            request.onerror = function (e) {
	                console.log("Error: ", e);
	                callback(id);
	            };
	        },

	        getAllEnvironments:function (callback) {
	            var db = pm.indexedDB.db;
	            if (db === null) {
	                return;
	            }

	            var trans = db.transaction(["environments"], "readwrite");
	            var store = trans.objectStore("environments");

	            //Get everything in the store
	            var keyRange = IDBKeyRange.lowerBound(0);
	            var index = store.index("timestamp");
	            var cursorRequest = index.openCursor(keyRange);
	            var environments = [];

	            cursorRequest.onsuccess = function (e) {
	                var result = e.target.result;

	                if (!result) {
	                    callback(environments);
	                    return;
	                }

	                var request = result.value;
	                environments.push(request);

	                //This wil call onsuccess again and again until no more request is left
	                result['continue']();
	            };

	            cursorRequest.onerror = pm.indexedDB.onerror;
	        },

	        updateEnvironment:function (environment, callback) {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction(["environments"], "readwrite");
	            var store = trans.objectStore("environments");

	            var boundKeyRange = IDBKeyRange.only(environment.id);
	            var request = store.put(environment);

	            request.onsuccess = function (e) {
	                callback(environment);
	            };

	            request.onerror = function (e) {
	                console.log("Error: ", e.value);
	                callback(environment);
	            };
	        },

	        deleteAllEnvironments: function(cb) {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction(["environments"], "readwrite");
	            var store = trans.objectStore("environments");
	            var request = store.clear();
	            request.onsuccess = function () {
	                cb();
	            };
	        },
	    },

	    helpers:{
	        addHelper:function (helper, callback) {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction([pm.indexedDB.TABLE_HELPERS], "readwrite");
	            var store = trans.objectStore(pm.indexedDB.TABLE_HELPERS);
	            var request = store.put(helper);

	            request.onsuccess = function (e) {
	                callback(helper);
	            };

	            request.onerror = function (e) {
	                console.log(e);
	            };
	        },

	        getHelper:function (id, callback) {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction([pm.indexedDB.TABLE_HELPERS], "readwrite");
	            var store = trans.objectStore(pm.indexedDB.TABLE_HELPERS);

	            //Get everything in the store
	            var cursorRequest = store.get(id);

	            cursorRequest.onsuccess = function (e) {
	                var result = e.target.result;
	                callback(result);
	            };

	            cursorRequest.onerror = pm.indexedDB.onerror;
	        }
	    },

	    headerPresets:{
	        addHeaderPreset:function (headerPreset, callback) {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction([pm.indexedDB.TABLE_HEADER_PRESETS], "readwrite");
	            var store = trans.objectStore(pm.indexedDB.TABLE_HEADER_PRESETS);
	            var request = store.put(headerPreset);

	            request.onsuccess = function (e) {
	                callback(headerPreset);
	            };

	            request.onerror = function (e) {
	                console.log(e);
	            };
	        },

	        getHeaderPreset:function (id, callback) {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction([pm.indexedDB.TABLE_HEADER_PRESETS], "readwrite");
	            var store = trans.objectStore(pm.indexedDB.TABLE_HEADER_PRESETS);

	            //Get everything in the store
	            var cursorRequest = store.get(id);

	            cursorRequest.onsuccess = function (e) {
	                var result = e.target.result;
	                callback(result);
	            };
	            cursorRequest.onerror = pm.indexedDB.onerror;
	        },

	        deleteHeaderPreset:function (id, callback) {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction([pm.indexedDB.TABLE_HEADER_PRESETS], "readwrite");
	            var store = trans.objectStore([pm.indexedDB.TABLE_HEADER_PRESETS]);

	            var request = store['delete'](id);

	            request.onsuccess = function () {
	                callback(id);
	            };

	            request.onerror = function (e) {
	                console.log(e);
	            };
	        },

	        deleteAllHeaderPresets: function(cb) {
	            var db = pm.indexedDB.db;

	            var trans = db.transaction([pm.indexedDB.TABLE_HEADER_PRESETS], "readwrite");
	            var store = trans.objectStore(pm.indexedDB.TABLE_HEADER_PRESETS);
	            var request = store.clear();
	            request.onsuccess = function() {
	                cb();
	            }
	            request.onerror = function (e) {
	                console.log(e);
	            };
	        },

	        getAllHeaderPresets:function (callback) {
	            var db = pm.indexedDB.db;
	            if (db === null) {
	                return;
	            }

	            var trans = db.transaction([pm.indexedDB.TABLE_HEADER_PRESETS], "readwrite");
	            var store = trans.objectStore(pm.indexedDB.TABLE_HEADER_PRESETS);

	            //Get everything in the store
	            var keyRange = IDBKeyRange.lowerBound(0);
	            var index = store.index("timestamp");
	            var cursorRequest = index.openCursor(keyRange);
	            var headerPresets = [];

	            cursorRequest.onsuccess = function (e) {
	                var result = e.target.result;

	                if (!result) {
	                    callback(headerPresets);
	                    return;
	                }

	                var request = result.value;
	                headerPresets.push(request);

	                //This wil call onsuccess again and again until no more request is left
	                result['continue']();
	            };

	            cursorRequest.onerror = pm.indexedDB.onerror;
	        },

	        updateHeaderPreset:function (headerPreset, callback) {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction([pm.indexedDB.TABLE_HEADER_PRESETS], "readwrite");
	            var store = trans.objectStore(pm.indexedDB.TABLE_HEADER_PRESETS);

	            var boundKeyRange = IDBKeyRange.only(headerPreset.id);
	            var request = store.put(headerPreset);

	            request.onsuccess = function (e) {
	                callback(headerPreset);
	            };

	            request.onerror = function (e) {
	                console.log(e.value);
	            };
	        }
	    },

	    driveFiles: {
	        addDriveFile:function (driveFile, callback) {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction([pm.indexedDB.TABLE_DRIVE_FILES], "readwrite");
	            var store = trans.objectStore(pm.indexedDB.TABLE_DRIVE_FILES);
	            var request = store.put(driveFile);

	            request.onsuccess = function (e) {
	                callback(driveFile);
	            };

	            request.onerror = function (e) {
	                console.log(e);
	            };
	        },

	        getDriveFile:function (id, callback) {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction([pm.indexedDB.TABLE_DRIVE_FILES], "readwrite");
	            var store = trans.objectStore(pm.indexedDB.TABLE_DRIVE_FILES);

	            //Get everything in the store
	            var cursorRequest = store.get(id);

	            cursorRequest.onsuccess = function (e) {
	                var result = e.target.result;
	                callback(result);
	            };

	            cursorRequest.onerror = pm.indexedDB.onerror;
	        },

	        getDriveFileByFileId:function (fileId, callback) {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction([pm.indexedDB.TABLE_DRIVE_FILES], "readwrite");
	            var store = trans.objectStore(pm.indexedDB.TABLE_DRIVE_FILES);

	            //Get everything in the store
	            var keyRange = IDBKeyRange.only(fileId);
	            var index = store.index("fileId");
	            var cursorRequest = index.openCursor(keyRange);

	            cursorRequest.onsuccess = function (e) {
	                var result = e.target.result;
	                if(result) {
	                    callback(result.value);
	                }
	                else {
	                    callback(null);
	                }

	            };

	            cursorRequest.onerror = function(e) {
	                callback(null);
	            };
	        },

	        deleteDriveFile:function (id, callback) {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction([pm.indexedDB.TABLE_DRIVE_FILES], "readwrite");
	            var store = trans.objectStore([pm.indexedDB.TABLE_DRIVE_FILES]);

	            var request = store['delete'](id);

	            request.onsuccess = function () {
	                callback(id);
	            };

	            request.onerror = function (e) {
	                console.log(e);
	            };
	        },

	        getAllDriveFiles:function (callback) {
	            var db = pm.indexedDB.db;
	            if (db === null) {
	                return;
	            }

	            var trans = db.transaction([pm.indexedDB.TABLE_DRIVE_FILES], "readwrite");
	            var store = trans.objectStore(pm.indexedDB.TABLE_DRIVE_FILES);

	            //Get everything in the store
	            var keyRange = IDBKeyRange.lowerBound(0);
	            var index = store.index("timestamp");
	            var cursorRequest = index.openCursor(keyRange);
	            var driveFiles = [];

	            cursorRequest.onsuccess = function (e) {
	                var result = e.target.result;

	                if (!result) {
	                    callback(driveFiles);
	                    return;
	                }

	                var request = result.value;
	                driveFiles.push(request);

	                //This wil call onsuccess again and again until no more request is left
	                result['continue']();
	            };

	            cursorRequest.onerror = pm.indexedDB.onerror;
	        },

	        updateDriveFile:function (driveFile, callback) {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction([pm.indexedDB.TABLE_DRIVE_FILES], "readwrite");
	            var store = trans.objectStore(pm.indexedDB.TABLE_DRIVE_FILES);

	            var boundKeyRange = IDBKeyRange.only(driveFile.id);
	            var request = store.put(driveFile);

	            request.onsuccess = function (e) {
	                callback(driveFile);
	            };

	            request.onerror = function (e) {
	                console.log(e.value);
	            };
	        }
	    },


	    driveChanges: {
	        addDriveChange:function (driveChange, callback) {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction([pm.indexedDB.TABLE_DRIVE_CHANGES], "readwrite");
	            var store = trans.objectStore(pm.indexedDB.TABLE_DRIVE_CHANGES);
	            var request = store.put(driveChange);

	            request.onsuccess = function (e) {
	                callback(driveChange);
	            };

	            request.onerror = function (e) {
	                console.log(e);
	            };
	        },

	        getDriveChange:function (id, callback) {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction([pm.indexedDB.TABLE_DRIVE_CHANGES], "readwrite");
	            var store = trans.objectStore(pm.indexedDB.TABLE_DRIVE_CHANGES);

	            //Get everything in the store
	            var cursorRequest = store.get(id);

	            cursorRequest.onsuccess = function (e) {
	                var result = e.target.result;
	                callback(result);
	            };
	            cursorRequest.onerror = pm.indexedDB.onerror;
	        },

	        deleteDriveChange:function (id, callback) {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction([pm.indexedDB.TABLE_DRIVE_CHANGES], "readwrite");
	            var store = trans.objectStore([pm.indexedDB.TABLE_DRIVE_CHANGES]);

	            var request = store['delete'](id);

	            request.onsuccess = function () {
	                callback(id);
	            };

	            request.onerror = function (e) {
	                console.log(e);
	            };
	        },

	        getAllDriveChanges:function (callback) {
	            var db = pm.indexedDB.db;
	            if (db === null) {
	                return;
	            }

	            var trans = db.transaction([pm.indexedDB.TABLE_DRIVE_CHANGES], "readwrite");
	            var store = trans.objectStore(pm.indexedDB.TABLE_DRIVE_CHANGES);

	            //Get everything in the store
	            var keyRange = IDBKeyRange.lowerBound(0);
	            var index = store.index("timestamp");
	            var cursorRequest = index.openCursor(keyRange);
	            var driveChanges = [];

	            cursorRequest.onsuccess = function (e) {
	                var result = e.target.result;

	                if (!result) {
	                    driveChanges.sort(sortAscending);
	                    callback(driveChanges);
	                    return;
	                }

	                var request = result.value;
	                driveChanges.push(request);

	                //This wil call onsuccess again and again until no more request is left
	                result['continue']();
	            };

	            cursorRequest.onerror = pm.indexedDB.onerror;
	        },

	        updateDriveChange:function (driveChange, callback) {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction([pm.indexedDB.TABLE_DRIVE_CHANGES], "readwrite");
	            var store = trans.objectStore(pm.indexedDB.TABLE_DRIVE_CHANGES);

	            var boundKeyRange = IDBKeyRange.only(driveChange.id);
	            var request = store.put(driveChange);

	            request.onsuccess = function (e) {
	                callback(driveChange);
	            };

	            request.onerror = function (e) {
	                console.log(e.value);
	            };
	        }
	    },

	    oAuth2AccessTokens: {
	        addAccessToken: function(token, callback) {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction([pm.indexedDB.TABLE_OAUTH2_ACCESS_TOKENS], "readwrite");
	            var store = trans.objectStore(pm.indexedDB.TABLE_OAUTH2_ACCESS_TOKENS);
	            var request = store.put(token);

	            request.onsuccess = function (e) {
	                callback(token);
	            };

	            request.onerror = function (e) {
	                console.log(e);
	            };
	        },

	        deleteAccessToken: function(id, callback) {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction([pm.indexedDB.TABLE_OAUTH2_ACCESS_TOKENS], "readwrite");
	            var store = trans.objectStore(pm.indexedDB.TABLE_OAUTH2_ACCESS_TOKENS);

	            //Get everything in the store
	            var request = store['delete'](id);

	            request.onsuccess = function (e) {
	                callback(id);
	            };
	            request.onerror = pm.indexedDB.onerror;
	        },

	        getAllAccessTokens: function(callback) {
	            var db = pm.indexedDB.db;
	            if (db === null) {
	                return;
	            }

	            var trans = db.transaction([pm.indexedDB.TABLE_OAUTH2_ACCESS_TOKENS], "readwrite");
	            var store = trans.objectStore(pm.indexedDB.TABLE_OAUTH2_ACCESS_TOKENS);

	            //Get everything in the store
	            var keyRange = IDBKeyRange.lowerBound(0);
	            var index = store.index("timestamp");
	            var cursorRequest = index.openCursor(keyRange);
	            var accessTokens = [];

	            cursorRequest.onsuccess = function (e) {
	                var result = e.target.result;

	                if (!result) {
	                    callback(accessTokens);
	                    return;
	                }

	                var request = result.value;
	                accessTokens.push(request);

	                //This wil call onsuccess again and again until no more request is left
	                result['continue']();
	            };

	            cursorRequest.onerror = pm.indexedDB.onerror;
	        },

	        updateAccessToken:function (accessToken, callback) {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction([pm.indexedDB.TABLE_OAUTH2_ACCESS_TOKENS], "readwrite");
	            var store = trans.objectStore(pm.indexedDB.TABLE_OAUTH2_ACCESS_TOKENS);

	            var boundKeyRange = IDBKeyRange.only(accessToken.id);
	            var request = store.put(accessToken);

	            request.onsuccess = function (e) {
	                callback(accessToken);
	            };

	            request.onerror = function (e) {
	                console.log(e.value);
	            };
	        },

	        getAccessToken: function(id, callback) {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction([pm.indexedDB.TABLE_OAUTH2_ACCESS_TOKENS], "readwrite");
	            var store = trans.objectStore(pm.indexedDB.TABLE_OAUTH2_ACCESS_TOKENS);

	            //Get everything in the store
	            var cursorRequest = store.get(id);

	            cursorRequest.onsuccess = function (e) {
	                var result = e.target.result;
	                callback(result);
	            };
	            cursorRequest.onerror = pm.indexedDB.onerror;
	        }
	    },

	    tabs: {
	        saveTab: function(tab, callback) {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction(["requestTabs"], "readwrite");
	            var store = trans.objectStore("requestTabs");
	            var request = store.put(tab);

	            request.onsuccess = function (e) {
	                callback(tab);
	            };

	            request.onerror = function (e) {
	                console.log(e);
	            };
	        },

	        deleteTab: function(tabId, callback) {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction(["requestTabs"], "readwrite");
	            var store = trans.objectStore("requestTabs");
	            var request = store['delete'](tabId);

	            request.onsuccess = function (e) {
	                callback(tabId);
	            };
	            request.onerror = pm.indexedDB.onerror;
	        },

	        deleteAllTabs: function(callback) {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction(["requestTabs"], "readwrite");
	            var store = trans.objectStore("requestTabs");
	            var request = store.clear();
	        },

	        getAllTabs: function(callback) {
	            var db = pm.indexedDB.db;
	            if (db === null) {
	                return;
	            }

	            var trans = db.transaction(["requestTabs"], "readwrite");
	            var store = trans.objectStore("requestTabs");

	            //Get everything in the store
	            var keyRange = IDBKeyRange.lowerBound(0);
	            var index = store.index("timestamp");
	            var cursorRequest = index.openCursor(keyRange);
	            var tabs = [];

	            cursorRequest.onsuccess = function (e) {
	                var result = e.target.result;

	                if (!result) {
	                    callback(tabs);
	                    return;
	                }

	                var request = result.value;
	                tabs.push(request);

	                //This wil call onsuccess again and again until no more request is left
	                result['continue']();
	            };

	            cursorRequest.onerror = pm.indexedDB.onerror;
	        }
	    },

	    testRuns: {
	        addTestRun: function(testRun, callback) {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction([pm.indexedDB.TABLE_TEST_RUNS], "readwrite");
	            var store = trans.objectStore(pm.indexedDB.TABLE_TEST_RUNS);
	            var request = store.put(testRun);

	            request.onsuccess = function (e) {
	                callback(testRun);
	            };

	            request.onerror = function (e) {
	                console.log(e);
	            };
	        },

	        deleteTestRun: function(id, callback) {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction([pm.indexedDB.TABLE_TEST_RUNS], "readwrite");
	            var store = trans.objectStore(pm.indexedDB.TABLE_TEST_RUNS);

	            //Get everything in the store
	            var request = store['delete'](id);

	            request.onsuccess = function (e) {
	                callback(id);
	            };
	            request.onerror = pm.indexedDB.onerror;
	        },

	        deleteAllTestRuns: function(callback) {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction([pm.indexedDB.TABLE_TEST_RUNS], "readwrite");
	            var store = trans.objectStore(pm.indexedDB.TABLE_TEST_RUNS);
	            var request = store.clear();
	        },

	        getAllTestRuns: function(callback) {
	            var db = pm.indexedDB.db;
	            if (db === null) {
	                return;
	            }

	            var trans = db.transaction([pm.indexedDB.TABLE_TEST_RUNS], "readwrite");
	            var store = trans.objectStore(pm.indexedDB.TABLE_TEST_RUNS);

	            //Get everything in the store
	            var keyRange = IDBKeyRange.lowerBound(0);
	            var index = store.index("timestamp");
	            var cursorRequest = index.openCursor(keyRange);
	            var testRuns = [];

	            cursorRequest.onsuccess = function (e) {
	                var result = e.target.result;

	                if (!result) {
	                    callback(testRuns);
	                    return;
	                }

	                var request = result.value;
	                testRuns.push(request);

	                //This wil call onsuccess again and again until no more request is left
	                result['continue']();
	            };

	            cursorRequest.onerror = pm.indexedDB.onerror;
	        },

	        updateTestRun:function (testRun, callback) {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction([pm.indexedDB.TABLE_TEST_RUNS], "readwrite");
	            var store = trans.objectStore(pm.indexedDB.TABLE_TEST_RUNS);

	            var boundKeyRange = IDBKeyRange.only(testRun.id);
	            var request = store.put(testRun);

	            request.onsuccess = function (e) {
	                callback(testRun);
	            };

	            request.onerror = function (e) {
	                console.log(e.value);
	            };
	        },

	        getTestRun: function(id, callback) {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction([pm.indexedDB.TABLE_TEST_RUNS], "readwrite");
	            var store = trans.objectStore(pm.indexedDB.TABLE_TEST_RUNS);

	            //Get everything in the store
	            var cursorRequest = store.get(id);

	            cursorRequest.onsuccess = function (e) {
	                var result = e.target.result;
	                callback(result);
	            };
	            cursorRequest.onerror = pm.indexedDB.onerror;
	        }
	    },

	    // TODO Refactor this. Needs to reduce dependencies
	    downloadAllData: function(userId, callback) {
	        //if userId!=0, download data only for that user
	        console.log("Starting to download all data");

	        //Get globals
	        var totalCount = 0;
	        var currentCount = 0;
	        var collections = [];
	        var globals = [];
	        var environments = [];
	        var headerPresets = [];

	        var onFinishGettingCollectionRequests = function(collection) {
	            collections.push(collection);

	            currentCount++;

	            if (currentCount === totalCount) {
	                onFinishExportingCollections(collections);
	            }
	        }

	        var onFinishExportingCollections = function(c) {
	            console.log(pm.envManager);

	            globals = pm.envManager.get("globals").get("globals");

	            //Get environments
	            pm.indexedDB.environments.getAllEnvironments(function (e) {
	                environments = e;
	                pm.indexedDB.headerPresets.getAllHeaderPresets(function (hp) {
	                    headerPresets = hp;
	                    onFinishExporttingAllData(callback);
	                });
	            });
	        }

	        var onFinishExporttingAllData = function() {
	            console.log("collections", collections);
	            console.log("environments", environments);
	            console.log("headerPresets", headerPresets);
	            console.log("globals", globals);

	            var dump = {
	                version: 1,
	                collections: collections,
	                environments: environments,
	                headerPresets: headerPresets,
	                globals: globals
	            };

	            var name = "Backup.postman_dump";
	            var filedata = JSON.stringify(dump, null, '\t');
	            var type = "application/json";
	            pm.filesystem.saveAndOpenFile(name, filedata, type, function () {
	                if (callback) {
	                    callback();
	                }
	            });
	        }

	        //Get collections
	        //Get header presets
	        pm.indexedDB.getCollections(function (items) {
	            //do not dump subscribed collections
	            if(userId!=="0" && userId!==0) {
	                items = _.filter(items, function(item) {
	                    return (!item.owner || (item.owner == userId));
	                });
	            }

	            totalCount = items.length;
	            pm.collections.items = items;
	            var itemsLength = items.length;

	            function onGetAllRequestsInCollection(collection, requests) {
	                collection.requests = requests;
	                onFinishGettingCollectionRequests(collection);
	            }

	            if (itemsLength !== 0) {
	                for (var i = 0; i < itemsLength; i++) {
	                    var collection = items[i];
	                    pm.indexedDB.getAllRequestsInCollection(collection, onGetAllRequestsInCollection);
	                }
	            }
	            else {
	                globals = pm.envManager.get("globals").get("globals");

	                pm.indexedDB.environments.getAllEnvironments(function (e) {
	                    environments = e;
	                    pm.indexedDB.headerPresets.getAllHeaderPresets(function (hp) {
	                        headerPresets = hp;
	                        onFinishExporttingAllData(callback);
	                    });
	                });
	            }
	        });
	    },

	    importAllData: function(files, callback, failCallback) {
	        if (files.length !== 1) {
	            return;
	        }

	        var f = files[0];
	        var reader = new FileReader();

	        // Closure to capture the file information.
	        reader.onload = (function (theFile) {
	            return function (e) {
	                // Render thumbnail.
	                var data = e.currentTarget.result;
	                var j = "";
	                try {
	                    j = JSON.parse(data);
	                }
	                catch(e) {
	                    failCallback(e.message);
	                    return;
	                }
	                var version = j.version;
	                pm.indexedDB.importDataForVersion(version, j, callback);
	            };
	        })(files[0]);

	        // Read in the image file as a data URL.
	        reader.readAsText(files[0]);
	    },

	    importDataForVersion: function(version, data, callback) {
	        if (version === 1) {
	            var environments = pm.envManager.get("environments");
	            var globals = pm.envManager.get("globals");

	            //Send all through unsynced changes
	            if ("globals" in data) {
	                console.log("Import globals");
	                globals.mergeGlobals(data.globals, true, true);
	            }

	            if ("environments" in data) {
	                console.log("Import environments");
	                environments.mergeEnvironments(data.environments);
	            }

	            if ("headerPresets" in data) {
	                console.log("Import headerPresets");
	                pm.headerPresets.mergeHeaderPresets(data.headerPresets);
	            }

	            if ("collections" in data) {
	                console.log("Import collections");
	                pm.collections.mergeCollections(data.collections);
	            }
	        }

	        callback();
	    },
	    clientNotifications:{
	        addNotification:function (notification, callback) {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction(["client_notifications"], "readwrite");
	            var store = trans.objectStore("client_notifications");
	            var request = store.put(notification);

	            request.onsuccess = function (e) {
	                if(callback) {
	                  callback(notification);
	                }
	            };

	            request.onerror = function (e) {
	                console.log(e);
	            };
	        },

	        getNotification:function (id, callback) {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction(["client_notifications"], "readwrite");
	            var store = trans.objectStore("client_notifications");

	            //Get everything in the store
	            var cursorRequest = store.get(id);

	            cursorRequest.onsuccess = function (e) {
	                var result = e.target.result;
	                if(callback) {
	                  callback(result);
	                }
	            };
	            cursorRequest.onerror = pm.indexedDB.onerror;
	        },

	        deleteNotification:function (id, callback) {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction(["client_notifications"], "readwrite");
	            var store = trans.objectStore(["client_notifications"]);

	            var request = store['delete'](id);

	            request.onsuccess = function () {
	                if(callback) {
	                  callback(id);
	                }
	            };

	            request.onerror = function (e) {
	                console.log("Error: ", e);
	                if(callback) {
	                  callback(id);
	                }
	            };
	        },

	        getAllNotifications:function (callback) {
	            var db = pm.indexedDB.db;
	            if (db === null) {
	                return;
	            }

	            var trans = db.transaction(["client_notifications"], "readwrite");
	            var store = trans.objectStore("client_notifications");

	            //Get everything in the store
	            var keyRange = IDBKeyRange.lowerBound(0);
	            var index = store.index("timestamp");
	            var cursorRequest = index.openCursor(keyRange);
	            var notifications = [];

	            cursorRequest.onsuccess = function (e) {
	              var result = e.target.result;

	              if (!result) {
	                  if(callback) {
	                    callback(notifications);
	                  }
	                  return;
	              }

	              var request = result.value;
	              notifications.push(request);

	              //This wil call onsuccess again and again until no more request is left
	              result['continue']();
	            };

	            cursorRequest.onerror = pm.indexedDB.onerror;
	        },

	        updateNotification:function (notification, callback) {
	          var db = pm.indexedDB.db;
	          var trans = db.transaction(["client_notifications"], "readwrite");
	          var store = trans.objectStore("client_notifications");

	          var boundKeyRange = IDBKeyRange.only(notification.id);
	          var request = store.put(notification);

	          request.onsuccess = function (e) {
	            if(callback) {
	              callback(notification);
	            }
	          };

	          request.onerror = function (e) {
	            console.log("Error: ", e.value);
	            if(callback) {
	              callback(notification);
	            }
	          };
	        },

	        deleteAllNotifications: function(callback) {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction(["client_notifications"], "readwrite");
	            var store = trans.objectStore("client_notifications");
	            var request = store.clear();
	            request.onsuccess = function () {
	              if(callback) {
	                callback();
	              }
	            };
	        },
	    },
	    cookies: {
	        getAllCookies: function(callback) {
	            var db = pm.indexedDB.db;
	            if (db === null) {
	                return;
	            }

	            var trans = db.transaction(["domainCookies"], "readwrite");
	            var store = trans.objectStore("domainCookies");

	            //Get everything in the store
	            var keyRange = IDBKeyRange.lowerBound(0);
	            var index = store.index("domain");
	            var cursorRequest = index.openCursor(keyRange);
	            var testRuns = [];

	            cursorRequest.onsuccess = function (e) {
	                var result = e.target.result;

	                if (!result) {
	                    callback(testRuns);
	                    return;
	                }

	                var request = result.value;
	                testRuns.push(request);

	                //This wil call onsuccess again and again until no more request is left
	                result['continue']();
	            };

	            cursorRequest.onerror = pm.indexedDB.onerror;
	        },

	        saveCookies: function(cookiesArray, callback) {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction(["domainCookies"], "readwrite");
	            var store = trans.objectStore("domainCookies");

	            var request;
	            var numChanges = cookiesArray.length;
	            for(var i=0;i<numChanges;i++) {
	                var cookie = cookiesArray[i];
	                request = store.put(cookie);
	            }
	            request.onsuccess = function () {
	                if(typeof callback === "function") {
	                    callback();
	                }
	            };
	            request.onerror = function (e) {
	                console.log(e.value);
	            };
	        },

	        saveCookie: function(cookie, callback) {
	            var db = pm.indexedDB.db;
	            var trans = db.transaction(["domainCookies"], "readwrite");
	            var store = trans.objectStore("domainCookies");

	            var request;
	            var numChanges = cookiesArray.length;
	            request = store.put(cookie);
	            request.onsuccess = function () {
	                if(typeof callback === "function") {
	                    callback();
	                }
	            };
	            request.onerror = function (e) {
	                console.log(e.value);
	            };
	        },
	    },

	    clearAllObjectStores: function(callback) {
	        console.log("Clearing all object stores");
	        //WARNING: Make sure we are testing and the database is not postman
	        if (pm.isTesting && pm.databaseName !== "postman") {
	            var stores = [
	                "requests", "collections", "header_presets",
	                "collection_requests", "environments",
	                "systemValues", "unsynced_changes", "sync_conflicts",
	                pm.indexedDB.TABLE_HELPERS,
	                pm.indexedDB.TABLE_DRIVE_FILES,
	                pm.indexedDB.TABLE_DRIVE_CHANGES
	            ];

	            var db = pm.indexedDB.db;
	            var transaction = db.transaction(stores, "readwrite");
	            transaction.objectStore("requests").clear();
	            transaction.objectStore("collections").clear();
	            transaction.objectStore("collection_requests").clear();
	            transaction.objectStore("environments").clear();
	            transaction.objectStore("header_presets").clear();
	            transaction.objectStore("systemValues").clear();
	            transaction.objectStore("unsynced_changes").clear();
	            transaction.objectStore("sync_conflicts").clear();
	            transaction.objectStore(pm.indexedDB.TABLE_HELPERS).clear();
	            transaction.objectStore(pm.indexedDB.TABLE_DRIVE_FILES).clear();
	            transaction.objectStore(pm.indexedDB.TABLE_DRIVE_CHANGES).clear();

	            transaction.oncomplete = function(event) {
	                console.log("Cleared the database");
	                if (callback) {
	                    callback();
	                }
	            };
	        }
	    }
	};

	module.exports = PMindexedDB;


/***/ },

/***/ 348:
/***/ function(module, exports) {

	broadcasts = {
	    items: [],

	    init:function () {
	        pm.storage.getValue("broadcasts", function(broadcasts) {
	            pm.storage.getValue("broadcast_last_update_time", function(last_update_time) {
	                var today = new Date();

	                pm.broadcasts.showBlank();
	                pm.broadcasts.fetch();
	                if (last_update_time) {
	                    var last_update = new Date(last_update_time);
	                    pm.broadcasts.setLastUpdateTime(today);
	                }
	                else {
	                    pm.broadcasts.setLastUpdateTime(today);
	                }

	                $("#broadcasts-count").on("click", function () {
	                    pm.broadcasts.markAllAsRead();
	                });
	            });
	        });
	    },

	    showBlank:function() {
	        var $broadcasts_count = $("#broadcasts-count");
	        $broadcasts_count.removeClass();
	        $broadcasts_count.addClass("no-new-broadcasts");
	        $broadcasts_count.text("0");
	    },

	    fetch:function () {
	        var broadcast_url = "https://www.getpostman.com/broadcasts";
	        $.get(broadcast_url, function (data) {
	            pm.broadcasts.setBroadcasts(data["broadcasts"]);
	            pm.broadcasts.renderBroadcasts();
	        });
	    },

	    setLastUpdateTime:function (last_update) {
	        pm.storage.setValue({"broadcast_last_update_time": last_update.toUTCString()});
	    },

	    setBroadcasts:function (broadcasts) {
	        var old_broadcasts;
	        var broadcastsJson;
	        var b;

	        function oldBroadCastsFinder(br) {
	            return br.id === b.id;
	        }

	        pm.storage.getValue("broadcasts", function(broadcastsJson) {
	            if (broadcastsJson) {
	                old_broadcasts = JSON.parse(broadcastsJson);
	            }
	            else {
	                old_broadcasts = [];
	            }

	            var i, c, count;
	            if (old_broadcasts.length === 0) {
	                c = broadcasts.length;
	                for (i = 0; i < c; i++) {
	                    broadcasts[i]["status"] = "unread";
	                }
	                count = broadcasts.length;
	                broadcastsJson = JSON.stringify(broadcasts);
	                pm.storage.setValue({"broadcasts": broadcastsJson}, function() {
	                });
	            }
	            else {
	                c = broadcasts.length;
	                var new_broadcasts = [];
	                for (i = 0; i < c; i++) {
	                    b = broadcasts[i];

	                    var existing = _.find(old_broadcasts, oldBroadCastsFinder);

	                    if (!existing) {
	                        b["status"] = "unread";
	                        new_broadcasts.push(b);
	                    }
	                }

	                count = new_broadcasts.length;
	                old_broadcasts = _.union(new_broadcasts, old_broadcasts);
	                broadcastsJson = JSON.stringify(old_broadcasts);
	                pm.storage.setValue({"broadcasts": broadcastsJson}, function() {
	                });
	            }

	            var $broadcasts_count = $("#broadcasts-count");
	            $broadcasts_count.text(count);
	            $broadcasts_count.removeClass();
	            if (count > 0) {
	                $broadcasts_count.addClass("new-broadcasts");
	            }
	            else {
	                $broadcasts_count.addClass("no-new-broadcasts");
	            }
	        });
	    },

	    markAllAsRead:function () {
	        var $broadcasts_count = $("#broadcasts-count");
	        $broadcasts_count.removeClass();
	        $broadcasts_count.addClass("no-new-broadcasts");
	        $broadcasts_count.text("0");

	        pm.storage.getValue("broadcasts", function(broadcastsJson) {
	            var broadcasts;

	            if (broadcastsJson) {
	                broadcasts = JSON.parse(broadcastsJson);
	            }
	            else {
	                broadcasts = [];
	            }

	            var c = broadcasts.length;
	            for (var i = 0; i < c; i++) {
	                broadcasts[i]["status"] = "read";
	            }

	            var outBroadcastsJsons = JSON.stringify(broadcasts);
	            pm.storage.setValue({"broadcasts": outBroadcastsJsons}, function() {
	            });

	            pm.broadcasts.renderBroadcasts();
	        });
	    },

	    renderBroadcasts:function () {
	        pm.storage.getValue("broadcasts", function(broadcastsJson) {
	            try {
	                var broadcasts = JSON.parse(broadcastsJson);
	                $("#broadcasts .dropdown-menu").text("");
	                $("#broadcasts .dropdown-menu").append(Handlebars.templates.broadcasts({"items": broadcasts}));
	            }
	            catch (e) {
	                console.log("Could not parse broadcasts");
	            }
	        });
	    }
	};

	module.exports = broadcasts;


/***/ },

/***/ 349:
/***/ function(module, exports) {

	var Alerts = _.extend({
	  _dedupedAlerts: [],

	  _getBaseOptions: function (persist, timeout) {
	    return {
	      theme: 'custom',
	      layout: 'topCenter',
	      timeout: persist ? false : timeout,
	      closeWith: persist ? ['button'] : ['click'],
	      dismissQueue: true,
	      maxVisible: 7,
	      animation: {
	          open: {height: 'toggle'}, // jQuery animate function property object
	          close: {height: 'toggle'}, // jQuery animate function property object
	          easing: 'swing', // easing
	          speed: 0 // disable animations
	      }
	    }
	  },

	  _isDedupedAlert: function(id) {
	    var index = this._dedupedAlerts.indexOf(id);
	    return index > -1 ? true : false;
	  },

	  _addDedupedAlert: function(id) {
	    var index = this._dedupedAlerts.indexOf(id);
	    if(index > -1) {
	      console.error('dedupe failure', id);
	    } else {
	      this._dedupedAlerts.push(id);
	    }
	  },

	  _removeDedupedAlert: function(id) {
	    var index = this._dedupedAlerts.indexOf(id);
	    if(index > -1) {
	      this._dedupedAlerts.splice(index, 1);
	    }
	  },

	  _show: function(options) {
	    var type = options.type;
	    var message = options.message;
	    var dedupeId = options.dedupeId;
	    var persist = options.persist || false;
	    var timeout = options.timeout || 3000;
	    var layout = options.layout || 'topCenter';
	    var showAsHtml = options.showAsHtml || false;
	    var afterCloseCallback = options.afterClose || null;

	    var dedupeOptions = {}
	    var typeDedupeId;

	    if(dedupeId) {
	      typeDedupeId = type + "-" + dedupeId;
	      if(this._isDedupedAlert(typeDedupeId)) {
	        return;
	      }

	      dedupeOptions = {
	        callback: {
	          onShow: function() {
	            this._addDedupedAlert(typeDedupeId);
	          }.bind(this),
	          afterClose: function() {
	            this._removeDedupedAlert(typeDedupeId);
	            if(typeof afterCloseCallback === "function") {
	              afterCloseCallback();
	            }
	          }.bind(this)
	        },
	        layout: layout
	      }
	    }

	    if(!showAsHtml) {
	      message = htmlEncode(message);
	    }

	    noty(
	      _.extend(
	        this._getBaseOptions(persist, timeout), {
	          type: type,
	          text: message
	        },
	        dedupeOptions
	      )
	    );

	  },

	  error: function(message, options) {

	    message || (message = "Something went wrong. Please try again.");
	    options || (options = {});

	    this._show(
	      _.extend(options, {
	        type: 'error',
	        message: message
	      })
	    );
	  },

	  info: function(message, options) {
	    if(!message) {
	      return;
	    }

	    options || (options = {});

	    this._show(
	      _.extend(options, {
	        type: 'info',
	        message: message
	      })
	    );
	  },

	  success: function(message, options) {
	    if(!message) {
	      return;
	    }

	    options || (options = {});

	    this._show(
	      _.extend(options, {
	        type: 'success',
	        message: message
	      })
	    )
	  },

	  warning: function(message, options) {
	    if(!message) {
	      return;
	    }

	    options || (options = {});

	    this._show(
	      _.extend(options, {
	        type: 'warning',
	        message: message
	      })
	    )
	  }

	}, Backbone.Events);

	module.exports = Alerts;


/***/ },

/***/ 350:
/***/ function(module, exports, __webpack_require__) {

	var TestRunApp = Backbone.View.extend({
		initialize: function() {
			var view = this;

			var resizeTimeout;

			this.on("modalClose", this.onModalClose, this);
			this.on("modalOpen", this.onModalOpen, this);

			$(window).on("resize", function () {
			    clearTimeout(resizeTimeout);
			    resizeTimeout = setTimeout(function() {
			        view.setLayout();
			    }, 500);
			});

	        if(!pm.settings.getSetting("newmanHelperHidden")) {
	        	//show newman helper card
	        	$("#test-run-newman-helper").html(Handlebars.templates.message_helper_card_newman());
	        	$("#newman-helper-link").click(function() {
	        		return true;
	        	});
	        	$(".newman-helper-close").click(function() {
	        		//send GA event
	        		$("#test-run-newman-helper").html("");
	        		pm.settings.setSetting("newmanHelperHidden", true);
	        	});
	        }

	        $("#newman-small-link").click(function() {
	    		return true;
	    	});


			this.setLayout();

			 $('a[rel="tooltip"]').tooltip({
	            delay: { "show": 500, "hide": 100 }
	        });
		},

		setLayout:function () {
		    this.refreshScrollPanes();
		},

		getVersion: function() {
			if(postman_electron) {
				if(!this.remoteApp) {
					this.remoteApp = __webpack_require__(233).require('app');
				}
				return this.remoteApp.getVersion();
			}
			else {
				return chrome.runtime.getManifest().version;
			}
		},

		refreshScrollPanes:function () {
		    var newMainHeight = $(document).height();
		    $('.main-view').height(newMainHeight + "px");

		    var newMainWidth = $('#container').width() - $('#sidebar').width();
		    $('.main-view').width(newMainWidth + "px");

		    var requestListHeight = window.innerHeight - 200;
		    $("#test-run-stats-tab-content").css('height', requestListHeight+'px')
		    .css('overflow', 'auto');

		    $("#results").css('height', requestListHeight+'px')
		    .css('overflow', 'auto');
		},

		onModalOpen:function (activeModal) {
			this.model.set("activeModal", activeModal);
			this.model.set("isModalOpen", true);
		},

		onModalClose:function () {
			// Shift focus to disable last shown tooltip
			$("#select-collection").focus();
			this.model.set("activeModal", null);
			this.model.set("isModalOpen", false);
		},

		isModalOpen: function() {
			return this.model.get("isModalOpen");
		},
	});

	module.exports = TestRunApp;


/***/ },

/***/ 351:
/***/ function(module, exports) {

	var TestRunAppHeader = Backbone.View.extend({
		initialize: function() {
			$("#navbar-crumbs-home").on("click", function() {
				pm.mediator.trigger("openModule", "requester");
			});

			$('a[data-toggle="popover"]').popover({
			    animation: true,
			    placement: "bottom",
			    trigger: "hover",
			});

			// $('a[rel="tooltip"]').tooltip();

			pm.mediator.on("openModule", this.onOpenModule, this);
		},

		onOpenModule: function() {
			if(postman_webkit) {
				var new_win = nw.Window.get(
					window.open('requester.html')
				);
			}
			else if(postman_macgap) {
				macgap.window.open({url:"index.html", width: 1280, height: 720});
			}
			else {
				chrome.app.window.create('requester.html', {
					"bounds": {
						top: 100,
						left: 2100,
						width: 1200,
						height: 800
					}
				});
			}
		}
	});

	module.exports = TestRunAppHeader;


/***/ },

/***/ 352:
/***/ function(module, exports) {

	var TestRunnerSidebarState = Backbone.Model.extend({
		defaults: function() {
			return {
				"isSidebarMaximized": true,
				"collections": null,
				"envManager": null,
				"testRuns": null
			}
		},

		initialize: function() {

		}
	});

	module.exports = TestRunnerSidebarState;


/***/ },

/***/ 353:
/***/ function(module, exports, __webpack_require__) {

	var RunsSidebar = __webpack_require__(354);

	var TestRunnerSidebar = Backbone.View.extend({
		initialize: function() {
			var view = this;

			$('#sidebar-toggle').on("click", function () {
			    view.toggleSidebar();
			});

			var runsSidebar = new RunsSidebar({model: this.model.get("testRuns")});
		},

		minimizeSidebar:function () {
			var model = this.model;

		    model.set("width", $("#sidebar").width());

		    var animationDuration = model.get("animationDuration");

		    $('#sidebar-toggle').animate({left:"0"}, animationDuration);
		    $('#sidebar').animate({width:"0px", marginLeft: "-10px"}, animationDuration);
		    $('#sidebar-filler').animate({width:"0px", marginLeft: "-10px"}, animationDuration);
		    $('#sidebar-search-container').css("display", "none");
		    $('#sidebar div').animate({opacity:0}, animationDuration);
		    
		    var newMainWidth = $(document).width();
		    $('.main-view').animate({width:newMainWidth + "px", "margin-left":"5px"}, animationDuration);
		    $('#sidebar-toggle img').attr('src', 'img/tri_arrow_right.png');
		},

		maximizeSidebar:function () {
			var model = this.model;
			var animationDuration = model.get("animationDuration");
			var sidebarWidth = model.get("width");

		    $('#sidebar-toggle').animate({left:"350px"}, animationDuration, function () {
		    });

		    $('#sidebar').animate({width:sidebarWidth + "px", marginLeft: "0px"}, animationDuration);
		    $('#sidebar-filler').animate({width:sidebarWidth + "px", marginLeft: "0px"}, animationDuration);
		    $('#sidebar-search-container').fadeIn(animationDuration);
		    $('#sidebar div').animate({opacity:1}, animationDuration);
		    $('#sidebar-toggle img').attr('src', 'img/tri_arrow_left.png');
		    var newMainWidth = $(document).width() - sidebarWidth - 10;
		    var marginLeft = sidebarWidth + 10;
		    $('.main-view').animate({width:newMainWidth + "px", "margin-left": marginLeft+ "px"}, animationDuration);
		},

		toggleSidebar:function () {
			var model = this.model;
			var isSidebarMaximized = model.get("isSidebarMaximized");

		    if (isSidebarMaximized) {
		        this.minimizeSidebar();
		    }
		    else {
		        this.maximizeSidebar();
		    }

		    model.set("isSidebarMaximized", !isSidebarMaximized);
		}
	});

	module.exports = TestRunnerSidebar;


/***/ },

/***/ 354:
/***/ function(module, exports) {

	var RunsSidebar = Backbone.View.extend({
		initialize: function() {
			var model = this.model;
			var view = this;

			$('#test-run-items').on("click", ".test-run", function() {
				var test_run_id = $(this).attr('data-test-run-id');
				model.loadTestRunStats(test_run_id);
			});

			$('#test-run-items').on("mouseenter", ".sidebar-test-run", function () {
			    var actionsEl = jQuery('.test-run-actions', this);
			    actionsEl.css('display', 'block');
			});

			$('#test-run-items').on("mouseleave", ".sidebar-test-run", function () {
			    var actionsEl = jQuery('.test-run-actions', this);
			    actionsEl.css('display', 'none');
			});

			$('#test-run-items').on("click", ".test-run-actions-download", function () {
			    var test_run_id = $(this).attr('data-test-run-id');
			    model.downloadTestRun(test_run_id);
			});

			$('#test-run-items').on("click", ".test-run-actions-delete", function () {
			    var test_run_id = $(this).attr('data-test-run-id');
			    model.deleteTestRun(test_run_id);
			});

			pm.mediator.on("startedTestRun", this.addRun, this);
			pm.mediator.on("importedTestRun", this.addRun, this);
			pm.mediator.on("deleteTestRun", this.deleteRun, this);
			pm.mediator.on("loadedAllTestRuns", this.render, this);

			this.render();
		},

		addEmptyMessage:function () {
		    $('#test-run-items').append(Handlebars.templates.message_no_test_runs());
		},

		clearEmptyMessage: function() {
			$("#test-run-items .empty-message").remove();
		},

		addRun: function(testRun) {
			this.clearEmptyMessage();
			$('#test-run-items').prepend(Handlebars.templates.item_test_run_sidebar(testRun.getAsJSON()));
			// jQuery(".test-run-time").timeago();
		},

		deleteRun: function(id) {
			if (this.model.toJSON().length == 0) {
				this.addEmptyMessage();
			}

			$("#sidebar-test-run-" + id).remove();
		},

		render: function() {
			var model = this.model;
			var testRuns = model.getAsJSON();

			$('#test-run-items').html("");

			if (testRuns.length > 0) {
				$('#test-run-items').append(Handlebars.templates.sidebar_test_run_list({items: testRuns}));
			}
			else {
				this.addEmptyMessage();
			}

			// jQuery(".test-run-time").timeago();

		}
	});

	module.exports = RunsSidebar;


/***/ },

/***/ 355:
/***/ function(module, exports) {

	var TestRunnerState = Backbone.Model.extend({
		defaults: function() {
			return {
				"state": "default", //default or running
				"collections": null,
				"envManager": null,
				"testRuns": null
			}
		},

		initialize: function() {
			var model = this;

			var collections = this.get("collections");
			var envManager = this.get("envManager");
			var testRuns = this.get("testRuns");

			pm.mediator.on("loadedCollections", function() {
				model.trigger("loadedCollections");
			});

			pm.mediator.on("loadedEnvironments", function() {
				model.trigger("loadedEnvironments");
			});

			pm.mediator.on("startTestRun", this.onStartTestRun, this);
		},

		onStartTestRun: function() {
			this.set("state", "running");
			this.trigger("showView", "status");
		}
	});

	module.exports = TestRunnerState;


/***/ },

/***/ 356:
/***/ function(module, exports, __webpack_require__) {

	var TestRunner = __webpack_require__(357);
	var TestRunCompleteStats = __webpack_require__(360);
	var ImportTestRunModal = __webpack_require__(361);
	var DataPreviewModal = __webpack_require__(362);
	var TestRunStatsRequestTestGrid = __webpack_require__(363);

	var TestRunnerController = Backbone.View.extend({
		initialize: function() {
			var model = this.model;
			var view = this;

			this.numTestRuns = 0;

			var testRuns = this.model.get("testRuns");
			
			var testRunner = new TestRunner({model: this.model});
			var testRunCompleteStats = new TestRunCompleteStats({model: testRuns});
			var importTestRunModal = new ImportTestRunModal({model: testRuns});
			var dataPreviewModal = new DataPreviewModal();

			var testRunStatsRequestTestGrid = new TestRunStatsRequestTestGrid({model: this.model});
			// var testRunStatsAverageResponseTimes = new testRunStatsAverageResponseTimes({model: this.model});

			this.model.on("showView", this.showView, this);

			pm.mediator.on("backToResults", this.goBackToResults, this);
			pm.mediator.on("showTestRun", this.showStats, this);
			pm.mediator.on("startTestRun", this.onStartTestRun, this);
			pm.mediator.on("showRequestTestGrid", this.showRequestTestGrid, this);

			$("#test-run-sections").on("click", "li", function() {
				var id = $(this).attr('data-id');
				$("#test-run-sections .active").removeClass("active");
				$(this).addClass("active");
				view.showSection(id);
			});
		},

		onStartTestRun: function() {
			this.numTestRuns++;
		},

		showSection: function(id) {
			if (id === "stats") {
				this.showStats();
			}
			else if (id === "start") {
				this.showStart();
			}
		},

		showStart: function() {
			$("#stats-request-test-grid").css("display", "none");

			$("#test-run-sections li[data-id='stats']").removeClass("active");
			$("#test-run-sections li[data-id='start']").addClass("active");

			if (this.numTestRuns > 0) {
				$("#results").css("display", "block");	
			}
			
			$("#test-run-starter").css("display", "block");
			$("#test-run-stats").css("display", "none");
		},

		showStats: function(testRun) {
			$("#test-run").css("display", "block");
			$("#stats-request-test-grid").css("display", "none");

			$(".test-run-stats-viewer-tabs-container").css("display", "block");

			$("#test-run-sections li[data-id='start']").removeClass("active");
			$("#test-run-sections li[data-id='stats']").addClass("active");

			$("#results").css("display", "none");
			$("#test-run-starter").css("display", "none");		
			$("#test-run-stats").css("display", "block");			
		},

		showView: function(key) {
			if (key === "status") {
				$("#test-run-starter-form").css("display", "none");
				$("#test-run-newman-helper").css("display", "none");
				$("#test-run-progress").css("display", "block");
			}
			else if (key === "default") {
				$("#test-run-starter-form").css("display", "block");
				$("#test-run-newman-helper").css("display", "block");
				$("#test-run-progress").css("display", "none");
			}
		},

		goBackToResults: function() {
			$("#stats-request-test-grid").css("display", "none");
			$("#test-run").css("display", "block");
		},

		showRequestTestGrid: function() {
			$("#test-run").css("display", "none");
			$("#results").css("display", "none");
			$("#stats-request-test-grid").css("display", "block");
		}
	});

	module.exports = TestRunnerController;


/***/ },

/***/ 357:
/***/ function(module, exports, __webpack_require__) {

	var TestRunProgressHeader = __webpack_require__(358);
	var TestRunProgress = __webpack_require__(359);

	var TestRunner = Backbone.View.extend({
	    initialize: function() {
	        var model = this.model;
	        var view = this;

	        this.files = [];
	        this.fileDataType = "undetermined";

	        var testRunProgressHeader = new TestRunProgressHeader({model: this.model});
	        var testRunProgress = new TestRunProgress({model: this.model.get("testRuns")});

	        model.on("loadedCollections", this.renderCollections, this);
	        model.on("loadedEnvironments", this.renderEnvironments, this);

	        var environments = model.get("envManager").get("environments");
	        environments.on('change', this.renderEnvironments, this);
	        environments.on('reset', this.renderEnvironments, this);
	        environments.on('add', this.renderEnvironments, this);
	        environments.on('remove', this.renderEnvironments, this);

	        var collections = model.get("collections");

	        collections.on("add", this.renderCollections, this);
	        collections.on("remove", this.renderCollections, this);
	        collections.on("updateCollection", this.renderCollections, this);

	        $("#start-test-run").on("click", function() {
	            view.startRun();
	        });

	        $('#test-data-file-input').on('change', function (event) {
	            var files = event.target.files;
	            view.files = files;

	            $('#test-data-file-type-container').css("display", "block");

	            var fileType = view.getFileType(view.files);
	        });

		    $('#test-data-file-type').on('change', function(event) {
			    view.fileDataType = $("#test-data-file-type").val();
			    $("#test-data-file-remove-container").css("display", "block");
			    if (view.files.length > 0) {
				    var file = view.files[0];
				    pm.mediator.trigger('selectedDataFile', view.fileDataType, file);
			    }
		    });

	        $('#test-data-file-remove').on("click", function() {
	            view.files = [];
	            view.fileDataType = "undetermined";
	            $('#test-data-file-input').val("");
	            $("#previewDataButton").hide();
	            $("#test-data-file-remove-container").css("display", "none");
	            $('#test-data-file-type-container').css("display", "none");
	        });
	    },

		getFileType: function(files) {
		    var view = this;
		    if (files.length > 0) {
			    var file = files[0];
			    if (file.type.has("csv") || file.type.has("excel") || file.type.has("comma-separated-values")) {
				    view.fileDataType = "csv";
				    $("#test-data-file-type").val("csv");
			    }
			    else if(file.type.has("json")) {
				    view.fileDataType = "json";
				    $("#test-data-file-type").val("json");
			    }
			    else {
				    view.fileDataType = "undetermined";
				    $("#test-data-file-type").val("undetermined");
			    }
			    pm.mediator.trigger('selectedDataFile', view.fileDataType, file);
		    }
	    },

	    renderCollections: function() {
	        var model = this.model;
	        var items = _.clone(model.get("collections").toJSON());
	        $selector = $("#select-collection");

	        for(var i = 0; i < items.length; i++) {
	            if("folders" in items[i]) {
	                folders = items[i].folders;

	                folders.sort(sortAlphabetical);

	                for(var j = 0; j < folders.length; j++) {
	                    folders[j].collection_name = items[i].name;
	                    folders[j].collection_id = items[i].id;
	                }
	            }
	        }

	        $selector.html("");
	        $selector.append(Handlebars.templates.collection_selector_list({items: items}));

	        //check for collectionId, folderId initialized from requester
	        clearTimeout(window.setCollection);
	        window.setCollection = setTimeout(function() {
	            if(window.collectionId) {
	                if(window.folderId) {
	                    $selector.val(folderId);
	                    $selector.children("option[value='"+folderId+"']").prop('selected',true).attr('selected','selected');
	                    setTimeout(function(elemId) {
	                        return function() {
	                            $selector.scrollTop($selector.find("option[value='"+elemId+"']").offset().top);
	                        }
	                    }(folderId), 600);
	                }
	                else {
	                    $selector.val(collectionId);
	                    $selector.children("option[value='"+collectionId+"']").prop('selected',true).attr('selected','selected');
	                    setTimeout(function(elemId) {
	                        return function() {
	                            $selector.scrollTop($selector.find("option[value='"+elemId+"']").offset().top);
	                        }
	                    }(collectionId), 600);
	                }
	            }

	            collectionId = null;
	            folderId = null;
	        }, 500);

	    },

	    renderEnvironments: function() {
	        var model = this.model;
	        var items = _.clone(model.get("envManager").get("environments").toJSON());
	        $envSelector = $("#select-environment");
	        $envSelector.html("");
	        $envSelector.html("<option value='0'>No environment</option>");
	        $envSelector.append(Handlebars.templates.environment_list({items: items}));

	        clearTimeout(window.setEnvironment);
	        window.setEnvironment = setTimeout(function() {
	            if(!window.environmentId) {
	                window.environmentId = pm.settings.getSetting("lastRunnerEnvId");
	            }
	            if(window.environmentId) {
	                $envSelector.val(environmentId);
	                $envSelector.children("option[value='"+environmentId+"']").prop('selected',true).attr('selected','selected');
	            }
	            window.environmentId = null;
	        }, 500);
	    },

	    startRun: function() {
	        var view = this;
	        var target_id = $("#select-collection").val();
	        if(target_id==="0") {
	            pm.mediator.trigger("alert:error", "Please select a collection to begin the test run");
	            return;
	        }
	        var target_type = $("#select-collection option[value='" + target_id + "']").attr("data-type");

	        var collection_id = 0;
	        var folder_id = 0;

	        if (target_type === "folder") {
	            folder_id = target_id;
	            collection_id = $("#select-collection option[value='" + target_id + "']").attr("data-collection-id");
	        }
	        else {
	            collection_id = target_id;
	        }

	        var environment_id = $("#select-environment").val();
	        var count = parseInt($("#test-run-count").val(), 10);
	        var delay = parseInt($("#test-run-delay").val(), 10);

	        var params = {
	            "collection_id": collection_id,
	            "folder_id": folder_id,
	            "target_type": target_type,
	            "environment_id": environment_id,
	            "delay": delay,
	            "count": count,
	            "files": view.files,
	            "fileDataType": view.fileDataType,
	            "customFileData" : pm["customFileData"],
	            "customFileFormat" : pm["customFileFormat"] //for testing
	        };

	        pm.settings.setSetting("lastRunnerEnvId", environment_id);

	        pm.mediator.trigger("startTestRun", params);
	    }
	});

	module.exports = TestRunner;


/***/ },

/***/ 358:
/***/ function(module, exports) {

	var TestRunProgressHeader = Backbone.View.extend({
		initialize: function() {
			var model = this.model;
			var view = this;

			pm.mediator.on("startedTestRun", this.onStartedTestRun, this);
			pm.mediator.on("finishedTestRun", this.onFinishedTestRun, this);

			$("#view-stats").on("click", function() {
				var id = $(this).attr("data-id");
				view.showStats(id);
				pm.tracker.trackEvent("collectionrun", "stats");
			});

			$("#new-test-run").on("click", function() {
				model.trigger("showView", "default");
				$("#test-run-newman-helper").css("display", "none");
			});
		},

		onStartedTestRun: function(testRun) {
			// console.log("Run tests, activate onStartedTestRun");
			$("#test-run-progress-content-loader").css("display", "block");
			$("#view-stats").attr("data-id", testRun.get("id"));
			$("#test-run-target").html(Handlebars.templates.test_run_target(testRun.getAsJSON()));

			$("#view-stats").css("display", "none");
			$("#new-test-run").css("display", "none");
		},

		onFinishedTestRun: function(run) {
			// console.log("Run tests, activate onFinishedTestRun");
			$("#view-stats").css("display", "inline-block");
			$("#new-test-run").css("display", "inline-block");
			$("#test-run-progress-content-loader").css("display", "none");
			pm.tracker.trackEvent("collectionrun", "create");
			//pm.mediator.trigger("loadTestRunFromIdWithoutShowing",run.id);
		},

		showStats: function(id) {
			pm.mediator.trigger("loadTestRunFromId", id);
		},

		showStatsWithoutShowing: function(id) {
			//pm.mediator.trigger("loadTestRunFromIdWithoutShowing", id);
		}
	});

	module.exports = TestRunProgressHeader;


/***/ },

/***/ 359:
/***/ function(module, exports) {

	var TestRunProgress = Backbone.View.extend({
		initialize: function() {
			var model = this.model;

			pm.mediator.on("startedTestRun", this.startNewTest, this);
			pm.mediator.on("hideResults", this.hideResults, this);
			pm.mediator.on("clearResults", this.clearResults, this);
			pm.mediator.on("addResult", this.addResult, this);
			pm.mediator.on("updateResult", this.updateResult, this);
		},

		startNewTest: function() {
			this.showResults();
			this.clearResults();
		},

		showResults: function() {
			$("#results").css("display", "block");
		},

		hideResults: function() {
			$("#results").css("display", "none");
		},

		clearResults: function() {
			$("#test-run-status").html("");
		},

		addResult: function(_result, testRun) {
			var result = _.clone(_result);
			result["testsArray"] = testRun.getTestsAsArray(result.tests, result.testPassFailCounts);
			$("#test-run-status").append(Handlebars.templates.item_test_run_request_result(result));
		},

		updateResult: function(_result, testRun) {
			var result = _.clone(_result);
			result["testsArray"] = testRun.getTestsAsArray(result.tests, result.testPassFailCounts);

			$("#test-run-request-result-" + result.id + " .time").html(result.time + " ms");
			$("#test-run-request-result-" + result.id + " .status-code .code").html(result.responseCode.code);
			$("#test-run-request-result-" + result.id + " .status-code .name").html(result.responseCode.name);
			$("#test-run-request-result-" + result.id + " .tests").html(Handlebars.templates.tests(result));
		}
	});

	module.exports = TestRunProgress;


/***/ },

/***/ 360:
/***/ function(module, exports) {

	var TestRunCompleteStats = Backbone.View.extend({
		initialize: function() {
			var view = this;
			var model = this.model;
			
			this.render();		
			pm.mediator.on("loadTestRun", this.onLoadTestRun, this);
			pm.mediator.on("loadTestRunWithoutShowing", this.onLoadTestRunWithoutShowing, this);

			$("#test-run-stats-viewer-tab").on("click", "li a", function() {
				var section = $(this).attr("data-section");
				$("#test-run-stats-viewer-tab .active").removeClass("active");
				$(this).addClass("active");

				// Show section

				$("#test-run-stats-tab-content .tab-pane").css("display", "none");
				$("#test-run-stats-" + section).css("display", "block");
			});

			$("#test-run-stats").on("mouseenter", ".test-run-request-result", function(event) {			
				var testsEl = jQuery('.tests .tests-wrapper', this).children();

				if (testsEl.css("display") === "block") {
					var actionsEl = jQuery('.test-view-more', this);
					actionsEl.css('display', 'block');	
				}			
			});

			$("#test-run-stats").on("mouseleave", ".test-run-request-result", function(event) {			
				var actionsEl = jQuery('.test-view-more', this);
				actionsEl.css('display', 'none');
			});

			$("#test-run-stats").on("click", ".test-view-more", function() {
				var testRunId = $(this).attr("data-test-run-id");
				var resultId = $(this).attr("data-result-id");
				pm.mediator.trigger("showRequestTestGrid", model, testRunId, resultId);	
			});
		},

		renderHeader: function(testRun) {
			$("#test-run-stats .test-run-meta").html(Handlebars.templates.test_run_stats_viewer_header(testRun.getAsJSON()));		
			// $(".test-run-time").timeago();
		},

		renderOverview: function(testRun) {
			var id = testRun.get("id");
			var stats = {
				"id": id,
				"showTime": false,
				"timestamp": testRun.get("timestamp"),
				"count": testRun.getPassCount(),			
				"averageResponseTime": testRun.getAverageResponseTime()
			};		

			$("#test-run-stats-overview").html("");
			$("#test-run-stats-overview").append(Handlebars.templates.test_run_stats_overview(stats));

			$("#test-run-stats-overview-" + id + " .test-run-stats-pass-success").css("width", stats.count.percentage + "%");
		},

		renderPreviousRuns: function(testRun, testRuns) {
			var previousRuns = testRuns.getPreviousRuns(testRun);
			var count = previousRuns.length;
			var data = [];
			var run;
			var dataElement;
			var id;

			if (count > 0) {
				$("#test-run-stats-overview").append("<h5>Previous runs</h5>");
			}

			for(var i = 0; i < count; i++) {
				run = previousRuns[i];
				id = run.get("id");
				dataElement = {
					"id": id,
					"showTime": true,
					"timestamp": run.get("timestamp"),
					"count": run.getPassCount(),			
					"averageResponseTime": run.getAverageResponseTime()
				};

				$("#test-run-stats-overview").append(Handlebars.templates.test_run_stats_overview(dataElement));
				$("#test-run-stats-overview-" + id + " .test-run-stats-pass-success").css("width", dataElement.count.percentage + "%");
			}

			// $(".test-run-stats-timestamp").timeago();
		},

		renderResponseTimes: function(testRun) {
			var results = testRun.get("results");
			if(!results) results = [];

			d3.select(".chart")
			  .selectAll("div")
			    .data(results)
			  .enter().append("div")
			    .style("width", function(r) { return r.time * 10 + "px"; })
			    .text(function(r) { return r.time + "ms"; });
		},

		renderRequests: function(testRun) {
			var results = testRun.get("results");
	        if(!results) {
	            console.log("No results for this test run");
	            return;
	        }

			var result;

			$("#test-run-stats-requests").html("");		
			if(!results) {
				return;
			}
			for(var i = 0; i < results.length; i++) {
				result = results[i];
				result["testRunId"] = testRun.get("id");
				result["testsArray"] = testRun.getTestsAsArray(result.tests, result.testPassFailCounts);		
				$("#test-run-stats-requests").append(Handlebars.templates.item_test_run_request_result(result));
			}
		},

		onLoadTestRun: function(testRun, testRuns) {
			$(".test-run-stats-empty-view").css("display", "none");
			$(".test-run-stats-content").css("display", "block");
			this.renderOverview(testRun);
			this.renderPreviousRuns(testRun, testRuns);
			this.renderHeader(testRun);
			this.renderRequests(testRun);
			this.renderResponseTimes(testRun);
		},

		onLoadTestRunWithoutShowing: function(testRun, testRuns) {
			this.renderOverview(testRun);
			this.renderPreviousRuns(testRun, testRuns);
			this.renderHeader(testRun);
			this.renderRequests(testRun);
			this.renderResponseTimes(testRun);
		}
	});

	module.exports = TestRunCompleteStats;


/***/ },

/***/ 361:
/***/ function(module, exports) {

	var ImportTestRunModal = Backbone.View.extend({
	    initialize: function() {
	        var model = this.model;

	        pm.mediator.on("importedTestRun", this.addAlert, this);

	        var dropZone = document.getElementById('import-test-run-dropzone');
	        dropZone.addEventListener('dragover', function (evt) {
	            evt.stopPropagation();
	            evt.preventDefault();
	            evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
	        }, false);

	        dropZone.addEventListener('drop', function (evt) {
	            evt.stopPropagation();
	            evt.preventDefault();
	            var files = evt.dataTransfer.files; // FileList object.

	            model.importTestRuns(files);
	        }, false);

	        $('#test-run-files-input').on('change', function (event) {
	            var files = event.target.files;
	            model.importTestRuns(files);
	            $('#test-run-files-input').val("");
	        });

	        $("#modal-import-test-run").on("shown", function () {
	            pm.app.trigger("modalOpen", "#modal-import-test-run");
	        });

	        $("#modal-import-test-run").on("hidden", function () {
	            pm.app.trigger("modalClose");
	        });

	        pm.mediator.on("failedTestRunImport", function() {
	          pm.alerts.error('Failed importing test run. Check your file again.');
	        });
	    },

	    addAlert: function(testRun) {
	        var data = testRun.getAsJSON();
	        $('.modal-import-alerts').append(Handlebars.templates.message_test_run_added(data));
	    }
	});

	module.exports = ImportTestRunModal;


/***/ },

/***/ 362:
/***/ function(module, exports) {

	var DataPreviewModal = Backbone.View.extend({
	    initialize: function() {
	        pm.mediator.on("selectedDataFile", this.handleDataFile, this);
	    },

	    handleDataFile: function(type, file) {
	        var fileReader = new FileReader();
	        var oldThis = this;
	        fileReader.onload = function(e) {
	            pm.testRuns.loadDataFromFile(e.target.result, fileReader.fileType, function(arr) {
	                    oldThis.showTableFromArray(arr);
	                    $("#test-data-file-remove-container").css("display", "block");
	                },
	                function() {
	                    $("#previewDataButton").hide();
	                    $("#modal-data-preview").modal('hide');
	                }
	            );
	        }

	        fileReader.fileType = type;
	        fileReader.readAsText(file);
	    },

	    showTableFromArray: function(arr) {
	        var firstRow = arr[0];
	        var keys = [""];
	        var tableHTML = "<table class='table table-condensed table-hover'><thead><tr><th>Iteration</th>";
	        for(var key in firstRow) {
	            if(firstRow.hasOwnProperty(key)) {
	                key = _.escape(key);
	                keys.push(key);
	                tableHTML+=("<th>"+key+"</th>");
	            }
	        }
	        tableHTML+=("</tr></thead><tbody>");
	        var numKeys = keys.length;
	        var numRows = arr.length;
	        for(var i=0;i<numRows;i++) {
	            tableHTML+=("<tr><td>"+(i+1)+"</td>");
	            var j;
	            for(j=1;j<numKeys;j++) { //to exclude first key
	                tableHTML+=("<td>"+ _.escape(arr[i][_.unescape(keys[j])])+"</td>");
	            }
	            tableHTML+=("</tr>");
	        }
	        tableHTML+=("</tbody></table>");
	        $("#data-preview-table-container").html(tableHTML);

		    this.adjustModalWidth();

	        $("#previewDataButton").show();
	    },

		adjustModalWidth: function() {
			var $container = $("#data-preview-table-container");
			var $table = $("#data-preview-table-container tbody");

			$container.css({ position: "absolute", visibility: "hidden", display: "block" });
			$table.css({ position: "absolute", visibility: "hidden", display: "block" });
			var defaultWidth = 	$("#data-preview-table-container").width();
			var tableWidth = $("#data-preview-table-container tbody").width();
			$table.css({ position: "", visibility: "", display: "" });
			$container.css({ position: "", visibility: "", display: "" });

		},
	});

	module.exports = DataPreviewModal;


/***/ },

/***/ 363:
/***/ function(module, exports) {

	var TestRunStatsRequestTestGrid = Backbone.View.extend({
		initialize: function() {
			var model = this.model;
			var view = this;

			$("#stats-request-test-grid .secondary-section-back").on("click", function() {
				pm.mediator.trigger("backToResults");
			});

			$("#stats-request-test-grid").on("click", ".test-row-filter a", function() {
				$("#stats-request-test-grid .active").removeClass("active");
				$(this).addClass("active");
				
				var filter = $(this).attr("data-filter");
				view.filterResults(filter);
			});

			pm.mediator.on("showRequestTestGrid", this.render, this);
		},

		filterResults: function(filter) {
			if (filter === "all") {
				$("#stats-request-test-grid .request-tests table tr").css("display", "table-row");
			}
			else if (filter === "pass") {
				$("#stats-request-test-grid .request-tests table tr[data-result='pass']").css("display", "table-row");
				$("#stats-request-test-grid .request-tests table tr[data-result='fail']").css("display", "none");
			}
			else if (filter === "fail") {
				$("#stats-request-test-grid .request-tests table tr[data-result='pass']").css("display", "none");
				$("#stats-request-test-grid .request-tests table tr[data-result='fail']").css("display", "table-row");
				
			}
		},

		render: function(testRuns, testRunId, resultId) {		
			var testRun = testRuns.get(testRunId);
			var resultIndex = arrayObjectIndexOf(testRun.get("results"), resultId, "id");	
			var results = testRun.get("results")[resultIndex];		

			// Show request details at the top
			$("#stats-request-test-grid .request-meta").html(Handlebars.templates.test_grid_request_meta(results));	

			var keys = testRun.getTestKeysAsArray(results.tests);

			var allTests = _.clone(results.allTests);
			var count = allTests.length;
			var renderArray = [];
			var el;
			var newEl;		
			var elTests;

			for(var i = 0; i < allTests.length; i++) {
				el = {};
				elTests = [];
				allTrue = true;

				for(key in allTests[i]) {
					if (allTests[i].hasOwnProperty(key)) {
	                    allTests[i][key]=!!allTests[i][key];
						elTests.push({
							key: key,
							value: allTests[i][key]
						});

						if (allTrue) {
							allTrue = allTests[i][key];
						}
					}
				}

				if (allTrue) {
					el["result"] = "pass";
				}
				else {
					el["result"] = "fail";
				}
				el["tests"] = elTests;

				renderArray.push(el);
			}

			$("#stats-request-test-grid .request-tests table").html("");
			$("#stats-request-test-grid .request-tests table").append(Handlebars.templates.test_grid_request_tests_head({keys: keys}));		
			$("#stats-request-test-grid .request-tests table").append(Handlebars.templates.test_grid_request_tests_rows({tests: renderArray}));		
		}
	});

	module.exports = TestRunStatsRequestTestGrid;


/***/ }

/******/ });