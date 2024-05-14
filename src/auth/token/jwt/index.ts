import jwt, { Secret } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as Secret;

export function generate({
  object,
  expiresIn = "1h",
}: {
  object: object;
  expiresIn?: string | number;
}): string {
  return jwt.sign(object, JWT_SECRET, { expiresIn });
}

export function verify(token: string): object | string {
  return jwt.verify(token, JWT_SECRET);
}
