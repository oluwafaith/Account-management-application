import { Request, Response } from "express";
import { saveData, transactions, users } from "../utils/store";

class Account {
  static getAllTransaction = (_req: Request, res: Response) => {
    try {
      const sorted = transactions.sort(
        (objA: any, objB: any) =>
          Number(objB.createdAt) - Number(objA.createdAt)
      );
      res.status(200).json({
        status: "success",
        result: transactions.length,
        data: {
          sorted,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  static getTransaction = (req: Request, res: Response) => {
    try {
      const acct = req.params.account;

      const user = users.find((item: {account: string}) => {
        return item.account === acct;
      });

      if(!user){
        return res.status(400).
        json({
            status:"fail",
            message: "Invalid account",
        })
       }
      const transaction = transactions.filter(
        (item: any) => item.account === acct
      );

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

  static deposit = (req: Request, res: Response) => {
    try {
      const newId = transactions[transactions.length - 1].id + 1;
      const { amount, account } = req.body;

      const user = users.find((item: any) => {
        return item.account === account;
      });

      if(!user){
        return res.status(400).
        json({
            status:"fail",
            message: "Invalid account",
        })
       }

      const transaction = {
        id: newId,
        amount,
        name: user.name,
        createdAt: Math.floor(new Date().getTime() / 1000).toFixed(0),
        account: user.account,
        balanceBefore: user.balance,
        balanceAfter: (user.balance += Number(amount)),
      };

      const newTransaction = Object.assign(transaction);
      transactions.push(newTransaction);

      saveData("src/dev-data/users.json", users);
      saveData("src/dev-data/transactions.json", transactions);

      res.status(201).json({
        status: "success",
        data: {
          amount: newTransaction.amount,
          totalBalance: newTransaction.balanceAfter,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  static withdraw = (req: Request, res: Response) => {
    try {
      const newId = transactions[transactions.length - 1].id + 1;
      const { amount, account } = req.body;

      const user = users.find((item: any) => {
        return item.account === account;
      });

      if(!user){
        return res.status(400).
        json({
            status:"fail",
            message: "Invalid account",
        })
       }

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
        createdAt: Math.floor(new Date().getTime() / 1000).toFixed(0),
      };

      const newTransaction = Object.assign(transaction);
      transactions.push(newTransaction);
      saveData("src/dev-data/users.json", users);
      saveData("src/dev-data/transactions.json", transactions);

      res.status(201).json({
        status: "success",
        data: {
          amount: newTransaction.amount,
          totalBalance: newTransaction.balanceAfter,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export default Account;
