import { Request, Response } from "express";

export const getUsers = (req: Request, res: Response) => {
  // Logic to get users
  res.status(200).json({ message: "Get users" });
};

export const createUser = (req: Request, res: Response) => {
  // Logic to create a user
  res.status(201).json({ message: "User created" });
};
