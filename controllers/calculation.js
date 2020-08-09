const response = require('../utils/response');

const { check, validationResult } = require('express-validator');



const GenerateQuestion = async(req,res)=>{
    
    try {
        req.checkBody('totalquestions', 'Please enter Total Question').notEmpty();
        req.checkBody('minuend', 'Please enter Minued').notEmpty();
        req.checkBody('subtrahend', 'Please enter Subtrahend').notEmpty();
        const errors = req.validationErrors();
        if (errors) {
            let error = '';
            errors.forEach(element => {
                error = error + ' ' + element.msg;
            });
            response.sendErrorCustomMessage(res, error, "false");
            return;
        }


        let totalquestions = req.body.totalquestions;
        let minuedDigitCount =req.body.minuend;
        let SubtrahendDigitCount =req.body.subtrahend;
        let QuestionArray = [];
        for(let i=0;i<totalquestions;i++){
            let Minuend = getNumber(minuedDigitCount);
            let Subtrahend = getNumber(SubtrahendDigitCount);
            let subtractedValue = Minuend-Subtrahend;
            let Options = [];
            for(let i=0;i<3;i++){
                Options.push(getNumber(minuedDigitCount))
            }
            let randomIndex = Math.floor(Math.random() * (3 - 0 + 1))
            Options.splice(randomIndex,0,subtractedValue)
            let Question ={
                'Question':i+1,
                Minuend,
                Subtrahend,
                'Correct Answer':subtractedValue,
                'Options':Options
            }
            QuestionArray.push(Question);
        }
        response.sendsuccessData(res,"Questions Generated Successfully",QuestionArray)
    } catch (error) {
        response.sendErrorCustomMessage(res, "Internal Server Error", "false");
    }
}

const getNumber = (digits)=>{
    let MinNum = Math.pow(10,digits-1);
    let MaxNum = Math.pow(10,digits)-1;
    let randomNumber = Math.floor(Math 
        .random() * (MaxNum - MinNum + 1)) + MinNum;
    return randomNumber;
}


module.exports ={
    GenerateQuestion
}