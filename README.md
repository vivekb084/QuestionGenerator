# QuestionGenerator
Create Subtraction Questions with options

# Generate Docker Container
```
docker build -t question-generator .

# Download Existing Docker Image
```
docker pull bindalvivek/question-generator:v3
```
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
  'http://localhost:3000/api/subtract?minuend=3&subtrahend=2&totalquestions=5' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 81b04fdc-dedd-44bb-004b-2c44b9282d02'
```
or

```
http://localhost:3000/api/subtract?minuend=3&subtrahend=2&totalquestions=5
```

# Code Flow 

* Read the Parameters
* Generate Minued number, of digits given in minued parameter
* Generate Subtrahend number, of digits given in subtrahend parameter
* Calcualte the Difference and Store in the option
* Create 2 options by subtracting 1 from actual answer and adding 1 in actual answer (So Behaviour is not always random)
* Create remaining 4th Option Randomly
* Do this process totalquestions (Value given in totalquestions parameter) times 

# Option Creation Logic

* One of Option is actual result
* Another two Options will be (actual result -1 ) and (actual result +1 )
* Last Option will be full random.
* Then Shuffle all options


# Negative Value Handling

* If number of digits in Minued is less than number of digits in Subtrahend then it will return error (Minued Digits should be more than or equal to Subtrahend Digits).
* If Generated Mined Number is less than Subtrahend Number then swap the Numbers.
* If any option is negative simply change it to sum random number

