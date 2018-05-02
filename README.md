# Elections 2016
Project with analysis and prediction for 2016 Elections

#### Pre-requisites
To generate the JSON files that will be used by the highcharts library we are going to use
**node.js** to convert the CSV files into the JSON files. There are two main files that are
going to be required for the conversion. 

* The first file is **prepareOutput.js** which will convert a file named 2016Results.csv into
2016Results.json. The CSV file is expected to have the following columns:
> * Year
> * State FIPS
> * County FIPS
> * State (DO NOT CHANGE THIS COLUMN NAME)
> * County (DO NOT CHANGE THIS COLUMN NAME)
> * Actual (DO NOT CHANGE THIS COLUMN NAME)

* The second file is **preparePredictions.js** which will convert a file name 2016Predictions.csv
into 2016Predictions.json. The CSV file is expected to have the following columns:
> * Year
> * CountyState
> * State (DO NOT CHANGE THIS COLUMN NAME)
> * County (DO NOT CHANGE THIS COLUMN NAME)
> * Actual
> * Prediction (DO NOT CHANGE THIS COLUMN NAME)
> * Probability (DO NOT CHANGE THIS COLUMN NAME)

To execute the two files, do the following (this assumes you have node installed)
```bash
  npm install // This will install all the packages required
  node prepareOutput.js
  node preparePredictions.js
```