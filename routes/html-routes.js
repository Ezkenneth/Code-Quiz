// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

module.exports = function(app) {
  app.get("/", (req, res) => {
    res.render("index");
  });

  app.get("/game", (req, res) => {
    res.render("game");
  });

  app.get("/highscores", (req, res) => {
    res.render("highscores");
  });
};
