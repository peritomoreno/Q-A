const { Question, Photo, Answer } = require("./NoSQL_DB");
const Promise = require("bluebird");
module.exports = {
  Question: {
    AddHelp: (params) => {
      return Question.findOneAndUpdate(
        { id: params },
        //add one to helpful
        { $inc: { helpful: 1 } },
        {
          new: true,
          upsert: true,
        }
      ).exec();
    },
    AddReport: (params) => {
      return Question.findOneAndUpdate(
        { id: params },
        //add one to helpful
        { $inc: { reported: 1 } },
        {
          new: true,
          upsert: true,
        }
      ).exec();
    },
    Create: (params) => {
      return Question.findOne()
        .sort({ id: -1 })
        .exec()
        .then((response) => {
          let id = Number(JSON.stringify(response.id)) + 1;
          Question.findOneAndUpdate(
            { id: id },
            {
              product_id: params.product_id,
              body: params.body,
              asker_name: params.asker_name,
              asker_email: params.asker_email,
              date_written: params.date_written,
              reported: 0,
              helpful: 0,
            },
            {
              new: true,
              upsert: true,
            }
          ).exec();
        });
    },
  },
  Photo: {},
  Answer: {
    AddHelp: (params) => {
      return Answer.findOneAndUpdate(
        { id: params },
        //add one to helpful
        { $inc: { helpful: 1 } },
        {
          new: true,
          upsert: true,
        }
      ).exec();
    },
    AddReport: (params) => {
      return Answer.findOneAndUpdate(
        { id: params },
        //add one to helpful
        { $inc: { reported: 1 } },
        {
          new: true,
          upsert: true,
        }
      ).exec();
    },
    Create: (params) => {
      return Answer.findOne()
        .sort({ id: -1 })
        .exec()
        .then(response => {
          let id = Number(JSON.stringify(response.id)) + 1;
          Answer.findOneAndUpdate(
            { id: id },
            {
              question_id: params.question_id,
              body: params.body,
              answerer_name: params.answerer_name,
              answerer_email: params.answerer_email,
              date_written: params.date_written,
              reported: 0,
              helpful: 0,
            },
            {
              new: true,
              upsert: true,
            }
          )
            .exec()
            .then(response => {
              let answer_id = Number(JSON.stringify(response.id));
              let photos = params.photos || [];
              photos.map(photo=> {
                return Photo.findOne().sort({ id: -1 }).exec().then(response => {
                  let id = Number(JSON.stringify(response.id)) + 1;
                  console.log(id);
                  Photo.findOneAndUpdate(
                  { id: id },
                  {
                  answer_id:answer_id,
                  url:photo
                  },
                  {
                    new: true,
                    upsert: true,
                  }).exec();
                })
              });
            });
        });
    },
  },
};
