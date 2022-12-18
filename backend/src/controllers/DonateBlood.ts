import { NextFunction, Request, Response } from "express";
import mongoose, { mongo } from "mongoose";
import DonateBlood from "../models/DonateBlood";
import { ReqWithJWT } from "./User";

const createDonateBlood = (req: Request, res: Response, next: NextFunction) => {
  const { bloodGroup, donationDate, donationBank } = req.body;

  const donateId = (req as ReqWithJWT).USER_ID;
  const donateBlood = new DonateBlood({
    donateId,
    recieverId: null,
    bloodGroup,
    donationDate,
    donationBank
  });

  return donateBlood
    .save()
    .then((donateBlood) => res.status(201).json({ donateBlood }))
    .catch((error) => res.status(500).json({ error }));
};

const readDonateBlood = (req: Request, res: Response, next: NextFunction) => {
  const donateBloodId = (req as ReqWithJWT).USER_ID;

  return DonateBlood.findById(donateBloodId)
    .then((donateBlood) => (donateBlood ? res.status(201).json({ donateBlood }) : res.status(404).json({ message: "DonateBlood Not Found" })))
    .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  return DonateBlood.find({recieverId: null})
    .then((donateBloods) => res.status(201).json({ donateBloods }))
    .catch((error) => res.status(500).json({ error }));
};

const updateDonateBlood = (req: Request, res: Response, next: NextFunction) => {
  const donateBloodId = (req as ReqWithJWT).USER_ID;

  return DonateBlood.findOneAndUpdate({ donateId: req.body.donateId }, { recieverId: donateBloodId })
    .then((donateBlood) => {
      if (donateBlood) {
        // donateBlood.recieverId = new mongoose.Types.ObjectId(donateBloodId);

        // return donateBlood
        //   .save()
        //   .then((donateBlood) => res.status(201).json({ donateBlood }))
        //   .catch((error) => res.status(500).json({ error }));
        res.status(201).json({donateBlood});
      } else {
        res.status(404).json({ message: "DonateBlood Not Found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteDonateBlood = (req: Request, res: Response, next: NextFunction) => {
  const donateBloodId = (req as ReqWithJWT).USER_ID;

  return DonateBlood.findByIdAndDelete(donateBloodId)
    .then((donateBlood) => (donateBlood ? res.status(201).json({ message: "DonateBlood Deleted" }) : res.status(404).json({ message: "DonateBlood Not Found" })))
    .catch((error) => res.status(500).json({ error }));
};

export default { createDonateBlood, readDonateBlood, readAll, updateDonateBlood, deleteDonateBlood };
