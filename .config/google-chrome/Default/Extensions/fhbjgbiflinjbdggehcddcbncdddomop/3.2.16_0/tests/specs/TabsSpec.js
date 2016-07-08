 describe("Postman tabs > ", function() {
  var tabWaitTime = 500;
  var aceEditorWaitTime = 1000;

  beforeEach(function() {
    var tabsReady = false;
    waitsFor(function() {
      return pm.hasPostmanInitialized === true;
    }, "hasPostmanInitialized", 500);

    runs(function() {
      pm.settings.resetSettings();
      pm.tester.resetRequest();
      pm.tester.closeAllTabs();
    });

    runs(function() {
      setTimeout(function() {
        tabsReady = true;
      }, tabWaitTime);
    });

    waitsFor(function() {
      return tabsReady === true;
    }, "Tabs not ready", tabWaitTime);
  });

  it("should have only one tab open on start", function() {
    expect(pm.tester.getNumberOfTabsinUI()).toBe(1);
  });

  it("should open new empty tab on clicking new tab icon", function() {
    var tabsReady = false;
    runs(function() {
      pm.tester.openNewTab();
    });

    runs(function() {
      setTimeout(function() {
        tabsReady = true;
      }, tabWaitTime);
    });

    waitsFor(function() {
      return tabsReady === true;
    }, "Tabs not ready", tabWaitTime);

    runs(function(){
      expect(pm.tester.getNumberOfTabsinUI()).toBe(2);
      expect(pm.tester.getActiveTabName()).toBe("New tab");
    });
  });

  it("should switch active tab on clicking tab", function() {
    var tabsReady = false;
    var tabId1, tabId2;

    runs(function() {
      tabId1 = pm.tester.getActiveTabId();
      pm.tester.openNewTab();
      setTimeout(function() {
        tabsReady = true;
      }, tabWaitTime);
    });

    waitsFor(function() {
      return tabsReady === true;
    }, "Tabs not ready", tabWaitTime);

    runs(function(){
      tabId2 = pm.tester.getActiveTabId();
      tabsReady = false;
      setTimeout(function() {
        tabsReady = true;
      }, tabWaitTime);
    });

    waitsFor(function() {
      return tabsReady === true;
    }, "Tabs not ready", tabWaitTime);

    runs(function(){
      pm.tester.clickTab(tabId1);
      tabsReady = false;
      setTimeout(function() {
        tabsReady = true;
      }, tabWaitTime);
    });

    waitsFor(function() {
      return tabsReady === true;
    }, "Tabs not ready", tabWaitTime);

    runs(function(){
      expect(pm.tester.getActiveTabId()).toBe(tabId1);
    });
  });

  it("should switch request & response on switching tabs", function() {
    var tabsReady = false
    var tabId1, tabId2;
    var responseLoaded = false;

    // Sending request in tab 1
    runs(function() {
      tabId1 = pm.tester.getActiveTabId();
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

    // checking tab has response
    runs(function() {
      var foundString = pm.tester.rawBodyHasString("/get");
      expect(foundString).toBe(true);
    });

    // opening another tab
    runs(function() {
      pm.tester.openNewTab();
      setTimeout(function() {
        tabsReady = true;
      }, tabWaitTime);
    });

    waitsFor(function() {
      return tabsReady === true;
    }, "Tabs not ready", tabWaitTime);

    // Sending request in tab 2
    runs(function() {
      tabId2 = pm.tester.getActiveTabId();
      pm.tester.setUrl("http://localhost:5000/post");
      pm.tester.setMethod("POST");
      pm.tester.submitRequest();

      var response = pm.request.get("response");
      responseLoaded = false;
      response.on("loadResponse", function() {
        responseLoaded = true;
      });
    });

    waitsFor(function() {
      return responseLoaded === true;
    }, "Could not get response", aceEditorWaitTime);

    // checking tab has response
    runs(function() {
      var foundString = pm.tester.rawBodyHasString("/post");
      expect(foundString).toBe(true);
    });

    // switching to tab 1
    runs(function(){
      pm.tester.clickTab(tabId1);
      tabsReady = false;
      setTimeout(function() {
        tabsReady = true;
      }, tabWaitTime);
    });

    waitsFor(function() {
      return tabsReady === true;
    }, "Tabs not ready", tabWaitTime);

    runs(function(){
      expect(pm.tester.rawBodyHasString("/get")).toBe(true);
      expect(pm.tester.urlHasString("/get")).toBe(true);
      expect(pm.tester.methodIs("GET")).toBe(true);
    });
  });

  it("should track unsaved changes to collection request", function() {
    var tabsReady = false
    var tabId1, tabId2;
    var responseLoaded = false;
    var collectionItemLoaded = false;

    // Selecting request in tab 1
    runs(function() {
      pm.tester.selectCollectionRequest(2, 1);
      setTimeout(function() {
        collectionItemLoaded = true;
      }, 500);
    });

    waitsFor(function() {
      return collectionItemLoaded === true;
    }, "Collection item not loaded", 700);

    runs(function() {
      expect(pm.tester.urlHasString("http://localhost:5000/get")).toBe(true);
      expect(pm.tester.isActiveTabDirty()).toBe(false);

      // edit url
      pm.tester.setUrl("http://localhost:5000/post");
      $('#url').trigger('keyup');
      setTimeout(function() {
        tabsReady = true;
      }, tabWaitTime);
    });

    waitsFor(function() {
      return tabsReady === true;
    }, "Tabs not ready", tabWaitTime);

    // check if tab is flagged as dirty
    runs(function() {
      expect(pm.tester.isActiveTabDirty()).toBe(true);
      pm.tester.setUrl("http://localhost:5000/get");
      $('#url').trigger('keyup');
      tabsReady = false;
      setTimeout(function() {
        tabsReady = true;
      }, tabWaitTime);
    });

    waitsFor(function() {
      return tabsReady === true;
    }, "Tabs not ready", tabWaitTime);

    runs(function() {
      expect(pm.tester.isActiveTabDirty()).toBe(false);
    });
  });
});