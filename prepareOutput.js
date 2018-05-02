const csv = require('csvtojson')
const fs = require('fs')

let countyMap = JSON.parse(fs.readFileSync('js/countyFile.json', 'utf8'));
let stateMap = JSON.parse(fs.readFileSync('js/stateMap.json', 'utf8'));

let stateData = {};
stateData.data = [];

csv().fromFile('2016Results.csv').on('json',(jsonObj)=>{
  let countyData = {};
  countyData.code = 'us-' + stateMap[jsonObj.State].toLowerCase() + '-' + jsonObj.County.padStart(3,"0");
  countyData.name = countyMap[countyData.code];
  countyData.value = parseInt(jsonObj.Actual);
  if (countyData.value === 1) {
    countyData.party = 'R';
  } else {
    countyData.party = 'D';
  }
  stateData.data.push(countyData);
}).on('done',(error)=>{
  fs.writeFileSync('js/2016Results.json', JSON.stringify(stateData))
  console.log('end')
})
