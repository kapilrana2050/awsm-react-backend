import { env } from "../config/env.js";
import jwt from "jsonwebtoken";
import { generateRandomToken, sha512 } from "../utils/crypto.js";
import { access } from "node:fs";
import { UserAccess } from "../models/UserAccess.js";

interface TokenPayload {
  sub: string;
  aud: string;
  iat: number;
}

interface IGeneratedToken {
  accessToken: string;
  renewToken: string;
  expiresIn: number;
  expiringAt: string;
  renewTokenExpiresIn: number;
  renewTokenExpiringAt: string;
}

export async function generateToken(
  userId: string,
  clientAppKey: string,
): Promise<IGeneratedToken> {
  const now = new Date();
  const payload: TokenPayload = {
    sub: userId,
    aud: clientAppKey,
    iat: Math.floor(now.getTime() / 1000),
  };

  const expiresIn = env.jwtAccessTokenExpiryMinutes * 60;

  const accessToken = jwt.sign(payload, env.jwtSuperSecretKey, {
    expiresIn,
    algorithm: "HS512",
  });

  const renewToken = generateRandomToken(60);
  const renewTokenHash = sha512(renewToken);
  const renewTokenExpiry = new Date(
    now.getTime() + env.jwtRenewTokenExpiryDays * 24 * 60 * 60 * 1000,
  );

  await UserAccess.findOneAndUpdate(
    { userId, clientType: clientAppKey },
    {
      userId,
      clientType: clientAppKey,
      renewTokenHash,
      renewTokenExpiry,
      TokenIssuedAt: now,
    },
    { upsert: true, new: true },
  );
  const expiringAt = new Date(now.getTime() + expiresIn * 1000).toISOString();
  const renewTokenExpiresIn = env.jwtRenewTokenExpiryDays * 24 * 60 * 60;
  const renewTokenExpiringAt = renewTokenExpiry.toISOString();
  return { accessToken, renewToken, expiresIn, expiringAt, renewTokenExpiresIn, renewTokenExpiringAt };
}
