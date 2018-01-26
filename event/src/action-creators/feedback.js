const request = require('superagent');
import {url} from '../constant.js';

export const clickAction = (id, callback) => request
  .get(url+'/api/click')
  .query({"id":id})
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

export const ratingAction = (id, rating, callback) => request
  .get(url+'/api/rate')
  .query({"id":id, 'rating': rating})
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
