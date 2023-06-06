// #### Server - client connectors. ####
 
/**
 * An object of picker configurations.
 * Called when picker is initialised. 
 * 
 * @return {ojbect} configurations for auth
 */
function pickerConfig(){
  // DriveApp.getRootFolder() // Try this
  return {
    oauthToken: ScriptApp.getOAuthToken(),
    // Add developer key from Google Cloud Project > APIs and services > Credentials
    developerKey: "AIzaSyAbQydqE2BiBPqaQRLTojXgB5Nc5z90VSk"
  }
};