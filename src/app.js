const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

console.log(__dirname);
console.log(path.join(__dirname, "../public"));

const app = express();

//define paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handle bars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

//set up static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Shivam"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Shivam"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    msg: "this is help messeage i will help in every way",
    title: "Help",
    name: "Shivam"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a address"
    });
  }
  geocode(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        return res.send({
          error
        });
      }
      forecast(latitude, longitude, (error, forecast) => {
        if (error) {
          return res.send({
            error
          });
        }

        res.send({
          forecast,
          location,
          address: req.query.address
        });
      });
    }
  );
  // res.send({
  //   forcast: "its 50 degrees",
  //   location: "mandi dabwali",
  //   address: req.query.address
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.serch) {
    return res.send({
      error: "You must provide a search term"
    });
  }
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    name: "Shivam",
    errormsg: "Help article not found",
    title: "404 page"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    name: "Shivam",
    errormsg: "page not found",
    title: "404 page"
  });
});
//app.com
//app.com/help
//app.com/about

app.listen(3000, () => {
  console.log("server is up on port 3000.");
});
