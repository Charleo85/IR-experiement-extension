const request = require('superagent');
import {url, servers} from '../constant.js';
import { get } from "lodash";

// import {matchedReviews} from './fakeResponse.js'
// export const matchReview = (asin, callback) => {
//   callback(matchedReviews);
// }

import {Store} from "react-chrome-redux";


const proxyStore = new Store({
  portName: "example"
});


export const matchReview = (query, callback, retry=3) => {
  proxyStore.ready().then(() => {
    const server = get(servers, get(proxyStore.getState(), 'settings.model', null), '');
    console.log(server)
    request.post(url+'/api/amazon')
    .send({
      "url": server
    })
    .set('Content-Type', 'application/json; charset=utf-8')
    .query(query)
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

  });
}



// export const matchReview = (query, callback, retry=3) => request
//   .get(url+'/api/amazon')
//   .query(query)
//   .set("Content-type","application/x-www-form-urlencoded")
//   .redirects(0)
//   .end(function(err, res){
//     // console.log(res)
//     if (err || !res.ok) {
//       console.log('Oh no! error ', err);
//     } else {
//       if (callback){
//         if (res.status && res.status == 403){
//           if (retry == 0) return;
//           matchReview(query, callback, retry-1)
//         }
//         callback(res.body);
//       }
//     }
//   });
