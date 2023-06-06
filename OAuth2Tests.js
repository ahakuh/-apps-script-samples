var KEY = {
  "type": "service_account",
  "project_id": "calculations-reports",
  "private_key_id": "df85d020b75d5556ad1170303b30b4e7b4d1ea26",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDA1l59EMi1BtAQ\nZ9eauecvhF35xpUWd5sih6tPvUEI2tSVGOatR3Gr9MWqYhYDOMcfPiZRPz4Ig6D8\ncK35TQX4g8qfwHXGJmHGpDSbwrxrwPvE3pgiNX5xlZQhhB4Sw+J5ryvugT2Yzn5l\n2T6brIa1N9DItg65wrJi1eD56H3Yg2bJrHeMjfp6EpzFYd2j1qnDvpyvPxgPym3F\nl36ajEtiPTNBVku18pE4ksJAjnKu/fdC93M0AqwoToZUy9YaGGulQj42JmOwXJ8A\nCsGCtiJ2qyX80OEEx9L1MqmCQuWGzVOdayQylCpJaXdcoYfXeG5l1nzrYrWA9dJZ\nkM3euQEXAgMBAAECggEABLcZL2CyL67/dm87l+Z0zzYi4CEpcxewnOsJVtVPWkqT\niSPHPDRzhJtjG/PzCtggElUANdtghm/Fh3av4lkuTLHYSgi4OISmvmc0fByKY+4f\nmeRBfxCky103doxW+el9R7FvVxEk8vAVqiLiQ4c38gVv3wCIoqUunHkTW7kCHsGo\n15fHXsBxyUKyzS0K8jq25Yj4Py6ywqGqBb63WXlpARF8dNjyeZddgBZvS3bQ50Go\nj85TsswvsvYY2A0OPxgES+GFOEZZJFsAr9n01eiQOdbFM8GTwdOqw8IEGPig0cCs\nQCuCi2uGnNC7LyzOvQGkqaJ71kPPvmmm8zRagt02rQKBgQD6fNBZReuXtkUGsJuQ\nrhlO+s8f5uzB45sDVMTF74mhuSrgCF4H1J0HZMwO7JxGhh/k+whAien4wBMpME4t\nRxSimY+j3DyH1AU73iw11O70TMUlFxExeN20ONj98WguWpXSf4u0EDByFvz7coVl\nxfsBkB3i8G+YFS9VHDfPQJTu/QKBgQDFFMSkD96bC0s4U+ahbKXuWrqlGF2HPj/D\n/s2YIN1dTZ20Ds+jFdZxO7REoxWog4QUw0eKBytkYxKUJySNFW3MGOgF+dASiuzo\nJdcWXR7ILbupv9fiwwpgAXoz1cAmiawKr9fQy2TpldA/izgu4Mj1xsLUfTPP/HIp\ntoy4Ig8OowKBgQDQtlUoPZFbXR1QwLEusVIXM/aHf3PA7nRIJ0a6IqhMX6xw9afb\n4HVjJsK8oLxqKvHCasTqeb/Ba9HLXRuWsIZqIYfFIgoxpyEhTDMMO7tLRfhyujCy\nRyJ8O23a0l5bWVFDDtGKHH8xYSQ0I60xKvDF0Z6FbI+fae+BfDyobQhrxQKBgDer\n+zRhKz/e+9uoj8DP4Tuos4rJjDoVEow6ITe1KPMfZsojWPI3zADmnbC55PdaV2hK\nFZ5fEhnkhq4FNKUKBZ8e9gQiIm3qgqu9bLnrijN//8Ae6kwrTnX6VNvpqML6JvhJ\n3gwkOJhncpFQsYlEhGAxSn4d9BHvvQwdfjjRnjFDAoGAQexaElsc2aPeqZfAaSSU\nOHqZ9svZ/xbiBxJrvqzgzci1TsMzkVxqqf+YFjR8hKQvVwNXX1ruh/yDcGXuceOl\nMsnzqH/iNAC1n8wYcIAHRi5fpfDWU6m9V2CuZTyMSAHfygKhMF7KnNMcYwV2DcPw\nVuWLAQDN0s395QUViEKQbEc=\n-----END PRIVATE KEY-----\n",
  "client_email": "googledriveaccessservice@calculations-reports.iam.gserviceaccount.com",
  "client_id": "116346405986798398386",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/googledriveaccessservice%40calculations-reports.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
/**
 * Authorizes and makes a request to the Google Drive API.
 */
function run() {
  var service = getService();
  if (service.hasAccess()) {
    var token =service.getAccessToken()
    Logger.log(service)
    console.log('access ok')
    var authorizationUrl = ScriptApp.getService().getUrl()
    var template = HtmlService.createTemplate(
        '<a href="<?= authorizationUrl ?>" target="_blank">Authorize</a>. ' +
        'Reopen the sidebar when the authorization is complete.');
    template.authorizationUrl = authorizationUrl    
    var page = template.evaluate();
    
    Logger.log(template.getCodeWithComments())

    debugger
  } else {
    Logger.log(service.getLastError());
  }
}

/**
 * Reset the authorization state, so that it can be re-tested.
 */
function reset() {
  getService().reset();
}

/**
 * Configures the service.
 */
function getService() {
  return OAuth2.createService('Sheets:SA')
      // Set the endpoint URL.
      .setTokenUrl('https://oauth2.googleapis.com/token')

      // Set the private key and issuer.
      .setPrivateKey(KEY.private_key)
      .setIssuer(KEY.client_email)

      // Set the name of the user to impersonate. This will only work for
      // Google Apps for Work/EDU accounts whose admin has setup domain-wide
      // delegation:
      // https://developers.google.com/identity/protocols/OAuth2ServiceAccount#delegatingauthority
      .setSubject(KEY.client_email)

      // Set the property store where authorized tokens should be persisted.
      .setPropertyStore(PropertiesService.getScriptProperties())

      // Set the scope. This must match one of the scopes configured during the
      // setup of domain-wide delegation.
      .setScope('https://www.googleapis.com/auth/spreadsheets');
}

/**
 * Use the Search Console API to list the URLs of all the sites you have setup.
 * @see {@link https://developers.google.com/webmaster-tools/}
 */
function listSearchConsoleSites() {
  const driveservice = getDriveService_()
  Object.keys(driveservice).forEach(key => console.log('key:',key,'result:',driveservice[key]))
  debugger
  var url = 'https://www.googleapis.com/webmasters/v3/sites';
  var token = ScriptApp.getOAuthToken();
  var response = UrlFetchApp.fetch(url, {
    headers: {
      Authorization: 'Bearer ' + token
    },
  });
  var result = JSON.parse(response.getContentText());
  result.siteEntry.forEach(function(siteEntry) {
    Logger.log(siteEntry.siteUrl);
  });
}

function getDriveService_() {
  // Create a new service with the given name. The name will be used when
  // persisting the authorized token, so ensure it is unique within the
  // scope of the property store.
  return OAuth2.createService('drive')

      // Set the endpoint URLs, which are the same for all Google services.
      .setAuthorizationBaseUrl('https://accounts.google.com/o/oauth2/auth')
      .setTokenUrl('https://accounts.google.com/o/oauth2/token')

      // Set the client ID and secret, from the Google Developers Console.
      // Web Client for Desktop App OAuth 2.0
      .setClientId('714436816912-orqd594v430pf49pfil55tkbreu58c7t.apps.googleusercontent.com')
      .setClientSecret('UcHFTsME-qk_PrcXQSjpDhjF')

      // Set the name of the callback function in the script referenced
      // above that should be invoked to complete the OAuth flow.
      .setCallbackFunction('authCallback')

      // Set the property store where authorized tokens should be persisted.
      .setPropertyStore(PropertiesService.getUserProperties())

      // Set the scopes to request (space-separated for Google services).
      .setScope('https://www.googleapis.com/auth/drive')

      // Below are Google-specific OAuth2 parameters.

      // Sets the login hint, which will prevent the account chooser screen
      // from being shown to users logged in with multiple accounts.
      .setParam('login_hint', Session.getEffectiveUser().getEmail())

      // Requests offline access.
      .setParam('access_type', 'offline')

      // Consent prompt is required to ensure a refresh token is always
      // returned when requesting offline access.
      .setParam('prompt', 'consent');
}

const props = () => {
  const service = getDriveService_()
  const names = OAuth2.getServiceNames(PropertiesService.getScriptProperties())
  Logger.log(service)
  debugger
}