var http = require("request");
var cheerio = require("cheerio");
var fs=require('fs');


var url1 = 'http://cisce2017rprod090.azurewebsites.net/Results/Result/ShowResult?courseCode=ICSE&uniqueId=';
var uniqueId = 0; //6599699;
var url2 = '&captcha=QKBPU&code=at0CccvjUbWHWKB33MF3qQ%3D%3D';

for (let i = 6577000; i < 6577999; i++) {
  http(url1 + i + url2,
    function(err, res, body) {
      result = body.toString();
      const $ = cheerio.load(result);
      let parsedData = $("#resultpanal tr").text().replace(/\s+/g, ' ');
      if (parsedData.length > 5) {
        fs.appendFileSync('data.txt',parsedData+'\n');
        //console.log(parsedData);
      }
    });
}