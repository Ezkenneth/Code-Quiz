module.exports = function(sequelize, DataTypes) {
  const Question = sequelize.define(
    "Question",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      question_text: DataTypes.STRING,
      answer1: DataTypes.STRING,
      answer2: DataTypes.STRING,
      answer3: DataTypes.STRING,
      correct: DataTypes.INTEGER
    },

    {
      timestamps: false
    }
  );

  return Question;
};
