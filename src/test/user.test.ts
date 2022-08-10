import express,{Request, Response} from 'express'
import request from "supertest"
import router from "../routes/users"

const app = express();
app.use('/', router);

describe("Users / ", () => {
    test("It should respond with status 200 ", async () => {
         await request(app)
          .get("/")
          .expect(200)
          .expect((res) => {
            res.body.data.length = 1;          
          })            
        });
  });

   
