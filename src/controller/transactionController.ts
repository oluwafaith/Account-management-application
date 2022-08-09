import fs from "fs";
import  { Request, Response } from "express";
import { transactions, users, user } from "../utils/store";
import { dynamicSort } from "../utils/sort";



class Account {

  static getAllTransaction = (_req: Request, res: Response) => {
    try {

        const sorted = transactions.sort(dynamicSort("createdAt"));
       
      res.status(200).json({
        status: "success",
        result: transactions.length,
        data: {
         sorted
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  static getTransaction = (req: Request, res: Response) => {
    try {
      const acct = req.params.account;

      const transaction = transactions.filter((el: any) => el.account === acct);
      res.status(200).json({
        status: "success",
        data: {
          transaction,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  static deposit(req: Request, res: Response) {
    const newId = transactions[transactions.length - 1].id + 1;
    const { amount, account } = req.body;

    const user = users.find((item: any) => {
      return item.account === account;
    });

    const transaction = {
      id: newId,
      amount,
      name: user.name,
      createdAt: Math.floor(new Date().getTime() / 1000).toFixed(0)
      ,
      account: user.account,
      balanceBefore: user.balance,
      balanceAfter: (user.balance += Number(amount)),
    };

    const newTransaction = Object.assign(transaction);
    transactions.push(newTransaction);

    fs.writeFile("src/dev-data/users.json", JSON.stringify(users), (err) => {
      res.status(201).json({
        status: "success",
        data: {
          statement: newTransaction,
        },
      });
    });
    fs.writeFileSync(
      "src/dev-data/transactions.json",
      JSON.stringify(transactions)
    );
  }

  static withdraw(req: Request, res: Response) {
    const newId = transactions[transactions.length - 1].id + 1;
    const { amount, account } = req.body;

    const user = users.find((item: any) => {
      return item.account === account;
    });
    if (amount > user.balance) {
      return res.status(404).json({
        status: "fail",
        message: "Insufficient funds",
      });
    }

    const transaction = {
      id: newId,
      amount,
      name: user.name,
      email: user.email,
      balanceBefore: user.balance,
      balanceAfter: (user.balance -= Number(amount)),
      createdAt: new Date().toString(),
    };

    const newTransaction = Object.assign(transaction);
    transactions.push(newTransaction);

    fs.writeFile("src/dev-data/users.json", JSON.stringify(users), (err) => {
      res.status(201).json({
        status: "success",
        data: {
          statement: newTransaction,
        },
      });
    });
  }
}

export const getAllTransaction = (req: Request, res: Response) => {
  try {
    res.status(200).json({
      status: "success",
      result: transactions.length,
      data: {
        transactions,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
export const getTransaction = (req: Request, res: Response) => {
  try {
    const acct = req.params.account;

    const transaction = transactions.find((el: any) => el.account === acct);
    res.status(200).json({
      status: "success",
      data: {
        transaction,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export default Account;
