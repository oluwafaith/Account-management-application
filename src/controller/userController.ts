import {  saveData } from './../utils/store';
import { Request, Response } from "express";
import { users } from "../utils/store";
import createAccountNumber from "../utils/createAccount";

export const getAllUsers = (_req: Request, res: Response) => {
  try {
    res.status(200).json({
      status: "success",
      result: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const createAccount =  (req: Request, res: Response) => {
   const {name, phoneNumber} = req.body
  const balance = 0;
  const newId = users[users.length - 1].id + 1;

  const newUser = Object.assign({
    id: newId,
    balance: balance,
    account: createAccountNumber(),
    name: name,
    phoneNumber: phoneNumber,
    createdAt: new Date().toString()
  });

   users.push(newUser);
    saveData("src/dev-data/users.json", users )

    res.status(201).json({
      status: "success",
      data: newUser.account,
    });

};
