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
            let Options = [subtractedValue-1,subtractedValue+1,subtractedValue-getNumber(2),subtractedValue];

            Options = await convertToPositive(Options); //Convert All elements to positive

            Options = await shuffle(Options) //Shuffle the Options of array

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
        console.error("Error ",error)
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

const shuffle = (array)=>{
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

const convertToPositive = (array)=>{
    let newArray=[];
    for(let i=0;i<array.length;i++){
        if(array[i]<0){
            newArray.push(-1*array[i]);
        }
        else{
            newArray.push(array[i]);
        }
    }
    return newArray;
}  


module.exports ={
    GenerateQuestion
}