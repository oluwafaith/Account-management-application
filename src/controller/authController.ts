import fs from "fs";
import { Request, Response } from "express";
import { users } from "../utils/store";
import { createAccount } from "../utils/index";

export const signup = async (req: Request, res: Response) => {
  const balance = 0;

  const newId = users[users.length - 1].id + 1;
  const newUser = Object.assign(
    { id: newId },
    { balance: balance },
    { account: createAccount() },
    req.body
  );
  users.push(newUser);

  fs.writeFile("src/dev-data/users.json", JSON.stringify(users), () => {
    res.status(201).json({
      status: "success",
      data: {
        newUser,
      },
    });
  });
};
