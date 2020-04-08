//

const mongoose = require('mongoose');
if(process.env.MONGODB_URI){
  mongoose.connect(process.env.MONGODB_URI)
} else{
  mongoose.connect('mongodb://localhost:27017/q_a_db', { useNewUrlParser: true });
}
mongoose.connection.on('connected', function() {
  console.log(
    'Mongoose default connection is open to mongodb://localhost:27017/q_a_db'
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
  question_id: Number,
  question_body:String,
  question_date:String,
  asker_name: String,
  reported: Boolean,
  helpfulness:Number
});
var Question = mongoose.model('Question', QuestionSchema);

var AnswerSchema = new Schema({
  question_id: Number,
  answer_id: Number,
  body: String,
  date: String,
  answer_name: String,
  helpfulness: Number,
})
var Answer= mongoose.model('Answer', AnswerSchema);
var PhotoSchema = new Schema({
  answer_id: Number,
  photo_id: Number,
  url:String
})
var Photo= mongoose.model('Photo', PhotoSchema);
mongoose.Promise = Promise;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to db...');
})



module.exports.Question = Question
module.exports.Answer = Answer
module.exports.Photo = Photo