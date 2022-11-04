import { expressjwt, GetVerificationKey } from "express-jwt";
import { expressJwtSecret } from "jwks-rsa";

export const jwtCheck = expressjwt({
  secret: <GetVerificationKey>expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://matthew-meeves.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://kanban-api.com",
  issuer: "https://matthew-meeves.auth0.com/",
  algorithms: ["RS256"],
});
