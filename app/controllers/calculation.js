const response = require('../utils/response');


const GenerateQuestion = async(req,res)=>{
    
    try {
        req.checkQuery('totalquestions', 'Please enter Total Question').notEmpty();
        req.checkQuery('minuend', 'Please enter Minued').notEmpty();
        req.checkQuery('subtrahend', 'Please enter Subtrahend').notEmpty();
        req.checkQuery('borrow', 'Please enter Borrow flag to true or false').notEmpty();
        const errors = req.validationErrors();
        if (errors) {
            let error = '';
            errors.forEach(element => {
                error = error + ' ' + element.msg;
            });
            response.sendErrorCustomMessage(res, error, 400);
            return;
        }

        let totalquestions = parseInt(req.query.totalquestions,10);
        let minuedDigitCount =parseInt(req.query.minuend,10);
        let SubtrahendDigitCount =parseInt(req.query.subtrahend,10) ;
        let borrowFlag =(req.query.borrow == 'true');


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
            let borrowExistinGeneratedNumber = await checkBorrowExist(Minuend,Subtrahend,SubtrahendDigitCount)
            if(borrowFlag!= borrowExistinGeneratedNumber){
              let {newMinuend,newSubstrahend} =  await ModifyNumbersforBorrow(Minuend,Subtrahend,minuedDigitCount,SubtrahendDigitCount,borrowFlag) //To Make Calculation Use Borrow Flag
              Minuend=newMinuend;
              Subtrahend=newSubstrahend;
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


//Generate random number of given digits
const getNumber = (digits)=>{
    let MinNum = Math.pow(10,digits-1);
    let MaxNum = Math.pow(10,digits)-1;
    let randomNumber = Math.floor(Math 
        .random() * (MaxNum - MinNum + 1)) + MinNum;
    return randomNumber;
}

//Shuffle all elements of the array
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


//Change Negative number to any random Number
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

/*To check if we needed borrow to calculate subtraction
Check if all corressponding digits of subtrahend are smaller than minued
*/

const checkBorrowExist = (Minuend,Subtrahend,SubtrahendDigitCount)=>{
    let MinuedDigitsString = Minuend.toString(10)
    let SubtrahendDigitsString = Subtrahend.toString(10)
    for(let i=SubtrahendDigitCount-1;i>=0;i--){
        if(parseInt(SubtrahendDigitsString[i],10)>parseInt(MinuedDigitsString[i],10)){
            return true;
        }
    }
    return false;
}



const ModifyNumbersforBorrow = (Minuend,Subtrahend,minuedDigitCount,SubtrahendDigitCount,borrowFlag)=>{
    let newMinuend =Minuend,newSubstrahend=Subtrahend;
    if(!borrowFlag){
        newSubstrahend =  ModifySubstrahend(Minuend,Subtrahend)
    }
    return {newMinuend,newSubstrahend};
}

const ModifySubstrahend = (Minued,Substrahend)=>{
    let MinuendString = Minued.toString(10);
    let SubstrahendString = Substrahend.toString(10);
    let newSubtrahendString = SubstrahendString;
    for(let i=SubstrahendString.length-1;i>=0;i--){
        if(parseInt(MinuendString[i],10)<parseInt(SubstrahendString[i],10)){
            newSubtrahendString=newSubtrahendString.substring(0, i) + MinuendString[i] + newSubtrahendString.substring(i + 1)
        }
    }
    return parseInt(newSubtrahendString,10);
}


module.exports ={
    GenerateQuestion
}