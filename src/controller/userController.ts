import { Request, Response } from "express";
import { users } from "../utils/store";

export const getAllUsers = (_req: Request, res: Response) => {
  try {
    res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
