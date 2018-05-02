const csvFilePath = 'stateMap.csv'
const csv = require('csvtojson')
const fs = require('fs')

let countyMap = JSON.parse(fs.readFileSync('js/countyFile.json', 'utf8'));
let stateMap = JSON.parse(fs.readFileSync('js/stateMap.json', 'utf8'));

let stateData = {};
stateData.data = [];

csv().fromFile('2016Predictions.csv').on('json',(jsonObj)=>{
  let countyData = {};
  countyData.code = 'us-' + stateMap[jsonObj.State].toLowerCase() + '-' + jsonObj.County.padStart(3,"0");
  countyData.name = countyMap[countyData.code];
  
  countyData.value = (parseInt(jsonObj.Prediction) === 0) ? (parseFloat(jsonObj.Probability) * -1) :
    ((parseFloat(jsonObj.Probability) * 1));
  if (countyData.value > 0.5) {
    countyData.party = 'R';
  } else {
    countyData.party = 'D';
  }

  countyData.tooltip = (parseFloat(jsonObj.Probability).toFixed(2) * 100) + '% chance of ' + countyData.party;
  stateData.data.push(countyData);
}).on('done',(error)=>{
  fs.writeFileSync('js/2016Predictions.json', JSON.stringify(stateData))
  console.log('end')
})
