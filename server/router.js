const router = require("express").Router();
const { questions, answers } = require('./controllers');
router.get('/qa/:product_id', questions.GetAll) //List Questions
router.get('/qa/:question_id/answers',answers.GetAll) //List Answers

//in the initial database all questions are in the same
router.post('/qa/:product_id',questions.AddQuestion ) //add Question
router.post('/qa/:question_id/answers',answers.AddAnswer) //add Answer

router.put('/qa/question/:question_id/helpful',questions.AddHelp) //Mark Question as Helpful
router.put('/qa/question/:question_id/report',questions.AddReport) //Report Question
router.put('/qa/answer/:answer_id/helpful',answers.AddHelp) //Mark answer as Helpful
router.put('/qa/answer/:answer_id/report', answers.AddReport) //Report answer

router.get('/loaderio-0fa14b3494a886016b53b3da216dc01d/',(req,res)=>res.send("loaderio-0fa14b3494a886016b53b3da216dc01d"))//use loader.io


module.exports = router;