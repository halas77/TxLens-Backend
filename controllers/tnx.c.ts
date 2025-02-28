import { Request, Response } from "express";

export const getTnxData = (req: Request, res: Response) => {
  res.json({ message: "Transaction data" });
};

export const getUserById = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `User details for ID: ${id}` });
};
