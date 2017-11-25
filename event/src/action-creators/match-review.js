const request = require('superagent');
const url = 'https://032e7e8d.ngrok.io';

export const matchReview = (asin, callback) => request
  .get(url+'/api/amazon')
  .query({"asin":asin})
  .set("Content-type","application/x-www-form-urlencoded")
  .redirects(0)
  .end(function(err, res){
    if (err || !res.ok) {
      console.log('Oh no! error');
    } else {
      // console.log('yay got ' + JSON.stringify(res.body));
      callback(res.body);
    }
  });

export const matchHighlight = (reviewid, callback) => request
  .get(url+'/api/review')
  .query({"review":reviewid})
  .set("Content-type","application/x-www-form-urlencoded")
  .redirects(0)
  .end(function(err, res){
    if (err || !res.ok) {
      console.log('Oh no! error');
    } else {
      // console.log('yay got ' + JSON.stringify(res.body));
      callback(res.body);
    }
  });
