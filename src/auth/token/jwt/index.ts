import { SignJWT, jwtVerify, type JWTPayload } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function generate(payload: JWTPayload) {
  const exp = "2h";

  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(exp)
    .sign(JWT_SECRET);
}

export async function verify(token: string) {
  const { payload } = await jwtVerify(token, JWT_SECRET);
  return payload;
}
