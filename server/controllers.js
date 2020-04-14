const { Question, Answer, Photo } = require('./model');

module.exports = {
  questions: {
    AddHelp: (req, res) => {
      let id = req.params.question_id
      Question
        .AddHelp(id)
        .then(response => res.status(201).json(response))
        .catch(err => {
          console.log(err);
          res.sendStatus(410);
        });
    },
    AddReport: (req, res) => {
      let id = req.params.question_id
      Question
        .AddReport(id)
        .then(response => res.status(202).json(response))
        .catch(err => {
          console.log(err);
          res.sendStatus(420);
        });
    },
    AddQuestion: (req, res) => {
      let date = new Date().toISOString().slice(0, 10)

      const params = {
        product_id :req.params.product_id,
        body : req.body.body,
        asker_name : req.body.name,
        asker_email: req.body.email,
        date_written: date,
        reported: 0,
        helpful:0
      }
      Question
        .Create(params)
        .then(response => {res.status(205).send('Created') })
        .catch(err => {
          console.log(err);
          res.sendStatus(450);
        });
    },
    GetAll: (req, res) => {
      const params = req.product_id
    }
  },
  answers: {
    AddHelp: (req, res) => {
      let id = req.params.answer_id
      Answer
        .AddHelp(id)
        .then(response => res.status(203).json(response))
        .catch(err => {
          console.log(err);
          res.sendStatus(430);
        });
    },
    AddReport: (req, res) => {
      let id = req.params.answer_id
      Answer
        .AddReport(id)
        .then(response => res.status(204).json(response))
        .catch(err => {
          console.log(err);
          res.sendStatus(440);
        });
    },
    AddAnswer: (req, res) => {
      let id = req.params.question_id
      let date = new Date().toISOString().slice(0, 10)
      let params = {
        question_id: id,
        answerer_name: req.body.name,
        answerer_email: req.body.email,
        photos: req.body.photos,
        date_written: date,
        body:req.body.body

      }
      Answer
        .Create(params)
        .then(response => {res.status(206).send('Created') })
        .catch(err => {
          console.log(err);
          res.sendStatus(460);
        });
    },
    GetAll: (req, res ) =>{
       let id = req.params.question_id
    }
  }
}