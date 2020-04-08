const router = require("express").Router();

router.get('/:product_id', ) //List Questions
router.get('/:question_id/answers', ) //List Answers
router.post('/:product_id', ) //add Question
router.post('/:question_id/answers') //add Answer
router.put('/question/:question_id/helpful') //Mark Question as Helpful
router.put('/question/:question_id/report') //Report Question




module.exports = router;