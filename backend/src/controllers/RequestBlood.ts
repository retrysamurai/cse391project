import { NextFunction, Request, Response } from "express";
import mongoose, { mongo } from "mongoose";
import RequestBlood from "../models/RequestBlood";
import { ReqWithJWT } from "./User";

const createRequestBlood = (req: Request, res: Response, next: NextFunction) => {
  const { responderId, reqBloodGroup, resBloodGroup, area, reqDate } = req.body;
  const requesterId = (req as ReqWithJWT).USER_ID;
  const requestBlood = new RequestBlood({
    requesterId,
    responderId,
    reqBloodGroup,
    resBloodGroup,
    area,
    reqDate
  });

  return requestBlood
    .save()
    .then((requestBlood) => res.status(201).json({ requestBlood }))
    .catch((error) => res.status(500).json({ error }));
};

const readRequestBlood = (req: Request, res: Response, next: NextFunction) => {
  const requestBloodId = (req as ReqWithJWT).USER_ID;

  return RequestBlood.findById(requestBloodId)
    .then((requestBlood) => (requestBlood ? res.status(201).json({ requestBlood }) : res.status(404).json({ message: "RequestBlood Not Found" })))
    .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  return RequestBlood.find()
    .then((requestBloods) => res.status(201).json({ requestBloods }))
    .catch((error) => res.status(500).json({ error }));
};

const updateRequestBlood = (req: Request, res: Response, next: NextFunction) => {
  const requestBloodId = (req as ReqWithJWT).USER_ID;

  return RequestBlood.findById(requestBloodId)
    .then((requestBlood) => {
      if (requestBlood) {
        requestBlood.set(req.body);

        return requestBlood
          .save()
          .then((requestBlood) => res.status(201).json({ requestBlood }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(404).json({ message: "RequestBlood Not Found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteRequestBlood = (req: Request, res: Response, next: NextFunction) => {
  const requestBloodId = (req as ReqWithJWT).USER_ID;

  return RequestBlood.findByIdAndDelete(requestBloodId)
    .then((requestBlood) => (requestBlood ? res.status(201).json({ message: "RequestBlood Deleted" }) : res.status(404).json({ message: "RequestBlood Not Found" })))
    .catch((error) => res.status(500).json({ error }));
};

export default { createRequestBlood, readRequestBlood, readAll, updateRequestBlood, deleteRequestBlood };
