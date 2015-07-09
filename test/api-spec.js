var expect    = require('chai').expect
var supertest = require('supertest')
var api       = supertest('http://localhost:5000')
var redis     = require('redis').createClient()
var md5       = require('MD5')



describe("App", function(){

  describe("#create", function(){

    before(function(){
      redis.flushdb()
    })

    it("allows anyone to create a new user from a livestream id", function(done){
      api.post("/directors")
        .send({livestream_id: "6488824"})
        .expect(200, done)
    })

    it("returns an error if the user already exists in our db", function(done){
      api.post("/directors")
        .send({livestream_id: "6488824"})
        .expect(400, done)
    })

  })

  describe("#index", function(){

    it("responds without errors", function(done){
      api.get('/directors')
        .expect(200, done)
    })

    it("responds with a list of directors", function(done){
      api.get('/directors')
        .end(function(err, res){
          expect(res.body).to.be.an("array")
          done()
        })
    })

  })


  describe("#show", function(){

    it("responds with a director when given a valid id", function(done){
      api.get("/directors/6488824")
        .expect(200)
        .end(function(err, res){
          expect(res.body).to.include.keys("full_name")
          done()
        })
    })

    it("responds with 404 when given an invalid id", function(done){
      api.get("/directors/123")
        .expect(404, done)
    })


  })


  describe("#put", function(){

    it("allows editing given the correct auth header", function(done){
      api.put("/directors/6488824")
        .set('authorization', "Bearer " + md5('James Cameron'))
        .send({
          "favorite_camera": "Canon 5D Mark IV",
          "livestream_id": "6488824"
        })
        .expect(200)
        .end(function(err, res){
          expect(res.body).to.include.keys("full_name")
          done()
        })
    })

    it("returns 401 with auth failure", function(done){
      api.put("/directors/6488824")
        .expect(401, done)
    })

  })

})
