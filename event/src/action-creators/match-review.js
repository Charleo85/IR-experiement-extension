import { createAction } from "redux-actions";

const https = require("https");


const url =
  "https://maps.googleapis.com/maps/api/geocode/json?address=Florence";

export const testhttps = (ansi) => https.get(url, res => {
  res.setEncoding("utf8");
  let body = "";
  res.on("data", data => {
    body += data;
  });
  res.on("end", () => {
    body = JSON.parse(body);
    console.log(
      ansi,
      `City: ${body.results[0].formatted_address} -`,
      `Latitude: ${body.results[0].geometry.location.lat} -`,
      `Longitude: ${body.results[0].geometry.location.lng}`
    );
  });
});
