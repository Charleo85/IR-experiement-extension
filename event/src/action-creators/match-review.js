const request = require('superagent');
const url = 'https://56b65b24.ngrok.io';

export const matchReview = (asin, callback) => request
  .get(url+'/api/amazon')
  .query({"asin":asin})
   .set('Access-Control-Allow-Origin', '*')
   .set('Access-Control-Allow-Headers', '*')
   .set('Access-Control-Allow-Methods', '*')
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
