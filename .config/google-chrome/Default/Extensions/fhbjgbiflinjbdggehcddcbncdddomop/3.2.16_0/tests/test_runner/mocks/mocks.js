var mockCollection1 = {"id": "c0fa7a85-383d-f9eb-b472-f9bd2eda0261","name": "c1 copy","description": "","order": ["1f22d6cb-d5ca-53e3-585b-f02ee01275cf","98927b63-4083-ac3c-7b87-2d64faf49954","6540425a-3a87-2243-1ae4-ef6582cbf716","20d6cdc6-981c-3ca4-1051-397de633ebba","76975f4b-94da-abe3-167d-07000830a68d","502c9965-9d74-8a0b-7e0b-50b40805e65a"],"folders": [],"timestamp": 0,"owner": 0,"remoteLink": "","public": false,"requests": [{"id": "1f22d6cb-d5ca-53e3-585b-f02ee01275cf","headers": "","url": "http://localhost:5000/get?a={{f1}}&b={{f2}}","preRequestScript": "","pathVariables": {},"method": "GET","data": [],"dataMode": "params","version": 2,"tests": "var data = JSON.parse(responseBody);\nif(iteration===0) {\n    tests[\"URLParamsSubsituted\"] = (data.args.a==\"1\" && data.args.b==\"2\");\n}\nif(iteration==1) {\n    tests[\"URLParamsSubsituted\"] = (data.args.a==\"3\" && data.args.b==\"4\");\n}","currentHelper": "normal","helperAttributes": {},"time": 1425558460172,"name": "UrlParam subs","description": "","collectionId": "c0fa7a85-383d-f9eb-b472-f9bd2eda0261","responses": []},{"id": "20d6cdc6-981c-3ca4-1051-397de633ebba","headers": "f1: {{f1}}\nf2: {{f2}}\n","url": "http://localhost:5000/get","preRequestScript": "","pathVariables": {},"method": "GET","data": [{"key": "a","value": "{{f1}}","type": "text","enabled": true},{"key": "b","value": "{{f2}}","type": "text","enabled": true}],"dataMode": "params","version": 2,"tests": "var data = JSON.parse(responseBody);\nif(iteration===0) {\n    tests[\"HeaderParamsSubsituted\"] = (data.headers.F1==\"1\" && data.headers.F2==\"2\");\n}\nif(iteration==1) {\n    tests[\"HeaderParamsSubsituted\"] = (data.headers.F1==\"3\" && data.headers.F2==\"4\");\n}","currentHelper": "normal","helperAttributes": {},"time": 1425558500869,"name": "Header subs","description": "","collectionId": "c0fa7a85-383d-f9eb-b472-f9bd2eda0261","responses": []},{"id": "502c9965-9d74-8a0b-7e0b-50b40805e65a","headers": "Content-Type: application/json\n","url": "http://localhost:5000/post","preRequestScript": "","pathVariables": {},"method": "POST","data": [],"dataMode": "raw","version": 2,"tests": "var data = JSON.parse(responseBody);\nif(iteration===0) {\n    tests[\"RawParamsSubsituted\"] = (data.json.f1==\"1\" && data.json.f2==\"2\");\n}\nif(iteration==1) {\n    tests[\"RawParamsSubsituted\"] = (data.json.f1==\"3\" && data.json.f2==\"4\");\n}","currentHelper": "normal","helperAttributes": "{}","time": 1425558510508,"name": "Raw Subs copy","description": "","collectionId": "c0fa7a85-383d-f9eb-b472-f9bd2eda0261","responses": [],"rawModeData": "{\n    \"f1\": \"{{f1}}\",\n    \"f2\": \"{{f2}}\"\n}"},{"id": "6540425a-3a87-2243-1ae4-ef6582cbf716","headers": "","url": "http://localhost:5000/post","preRequestScript": "","pathVariables": {},"method": "POST","data": [{"key": "a","value": "{{f1}}","type": "text","enabled": true},{"key": "b","value": "{{f2}}","type": "text","enabled": true}],"dataMode": "urlencoded","version": 2,"tests": "var data = JSON.parse(responseBody);\nif(iteration===0) {\n    tests[\"URLEncodedParamsSubsituted\"] = (data.form.a==\"1\" && data.form.b==\"2\");\n}\nif(iteration==1) {\n    tests[\"URLEncodedParamsSubsituted\"] = (data.form.a==\"3\" && data.form.b==\"4\");\n}","currentHelper": "normal","helperAttributes": {},"time": 1425558479317,"name": "Urlencoded subs","description": "","collectionId": "c0fa7a85-383d-f9eb-b472-f9bd2eda0261","responses": []},{"id": "76975f4b-94da-abe3-167d-07000830a68d","headers": "Content-Type: application/json\n","url": "http://localhost:5000/post","preRequestScript": "","pathVariables": {},"method": "POST","data": [],"dataMode": "raw","version": 2,"tests": "var data = JSON.parse(responseBody);\nif(iteration===0) {\n    tests[\"RawParamsSubsituted\"] = (data.json.f1==\"1\" && data.json.f2==\"2\");\n    tests[\"Env subs worked\"] = data.json.k2===\"v2\";\n    postman.clearEnvironmentVariable(\"k2\");\n}\nif(iteration==1) {\n    tests[\"RawParamsSubsituted\"] = (data.json.f1==\"3\" && data.json.f2==\"4\");\n    tests[\"Clear env var worked\"] = !environment.k2;\n}\n\n","currentHelper": "normal","helperAttributes": {},"time": 1442873497392,"name": "Raw Subs","description": "","collectionId": "c0fa7a85-383d-f9eb-b472-f9bd2eda0261","responses": [],"rawModeData": "{\n    \"f1\": \"{{f1}}\",\n    \"f2\": \"{{f2}}\",\n    \"k2\": \"{{k2}}\"\n}"},{"id": "98927b63-4083-ac3c-7b87-2d64faf49954","headers": "","url": "http://localhost:5000/post","preRequestScript": "","pathVariables": {},"method": "POST","data": [{"key": "a","value": "{{f1}}","type": "text","enabled": true},{"key": "b","value": "{{f2}}","type": "text","enabled": true}],"dataMode": "params","version": 2,"tests": "var data = JSON.parse(responseBody);\nif(iteration===0) {\n    tests[\"FormParamsSubsituted\"] = (data.form.a==\"1\" && data.form.b==\"2\");\n}\nif(iteration==1) {\n    tests[\"FormParamsSubsituted\"] = (data.form.a==\"3\" && data.form.b==\"4\");\n}","currentHelper": "normal","helperAttributes": {},"time": 1425558469765,"name": "Form subs","description": "","collectionId": "c0fa7a85-383d-f9eb-b472-f9bd2eda0261","responses": []}]};

