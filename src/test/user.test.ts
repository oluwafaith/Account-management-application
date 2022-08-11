import express,{Request, Response} from 'express'
import request from "supertest"
import router from "../routes/users"

const app = express();
app.use('/', router);
let mockUser =  {
  "id": "829219ee-7a3d-46e0-b695-a9c5911b9368",
  "name": "test 3",
  "phoneNumber": "09023345098",
  "account": "4060733303",
  "balance": 34000,
  "createdAt": "Wed Aug 10 2022 22:39:39 GMT+0100 (West Africa Standard Time)"
}

describe("Users / ", () => {
  
    test("It should respond with status 200 ", async () => {
         await request(app)
          .get("/")
          .expect(200)
          .expect((res) => {
            res.body.data.length = 1;          
          })            
        });

    // test("It should mock user respond with status 200 ",  (done) => {
    //       request(app)
    //       .post("/signup")
    //       .expect("Content-Type", /json/)
    //       .send({
    //         "id": "829219ee-7a3d-46e0-b695-a9c5911b9368",
    //         "name": "test 3",
    //         "phoneNumber": "09023345098",
    //         "account": "4060733303",
    //         "balance": 34000,
    //         "createdAt": "Wed Aug 10 2022 22:39:39 GMT+0100 (West Africa Standard Time)"
    //       })
    //       .end((err, res) => {
    //         res.body.data.length = 1;

    //         done()
    //       })
    //       .expect(200)
    //       .expect((res) => {
    //         res.body.data.length != 1 ;          
    //       })            
    //     };
  });

   
