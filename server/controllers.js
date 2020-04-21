const { Question, Answer, Photo } = require("./model");
const Promise = require("bluebird")
module.exports = {
  questions: {
    AddHelp: (req, res) => {
      let id = req.params.question_id;
      Question.AddHelp(id)
        .then((response) => res.status(201).json(response))
        .catch((err) => {
          console.log(err);
          res.sendStatus(410);
        });
    },
    AddReport: (req, res) => {
      let id = req.params.question_id;
      Question.AddReport(id)
        .then((response) => res.status(202).json(response))
        .catch((err) => {
          console.log(err);
          res.sendStatus(420);
        });
    },
    AddQuestion: (req, res) => {
      let date = new Date().toISOString().slice(0, 10);

      const params = {
        product_id: req.params.product_id,
        body: req.body.body,
        asker_name: req.body.name,
        asker_email: req.body.email,
        date_written: date,
        reported: 0,
        helpful: 0,
      };
      Question.Create(params)
        .then((response) => {
          res.status(205).send("Created");
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(450);
        });
    },
    GetAll: async (req, res) => {
      try {
        let id = req.params.product_id;
        let count = req.params.count || 5;
        let page = req.params.count || 1;
        let questionArr = [];
        let questions = await Question.GetAll(id, count, page);
        for (let k = 0; k < questions.length; k++) {
          let questionObj = {
            question_id: questions[k].id,
            question_body: questions[k].body,
            aker_name: questions[k].asker_name,
            reported: questions[k].reported,
            helpfulness: questions[k].helpful,
            question_date: new Date(questions[k].date_written),
            answers: {}
          }
          let answers = await Answer.GetAll(questions[k].id);
          for (let i = 0; i < answers.length; i++) {
            let photos = await Photo.GetAll(answers[i].id);
            let url = []
            for (let j = 0; j < photos.length; j++) {
              url.push({ id: photos[j].id, url: photos[j].url })
            }
            let Obj = {
              id: answers[i].id,
              body: answers[i].body,
              answerer_name: answers[i].answerer_email,
              helpfulness: answers[i].helpful,
              photos: url,
              date: new Date(answers[i].date_written),
            };
            questionObj['answers'][answers[i].id] = Obj
          }
          questionArr.push(questionObj)
        }
        res.status(208).send({ product_id: id, results: questionArr })
      } catch (err) {
        console.log("fetch failed", err);
      }
    }
  },
  answers: {
    AddHelp: (req, res) => {
      let id = req.params.answer_id;
      Answer.AddHelp(id)
        .then((response) => res.status(203).json(response))
        .catch((err) => {
          console.log(err);
          res.sendStatus(430);
        });
    },
    AddReport: (req, res) => {
      let id = req.params.answer_id;
      Answer.AddReport(id)
        .then((response) => res.status(204).json(response))
        .catch((err) => {
          console.log(err);
          res.sendStatus(440);
        });
    },
    AddAnswer: (req, res) => {
      let id = req.params.question_id;
      let date = new Date().toISOString().slice(0, 10);
      let params = {
        question_id: id,
        answerer_name: req.body.name,
        answerer_email: req.body.email,
        photos: req.body.photos,
        date_written: date,
        body: req.body.body,
      };
      Answer.Create(params)
        .then((response) => {
          res.status(206).send("Created");
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(460);
        });
    },
    GetAll: async (req, res) => {
      try {
        let id = req.params.question_id;
        let count = req.params.count || 5;
        let page = req.params.count || 1;
        let resultList = [];
        let answers = await Answer.GetAll(id, count, page);
        for (let i = 0; i < answers.length; i++) {
          let photos = await Photo.GetAll(answers[i].id);
          let url = []
          for (let j = 0; j < photos.length; j++){
            url.push({ id: photos[j].id, url: photos[j].url })
          }
          let Obj = {
            answer_id: answers[i].id,
            body: answers[i].body,
            answerer_name: answers[i].answerer_email,
            helpfulness: answers[i].helpful,
            photos: url,
            date: new Date(answers[i].date_written),
          };
          resultList.push(Obj)
        }
        res.status(207).send({question:id,page,count,results:resultList})
      } catch (err) {
        console.log("fetch failed", err);
      }
    },
  },
}

