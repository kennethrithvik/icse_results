var http = require("http-request");
var cheerio = require("cheerio");
var fs=require('fs');


var url1 = 'cisce2017rprod090.azurewebsites.net/Results/Result/ShowResult?courseCode=ICSE&uniqueId=';
var uniqueId = 0; //6599699;
var url2 = '&captcha=QKBPU&code=at0CccvjUbWHWKB33MF3qQ%3D%3D';

for (let i = 6599900; i < 6599999; i++) {
  http.get(url1 + i + url2,
    function(err, res) {
      result = res.buffer.toString();
      const $ = cheerio.load(result);
      let parsedData = $("#resultpanal tr").text().replace(/\s+/g, ' ');
      if (parsedData.length > 5) {
        fs.appendFileSync('data.txt',parsedData+'\n');
        //console.log(parsedData);
      }
    });
}