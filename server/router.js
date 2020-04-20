const router = require("express").Router();
const { questions, answers } = require('./controllers');
router.get('/:product_id', questions.GetAll) //List Questions
router.get('/:question_id/answers',answers.GetAll) //List Answers

//in the initial database all questions are in the same
router.post('/:product_id',questions.AddQuestion ) //add Question
router.post('/:question_id/answers',answers.AddAnswer) //add Answer

router.put('/question/:question_id/helpful',questions.AddHelp) //Mark Question as Helpful
router.put('/question/:question_id/report',questions.AddReport) //Report Question
router.put('/answer/:answer_id/helpful',answers.AddHelp) //Mark answer as Helpful
router.put('/answer/:answer_id/report',answers.AddReport) //Report answer
router.get('',(req,res)=>res.send("111"))


module.exports = router;