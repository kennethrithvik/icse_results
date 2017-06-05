var http = require("request");
var cheerio = require("cheerio");
var fs = require('fs');


var url1 = 'http://cisce2017rprod090.azurewebsites.net/Results/Result/ShowResult?courseCode=ICSE&uniqueId=';
var uniqueId = 0; //6599699;
var url2 = '&captcha=QKBPU&code=at0CccvjUbWHWKB33MF3qQ%3D%3D';

let rangeResult = function(startRange, endRange = startRange + 999) {
  for (let i = startRange; i <= endRange; i++) {
    http(url1 + i + url2,
      function(err, res, body) {
        result = body.toString();
        const $ = cheerio.load(result);
        let parsedData = $("#resultpanal tr").text().replace(/\s+/g, ' ');
        if (parsedData.length > 5) {
          fs.appendFileSync('data.txt', parsedData + '\n');
        //console.log(parsedData);
        }
      });
  }
}

//rangeResult(6576000);
let i = 6570000;
let interval = setInterval(function() {
  rangeResult(i);
  i = i + 1000;
  if (i > 6580000) {
    clearInterval(interval);
  }
}, 2000);
