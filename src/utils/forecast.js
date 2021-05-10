const request = require("request");

const kelvinToCelcius = (kel) => {
  return kel - 273.15;
};

const forecast = (log, lat, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${log}&appid=d5e51f8461cd3e9467b7322e44e87711`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to Weather Services..!!", undefined);
    } else if (response.body.error) {
      callback("Unable to find Location", undefined);
    } else {
      let string = `${
        response.body.daily[0].weather[0].description
      } ... It is Currenty ${kelvinToCelcius(
        response.body.current.temp
      )} degree Celcius Out. And its feels like ${kelvinToCelcius(
        response.body.current.feels_like
      )} and the humidity is ${response.body.current.humidity}`;

      callback(undefined, string);
    }
  });
};

module.exports = forecast;
