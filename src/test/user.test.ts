import express,{Request, Response} from 'express'
import request from "supertest"


import router from "../routes/users"
const app = express();
app.use('/', router);

describe("Users / ", () => {
    test("It should respond with status 200 9", async () => {
         await request(app)
          .get("/")
          .expect(200)
          .expect((res) => {
            res.body.data.length = 1;          
          })
             
        });

        test("It should respond with status 201  ", async () => {
            await request(app)
             .post("/signup")
            
            .send({
               id: "29",
               balance: "balance" ,
               account: "1071937522" ,
              name:"alec",
              phoneNumber: "090123456",
            })
            .expect(201)

       
            
           });
    
  });

