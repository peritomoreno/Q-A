//

const mongoose = require('mongoose');
//since my query is taking a long time. And mongo itself has a default time out set. So it times out, if the query takes longer than the timeout time, so i need to keep the mongo connection
const option = {
  socketTimeoutMS: 30000,
  keepAlive: true,
  reconnectTries: 30000,
  useNewUrlParser: true
};


if(process.env.MONGODB_URI){
  mongoose.connect(process.env.MONGODB_URI,option)
} else{
  mongoose.connect('mongodb://18.191.222.99:27017/q_a_db',option);
}
mongoose.connection.on('connected', function() {
  console.log(
    'Mongoose default connection is opened'
  );
});

mongoose.connection.on('error', function(err) {
  console.log('Mongoose default connection has occured ' + err + ' error');
});

mongoose.connection.on('disconnected', function() {
  console.log('Mongoose default connection is disconnected');
});

const db = mongoose.connection;
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  product_id:  Number, // String is shorthand for {type: String}
  id: Number,
  body:String,
  date_written:String,
  asker_name: String,
  asker_email:String,
  reported: Number,
  helpful:Number
});
var questions = mongoose.model('Questions', QuestionSchema);

var AnswerSchema = new Schema({
  question_id: Number,
  id: Number,
  body: String,
  date_written: String,
  answerer_name: String,
  answerer_email:String,
  helpful: Number,
  reported:Number
})
var answers= mongoose.model('answers', AnswerSchema);
var PhotoSchema = new Schema({
  answer_id: Number,
  id: Number,
  url:String
})
var answers_photos= mongoose.model('answers_photos', PhotoSchema);
mongoose.Promise = Promise;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to db...');
})



module.exports.Question = questions
module.exports.Answer = answers
module.exports.Photo = answers_photos