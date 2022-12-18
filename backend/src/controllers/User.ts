import { NextFunction, Request, Response } from "express";
import mongoose, { mongo } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User";

export interface ReqWithJWT extends Request {
  USER_ID: string;
}

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, phone, gender, dob, bloodGroup, area, address, email, password, lastDonated } = req.body;
  const hashedPass = bcrypt.hashSync(password, 10);

  const user = new User({
    userId: new mongoose.Types.ObjectId(),
    name,
    phone,
    gender,
    dob,
    bloodGroup,
    area,
    address,
    email,
    password: hashedPass,
    lastDonated
  });

  return user
    .save()
    .then((user) => res.status(201).json({ user }))
    .catch((error) => res.status(500).json({ error }));
};

export const readUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  return User.findById(userId)
    .then((user) => (user ? res.status(201).json({ user }) : res.status(404).json({ message: "User Not Found" })))
    .catch((error) => res.status(500).json({ error }));
};

export const readAll = (req: Request, res: Response, next: NextFunction) => {
  let filter: { [key: string]: any } = {};
  if (req.query.bloodGroup) {
    filter.bloodGroup = req.query.bloodGroup;
  }
  return User.find(filter, { password: 0 })
    .then((users) => res.status(201).json({ users }))
    .catch((error) => res.status(500).json({ error }));
};

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as ReqWithJWT).USER_ID;

  return User.findById(userId)
    .then((user) => {
      if (user) {
        user.set(req.body);

        return user
          .save()
          .then((user) => res.status(201).json({ user }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(404).json({ message: "User Not Found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as ReqWithJWT).USER_ID;

  return User.findByIdAndDelete(userId)
    .then((user) => (user ? res.status(201).json({ message: "User Deleted" }) : res.status(404).json({ message: "User Not Found" })))
    .catch((error) => res.status(500).json({ error }));
};

export const login = async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(404).send({ error: "Email incorrect" });
    return;
  }

  if (!bcrypt.compareSync(req.body.password, user.password)) {
    res.status(404).send({ error: "Password incorrect" });
    return;
  }

  const payload = String(user._id);
  let token;
  try {
    token = jwt.sign(payload, process.env.JWT_SECRET as string);
  } catch (e) {
    res.status(500).send({ error: "Can't generate token" });
    return;
  }

  res.status(200).send({
    token: `Bearer ${token}`,
    userId: user._id,
    name: user.name,
    phone: user.phone,
    gender: user.gender,
    dob: user.dob,
    bloodGroup: user.bloodGroup,
    area: user.area,
    address: user.address,
    email: user.email
  });
};

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers["authorization"];
  if (!bearer) {
    res.status(401).json({
      error: "Unauthorized access"
    });
    return;
  }

  const fields = bearer.split(" ");
  if (fields.length < 2 || fields[0] !== "Bearer") {
    res.status(401).json({
      error: "Unauthorized access"
    });
    return;
  }

  const token = fields[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as ReqWithJWT).USER_ID = String(payload);
    next();
  } catch (e) {
    res.status(401).json({
      error: "Unauthorized access"
    });
  }
};

// export default { createUser, readUser, readAll, updateUser, deleteUser, login, verifyJWT, ReqWithJWT };
