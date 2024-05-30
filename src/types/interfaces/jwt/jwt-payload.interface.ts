export interface JwtPayloadInterface {
  id: number;
  email: string;
  iat: number;
  exp: number;
}