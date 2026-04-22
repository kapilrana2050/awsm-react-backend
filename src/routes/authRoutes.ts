import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import * as authService from "../services/authService.js";

const authRouter = Router();

authRouter.post("/login", async (req: Request, resp: Response, next: NextFunction) => {
  try {
    const { username, password, clientAppKey } = req.body;
    if (!username || !password || !clientAppKey) {
      throw new Error("Missing required fields: username, password, clientAppKey");
    }
    const result = await authService.login(username, password, clientAppKey);
    console.log("Login result:", result);
    debugger
    resp.json(result);
  } catch (error) { next(error) }
  // resp.json({ message: "Login successful" });
});

export default authRouter;
