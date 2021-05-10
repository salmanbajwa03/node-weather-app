const request = require("request");

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoic2FsbWFuYmFqd2EiLCJhIjoiY2tvZmtlc3gyMDdlNjJ3bng1MTg2bHExcCJ9.i_kqVf-s4JJJRNTYjP_knA&limit=1`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connnect to a location service", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find location try another search", undefined);
    } else {
      const logitude = response.body.features[0].center[0];
      const latitude = response.body.features[0].center[1];
      callback(undefined, { log: logitude, lat: latitude });
    }
  });
};

module.exports = geoCode;
