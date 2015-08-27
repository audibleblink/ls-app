var expect   = require('chai').expect;
var md5      = require('MD5');
var Director = require('../models/director');
var nohm     = require('nohm').Nohm;
var redis    = require('redis').createClient();

redis.on("connect", function(){
  nohm.setClient(redis);
  describe("Director", function(){

    describe("#validToken", function(){

      var director = nohm.factory("Director");
      director.p({full_name: "James Cameron", dob: "1954-08-16T00:00:00.000Z"});
      var md5s = {
        valid: "0c1f04161f135b59960cc73854c46177",
        invalid: "123"
      };

      it("returns true for a valid md5 hash of its full_name", function(done){
        expect(director.validToken(md5s.valid)).to.be.true;
        done();
      });

      it("returns false for an invalid md5 hash of its full_name", function(done){
        expect(director.validToken(md5s.invalid)).to.be.false;
        done();
      });

    });

  });
});
