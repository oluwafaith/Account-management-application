import express,{Request, Response} from 'express'
import Account from "../controller/transactionController"
import request from "supertest"

import router from "../routes/transaction"

const app = express();
app.use('/', router);


describe("GET / ", () => {
    test("It should respond with status 200 9", async () => {

    //   const res = await request(app).get("/");
    //   expect(res.status).toBe(200);
      
    
     await request(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        res.body.data.length = 1;
       
      })

     
    });

    test(" Get transaction should respond with status 200", async () => {

      const res = await request(app).get("/:account");
      expect(res.status).toBe(200);
    });


    test("depositshould respond with status 201", async () => {

       await  request(app)
      .post("/deposit")
      .field("account", "1071937520")
      .field("amount", "100")
      .expect("Content-Type", /json/)
      .expect(200)
     

      
       
      });

    test("It should respond with status 201", async () => {

        const res = await request(app).post("/withdraw");
        expect(res.status).toBe(201);
      });
  });