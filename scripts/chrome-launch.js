#!/usr/bin/env node

const chromeLaunch = require('chrome-launch'); // eslint-disable-line import/no-extraneous-dependencies

const url =
  'https://medium.com/@kurtgessler/facebooks-algorithm-isn-t-surfacing-one-third-of-our-posts-and-it-s-getting-worse-68e37ee025a3';
const args = ['--load-extension=./dist'];

chromeLaunch(url, {
  args
});
console.log('A new instance of Chrome should now be open in the background.'); // eslint-disable-line no-console
