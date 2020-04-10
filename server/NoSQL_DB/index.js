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
  id: Number,
  body:String,
  date_written:{type:Date, default: Date.now },
  asker_name: String,
  asker_email:String,
  reported: Boolean,
  helpful:Number
});
var questions = mongoose.model('Qquestions', QuestionSchema);

var AnswerSchema = new Schema({
  question_id: Number,
  id: Number,
  body: String,
  date_written: {type:Date, default: Date.now },
  answer_name: String,
  helpful: Number,
  reported:0
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