const db = require("../models");
module.exports = function(app) {
  app.post("/api/scoring", (req, res) => {
    console.log(req.body);
    db.User.create({
      name: req.body.name,
      score: req.body.score
    })
      .then(() => {
        res.redirect(307, "/api/scoring");
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  });

  app.get("/api/question", (req, res) => {
    db.Question.findOne({
      where: {
        id: 1
      }
    }).then((dbQuestion) => {
      res.json(dbQuestion);
    });
  });

  app.get("/api/questions", (req, res) => {
    db.Question.findAll({
      attributes: [
        "id",
        "question_text",
        "answer1",
        "answer2",
        "answer3",
        "correct"
      ]
    }).then((dbQuestion) => {
      res.json(dbQuestion);
    });
  });
};
