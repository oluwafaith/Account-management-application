import express,{Request, Response} from 'express'
import request from "supertest"

// function logErrors (err:any, req:any, res:any, next:any) {
//     console.error(err.stack)
//     next(err)
//   }
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

        // test("It should respond with status 201  ",   (done) => {
        //     var unhandledException: any = undefined;
        //     var unhandledExceptionCallback = function(err:any) {
        //         unhandledException = err;
        //     }
        //     process.on('uncaughtException', unhandledExceptionCallback);
        //       request(app)
        //      .post("/signup") 
        //     //  .expect("Content-Type", /json/)
        //        .send({
        //        id: "5",
        //        balance: "balance" ,
        //        account: "1071937522" ,
        //        name:"alec",
        //        phoneNumber: "0901234560",
        //     })
        //     // .expect(201) 
        //     .end((err, res) => {
        //         process.removeListener('uncaughtException', unhandledExceptionCallback);
        //         if (unhandledException !== undefined){
        //           return done(unhandledException);
        //         } else if (err) {
        //           return done(err);
        //         }
                
        //         done();
        //       });
            //  .end(function(err, res){
            //     if(err){
            //         console.log("error");
            //         done(err);
            //     }
            //     else {
            //         console.log(res);
            //         done();
            //     }
            // });
                    
            //  .send({
            //    id: "5",
            //    balance: "balance" ,
            //    account: "1071937522" ,
            //    name:"alec",
            //    phoneNumber: "0901234560",
            // })
            // .expect(201)         
        //    })
    
  });

   
