import express from "express";
import { get, merge } from "lodash";

import { fetchAdminBySessionToken } from "../database/db";

export const isAdminAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["fintech_auth"];
    if (!sessionToken) {
      return res.status(401).send("Unauthorized");
    }
    const admin = await fetchAdminBySessionToken(sessionToken);
    if (!admin) {
      return res.status(401).send("Unauthorized");
    }
    merge(req, { identity: admin });
    return next();
  } catch (error) {
    console.error(error);
    return res.status(401).send("Unauthorized");
  }
};
