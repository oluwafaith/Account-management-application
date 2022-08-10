import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });
import createError, { HttpError } from  'http-errors';
import express, { Request,Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import logger from  'morgan';
import indexRouter from './routes/index';
import transactionRouter from './routes/transaction';
import usersRouter from './routes/users';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/api/v1/transaction', transactionRouter);
app.use('/api/v1/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err:any , req:Request, res:Response, next:NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
