const request = require("supertest");
const server = require("../src/index");

//TESTING API ENDPOINT /iecho?text=test
describe("GET /iecho?text=", () => {
  it("It should GET a json(text = tset, palindrome = false) and status 200.", (done) => {
    request(server)
      .get("/iecho?text=test")
      .set("Accept", "aplication/json")
      .expect("Content-Type", /json/)
      .expect({ text: "tset", palindrome: false })
      .expect(200, done);
  });

  it("It should GET a json(text = reconocer, palindrome = true) and status 200.", (done) => {
    request(server)
      .get("/iecho?text=reconocer")
      .set("Accept", "aplication/json")
      .expect("Content-Type", /json/)
      .expect({ text: "reconocer", palindrome: true })
      .expect(200, done);
  });

  it("It should GET a json(text = 321321, palindrome = false) and status 200.", (done) => {
    request(server)
      .get("/iecho?text=123123")
      .set("Accept", "aplication/json")
      .expect("Content-Type", /json/)
      .expect({ text: "321321", palindrome: false })
      .expect(200, done);
  });

  it("It should GET a json(error = no text) and status 400.", (done) => {
    request(server)
      .get("/iecho?ERROR=test")
      .set("Accept", "aplication/json")
      .expect("Content-Type", /json/)
      .expect({ error: "no text" })
      .expect(400, done);
  });
});
