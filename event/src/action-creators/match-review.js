const request = require('superagent');
import {url} from '../constant.js';

// import {matchedReviews} from './fakeResponse.js'
// export const matchReview = (asin, callback) => {
//   callback(matchedReviews);
// }

export const matchReview = (query, callback) => request
  .get(url+'/api/amazon')
  .query(query)
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
