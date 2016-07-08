//describe("Postman requester > ", function() {
//	var modalWaitTime = 600;
//	var codeMirrorModalWaitTime = 2000;
//	var waitTime = modalWaitTime + 50;
//	var codeMirrorWaitTime = codeMirrorModalWaitTime + 50;
//
//	pm["hasStartedSyncTest"] = true;
//
//	var createdUser = false;
//	beforeEach(function() {
//		if(createdUser==false) {
//			var randomNum = Math.round(Math.random()*10000);
//			pm.syncTest = {};
//			//pm.syncTest.userId = "testUser-"+randomNum;
//			//pm.syncTest.accessToken = "testToken-"+randomNum;
//			//pm.tester.loginSyncUser('U1','xyz');
//			//Should have logged in
//			createdUser = true;
//		}
//	});
//
//	afterEach(function() {
//		pm.tester.resetRequest();
//	});
//
//	describe("Can create things and send them to the DB", function() {
//		it("collection", function() {
//			var isOpen = false;
//			var foundCollection = false;
//			var collectionId = null;
//			var collectionData;
//			runs(function() {
//				pm.tester.openNewCollectionModal();
//				setTimeout(function() {
//					isOpen = true;
//				}, codeMirrorModalWaitTime);
//			});
//
//			waitsFor(function() {
//				return isOpen === true;
//			}, "Could not open new collection modal", codeMirrorWaitTime);
//
//			runs(function() {
//				pm.tester.setNewCollectionModalName("Sync collection C1");
//				pm.tester.submitNewCollectionModal();
//				setTimeout(function() {
//					foundCollection = pm.tester.collectionSidebarHasString("Sync collection C1");
//					collectionId = pm.tester.getIdOfCollectionFromName("Sync collection C1");
//				}, modalWaitTime);
//			});
//
//			waitsFor(function() {
//				return foundCollection === true;
//			}, "Could not add new collection", waitTime);
//
//			waitsFor(function() {
//				return collectionId !== null;
//			}, "Could not get collection ID", waitTime);
//
//			runs(function() {
//				pm.tester.getCollectionFromSyncAPI(collectionId, function(cd) {
//					collectionData = cd;
//				});
//			});
//
//			waitsFor(function() {
//				return collectionData
//			}, "Could not get collection data from server", waitTime*3);
//
//			runs(function() {
//				expect(collectionData.name).toBe("Sync collection C1");
//			});
//		});
//	});
//
//
//});