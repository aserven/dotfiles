describe("Folders > ", function() {
	var modalToggleWaitTime = 1500;
	var codeMirrorModalWaitTime = 2000;
	var waitTime = modalToggleWaitTime + 200;
	var codeMirrorWaitTime = codeMirrorModalWaitTime + 50;
	var duplicateWaitTime = 500;

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
		pm.tester.resetRequest();
	});

	it("has initialized Postman", function() {
		expect(pm.hasPostmanInitialized).toBe(true);
	});

	describe("basic Folder actions > ", function() {
		it("can add a collection and a folder", function() {
			var isOpen = false;
			var foundCollection = false;

			var isAddFolderOpen = false;
			var foundFolder = false;
			var isAddFolderClosed = false;

			runs(function() {
				pm.tester.openNewCollectionModal();
				setTimeout(function() {
					isOpen = true;
				}, codeMirrorModalWaitTime);
			});

			waitsFor(function() {
				return isOpen === true;
			}, "Could not open new collection modal", codeMirrorWaitTime+500);

			runs(function() {
				pm.tester.setNewCollectionModalName("id Software");
				pm.tester.submitNewCollectionModal();
				setTimeout(function() {
					foundCollection = pm.tester.collectionSidebarHasString("id Software");
				}, modalToggleWaitTime);
			});

			waitsFor(function() {
				return foundCollection === true;
			}, "Could not add new collection", waitTime);

			runs(function() {
				pm.tester.openAddFolderModal(1);
				setTimeout(function() {
					isAddFolderOpen = true;
				}, modalToggleWaitTime+200);
			});

			waitsFor(function() {
				return isAddFolderOpen === true;
			}, "could not open new folder", modalToggleWaitTime+500);

			runs(function() {
				pm.tester.setNewFolderName("Doom 3");
				pm.tester.submitNewFolderModal();

				setTimeout(function() {
					isAddFolderClosed = true;
				}, modalToggleWaitTime);
			});

			waitsFor(function() {
				return isAddFolderClosed === true;
			});

			runs(function() {
				expect(pm.tester.collectionHasFolderName(1, "Doom 3")).toBe(true);
			});
		});

		it("can add another folder", function() {
			var isAddFolderOpen = false;
			var isAddFolderClosed = false;

			runs(function() {
				pm.tester.openAddFolderModal(1);
				setTimeout(function() {
					isAddFolderOpen = true;
				}, codeMirrorModalWaitTime);
			});

			waitsFor(function() {
				return isAddFolderOpen === true;
			}, "could not open new folder", codeMirrorWaitTime);

			runs(function() {
				pm.tester.setNewFolderName("Wolfenstein");
				pm.tester.submitNewFolderModal();

				setTimeout(function() {
					isAddFolderClosed = true;
				}, modalToggleWaitTime);
			});

			waitsFor(function() {
				return isAddFolderClosed === true;
			}, "could not close add folder", waitTime);

			runs(function() {
				expect(pm.tester.collectionHasFolderName(1, "Wolfenstein")).toBe(true);
			});

		});

		it("can change folder name", function() {
			var isEditFolderOpen = false;
			var isEditFolderClosed = false;

			runs(function() {
				pm.tester.openEditFolderModal(1, 1);
				setTimeout(function() {
					isEditFolderOpen = true;
				}, modalToggleWaitTime);
			});

			waitsFor(function() {
				return isEditFolderOpen === true;
			}, "could not open edit folder modal", waitTime);

			runs(function() {
				pm.tester.setEditFolderName("Commander Keen");
				pm.tester.submitEditFolderModal();

				setTimeout(function() {
					isEditFolderClosed = true;
				}, modalToggleWaitTime);
			});

			waitsFor(function() {
				return isEditFolderClosed === true;
			}, "could not close edit folder modal", waitTime);

			runs(function() {
				expect(pm.tester.collectionHasFolderName(1, "Commander Keen")).toBe(true);
			});
		});

		it("can duplicate folder", function() {
			var hasFolderDuplicated=false;
			runs(function() {
				pm.tester.duplicateFolder(1,1);
				setTimeout(function() {
					hasFolderDuplicated=true;
				},duplicateWaitTime);
			});

			waitsFor(function() {
				return hasFolderDuplicated === true;
			}, "could not duplicate folder in time", duplicateWaitTime+100);

			runs(function() {
				expect(pm.tester.collectionHasFolderName(1, "Commander Keen copy")).toBe(true);
			});

		});

		it("can delete folder", function() {
			var isDeleteFolderOpen = false;
			var isDeleteFolderClosed = false;

			runs(function() {
				pm.tester.openDeleteFolderModal(1, 3); //1 is commander keen, 2 is wolfenstein, 3 is the duplicated one
				setTimeout(function() {
					isDeleteFolderOpen = true;
				}, modalToggleWaitTime);
			});

			waitsFor(function() {
				return isDeleteFolderOpen === true;
			}, "could not open edit folder modal", waitTime);

			runs(function() {
				pm.tester.submitDeleteFolderModal();

				setTimeout(function() {
					isDeleteFolderClosed = true;
				}, modalToggleWaitTime);
			});

			waitsFor(function() {
				return isDeleteFolderClosed === true;
			}, "could not close edit folder modal", waitTime);

			runs(function() {
				expect(pm.tester.collectionHasFolderName(1, "Wolfenstein")).toBe(false);
			});
		});
	});

	describe("render imported collection properly > ", function() {
		it("load collection without any request", function() {
			var isDataAdded = false;

			runs(function() {
				var collection = mockCollections["noRequests"];
				pm.collections.addAsNewCollection(collection, false);
				setTimeout(function() {
					isDataAdded = true;
				}, 100);
			});

			waitsFor(function() {
				return isDataAdded === true;
			}, "Could not add data", waitTime);

			runs(function() {
				expect(pm.tester.collectionHasFolderName(1, "Half Life")).toBe(true);
				expect(pm.tester.collectionHasFolderName(1, "Fear")).toBe(true);
				expect(pm.tester.collectionHasFolderName(1, "Serious Sam")).toBe(true);
			});
		});

		it("load collection with folders and requests", function() {
			var isDataAdded = false;

			runs(function() {
				var collection = mockCollections["withFoldersAndRequests"];
				pm.collections.addAsNewCollection(collection);
				setTimeout(function() {
					isDataAdded = true;
				}, 400);
			});

			waitsFor(function() {
				return isDataAdded === true;
			}, "Could not add data", waitTime);

			runs(function() {
				expect(pm.tester.collectionHasFolderName(2, "POST")).toBe(true);
				expect(pm.tester.collectionHasFolderName(2, "Others")).toBe(true);

				expect(pm.tester.collectionFolderHasRequest(2, 1, "Delete")).toBe(true);
				expect(pm.tester.collectionFolderHasRequest(2, 2, "POST - application")).toBe(true);

				expect(pm.tester.collectionSidebarHasString("GET request with params")).toBe(true);
			});
		});
	});

	describe("can move requests between folders and collections > ", function() {
		it("can move requests between folders of the same collection", function() {
			var isMoved = false;
			var requestId;
			runs(function() {
				var targetCollection = mockCollections["withFoldersAndRequests"];
				//Others folder/Delete to POST folder
				requestId = pm.tester.getIDOfRequestInFolder(2, 1, 1);
				var folderId = pm.tester.getIDOfFolderInCollection(2, 2);

				pm.collections.moveRequestToFolder(requestId, folderId);

				setTimeout(function() {
					isMoved = true;
				}, 600);
			});

			waitsFor(function() {
				return isMoved === true;
			}, "could not execute move function", waitTime);

			runs(function() {
				expect(pm.tester.collectionFolderHasRequest(2, 1, requestId)).toBe(false);
				expect(pm.tester.collectionFolderHasRequest(2, 2, requestId)).toBe(true);
			});
		});

		it("can move requests from folder to parent collection", function() {
			var isMoved = false;

			runs(function() {
				var targetCollection = mockCollections["withFoldersAndRequests"];
				//Others folder/Delete to POST folder
				var requestId = pm.tester.getIDOfRequestInFolder(2, 2, 1);
				var collectionId = pm.tester.getIDOfCollection(2);

				pm.collections.moveRequestToCollectionWithOptSync(requestId, collectionId, false);

				setTimeout(function() {
					isMoved = true;
				}, 1600);
			});

			waitsFor(function() {
				return isMoved === true;
			}, "could not execute move function", waitTime*5);

			runs(function() {
				expect(pm.tester.collectionFolderHasRequest(2, 2, "application/xml")).toBe(false);
				expect(pm.tester.collectionHasRequest(2, "application/xml")).toBe(true);
			});
		});

		it("can move requests from parent collection to folder", function() {
			var isMoved = false;

			runs(function() {
				var targetCollection = mockCollections["withFoldersAndRequests"];

				//Others folder/Delete to POST folder
				var requestId = pm.tester.getIDOfRequestInCollection(2, 2);
				var folderId = pm.tester.getIDOfFolderInCollection(2, 2);

				expect(pm.tester.collectionHasRequest(2, "GET request with params")).toBe(true);
				expect(pm.tester.collectionFolderHasRequest(2, 2, "GET request with params")).toBe(false);

				pm.collections.moveRequestToFolderWithOptSync(requestId, folderId, false);

				setTimeout(function() {
					isMoved = true;
				}, 1000);
			});

			waitsFor(function() {
				return isMoved === true;
			}, "could not execute move function", waitTime);

			runs(function() {
				expect(pm.tester.collectionHasRequest(2, "GET request with params")).toBe(false);
				expect(pm.tester.collectionFolderHasRequest(2, 2, "GET request with params")).toBe(true);
			});
		});

		it("can move requests between folders of different collection", function() {
			var isMoved = false;

			runs(function() {
				var targetCollection = mockCollections["withFoldersAndRequests"];
				//Others folder/Delete to POST folder
				var requestId = pm.tester.getIDOfRequestInFolder(2, 1, 1);
				var folderId = pm.tester.getIDOfFolderInCollection(1, 2);

				expect(pm.tester.collectionFolderHasRequest(2, 1, "GET")).toBe(true);
				expect(pm.tester.collectionFolderHasRequest(1, 2, "GET")).toBe(false);

				pm.collections.moveRequestToFolderWithOptSync(requestId, folderId, false);

				setTimeout(function() {
					isMoved = true;
				}, 500);
			});

			waitsFor(function() {
				return isMoved === true;
			}, "could not execute move function", waitTime);

			runs(function() {
				expect(pm.tester.collectionFolderHasRequest(2, 1, "GET")).toBe(false);
				expect(pm.tester.collectionFolderHasRequest(1, 2, "GET")).toBe(true);
			});
		});

		it("can move requests from folder of one collection to another collection", function() {
			var isMoved = false;
			var isDataAdded = false;
			var reqName = "";

			runs(function() {
				var collection = mockCollections["withFoldersAndRequests"];
				pm.collections.addAsNewCollection(collection);
				setTimeout(function() {
					isDataAdded = true;
				}, 400);
			});

			waitsFor(function() {
				return isDataAdded === true;
			}, "Could not add data", waitTime);

			runs(function() {
				//var targetCollection = mockCollections["withFoldersAndRequests"];
				//Others folder/Delete to POST folder
				var requestId = pm.tester.getIDOfRequestInFolder(2, 2, 1);
				var collectionId = pm.tester.getIDOfCollection(1);

				reqName = pm.collections.getRequestById(requestId).name;

				expect(pm.tester.collectionFolderHasRequest(2, 2, reqName)).toBe(true);
				expect(pm.tester.collectionHasRequest(1, reqName)).toBe(false);

				pm.collections.moveRequestToCollectionWithOptSync(requestId, collectionId, false);

				setTimeout(function() {
					isMoved = true;
				}, 500);
			});

			waitsFor(function() {
				return isMoved === true;
			}, "could not execute move function", waitTime);

			runs(function() {
				expect(pm.tester.collectionFolderHasRequest(2, 2, reqName)).toBe(false);
				expect(pm.tester.collectionHasRequest(1, reqName)).toBe(true);
			});
		});

		it("can move requests from collection to folder of different collection", function() {
			var isMoved = false;
			var reqName = "";

			runs(function() {
				var targetCollection = mockCollections["withFoldersAndRequests"];
				//Others folder/Delete to POST folder
				var requestId = pm.tester.getIDOfRequestInCollection(2, 1);
				var collectionId = pm.tester.getIDOfCollection(1);
				reqName = pm.collections.getRequestById(requestId).name;

				expect(pm.tester.collectionHasRequest(2, reqName)).toBe(true);
				expect(pm.tester.collectionHasRequest(1, reqName)).toBe(false);

				pm.collections.moveRequestToCollectionWithOptSync(requestId, collectionId, false);

				setTimeout(function() {
					isMoved = true;
				}, 500);
			});

			waitsFor(function() {
				return isMoved === true;
			}, "could not execute move function", waitTime);

			runs(function() {
				expect(pm.tester.collectionHasRequest(2, reqName)).toBe(false);
				expect(pm.tester.collectionHasRequest(1, reqName)).toBe(true);
			});
		});
	});

	describe("add requests to folders > ", function() {
		it("can add a request from add request dialog", function() {

		});
	});

	xdescribe("can search for requests within folders", function() {

	});


	describe("can clear all collections > ", function() {
		it("cleared collections", function() {
			var areRemoved = false;

			runs(function() {
				pm.collections.deleteCollection(pm.tester.getIDOfCollection(1));
				pm.collections.deleteCollection(pm.tester.getIDOfCollection(2));
				pm.collections.deleteCollection(pm.tester.getIDOfCollection(3));

				setTimeout(function() {
					areRemoved = true;
				}, 100);
			});

			waitsFor(function() {
				return areRemoved === false;
			}, "could not remove all collections", waitTime)
		});
	});
});