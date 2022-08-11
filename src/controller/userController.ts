import { saveData } from "./../utils/store";
import { Request, Response, NextFunction } from "express";
import { users } from "../utils/store";
import createAccountNumber from "../utils/createAccount";
import { v4 as uuidv4 } from "uuid";
export const getAllUsers = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json({
      status: "success",
      result: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    next(error)
  }
};

export const createAccount = (req: Request, res: Response) => {
  const { name, phoneNumber } = req.body;
  const balance = 0;

  const newUser = Object.assign({
    id: uuidv4(),
    name: name,
    phoneNumber: phoneNumber,
    account: createAccountNumber(),
    balance: balance,
    createdAt: new Date().toString(),
  });

  users.push(newUser);
  saveData("src/dev-data/users.json", users);

  res.status(201).json({
    status: "success",
    data: {
      accountNumber: newUser.account
    },
  });
};
