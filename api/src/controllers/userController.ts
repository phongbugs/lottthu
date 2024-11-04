// userController.ts
import { Request, Response } from "express";
import { PrismaClient, User as PrismaUser } from "@prisma/client";
const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: PrismaUser[] = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params; // Lấy ID từ path parameter

  if (!id || isNaN(Number(id))) {
    res.status(400).json({ error: "Invalid ID" }); // Kiểm tra xem ID có hợp lệ không
  }

  try {
    const user: PrismaUser | null = await prisma.user.findUnique({
      where: { id: Number(id) }, // Chuyển đổi ID thành số
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, fullname, hashPwd, email, phone } = req.body;

  try {
    const newUser: PrismaUser = await prisma.user.create({
      data: {
        username,
        fullname,
        hashPwd,
        email,
        phone,
      },
    });
    res.status(201).json({ message: "User created", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
