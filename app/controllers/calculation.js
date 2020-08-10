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
            let borrowExistinGeneratedNumber = await checkBorrowExist(Minuend,Subtrahend,minuedDigitCount,SubtrahendDigitCount)


            if(borrowFlag!= borrowExistinGeneratedNumber){
              let {newMinuend,newSubstrahend} =  await ModifyNumbersforBorrow(Minuend,Subtrahend,minuedDigitCount,SubtrahendDigitCount,borrowFlag) //To Make Calculation Use Borrow Flag
              Minuend=newMinuend;
              Subtrahend=newSubstrahend;
            }

            let newborrowExistinGeneratedNumber = await checkBorrowExist(Minuend,Subtrahend,minuedDigitCount,SubtrahendDigitCount)

            console.log("Number ",borrowExistinGeneratedNumber,Minuend,Subtrahend,newborrowExistinGeneratedNumber)

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

const checkBorrowExist = (Minuend,Subtrahend,minuedDigitCount,SubtrahendDigitCount)=>{
    let MinuedDigitsString = Minuend.toString(10)
    let SubtrahendDigitsString = Subtrahend.toString(10)
    for(let i=0;i<SubtrahendDigitCount;i++){
        if(parseInt(SubtrahendDigitsString[SubtrahendDigitCount-1-i],10)>parseInt(MinuedDigitsString[minuedDigitCount-i-1],10)){
            return true;
        }
    }
    return false;
}



const ModifyNumbersforBorrow = (Minuend,Subtrahend,minuedDigitCount,SubtrahendDigitCount,borrowFlag)=>{
    let newMinuend =Minuend,newSubstrahend=Subtrahend;
    let newSubtrahendString,newMinuendString = Minuend.toString(10);
    if(!borrowFlag){
        newSubtrahendString = ModifySubstrahend(Minuend,Subtrahend)
        if(newSubtrahendString[0]=='0'){
            //Check If starting digit of Subtrahend is zero then modify corresponding digit of subtrahend and Minued with a random number
            let diff = minuedDigitCount-SubtrahendDigitCount;
            let randomNumber = Math.floor(Math.random() * (9)) + 1;
            newMinuendString=newMinuendString.substring(0,diff)+randomNumber.toString(10)+newMinuendString.substring(diff+1);
            newSubtrahendString= randomNumber.toString(10) + newSubtrahendString.substring(1)
        }
        newMinuend =parseInt(newMinuendString,10);
        newSubstrahend =  parseInt(newSubtrahendString,10);
    }
    return {newMinuend,newSubstrahend};
}


//Replace Substrahend digit with correspoint Minued digit if Subtrahend is greater than Minued Digit
const ModifySubstrahend = (Minued,Substrahend)=>{
    let MinuendString = Minued.toString(10);
    let SubstrahendString = Substrahend.toString(10);
    let newSubtrahendString = SubstrahendString;
    let SubtrahendCharIndex=0,MinuedCharIndex=0;
    for(let i=0;i<=SubstrahendString.length;i++){
        SubtrahendCharIndex=SubstrahendString.length-1-i;
        MinuedCharIndex =MinuendString.length-i-1;
        if(parseInt(MinuendString[MinuedCharIndex],10)<parseInt(SubstrahendString[SubtrahendCharIndex],10)){
            newSubtrahendString=newSubtrahendString.substring(0,SubtrahendCharIndex) + MinuendString[MinuedCharIndex] + newSubtrahendString.substring(SubtrahendCharIndex+1 )
        }
    }

    return newSubtrahendString;
}


module.exports ={
    GenerateQuestion
}