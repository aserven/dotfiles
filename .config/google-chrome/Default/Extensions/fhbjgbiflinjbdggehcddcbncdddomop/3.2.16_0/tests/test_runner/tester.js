function changeValueAfterTime(variable, value, time) {
	setTimeout(function() {
		variable.val = value;
	}, time);
}

pm.indexedDB.clearAllObjectStores = function(callback) {
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
};

pm.runnerTester = {
	setIterationCount: function(count) {
		$("#test-run-count").val(count);
	},

	setCollectionToRun: function(collectionId) {
		$("#select-collection").val(collectionId);
	},

	setEnvironmentId: function(envId) {
		$("#select-environment").val(envId);
	},

	startTestRun: function() {
		$("#start-test-run").click();
	},

    areAllTestsPassing: function() {
        var result = true;
        $(".tests .test .label").each(function() {
            if($(this).html() !== "pass") {
                result = false;
            }
        });
        return result;
    },

    testsExist: function() {
        if($(".tests .test .label").length ==0) {
            return false;
        }
        return true;
    }
};