var mockDataFile1 = "f1,f2\n1,2\n3,4";

var mockCollection2 = {"id": "5a884e5b-a19b-e828-dda5-9ac455327210","name": "JSON-bool-test","description": "","order": ["c8d445bb-4f9a-635b-a900-b9550f04beb5"],"folders": [],"timestamp": 0,"synced": false,"owner": "25888","sharedWithTeam": false,"subscribed": false,"remoteLink": "","public": false,"write": true,"requests": [{"id": "c8d445bb-4f9a-635b-a900-b9550f04beb5","headers": "","url": "http://localhost:5000/get?v={{value}}","preRequestScript": "","pathVariables": {},"method": "GET","data": [],"dataMode": "params","version": 2,"tests": "var oldData = _.cloneDeep(data);var responseData = JSON.parse(responseBody);tests[\"Vars correctly subsed\"] = (responseData.args.v==\"true\");console.log('Data.iteration='+oldData.iteration+', itaration='+iteration);tests[\"iteration var works\"]=oldData.iteration===iteration;tests[\"reqName and reqDesc work properly\"]=(request.name===\"R1\" && request.description===\"D1\");","currentHelper": "normal","helperAttributes": {},"time": 1425546570120,"name": "R1","description": "D1","collectionId": "4a884e5b-a19b-e828-dda5-9ac455327210","responses": [],"synced": false}]};

var mockCollectionforInterceptor = {"id": "e8d0222e-83d1-d335-6309-3df9d23d1542","name": "interceptorTest","description": "","order": ["5bac9c21-3566-00c8-14a1-e3655912704b","3d3e80d1-90a7-f532-2f47-fdf7b72388e8"],"folders": [],"timestamp": 1434966579448,"owner": "25888","remoteLink": "","public": false,"createdAt": 1434966579448,"updatedAt": 1434966579448,"synced": false,"requests": [{"id": "3d3e80d1-90a7-f532-2f47-fdf7b72388e8","headers": "Cookie: cookiename={{cookieval}}\n","url": "dump.getpostman.com/get","preRequestScript": "postman.setGlobalVariable(\"cookieval\", Math.random()+\"\");","pathVariables": {},"method": "GET","data": [],"dataMode": "params","version": 2,"tests": "tests[\"Has cookie in response\"] = responseBody.has(\"cookiename=\"+globals.cookieval);","currentHelper": "normal","helperAttributes": {},"time": 1434968038198,"name": "cookeWrite","description": "","collectionId": "e8d0222e-83d1-d335-6309-3df9d23d1542","responses": [],"synced": false},{"id": "5bac9c21-3566-00c8-14a1-e3655912704b","headers": "","url": "dump.getpostman.com/get","preRequestScript": "","pathVariables": {},"method": "GET","data": [],"dataMode": "params","version": 2,"tests": "tests[\"Has cookie in response\"] = responseBody.has(\"Cookie\");","currentHelper": "normal","helperAttributes": {},"time": 1434968017135,"name": "cookieRead","description": "","collectionId": "e8d0222e-83d1-d335-6309-3df9d23d1542","responses": [],"synced": false}]};
var mockJsonFileText = "[{\"value\":true, \"iteration\":0},{\"value\":true, \"iteration\":1}]";

