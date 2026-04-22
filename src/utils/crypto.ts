import crypto from "crypto";

export function sha512(input: string): string {
  return crypto.createHash("sha512").update(input).digest("hex");
}

export function generateRandomToken(length: number = 60): string {
  return crypto.randomBytes(length).toString("hex").substring(0, length);
}

export function generateBase64Token(): string {
  return crypto.randomBytes(32).toString("base64");
}
