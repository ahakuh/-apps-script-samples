const CONFIG = {
  INDEX: "index.html",
  NAME: "LC011 PART C",
  DB_ID: "1qBQAxu3OaTip0OXucIFBdiKKG1l28l23BPKaqy0rNKI",
  SHEET_NAME: {
    USERS: "Users"
  },
  CACHE_EXPIRED_IN_SECONDS: 21600, // 6 hours
}

class App {
  constructor() {
    this.db = SpreadsheetApp.openById(CONFIG.DB_ID)
    this.cache = CacheService.getScriptCache()
  }

  getCache(){
    return this.cache
  }

  getScriptProperties(){
    const _Properties = PropertiesService.getScriptProperties()
    const properties = _Properties.getProperties()
    const keys = _Properties.getKeys()
    return {
      keys,
      properties
    }
  }

  setScriptProperties(setProps){
    const _Properties = PropertiesService.getScriptProperties()
    // typeof properties === 'object' ? JSON.parse(properties) : properties
    const properties = _Properties.getProperties()
    const keys = _Properties.getKeys()
     
    // console.log(Object.keys(setProps))

    const indexes = Object.keys(setProps).map(key => {
     return _Properties.getKeys().indexOf(key) !== -1
    })
    debugger
    return {
      keys,
      properties
    }
  }

  createToken(user) {
    const token = Utilities.getUuid()
    this.cache.put(token, user.userEmail, CONFIG.CACHE_EXPIRED_IN_SECONDS)
    return token
  }

  createItemObject(keys, values) {
    const item = {}
    keys.forEach((key, index) => item[key] = values[index])
    return item
  }

  getDisplayValues({spreadsheetId,sheetName}){
    const ws = SpreadsheetApp.openById(spreadsheetId)
    if (!ws) throw new Error(`Unable to open spreadsheet with id: ${spreadsheetId}`)
    
    // const apiws = Sheets.Spreadsheets.Values.get(params.spreadsheetId,'AllData!A1:C').values
    var data = ws.getSheetByName(sheetName).getDataRange().getDisplayValues()
    const [headers,...rows] = data
    return data ? rows.map(row => this.createItemObject(headers,row)) : "Error "
  }

  validateToken(token) {
    const email = this.cache.get(token)
    if (!email) return false
    this.cache.put(token, email, CONFIG.CACHE_EXPIRED_IN_SECONDS)
    return email
  }

  getSheets(spreadsheetId){
    const wb = SpreadsheetApp.openById(spreadsheetId ? spreadsheetId : CONFIG.DB_ID)

    if(!wb) throw new Error(`Faled to get sheets for file with ID: ${spreadsheetId}`)

    return wb.getSheets().map(s => s.getName())
  }

  getUserByEmail(email) {
    email = email.trim().toLowerCase()
    const ws = this.db.getSheetByName(CONFIG.SHEET_NAME.USERS)
    if (!ws) throw new Error(`${CONFIG.SHEET_NAME.USERS} was not found in the database.`)
    const [keys, ...records] = ws.getDataRange().getDisplayValues()
    // console.log(keys,records)
    const indexOfEmail = keys.indexOf("userEmail")
    if (indexOfEmail === -1) throw new Error(`Header 'userEmail' was not found in the table.`)
    const record = records.find(v => v[indexOfEmail].toString().trim().toLocaleLowerCase() == email)
    if (!record) return
    const data = this.createItemObject(keys, record)
    // delete data.password
    return data
  }

  login({ email, password, token }) {
    console.log("login(%s,%s,%s)",email,password,token)
    if (token) {
      const isValidToken = this.validateToken(token)
      if (!isValidToken) throw new Error(`The token is invalid, please login again.`)
      return {
        user: this.getUserByEmail(isValidToken),
        token
      }
    }

    const user = this.getUserByEmail(email)
    if (!user) throw new Error(`${email} is not valid.`)
    if (password !== user.password) throw new Error(`Invalid Credentials!`)
    token = this.createToken(user)
    user.token = token
    return {
      user,
      token
    }
  }

  logout({ token }) {
    this.cache.remove(token)
    return {
      success: true,
      message: "You've been logged out!"
    }
  }
}

const app = new App()

const validate = (token) => {
  Logger.log(app.cache.get(token))
  Logger.log(app.createToken('milen.nikolov@ensicontrol.eu'))
  Logger.log(app.cache.getAll([token]))
  debugger
}

const login = (params) => {
  params = JSON.parse(params)
  const data = app.login(params)
  debugger
  delete data.user.password
  return JSON.stringify(data)
}

const logout = (params) => {
  params = JSON.parse(params)
  const data = app.logout(params)
  return JSON.stringify(data)
}

