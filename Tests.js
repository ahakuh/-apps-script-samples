function Tests() {
  var _app = new App()

  const createToken = () => {
    var mytoken = _app.createToken("ahakuh")
    return mytoken
  }
  const scriptProperties = () => {
    return _app.getScriptProperties()
  }

  const getSheets = (spreadsheetId) => {
    return _app.getSheets(spreadsheetId)
  }
  // debugger
  return {
    createToken,
    scriptProperties,
    getSheets
  }
}

const tests = (params={}) => {
    const data = {
        createtoken: Tests().createToken(),
        scriptProperties: Tests().scriptProperties(),
        getSheets: Tests().getSheets('1qBQAxu3OaTip0OXucIFBdiKKG1l28l23BPKaqy0rNKI')
      }
      debugger
      Object.keys(data).forEach(k => {
        console.log(`typeof: data[${k}] ${typeof data[k]}`,data[k])
        // typeof data[k] === 'object' ? Logger.log(data[k]) : console.log(JSON.parse(data[k]))
        }
      )
      return JSON.stringify(data)
    // }

    // const getuserbyemail = () => {
    //   const data = app.getUserByEmail('milen.nikolov@ensicontrol.eu')
    //   console.log(data)
    //   debugger
    //   return JSON.stringify(data)
}

const getSprops = () => {
  const {properties,keys} = app.getScriptProperties()
  debugger
  return JSON.stringify({properties,keys})
}