var mockCollectionVarReplacement = {"id": "e9c97d99-0e0f-4700-85de-4cecba3c82f1","name": "Variable replacement working in URL and Form and Raw","description": "","order": ["1213015a-35a5-2b45-8468-6097ef4f8884","e1961638-1a20-ffdd-6625-484a67e69cb7","c85725bc-d5e6-d735-319e-c119dc644017"],"folders": [],"timestamp": 1445930422188,"owner": "25888","remoteLink": "https://www.getpostman.com/collections/334921ea15eba60fffdc","public": false,"requests": [{"id": "1213015a-35a5-2b45-8468-6097ef4f8884","headers": "","url": "localhost:5000/{{method}}","preRequestScript": "postman.setGlobalVariable(\"method\", \"post\");","pathVariables": {},"method": "POST","data": [{"key": "{{method}}","value": "{{method}}","type": "text","enabled": true},{"key": "hardkey","value": "{{method}}","type": "text","enabled": true}],"dataMode": "params","version": 2,"tests": "var data = JSON.parse(responseBody);\ntests[\"Key replaced\"] = (typeof data.form.post !== \"undefined\");\ntests[\"Value replaced\"] = data.form.hardkey === \"post\";\ntests[\"Form data key and val repaced\"] = data.form.post === \"post\";\n","currentHelper": "normal","helperAttributes": {},"time": 1445933064150,"name": "FORM","description": "","collectionId": "e9c97d99-0e0f-4700-85de-4cecba3c82f1","responses": []},{"id": "c85725bc-d5e6-d735-319e-c119dc644017","headers": "","url": "localhost:5000/{{method}}","preRequestScript": "postman.setGlobalVariable(\"method\", \"post\");","pathVariables": {},"method": "POST","data": [],"dataMode": "raw","version": 2,"tests": "var data = JSON.parse(responseBody);\ntests[\"raw data repaced\"] = data.data === \"post\";","currentHelper": "normal","helperAttributes": {},"time": 1445931387903,"name": "raw","description": "","collectionId": "e9c97d99-0e0f-4700-85de-4cecba3c82f1","responses": [],"rawModeData": "{{method}}"},{"id": "e1961638-1a20-ffdd-6625-484a67e69cb7","headers": "","url": "localhost:5000/{{method}}","preRequestScript": "postman.setGlobalVariable(\"method\", \"post\");","pathVariables": {},"method": "POST","data": [{"key": "{{method}}","value": "{{method}}","type": "text","enabled": true},{"key": "hardkey","value": "{{method}}","type": "text","enabled": true}],"dataMode": "urlencoded","version": 2,"tests": "var data = JSON.parse(responseBody);\ntests[\"Key replaced\"] = (typeof data.form.post !== \"undefined\");\ntests[\"Value replaced\"] = data.form.hardkey === \"post\";\ntests[\"Form data key and val repaced\"] = data.form.post === \"post\";","currentHelper": "normal","helperAttributes": {},"time": 1445932492638,"name": "urlencoded","description": "","collectionId": "e9c97d99-0e0f-4700-85de-4cecba3c82f1","responses": []}]};

var mockEnv = "{\"id\": \"13d91521-1fa4-7648-8ba4-f902b1469495\",\"name\": \"e1\",\"values\": [{\"key\": \"k2\",\"value\": \"v2\",\"type\": \"text\",\"name\": \"k2\",\"enabled\": true}],\"timestamp\": 1442871517860,\"synced\": false,\"syncedFilename\": \"\"}";


// TODO Simplify using JSMockito
function getSettingsMock() {
    var settings = {
        getSetting: function(key) {
            if (key === "variableDelimiter") {
                return "{{...}}";
            }
            else if (key === "selectedEnvironmentId") {
                return "1";
            }
        }
    };

    return settings;
}

// TODO Really need a better way to mock this
function getEnvironmentsMock() {
    var environments = {
        on: function(a1, a2, a3) {

        },

        get: function(key) {
            if (key === "1") {
                return {
                    toJSON: function() {
                        return {
                            values: [
                                {
                                    key: "env_foo",
                                    value: "env_bar"
                                }
                            ]
                        };
                    }
                };
            }
        }
    };

    return environments;
}

function getGlobalsMock() {
    var globals = {
        get: function(key) {
            if (key === "globals") {
                return [
                    {
                        key: "foo",
                        value: "bar"
                    },
                    {
                        key: "something",
                        value: "new"
                    }
                ];
            }
        }
    };

    return globals;
}