const getSheets = (params="1qBQAxu3OaTip0OXucIFBdiKKG1l28l23BPKaqy0rNKI") => {
  // Logger.log('params: ',params)
  // console.log('typeof params: ', typeof params,'\n',`typeof ${(JSON.parse(params) || CONFIG.DB_ID)}`,JSON.parse(params))
  // Logger.log(app.getSheets(CONFIG.DB_ID))
  var sheets = app.getSheets(params)
  var values = app.getDisplayValues({spreadsheetId: params,sheetName: "Frequency"})
  debugger
  return sheets ? sheets : { message: "No data to return" }
  
  // return JSON.stringify(app.getSheets(spreadsheetId))
}
/**
 * 
 */
  // const setScriptProperties = () => {
  //   const options = {
  //     id: '1',
  //     value: '11',
  //     spreadsheetId: [
  //       "one","two"
  //     ],
  //     ids: [
  //       {id: 1,name: '1'},
  //       {id: 2,name: '2'},
  //     ]
  //   }
  //   Logger.log(app.setScriptProperties(options))
  // }

const getCache = () => {
  const c = app.getCache()
  Logger.log(c.get(['token']))
  debugger
}


function doGet(e) {
  return HtmlService.createTemplateFromFile(CONFIG.INDEX)
    .evaluate()
    .setTitle(CONFIG.NAME)
    .addMetaTag('viewport','width=device-width,initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
}


function include_(filename) {
  return HtmlService.createTemplateFromFile(filename).evaluate().getContent()
}

/** given a range and a property name, fill it with a value
  * @param {Range} range the range
  * @param {string} propertyName the property name
  * @param {*|function} fillValue the value to fill with, or function to create a value
  * @param {Range} [headerRange=] an optional range for the headers, default is first data row
  * @return {range} for chaining
  */
function rangeFill (range , propertyName, fillValue, headerRange) {
  
  // camel case up property name
  var name = propertyName.slice(0,1).toUpperCase() + propertyName.slice(1);
  if (typeof range['get'+name] !== typeof range['set'+name] || 
      typeof range['set'+name] !== 'function') {
    throw new Error (name + ' should be a property of a range with a getter and setter');
  }
                     
  // we'll always need the values to pass to a function, and also get the current properties
  var values = range.getValues();
  
  // set up default headers
  columnNames = headerRange ? headerRange.getValues()[0] : values[0]; 
  if (columnNames.length != values[0].length) {
    throw new Error ('headers are length ' + columnNames.length + 
      ' but should be ' + values[0].length);
  }
  // these are the properties that will be set                 
  var properties =  name === 'Values' ? values : range['get'+name]();
  
  // iterate
  return range['set'+name](
    values.map(function(row,rowIndex) {
      return row.map(function(cell,colIndex) {
        return typeof fillValue === 'function' ? 
          fillValue ({
            value:cell,
            propertyValue:properties[rowIndex][colIndex],
            columnIndex:colIndex, 
            rowValues:row,
            rowIndex:rowIndex,
            propertyValues:properties,
            values:values,
            range:range,
            propertyName:propertyName,
            columnNames:columnNames,
            columnName:columnNames[colIndex],
            is:function(n) { return columnNames[colIndex] === n; }
          }) : fillValue;
      });
    })
  );
}

function readDataFromSheets() {
  var ss = SpreadsheetApp.openById(CONFIG.DB_ID)
  var sheets = ss.getSheetByName(CONFIG.SHEET_NAME.USERS) 
  var dataRange = sheets.getDataRange()
  var data = dataRange.getDisplayValues();
  var [headers,...rows] = data
  const obj = rows.map(row => app.createItemObject(headers,row))
  headers = headers.map((h) => ({text: h,value:h}))
  debugger
  return JSON.stringify({headers:headers,rows:obj});

}

function writeDataToSheets(data) {
  var ss = SpreadsheetApp.openById(CONFIG.DB_ID);
  var sheet = ss.getSheetByName(CONFIG.SHEET_NAME.USERS);
  var numRows = data.length;
  var numCols = data[0].length;
  var range = sheet.getRange(1, 1, numRows, numCols);
  range.setValues(data);
}

const lOgin = (params = {email: "Milen.nikolov@ensicontrol.eu",password:"milen"}) => {
  // params = JSON.parse(params)

  const data = app.login(params)
  Logger.log(data)
  delete data.user.password
  debugger
  return JSON.stringify(data)
}

const getDisplayValues = () => {
  const content = include_("index")
  Logger.log(content)
  debugger
  const content2 = Include.html('index')
  Logger.log(content2)
  debugger
}

