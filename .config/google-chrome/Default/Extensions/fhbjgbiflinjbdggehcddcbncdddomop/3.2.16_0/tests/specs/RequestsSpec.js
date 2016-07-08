describe("Postman requester > ", function() {
	var waitTime = 200;
	var aceEditorWaitTime = waitTime + 500;

	beforeEach(function() {
		pm.tester.resetRequest();
	});

	afterEach(function() {
		pm.tester.resetRequest();
	});

	describe("can send requests without a body > ", function() {
		it("can send a basic GET request", function() {
			var responseLoaded = false;
			runs(function() {
				pm.tester.setUrl("http://localhost:5000/get");
				pm.tester.setMethod("GET");
				pm.tester.submitRequest();

				var response = pm.request.get("response");
				response.on("loadResponse", function() {
					responseLoaded = true;
				});
			});

			waitsFor(function() {
				return responseLoaded === true;
			}, "Could not get response", aceEditorWaitTime);

			runs(function() {
				var foundString = pm.tester.rawBodyHasString("/get");
				expect(foundString).toBe(true);
			});
		});

		it("can send a basic DELETE request", function() {
			var responseLoaded = false;
			runs(function() {
				pm.tester.setUrl("http://httpbin.org/delete");
				pm.tester.setMethod("DELETE");
				pm.tester.submitRequest();

				var response = pm.request.get("response");
				response.on("loadResponse", function() {
					responseLoaded = true;
				});
			});

			waitsFor(function() {
				return responseLoaded === true;
			}, "loadResponse not triggered", aceEditorWaitTime);

			runs(function() {
				var found = pm.tester.rawBodyHasString("/delete");
				expect(found).toBe(true);
			});
		});

		it("can send a basic HEAD request", function() {
			var responseLoaded = false;
			runs(function() {
				pm.tester.setUrl("http://localhost:5000/head");
				pm.tester.setMethod("HEAD");
				pm.tester.submitRequest();

				var response = pm.request.get("response");
				response.on("loadResponse", function() {
					responseLoaded = true;
				});
			});

			waitsFor(function() {
				return responseLoaded === true;
			}, "Could not load the response", aceEditorWaitTime);

			runs(function() {
				var found = pm.tester.areHeadersVisible();
				expect(found).toBe(true);
			});
		});

		it("can send a basic OPTIONS request", function() {
			var responseLoaded = false;
			runs(function() {
				pm.tester.setUrl("http://localhost:5000/html");
				pm.tester.setMethod("OPTIONS");
				pm.tester.submitRequest();

				var response = pm.request.get("response");
				response.on("loadResponse", function() {
					responseLoaded = true;
				});
			});

			waitsFor(function() {
				return responseLoaded === true;
			}, "Could not load the response", aceEditorWaitTime);

			runs(function() {
				var found = pm.tester.isResponseVisible();
				expect(found).toBe(true);
			});
		});

		it("can send a basic PUT request", function() {
			var responseLoaded = false;
			runs(function() {
				pm.tester.setUrl("http://localhost:5000/put");
				pm.tester.setMethod("PUT");
				pm.tester.submitRequest();

				var response = pm.request.get("response");
				response.on("loadResponse", function() {
					responseLoaded = true;
				});
			});

			waitsFor(function() {
				return responseLoaded === true;
			}, "Could not load the response", aceEditorWaitTime);

			runs(function() {
				var found = pm.tester.rawBodyHasString("/put");
				expect(found).toBe(true);
			});
		});

		it("can send receive invalid status code", function() {
			var responseLoaded = false;
			runs(function() {
				pm.tester.setUrl("http://localhost:5000/code/3");
				pm.tester.setMethod("GET");
				pm.tester.submitRequest();

				var response = pm.request.get("response");
				response.on("loadResponse", function() {
					responseLoaded = true;
				});
			});

			waitsFor(function() {
				return responseLoaded === true;
			}, "Could not load the response", aceEditorWaitTime);

			runs(function() {
				var foundStatus = pm.tester.checkStatus("3 UNKNOWN");
				expect(foundStatus).toBe(true);
			});
		});
	});

	describe("can handle different URLs > ", function() {
		it("can send a request where the URL has no http/https", function() {
			var responseLoaded = false;
			runs(function() {
				pm.tester.setUrl("localhost:5000/get");
				pm.tester.setMethod("GET");
				pm.tester.submitRequest();

				var response = pm.request.get("response");
				response.on("loadResponse", function() {
					responseLoaded = true;
				});
			});

			waitsFor(function() {
				return responseLoaded === true;
			}, "Could not get response", aceEditorWaitTime);

			runs(function() {
				var found = pm.tester.rawBodyHasString("/get");
				expect(found).toBe(true);
			});
		});

		it("can send a request where the URL has just one key", function() {
			var responseLoaded = false;
			runs(function() {
				pm.tester.setUrl("http://localhost:5000/get?start");
				pm.tester.setMethod("GET");
				pm.tester.submitRequest();

				var response = pm.request.get("response");
				response.on("loadResponse", function() {
					responseLoaded = true;
				});
			});

			waitsFor(function() {
				return responseLoaded === true;
			}, "Could not get response", waitTime);

			runs(function() {
				var found = pm.tester.rawBodyHasString("/get\\?start");
				expect(found).toBe(true);
			});
		});

		it("can send a URL with a semicolon", function() {
			var responseLoaded = false;
			runs(function() {
				pm.tester.setUrl("http://localhost:5000/get?some=start;val");
				pm.tester.setMethod("GET");
				pm.tester.submitRequest();

				var response = pm.request.get("response");
				response.on("loadResponse", function() {
					responseLoaded = true;
				});
			});

			waitsFor(function() {
				return responseLoaded === true;
			}, "Could not get response", aceEditorWaitTime);

			runs(function() {
				var foundString = pm.tester.rawBodyHasString("some=start%3Bval");
				expect(foundString).toBe(true);
			});
		});

		it("can send an odata URL", function() {
			var responseLoaded = false;
			runs(function() {
				pm.tester.setUrl("http://localhost:5000/get?Resource(code1='1',code2='1')");
				pm.tester.setMethod("GET");
				pm.tester.submitRequest();

				var response = pm.request.get("response");
				response.on("loadResponse", function() {
					responseLoaded = true;
				});
			});

			waitsFor(function() {
				return responseLoaded === true;
			}, "Could not get response", waitTime);

			runs(function() {
				expect(pm.tester.rawBodyHasString("Resource")).toBe(true);
				expect(pm.tester.rawBodyHasString("code1")).toBe(true);
			});
		});
	});

	describe("can process path variables > ", function() {
		it("can send a request where the URL has one segment", function() {
			var responseLoaded = false;
			runs(function() {
				pm.tester.setUrl("http://localhost:5000/:path");
				pm.tester.setMethod("GET");
				var pathVariables = { "path": "get" };
				pm.tester.setPathVariables(pathVariables);
				pm.tester.submitRequest();

				var response = pm.request.get("response");
				response.on("loadResponse", function() {
					responseLoaded = true;
				});
			});

			waitsFor(function() {
				return responseLoaded === true;
			}, "Could not get response", waitTime);

			runs(function() {
				var found = pm.tester.rawBodyHasString("/get");
				expect(found).toBe(true);
			});
		});
	});

	describe("can send requests with a body > ", function() {
		it("can send a basic POST request", function() {
			var responseLoaded = false;
			runs(function() {
				pm.tester.setUrl("http://localhost:5000/post");
				pm.tester.setMethod("POST");
				pm.tester.submitRequest();

				var response = pm.request.get("response");
				response.on("loadResponse", function() {
					responseLoaded = true;
				});
			});

			waitsFor(function() {
				return responseLoaded === true;
			}, "Could not load the response", waitTime);

			runs(function() {
				var found = pm.tester.rawBodyHasString("/post");
				expect(found).toBe(true);
			});
		});

		it("can send a multipart/formdata request", function() {
			var responseLoaded = false;
			runs(function() {
				pm.tester.setUrl("http://localhost:5000/post");
				pm.tester.setMethod("POST");
				var params = [
					{ key: "Foo", value: "bar" },
					{ key: "Test", value: "This" },
					{ key: "Damn", value: "Thing" }
				];

				pm.tester.setFormDataParams(params);
				pm.tester.submitRequest();

				var response = pm.request.get("response");
				response.on("loadResponse", function() {
					responseLoaded = true;
				});
			});

			waitsFor(function() {
				return responseLoaded === true;
			}, "Could not load the response", waitTime);

			runs(function() {
				expect(pm.tester.rawBodyHasString("/post")).toBe(true);
				expect(pm.tester.rawBodyHasString("multipart")).toBe(true);
				expect(pm.tester.rawBodyHasString("Damn")).toBe(true);
			});
		});

		it("can send a multipart/formdata request with disabled rows", function() {
			var responseLoaded = false;
			runs(function() {
				pm.tester.setUrl("http://localhost:5000/post");
				pm.tester.setMethod("POST");
				var params = [
					{ key: "Foo", value: "bar" },
					{ key: "Test", value: "This" },
					{ key: "Damn", value: "Thing" }
				];

				pm.tester.setFormDataParams(params);
				pm.tester.disableFormDataParamWithIndex(2);
				pm.tester.submitRequest();

				var response = pm.request.get("response");
				response.on("loadResponse", function() {
					responseLoaded = true;
				});
			});

			waitsFor(function() {
				return responseLoaded === true;
			}, "Could not load the response", waitTime);

			runs(function() {
				expect(pm.tester.rawBodyHasString("/post")).toBe(true);
				expect(pm.tester.rawBodyHasString("multipart")).toBe(true);
				expect(pm.tester.rawBodyHasString("Damn")).toBe(false);
			});
		});

		it("can send a urlencoded request", function() {
			var responseLoaded = false;
			runs(function() {
				pm.tester.setUrl("http://localhost:5000/post");
				pm.tester.setMethod("POST");
				var params = [
					{ key: "Foo", value: "bar" },
					{ key: "Test", value: "This" },
					{ key: "Damn", value: "Thing" }
				];

				pm.tester.setBodyType("urlencoded");
				pm.tester.setURLEncodedParams(params);
				pm.tester.submitRequest();

				var response = pm.request.get("response");
				response.on("loadResponse", function() {
					responseLoaded = true;
				});
			});

			waitsFor(function() {
				return responseLoaded === true;
			}, "Could not load the response", waitTime);

			runs(function() {
				expect(pm.tester.rawBodyHasString("/post")).toBe(true);
				expect(pm.tester.rawBodyHasString("urlencoded")).toBe(true);
				expect(pm.tester.rawBodyHasString("Damn")).toBe(true);
			});
		});

		it("can send a raw request", function() {
			var responseLoaded = false;
			runs(function() {
				pm.tester.setUrl("http://localhost:5000/post");
				pm.tester.setMethod("POST");

				var data = "blahblahblah";

				pm.tester.setBodyType("raw");
				pm.tester.setRawData(data);
				pm.tester.submitRequest();

				var response = pm.request.get("response");
				response.on("loadResponse", function() {
					responseLoaded = true;
				});
			});

			waitsFor(function() {
				return responseLoaded === true;
			}, "Could not load the response", waitTime);

			runs(function() {
				expect(pm.tester.rawBodyHasString("/post")).toBe(true);
				expect(pm.tester.rawBodyHasString("blahblahblah")).toBe(true);
			});
		});

		it("can send a raw application/json request", function() {
			var responseLoaded = false;
			runs(function() {
				pm.tester.setUrl("http://localhost:5000/post");
				pm.tester.setMethod("POST");

				var data = "blahblahblah";

				pm.tester.setBodyType("raw");
				pm.tester.setRawData(data);

				var headers = [
					{ key: "Content-Type", value: "application/json" }
				];

				pm.tester.setHeaders(headers);
				pm.tester.submitRequest();

				var response = pm.request.get("response");
				response.on("loadResponse", function() {
					responseLoaded = true;
				});
			});

			waitsFor(function() {
				return responseLoaded === true;
			}, "Could not load the response", waitTime);

			runs(function() {
				expect(pm.tester.rawBodyHasString("/post")).toBe(true);
				expect(pm.tester.rawBodyHasString("blahblahblah")).toBe(true);
				expect(pm.tester.rawBodyHasString("application\/json")).toBe(true);
			});
		});
	});

	describe("can add extra headers > ", function() {
		it("can send a no-cache header", function() {
			var responseLoaded = false;
			runs(function() {
				pm.tester.setUrl("http://localhost:5000/get");
				pm.tester.setMethod("GET");
				pm.tester.submitRequest();

				var response = pm.request.get("response");
				response.on("loadResponse", function() {
					responseLoaded = true;
				});
			});

			waitsFor(function() {
				return responseLoaded === true;
			}, "Could not get response", waitTime);

			runs(function() {
				var foundString = pm.tester.rawBodyHasString("no-cache");
				expect(foundString).toBe(true);
			});
		});

		it("can disable no-cache header", function() {
			var responseLoaded = false;
			runs(function() {
				pm.settings.setSetting("sendNoCacheHeader", false);
				pm.tester.setUrl("http://localhost:5000/get");
				pm.tester.setMethod("GET");
				pm.tester.submitRequest();

				var response = pm.request.get("response");
				response.on("loadResponse", function() {
					responseLoaded = true;
				});
			});

			waitsFor(function() {
				return responseLoaded === true;
			}, "Could not get response", waitTime);

			runs(function() {
				var foundString = pm.tester.rawBodyHasString("no-cache");
				expect(foundString).toBe(false);
			});
		});

		it("can send postman-token header", function() {
			var responseLoaded = false;
			runs(function() {
				pm.settings.setSetting("sendPostmanTokenHeader", true);
				pm.tester.setUrl("http://localhost:5000/get");
				pm.tester.setMethod("GET");
				pm.tester.submitRequest();

				var response = pm.request.get("response");
				response.on("loadResponse", function() {
					responseLoaded = true;
				});
			});

			waitsFor(function() {
				return responseLoaded === true;
			}, "Could not get response", waitTime);

			runs(function() {
				var foundString = pm.tester.rawBodyHasString("Postman-Token");
				expect(foundString).toBe(true);
			});
		});

		it("can disable postman-token header", function() {
			var responseLoaded = false;
			runs(function() {
				pm.settings.setSetting("sendPostmanTokenHeader", false);
				pm.tester.setUrl("http://localhost:5000/get");
				pm.tester.setMethod("GET");
				pm.tester.submitRequest();

				var response = pm.request.get("response");
				response.on("loadResponse", function() {
					responseLoaded = true;
				});
			});

			waitsFor(function() {
				return responseLoaded === true;
			}, "Could not get response", waitTime);

			runs(function() {
				var foundString = pm.tester.rawBodyHasString("Postman-Token");
				expect(foundString).toBe(false);
			});
		});
	});

	describe("URL params editor > ", function() {
		it("can edit and send URL params", function() {
			var responseLoaded = false;
			var haveSetParams = false;
			runs(function() {
				pm.tester.setUrl("http://localhost:5000/post");
				pm.tester.setMethod("POST");
				pm.tester.toggleURLParams();

				var urlParams = [
					{ key: "Foo", value: "bar" },
					{ key: "Test", value: "This" },
					{ key: "Damn", value: "Thing" }
				];

				pm.tester.setURLParams(urlParams);

				setTimeout(function() {
					haveSetParams = true;
				}, 100);
			});

			waitsFor(function() {
				return haveSetParams === true;
			}, "could not set URL params", 150);

			runs(function() {
				pm.tester.submitRequest();

				console.log(pm.request.get("url"));

				var response = pm.request.get("response");
				response.on("loadResponse", function() {
					responseLoaded = true;
				});
			});

			waitsFor(function() {
				return responseLoaded === true;
			}, "Could not load the response", waitTime);

			runs(function() {
				var found = pm.tester.rawBodyHasString("/post");
				expect(found).toBe(true);
				expect(pm.tester.rawBodyHasString("Foo")).toBe(true);
				expect(pm.tester.rawBodyHasString("Test")).toBe(true);
				expect(pm.tester.rawBodyHasString("Damn")).toBe(true);
				expect(pm.tester.rawBodyHasString("bar")).toBe(true);
				expect(pm.tester.rawBodyHasString("This")).toBe(true);
				expect(pm.tester.rawBodyHasString("Thing")).toBe(true);
			});
		});

		it("Did not see any Global Errors", function() {
			runs(function () {
				expect(typeof pm.COMPULSARY_TEST_FAIL === "undefined").toBe(true);
			});
		});
	});

	describe("Postman proxy > ", function() {
		it("can send restricted headers", function() {
			var responseLoaded = false;
			runs(function() {
				pm.settings.setSetting("usePostmanProxy", true);
				pm.tester.setUrl("http://localhost:5000/post");
				pm.tester.setMethod("POST");

				var data = "blahblahblah";

				pm.tester.setBodyType("raw");
				pm.tester.setRawData(data);

				var headers = [
					{ key: "Content-Type", value: "application/json" },
					{ key: "User-Agent", value: "PostmanTester" }
				];

				pm.tester.setHeaders(headers);
				pm.tester.submitRequest();

				var response = pm.request.get("response");
				response.on("loadResponse", function() {
					responseLoaded = true;
				});
			});

			waitsFor(function() {
				return responseLoaded === true;
			}, "Could not load the response", waitTime);

			runs(function() {
				expect(pm.tester.rawBodyHasString("/post")).toBe(true);
				expect(pm.tester.rawBodyHasString("blahblahblah")).toBe(true);
				expect(pm.tester.rawBodyHasString("application\/json")).toBe(true);
				expect(pm.tester.rawBodyHasString("Postman-User-Agent")).toBe(true);
				expect(pm.tester.rawBodyHasString("PostmanTester")).toBe(true);
				pm.settings.setSetting("usePostmanProxy", false);
			});
		});
	});
});