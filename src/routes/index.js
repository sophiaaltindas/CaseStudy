var express = require('express');
var router = express.Router();
var ExcelReader = require('../component/excel-reader.js')

/* GET home page. */
router.get('/api/v1/auto-complete/:searchString', async function(req, res, next) {
  const searchString = req.params.searchString;
  if(!searchString || searchString.length < 3 || !/^[a-zA-Z]+$/.test(searchString)) {
    return res.send('Please enter a valid search string with at least 3 alphabetical characters');
  }
  const excelReader = new ExcelReader();
  const result = await excelReader.read(searchString);
  res.send(result);
});

module.exports = router;
