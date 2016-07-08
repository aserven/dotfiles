 describe("Code generation > ", function() {
  var codeGenTime = 200;
  var modalTime = 500;

  beforeEach(function() {
    var tabsReady = false;
    waitsFor(function() {
      return pm.hasPostmanInitialized === true;
    }, "hasPostmanInitialized", 500);

    runs(function() {
      pm.settings.resetSettings();
      pm.tester.resetRequest();
      pm.tester.closeAllTabs();
      pm.tester.setUrl("http://dump.getpostman.com?a=codegen");
      pm.tester.openCodeGenModal();
    });

  });

  it("should generate correct code snippets", function() {
    var codeGenned = false;

    //C Libcurl
    runs(function() {
      pm.tester.selectCodeGenLanguage("generateCLibCurlSnippet"); setTimeout(function() { codeGenned = true; }, codeGenTime);
    });
    waitsFor(function() { return codeGenned === true; }, "Code not genned", codeGenTime+50);
    runs(function(){ expect(pm.tester.codeGenHasText("curl_easy_init()")).toBe(true); codeGenned = false;});

    //Curl
    runs(function() {
      pm.tester.selectCodeGenLanguage("curl"); setTimeout(function() { codeGenned = true; }, codeGenTime);
    });
    waitsFor(function() { return codeGenned === true; }, "Code not genned", codeGenTime+50);
    runs(function(){ expect(pm.tester.codeGenHasText("curl -X")).toBe(true); codeGenned = false;});

    //C# RestClient
    runs(function() {
      pm.tester.selectCodeGenLanguage("generateCSharpRestSharpSnippet"); setTimeout(function() { codeGenned = true; }, codeGenTime);
    });
    waitsFor(function() { return codeGenned === true; }, "Code not genned", codeGenTime+50);
    runs(function(){ expect(pm.tester.codeGenHasText("new RestClient")).toBe(true); codeGenned = false;});

    //Go
    runs(function() {
      pm.tester.selectCodeGenLanguage("generateGoNativeSnippet"); setTimeout(function() { codeGenned = true; }, codeGenTime);
    });
    waitsFor(function() { return codeGenned === true; }, "Code not genned", codeGenTime+50);
    runs(function(){ expect(pm.tester.codeGenHasText("package main")).toBe(true); codeGenned = false;});

    //raw HTTP
    runs(function() {
      pm.tester.selectCodeGenLanguage("rawHttp"); setTimeout(function() { codeGenned = true; }, codeGenTime);
    });
    waitsFor(function() { return codeGenned === true; }, "Code not genned", codeGenTime+50);
    runs(function(){ expect(pm.tester.codeGenHasText("GET  HTTP/1.1")).toBe(true); codeGenned = false;});

    //Java OkHttp
    runs(function() {
      pm.tester.selectCodeGenLanguage("generateJavaOkHttpSnippet"); setTimeout(function() { codeGenned = true; }, codeGenTime);
    });
    waitsFor(function() { return codeGenned === true; }, "Code not genned", codeGenTime+50);
    runs(function(){ expect(pm.tester.codeGenHasText("new OkHttpClient")).toBe(true); codeGenned = false;});

    //Java Unirest
    runs(function() {
      pm.tester.selectCodeGenLanguage("generateJavaUnirestSnippet"); setTimeout(function() { codeGenned = true; }, codeGenTime);
    });
    waitsFor(function() { return codeGenned === true; }, "Code not genned", codeGenTime+50);
    runs(function(){ expect(pm.tester.codeGenHasText("Unirest.get")).toBe(true); codeGenned = false;});

    //jQuery.ajax
    runs(function() {
      pm.tester.selectCodeGenLanguage("generateJavaScriptjQueryAjaxSnippet"); setTimeout(function() { codeGenned = true; }, codeGenTime);
    });
    waitsFor(function() { return codeGenned === true; }, "Code not genned", codeGenTime+50);
    runs(function(){ expect(pm.tester.codeGenHasText("$.ajax")).toBe(true); codeGenned = false;});

    //Javascript XHR
    runs(function() {
      pm.tester.selectCodeGenLanguage("generateJavaScriptXMLHttpRequestSnippet"); setTimeout(function() { codeGenned = true; }, codeGenTime);
    });
    waitsFor(function() { return codeGenned === true; }, "Code not genned", codeGenTime+50);
    runs(function(){ expect(pm.tester.codeGenHasText("new XMLHttpRequest")).toBe(true); codeGenned = false;});

    //Node native
    runs(function() {
      pm.tester.selectCodeGenLanguage("generateNodeNativeSnippet"); setTimeout(function() { codeGenned = true; }, codeGenTime);
    });
    waitsFor(function() { return codeGenned === true; }, "Code not genned", codeGenTime+50);
    runs(function(){ expect(pm.tester.codeGenHasText("http = require")).toBe(true); codeGenned = false;});

    //Node request
    runs(function() {
      pm.tester.selectCodeGenLanguage("generateNodeRequestSnippet"); setTimeout(function() { codeGenned = true; }, codeGenTime);
    });
    waitsFor(function() { return codeGenned === true; }, "Code not genned", codeGenTime+50);
    runs(function(){ expect(pm.tester.codeGenHasText("require(\"request\")")).toBe(true); codeGenned = false;});

    //Node unirest
    runs(function() {
      pm.tester.selectCodeGenLanguage("generateNodeUnirestSnippet"); setTimeout(function() { codeGenned = true; }, codeGenTime);
    });
    waitsFor(function() { return codeGenned === true; }, "Code not genned", codeGenTime+50);
    runs(function(){ expect(pm.tester.codeGenHasText("req = unirest")).toBe(true); codeGenned = false;});

    //Obj-C NSURL
    runs(function() {
      pm.tester.selectCodeGenLanguage("generateObjectiveCNSURLSnippet"); setTimeout(function() { codeGenned = true; }, codeGenTime);
    });
    waitsFor(function() { return codeGenned === true; }, "Code not genned", codeGenTime+50);
    runs(function(){ expect(pm.tester.codeGenHasText("NSDictionary")).toBe(true); codeGenned = false;});

    //OCaml CoHttp
    runs(function() {
      pm.tester.selectCodeGenLanguage("generateOCamlCoHttpSnippet"); setTimeout(function() { codeGenned = true; }, codeGenTime);
    });
    waitsFor(function() { return codeGenned === true; }, "Code not genned", codeGenTime+50);
    runs(function(){ expect(pm.tester.codeGenHasText("let uri = Uri")).toBe(true); codeGenned = false;});

    //PHP Http V1
    runs(function() {
      pm.tester.selectCodeGenLanguage("generatePhpPeclHttpV1Snippet"); setTimeout(function() { codeGenned = true; }, codeGenTime);
    });
    waitsFor(function() { return codeGenned === true; }, "Code not genned", codeGenTime+50);
    runs(function(){ expect(pm.tester.codeGenHasText("new HttpRequest")).toBe(true); codeGenned = false;});

    //PHP Http v2
    runs(function() {
      pm.tester.selectCodeGenLanguage("generatePhpPeclHttpV2Snippet"); setTimeout(function() { codeGenned = true; }, codeGenTime);
    });
    waitsFor(function() { return codeGenned === true; }, "Code not genned", codeGenTime+50);
    runs(function(){ expect(pm.tester.codeGenHasText("request->setRequestUrl")).toBe(true); codeGenned = false;});

    //php curl
    runs(function() {
      pm.tester.selectCodeGenLanguage("generatePhpExtCurlSnippet"); setTimeout(function() { codeGenned = true; }, codeGenTime);
    });
    waitsFor(function() { return codeGenned === true; }, "Code not genned", codeGenTime+50);
    runs(function(){ expect(pm.tester.codeGenHasText("curl_setopt_array")).toBe(true); codeGenned = false;});

    //Python python3
    runs(function() {
      pm.tester.selectCodeGenLanguage("generatePythonPython3Snippet"); setTimeout(function() { codeGenned = true; }, codeGenTime);
    });
    waitsFor(function() { return codeGenned === true; }, "Code not genned", codeGenTime+50);
    runs(function(){ expect(pm.tester.codeGenHasText("http.client.HTTPConnection")).toBe(true); codeGenned = false;});

    //Python request
    runs(function() {
      pm.tester.selectCodeGenLanguage("generatePythonRequestsSnippet"); setTimeout(function() { codeGenned = true; }, codeGenTime);
    });
    waitsFor(function() { return codeGenned === true; }, "Code not genned", codeGenTime+50);
    runs(function(){ expect(pm.tester.codeGenHasText("import requests")).toBe(true); codeGenned = false;});

    //Ruby native
    runs(function() {
      pm.tester.selectCodeGenLanguage("generateRubyNativeSnippet"); setTimeout(function() { codeGenned = true; }, codeGenTime);
    });
    waitsFor(function() { return codeGenned === true; }, "Code not genned", codeGenTime+50);
    runs(function(){ expect(pm.tester.codeGenHasText("request = Net::HTTP")).toBe(true); codeGenned = false;});

    //Shell wget
    runs(function() {
      pm.tester.selectCodeGenLanguage("generateShellWgetSnippet"); setTimeout(function() { codeGenned = true; }, codeGenTime);
    });
    waitsFor(function() { return codeGenned === true; }, "Code not genned", codeGenTime+50);
    runs(function(){ expect(pm.tester.codeGenHasText("wget")).toBe(true); codeGenned = false;});

    //Shell Httpie
    runs(function() {
      pm.tester.selectCodeGenLanguage("generateShellHttpieSnippet"); setTimeout(function() { codeGenned = true; }, codeGenTime);
    });
    waitsFor(function() { return codeGenned === true; }, "Code not genned", codeGenTime+50);
    runs(function(){ expect(pm.tester.codeGenHasText("http GET")).toBe(true); codeGenned = false;});

    //Shell curl
    runs(function() {
      pm.tester.selectCodeGenLanguage("generateShellCurlSnippet"); setTimeout(function() { codeGenned = true; }, codeGenTime);
    });
    waitsFor(function() { return codeGenned === true; }, "Code not genned", codeGenTime+50);
    runs(function(){ expect(pm.tester.codeGenHasText("curl")).toBe(true); codeGenned = false;});

    //Swift NSURL
    runs(function() {
      pm.tester.selectCodeGenLanguage("generateSwiftNSURLSnippet"); setTimeout(function() { codeGenned = true; }, codeGenTime);
    });
    waitsFor(function() { return codeGenned === true; }, "Code not genned", codeGenTime+50);
    runs(function(){ expect(pm.tester.codeGenHasText("NSURLSession")).toBe(true); codeGenned = false;});

  });
});