// Constants
var POSTMAN_API_URL_PRODUCTION = "https://app.getpostman.com/api";
var POSTMAN_API_URL_STAGING = "https://app.getpostman.com/api";
var POSTMAN_API_URL_DEV = "http://dev.getpostman.com";
var POSTMAN_API_URL_LOCAL = "http://dev.getpostman.com";
var POSTMAN_API_URL_SYNC_STAGE = "https://beta.getpostman.com";
var POSTMAN_API_URL_SYNC_DEV = "https://sync-dev.getpostman.com";

var POSTMAN_WEB_URL_PRODUCTION = "https://app.getpostman.com";
var POSTMAN_WEB_URL_STAGING = "https://app.getpostman.com";
var POSTMAN_WEB_URL_DEV = "http://dev.getpostman.com";
var POSTMAN_WEB_URL_LOCAL = "http://dev.getpostman.com";
var POSTMAN_WEB_URL_SYNC_STAGE = "https://beta.getpostman.com";
var POSTMAN_WEB_URL_SYNC_DEV = "https://beta.getpostman.com";
//var POSTMAN_WEB_URL_SYNC_DEV = "https://sync-staging.getpostman.com";

var POSTMAN_INTERCEPTOR_ID_PRODUCTION = "aicmkgpgakddgnaphhhpliifpcfhicfo";
var POSTMAN_INTERCEPTOR_ID_STAGING = "aicmkgpgakddgnaphhhpliifpcfhicfo";
var POSTMAN_INTERCEPTOR_ID_DEV = "aicmkgpgakddgnaphhhpliifpcfhicfo";
var POSTMAN_INTERCEPTOR_ID_LOCAL = "aicmkgpgakddgnaphhhpliifpcfhicfo";
var POSTMAN_INTERCEPTOR_ID_SYNC_STAGE = "aicmkgpgakddgnaphhhpliifpcfhicfo";
var POSTMAN_INTERCEPTOR_ID_SYNC_DEV = "aicmkgpgakddgnaphhhpliifpcfhicfo";

var POSTMAN_INDEXED_DB_PRODUCTION = "postman";
var POSTMAN_INDEXED_DB_TESTING = "postman_test";

var POSTMAN_SYNCSERVER_LOCAL = "http://localhost:1337";
var POSTMAN_SYNCSERVER_STAGING = "https://sync-xi.getpostman.com";
var POSTMAN_SYNCSERVER_DEV = "http://sync.getpostman.com";//"http://104.200.18.102:1337";
var POSTMAN_SYNCSERVER_PRODUCTION = "https://sync-xi.getpostman.com";
var POSTMAN_SYNCSERVER_SYNC_STAGE = "https://sync-stage-xi.getpostman.com";
var POSTMAN_SYNCSERVER_SYNC_DEV = "http://postman-sync-dev-c.elasticbeanstalk.com";

var POSTMAN_OAUTH2_CALLBACK_URL_PRODUCTION = "https://www.getpostman.com/oauth2/callback";
var POSTMAN_OAUTH2_CALLBACK_URL_SYNC_STAGE = "https://www.getpostman.com/oauth2/callback";
var POSTMAN_OAUTH2_CALLBACK_URL_STAGING = "https://www.getpostman.com/oauth2/callback";
var POSTMAN_OAUTH2_CALLBACK_URL_DEV = "http://dev.getpostman.com";
var POSTMAN_OAUTH2_CALLBACK_URL_SYNC_DEV = "http://sync-staging.getpostman.com/oauth2/callback";
var POSTMAN_OAUTH2_CALLBACK_URL_SYNC_STAGE = "http://sync-staging.getpostman.com/oauth2/callback";

var POSTMAN_ELECTRON_ID_PRODUCTION = "erisedstraehruoytubecafruoytonwohsi";

var GA_TRACKING_PROD = 'UA-43979731-6';
var GA_TRACKING_SYNC_STAGE = 'UA-43979731-8';
var GA_TRACKING_MAC_PROD = 'UA-43979731-10';

var CHROME_PROD_SENTRY_DSN = 'https://dcc9c5bd36884b938f995aaa9eedce03@app.getsentry.com/53934';
var MAC_PROD_SENTRY_DSN = 'https://cc1ad15015a84c10bc6196bfb73f7897@app.getsentry.com/61673';
var ENABLE_CRASH_REPORTING = true;

// Config variables
var postman_flag_is_testing = false;
var postman_web_url = POSTMAN_WEB_URL_PRODUCTION;
var postman_api_url = POSTMAN_API_URL_PRODUCTION;
var postman_all_purchases_available = true; //Jetpacks is now free :(
var postman_interceptor_id = POSTMAN_INTERCEPTOR_ID_PRODUCTION;
var postman_syncserver_url = POSTMAN_SYNCSERVER_PRODUCTION;
var postman_oauth2_callback_url = POSTMAN_OAUTH2_CALLBACK_URL_PRODUCTION;
var postman_ga_tracking_id = GA_TRACKING_PROD;

var postman_sync_api_version = "v2"; //for sails 11

var postman_env = "production";

var postman_webkit = undefined;
var postman_macgap = false;
var postman_brackets = false;
var postman_electron = false;

var postman_electron_appid = POSTMAN_ELECTRON_ID_PRODUCTION;

var postman_trial_duration = 2592000000; // 30 days
// var postman_trial_duration = 1000 * 60 * 60 * 2;

var postman_database_name;

var postman_sync_rawtext_limit = 100000;

//array of collection IDs that come as Postman Demo Collections
var postman_predef_collections = ["f695cab7-6878-eb55-7943-ad88e1ccfd65"];
var demo_collection_url = 'https://www.getpostman.com/collections/6b2c5b3a9ca6245297c5';

if (postman_flag_is_testing) {
	postman_database_name = POSTMAN_INDEXED_DB_TESTING;
}
else {
	postman_database_name = POSTMAN_INDEXED_DB_PRODUCTION;
}