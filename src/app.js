//const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geoCode");
const forecast = require("./utils/forecast");

const PORT = process.env.PORT || 3000;

const app = express();

const publicDirPath = `${__dirname}/../public`;
const templateDir = `${__dirname}/../templates/views`;
const partialPath = `${__dirname}/../templates/partials`;

app.set("view engine", "hbs");
app.set("views", templateDir);
hbs.registerPartials(partialPath);

app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Created By Salman Bajwa",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me ",
    name: "Salman Bajwa",
    email: "salmanbaj03@gmail.com",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    description: "I am here to help you :) ",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.json({
      error: "You must provide a address",
    });
  }

  geocode(req.query.address, (error, response) => {
    if (error) {
      return res.json({
        error,
      });
    }

    forecast(response.log, response.lat, (error, forecastData) => {
      if (error) {
        return res.json({
          error,
        });
      }

      res.json({
        weatherCondition: forecastData,
        address: req.query.address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help Article Not Found.. !!",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page Not Found",
  });
});

app.listen(3000, () => {
  console.log("Listening on PORT 3000");
});
