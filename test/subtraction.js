var expect    = require("chai").expect;
var app = require("../app/app");
var request = require("request");



var SubtractApiUrl = 'http://localhost:3000/api/subtract'

describe(`POST ${SubtractApiUrl} - Testing for /api/subtract `, () => {
    it('Minued Digits should be more than or equal to Subtrahend Digits error', () => {
          request(app)
          .post(SubtractApiUrl)
          .send({minuend:3,subtrahend:4,totalquestions:5})
          .end(function(err, res) {
            if (err) done(err);
            expect(res).to.have.status(400);
            expect(res.status).to.equals("Minued Digits should be more than or equal to Subtrahend Digits");
             });
          done();
    })
    it('Please enter Total Question error', () => {
        request(app)
        .post(SubtractApiUrl)
        .send({minuend:3,subtrahend:4})
        .expect(400)
        .expect('Content-Type', 'application/x-www-form-urlencoded')
        .end(function(err, res) {
          if (err) done(err);
           expect(res.status).to.equal(400)
           });
        done();
    })
    it('Please enter Minued error', () => {
        request(app)
        .post(SubtractApiUrl)
        .send({subtrahend:4,totalquestions:5})
        .expect(400)
        .expect('Content-Type', 'application/x-www-form-urlencoded')
        .end(function(err, res) {
          if (err) done(err);
           expect(res.status).to.equal(400)
           });
        done();
    })
    it('Please enter Subtrahend error', () => {
        request(app)
          .post(SubtractApiUrl)
          .send({subtrahend:4})
          .expect
          .expect('Content-Type', 'application/x-www-form-urlencoded')
          .end(function(err, res) {
            if (err) done(err);
             expect(res.status).to.equal(400)
             });
          done();
    })
  })