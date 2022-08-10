import http, { Server } from 'http';
import express,{Request, Response} from 'express'
import request from "supertest"

import router from "../routes/transaction"
const app = express();
app.use('/', router);



describe("GET / ", () => {
    test("It should respond with status 200 9", async () => {

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


    
  });