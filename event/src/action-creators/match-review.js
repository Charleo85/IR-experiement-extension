const request = require('superagent');
import {url} from '../constant.js';

// import {matchedReviews} from './fakeResponse.js'
// export const matchReview = (asin, callback) => {
//   callback(matchedReviews);
// }

export const matchReview = (query, callback, retry=3) => request
  .get(url+'/api/amazon')
  .query(query)
  .set("Content-type","application/x-www-form-urlencoded")
  .redirects(0)
  .end(function(err, res){
    // console.log(res)
    if (err || !res.ok) {
      console.log('Oh no! error ', err);
    } else {
      if (callback){
        if (res.status && res.status == 403){
          if (retry == 0) return;
          matchReview(query, callback, retry-1)
        }
        callback(res.body);
      }
    }
  });
