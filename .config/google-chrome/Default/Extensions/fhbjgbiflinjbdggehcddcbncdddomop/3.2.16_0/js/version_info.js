var postman_version = "0";
if(postman_electron) {
    var remoteApp = require('remote').require('app');
    postman_version = remoteApp.getVersion();
}
else {
    postman_version =  chrome.runtime.getManifest().version;
}