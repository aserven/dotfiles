describe("Postman Importers and Converters > ", function () {
    var importWaitTime = 1000;
    var modalTimeout = 300;

    beforeEach(function () {
        var tabsReady = false;
        waitsFor(function () {
            return pm.hasPostmanInitialized === true;
        }, "hasPostmanInitialized", 500);

        runs(function () {
            pm.settings.resetSettings();
            pm.tester.resetRequest();
            pm.tester.closeAllTabs();
        });
    });

    it("can import swagger 2.0 JSON", function () {
        var isImportOpen = false;
        var isImportDone = false;

        runs(function () {
            pm.tester.openImportModal();
            setTimeout(function () {
                isImportOpen = true;
            }, modalTimeout - 100);
        });

        waitsFor(function () {
            return isImportOpen === true;
        }, "Modal not open", modalTimeout);

        runs(function () {
            isImportOpen = false;
            pm.tester.switchImportTab("rawtext");
            setTimeout(function () {
                isImportOpen = true;
            }, modalTimeout - 100);
        });

        waitsFor(function () {
            return isImportOpen === true;
        }, "Modal not open", modalTimeout);

        //paste swagger text
        runs(function () {
            pm.tester.setImportTextValue(JSON.stringify(mockImportees.swagger2));
            pm.tester.startImportText();
            setTimeout(function () {
                isImportDone = true;
            }, importWaitTime - 100);
        });

        waitsFor(function () {
            return isImportDone === true;
        }, "Import not done", importWaitTime);

        runs(function () {
            pm.tester.closeImporter();
            var index = pm.tester.getCollectionIndexByName("My API");
            expect(index).not.toBe(-1);
        });
    });

    it("can import swagger 2.0 YAML", function () {
        var isImportOpen = false;
        var isImportDone = false;

        runs(function () {
            pm.tester.openImportModal();
            setTimeout(function () {
                isImportOpen = true;
            }, modalTimeout - 100);
        });

        waitsFor(function () {
            return isImportOpen === true;
        }, "Modal not open", modalTimeout);

        runs(function () {
            isImportOpen = false;
            pm.tester.switchImportTab("rawtext");
            setTimeout(function () {
                isImportOpen = true;
            }, modalTimeout - 100);
        });

        waitsFor(function () {
            return isImportOpen === true;
        }, "Modal not open", modalTimeout);

        //paste swagger text
        runs(function () {
            pm.tester.setImportTextValue(mockImportees.swagger2_yaml);
            pm.tester.startImportText();
            setTimeout(function () {
                isImportDone = true;
            }, importWaitTime - 100);
        });

        waitsFor(function () {
            return isImportDone === true;
        }, "Import not done", importWaitTime);

        runs(function () {
            pm.tester.closeImporter();
            var index = pm.tester.getCollectionIndexByName("Uber API");
            expect(index).not.toBe(-1);
        });
    });

    it("can import WADL file", function () {
        var isImportOpen = false;
        var isImportDone = false;

        runs(function () {
            pm.tester.openImportModal();
            setTimeout(function () {
                isImportOpen = true;
            }, modalTimeout - 100);
        });

        waitsFor(function () {
            return isImportOpen === true;
        }, "Modal not open", modalTimeout);

        runs(function () {
            isImportOpen = false;
            pm.tester.switchImportTab("rawtext");
            setTimeout(function () {
                isImportOpen = true;
            }, modalTimeout - 100);
        });

        waitsFor(function () {
            return isImportOpen === true;
        }, "Modal not open", modalTimeout);

        //paste text
        runs(function () {
            pm.tester.setImportTextValue(mockImportees.wadl);
            pm.tester.startImportText();
            setTimeout(function () {
                isImportDone = true;
            }, importWaitTime - 100);
        });

        waitsFor(function () {
            return isImportDone === true;
        }, "Import not done", importWaitTime);

        runs(function () {
            pm.tester.closeImporter();
            var index = pm.tester.getCollectionIndexByName("Converted from WADL");
            expect(index).not.toBe(-1);
        });
    });

    it("can import swagger 1.0", function () {
        var isImportOpen = false;
        var isImportDone = false;

        runs(function () {
            pm.tester.openImportModal();
            setTimeout(function () {
                isImportOpen = true;
            }, modalTimeout - 100);
        });

        waitsFor(function () {
            return isImportOpen === true;
        }, "Modal not open", modalTimeout);

        runs(function () {
            isImportOpen = false;
            pm.tester.switchImportTab("rawtext");
            setTimeout(function () {
                isImportOpen = true;
            }, modalTimeout - 100);
        });

        waitsFor(function () {
            return isImportOpen === true;
        }, "Modal not open", modalTimeout);

        //paste swagger text
        runs(function () {
            pm.tester.setImportTextValue(JSON.stringify(mockImportees.swagger1));
            pm.tester.startImportText();
            setTimeout(function () {
                isImportDone = true;
            }, importWaitTime - 100);
        });

        waitsFor(function () {
            return isImportDone === true;
        }, "Import not done", importWaitTime);

        runs(function () {
            pm.tester.closeImporter();
            var index = pm.tester.getCollectionIndexByName("Postman Barebones");
            expect(index).not.toBe(-1);
        });
    });

    it("can import RAML", function () {
        var isImportOpen = false;
        var isImportDone = false;

        runs(function () {
            pm.tester.openImportModal();
            setTimeout(function () {
                isImportOpen = true;
            }, modalTimeout - 100);
        });

        waitsFor(function () {
            return isImportOpen === true;
        }, "Modal not open", modalTimeout);

        runs(function () {
            isImportOpen = false;
            pm.tester.switchImportTab("rawtext");
            setTimeout(function () {
                isImportOpen = true;
            }, modalTimeout - 100);
        });

        waitsFor(function () {
            return isImportOpen === true;
        }, "Modal not open", modalTimeout);

        //paste text
        runs(function () {
            pm.tester.switchImportTab("link");
            pm.tester.setImportLinkValue(mockImportees.ramlLink);
            pm.tester.startImportLink();
            setTimeout(function () {
                isImportDone = true;
            }, (importWaitTime * 5) - 200);
        });

        waitsFor(function () {
            return isImportDone === true;
        }, "Import not done", importWaitTime * 5);

        runs(function () {
            pm.tester.closeImporter();
            var index = pm.tester.getCollectionIndexByName("Remote Vending API");
            expect(index).not.toBe(-1);
        });
    });

    it("can import cURL command", function () {
        var isImportOpen = false;
        var isImportDone = false;

        runs(function () {
            pm.tester.closeAllTabs();
            pm.tester.openImportModal();
            setTimeout(function () {
                isImportOpen = true;
            }, modalTimeout - 100);
        });

        waitsFor(function () {
            return isImportOpen === true;
        }, "Modal not open", modalTimeout);

        runs(function () {
            isImportOpen = false;
            pm.tester.switchImportTab("rawtext");
            setTimeout(function () {
                isImportOpen = true;
            }, modalTimeout - 100);
        });

        waitsFor(function () {
            return isImportOpen === true;
        }, "Modal not open", modalTimeout);

        //paste text
        runs(function () {
            pm.tester.setImportTextValue(mockImportees.curl);
            pm.tester.startImportText();
            setTimeout(function () {
                isImportDone = true;
            }, importWaitTime - 100);
        });

        waitsFor(function () {
            return isImportDone === true;
        }, "Import not done", importWaitTime);

        runs(function () {
            pm.tester.closeImporter();
            var success = pm.tester.requestMetaDescriptionHas('Generated from a curl request:');
            expect(success).toBe(true);
        });
    });
});
