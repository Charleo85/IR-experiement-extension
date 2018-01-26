const request = require('superagent');
import {url} from '../constant.js';

// import {matchedReviews} from './fakeResponse.js'
// export const matchReview = (asin, callback) => {
//   callback(matchedReviews);
// }

export const matchReview = (asin, callback) => request
  .get(url+'/api/amazon')
  .query({"asin":asin})
  .set("Content-type","application/x-www-form-urlencoded")
  .redirects(0)
  .end(function(err, res){
    if (err || !res.ok) {
      console.log('Oh no! error');
    } else {
      if (callback){
        callback(res.body);
      }
    }
  });

// export const matchHighlight = (reviewid, callback) => request
//   .get(url+'/api/review')
//   .query({"review":reviewid})
//   .set("Content-type","application/x-www-form-urlencoded")
//   .redirects(0)
//   .end(function(err, res){
//     if (err || !res.ok) {
//       console.log('Oh no! error');
//     } else {
//       // console.log('yay got ' + JSON.stringify(res.body));
//       callback(res.body);
//     }
//   });
