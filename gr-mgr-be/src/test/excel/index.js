const xlsx = require('node-xlsx');

const workSheetsFromFile  = xlsx.parse(`${__dirname}/test.xlsx`);

console.log(workSheetsFromFile[0].data);