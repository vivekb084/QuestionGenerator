var expect  = require('chai').expect;
var request = require('request');

var SubtractApiUrl = 'http://localhost:3000/api/subtract'

describe(`GET ${SubtractApiUrl} - Testing for /api/subtract `, () => {

  it('Total Question Minued and Subtrahend empty Error', function(done) {
      request(SubtractApiUrl ,function(error, response, body) {
        let Parsebody = JSON.parse(body);
          expect(Parsebody.status).to.equal(400);
          expect(Parsebody.message).to.equal(' Please enter Total Question Please enter Minued Please enter Subtrahend');
          done();
      });
  });

  it('Please enter Total Question error', function(done) {
    request(SubtractApiUrl+'?minuend=3&subtrahend=4' ,function(error, response, body) {
      let Parsebody = JSON.parse(body);
        expect(Parsebody.status).to.equal(400);
        expect(Parsebody.message).to.equal(' Please enter Total Question');
        done();
    });
  });

  it('Minued Digits should be more than or equal to Subtrahend Digits error', function(done) {
    request(SubtractApiUrl+'?minuend=3&subtrahend=4&totalquestions=5' ,function(error, response, body) {
      let Parsebody = JSON.parse(body);
        expect(Parsebody.status).to.equal(400);
        expect(Parsebody.message).to.equal('Minued Digits should be more than or equal to Subtrahend Digits');
        done();
    });
  });

  it('Please enter Minued error', function(done) {
    request(SubtractApiUrl+'?subtrahend=4&totalquestions=5' ,function(error, response, body) {
      let Parsebody = JSON.parse(body);
        expect(Parsebody.status).to.equal(400);
        expect(Parsebody.message).to.equal(' Please enter Minued');
        done();
    });
  });
  
  it('Please enter Subtrahend error', function(done) {
    request(SubtractApiUrl+'?minuend=3&totalquestions=5' ,function(error, response, body) {
      let Parsebody = JSON.parse(body);
        expect(Parsebody.status).to.equal(400);
        expect(Parsebody.message).to.equal(' Please enter Subtrahend');
        done();
    });
  });
  
  it('Please enter Total Question error', function(done) {
    request(SubtractApiUrl+'?minuend=3&subtrahend=2&totalquestions=5' ,function(error, response, body) {
      let Parsebody = JSON.parse(body);
        expect(Parsebody.status).to.equal(200);
        expect(Parsebody.message).to.equal('Questions Generated Successfully');
        done();
    });
  });
  
});