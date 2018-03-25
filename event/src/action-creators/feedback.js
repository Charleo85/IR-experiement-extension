const request = require('superagent');
import {url} from '../constant.js';

export const clickAction = (id, callback) => request
  .get(url+'/api/click')
  .query({"id": id})
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
  .query({"id":id, "rating":rating})
  .end(function(err, res){
    if (err || !res.ok) {
      console.log('Oh no! error');
    } else {
      if (callback){
        callback(res.body);
      }
    }
  });
