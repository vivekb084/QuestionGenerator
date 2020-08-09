const response = require('../utils/response');


const GenerateQuestion = async(req,res)=>{
    
    try {
        req.checkQuery('totalquestions', 'Please enter Total Question').notEmpty();
        req.checkQuery('minuend', 'Please enter Minued').notEmpty();
        req.checkQuery('subtrahend', 'Please enter Subtrahend').notEmpty();
        const errors = req.validationErrors();
        if (errors) {
            let error = '';
            errors.forEach(element => {
                error = error + ' ' + element.msg;
            });
            response.sendErrorCustomMessage(res, error, 400);
            return;
        }

        let totalquestions = req.query.totalquestions;
        let minuedDigitCount =req.query.minuend;
        let SubtrahendDigitCount =req.query.subtrahend;

        if(minuedDigitCount<SubtrahendDigitCount){
            response.sendErrorCustomMessage(res, "Minued Digits should be more than or equal to Subtrahend Digits", 400);
            return;
        }
        
        let QuestionArray = [];
        for(let i=0;i<totalquestions;i++){
            let Minuend = getNumber(minuedDigitCount);
            let Subtrahend = getNumber(SubtrahendDigitCount);

            if(Minuend<Subtrahend){
                Subtrahend = [Minuend, Minuend = Subtrahend][0];  //To change Minued number should be greater than Subtrahend
            }

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
            let newNumber = Math.floor(Math 
                .random() * (100 - 0 + 1));
            newArray.push(newNumber);
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