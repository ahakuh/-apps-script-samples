/**
 * this should contain a list of all the functions authorized
 * to be run from the client 
 * for V8, it's important that it's a namespace ief to ensure its parsed in the correct order
 * and is available throughout the project on initialization
 */
const WhitelistedActions = (()=> {
 const ks = new Map()

 // whitelist everything that can be run
 ks.set('cUsefull', (...args)=>{
  const keys = cUseful
  debugger
  Object.entries(keys).forEach((key) => {
    console.log(`${JSON.stringify([key[0]])}=${JSON.stringify(cUseful[key[0]])}`)
    })
  });
 ks.set('Sheets', () => getSheets());
 ks.set('getSheets', (...args)=>app.getSheets(...args));
 ks.set('getScriptProperties', (...args)=>app.getScriptProperties(...args));
 ks.set('getDisplayValues', (...args)=>app.getDisplayValues(...args));
 ks.set('MycUseful', (name,...args)=>MycUsefull[name.toString()](...args));
 ks.set('c-Utils',(name,...args)=> {
    var cuseful = cUseful.Utils
    // var str = ''
    // debugger
    // Object.entries(cuseful).forEach(key => {
    //   console.log(key[0] + ' = ' + cuseful[key[0]])
    //   // str += key[0].toString() + ' = ' + cuseful[key[0]] + '\n\n'
    //   })
    // console.log(cuseful)
    return cUseful.Utils[name.toString()](...args)
  });
 
 return ks
})();


/**
 * run something from the whitelist
 * will generall be invoked by google.script.run
 * @param {string} name the key of the action to run in the whilelistedActions store
 * @param {...*} args any arguments for the action
 * @return {*} the result
 */
const runWhitelist = (name, ...args) => {
  //log what we are running
  const split = args.map(a => a)
  // console.log(`${args}:${split}`)
  console.log("runWhitelist(",name,")",typeof split === 'object' ? split : JSON.stringify(split))
  // get what to run from the store
  const action = WhitelistedActions.get(name)
  if(!action) {
    throw new Error(`${name} is not in the list of actions that can be run from the client`)
  }
  // console.log("result: %s",action(...args))
  return action(...args)
}

function localTestRunWhitelists(){
  const result = runWhitelist('Sheets')
  const values = app.getDisplayValues({
    "spreadsheetId":"1qBQAxu3OaTip0OXucIFBdiKKG1l28l23BPKaqy0rNKI",
    "sheetName":"AllData"
  })
  // const addq = runWhitelist('c-Utils','addQueryToPath',{query:"my test query",username: "milen",userFiles: ["file1","file2","file3"]},'/my test path/')
  const addq = runWhitelist('MycUseful','Utils','addQueryToPath',{query:"my test query",username: "milen",userFiles: ["file1","file2","file3"]},'/my test path/')
  debugger
  Logger.log(result,"\n",values,"\n",addq)
  // const testOb = [
  //   {
  //     "name": "milen"
  //   },
  //   { 
  //     "name": "Javor"
  //   }
  // ]

  // var testarr = ['1','2']
  // var str = false
  // const isob = cUseful.whatAmI(str)
  // console.log(isob)
  // debugger

  // const c_usefull_keys = runWhitelist("c-Utils","gaDate",new Date())
  // Logger.log(c_usefull_keys)
  // debugger
  // const c_usefull_keys = runWhitelist("cUsefull",{})
  // Logger.log(c_usefull_keys)
  // const c = Object.keys(new cUseful.Tester).map((key) => {
  //   console.log(cUseful.Tester[key.toString()])
  //   return {key: key}
  // })
  debugger
  // Logger.log(values)
}