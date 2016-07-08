describe("Postman helpers > ", function() {
	var waitTime = 300;
	var codeMirrorModalWaitTime = 2000;
	var modalWaitTime = 600;
	var codeMirrorWaitTime = codeMirrorModalWaitTime + 50;

	beforeEach(function() {
		waitsFor(function() {
			return pm.hasPostmanInitialized === true;
		}, "hasPostmanInitialized", 500);

		runs(function() {
			pm.settings.resetSettings();
			pm.tester.resetRequest();
		});
	});

	afterEach(function() {
		// pm.tester.resetRequest();
	});

	it("has initialized Postman", function() {
		expect(pm.hasPostmanInitialized).toBe(true);
		pm.tester.addTestEnvironments();
		pm.tester.addTestGlobals();
	});

	describe("basic helper > ", function() {
		it("Can create new collection for helpers", function() {
			var isOpen = false;
			var foundCollection = false;
			runs(function() {
				pm.tester.openNewCollectionModal();
				setTimeout(function() {
					isOpen = true;
				}, codeMirrorModalWaitTime);
			});

			waitsFor(function() {
				return isOpen === true;
			}, "Could not open new collection modal", codeMirrorWaitTime+200);

			runs(function() {
				pm.tester.setNewCollectionModalName("HelperCollection");
				pm.tester.submitNewCollectionModal();
				setTimeout(function() {
					foundCollection = pm.tester.collectionSidebarHasString("HelperCollection");
				}, modalWaitTime);
			});

			waitsFor(function() {
				return foundCollection === true;
			}, "Could not add new collection", modalWaitTime+200);
		});
		it("can generate basic auth header", function() {
			var responseLoaded = false;
			runs(function() {
				pm.tester.setBasicAuthParams({
					username: "Aladin",
					password: "sesam open",
					addNow: true
				});

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
				expect(pm.tester.rawBodyHasString("Authorization")).toBe(true);
				expect(pm.tester.rawBodyHasString("Basic QWxhZGluOnNlc2FtIG9wZW4\\=")).toBe(true);
			});
		});

		it("can generate basic auth header with variables", function() {
			var responseLoaded = false;
			runs(function() {
				pm.tester.setEnvironmentByName("test_basic_env");

				pm.tester.setBasicAuthParams({
					username: "{{username}}",
					password: "{{password}}",
					addNow: true
				});

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
				expect(pm.tester.rawBodyHasString("Authorization")).toBe(true);
				expect(pm.tester.rawBodyHasString("Basic QWxhZGluOnNlc2FtIG9wZW4\\=")).toBe(true);
			});
		});

		it("can run basicAuth from a saved request", function() {
			var responseLoaded = false;
			var isOpen = false;
			var isSubmitted = false;
			var collectionItemLoaded = false;
			runs(function() {
				pm.tester.setBasicAuthParams({
					username: "{{username}}",
					password: "{{password}}",
					addNow: false
				});

				pm.tester.setUrl("http://localhost:5000/get");
				pm.tester.setMethod("GET");
				pm.tester.openAddRequestToCollectionModal();

				setTimeout(function() {
					isOpen = true;
				}, codeMirrorModalWaitTime);
			});

			waitsFor(function() {
				return isOpen === true;
			}, "Could not open add collection modal", codeMirrorWaitTime);

			runs(function() {
				var params = {
					"existingCollectionName": "HelperCollection",
					"requestName": "BasicAuth saved request"
				};

				pm.tester.addDataToAddRequestToCollectionModal(params);
				pm.tester.submitAddRequestToCollectionModal();

				setTimeout(function() {
					isSubmitted = true;
				}, modalWaitTime);
			});

			waitsFor(function() {
				return isSubmitted === true;
			}, "Could not submit modal", codeMirrorWaitTime);

			runs(function() {
				//load request from collection
				var collectionIndex = pm.tester.getCollectionIndexByName("HelperCollection");
				pm.tester.selectCollectionRequest(collectionIndex, 1);
				setTimeout(function() {
					collectionItemLoaded = true;
				}, 1050);
			});

			waitsFor(function() {
				return collectionItemLoaded === true;
			}, "Collection item not loaded", 1500);

			runs(function() {
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
				expect(pm.tester.rawBodyHasString("Authorization")).toBe(true);
				expect(pm.tester.rawBodyHasString("Basic QWxhZGluOnNlc2FtIG9wZW4\\=")).toBe(true);
			});
		});
	});

	describe("digest helper > ", function() {
		it("can generate a digest header for a get request", function() {
			var refreshed = false;
			runs(function() {
				pm.tester.setUrl("http://httpbin.org/digest-auth/auth/user/pass");
				pm.tester.setMethod("GET");

				pm.tester.setDigestAuthParams({
					username: "user",
					realm: "me@kennethreitz.com",
					password: "pass",
					nonce: "59c177ca4c8aa616a0e0007717a2225d",
					algorithm: "MD5",
					qop: "auth",
					nonce_count: "00000002",
					client_nonce: "a621deed62b2ff96",
					opaque: "c68f9b6d2ccdf56c49945e0788fd1017",
					addNow: true
				});

				setTimeout(function() {
					refreshed = true;
				}, 100);
			});

			waitsFor(function() {
				return refreshed === true;
			}, "Could not get response", waitTime);

			runs(function() {
				var auth = pm.tester.getHeaderValue("Authorization");
				var found = auth.search("bf0ed74d6a422565ba9aae6d0e36f7b9") >= 0;
				expect(found).toBe(true);
			});
		});

		it("can generate a digest header for a get request with variables", function() {
			var refreshed = false;
			runs(function() {
				pm.tester.setEnvironmentByName("test_digest_env");

				pm.tester.setUrl("http://httpbin.org/digest-auth/auth/user/pass");
				pm.tester.setMethod("GET");

				pm.tester.setDigestAuthParams({
					username: "{{username}}",
					realm: "{{realm}}",
					password: "{{password}}",
					nonce: "{{nonce}}",
					algorithm: "{{algorithm}}",
					qop: "{{qop}}",
					nonce_count: "{{nonce_count}}",
					client_nonce: "{{client_nonce}}",
					opaque: "{{opaque}}",
					addNow: true
				});

				setTimeout(function() {
					refreshed = true;
				}, 100);
			});

			waitsFor(function() {
				return refreshed === true;
			}, "Could not get response", waitTime);

			runs(function() {
				var auth = pm.tester.getHeaderValue("Authorization");
				var found = auth.search("bf0ed74d6a422565ba9aae6d0e36f7b9") >= 0;
				expect(found).toBe(true);
			});
		});

		///

		it("can run digestAuth from a saved request", function() {
			var responseLoaded = false;
			var isOpen = false;
			var isSubmitted = false;
			var collectionItemLoaded = false;
			runs(function() {
				pm.tester.setEnvironmentByName("test_digest_env");
				pm.tester.setUrl("http://httpbin.org/digest-auth/auth/user/pass");
				pm.tester.setMethod("GET");

				pm.tester.setDigestAuthParams({
					username: "{{username}}",
					realm: "{{realm}}",
					password: "{{password}}",
					nonce: "{{nonce}}",
					algorithm: "{{algorithm}}",
					qop: "{{qop}}",
					nonce_count: "{{nonce_count}}",
					client_nonce: "{{client_nonce}}",
					opaque: "{{opaque}}",
					addNow: false
				});


				pm.tester.openAddRequestToCollectionModal();

				setTimeout(function() {
					isOpen = true;
				}, codeMirrorModalWaitTime);
			});

			waitsFor(function() {
				return isOpen === true;
			}, "Could not open add collection modal", codeMirrorWaitTime);

			runs(function() {
				var params = {
					"existingCollectionName": "HelperCollection",
					"requestName": "DigestAuth saved request"
				};

				pm.tester.addDataToAddRequestToCollectionModal(params);
				pm.tester.submitAddRequestToCollectionModal();

				setTimeout(function() {
					isSubmitted = true;
				}, modalWaitTime);
			});

			waitsFor(function() {
				return isSubmitted === true;
			}, "Could not submit modal", codeMirrorWaitTime);

			runs(function() {
				//load request from collection
				var collectionIndex = pm.tester.getCollectionIndexByName("HelperCollection");
				pm.tester.selectCollectionRequest(collectionIndex, 2);
				setTimeout(function() {
					collectionItemLoaded = true;
				}, 350);
			});

			waitsFor(function() {
				return collectionItemLoaded === true;
			}, "Collection item not loaded", 650);

			runs(function() {
				pm.tester.submitRequest();

				var response = pm.request.get("response");
				response.on("loadResponse", function() {
					responseLoaded = true;
				});
			});

			waitsFor(function() {
				return responseLoaded === true;
			}, "Could not get response", waitTime*5);

			runs(function() {
				var auth = pm.tester.getHeaderValue("Authorization");
				var found = auth.search("bf0ed74d6a422565ba9aae6d0e36f7b9") >= 0;
				expect(found).toBe(true);
			});
		});
	});

	describe("oauth helper > ", function() {
		it("can generate oauth1.0 params for get request", function() {
			var refreshed = false;
			runs(function() {
				pm.tester.setUrl("http://photos.example.net/photos?size=original&file=vacation.jpg");
				pm.tester.setMethod("GET");

				pm.tester.setOAuth1Params({
					"consumer_key": "dpf43f3p2l4k3l03",
					"consumer_secret": "kd94hf93k423kf44",
					"token": "nnch734d00sl2jdk",
					"token_secret": "pfkkdhi9sl3r4s00",
					"signature_method": "HMAC-SHA1",
					"timestamp": "1191242096",
					"nonce": "kllo9940pd9333jh",
					"version": "1.0",
					"realm": "",
					"header": false,
					"auto": false,
					addNow: true
				});

				setTimeout(function() {
					refreshed = true;
				}, 100);
			});

			waitsFor(function() {
				return refreshed === true;
			}, "Could not get response", waitTime);

			runs(function() {
				var params = pm.tester.getURLParams();

				var pair = {
					"key": "oauth_signature",
					"value": "tR3+Ty81lMeYAr/Fid0kMTYa/WM="
				};

				var found = pm.tester.kvpairExistsInArray(params, pair);
				expect(found).toBe(true);
			});
		});

		it("can generate oauth1.0 params for formdata post request", function() {
			var refreshed = false;
			runs(function() {
				pm.tester.setUrl("http://photos.example.net/photos");
				pm.tester.setMethod("POST");
				var params = [
					{ key: "size", value: "original" },
					{ key: "file", value: "vacation.jpg" }
				];
				pm.tester.setBodyType("params");
				pm.tester.setFormDataParams(params);

				pm.tester.setOAuth1Params({
					"consumer_key": "dpf43f3p2l4k3l03",
					"consumer_secret": "kd94hf93k423kf44",
					"token": "nnch734d00sl2jdk",
					"token_secret": "pfkkdhi9sl3r4s00",
					"signature_method": "HMAC-SHA1",
					"timestamp": "1191242096",
					"nonce": "kllo9940pd9333jh",
					"version": "1.0",
					"realm": "",
					"header": false,
					"auto": false,
					addNow: true
				});

				setTimeout(function() {
					refreshed = true;
				}, 100);
			});

			waitsFor(function() {
				return refreshed === true;
			}, "Could not get response", waitTime);

			runs(function() {
				var params = pm.tester.getFormDataParams();

				var pair = {
					"key": "oauth_signature",
					"value": "wPkvxykrw+BTdCcGqKr+3I+PsiM="
				};

				var found = pm.tester.kvpairExistsInArray(params, pair);
				expect(found).toBe(true);

				var bodyPair = {
					"key": "size",
					"value": "original"
				};

				expect(pm.tester.kvpairExistsInArray(params, bodyPair)).toBe(true);
			});
		});

		it("can generate oauth1.0 params for formdata post request but missing http in the url", function() {
			var refreshed = false;
			runs(function() {
				pm.tester.setUrl("photos.example.net/photos");
				pm.tester.setMethod("POST");
				pm.tester.setBodyType("params");
				var params = [
					{ key: "size", value: "original" },
					{ key: "file", value: "vacation.jpg" }
				];

				pm.tester.setFormDataParams(params);

				pm.tester.setOAuth1Params({
					"consumer_key": "dpf43f3p2l4k3l03",
					"consumer_secret": "kd94hf93k423kf44",
					"token": "nnch734d00sl2jdk",
					"token_secret": "pfkkdhi9sl3r4s00",
					"signature_method": "HMAC-SHA1",
					"timestamp": "1191242096",
					"nonce": "kllo9940pd9333jh",
					"version": "1.0",
					"realm": "",
					"header": false,
					"auto": false,
					addNow: true
				});

				setTimeout(function() {
					refreshed = true;
				}, 100);
			});

			waitsFor(function() {
				return refreshed === true;
			}, "Could not get response", waitTime);

			runs(function() {
				var params = pm.tester.getFormDataParams();

				var pair = {
					"key": "oauth_signature",
					"value": "wPkvxykrw+BTdCcGqKr+3I+PsiM="
				};

				var found = pm.tester.kvpairExistsInArray(params, pair);
				expect(found).toBe(true);

				var bodyPair = {
					"key": "size",
					"value": "original"
				};

				expect(pm.tester.kvpairExistsInArray(params, bodyPair)).toBe(true);
			});
		});

		it("can generate oauth1.0 params for urlencoded post request", function() {
			var refreshed = false;
			runs(function() {
				pm.tester.setUrl("http://photos.example.net/photos");
				pm.tester.setMethod("POST");
				var params = [
					{ key: "size", value: "original" },
					{ key: "file", value: "vacation.jpg" }
				];

				pm.tester.setBodyType("urlencoded");
				pm.tester.setURLEncodedParams(params);

				pm.tester.setOAuth1Params({
					"consumer_key": "dpf43f3p2l4k3l03",
					"consumer_secret": "kd94hf93k423kf44",
					"token": "nnch734d00sl2jdk",
					"token_secret": "pfkkdhi9sl3r4s00",
					"signature_method": "HMAC-SHA1",
					"timestamp": "1191242096",
					"nonce": "kllo9940pd9333jh",
					"version": "1.0",
					"realm": "",
					"header": false,
					"auto": false,
					addNow: true
				});

				setTimeout(function() {
					refreshed = true;
				}, 100);
			});

			waitsFor(function() {
				return refreshed === true;
			}, "Could not get response", waitTime);

			runs(function() {
				var params = pm.tester.getURLEncodedParams();

				var pair = {
					"key": "oauth_signature",
					"value": "wPkvxykrw+BTdCcGqKr+3I+PsiM="
				};

				var found = pm.tester.kvpairExistsInArray(params, pair);
				expect(found).toBe(true);

				var bodyPair = {
					"key": "size",
					"value": "original"
				};

				expect(pm.tester.kvpairExistsInArray(params, bodyPair)).toBe(true);
			});
		});

		it("can generate oauth1.0 header for formdata post request", function() {
			var refreshed = false;
			runs(function() {
				pm.tester.setUrl("http://photos.example.net/photos");
				pm.tester.setMethod("POST");
				var params = [
					{ key: "size", value: "original" },
					{ key: "file", value: "vacation.jpg" }
				];

				pm.tester.setBodyType("params");
				pm.tester.setFormDataParams(params);

				pm.tester.setOAuth1Params({
					"consumer_key": "dpf43f3p2l4k3l03",
					"consumer_secret": "kd94hf93k423kf44",
					"token": "nnch734d00sl2jdk",
					"token_secret": "pfkkdhi9sl3r4s00",
					"signature_method": "HMAC-SHA1",
					"timestamp": "1191242096",
					"nonce": "kllo9940pd9333jh",
					"version": "1.0",
					"realm": "",
					"header": true,
					"auto": false,
					addNow: true
				});

				setTimeout(function() {
					refreshed = true;
				}, 100);
			});

			waitsFor(function() {
				return refreshed === true;
			}, "Could not get response", waitTime);

			runs(function() {
				var params = pm.tester.getFormDataParams();
				var auth = pm.tester.getHeaderValue("Authorization");
				var found = auth.search("wPkvxykrw%2BBTdCcGqKr%2B3I%2BPsiM%3D") >= 0;
				expect(found).toBe(true);

				var bodyPair = {
					"key": "size",
					"value": "original"
				};

				expect(pm.tester.kvpairExistsInArray(params, bodyPair)).toBe(true);
			});
		});

		it("can generate and send oauth1.0 params for formdata post request", function() {
			var responseLoaded = false;
			runs(function() {
				pm.tester.setUrl("http://localhost:5000/post");
				pm.tester.setMethod("POST");
				var params = [];

				pm.tester.setBodyType("params");
				pm.tester.setFormDataParams(params);

				pm.tester.setOAuth1Params({
					"consumer_key": "abcd",
					"consumer_secret": "abcd",
					"token": "",
					"token_secret": "",
					"signature_method": "HMAC-SHA1",
					"timestamp": "1234",
					"nonce": "abcd",
					"version": "1.0",
					"realm": "",
					"header": false,
					"auto": true,
					addNow: false
				});
				//sig should be Yjh/xARMcmPIuAyA/xezGYf2rBs=
				pm.tester.submitRequest();
				var response = pm.request.get("response");
				response.on("loadResponse", function() {
					responseLoaded = true;
				});
			});

			waitsFor(function() {
				return responseLoaded === true;
			}, "Could not get response", 200);

			runs(function() {
				var found = pm.tester.rawBodyHasString("XTKTNfimRKx1HNUdHzaUGUInpZc=");
				expect(found).toBe(true);
			});
		});

		it("can generate oauth1.0 params for formdata post request with variables", function() {
			var refreshed = false;
			runs(function() {
				pm.tester.setEnvironmentByName("test_oauth_env");

				pm.tester.setUrl("{{url}}");
				pm.tester.setMethod("POST");
				var params = [
					{ key: "size", value: "original" },
					{ key: "file", value: "vacation.jpg" }
				];
				pm.tester.setBodyType("params");
				pm.tester.setFormDataParams(params);

				pm.tester.setOAuth1Params({
					"consumer_key": "{{consumer_key}}",
					"consumer_secret": "{{consumer_secret}}",
					"token": "{{token}}",
					"token_secret": "{{token_secret}}",
					"signature_method": "{{signature_method}}",
					"timestamp": "{{timestamp}}",
					"nonce": "{{nonce}}",
					"version": "{{version}}",
					"realm": "",
					"header": true,
					"auto": false,
					addNow: true
				});

				setTimeout(function() {
					refreshed = true;
				}, 100);
			});

			waitsFor(function() {
				return refreshed === true;
			}, "Could not get response", waitTime);

			runs(function() {
				var params = pm.tester.getFormDataParams();
				var auth = pm.tester.getHeaderValue("Authorization");
				var found = auth.search("wPkvxykrw%2BBTdCcGqKr%2B3I%2BPsiM%3D") >= 0;
				expect(found).toBe(true);

				var bodyPair = {
					"key": "size",
					"value": "original"
				};

				expect(pm.tester.kvpairExistsInArray(params, bodyPair)).toBe(true);
			});
		});

		it("can generate oauth1.0 params for formdata post request with variables with auto add", function() {
		var responseLoaded = false;
		runs(function() {
			pm.tester.setEnvironmentByName("test_oauth_env");

			pm.tester.setUrl("http://localhost:5000/post");
			pm.tester.setMethod("POST");
			var params = [
				{ key: "size", value: "original" },
				{ key: "file", value: "vacation.jpg" }
			];
			pm.tester.setBodyType("params");
			pm.tester.setFormDataParams(params);

			pm.tester.setOAuth1Params({
				"consumer_key": "{{consumer_key}}",
				"consumer_secret": "{{consumer_secret}}",
				"token": "{{token}}",
				"token_secret": "{{token_secret}}",
				"signature_method": "{{signature_method}}",
				"timestamp": "{{timestamp}}",
				"nonce": "{{nonce}}",
				"version": "{{version}}",
				"realm": "",
				"header": false,
				"auto": true,
				addNow: false
			});

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
			expect(pm.tester.rawBodyHasString("oauth_signature")).toBe(true);
		});
	});
	});

    describe("Hawk helper > ", function() {
        it("can generate a hawk header for a get request", function() {
            var refreshed = false,
                hardCodedHeader = 'Hawk id="dh37fgj492je", ts="1353832234", nonce="j4h3g2", ext="some-app-ext-data", ' +
                    'mac="6R4rV5iE+NPoym+WwjeHzjAGXUtLNIxmo1vpMofpLAE="';
            runs(function() {
                pm.tester.setUrl("http://example.com:8000/resource/1?b=1&a=2");
                pm.tester.setMethod("GET");

                pm.tester.setHawkAuthParams({
                    algorithm: 'sha256',
                    hawk_id: 'dh37fgj492je',
                    hawk_key: 'werxhqb98rpaxn39848xrunpaw3489ruxnpa98w4rxn',
                    user: 'Steve',
                    nonce: 'j4h3g2',
                    ext: 'some-app-ext-data',
                    timestamp: '1353832234',
                    addNow: true
                });

                setTimeout(function() {
                    refreshed = true;
                }, 100);
            });

            waitsFor(function() {
                return refreshed === true;
            }, "Could not get response", waitTime);

            runs(function() {
                var auth = pm.tester.getHeaderValue("Authorization");
                expect(auth).toBe(hardCodedHeader);
            });
        });
    });

	describe("AWS helper > ", function() {
        it("can generate a AWS Sig header for a POST request", function() {
            var refreshed = false,
                responseLoaded = false,
                hardCodedHeader = 'AWS4-HMAC-SHA256 Credential=Dummy_key/20151218/eu-west-1/execute-api/aws4_request, SignedHeaders=content-length;content-type;host;x-amz-date, Signature=';
            runs(function() {
                pm.tester.setUrl("https://the2yl2ege.execute-api.eu-west-1.amazonaws.com/prod/item");
                pm.tester.setMethod("POST");

                var data = '{"what": "isthis"}';

                pm.tester.setBodyType("raw");
                pm.tester.setRawData(data);

                pm.tester.setAwsAuthParams({
                    accessKey: 'Dummy_key',
                    secretKey: 'Dummy_secret',
                    region: 'eu-west-1',
                    service: 'execute-api',
                });

                pm.tester.submitRequest();

				var response = pm.request.get("response");
				response.on("loadResponse", function() {
					responseLoaded = true;
				});
			});

			waitsFor(function() {
				return responseLoaded === true;
			}, "Could not get response", 1000);

            runs(function() {
                var auth = pm.tester.getHeaderValue("Authorization");
                console.log("Auth header for AWS: " , auth)
                expect(auth.has(hardCodedHeader)).toBe(true);
            });
        });
    });
});
