export interface TLoginResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpirationUtc: string;
  accessTokenExpiresInSeconds: number;
  refreshTokenExpirationUtc: string;
  refreshTokenExpiresInSeconds: number;
  userId: string;
  userRole: string;
}
