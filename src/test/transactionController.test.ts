import http, { Server } from 'http';
import express from 'express'
import request from "supertest"

import router from "../routes/transaction"
const app = express();
app.use('/', router);

describe("GET transaction ", () => {
    test("It should respond with status 200 ", async () => {

     await request(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        res.body.data.length = 1; 
      })
     
    });

    test(" Get transaction by id  should respond with status 400", async () => {

      const res = await request(app).get("/:account");
      expect(res.status).toBe(400);
    });


    
  });