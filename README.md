# QuestionGenerator
Generate Question for subtraction with given digits in Minued and Subtrahend. Number can be generated based on borrow flag. If borrow flag true then subtraction calculations with use borrow.

# How To Install
  ```
Copy the script autoSetup.sh to any folder
change permission of script by chmod 777 autoSetup.sh
Run the script by ./autoSetup.sh
  ```

# Generate Docker Container
```
docker build -t question-generator
```
# Download Existing Docker Image
```
docker pull bindalvivek/question-generator:v1
```
# Run the Container
```
docker run -p 3000:3000 question-generator
```
# Run Application without Docker
```
npm start
```
# Run Application TestCases without Docker
```
nohup npm start &
npm test
```


# Curl Request To Execute
```
curl -X GET \
  'http://localhost:3000/api/subtract?minuend=3&subtrahend=3&totalquestions=5&borrow=false' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 340bdc44-48f1-720f-f628-791c0e376208'
```
or

```
curl -X GET \
  'http://localhost:3000/api/subtract?minuend=3&subtrahend=3&totalquestions=5&borrow=true' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: ea25fc87-5ad8-f4f1-1e31-273862097cbd'
```
or 

```
http://localhost:3000/api/subtract?minuend=6&subtrahend=4&totalquestions=2&borrow=false
```
or 

``` 
http://localhost:3000/api/subtract?minuend=6&subtrahend=4&totalquestions=2&borrow=true
```

# Code Flow 

* Read the Parameters
* Generate Minued number, of digits given in minued parameter
* Generate Subtrahend number, of digits given in subtrahend parameter
* Calcualte the Difference and Store in the option
* Create 2 options by subtracting 1 from actual answer and adding 1 in actual answer (So Behaviour is not always random)
* Create remaining 4th Option Randomly
* Do this process totalquestions (Value given in totalquestions parameter) times 

# Algorithm

 * Read All Parameters
 * Validate All Parameters
 * Check Minued Digits count should be more than or equal to subtrahend digit count
 * Randomly Generate Minued and Subtrahend number of given digits in parameter
 * Check if there are all 9's at Minued corresponding to Subtrahend from last
 * if it exist replace it with some random number
 * Check if generated number use borrow
 * if generated number use borrow and borrow flag is not set or generated number don't use borrow and borrow flag is set then modify the numbers
 * To create numbers that use borrowed flag ,start from last digit of both numbers find the digit of subtrahend is less than  or equal to digit of Minued and digit of minued is not 9 ,then update subtrahend digit with minued digit +1 
 * To create number that don't use borrow flag , start from last digit of both numbers and if digit of Subtrahend is greater than digit of Minued then update that digit of subtrahend by digit of Minued - random number
 * Find the Difference of Minued and Subtrahend
 * Store 2 options by subtraction 1 and adding one from original answer
 * create one random number for option
 * Shuffle the array
 * if any number is negative change it to sum random number

# Option Creation Logic

* One of Option is actual result
* Another two Options will be (actual result -1 ) and (actual result +1 )
* Last Option will be full random.
* Then Shuffle all options


# Negative Value Handling

* If number of digits in Minued is less than number of digits in Subtrahend then it will return error (Minued Digits should be more than or equal to Subtrahend Digits).
* If Generated Mined Number is less than Subtrahend Number then swap the Numbers.
* If any option is negative simply change it to sum random number


# SQL Schema (SQL Query to create Database)

CREATE TABLE QUERY <br/>
( <br />
  ID STRING NOT NULL , <br />
  MinuedDigitCount NUMBER NOT NULL, <br/>
  SubtrahendDigitCount NUMBER NOT NULL, <br/>
  BorrowEnable BOOLEAN <br/>
  PRIMARY KEY (MinuedDigitCount,SubtrahendDigitCount,BorrowEnable) <br/>
); <br />
 <br />
CREATE TABLE QUESTIONS <br/>
( <br/>
  ID STRING NOT NULL , <br />
  Minued NUMBER NOT NULL, <br/>
  Subtrahend NUMBER NOT NULL, <br/>
  Option1 NUMBER NOT NULL, <br/>
  Option2 NUMBER NOT NULL, <br/>
  Option3 NUMBER NOT NULL, <br/>
  Option4 NUMBER NOT NULL, <br/>
  correctAnswer NUMBER NOT NULL <br/>
  PRIMARY KEY (Minued,Subtrahend) <br/>
); <br />
 <br />
 
Query Fields (like Minued digits count, subtrahend digits count, borrow flat) are Present in QUERY table and question data is present in QUESTION table. There is one to Many Mapping present. ID Field is common that comoile both tables.

