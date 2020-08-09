# QuestionGenerator
Create questions with options

# Generate Docker Container
```
docker build -t question-generator .
```
# Run the Container
```
docker run -p 3000:3000 question-generator
```
# Download Existing Docker Image
```
docker pull bindalvivek/question-generator:v2
```


# Curl Request To Execute
```
  curl -X POST \
  'http://localhost:3000/subtract?%22foo%22=%22bar%22' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -H 'postman-token: 24ef7404-27a1-0f8c-12ce-4e0649377551' \
  -d 'minuend=3&subtrahend=2&totalquestions=5'
```
