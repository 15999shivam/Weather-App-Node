const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/cce55c1034bcc081b0e34b553e4f9562/" +
    latitude +
    "," +
    longitude;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("unable to find location", undefined);
    } else {
      callback(
        undefined,

        body.daily.data[0].summary +
          " It is currently " +
          body.currently.temperature +
          "f degress out. The high today is " +
          body.daily.data[0].temperatureHigh +
          " with a low of " +
          body.daily.data[0].temperatureLow +
          ". There is a " +
          body.currently.precipProbability +
          "% chance of rain."
      );
    }
  });
};
module.exports = forecast;
