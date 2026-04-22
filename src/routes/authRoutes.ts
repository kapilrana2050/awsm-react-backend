import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import type router from "./index.js";

const authRouter = Router();

authRouter.get("/login", (req: Request, resp: Response, next: NextFunction) => {
  try {
    const { username, password, clientAppKey } = req.body;
  } catch (error) { next(error) }
  resp.json({ message: "Login successful" });
});

export default authRouter;
