var express = require('express');
var router = express.Router();
var ExcelReader = require('../component/excel-reader.js');
const e = require('express');

/* GET home page. */
router.get('/api/v1/auto-complete/:searchString', async function(req, res, next) {
  const searchString = req.params.searchString;
  if(/[a-zA-Z]/.test(searchString) && /[0-9]/.test(searchString)) {
    return res.send({error_code: "001", error_message: "Alphanumeric characters are not allowed"});
  }
  if(searchString.length > 20) {
    return res.send({error_code: "002", error_message: "Search string must be less than 35 characters"});
  }
  if(!/^[a-zA-Z]/.test(searchString)) {
    return res.send({error_code: "003", error_message: "Search string must start with an alphabet"});
  }
  if(searchString.length < 3) {
    return res.send({error_code: "004", error_message: "Search string must be at least 3 characters"});
  }
  const excelReader = new ExcelReader();
  const result = await excelReader.read(searchString);
  res.send(result);
});

module.exports = router;
