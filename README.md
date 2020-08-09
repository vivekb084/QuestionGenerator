# QuestionGenerator
Create questions with options

# Generate Docker Container
```
docker build -t question-generator .

# Download Existing Docker Image
```
docker pull bindalvivek/question-generator:v2
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
# Run Application TestCases Docker
```
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
