export const env = {
  clientKeyDashboard: process.env.CLIENT_KEY_DASHBOARD || "ehbihva7A7hTrPQbUnw",
  mongodbUri: process.env.MONGODB_URI || "mongodb://localhost:27017/awsm-backend",
  jwtAccessTokenExpiryMinutes: parseInt(
    process.env.JWT_ACCESS_TOKEN_EXPIRY_MINUTES || "120",
    10,
  ),
  jwtRenewTokenExpiryDays: parseInt(
    process.env.JWT_RENEW_TOKEN_EXPIRY_DAYS || "30",
    10,
  ),
  jwtSuperSecretKey: process.env.JWT_SUPER_SECRET_KEY || "pq4w8os5V8/NRHGZ/3uRRxSplK7p1pejU/DevPr7akyXguWkYTqQgDx6yvgXVl+8",
};

export const VALID_CLIENT_KEYS = [env.clientKeyDashboard];
