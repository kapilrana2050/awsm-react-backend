import bcrypt from "bcrypt";
import { VALID_CLIENT_KEYS } from "../config/env.js";
import { User } from "../models/User.js";
import type { TLoginResponse } from "../types/auth/TLoginResponse.js";
import { AppError, UnauthorizedError } from "../utils/errors.js";
import { generateToken } from "./tokenService.js";

export async function login(
  username: string,
  password: string,
  clientAppKey: string,
): Promise<TLoginResponse> {
    const user =  await User.findOne({
        email: username.toLowerCase(),
        deletedAt: null
    })
    if (!user) throw new UnauthorizedError('InvalidCredentials', 'Invalid email or password');
    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) throw new UnauthorizedError('InvalidCredentials', 'Invalid email or password');
    if (!VALID_CLIENT_KEYS.includes(clientAppKey)) {
        throw new UnauthorizedError('InvalidClientKey', 'Invalid client app key');
    }

    const { accessToken, renewToken, expiresIn, expiringAt, renewTokenExpiresIn, renewTokenExpiringAt } = await generateToken(user._id.toString(), clientAppKey);

    return {
        accessToken,
        refreshToken: renewToken,
        accessTokenExpiresInSeconds: expiresIn,
        accessTokenExpirationUtc: expiringAt,
        refreshTokenExpiresInSeconds: renewTokenExpiresIn,
        refreshTokenExpirationUtc: renewTokenExpiringAt,
        userId: user._id.toString(),
        userRole: user.isAdmin ? 'admin' : 'user',
    }
}