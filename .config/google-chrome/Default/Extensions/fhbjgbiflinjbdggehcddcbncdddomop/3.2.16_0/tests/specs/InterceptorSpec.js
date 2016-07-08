if(!postman_electron) {
describe("Postman Interceptor > ", function() {
	var waitTime = 2000;
	var aceEditorWaitTime = waitTime + 300;

	beforeEach(function() {
		pm.tester.resetRequest();
	});

	afterEach(function() {
		pm.tester.resetRequest();
	});

	describe("can use the interceptor to read and write cookies > ", function() {
		it("can send a request and get a cookie", function() {
			var responseLoaded = false;
			runs(function() {
				pm.settings.setSetting("useInterceptor", true);
				pm.tester.setUrl("http://dump.getpostman.com/get");
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
				var foundString = pm.tester.rawBodyHasString("Cookie");
				expect(foundString).toBe(true);
				pm.settings.setSetting("useInterceptor", false);
			});
		});

		it("can send a request and write a cookie", function() {
			var responseLoaded = false;
			var randString = "";
			runs(function() {
				pm.settings.setSetting("useInterceptor", true);
				pm.tester.setUrl("http://dump.getpostman.com/get");
				pm.tester.setMethod("GET");
				randString = Math.random() + "";
				var headers = [
					{ key: "Cookie", value: "customCookie="+randString }
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
			}, "Could not get response", waitTime);

			runs(function() {
				var foundString = pm.tester.rawBodyHasString("customCookie="+randString);
				expect(foundString).toBe(true);
				pm.settings.setSetting("useInterceptor", false);
			});
		});
	});
});
}

