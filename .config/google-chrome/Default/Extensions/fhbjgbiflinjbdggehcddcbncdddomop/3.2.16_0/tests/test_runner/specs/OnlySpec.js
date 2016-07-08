describe("Postman collection runner > ", function() {
	var waitTime = 800;
	var collectionRunTime = 2000;
	var collectionRunWaitTime = 2500;

	pm["hasStartedSyncTest"] = true;

	var createdUser = false;
	beforeEach(function() {
		if(createdUser==false) {
			var randomNum = Math.round(Math.random()*10000);
			pm.syncTest = {};
			createdUser = true;
		}
	});
	it("Can run a collection with JSON file with bool data", function() {
		var isDataAdded = false;
		var collectionItemLoaded = false;
		var collectionFinished = false;

		runs(function () {
			var collection = mockCollection2;
			pm.collections.addAsNewCollection(collection, false);
			setTimeout(function () {
				isDataAdded = true;
			}, 650);
		});

		waitsFor(function() {
			return isDataAdded === true;
		}, "Could not add collection", waitTime);

		//collection added
		//set the data file
		runs(function() {
			pm["customFileData"] = mockJsonFileText;
			pm["customFileFormat"] = "json";
			pm.runnerTester.setCollectionToRun("5a884e5b-a19b-e828-dda5-9ac455327210");
			pm.runnerTester.setIterationCount(2);
			pm.runnerTester.startTestRun();
			setTimeout(function () {
				collectionFinished = true;
			}, collectionRunTime);
		});

		waitsFor(function() {
			return collectionFinished === true;
		}, "Could not finish running collection", collectionRunWaitTime);

		runs(function() {
			expect(pm.runnerTester.areAllTestsPassing()).toBe(true);
			expect(pm.runnerTester.testsExist()).toBe(true);
		});
	});


   it("Can run a collection properly replacing variables in the body without Interceptor", function() {
		var isDataAdded = false;
		var collectionItemLoaded = false;
		var collectionFinished = false;

		runs(function () {
			var collection = mockCollectionVarReplacement;
			pm.collections.addAsNewCollection(collection, false);
			pm.settings.setSetting("useInterceptor", false);
			setTimeout(function () {
				isDataAdded = true;
			}, 650);
		});

		waitsFor(function() {
			return isDataAdded === true;
		}, "Could not add collection", waitTime);

		//collection added
		//set the data file
		runs(function() {
			pm.runnerTester.setCollectionToRun("e9c97d99-0e0f-4700-85de-4cecba3c82f1");
			pm.runnerTester.setIterationCount(1);
			pm.runnerTester.startTestRun();
			setTimeout(function () {
				collectionFinished = true;
			}, collectionRunTime);
		});

		waitsFor(function() {
			return collectionFinished === true;
		}, "Could not finish running collection", collectionRunWaitTime);

		runs(function() {
			expect(pm.runnerTester.areAllTestsPassing()).toBe(true);
			expect(pm.runnerTester.testsExist()).toBe(true);
		});
	});

	it("Can run a collection properly replacing variables in the body with Interceptor", function() {
		var isDataAdded = false;
		var collectionItemLoaded = false;
		var collectionFinished = false;

		runs(function () {
			var collection = mockCollectionVarReplacement;
			//pm.collections.addAsNewCollection(collection, false); //collection already added
			pm.settings.setSetting("useInterceptor", true);
			setTimeout(function () {
				isDataAdded = true;
			}, 650);
		});

		waitsFor(function() {
			return isDataAdded === true;
		}, "Could not add collection", waitTime);

		//collection added
		//set the data file
		runs(function() {
			pm.runnerTester.setCollectionToRun("e9c97d99-0e0f-4700-85de-4cecba3c82f1");
			pm.runnerTester.setIterationCount(1);
			pm.runnerTester.startTestRun();
			setTimeout(function () {
				collectionFinished = true;
			}, collectionRunTime);
		});

		waitsFor(function() {
			return collectionFinished === true;
		}, "Could not finish running collection", collectionRunWaitTime);

		runs(function() {
			expect(pm.runnerTester.areAllTestsPassing()).toBe(true);
			expect(pm.runnerTester.testsExist()).toBe(true);
			pm.settings.setSetting("useInterceptor", false);
		});
	});


	it("Can run a collection with CSV file with numeric data", function() {
		var isDataAdded = false;
		var collectionItemLoaded = false;
		var collectionFinished = false;

		runs(function () {
			var collection = mockCollection1;
			pm.collections.addAsNewCollection(collection, false);
			pm.environments.importEnvironment(mockEnv, true);
			setTimeout(function () {
				isDataAdded = true;
			}, 650);
		});

		waitsFor(function() {
			return isDataAdded === true;
		}, "Could not add collection", waitTime);

		//collection added
		//set the data file
		runs(function() {
			pm["customFileData"] = mockDataFile1;
			pm["customFileFormat"] = "csv";
			pm.runnerTester.setCollectionToRun("c0fa7a85-383d-f9eb-b472-f9bd2eda0261");
			pm.runnerTester.setIterationCount(2);
			pm.runnerTester.setEnvironmentId("13d91521-1fa4-7648-8ba4-f902b1469495");
			pm.runnerTester.startTestRun();
			setTimeout(function () {
				collectionFinished = true;
			}, collectionRunTime);
		});

		waitsFor(function() {
			return collectionFinished === true;
		}, "Could not finish running collection", collectionRunWaitTime);

		runs(function() {
			expect(pm.runnerTester.areAllTestsPassing()).toBe(true);
			expect(pm.runnerTester.testsExist()).toBe(true);
		});
	});

	it("can send a request and get and set cookie using the Interceptr", function() {
		var responseLoaded = false;
		var isDataAdded = false;
		var collectionItemLoaded = false;
		var collectionFinished = false;

		runs(function () {
			var collection = mockCollectionforInterceptor;
			pm.collections.addAsNewCollection(collection, false);
			setTimeout(function () {
				isDataAdded = true;
			}, 650);
		});

		waitsFor(function() {
			return isDataAdded === true;
		}, "Could not add collection", waitTime);

		//collection added
		//set the data file
		runs(function() {
			pm["customFileData"] = mockDataFile1;
			pm["customFileFormat"] = "csv";
			pm.runnerTester.setCollectionToRun("e8d0222e-83d1-d335-6309-3df9d23d1542");
			pm.settings.setSetting("useInterceptor", true);
			pm.runnerTester.setIterationCount(1);
			pm.runnerTester.startTestRun();
			setTimeout(function () {
				collectionFinished = true;
			}, collectionRunTime);
		});

		waitsFor(function() {
			return collectionFinished === true;
		}, "Could not finish running collection", collectionRunWaitTime);

		runs(function() {
			expect(pm.runnerTester.areAllTestsPassing()).toBe(true);
			expect(pm.runnerTester.testsExist()).toBe(true);
			pm.settings.setSetting("useInterceptor", false);
		});
	});

	it("Did not see any Global Errors", function() {
		runs(function () {
			expect(typeof pm.COMPULSARY_TEST_FAIL === "undefined").toBe(true);
		});
	});
});